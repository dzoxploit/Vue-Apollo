const jwt = require('jsonwebtoken');

module.exports = async (token) => {
  try {
    if (!token) {
      const newError = {
        message: 'server requires token in arguments',
      }
      throw newError;
    }

    const verification = await jwt.verify(token, process.env.JWT_PRIVATE_TOKEN);
    return verification;
  }
  catch (error0) {
    return new Error(error0);
  }
}
