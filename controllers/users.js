// const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

const getUserInfo = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('Такого пользователя нет'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .orFail(() => new NotFoundError('Пользователей нет в базе'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  getAllUsers,
};
