// dependencias mongoose
const mongoose = require('mongoose');
// funcion para la base de datos
const dbConection = () =>{
    const DB_URL = process.env.DB_URL
    mongoose.connect(DB_URL)
    .then(()=>{
        console.log('Base de datos conectada')
    })
    .catch((error)=>{
        console.error(("Error al conectarse a la base de datos"), error)
    })}

module.exports = {dbConection}