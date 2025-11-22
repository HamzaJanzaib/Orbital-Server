// swagger.autogen.cjs
import swaggerAutogen from "swagger-autogen";
import Env from "./config/env.js";

const port = Env.PORT || 3000;

const doc = {
    info: {
        title: 'ORBITAL APIS TESTING',
        version: '1.0.0',
        description: 'API for managing person records',
        contact: {
            name: 'ORBITAL Email',
            email: 'orbital.1@gmail.com'
        },
        license: {
            name: 'ISC',
            url: 'https://opensource.org/licenses/ISC'
        }
    },
    servers:
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
            ],
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
                name: 'access-token'
            }
        }
    },
    security: [
        {
            bearerAuth: [],
            cookieAuth: []
        }
    ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    './src/modules/auth/auth.routes.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);
