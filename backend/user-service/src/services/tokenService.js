const jwt = require('jsonwebtoken');

const signToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};

module.exports = {
  signToken
};