import type { Context, Next } from "hono";
import { ERROR_MESSAGES } from "@/constants/error.constants";
import { UnauthorizedError } from "../errors/custom.errors";
import { authService } from "../services/auth/auth.service";

/**
 * Middleware for authenticating requests
 * steps:
 * 1. Get token from Authorization header
 * 2. Validate token
 * 3. Attach user info to context
 * 4. Continue to next middleware/route handler
 */
export const authMiddleware = async (c: Context, next: Next) => {
	/** 1. Get token from Authorization header */
	const authHeader = c.req.header("Authorization");

	/** 2. Validate token */
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthorizedError(ERROR_MESSAGES.AUTH.TOKEN_REQUIRED);
	}
	/** 3. Get token */
	const token = authHeader.substring(7); // Remove 'Bearer ' prefix

	try {
		/** 4. Validate token */
		const { userId } = await authService.validateToken(token);
		/** 5. Attach user info to context */
		c.set("userId", userId);
		c.set("user", await authService.getCurrentUser(userId));

		/** 6. Continue to next middleware/route handler */
		await next();
	} catch (_error) {
		throw new UnauthorizedError("Invalid or expired token");
	}
};
