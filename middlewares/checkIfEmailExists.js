const User = require('../models/user');

const checkIfEmailExists = async (req, res, next) => {
    try {
        const { email } = req.body;
        const response = await User.findOne({email: email});
        if(response){
            res.status(404).send({message: 'Email adress already exists'})
        } else {
            next();
        }
    } catch (err) {
        console.error('error on verify mail happened:', err)
        next(err);
    }
}

module.exports = checkIfEmailExists;