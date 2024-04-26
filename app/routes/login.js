const express = require('express');
const router  = express.Router();

const { login }= require('../controllers/login');

router.post('/',login) //localhost:3000/api/login

module.exports = router
