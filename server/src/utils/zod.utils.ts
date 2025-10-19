import type { ZodError } from "zod";

/**
 * Helper function to handle Zod validation errors consistently across the application
 * Extracts error information without using the deprecated flatten() method
 * @param err - The ZodError instance
 * @returns Object containing fieldErrors and formErrors
 */
export const handleZodError = (err: ZodError) => {
	const fieldErrors: Record<string, string[]> = {};
	const formErrors: string[] = [];

	err.issues.forEach((issue) => {
		if (issue.path.length > 0) {
			const path = issue.path.join(".");
			if (!fieldErrors[path]) {
				fieldErrors[path] = [];
			}
			fieldErrors[path].push(issue.message);
		} else {
			formErrors.push(issue.message);
		}
	});

	return { fieldErrors, formErrors };
};
