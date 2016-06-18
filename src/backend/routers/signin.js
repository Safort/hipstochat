export default ({app, passport}) => {

    app.post('/api/signin', passport.authenticate('local-signin', {
        successRedirect: '/api/user',
        failureRedirect: '/api/signin-error'
    }));

    app.get('/api/signout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/signin-error', (req, res) => {
        res.json({success: false, data: 'authorization is not successful'});
    });

};
