import signin from './signin';
import signup from './signup';
import user from './user';
import dialog from './dialog';
import message from './message';


export default ({ app, passport }) => {
  [user, dialog, signin, signup, message].forEach(route => {
    route({ app, passport });
  });
};
