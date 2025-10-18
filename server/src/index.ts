import { Hono } from "hono";
import { errorHandler } from "./middleware/error.middleware";
import router from "./routes/index.routes";
import { createSuccessResponse } from "./types/response.types";
import { NotFoundError } from "./errors/custom.errors";

const app = new Hono();

// Global error handler
app.onError(errorHandler);

// Health check route
app.get("/health", (c) => {
  return c.json(
    createSuccessResponse("Server is running", {
      timestamp: new Date().toISOString(),
    })
  );
});

// API routes
app.route("/api", router);

// Catch-all route for unmatched routes
app.notFound((c) => {
  throw new NotFoundError(`Route not found: ${c.req.method} ${c.req.url}`);
});

export default app;
