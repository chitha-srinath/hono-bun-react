import { Hono } from "hono";
import authRouter from "./auth.routes";
import todoRouter from "./todo.routes";
import testRouter from "./test.routes";

// Initialize the main router
const router = new Hono();

// Import all routes here
router.route("/auth", authRouter);
router.route("/todos", todoRouter);
router.route("/test", testRouter);

// Export the main router
export default router;
