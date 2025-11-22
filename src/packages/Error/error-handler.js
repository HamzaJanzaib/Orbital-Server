import { AppError } from "./index.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        console.log(`error: ${req.method} ${req.url} - ${err.message}`);
        return res.status(err.statusCode).send({
            status: 'error',
            message: err.message,
            ...(err.details && { details: err.details })
        });
    }

    console.log("Unexpected error: ", err);
    return res.status(500).send({
        status: 'error',
        message: 'something went wrong please try again later'
    });
}