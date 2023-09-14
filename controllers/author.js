const con = require('../utils/db')
const Author = require('../models/author.model')


const getAuthorArticles = (req, res) => {
    Author.getAuthorArticles(req.params.author_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error ocurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('author', {
                author: data.author,
                articles: data.articles
            })
        }
    })
}

module.exports = { getAuthorArticles }