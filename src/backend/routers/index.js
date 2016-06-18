import signin from './signin';
import signup from './signup';
import user from './user';

export default ({app, passport}) => {
    signin({app, passport});
    signup({app, passport});
    user({app, passport});
};
