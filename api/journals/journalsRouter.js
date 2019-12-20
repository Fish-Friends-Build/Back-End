const router = require('express').Router();
const Journals = require('./journalsModel.js');

router.post('/', async (req, res) => {
  const user = res.locals.decodedJwt;
  const [journal] = await Journals.insert({ ...req.body, userId: user.id });
  return res.status(200).json(journal);
});

router.get('/', async (req, res) => {
  const journals = await Journals.find();
  return res.status(200).json({journals});
});

module.exports = router;