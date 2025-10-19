// Generic success response type
export interface SuccessResponse<T = null> {
	success: true;
	message: string;
	data?: T;
	[key: string]: string | number | boolean | object | T | undefined;
}

// Generic error response type
export interface ErrorResponse {
	success: false;
	message: string;
	errors?: Record<string, unknown> | string[] | string;
	[key: string]: string | number | boolean | object | undefined;
}

// Union type for all responses
export type ApiResponse<T = null> = SuccessResponse<T> | ErrorResponse;

// Helper function to create success responses
export const createSuccessResponse = <T>(
	message: string,
	data?: T,
	additionalFields: Record<
		string,
		string | number | boolean | object | null
	> = {},
): SuccessResponse<T> => ({
	success: true,
	message,
	...(data !== undefined && { data }),
	...additionalFields,
});

// Helper function to create error responses
export const createErrorResponse = (
	message: string,
	errors?: Record<string, unknown> | string[] | string,
	additionalFields: Record<
		string,
		string | number | boolean | object | null
	> = {},
): ErrorResponse => ({
	success: false,
	message,
	...(errors !== undefined && { errors }),
	...additionalFields,
});
