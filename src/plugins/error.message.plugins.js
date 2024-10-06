import fastifyPlugin from 'fastify-plugin';

const ErrorMessagePlugin = async (fastify) => {
    const getErrorMessage = async (errorConstant) => {
        let errorMessage;
        const errorMessageId = await fastify.errorConstants[errorConstant];
        errorMessage = fastify.errorMessages.find(
            (errorMessage) => errorMessage.code === errorMessageId
        );
        if (!errorMessage) {
            const errorMessageId =
                await fastify.errorConstants['MESSAGE_NOT_DEFINED'];
            errorMessage = fastify.errorMessages.find(
                (errorMessage) => errorMessage.code === errorMessageId
            );
        }
        return errorMessage;
    };

    fastify.decorate('getErrorMessage', getErrorMessage);
};

export default fastifyPlugin(ErrorMessagePlugin);
