import rateLimit from 'express-rate-limit';

const globalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 150, // max requests per IP in 10 minutes
    standardHeaders: true, // `RateLimit-*` headers
    legacyHeaders: false, // disable `X-RateLimit-*` headers
    message: {
        status: 429,
        error: "Too many requests from this IP, please try again after 10 minutes."
    }
});

export default globalLimiter

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many login attempts, please try later",
});