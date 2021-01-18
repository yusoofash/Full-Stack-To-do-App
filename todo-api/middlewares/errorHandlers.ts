import { Request, Response, NextFunction } from 'express';
import { APIError } from '../classes/APIError';

export const defaultErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ status: 'fail', message: 'An error occured ' + err })
};

export function routeNotFoundHandler(req: Request, res: Response, next: NextFunction) {
    return res.status(404).json({
        status: 'fail',
        data: 'Requested resource not found'
    });
}

export function apiErrorHandler(err: APIError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof APIError) {
        if (!err.data) {
            return res.sendStatus(err.statusCode);
        }

        return res.status(err.statusCode).json({
            status: 'fail',
            data: err.data
        });
    }

    next(err);
}
