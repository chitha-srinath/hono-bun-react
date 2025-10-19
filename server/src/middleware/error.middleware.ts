import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import { ERROR_MESSAGES } from "@/constants/error.constants";
import { CustomError } from "../errors/custom.errors";
import { createErrorResponse } from "../types/response.types";
import { handleZodError } from "../utils/zod.utils";

export const errorHandler = (err: Error, c: Context) => {
	if (err instanceof CustomError) {
		return c.json(
			createErrorResponse(err.message, undefined, {
				errorType: err.constructor.name,
			}),
			err.statusCode as ContentfulStatusCode,
		);
	}

	// Handle Zod validation errors
	if (err instanceof ZodError) {
		const { fieldErrors, formErrors } = handleZodError(err);
		console.log("Zod Error:", fieldErrors, formErrors);
		return c.json(
			createErrorResponse(ERROR_MESSAGES.GENERAL.VALIDATION_FAILED, {
				fieldErrors,
				formErrors,
			}),
			400,
		);
	}

	// Handle generic errors
	return c.json(
		createErrorResponse(
			ERROR_MESSAGES.GENERAL.INTERNAL_SERVER_ERROR,
			undefined,
			{
				errorType: "INTERNAL_ERROR",
			},
		),
		500,
	);
};
