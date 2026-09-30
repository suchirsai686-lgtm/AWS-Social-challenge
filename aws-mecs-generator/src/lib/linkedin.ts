import { defaultLinkedInCaption } from '@/config/template';

export function generateLinkedInCaption(name: string): string {
  const trimmedName = name.trim();
  return defaultLinkedInCaption;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      return false;
    }
  }
}

export function openLinkedInShare(): void {
  const url = 'https://www.linkedin.com/feed/';
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openLinkedInPostWindow(text: string): void {
  const encodedText = encodeURIComponent(text);
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=https://www.awsmecs.in/&title=AWS%20MECS%202026&summary=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}