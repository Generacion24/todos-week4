const { getAll, create, getOne, remove, update, login, logged } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT,getAll)
    .post(create);

routerUser.route('/login')  //----> users/login
    .post(login)

routerUser.route('/me') //----> users/me
    .get(verifyJWT,  logged)

routerUser.route('/:id') //----> login/2/4
    .get(verifyJWT,getOne)
    .delete(remove)
    .put(update);

module.exports = routerUser;