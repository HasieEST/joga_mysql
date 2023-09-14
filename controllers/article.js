const Article = require('../models/article.model')
const con = require('../utils/db')


// show all articles - index page
const getAllArticles = (req, res) => {
    Article.getAll((err,data)=>{
        if(err){
            res.status(500).send({
                message: err.message || 'Some error ocurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('index', {
                article: data
            })
        }
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

