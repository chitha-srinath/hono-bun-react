import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { authService } from "../services/auth/auth.service";
import {
	createErrorResponse,
	createSuccessResponse,
} from "../types/response.types";
import {
	loginSchema,
	registerSchema,
	tokenSchema,
} from "../validation/schemas";

// Initialize the auth router
const authRouter = new Hono();

// Register route
authRouter.post("/register", zValidator("json", registerSchema), async (c) => {
	try {
		const reqBody = c.req.valid("json");

		// Call auth service to register user
		const { user, token } = await authService.register(reqBody);

		return c.json(
			createSuccessResponse("User registered successfully", { user, token }),
			201,
		);
	} catch (error) {
		console.error("Registration error:", error);
		return c.json(createErrorResponse("Registration failed"), 500);
	}
});

// Login route
authRouter.post("/login", zValidator("json", loginSchema), async (c) => {
	try {
		const reqBody = c.req.valid("json");

		// Call auth service to login user
		const { user, token } = await authService.login(reqBody);

		return c.json(createSuccessResponse("Login successful", { user, token }));
	} catch (error) {
		console.error("Login error:", error);
		return c.json(createErrorResponse("Login failed"), 500);
	}
});

// Logout route
authRouter.post("/logout", zValidator("json", tokenSchema), async (c) => {
	try {
		const reqBody = c.req.valid("json");

		// Call auth service to logout user
		await authService.logout(reqBody.token);

		return c.json(createSuccessResponse("Logout successful"));
	} catch (error) {
		console.error("Logout error:", error);
		return c.json(createErrorResponse("Logout failed"), 500);
	}
});

// Get current user route
authRouter.get("/me", async (c) => {
	try {
		// In a real implementation, you would get the token from the Authorization header
		// For demo purposes, we'll accept token as a query parameter
		const token = c.req.query("token");

		if (!token) {
			return c.json(createErrorResponse("Token is required"), 400);
		}

		// Validate token and get user ID
		const { userId } = await authService.validateToken(token);

		// Call auth service to get current user
		const user = await authService.getCurrentUser(userId);

		return c.json(
			createSuccessResponse("User retrieved successfully", { user }),
		);
	} catch (error) {
		console.error("Get user error:", error);
		return c.json(createErrorResponse("Failed to get user information"), 500);
	}
});

export default authRouter;
