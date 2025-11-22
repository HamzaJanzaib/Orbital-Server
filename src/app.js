import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { dirname } from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import morganMiddleware from './packages/middleware/morgan.js';
import globalLimiter from './packages/middleware/rateLimiter.js';
import logger from './config/logger.js';
import { errorHandler } from './packages/Error/error-handler.js';
import Env from './config/env.js';
// Initialize Express application
const app  = express();
const port = Env.PORT;

/**
 * ========================
 * Swagger Configuration
 * ========================
 */

// Get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BOOKSSPINE APIS TESTING',
            version: '1.0.0',
            description: 'API for managing person records',
            contact: {
                name: 'BOOKSSPINE Email',
                email: 'booksspine.1@gmail.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        servers: (
            Env.NODE_ENV === "development"
                ? [
                    {
                        url: `http://localhost:${port}/api/v1`,
                        description: 'Development server'
                    },
                    {
                        url: Env.BACKEND_URL || `http://localhost:${port}/api/v1`,
                        description: 'Production server'
                    }
                ]
                : [
                    {
                        url: Env.BACKEND_URL || `http://localhost:${port}/api/v1`,
                        description: 'Production server'
                    }
                ]
        ),
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'access-token',
                }
            }
        },
        security: [{
            bearerAuth: [],
            cookieAuth: [],
        }]
    },
    apis: [
        `${__dirname}/modules/auth/Swagger/auth.swagger.yml`,
        `${__dirname}/modules/user/Swagger/user.swagger.yml`,
        `${__dirname}/modules/invite/Swagger/invite.swagger.yml`,
    ]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

/**
 * ======================================
 * MIDDLEWARE CONFIGURATION
 * ======================================
 */

// configure helmet
app.use(helmet());
// ---------------- configure helmet end

// configure morgan
app.use(morganMiddleware);
// ---------------- configure morgan end

// configure Rate Limiter
app.use(globalLimiter);
// ---------------- configure Rate Limiter end

// CORS configuration
app.use(cors());
// -------------- CORS config end

// Basic HTTP Data transfer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -------------- Basic HTTP Data transfer end

// Cookie parser configuration
app.use(cookieParser());
// -------------- CookieParser end

/**
 * ========================
 * API Documentation Route
 * ========================
 */

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve raw Swagger JSON
app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        timestamp: new Date().toISOString(),
    });
});

/**
 * ======================================
 * ROUTES CONFIGURATION
 * ======================================
*/

// Routes
// app.use("/api/v1/auth", AuthRoutes)
// app.use("/api/v1/users", UserRoutes)
// app.use("/api/v1/invites", InviteRoutes)
// -------------- Routes end

/**
 * ======================================
 * ERROR HANDLING MIDDLEWARE
 * ======================================
 */


app.use(errorHandler);
// 404 Not Found handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    logger.error(`Global error handler: ${err.stack}`)

    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: Env.NODE_ENV === 'development' ? err.message : undefined
    });
});

/**
 * ======================================
 * SERVER INITIALIZATION
 * ======================================
*/
const startServer = async () => {
    try {
        await app.listen(port);
        logger.info(`🚀 App started in http://localhost:${port}`);
        logger.info(`🚀 Swagger started in  http://localhost:${port}/api-docs`);
        logger.info(`Check The Server Healt  http://localhost:${port}/health`)
    } catch (error) {
        logger.error(`Failed to start server: ${error}`)
    }
};

// Call Server start function
startServer();

// Export for others purposes
export default app;