const router = require('express').Router();
const restricted = require('../utils/restricted.js');

const authRouter = require('./auth/authRouter.js');
const journalsRouter = require('./journals/journalsRouter.js');

router.use('/auth', authRouter);
router.use('/journals', restricted, journalsRouter);

module.exports = router;