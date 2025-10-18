// Error messages for Todo operations
export const ERROR_MESSAGES = {
  TODO: {
    NOT_FOUND: "Todo not found",
    FETCH_FAILED: "Failed to fetch todos",
    CREATE_FAILED: "Failed to create todo",
    UPDATE_FAILED: "Failed to update todo",
    DELETE_FAILED: "Failed to delete todo",
    TOGGLE_FAILED: "Failed to toggle todo",
  },
  AUTH: {
    TOKEN_REQUIRED: "Token required",
    INVALID_TOKEN: "Invalid token",

  },
  GENERAL: {
    INTERNAL_SERVER_ERROR: "Internal server error",
  },
} as const;
