const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Obtener el header 'authorization'
    const authHeader = req.headers['authorization']; // 'Bearer TOKEN'

    // Comprobar si el header existe
    if (!authHeader) {
        return res.status(403).json({ mensaje: 'No se proveyó un token. Acceso denegado.' });
    }

    // Extraer el token (ignorando 'Bearer ')
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ mensaje: 'Formato de token inválido.' });
    }

    // Verificar el token
    try {
        // Usamos la misma clave secreta de tu .env
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        
        // Adjuntar el ID del usuario al objeto 'req'
        req.userId = decodedPayload.id; 
        
        next(); // Continuar a la siguiente función (el controlador)

    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
};

module.exports = verifyToken;