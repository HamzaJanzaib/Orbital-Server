import morgan from "morgan";
import Env from "../../config/env.js";
import logger from "../../config/logger.js";

const stream = {
    write: (message) => logger.http?.(message.trim()),
};

// Only enable in development
const morganMiddleware =
    Env.NODE_ENV === "development"
        ? morgan(":method :url :status :res[content-length] - :response-time ms", { stream })
        : (req, res, next) => next();

export default morganMiddleware;