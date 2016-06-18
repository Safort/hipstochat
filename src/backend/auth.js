import passport from 'passport';
import passportLocal from 'passport-local';
import UserModel from './models/user';
import {isValidPassword} from './utils';

export default (app) => {
    passport.use('local-signin', new passportLocal.Strategy({
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            UserModel.findOne({username}, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false);
                }

                return done(null, user);
            });
        }
    ));

    passport.use('local-signup', new passportLocal.Strategy({
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            const registerUser = () => {
                UserModel.findOne({username}, (err, user) => {
                    if (err) {
                        console.log('Singup error: ', err);
                        return done(err);
                    }
                    if (user) {
                        console.log('Error: user already exist');
                        return done(null, false);
                    } else {
                        var newUser = new UserModel();
                        newUser.username = username;
                        newUser.password = password;

                        newUser.save((err) => {
                            if (err) {
                                console.log('Error in saving: ', err);
                                throw err;
                            } else {
                                console.log('Registration succesful');
                                return done(null, newUser);
                            }
                        });
                    }
                });
            };

            process.nextTick(registerUser);
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err, user) => {
            done(err, user);
        });
    });

    return passport;
};
