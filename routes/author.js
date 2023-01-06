const express = require('express')
const router = express.Router()
const authorController = require('../controllers/author')

router.get('/:author_id', authorController.getAuthorArticles)

module.exports = router