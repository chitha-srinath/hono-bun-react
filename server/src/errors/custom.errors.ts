// Base custom error class
export class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 Bad Request
export class BadRequestError extends CustomError {
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}

// 401 Unauthorized
export class UnauthorizedError extends CustomError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

// 403 Forbidden
export class ForbiddenError extends CustomError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

// 404 Not Found
export class NotFoundError extends CustomError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

// 409 Conflict
export class ConflictError extends CustomError {
  constructor(message: string = "Conflict") {
    super(message, 409);
  }
}

// 500 Internal Server Error
export class InternalServerError extends CustomError {
  constructor(message: string = "Internal Server Error") {
    super(message, 500, false); // Not operational, might be a programming error
  }
}

// 422 Unprocessable Entity
export class ValidationError extends CustomError {
  constructor(message: string = "Validation Error") {
    super(message, 422);
  }
}

// 401 Unauthenticated (specific for authentication failures)
export class UnauthenticatedError extends CustomError {
  constructor(message: string = "Unauthenticated") {
    super(message, 401);
  }
}
