const User = require('../models/User');
const bcrypt = require('bcrypt');

// Controlador para actualizar el perfil del usuario
const updateUserProfile = async (req, res) => {
    try {
        // El ID del usuario viene de 'req.userId' (añadido por el middleware verifyToken)
        const userId = req.userId;
        
        // Obtenemos los datos del body (como se ve en ProfilePage.jsx)
        const { username, password } = req.body;

        const updateData = {};

        // Si el usuario mandó un nuevo 'username', lo añadimos
        if (username) {
            updateData.username = username;
        }

        // Si el usuario mandó una nueva 'password'
        if (password) {
            // Hasheamos la nueva contraseña (igual que en authController)
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Encontrar al usuario por su ID y actualizarlo
        const usuarioActualizado = await User.findByIdAndUpdate(
            userId, 
            updateData, 
            { new: true } // {new: true} devuelve el documento actualizado
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // El modelo User.js se encarga de quitar el password del JSON de respuesta
        res.status(200).json(usuarioActualizado);

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el perfil', error });
    }
};

module.exports = {
    updateUserProfile
};