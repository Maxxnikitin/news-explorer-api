const routerArticles = require('express').Router();
const { getAllArticles, createArticle, removeArticle } = require('../controllers/articles');

routerArticles.get('/', getAllArticles);
routerArticles.post('/', createArticle);
routerArticles.delete('/:articleId', removeArticle);

module.exports = routerArticles;
