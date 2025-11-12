const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- REGISTRO ---
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validar datos
        if (!username || !email || !password) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        // Verificar duplicados
        const emailExistente = await User.findOne({ email });
        if (emailExistente) {
            return res.status(400).json({ mensaje: "El email ya está registrado" });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(password, salt);

        // Crear y guardar usuario
        const nuevoUsuario = new User({
            username,
            email,
            password: passwordHasheada // Guardar el hash
        });
        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json(usuarioGuardado);

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error });
    }
};

// --- LOGIN ---
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: "Credenciales inválidas" });
        }

        // Comparar contraseñas
        const esPasswordValido = await bcrypt.compare(password, usuario.password);
        if (!esPasswordValido) {
            return res.status(400).json({ mensaje: "Credenciales inválidas" });
        }

        // Crear el Payload para el JWT
        const payload = {
            id: usuario._id,
            username: usuario.username
        };

        // Firmar el Token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d' // El token expira en 7 días
        });

        // Devolver el token y el usuario
        res.status(200).json({
            token: token,
            usuario: usuario 
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
    }
};

module.exports = {
    registerUser,
    loginUser
};