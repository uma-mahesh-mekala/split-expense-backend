import addUser from '../requestHandlers/user.signup.handler.js';
import loginUser from '../requestHandlers/user.login.handler.js';
import getUser from '../requestHandlers/get.user.handler.js';
import refreshToken from '../requestHandlers/refresh.token.handler.js';

export default {
    addUser,
    loginUser,
    getUser,
    refreshToken,
};
