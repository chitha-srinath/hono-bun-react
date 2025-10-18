import { Hono } from "hono";
import authRouter from "./auth.routes";
import todoRouter from "./todo.routes";

// Initialize the main router
const router = new Hono();

// Import all routes here
router.route("/auth", authRouter);
router.route("/todos", todoRouter);

// Export the main router
export default router;
export type AppType = typeof router;
