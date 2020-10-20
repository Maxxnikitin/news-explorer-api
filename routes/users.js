const routerUsers = require('express').Router();
const { getUserInfo } = require('../controllers/users');

routerUsers.get('/', getUserInfo);

module.exports = routerUsers;
