const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')

router.get('/', articleController.getAllArticles)
router.get('/:slug', articleController.getArticlesBySlug)

module.exports = router