const con = require('../utils/db')


const getAuthorArticles = (req, res) => {
    let query = `select *
                 from article
                 where author_id = "${req.params.author_id}"`
    let articles
    let author
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        query = `Select *
                 from author
                 where id = "${req.params.author_id}"`
        con.query(query, (err, result) => {
            if (err) throw err
            author = result
            console.log(author)
            res.render('author', {
                author: author,
                articles: articles
            })
        })
    })
}

module.exports = {getAuthorArticles}