const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

// npm i jsonwebtoken (instalar libreria para token)

const login = async (req, res) => {
    try{
       const { email, password } = req.body;
       const userfind  = await userModel.findOne({email: email});
       console.log(userfind)
       if(!userfind){
           return res.status(400).json({ message: "Usuario no encontrado" });
       }
       if(!await userModel.comparePassword(password, userfind.password)){
           return res.status(400).json({ message: "Datos Invalidos" });
       }
        const token = jwt.sign({id: userfind._id},process.env.SECRET_KEY, {expiresIn:'10m'})

        res.header('authorization',token).json({token:token})

    } catch (error) {    
        res.status(500).json({ message: error.message });
    }
}

module.exports = { login }

