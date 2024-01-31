const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const requiredAuth = require('../middleware/requiredAuth');
require('dotenv').config();


const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handler middleware
const errorHandler = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password,confirmpass } = req.body;
    console.log(name, email,password,confirmpass)
    if (!name || !email || !password || !confirmpass) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if(password!==confirmpass){
      return res.status(400).json({error:'Password and confirm password should be same'})
    }
    const existingUser =await User.findOne({email});
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmpass, 10);
    const user = new User({ name, email, password: hashedPassword,confirmpass:hashedConfirmPassword});
    await user.save();
    const token = jwt.sign({ user: user.email }, process.env.JWT_SECRET_KEY);
    res.json({ success: true, token, user:email, name:name });
  } catch (error) {
    errorHandler(res, error);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password} = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res.json({ success: true, token,user});
  } catch (error) {
    errorHandler(res, error);
  }
});

router.get('/protected', requiredAuth, (req, res) => {
  res.json({ message: 'This is a protected route' });
});
module.exports = router;
