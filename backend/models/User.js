const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
}, {
    timestamps: true
});

// NUNCA devolver la contraseña en un JSON
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
}

const User = model('User', userSchema);
module.exports = User;