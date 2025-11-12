const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Ruta para Registro
// POST /api/auth/registro
router.post('/registro', registerUser);

// Ruta para Login
// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;