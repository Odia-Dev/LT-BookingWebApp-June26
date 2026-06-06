export const isValidMobile = (mobile: string): boolean => {
  return /^\+91[0-9]{10}$/.test(mobile);
};

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
