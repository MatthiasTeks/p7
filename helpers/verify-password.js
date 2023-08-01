const argon2 = require('argon2');
const hash = require("../middlewares/hash-password");

const verifyPassword = async (plainPassword, hashedPassword,) => {
    if (!hashedPassword) {
        throw new Error('Invalid hashed password');
    }

    try {
        return await argon2.verify(hashedPassword, plainPassword, hash.hashingOptions);
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe: ', error);
        throw error;
    }
};

module.exports = verifyPassword;