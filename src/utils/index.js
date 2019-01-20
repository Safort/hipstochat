const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

exports.hashText = async text => {
  return bcrypt.hash(text, SALT_ROUNDS);
};

exports.isHashValid = async (plainText, hash) => {
  return bcrypt.compare(plainText, hash);
};
