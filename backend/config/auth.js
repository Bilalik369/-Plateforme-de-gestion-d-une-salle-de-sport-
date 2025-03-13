

module.exports = {
    secretKey: process.env.JWT_SECRET_KEY || 'secret',
    expiresIn: '40d', 
  };
  