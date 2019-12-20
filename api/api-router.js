const router = require('express').Router();
const authRouter = require('./auth/authRouter.js');
const journalsRouter = require('./journals/journalsRouter.js');

router.use('/auth', authRouter);
router.use('/journals', journalsRouter);

module.exports = router;