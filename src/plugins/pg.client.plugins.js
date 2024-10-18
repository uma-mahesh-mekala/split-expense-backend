/* eslint-disable no-console */
import pg from 'pg';
import fastifyPlugin from 'fastify-plugin';
const { Pool } = pg;
const pgClientPlugin = async (fastify) => {
    const pool = new Pool({
        user: fastify.config.DB_USER,
        password: fastify.decrypt(fastify.config.DB_PASSWORD),
        host: fastify.config.DB_HOST,
        port: fastify.config.DB_PORT,
        database: fastify.config.DB_NAME,
    });
    let client;

    try {
        client = await pool.connect();
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }

    fastify.decorate('pgPool', async () => pool);
};

export default fastifyPlugin(pgClientPlugin);
