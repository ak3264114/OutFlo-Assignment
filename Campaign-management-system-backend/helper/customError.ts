import { ValidationError } from 'express-validation';
import { Request, Response, NextFunction } from 'express';
import { ERROR_TYPES } from '../config/constant';

export class CustomError extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.name = 'Custom Error';
        this.code = code;
    }
}

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    _next: NextFunction
): void => { // Ensure this returns `void`, not a Response
    if (error.status === 404) {
        res.status(404).json({
            error: true,
            message: 'Not Found',
            errType: ERROR_TYPES.HTTP,
        });
        return; // return after calling res to ensure it does not proceed
    }

    if (error instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};

        const details = error.details as Record<string, { path: string[]; message: string }[]>;

        Object.keys(details).forEach((key) => {
            const errorArray = details[key];
            errorArray.forEach((d) => {
                validationErrors[d.path.join('.')] = d.message;
            });
        });

        res.status(400).json({
            error: true,
            message: 'Validation Error',
            details: validationErrors,
            errType: ERROR_TYPES.VALIDATION,
        });
        return; // return after calling res to ensure it does not proceed
    }

    if (error instanceof CustomError) {
        res.status(200).json({
            error: true,
            message: String(error.message),
            errType: ERROR_TYPES.CUSTOM,
        });
        return; // return after calling res to ensure it does not proceed
    }

    console.error(error);

    res.status(500).json({
        error: true,
        message:
            req.app.get('env') === 'development'
                ? String(error.message)
                : 'An unexpected Error occurred',
        errType: ERROR_TYPES.UNEXPECTED,
        stack: req.app.get('env') === 'development' ? error.stack : undefined,
    });
};
