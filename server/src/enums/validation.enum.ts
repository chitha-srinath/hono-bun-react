// Validation error codes enum
export enum ValidationErrorCodes {
  // Auth validation codes
  USERNAME_REQUIRED = "USERNAME_REQUIRED",
  USERNAME_MIN_LENGTH = "USERNAME_MIN_LENGTH",
  EMAIL_REQUIRED = "EMAIL_REQUIRED",
  EMAIL_INVALID = "EMAIL_INVALID",
  PASSWORD_REQUIRED = "PASSWORD_REQUIRED",
  PASSWORD_MIN_LENGTH = "PASSWORD_MIN_LENGTH",
  TOKEN_REQUIRED = "TOKEN_REQUIRED",

  // Todo validation codes
  TITLE_REQUIRED = "TITLE_REQUIRED",
  TITLE_MAX_LENGTH = "TITLE_MAX_LENGTH",
  DESCRIPTION_MAX_LENGTH = "DESCRIPTION_MAX_LENGTH",
  ID_MUST_BE_POSITIVE = "ID_MUST_BE_POSITIVE",

  // Generic validation codes
  INVALID_INPUT = "INVALID_INPUT",
  VALIDATION_FAILED = "VALIDATION_FAILED",
}

export enum NODE_ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

// Validation targets enum
export enum ValidationTargets {
  JSON = "json",
  QUERY = "query",
  PARAM = "param",
}
