export default async (request, reply) => {
    const { email } = request.body;

    reply.status(200).send({ message: `${email} is successfully registered` });
};
