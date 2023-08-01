const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
        if(isValidToken){
            req.userId = isValidToken.id;
            next();
        } else {
            res.status(401).send({message: "Invalid token"})
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = verifyToken;