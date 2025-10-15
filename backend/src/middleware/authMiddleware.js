const { verifyToken } = require('../utils/jwtUtils');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Missing Authorization Header');

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Missing Token');

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch {
    res.status(401).send('Invalid Token');
  }
};

module.exports = { authenticateToken };
