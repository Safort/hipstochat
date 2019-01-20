const utils = require('../utils');

module.exports = db => {
  return {
    async getUserByLogin(login) {
      return db
        .query('select * from users where login = $1', [login])
        .then(res => {
          if (res.rowCount === 1) {
            const { id, login, name, password } = res.rows[0];

            return {
              id: parseInt(id),
              login: login.trim(),
              name: name.trim(),
              password: password.trim(),
            };
          }
          return null;
        })
        .catch(err => null);
    },

    async getUsersByLogin(login) {
      return db
        .query('select * from users where login like $1', [login + '%'])
        .then(res => res.rows)
        .catch(err => null);
    },

    async getUserById(id) {
      return db
        .query('select * from users where id = $1', [id])
        .then(res => {
          if (res.rowCount === 1) {
            const { id, login, name } = res.rows[0];

            return {
              id: parseInt(id),
              login: login.trim(),
              name: name.trim(),
            };
          }
          return null;
        })
        .catch(err => null);
    },

    async createUser(login, name, password) {
      const query = 'insert into users(login, name, password) VALUES ($1, $2, $3) returning *';
      const hash = await utils.hashText(password);
      const values = [login.trim(), name.trim(), hash.trim()];

      return db
        .query(query, values)
        .then(res => (res.rowCount === 1 ? res.rows[0] : false))
        .catch(err => false);
    },

    async updateUser(id, login, name) {
      const query = 'update users set login = $1, name = $2 where id = $3';
      const values = [login, name, id];

      return db
        .query(query, values)
        .then(res => (res.rowCount === 1 ? res.rows[0] : false))
        .catch(err => false);
    },
  };
};
