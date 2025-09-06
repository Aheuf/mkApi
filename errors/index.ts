export class ForbiddenError extends Error {
    constructor(message = "Forbidden") {
        super(message);
    }
}

export class NotFoundError extends Error {
    constructor(message = "Not Found") {
        super(message);
    }
}

export class UsernameTakenError extends Error {
    constructor(message = "Username Taken") {
        super(message);
    }
}

export class WrongCredentialsError extends Error {
    constructor(message = "Username or Password is incorrect") {
        super(message);
    }
}