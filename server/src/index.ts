import { Hono } from "hono";
import { NotFoundError } from "./errors/custom.errors";
import { errorHandler } from "./middleware/error.middleware";
import router from "./routes/index.routes";
import { createSuccessResponse } from "./types/response.types";
import { env } from "./utils/env.utils";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { rateLimiter } from "hono-rate-limiter";

const app = new Hono();// Apply the rate limiting middleware to all requests.

app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
		standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
		keyGenerator: (c) => c.get('requestId') // Method to generate custom identifiers for clients.
		// store: ... , // Redis, MemoryStore, etc. See below.
	})
);

// Global error handler
app.use(
	"*",
	cors({
		origin: "*",
		allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"] as const,
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

if (env.NODE_ENV === "development") {
	app.use("*", logger());
}

app.onError(errorHandler);

// Health check route
app.get("/health", (c) => {
	return c.json(
		createSuccessResponse("Server is running", {
			timestamp: new Date().toISOString(),
		}),
	);
});

// API routes
app.route("/api", router);

// Catch-all route for unmatched routes
app.notFound((c) => {
	throw new NotFoundError(`Route not found: ${c.req.method} ${c.req.url}`);
});

export default {
	port: env.PORT,
	fetch: app.fetch,
};
