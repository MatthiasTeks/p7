const express = require('express');
const authController = require('../controllers/auth');
const checkIfEmailExists = require('../middlewares/checkIfEmailExists');
const hashPassword = require('../middlewares/hashPassword');
const router = express.Router();

router.post('/signup', checkIfEmailExists, hashPassword, authController.createUser);
router.post('/login', authController.loginUser);

module.exports = router;