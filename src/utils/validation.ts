// Form validation helpers ported directly from the legacy teonox website.

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  return /^[6-9]\d{9}$/.test(cleaned);
};

export const validateRequired = (value: unknown): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === "string" && !value.trim()) return false;
  return true;
};

export interface FileValidationResult {
  valid: boolean;
  message?: string;
}

export const validateFile = (file: File | null | undefined): FileValidationResult => {
  if (!file) {
    return { valid: true };
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "Only PDF, DOC and DOCX files are allowed.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      message: "Maximum file size is 5MB.",
    };
  }

  return { valid: true };
};