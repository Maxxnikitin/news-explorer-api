const routerArticles = require('express').Router();
const { getAllArticles, createArticle, removeArticle } = require('../controllers/articles');

routerArticles.get('/articles', getAllArticles);
routerArticles.post('/articles', createArticle);
routerArticles.delete('/:articleId', removeArticle);

module.exports = routerArticles;
