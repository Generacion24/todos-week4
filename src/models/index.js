const ToDo = require("./ToDo");
const User = require("./User");

ToDo.belongsTo(User) //userId
User.hasMany(ToDo)