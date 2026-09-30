import { ValidationResult, ValidationError, UserData } from '@/types/template';
import { maxFileSize, allowedMimeTypes, allowedExtensions } from '@/config/template';

export function validateName(name: string): ValidationResult {
  const errors: ValidationError[] = [];
  const trimmed = name.trim();

  if (!trimmed) {
    errors.push({ field: 'name', message: 'Please enter your name.' });
  } else if (trimmed.length > 100) {
    errors.push({ field: 'name', message: 'Name is too long. Please keep it under 100 characters.' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validatePhoto(file: File | null): ValidationResult {
  const errors: ValidationError[] = [];

  if (!file) {
    errors.push({ field: 'photo', message: 'Please upload a profile photo.' });
    return { isValid: false, errors };
  }

  if (!allowedMimeTypes.includes(file.type)) {
    errors.push({
      field: 'photo',
      message: 'Please upload a valid JPG, PNG, or WebP image.',
    });
  }

  if (file.size > maxFileSize) {
    const maxMB = maxFileSize / (1024 * 1024);
    errors.push({
      field: 'photo',
      message: `That image is too large. Please upload an image under ${maxMB} MB.`,
    });
  }

  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    errors.push({
      field: 'photo',
      message: 'Unsupported file format. Please use JPG, PNG, or WebP.',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateUserData(userData: UserData): ValidationResult {
  const nameResult = validateName(userData.name);
  const photoResult = validatePhoto(userData.photo);

  return {
    isValid: nameResult.isValid && photoResult.isValid,
    errors: [...nameResult.errors, ...photoResult.errors],
  };
}

export function sanitizeFileName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

export function generateFileName(name: string): string {
  const sanitized = sanitizeFileName(name);
  return `aws-mecs-linkedin-${sanitized}.png`;
}