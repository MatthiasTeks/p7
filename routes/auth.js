const express = require('express');
const authController = require('../controllers/auth');
const checkIfEmailExists = require('../middlewares/email-exist');
const hashPassword = require('../middlewares/hash-password');
const validateEmail = require('../middlewares/validateEmail');
const router = express.Router();

router.post('/signup', 
    validateEmail,
    checkIfEmailExists, 
    hashPassword, 
    authController.createUser
);
router.post('/login', authController.loginUser);

module.exports = router;