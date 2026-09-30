export interface PhotoConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  shape: 'circle' | 'rounded' | 'square';
  borderRadius?: number;
}

export interface NameConfig {
  x: number;
  y: number;
  maxWidth: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  color: string;
  alignment: 'left' | 'center' | 'right';
  lineHeight?: number;
  maxLines?: number;
}

export interface EventTextConfig {
  x: number;
  y: number;
  maxWidth: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  color: string;
  alignment: 'left' | 'center' | 'right';
  lineHeight?: number;
  maxLines?: number;
  text: string;
}

export interface TemplateConfig {
  width: number;
  height: number;
  photo: PhotoConfig;
  name: NameConfig;
  eventText?: EventTextConfig;
  backgroundColor?: string;
}

export interface UserData {
  name: string;
  photo: File | null;
  photoPreview: string | null;
  photoPosition?: { x: number; y: number; scale: number };
}

export interface GeneratedPoster {
  dataUrl: string;
  blob: Blob;
  fileName: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}