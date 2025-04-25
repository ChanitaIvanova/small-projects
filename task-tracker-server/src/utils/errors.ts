export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class AuthenticationError extends AppError {
    constructor(message = 'Not authenticated') {
        super(message, 401);
    }
}

export class AuthorizationError extends AppError {
    constructor(message = 'Not authorized') {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(entity = 'Resource', message = `${entity} not found`) {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Invalid input data') {
        super(message, 400);
    }
}

export class EmailInUseError extends AppError {
    constructor(message = 'Email already in use') {
        super(message, 400);
    }
}