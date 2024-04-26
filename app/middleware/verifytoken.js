// funcion que intersecta peticiones https 
const jwt = require("jsonwebtoken"); // verificar token
const userModel = require("../models/user"); // base de datos

const verifyToken = async(req, res, next) => {
    const token = req.headers["authorization"];
    if(!token){ 
        return res.status(403).json({ message: "No token providen" });              
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(404).json({ message: "User no found" });
        }
        next();

    } catch(error){
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = { verifyToken }
