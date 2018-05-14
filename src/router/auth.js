const auth = require('../auth');
const authModel = require('../models/auth');
const utils = require('../utils');

const SESSION_EXPIRES_TIME = 1000 * 60 * 60 * 24 * 365; // 365 days


module.exports = ({ router }) => {
  router.post('/api/signup', async ctx => {
    const authModelHandler = authModel(ctx.db);
    const UserModel = require('../models/user')(ctx.db);
    const { login, name, password } = ctx.request.body;
    const getUserRes = await UserModel.getUserByLogin(login);

    if (getUserRes !== null) {
      ctx.body = { error: 'Error: user with this login already exist!' };  
    } else {
      const createUserRes = await UserModel.createUser(login.trim(), name.trim(), password.trim());
      const session = await authModelHandler.createSession(createUserRes.id);
      
      if (createUserRes && session !== null) {
        ctx.cookies.set('ssid', session.ssid, { maxAge: SESSION_EXPIRES_TIME });
        ctx.cookies.set('userId', createUserRes.id, { maxAge: SESSION_EXPIRES_TIME });

        ctx.body = {
          success: true,
          expiresIn: session.expiresIn,
        };
      } else {
        ctx.body = { success: false };
      }
    }
  });

  router.post('/api/signout', auth.isSessionValid, async ctx => {
    const authModelHandler = authModel(ctx.db);
    ctx.body = { success: true };
    
    const removeSessionRes = await authModelHandler.removeSession(ctx.cookies.get('ssid'));
    
    if (removeSessionRes) {
      ctx.cookies.set('ssid', '');
      ctx.cookies.set('userId', '');
    } else {
      ctx.body = { success: false };
    }
  });

  router.post('/api/signin', async ctx => {
    const authModelHandler = authModel(ctx.db);
    const UserModel = require('../models/user')(ctx.db);
    const { login, password } = ctx.request.body;
    const getUserRes = await UserModel.getUserByLogin(login);
    
    if (getUserRes == null) {
      ctx.body = { success: false, error: 'Error: user with this login not exist!' };
    } else {
      const isPassValid = await utils.isHashValid(password, getUserRes.password);
      
      if (!isPassValid) {
        ctx.body = { success: false, error: 'Error: wrond password!' };
        return;
      }

      const session = await authModelHandler.createSession(getUserRes.id);

      if (session !== null) {
        ctx.cookies.set('ssid', session.ssid, { maxAge: SESSION_EXPIRES_TIME });
        ctx.cookies.set('userId', getUserRes.id, { maxAge: SESSION_EXPIRES_TIME });

        ctx.body = {
          success: true,
          expiresIn: session.expiresIn,
          login,
          name: getUserRes.name,
          id: getUserRes.id
        };
      } else {
        ctx.body = { success: false };
      }
    }
  });

};
