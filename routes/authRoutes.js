// const express = require('express');
import express from 'express';
import { check } from 'express-validator';
// import authController from '../controllers/authController.js'; // Adjust the import path as necessary
import { register, login } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be more than 6 characters').isLength({min:6})
], register)

router.post('/login', [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').exists()
], login)

export default router;
// module.exports=router;
