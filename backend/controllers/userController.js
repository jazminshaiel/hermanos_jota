const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;

        
        const { nombre, username, password } = req.body;
        
        const updateData = {};

        // El modelo Usuario usa el campo "nombre"
        if (nombre || username) {
            updateData.nombre = nombre || username;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            userId, 
            updateData, 
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json(usuarioActualizado);

    } catch (error) {
        console.error('❌ Error en updateUserProfile:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el perfil', error: error.message });
    }
};

module.exports = {
    updateUserProfile
};