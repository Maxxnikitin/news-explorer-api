const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const NotValidDate = require('../errors/not-valid-date');
const RightsError = require('../errors/rights-error');

const getAllArticles = (req, res, next) => {
  Article.find({})
    .orFail(() => new NotFoundError('Карточек ещё нет в базе'))
    .then((article) => {
      res.status(200).send({ data: article });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image, ownerId,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: ownerId,
  })
    .then((article) => {
      if (!article) {
        throw new NotValidDate('Переданы некорректные данные');
      }
      res.status(200).send({ data: article });
    })
    .catch(next);
};

const removeArticle = (req, res, next) => {
  const owner = req.user._id;
  Article.findOne({ _id: req.params.id })
    .orFail(() => new NotFoundError('Такой новости нет в базе'))
    .then((article) => {
      if (String(article.owner) !== owner) throw new RightsError('Недостаточно прав');
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
