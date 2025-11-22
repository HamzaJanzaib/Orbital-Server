import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.string().default("5000"),
    DATABASE_URL: z.string().url(),
    BACKEND_URL: z.string().url(),
    JWT_SECRET_ACCESS: z.string().min(32, "JWT_SECRET must be at least 32 chars"),
    JWT_SECRET_REFRESH: z.string().min(32, "JWT_SECRET must be at least 32 chars"),
    EMAIL_SERVICE: z.string(),
    EMAIL_PORT: z.string(),
    EMAIL_USER: z.string(),
    EMAIL_PASSWORD: z.string(),
    EMAIL_FROM: z.string()
});

const Env = envSchema.parse(process.env);

export default Env;