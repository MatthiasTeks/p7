const argon2 = require('argon2');
const hashingOptions = require('../config/hashOptions');

const hashPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const hashedPassword = await argon2.hash(password, hashingOptions);
        req.body.password = hashedPassword;
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = hashPassword;