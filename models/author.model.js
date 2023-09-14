const con = require('../utils/db')

const Author = (author) => {
    this.name = author.name
}

Author.getAuthorArticles = (author_id, result) => {
    let query = `select *
                 from article
                 where author_id = "${author_id}"`
    let articles
    let author
    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }
        articles = res
        query = `Select *
                from author
                where id = "${author_id}"`
        con.query(query, (err, res)=>{
            if(err) {
                console.log('error: ', err)
                result(err, null)
                return
            }
            author = res
            console.log(author)
            result(null,{
                author: author,
                articles: articles
            })
        })
    })
}

module.exports = Author