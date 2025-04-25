import { GraphQLError } from "graphql";
import { AppError, ValidationError } from "./errors";

export const errorHandler = (err: GraphQLError) => {
    const originalError = err.originalError;

    if (originalError instanceof AppError) {
        // Return a properly formatted error with status code
        return {
            message: originalError.message,
            statusCode: originalError.statusCode,
            path: err.path,
            // Don't send stack trace in production
            ...(process.env.NODE_ENV === 'development' && { stack: originalError.stack })
        };
    }

    // For unexpected errors, log them and return a generic message
    console.error('Unexpected error:', err);

    return {
        message: 'An unexpected error occurred',
        statusCode: 500,
        path: err.path,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };
}

export const asyncErrorHandler = (fn: Function) => async (...args: any[]) => {
    try {
        return await fn(...args);
    } catch (error: any) {
        if (error.name === 'ValidationError' && error.errors) {
            // Handle mongoose validation errors
            throw new ValidationError(
                Object.values(error.errors).map((err: any) => err.message).join(', ')
            );
        }

        // Re-throw the error for the central error handler
        throw error;
    }
};
