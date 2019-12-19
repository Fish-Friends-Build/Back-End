const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./authModel.js');
const genToken = require('../../utils/generateToken.js');

router.use('/register', verifyUserFields, (req, res) => {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 12);
    try {
        const user = Users.insert(creds);
        return res.status(200).json({
            id: user.id,
            username: user.username,
            token: genToken(user)
        });
    } catch(err) {
        res.status(401).json({ errorMessage: "An account with that username already exists." });
    }
});

function verifyUserFields(req, res, next) {
    const { username, password } = req.body;
    if (!username && !password) return res.status(401).json({ message: "Username and password required" });
    if (!username) return res.status(401).json({ message: "Provide a username" });
    if (!password) return res.status(401).json({ message: "Provide a password" });
    next();
};
