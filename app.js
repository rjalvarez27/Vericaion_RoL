// para poder utilizar variables de entorno 
require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {dbConection} = require('./config/mongo.js') // reuqerir conexion a la base de datos.
dbConection();

const port = process.env.PORT || 3000 ;
app.use(cors());
app.use(express.json());
app.use('/api/', require('./app/routes')); // localhost:3000/api/ esta es una marca de agua como el ejemplo

app.listen(port, ()=>{
   console.log(`LOCALHOST:http://localhost:${port}`)
})



