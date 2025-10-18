import { NODE_ENV } from "@/enums/validation.enum";
import { z } from "zod";
import { handleZodError } from "../utils/zod.utils";
import { ENV_VALIDATION_MESSAGES } from "../constants/env.constants";

// Environment variables validation schema
export const envSchema = z.object({
  // Server Configuration
  PORT: z
    .string()
    .regex(/^\d+$/, ENV_VALIDATION_MESSAGES.PORT_MUST_BE_NUMBER)
    .default(ENV_VALIDATION_MESSAGES.PORT_DEFAULT),
  NODE_ENV: z.enum(NODE_ENV).default(NODE_ENV.DEVELOPMENT),

  // Database Configuration
  DB_HOST: z.string().min(1, ENV_VALIDATION_MESSAGES.DB_HOST_REQUIRED),
  DB_PORT: z
    .string()
    .regex(/^\d+$/, ENV_VALIDATION_MESSAGES.DB_PORT_MUST_BE_NUMBER)
    .default(ENV_VALIDATION_MESSAGES.DB_PORT_DEFAULT),
  DB_NAME: z.string().min(1, ENV_VALIDATION_MESSAGES.DB_NAME_REQUIRED),
  DB_USER: z.string().min(1, ENV_VALIDATION_MESSAGES.DB_USER_REQUIRED),
  DB_PASSWORD: z.string().min(1, ENV_VALIDATION_MESSAGES.DB_PASSWORD_REQUIRED),

  // JWT Configuration
  JWT_SECRET: z.string().min(1, ENV_VALIDATION_MESSAGES.JWT_SECRET_REQUIRED),
  JWT_EXPIRES_IN: z
    .string()
    .min(1, ENV_VALIDATION_MESSAGES.JWT_EXPIRES_IN_REQUIRED),

  // Application Configuration
  APP_NAME: z.string().min(1, ENV_VALIDATION_MESSAGES.APP_NAME_REQUIRED),
  APP_URL: z.url(ENV_VALIDATION_MESSAGES.APP_URL_MUST_BE_VALID),
});

// Type inference for environment variables
export type EnvVariables = z.infer<typeof envSchema>;

// Function to validate environment variables
export const validateEnv = (env: Record<string, string | undefined>) => {
  try {
    const validatedEnv = envSchema.parse(env);
    return { success: true as const, data: validatedEnv };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Use the common Zod error handler
      const { fieldErrors, formErrors } = handleZodError(error);
      return { success: false as const, errors: { fieldErrors, formErrors } };
    }
    return {
      success: false as const,
      errors: { formErrors: ["Unknown error occurred"], fieldErrors: {} },
    };
  }
};
