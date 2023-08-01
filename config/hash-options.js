const argon2 = require('argon2');

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    iterations: 3,
    parallelism: 2,
    hashLength: 50,
};

module.exports = hashingOptions;