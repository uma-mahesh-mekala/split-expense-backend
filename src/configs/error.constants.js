import fastifyPlugin from 'fastify-plugin';

const errorConstants = {
    INTERNAL_SERVER_ERROR: 10001,
    URI_NOT_FOUND: 10002,
    MESSAGE_NOT_DEFINED: 10099,
};

const errorConstantsPlugin = async (fastify) => {
    fastify.decorate('errorConstants', errorConstants);
};

export default fastifyPlugin(errorConstantsPlugin);
