const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')

router.get('/', articleController.getAllArticles)
router.get('/:slug', articleController.getArticlesBySlug)
router.get('/article/create', articleController.showNewArticleForm)
router.post('/create', articleController.createNewArticle)
module.exports = router