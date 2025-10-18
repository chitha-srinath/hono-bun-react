import { zValidator } from "@hono/zod-validator";
import { ZodError, ZodType } from "zod";
import { VALIDATION_MESSAGES } from "../constants/validation.constants";
import { createErrorResponse } from "../types/response.types";
import { handleZodError } from "../utils/zod.utils";
import { ValidationTargets } from "../enums/validation.enum";

// Validation middleware that handles errors gracefully
const validateRequest = <T extends ZodType>(
  schema: T,
  target: ValidationTargets = ValidationTargets.JSON
) => {
  // For now, return zValidator directly to preserve type information
  return zValidator(target, schema);
};

export default validateRequest;