# AWS MECS LinkedIn Post Generator

A production-quality web application for creating personalized LinkedIn posts for the AWS MECS 2026 event using the official event template.

## Features

- **Official Template Integration**: Uses the actual AWS MECS event poster as the base template
- **Photo Upload & Cropping**: Drag-and-drop photo upload with interactive crop/position controls
- **Live Preview**: Real-time preview updates as you edit
- **Name Personalization**: Dynamic font sizing to fit long names
- **High-Quality Download**: Generates crisp PNG images (1200×630)
- **LinkedIn Caption**: Pre-written professional caption, fully editable
- **Share Workflow**: Copy caption, download image, open LinkedIn
- **Privacy-First**: All processing happens in-browser, no server uploads
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessible**: WCAG AA compliant with proper labels, focus states, and keyboard navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Processing**: HTML Canvas API (client-side)
- **Font**: Inter (via next/font)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone and navigate to the project
cd aws-mecs-generator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── generator/
│   │   └── page.tsx          # Generator page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Hero.tsx              # Landing page hero
│   ├── PhotoUploader.tsx     # Photo upload with cropper
│   ├── NameInput.tsx         # Name input with validation
│   ├── PosterPreview.tsx     # Live canvas preview
│   └── GeneratorControls.tsx # Download/copy/share actions
├── config/
│   └── template.ts           # Template configuration
├── lib/
│   ├── imageComposer.ts      # Canvas compositing logic
│   ├── linkedin.ts           # LinkedIn caption & sharing
│   └── validation.ts         # Input validation
└── types/
    └── template.ts           # TypeScript types

public/
└── templates/
    └── aws-mecs-template.png # Official event template
```

## Template Configuration

All template positioning is configurable in `src/config/template.ts`:

```typescript
export const templateConfig: TemplateConfig = {
  width: 1200,
  height: 630,
  photo: {
    x: 100,
    y: 120,
    width: 280,
    height: 280,
    shape: 'circle',
    borderRadius: 140,
  },
  name: {
    x: 100,
    y: 430,
    maxWidth: 400,
    fontSize: 48,
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: 700,
    color: '#FFFFFF',
    alignment: 'left',
    lineHeight: 1.2,
    maxLines: 2,
  },
  backgroundColor: '#232F3E',
};
```

To update the template:
1. Replace `public/templates/aws-mecs-template.png` with the new official template
2. Adjust coordinates in `src/config/template.ts` to match the new design
3. No other code changes needed

## Privacy

- Photos are processed entirely in the browser using HTML Canvas
- No images are uploaded to any server
- No temporary files are stored
- No analytics or tracking

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

For static hosting (Netlify, Cloudflare Pages, etc.):

```bash
# Add to next.config.js:
# output: 'export',

npm run build
# Output in ./out/
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the AWS-inspired color palette.

### LinkedIn Caption

Modify `defaultLinkedInCaption` in `src/config/template.ts`.

### Validation Limits

Adjust `maxFileSize`, `allowedMimeTypes` in `src/config/template.ts`.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires Canvas API and FileReader API support.

## License

MIT License - Feel free to use for your own events.

## Disclaimer

This is an unofficial community tool. Not affiliated with AWS or the AWS MECS organizers.