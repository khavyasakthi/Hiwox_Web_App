export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidPhone = (phone: string): boolean =>
  /^[+]?[\d\s\-()]{7,15}$/.test(phone.trim());

export const isValidPassword = (password: string): boolean =>
  password.length >= 6;

export const isValidOtp = (otp: string): boolean =>
  /^\d{6}$/.test(otp.trim());

export const isNonEmpty = (value: string): boolean =>
  value.trim().length > 0;
