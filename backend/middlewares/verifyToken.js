const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    console.log('🔍 Authorization header:', authHeader); // ← AÑADE ESTO

    if (!authHeader) {
        return res.status(403).json({ mensaje: 'No se proveyó un token. Acceso denegado.' });
    }

    const token = authHeader.split(' ')[1];
    console.log('🔍 Token extraído:', token); // ← AÑADE ESTO
    
    if (!token) {
        return res.status(403).json({ mensaje: 'Formato de token inválido.' });
    }

    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambiar_en_produccion');
        console.log('✅ Token válido, payload:', decodedPayload); // ← AÑADE ESTO
        
        req.userId = decodedPayload.id; 
        next();

    } catch (error) {
        console.error('❌ Error verificando token:', error.message); // ← AÑADE ESTO
        return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
};

module.exports = verifyToken;