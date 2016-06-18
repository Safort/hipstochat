import UserModel from '../models/user';
import {isSignedIn} from '../utils';

export default ({app, passport}) => {

    app.get('/api/user', isSignedIn, (req, res) => {
        UserModel.findById(req.session.passport.user, (err, userInfo) => {
            res.json(userInfo);
        });
    });

};
