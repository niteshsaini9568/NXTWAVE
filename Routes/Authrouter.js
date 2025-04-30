import express from 'express';
import { signupValidation, loginValidation } from '../Middlewares/Authvalidation.js';
import { signup, login } from '../Controllers/Authcontroller.js';

const router = express.Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

export default router;
