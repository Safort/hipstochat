const crypto = require('crypto');

const SSID_LIFE_TIME = 31 * 24 * 60 * 60; // 31 days
const getSeconds = () => Math.round(new Date().getTime() / 1000);


exports.SSID_LIFE_TIME = SSID_LIFE_TIME;
exports.getSeconds = getSeconds;

exports.isSessionValid = async (ctx, next) => {
  const authModel = require('./models/auth')(ctx.db);
  const userId = ctx.cookies.get('userId');
  const ssid = ctx.cookies.get('ssid');
  const hasSession = await authModel.isSessionExist(userId, ssid);

  if (hasSession) {
    return next();
  }

  ctx.body = { success: false, message: 'Not authorized' };
};

exports.ssidHash = (password, userId) => {
  const ssidData = password + userId + getSeconds();
  const expiresIn = getSeconds() + SSID_LIFE_TIME;
  const ssid = crypto.createHash('sha256').update(ssidData).digest('base64');

  return { expiresIn, ssid };
}
