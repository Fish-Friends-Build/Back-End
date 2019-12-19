const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./authModel.js');

router.use('/register', (req, res) => {
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
