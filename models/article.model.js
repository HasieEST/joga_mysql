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

Article.getBySlug = (slug, result) => {
    let query = `select a.*,
                        au.name as author,
                        au.id   as author_id
                 from article a,
                      author au
                 where slug = "${slug}"
                   and a.author_id = au.id`
    let article
    con.query(query, (err, res) => {
        if(err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        if (res.length) {
            console.log('found article: ', res[0]);
            result(null, res[0])
        }
    })
}





module.exports = Article