const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    //paso1 obtengo todos los campos de mi interes del body
    const {firstName,lastName,email,password} =req.body

    //paso2 : Encripto contraseña
    const hashPassword = await bcrypt.hash(password,10)

    //paso3 : Armo el body para crear el registro
    const body = {firstName,lastName,email,password:hashPassword}

    //paso4: retornto el usuario creado
    const result = await User.create(body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const{firstName,lastName}=req.body
    const body = {firstName,lastName}
    const result = await User.update(
        body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async (req,res)=>{ // /users/login

    //paso1 : buscar al usurario 
    const {email,password} =req.body
    const user = await User.findOne({where:{email}})

    //paso2 verificar a dicho usuario
    if(!user) return res.status(401).json({message:"Invalid credencials"})

    //paso3 verificar el password y comparar
    const isValidPassword = await bcrypt.compare(password,user.password) //true or false
    if(!isValidPassword)  res.status(401).json({message:"Invalid credencials"})

    //paso4 Generar Token
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:"1d"}
    )

    return res.json({user,token})
})

const logged = catchError(async (req,res)=>{ // --> /users/me
    const user = req.user
    return res.json(user)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged
}