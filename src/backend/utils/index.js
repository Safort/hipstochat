export function isSignedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/api/signin-error');
}

export function isValidPassword(user, password) {
  return user.password === password;
}
