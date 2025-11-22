import { createLogger, format, transports } from "winston";
import Env from "./env.js";

const logger = createLogger({
    level: Env.NODE_ENV === "development" ? "debug" : "error",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [ 
        new transports.Console(),
        ...(Env.NODE_ENV === "development"
            ? [new transports.File({ filename: "logs/combined.log" })]
            : [new transports.File({ filename: "logs/error.log", level: "error" })]),
    ],
});

export default logger;