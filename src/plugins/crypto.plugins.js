import crypto from 'node:crypto';
import fastifyPlugin from 'fastify-plugin';

const cryptoPlugin = async (fastify) => {
    const ENCRYPTION_KEY = crypto.scryptSync(
        process.env.ENCRYPTION_KEY,
        'salt',
        32
    ); // Must be 256 bits (32 characters)
    const IV_LENGTH = 16; // For AES, this is always 16
    const salt = fastify.config.SALT;

    function encrypt(text) {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(
            fastify.config.ENCRYPTION_ALGORITHM,
            Buffer.from(ENCRYPTION_KEY),
            iv
        );
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    function decrypt(text) {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(
            fastify.config.ENCRYPTION_ALGORITHM,
            Buffer.from(ENCRYPTION_KEY),
            iv
        );
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }

    function generateHash(text) {
        const key = crypto.pbkdf2Sync(text, salt, 100000, 64, 'sha512');
        const hashText = key.toString('hex');
        return hashText;
    }

    fastify.decorate('encrypt', encrypt);
    fastify.decorate('decrypt', decrypt);
    fastify.decorate('generateHash', generateHash);
};

export default fastifyPlugin(cryptoPlugin);
