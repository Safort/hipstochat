export default ({app, passport}) => {

    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect: '/api/user',
        failureRedirect: '/api/signup-error'
    }));

    app.get('/api/signup-success', (req, res) => {
        res.json({success: true, data: 'registration successful'});
    });

    app.get('/api/signup-error', (req, res) => {
        res.json({success: false, data: 'registration is not successful'});
    });

};
