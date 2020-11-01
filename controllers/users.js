const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');

const getUserInfo = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(() => new NotFoundError('Такого пользователя нет'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    }))
    .catch(next);
};

module.exports = {
  getUserInfo,
  createUser,
};
