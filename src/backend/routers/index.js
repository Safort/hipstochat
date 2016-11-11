import signin from './signin';
import signup from './signup';
import user from './user';
import dialog from './dialog';


export default ({ app, passport }) => {
  [user, dialog, signin, signup].forEach(route => {
    route({ app, passport });
  });
};
