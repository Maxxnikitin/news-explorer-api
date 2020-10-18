const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;

const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerArticles = require('./routes/articles');
const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser());
app.use('/', routerUsers);
app.use('/', routerArticles);

// централизованный обработчик ошибок

// eslint-disable-next-line
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован' });
  }
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
