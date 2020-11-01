const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerArticles = require('./articles');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.use('/users/me', auth, routerUsers);
router.use('/articles', auth, routerArticles);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
