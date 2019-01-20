const utils = require('../utils');

module.exports = db => {
  return {
    async getContactsByUserId(userId) {
      return db
        .query('select * from contacts where user_id = $1', [userId])
        .then(res => res.rows)
        .catch(err => err);
    },

    async addContact(userId, contactUserId) {
      const query = `
        insert into contacts (user_id, contact_id, name) VALUES ($1, $2, (select name from users where id = $2)) returning *
      `;

      return db
        .query(query, [userId, contactUserId])
        .then(res => res.rows)
        .catch(err => err);
    },

    async removeContact(userId, contactId) {
      return db
        .query('delete from contacts where user_id = $1 and id = $2', [userId, contactId])
        .then(res => (res.rowCount == 1 ? true : false))
        .catch(err => err);
    },
  };
};
