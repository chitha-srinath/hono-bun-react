// Environment validation error messages
export const ENV_VALIDATION_MESSAGES = {
  // Server Configuration
  PORT_MUST_BE_NUMBER: "PORT must be a number",
  PORT_DEFAULT: "3000",

  // Database Configuration
  DB_HOST_REQUIRED: "DB_HOST is required",
  DB_PORT_MUST_BE_NUMBER: "DB_PORT must be a number",
  DB_PORT_DEFAULT: "5432",
  DB_NAME_REQUIRED: "DB_NAME is required",
  DB_USER_REQUIRED: "DB_USER is required",
  DB_PASSWORD_REQUIRED: "DB_PASSWORD is required",

  // JWT Configuration
  JWT_SECRET_REQUIRED: "JWT_SECRET is required",
  JWT_EXPIRES_IN_REQUIRED: "JWT_EXPIRES_IN is required",

  // Application Configuration
  APP_NAME_REQUIRED: "APP_NAME is required",
  APP_URL_MUST_BE_VALID: "APP_URL must be a valid URL",
} as const;
