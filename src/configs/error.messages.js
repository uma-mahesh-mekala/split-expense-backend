import fastifyPlugin from 'fastify-plugin';

const errorMessages = [
    {
        code: 10001,
        field: null,
        message: 'Something Went Wrong, please try again after sometime.',
        value: null,
    },
    {
        code: 10002,
        field: null,
        message: 'The resource URI you are searching for is not found.',
        value: null,
    },
    {
        code: 10099,
        field: null,
        message: 'Error message not defined in the system',
        value: null,
    },
];

const ErrorMessagePlugin = async (fastify) => {
    fastify.decorate('errorMessages', errorMessages);
};

export default fastifyPlugin(ErrorMessagePlugin);
