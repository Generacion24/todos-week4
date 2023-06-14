const { getAll, create, getOne, remove, update } = require('../controllers/todo.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerToDo = express.Router();

routerToDo.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT,create);

routerToDo.route('/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = routerToDo;