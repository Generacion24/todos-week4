const express = require('express');
const routerUser = require('./user.router');
const routerToDo = require('./todo.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users',routerUser)
router.use('/todos',routerToDo)



module.exports = router;