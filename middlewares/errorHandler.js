// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован' });
  }
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
};
module.exports = {
  errorHandler,
};
