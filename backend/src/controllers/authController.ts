import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// Function to generate JWT
const generateToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName,
    email,
    venezuelanId,
    phoneNumber,
    stateOfResidence,
    dateOfBirth,
    nickname,
    password,
    pin,
  } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { nickname }, { venezuelanId }] });

    if (userExists) {
      return res.status(400).json({ message: 'User with this email, nickname, or ID already exists' });
    }

    // Age verification (18+)
    const dob = new Date(dateOfBirth);
    const age = new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970;
    if (age < 18) {
        return res.status(400).json({ message: 'User must be at least 18 years old' });
    }

    const user = await User.create({
      fullName,
      email,
      venezuelanId,
      phoneNumber,
      stateOfResidence,
      dateOfBirth,
      nickname,
      password,
      pin,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        nickname: user.nickname,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        nickname: user.nickname,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
