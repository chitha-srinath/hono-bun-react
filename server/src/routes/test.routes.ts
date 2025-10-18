import { Hono } from "hono";
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} from "../errors/custom.errors";
import { createSuccessResponse } from "../types/response.types";

const testRouter = new Hono();

// Test route for BadRequestError
testRouter.get("/bad-request", (c) => {
  throw new BadRequestError("This is a bad request error");
});

// Test route for UnauthorizedError
testRouter.get("/unauthorized", (c) => {
  throw new UnauthorizedError("This is an unauthorized error");
});

// Test route for ForbiddenError
testRouter.get("/forbidden", (c) => {
  throw new ForbiddenError("This is a forbidden error");
});

// Test route for NotFoundError
testRouter.get("/not-found", (c) => {
  throw new NotFoundError("This is a not found error");
});

// Test route for ConflictError
testRouter.get("/conflict", (c) => {
  throw new ConflictError("This is a conflict error");
});

// Test route for InternalServerError
testRouter.get("/internal-error", (c) => {
  throw new InternalServerError("This is an internal server error");
});

// Test route for success
testRouter.get("/success", (c) => {
  return c.json(createSuccessResponse("This is a success response"));
});

export default testRouter;
