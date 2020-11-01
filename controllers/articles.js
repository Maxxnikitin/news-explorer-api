const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const NotValidData = require('../errors/not-valid-data');
const PermissionError = require('../errors/permission-error');

const getAllArticles = (req, res, next) => {
  Article.find({})
    .orFail(() => new NotFoundError('Карточек ещё нет в базе'))
    .then((article) => {
      res.status(200).send({ data: article });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      if (!article) {
        throw new NotValidData('Переданы некорректные данные');
      }
      res.status(200).send({
        data: {
          _id: article._id,
          keyword: article.keyword,
          title: article.title,
          text: article.text,
          date: article.date,
          source: article.source,
          link: article.link,
          image: article.image,
        },
      });
    })
    .catch(next);
};

const removeArticle = (req, res, next) => {
  const owner = req.user._id;
  const { articleId } = req.params;
  Article.findOne({ _id: articleId }).select('+owner')
    .orFail(() => new NotFoundError('Такой новости нет в базе'))
    .then((article) => {
      if (String(article.owner) !== owner) throw new PermissionError('Недостаточно прав');
      return Article.findByIdAndRemove(article._id);
    })
    .then((ok) => res.send(ok))
    .catch(next);
};

module.exports = {
  getAllArticles,
  createArticle,
  removeArticle,
};
