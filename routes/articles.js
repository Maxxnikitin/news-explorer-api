const routerArticles = require("express").Router();
const { celebrate, Joi, CelebrateErr } = require("celebrate");
const validator = require("validator");
const {
  getAllArticles,
  createArticle,
  removeArticle,
} = require("../controllers/articles");

const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateErr("Введён некорректный URL");
  }
  return value;
};

routerArticles.get("/", getAllArticles);
routerArticles.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().custom(validateUrl).required(),
      image: Joi.string()
        .required()
        .pattern(
          /^((http|https):\/\/)(www\.)?([A-Za-z0-9.-]{1,256})\.[A-Za-z]{2,10}([-a-zA-Z0-9@:%_+.~#?&/=]{1,256})?$/
        ),
    }),
  }),
  createArticle
);
routerArticles.delete(
  "/:articleId",
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().alphanum().length(24),
    }),
  }),
  removeArticle
);

module.exports = routerArticles;
