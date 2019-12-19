const router = require('express').Router();
const authRouter = require('./auth/authRouter.js');

router.use('/auth', authRouter);

module.exports = router;