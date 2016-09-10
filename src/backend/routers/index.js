import signin from './signin';
import signup from './signup';
import user from './user';
import dialogs from './dialogs';

export default ({ app, passport }) => {
  signin({ app, passport });
  signup({ app, passport });
  user({ app, passport });
  dialogs({ app, passport });
};
