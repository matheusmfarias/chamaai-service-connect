
/**
 * Utility functions for validating and sanitizing user inputs.
 */

export function isValidEmail(email: string): boolean {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Accepts (99) 99999-9999 or (99) 9999-9999
  return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(phone);
}

export function validatePasswordStrength(password: string): {
  valid: boolean;
  score: number; // 0 - 4
  feedback: string;
} {
  let score = 0;
  let feedback = "Muito fraca";

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 4: feedback = "Forte"; break;
    case 3: feedback = "Média"; break;
    case 2: feedback = "Fraca"; break;
    default: feedback = "Muito fraca";
  }

  return {
    valid: score === 4 && password.length >= 8,
    score,
    feedback,
  };
}

// Allow only basic Latin, numbers, and some punctuation; remove emojis/specials
export function sanitizeTextInput(value: string, maxLength: number = 60): string {
  // Remove emojis, control, and unsupported chars (conservative strategy)
  return value
    .replace(/[\p{Emoji}\p{S}\p{C}]/gu, "")
    .replace(/[^a-zA-Z0-9À-ÿ .,'\-]/g, "") // Allows accented chars used in BR
    .slice(0, maxLength);
}
