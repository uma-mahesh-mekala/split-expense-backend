const configSchema = {
    title: 'Config Schema',
    description: 'This is schema for the application environment variables',
    type: 'object',
    required: ['APP_PORT', 'APP_HOST'],
    properties: {
        APP_PORT: {
            type: 'integer',
            description: 'Port number on which the apllication runs',
            default: 3000,
        },
        APP_HOST: {
            type: 'string',
            description: 'Host name of the application',
        },
    },
};

export default configSchema;
