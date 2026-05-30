// src/utils/validation/emailValidator.ts

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const emailErrors = {
  INVALID_FORMAT: "Invalid email format",
  REQUIRED: "Email is required",
};
