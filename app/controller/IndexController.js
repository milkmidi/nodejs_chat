function indexHandler(req, res) {
    console.log(req.originalUrl);
    if (!req.session.token) {
        res.redirect(`/login?redirect_url=${req.originalUrl}`);
    } else {
        res.render('index', {
            token: req.session.token,
            name: req.session.name,
            email: req.session.email,
            objectId: req.session.objectId,
        });
    }
}

function init(app) {
    console.log('IndexController init');
    app
        .get('/', indexHandler)
        .get('/login', (req, res) => {
            res.render('login', { redirect_url: req.query.redirect_url });
        });
}

module.exports = init;
