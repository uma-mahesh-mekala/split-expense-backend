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
        DB_HOST: {
            type: 'string',
            description: 'Host name for the database',
            default: 'localhost',
        },
        DB_PORT: {
            type: 'integer',
            description: 'port number for the database',
            default: 5432,
        },
        DB_NAME: {
            type: 'string',
            description: 'name of the database',
        },
        DB_USER: {
            type: 'string',
            description: 'database user',
        },
        DB_PASSWORD: {
            type: 'string',
            description: 'database password',
        },
        ENCRYPTION_KEY: {
            type: 'string',
            description: 'Encryption key for crypto plugin',
        },
        ENCRYPTION_ALGORITHM: {
            type: 'string',
            description: 'Encryption algorithm for crypto plugin',
        },
        APP_SECRET: {
            type: 'string',
            description: 'Secret',
        },
        SALT: {
            type: 'string',
            description: 'Salt',
        },
        SECRET: {
            type: 'string',
            description: 'Secret',
        },
    },
};

export default configSchema;
