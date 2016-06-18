export default store => next => action => {
    console.log(
        `Action type: ${action.type}; data: ${JSON.stringify(action.payload)}`
    );

    return next(action);
};
