import { refreshToken } from '../services/user.service.js';

export default async (request, reply) => {
    const fastifyInstance = request.server;
    const response = await refreshToken(fastifyInstance, request);

    reply.status(response.statusCode).send(response.body);
};
