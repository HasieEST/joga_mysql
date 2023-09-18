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
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
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
    res.render('create_article')
}

const updateArticle = (req, res) => {
    const articleId = req.params.id; // Retrieve the article ID from the URL

    //GET or POST information
    if (req.method === 'GET') {
        Article.getByID(articleId, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred retrieving article by id.'
                });
            } else {
                console.log(data);
                res.render('edit_article', {
                    article: data,
                    articleId: articleId
                });
            }
        });
    } else if (req.method === 'POST') {
        console.log("POST REQUEST");
        console.log(req.body.name);

        const updatedArticle = new Article({
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        });

        Article.updateByID(articleId, updatedArticle, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || 'Some error occurred updating article.'
                });
            } else {
                console.log(data);
                res.status(200).send('Update was successful');
            }
        });
    } else {
        res.status(405).send('Method not allowed');
    }
};


const deleteArticle = (req, res) => {
    const articleId = req.params.id; // Retrieve the article ID from the URL

    Article.deleteByID(articleId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred deleting article.'
            });
        } else {
            console.log(data);
            res.status(200).send('Deletion was successful');
        }
    });
};



// export controller functions
module.exports = {
    getAllArticles,
    getArticlesBySlug,
    createNewArticle,
    showNewArticleForm,
    updateArticle,
    deleteArticle
}

