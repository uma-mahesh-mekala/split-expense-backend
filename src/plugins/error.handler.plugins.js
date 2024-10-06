import fastifyPlugin from 'fastify-plugin';

const ErrorHandlerPlugin = async (fastify) => {
    const createValidationError = async (error) => {
        const { validation } = error;
        const messages = validation.map((message) => ({
            message: message.message,
        }));

        return {
            httpStatus: 400,
            errors: messages,
        };
    };
    fastify.setErrorHandler(async (error, request, reply) => {
        let response;
        const { validationContext } = error;
        if (validationContext) {
            response = {
                statusCode: 400,
                body: {
                    httpStatus: 400,
                    body: await createValidationError(error),
                },
            };
        } else {
            const customErrorMessage = await fastify.getErrorMessage(
                'INTERNAL_SERVER_ERROR'
            );

            response = {
                statusCode: 400,
                body: {
                    httpStatus: 400,
                    errors: [customErrorMessage],
                },
            };
        }

        reply.status(response.statusCode).send(response.body);
    });
    fastify.setNotFoundHandler(async (request, reply) => {
        const errorMessage = await fastify.getErrorMessage('URI_NOT_FOUND');
        reply.status(404).send({
            httpStatus: 404,
            errors: [errorMessage],
        });
    });
};

export default fastifyPlugin(ErrorHandlerPlugin);
