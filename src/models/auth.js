const crypto = require('crypto');
const auth = require('../auth');

module.exports = db => {
  return {
    async createSession(userId) {
      const userRes = await db.query('select * from users where id=$1', [userId]);
      const user = userRes.rows[0];
      const { ssid, expiresIn } = auth.ssidHash(user.password, userId);
      const createSessionRes = await db.query(
        'insert into sessions (user_id, expires_in, ssid) VALUES ($1, to_timestamp($2), $3)',
        [userId, expiresIn, ssid],
      );

      if (createSessionRes.rowCount === 1) {
        return { ssid, expiresIn };
      }

      return null;
    },

    async isSessionExist(userId, ssid) {
      const isSessionExistRes = await db.query(
        'select * from sessions where user_id=$1 and ssid=$2',
        [userId, ssid],
      );

      if (isSessionExistRes.rowCount === 1) {
        return true;
      }

      return false;
    },

    removeSession: async ssid => {
      const res = await db.query('delete from sessions where ssid=$1', [ssid]).rowCount;

      return res === 1 ? true : false;
    },
  };
};
