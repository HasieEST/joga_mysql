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

//create new article
const createNewArticle = (req, res) => {
    // New article from POST data
    console.log('new article')

    const newArticle = new Article({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString.slice(0, 19).replace('T', ' '),
        author_id: req.body.author_id
    })

    Article.createNew(newArticle, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured creating new article.'
            })
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
}

const showNewArticleForm = (req, res) => {
    res.sender('create_article')
}



// export controller functions
module.exports = {
    getAllArticles,
    getArticlesBySlug,
    createNewArticle,
    showNewArticleForm
}

