const express = require('express');
const router  = express.Router();

const { getUsers, getUser, userPatch, userPut, userDelete, createUser  }= require('../controllers/user.js');

router.get('/',getUsers) 

router.get('/:id', getUser) 

router.post('/', createUser)

router.patch('/:id', userPatch)

router.put('/:id', userPut)

router.delete('/:id', userDelete)

module.exports = router
