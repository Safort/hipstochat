
export default () => next => action => {
  if (!action.redirect) {
    return next(action);
  }
};
