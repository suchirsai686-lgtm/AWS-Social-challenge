import { TemplateConfig } from '@/types/template';

export const templateConfig: TemplateConfig = {
  width: 1200,
  height: 630,
  photo: {
    x: 600,
    y: 140,
    width: 280,
    height: 280,
    shape: 'circle',
    borderRadius: 140,
  },
  name: {
    x: 650,
    y: 460,
    maxWidth: 500,
    fontSize: 48,
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 700,
    color: '#FFFFFF',
    alignment: 'left',
    lineHeight: 1.2,
    maxLines: 2,
  },
  eventText: {
    x: 100,
    y: 40,
    maxWidth: 1000,
    fontSize: 42,
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 600,
    color: '#FFFFFF',
    alignment: 'center',
    lineHeight: 1.3,
    maxLines: 2,
    text: 'I am attending AWS MECS event',
  },
  backgroundColor: '#232F3E',
};

export const templateImagePath = '/templates/aws-mecs-template.png';

export const defaultLinkedInCaption = `Excited to be attending AWS Student Community Day – Hyderabad 2026! 🚀

Looking forward to learning from industry experts, connecting with fellow developers and students, and exploring the latest developments across AWS and cloud technologies.

See you at the event!

#AWS #AWSCommunity #AWSStudentCommunity #CloudComputing #AWSMECS`;

export const maxFileSize = 10 * 1024 * 1024;
export const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];