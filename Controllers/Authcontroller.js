// authController.js

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usermodel from '../Models/user.js';

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Email already exists, please login', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Usermodel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, _id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );

    return res
      .status(201)
      .json({ message: 'User created successfully', success: true, token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', success: false, error });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: 'Email does not exist, please signup first', success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ message: 'Email or password is incorrect', success: false });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      success: true,
      token,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', success: false, error });
  }
}
