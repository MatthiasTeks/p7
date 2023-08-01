const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyPassword = require("../helpers/verify-password");

require('dotenv').config();

const createUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    res.status(201).json({message: 'User saved successfully'});
  } catch (err) {
    console.error('error get all books:', err)
    res.status(500).json({ error: err.toString() });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email: email})
    if(!existingUser){
      res.status(404).json({ message: "Email not found"});
    } else {
      const isPasswordCorrect = await verifyPassword(password, existingUser.password);
      if (!isPasswordCorrect) {
        res.status(401).send("Invalid credentials");
      } else {
        const payload = {id: existingUser.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ userId: existingUser.id.toString(), token: token });
      }
    }
  } catch (err) {
    console.error('error to login user:', err);
    res.status(500).json({error: 'An error occurred while creating the book.'});
  }
}

module.exports = {
  createUser,
  loginUser
}