// crear este archivo para manejar cada ruta en especifico.
const express = require('express');
const router  =  express.Router();
const fs = require('fs') // interacturar con el sistema de archivos 
const pathRouter = `${__dirname}`; // es una variable global que representa la ruta del dictorios del archivo en el que se encuentra el actual.(carpeta routes)

const removeExtension = (filename) =>{
    return filename.split('.').shift() //shitf devuelve el primer elemento de un array ['index' ,  'js' ] = index.
}

fs.readdirSync(pathRouter).filter((file)=>{
    // lee de forma asincrona el directorio actual y filta lo archivos que terminen en .js 
    const fileWithOutExt =  removeExtension(file)
    
    const skip = ['index'].includes(fileWithOutExt)// esto crea un array con un solo elemento, en este caso, el nombre del archivo "index ". Esta es la lista de archivos que se debe omitir. 
    if(!skip){
        router.use(`/${fileWithOutExt}`, require (`./${fileWithOutExt}`))
    }
})

router.get('*', (req, res) =>{
    res.status(404).json({error:"ruta no encontrada"})
})

module.exports = router


