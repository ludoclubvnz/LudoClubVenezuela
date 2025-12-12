import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { body } from 'express-validator';

const router = Router();

// Validation middleware for registration
const registerValidation = [
  body('fullName', 'Full name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('venezuelanId', 'Venezuelan ID is required').matches(/^\d{7,8}$/),
  body('phoneNumber', 'Phone number is required').isMobilePhone('es-VE'),
  body('stateOfResidence', 'State of residence is required').not().isEmpty(),
  body('dateOfBirth', 'Date of birth is required').isISO8601().toDate(),
  body('nickname', 'Nickname is required').not().isEmpty(),
  body('password', 'Password must be exactly 6 digits').isLength({ min: 6, max: 6 }).isNumeric(),
  body('pin', 'PIN must be exactly 4 digits').isLength({ min: 4, max: 4 }).isNumeric(),
];

// Validation middleware for login
const loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

export default router;
