import crypto from 'crypto';

function hashPwd(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

function isSignedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/api/signin-error');
}

function isValidPassword(user, pwd) {
  return user.password === hashPwd(pwd);
}

export {
  hashPwd,
  isSignedIn,
  isValidPassword,
};
