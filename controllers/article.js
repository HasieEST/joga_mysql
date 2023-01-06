const con = require('../utils/db')


// show all articles - index page
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
}
// show article by this slug
const getArticlesBySlug = (req, res) => {
    let query = `select a.*,
                        au.name as author,
                        au.id   as author_id
                 from article a,
                      author au
                 where slug = "${req.params.slug}"
                   and a.author_id = au.id`
    let article
    con.query(query, (err, result) => {
        if (err) throw err
        article = result
        res.render('article', {
            article: article
        })
    })
}

// export controller functions
module.exports = {
    getAllArticles,
    getArticlesBySlug
}

