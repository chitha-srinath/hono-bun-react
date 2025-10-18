import { validateEnv, type EnvVariables } from "@/validation/env.validation";

// Load and validate environment variables
export const loadEnv = (): EnvVariables => {
  // In Bun, process.env is automatically populated from .env file
  const env = process.env;

  const result = validateEnv(env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(JSON.stringify(result.errors, null, 2));
    process.exit(1);
  }

  console.log("✅ Environment variables validated successfully");
  return result.data;
};

// Export validated environment variables
export const env = loadEnv();
