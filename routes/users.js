const routerUsers = require('express').Router();
const { getUserInfo, getAllUsers } = require('../controllers/users');

routerUsers.get('/users', getAllUsers);
routerUsers.get('/users/me', getUserInfo);

module.exports = routerUsers;
