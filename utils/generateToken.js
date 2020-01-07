const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '3h'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
};
