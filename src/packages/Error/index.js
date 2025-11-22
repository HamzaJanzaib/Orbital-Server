class AppError extends Error {
    constructor(message, statusCode, isOperational = true, details) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found', details) {
        super(message, 404, true, details);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Validation error', details) {
        super(message, 400, true, details);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', details) {
        super(message, 401, true, details);
    }
}

class ForbiddenError extends AppError {
    constructor(message = 'Forbidden', details) {
        super(message, 403, true, details);
    }
}

class InternalServerError extends AppError {
    constructor(message = 'Internal server error', details) {
        super(message, 500, false, details);
    }
}

class BadRequestError extends AppError {
    constructor(message = 'Bad request', details) {
        super(message, 400, true, details);
    }
}

class ConflictError extends AppError {
    constructor(message = 'Conflict', details) {
        super(message, 409, true, details);
    }
}

class ServiceUnavailableError extends AppError {
    constructor(message = 'Service unavailable', details) {
        super(message, 503, false, details);
    }
}

class GatewayTimeoutError extends AppError {
    constructor(message = 'Gateway timeout', details) {
        super(message, 504, false, details);
    }
}

class PayloadTooLargeError extends AppError {
    constructor(message = 'Payload too large', details) {
        super(message, 413, true, details);
    }
}

class UnsupportedMediaTypeError extends AppError {
    constructor(message = 'Unsupported media type', details) {
        super(message, 415, true, details);
    }
}

class TooManyRequestsError extends AppError {
    constructor(message = 'Too many requests', details) {
        super(message, 429, true, details);
    }
}

class NotImplementedError extends AppError {
    constructor(message = 'Not implemented', details) {
        super(message, 501, false, details);
    }
}

class ConflictResourceError extends AppError {
    constructor(message = 'Conflict resource', details) {
        super(message, 409, true, details);
    }
}

class PreconditionFailedError extends AppError {
    constructor(message = 'Precondition failed', details) {
        super(message, 412, true, details);
    }
}

class UnprocessableEntityError extends AppError {
    constructor(message = 'Unprocessable entity', details) {
        super(message, 422, true, details);
    }
}

class MethodNotAllowedError extends AppError {
    constructor(message = 'Method not allowed', details) {
        super(message, 405, true, details);
    }
}

class ConflictOperationError extends AppError {
    constructor(message = 'Conflict operation', details) {
        super(message, 409, true, details);
    }
}

class RequestTimeoutError extends AppError {
    constructor(message = 'Request timeout', details) {
        super(message, 408, false, details);
    }
}

class NetworkError extends AppError {
    constructor(message = 'Network error', details) {
        super(message, 503, false, details);
    }
}

class DatabaseError extends AppError {
    constructor(message = 'Database error', details) {
        super(message, 500, false, details);
    }
}

class ExternalServiceError extends AppError {
    constructor(message = 'External service error', details) {
        super(message, 502, false, details);
    }
}

class AuthenticationError extends AppError {
    constructor(message = 'Authentication error', details) {
        super(message, 401, true, details);
    }
}

export {
    AppError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    InternalServerError,
    BadRequestError,
    ConflictError,
    ServiceUnavailableError,
    GatewayTimeoutError,
    PayloadTooLargeError,
    UnsupportedMediaTypeError,
    TooManyRequestsError,
    NotImplementedError,
    ConflictResourceError,
    PreconditionFailedError,
    UnprocessableEntityError,
    MethodNotAllowedError,
    ConflictOperationError,
    RequestTimeoutError,
    NetworkError,
    DatabaseError,
    ExternalServiceError,
    AuthenticationError
};
