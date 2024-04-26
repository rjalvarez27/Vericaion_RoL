// Colocar el esquema de la base de datos
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'El nombre es necesario'],
        minLength: 3
    },
    email: {
        type:String,
        unique: true,
        require: [true, 'El correo es necesario'],
        trim: true 
    },
    rol: {
        type: String,
        required: true,
        default: 'user',
        minLength: 4,
        maxLength: 5
    },
    password: {
        type:String,
        require: true
    },
    
},{
    timestamps: true,
    versionKey: false
})

// Aca se le puede incluir la expreciones regulares con un validate.(buscar)
// como encriptar la password, instalar libreria npm i bcrypt 
// userSchaema no permite hacer una funcion escalable para encriptar la password.
// .statics no permite crear una funciones.
UserSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt).then(hashPassword =>{
        return hashPassword;
    })
}

// funcion para comparar la password en login 

UserSchema.statics.comparePassword = async (password, hashPassword) =>{
    return await bcrypt.compare(password, hashPassword)
}

module.exports = mongoose.model('User', UserSchema)




