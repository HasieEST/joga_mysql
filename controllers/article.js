const Article = require('../models/article.model')
const con = require('../utils/db')


// show all articles - index page
const getAllArticles = (req, res) => {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error ocurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('index', {
                articles: data
            })
        }
    })
}
// show article by this slug
const getArticlesBySlug = (req, res) => {
    Article.getBySlug(req.params.slug, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error ocurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('article', {
                article: data
            })
        }
    })
}

// export controller functions
module.exports = {
    getAllArticles,
    getArticlesBySlug
}

