import { TemplateConfig, GeneratedPoster, UserData } from '@/types/template';
import { templateConfig, templateImagePath } from '@/config/template';
import { generateFileName } from '@/lib/validation';

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function createPhotoBlob(dataUrl: string, config: TemplateConfig['photo']): Promise<Blob> {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  canvas.width = config.width;
  canvas.height = config.height;
  const ctx = canvas.getContext('2d')!;

  if (config.shape === 'circle') {
    ctx.beginPath();
    ctx.arc(config.width / 2, config.height / 2, config.width / 2, 0, Math.PI * 2);
    ctx.clip();
  } else if (config.shape === 'rounded' && config.borderRadius) {
    ctx.beginPath();
    const r = config.borderRadius;
    const w = config.width;
    const h = config.height;
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h - r);
    ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h);
    ctx.quadraticCurveTo(0, h, 0, h - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.clip();
  }

  const scale = Math.max(config.width / img.width, config.height / img.height);
  const drawWidth = img.width * scale;
  const drawHeight = img.height * scale;
  const drawX = (config.width - drawWidth) / 2;
  const drawY = (config.height - drawHeight) / 2;

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png', 1.0);
  });
}

export async function composePoster(
  userData: UserData,
  config: TemplateConfig = templateConfig
): Promise<GeneratedPoster> {
  const templateImg = await loadImage(templateImagePath);
  
  const canvas = document.createElement('canvas');
  canvas.width = config.width;
  canvas.height = config.height;
  const ctx = canvas.getContext('2d')!;

  if (config.backgroundColor) {
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, config.width, config.height);
  }

  ctx.drawImage(templateImg, 0, 0, config.width, config.height);

  if (userData.photoPreview) {
    const photoImg = await loadImage(userData.photoPreview);
    
    ctx.save();
    
    if (config.photo.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(
        config.photo.x + config.photo.width / 2,
        config.photo.y + config.photo.height / 2,
        config.photo.width / 2,
        0,
        Math.PI * 2
      );
      ctx.clip();
    } else if (config.photo.shape === 'rounded' && config.photo.borderRadius) {
      const r = config.photo.borderRadius;
      const x = config.photo.x;
      const y = config.photo.y;
      const w = config.photo.width;
      const h = config.photo.height;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.clip();
    }

    const scale = Math.max(config.photo.width / photoImg.width, config.photo.height / photoImg.height);
    const drawWidth = photoImg.width * scale;
    const drawHeight = photoImg.height * scale;
    const drawX = config.photo.x + (config.photo.width - drawWidth) / 2;
    const drawY = config.photo.y + (config.photo.height - drawHeight) / 2;

    ctx.drawImage(photoImg, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  }

  if (userData.name.trim()) {
    const nameConfig = config.name;
    const trimmedName = userData.name.trim();
    
    ctx.font = `${nameConfig.fontWeight} ${nameConfig.fontSize}px ${nameConfig.fontFamily}`;
    ctx.fillStyle = nameConfig.color;
    ctx.textAlign = nameConfig.alignment;
    ctx.textBaseline = 'top';

    let fontSize = nameConfig.fontSize;
    let lines: string[] = [trimmedName];
    
    const measureText = (text: string, size: number) => {
      ctx.font = `${nameConfig.fontWeight} ${size}px ${nameConfig.fontFamily}`;
      return ctx.measureText(text).width;
    };

    while (true) {
      const maxLineWidth = Math.max(...lines.map(l => measureText(l, fontSize)));
      if (maxLineWidth <= nameConfig.maxWidth || fontSize <= 16) break;
      fontSize -= 2;
    }

    if (measureText(trimmedName, fontSize) > nameConfig.maxWidth && nameConfig.maxLines && nameConfig.maxLines > 1) {
      const words = trimmedName.split(' ');
      lines = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (measureText(testLine, fontSize) <= nameConfig.maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) lines.push(currentLine);
      
      if (lines.length > (nameConfig.maxLines || 2)) {
        lines = lines.slice(0, nameConfig.maxLines);
        const lastLine = lines[lines.length - 1];
        if (measureText(lastLine + '...', fontSize) <= nameConfig.maxWidth) {
          lines[lines.length - 1] = lastLine + '...';
        }
      }
    }

    ctx.font = `${nameConfig.fontWeight} ${fontSize}px ${nameConfig.fontFamily}`;
    const lineHeight = (nameConfig.lineHeight || 1.2) * fontSize;

    let startY = nameConfig.y;
    if (nameConfig.alignment === 'center') {
      startY = nameConfig.y - ((lines.length - 1) * lineHeight) / 2;
    }

    lines.forEach((line, index) => {
      const y = startY + index * lineHeight;
      let x = nameConfig.x;
      
      if (nameConfig.alignment === 'center') {
        x = nameConfig.x + nameConfig.maxWidth / 2;
      } else if (nameConfig.alignment === 'right') {
        x = nameConfig.x + nameConfig.maxWidth;
      }

      ctx.fillText(line, x, y);
    });
  }

  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b!), 'image/png', 1.0);
  });

  const dataUrl = canvas.toDataURL('image/png');
  const fileName = generateFileName(userData.name);

  return { dataUrl, blob, fileName };
}

export async function downloadPoster(poster: GeneratedPoster): Promise<void> {
  const url = URL.createObjectURL(poster.blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = poster.fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}