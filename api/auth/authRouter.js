const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./authModel.js');
const genToken = require('../../utils/generateToken.js');

router.use('/register', verifyUserFields, async (req, res) => {
    const creds = req.body;
    creds.password = bcrypt.hashSync(creds.password, 12);
    try {
        const [user] = await Users.insert(creds);
        return res.status(200).json({
            id: user.id,
            username: user.username,
            token: genToken(user)
        });
    } catch(err) {
        res.status(401).json({ errorMessage: "An account with that username already exists." });
    }
});

router.use('/login', verifyUserFields, async (req, res) => {
    const { username, password } = req.body;
    try {
        const [user] = await Users.findBy({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            return res.status(200).json({
                id: user.id,
                username: user.username,
                token: genToken(user)
            })
        }
    } catch(err) {
        res.status(401).json({ message: "Invalid credentials." });
    }
});

function verifyUserFields(req, res, next) {
    const { username, password } = req.body;
    if (!username && !password) return res.status(401).json({ message: "Username and password required" });
    if (!username) return res.status(401).json({ message: "Provide a username" });
    if (!password) return res.status(401).json({ message: "Provide a password" });
    next();
};

module.exports = router;