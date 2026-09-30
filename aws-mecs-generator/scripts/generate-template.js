const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const width = 1200;
const height = 630;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#1a1a2e');
gradient.addColorStop(0.5, '#16213e');
gradient.addColorStop(1, '#0f0f23');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Decorative elements - geometric shapes
ctx.fillStyle = 'rgba(255, 153, 0, 0.1)';
for (let i = 0; i < 20; i++) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const size = Math.random() * 100 + 50;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

// AWS-style orange accent line
ctx.strokeStyle = '#FF9900';
ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(80, 80);
ctx.lineTo(width - 80, 80);
ctx.stroke();

// Event title area
ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 48px Inter, sans-serif';
ctx.textAlign = 'left';
ctx.fillText('AWS MECS 2026', 80, 160);

ctx.font = '28px Inter, sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
ctx.fillText('Student Community Day • Hyderabad', 80, 205);

// Date and venue
ctx.font = '22px Inter, sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
ctx.fillText('March 15-16, 2026  •  Hyderabad International Convention Centre', 80, 250);

// Divider
ctx.strokeStyle = 'rgba(255, 153, 0, 0.5)';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(80, 270);
ctx.lineTo(400, 270);
ctx.stroke();

// "I'm Attending" badge area
ctx.fillStyle = 'rgba(255, 153, 0, 0.15)';
ctx.fillRect(80, 300, 350, 180);
ctx.strokeStyle = '#FF9900';
ctx.lineWidth = 2;
ctx.strokeRect(80, 300, 350, 180);

ctx.fillStyle = '#FF9900';
ctx.font = 'bold 24px Inter, sans-serif';
ctx.textAlign = 'center';
ctx.fillText("I'M ATTENDING", 255, 350);

ctx.fillStyle = '#FFFFFF';
ctx.font = '18px Inter, sans-serif';
ctx.fillText('Personalize this graphic with', 255, 390);
ctx.fillText('your name & photo', 255, 415);

// Photo placeholder area indicator
ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
ctx.lineWidth = 2;
ctx.setLineDash([10, 10]);
ctx.beginPath();
ctx.arc(750, 280, 140, 0, Math.PI * 2);
ctx.stroke();
ctx.setLineDash([]);

ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
ctx.font = '16px Inter, sans-serif';
ctx.textAlign = 'center';
ctx.fillText('YOUR PHOTO HERE', 750, 290);
ctx.fillText('(circular crop)', 750, 315);

// Name placeholder indicator
ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
ctx.lineWidth = 2;
ctx.setLineDash([10, 10]);
ctx.beginPath();
ctx.rect(750 - 200, 450, 400, 80);
ctx.stroke();
ctx.setLineDash([]);

ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
ctx.font = '16px Inter, sans-serif';
ctx.fillText('YOUR NAME HERE', 750, 495);

// Hashtags area
ctx.fillStyle = '#FF9900';
ctx.font = 'bold 20px Inter, sans-serif';
ctx.textAlign = 'left';
ctx.fillText('#AWSMECS #AWSCommunity #CloudComputing', 80, height - 60);

// AWS logo placeholder
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
ctx.font = 'bold 32px Inter, sans-serif';
ctx.textAlign = 'right';
ctx.fillText('AWS', width - 80, height - 80);

// Decorative corner elements
ctx.fillStyle = '#FF9900';
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(100, 0);
ctx.lineTo(0, 100);
ctx.fill();

ctx.beginPath();
ctx.moveTo(width, 0);
ctx.lineTo(width - 100, 0);
ctx.lineTo(width, 100);
ctx.fill();

ctx.beginPath();
ctx.moveTo(0, height);
ctx.lineTo(100, height);
ctx.lineTo(0, height - 100);
ctx.fill();

ctx.beginPath();
ctx.moveTo(width, height);
ctx.lineTo(width - 100, height);
ctx.lineTo(width, height - 100);
ctx.fill();

// Save
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '..', 'public', 'templates', 'aws-mecs-template.png');
fs.writeFileSync(outputPath, buffer);
console.log('Template created at:', outputPath);