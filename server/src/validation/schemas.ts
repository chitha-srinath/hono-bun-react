import { z } from "zod";
import { VALIDATION_MESSAGES } from "../constants/validation.constants";

// Auth validation schemas
export const registerSchema = z
	.object({
		username: z.string().min(3, VALIDATION_MESSAGES.AUTH.USERNAME_MIN_LENGTH),
		email: z.email(VALIDATION_MESSAGES.AUTH.EMAIL_INVALID),
		password: z.string().min(6, VALIDATION_MESSAGES.AUTH.PASSWORD_MIN_LENGTH),
	})
	.strict();

export const loginSchema = z
	.object({
		email: z.email(VALIDATION_MESSAGES.AUTH.EMAIL_INVALID),
		password: z.string().min(1, VALIDATION_MESSAGES.AUTH.PASSWORD_REQUIRED),
	})
	.strict();

export const tokenSchema = z
	.object({
		token: z.string().min(1, VALIDATION_MESSAGES.AUTH.TOKEN_REQUIRED),
	})
	.strict();

// Todo validation schemas
export const createTodoSchema = z
	.object({
		title: z
			.string()
			.min(1, VALIDATION_MESSAGES.TODO.TITLE_REQUIRED)
			.max(100, VALIDATION_MESSAGES.TODO.TITLE_MAX_LENGTH),
		description: z
			.string()
			.max(500, VALIDATION_MESSAGES.TODO.DESCRIPTION_MAX_LENGTH)
			.optional(),
	})
	.strict();

export const updateTodoSchema = z
	.object({
		title: z
			.string()
			.min(1, VALIDATION_MESSAGES.TODO.TITLE_REQUIRED)
			.max(100, VALIDATION_MESSAGES.TODO.TITLE_MAX_LENGTH)
			.optional(),
		description: z
			.string()
			.max(500, VALIDATION_MESSAGES.TODO.DESCRIPTION_MAX_LENGTH)
			.optional(),
		completed: z.boolean().optional(),
	})
	.strict();

export const idSchema = z
	.object({
		id: z.string().regex(/^\d+$/, VALIDATION_MESSAGES.TODO.ID_MUST_BE_POSITIVE),
	})
	.strict();

// Type inference
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
