import { RGB } from './types';

export function getContrastingColor(col: string): string | undefined {
  if (typeof window === 'undefined') {
    return;
  }

  const rgb = hexToRgb(standardizeColor(col));
  if (!rgb) {
    return;
  }

  return getColor(rgb) ? '#000000' : '#ffffff';
}

type HexColor = `#${string}`;

type RGBObject = {
  r: number;
  g: number;
  b: number;
};

function standardizeColor(str: string): HexColor {
  if (str.startsWith('#')) {
    return str;
  }

  return `#${str}`;
}

function hexToRgb(hex: HexColor): RGBObject | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = standardizeColor(hex);

  const result = shorthandRegex.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1].repeat(2), 16),
      g: parseInt(result[2].repeat(2), 16),
      b: parseInt(result[3].repeat(2), 16),
    };
  }

  const longhandRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const longhandResult = longhandRegex.exec(hex);
  if (longhandResult) {
    return {
      r: parseInt(longhandResult[1], 16),
      g: parseInt(longhandResult[2], 16),
      b: parseInt(longhandResult[3], 16),
    };
  }

  return null;
}

function getColor(rgb: RGB): boolean {
  const { r, g, b } = rgb;
  if (r && g && b) {
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 160;
  }
  return false;
}
