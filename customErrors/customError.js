import { StatusCodes } from "http-status-codes";


export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
        this.name = "NotFoundError";
        this.message = message;
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.name = "BadRequestError";
        this.message = message;
    }
}
export class UnauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
        this.name = "UnauthenticatedError";
        this.message = message;
    }
}
export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
        this.name = "UnauthorizedError";
        this.message = message;
    }
}