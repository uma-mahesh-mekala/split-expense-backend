import fastifyPlugin from 'fastify-plugin';
import fastifyEnv from '@fastify/env';
import configSchema from '../schemas/config.schema.js';
import 'dotenv/config';

const configsPlugin = async (fastify) => {
    const options = {
        configKey: 'config',
        schema: configSchema,
        dotenv: true,
    };
    fastify.register(fastifyEnv, options);
};

export default fastifyPlugin(configsPlugin);
