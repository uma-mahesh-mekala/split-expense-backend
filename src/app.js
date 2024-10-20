/* eslint-disable no-console */
import fastify from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import fastifyOpenapiGlue from 'fastify-openapi-glue';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import 'dotenv/config';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import serviceHandlers from './swagger-definition/index.js';
import securityHandlers from './swagger-definition/security.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openApiGlueOptions = {
    specification: join(__dirname, 'swagger-definition/swagger.yaml'),
    serviceHandlers,
    securityHandlers,
};

const buildServer = async () => {
    const fastifyInstance = fastify({
        logger: true,
        ajv: {
            customOptions: {
                strict: false,
                removeAdditional: false,
                allErrors: true,
            },
        },
    });

    fastifyInstance
        .register(fastifyAutoload, {
            dir: join(__dirname, 'configs'),
        })
        .register(fastifyAutoload, {
            dir: join(__dirname, 'plugins'),
        })
        .register(fastifyJwt, {
            secret: process.env.SECRET,
        })
        .register(fastifySwagger, {
            mode: 'static',
            specification: {
                path: './src/swagger-definition/swagger.yaml',
                postProcessor: function (swaggerObject) {
                    return swaggerObject;
                },
                baseDir: '',
            },
        })
        .register(fastifySwaggerUi, {
            routePrefix: '/swagger',
            uiConfig: {
                docExpansion: 'full',
                deepLinking: false,
            },
            staticCSP: true,
        })
        .register(fastifyOpenapiGlue, openApiGlueOptions);

    return fastifyInstance;
};

buildServer()
    .then((fastifyInstance) => {
        console.log(fastifyInstance.printRoutes());
        const serverOptions = {
            port: fastifyInstance.config.APP_PORT,
            host: fastifyInstance.config.APP_HOST,
        };

        fastifyInstance.listen(serverOptions, (err, address) => {
            if (err) {
                fastifyInstance.log.error(err);
                process.exit(1);
            }
            fastifyInstance.log.info(
                `Server successfully running on ${address}`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });
