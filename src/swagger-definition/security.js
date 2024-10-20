/* eslint-disable no-console */
export default {
    initialize: async (schemes) => {
        console.log('Initialize', JSON.stringify(schemes));
    },

    splitExpenseAuth: async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            console.log(err);
            reply.status(401).send({
                message: 'you are not authorized to access the resource',
            });
        }
    },
};
