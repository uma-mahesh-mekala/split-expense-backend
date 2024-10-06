import fastifyPlugin from 'fastify-plugin';

const appConstantsPlugin = async (fastify) => {
    const appConstants = {
        token: 'test-token',
    };

    fastify.decorate('appConstants', appConstants);
};

export default fastifyPlugin(appConstantsPlugin);
