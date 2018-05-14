const auth = require('../auth');

module.exports = ({ router }) => {
  router.get('/api/me', auth.isSessionValid, async ctx => {
    const UserModel = require('../models/user')(ctx.db);
    const userId = ctx.cookies.get('userId').trim();
    const user = await UserModel.getUserById(userId);
    const body = {
      success: false
    };
    
    if (user === null) {
      body.message = 'User not found';
    } else {
      body.success = true;
      body.payload = user;
    }

    ctx.body = body;
  });

  router.get('/api/search/users/:login', auth.isSessionValid, async ctx => {
    const UserModel = require('../models/user')(ctx.db);
    const users = await UserModel.getUsersByLogin(ctx.params.login);

    ctx.body = { success: true, users };
  });
};
