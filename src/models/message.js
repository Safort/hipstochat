const utils = require('../utils');

module.exports = db => {
  return {
    async getMessagesByIds() {
      return db
        .query('select * from contacts where user_id = $1', [userId])
        .then(res => res.rows)
        .catch(err => err);
    },
  };
};
