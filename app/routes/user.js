const express = require('express');
const router  = express.Router();

const { getUsers, getUser, userPatch, userPut, userDelete, createUser  }= require('../controllers/user.js');
const { verifyToken } = require('../middleware/verifytoken');
const { verifyRole } = require('../middleware/VerifyRole');

router.get('/', verifyToken, getUsers) // esta llamando a la funcion verifyToken antes de getUsers, para verificar si el token existe.

// Al iniciar sesion da un token insonia, ese token a la hora de utilizar hay que copiarlo en headers de la ruta para que lo puedas validar y se pueda acceder a la informacion.

router.get('/:id', getUser) 

router.post('/', createUser)

router.patch('/:id', userPatch)

router.put('/:id', userPut)

router.delete('/:id',verifyRole, userDelete)

module.exports = router
