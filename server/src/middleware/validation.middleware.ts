import { zValidator } from "@hono/zod-validator";
import { ZodError, ZodType } from "zod";
import { VALIDATION_MESSAGES } from "../constants/validation.constants";
import { createErrorResponse } from "../types/response.types";
import { handleZodError } from "../utils/zod.utils";
import { ValidationTargets } from "../enums/validation.enum";

// Validation middleware that handles errors gracefully
export const validate = <T extends ZodType>(
  schema: T,
  target: ValidationTargets = ValidationTargets.JSON
) => {
  return zValidator(target, schema, (result, c) => {
    if (!result.success) {
      // Type guard to check if it's a ZodError
      if (result.error instanceof ZodError) {
        // Use the common Zod error handler
        const { fieldErrors, formErrors } = handleZodError(result.error);

        return c.json(
          createErrorResponse(VALIDATION_MESSAGES.VALIDATION_FAILED, {
            fieldErrors,
            formErrors,
          }),
          400
        );
      }

      // Handle other types of errors
      const errorMessage =
        typeof result.error === "string"
          ? result.error
          : JSON.stringify(result.error);

      return c.json(
        createErrorResponse(
          VALIDATION_MESSAGES.VALIDATION_FAILED,
          errorMessage
        ),
        400
      );
    }
  });
};
