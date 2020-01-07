const router = require('express').Router();
const Journals = require('./journalsModel.js');

router.post('/', async (req, res) => {
  const user = res.locals.decodedJwt;
  const fishType = req.body.fishType;
  if (fishType) {
    if (!Array.isArray(fishType)) {
      return res.status(401).json({ message: 'Value of fishType must be an array.' })
    }
  }
  const [journal] = await Journals.insert({ ...req.body, userId: user.id });
  return res.status(200).json(journal);
});

router.get('/', async (req, res) => {
  const journals = await Journals.find();
  return res.status(200).json(journals);
});

module.exports = router;