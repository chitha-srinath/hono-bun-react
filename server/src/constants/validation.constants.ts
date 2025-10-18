// Validation error messages for Zod schemas
export const VALIDATION_MESSAGES = {
  AUTH: {
    USERNAME_REQUIRED: "Username is required",
    USERNAME_MIN_LENGTH: "Username must be at least 3 characters",
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Invalid email address",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
    TOKEN_REQUIRED: "Token is required",
  },

  TODO: {
    TITLE_REQUIRED: "Title is required",
    TITLE_MAX_LENGTH: "Title must be less than 100 characters",
    DESCRIPTION_MAX_LENGTH: "Description must be less than 500 characters",
    ID_MUST_BE_POSITIVE: "ID must be a positive integer",
  },

  GENERAL: {
    // Generic validation messages
    INVALID_INPUT: "Invalid input provided",
    VALIDATION_FAILED: "Validation failed",
  },
} as const;
