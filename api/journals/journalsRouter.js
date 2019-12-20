const router = require('express').Router();
const Journals = require('./journalsModel.js');

router.post('/', async (req, res) => {
  const [journal] = await Journals.insert(req.body);
  return res.status(200).json(journal);
});

module.exports = router;