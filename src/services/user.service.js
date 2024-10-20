/* eslint-disable no-console */
const userSignUp = async (fastifyInstance, request) => {
    const { email, password } = request.body;
    let pgClient;
    try {
        const pool = await fastifyInstance.pgPool();
        pgClient = await pool.connect();
        const getUserQuery = {
            text: `SELECT DISTINCT * FROM users WHERE email = $1`,
            values: [email],
        };
        const getUserQueryResponse = await pgClient.query(getUserQuery);
        if (getUserQueryResponse.rowCount > 0) {
            return {
                statusCode: 400,
                body: {
                    message:
                        'User already exists, please register with a different email id',
                },
            };
        }
        const hashPassword = fastifyInstance.generateHash(password);
        const signupQuery = {
            text: `INSERT INTO users(email, password) VALUES($1, $2)`,
            values: [email, hashPassword],
        };

        await pgClient.query(signupQuery);
        return {
            statusCode: 201,
            body: {
                message: 'user registered successfully',
            },
        };
    } catch (err) {
        console.log(err);
        if (pgClient) pgClient.release();
    } finally {
        console.log(pgClient);
        if (pgClient) pgClient.release();
    }
};

const userLogin = async (fastifyInstance, request) => {
    const { email, password } = request.body;
    let pgClient;
    try {
        const pool = await fastifyInstance.pgPool();
        pgClient = await pool.connect();
        const getUserByEmailQuery = {
            text: `SELECT DISTINCT * FROM users WHERE email = $1`,
            values: [email],
        };

        const getUserByEmailQueryResponse =
            await pgClient.query(getUserByEmailQuery);
        if (
            !(
                getUserByEmailQueryResponse &&
                getUserByEmailQueryResponse.rowCount > 0 &&
                fastifyInstance.generateHash(password) ===
                    getUserByEmailQueryResponse.rows[0].password
            )
        ) {
            return {
                statusCode: 401,
                body: {
                    message: 'Invalid email or password',
                },
            };
        }

        const { user_id } = getUserByEmailQueryResponse.rows[0];

        const accessToken = await fastifyInstance.jwt.sign(
            { user_id },
            { expiresIn: '5h' }
        );

        const refreshToken = await fastifyInstance.jwt.sign(
            { user_id },
            { expiresIn: '30d' }
        );

        const refreshTokenInsertQuery = {
            text: `INSERT INTO refreshtokens(user_id, refresh_token, expires_at) values($1, $2, $3)`,
            values: [
                user_id,
                refreshToken,
                Date.now() + 30 * 24 * 60 * 60 * 1000,
            ],
        };

        await pgClient.query(refreshTokenInsertQuery);
        return {
            statusCode: 200,
            body: {
                accessToken,
                refreshToken,
                expiresIn: 5 * 60 * 60,
            },
        };
    } catch (err) {
        console.log(err);
        if (pgClient) pgClient.release();
    } finally {
        if (pgClient) pgClient.release();
    }
};

const getUser = async (fastifyInstance, request) => {
    const { user_id } = request.params;
    let pgClient;
    let responseObject;
    try {
        const pool = await fastifyInstance.pgPool();
        pgClient = await pool.connect();
        const getUserByIdQuery = {
            text: `SELECT DISTINCT * FROM users WHERE user_id = $1`,
            values: [user_id],
        };
        const getUserByIdQueryResponse = await pgClient.query(getUserByIdQuery);
        if (getUserByIdQueryResponse?.rowCount > 0) {
            const { user_id, email } = getUserByIdQueryResponse.rows[0];
            responseObject = {
                statusCode: 200,
                body: {
                    user_id,
                    email,
                },
            };
            return responseObject;
        }

        responseObject = {
            statusCode: 400,
            body: {
                message: 'User not found',
            },
        };

        return responseObject;
    } catch (error) {
        console.log(error);
        if (pgClient) pgClient.release();
    } finally {
        if (pgClient) pgClient.release();
    }
};

export { userSignUp, userLogin, getUser };
