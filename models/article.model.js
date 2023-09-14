const con = require('../utils/db')

const Article = (article) => {
    this.name = article.name
    this.slug = article.slug
    this.image = article.image
    this.body = article.body
    this.published = article.published
    this.author_id = article.author_id
}

// get all Articles 

Article.getAll = (result) => {
    let query = "SELECT * FROM article"
    let articles = []
    con.query(query, (err, res) => {
        if (err) {
            console.log('Error: ', err)
            result(err, null)
            return
        }
        articles = res
        console.log('articles: ', articles)
        result(null, articles)
    })
}





module.exports = Article