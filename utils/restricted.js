const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedJwt) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token, please sign in again.' });
      } else {
        res.locals.decodedJwt = decodedJwt;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid token, please sign in again.' });
  }
};
