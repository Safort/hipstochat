import { browserHistory } from 'react-router';

export default store => next => action => {
    if (!action.redirect) {
        return next(action);
    }

    browserHistory.push(action.redirect);
};
