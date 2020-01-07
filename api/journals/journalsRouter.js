const router = require('express').Router();
const Journals = require('./journalsModel.js');

// ADD A NEW JOURNAL ENTRY
router.post('/', async (req, res) => {
  const user = res.locals.decodedJwt;
  const fishType = req.body.fishType;
  if (fishType) {
    if (!Array.isArray(fishType)) {
      return res.status(401).json({ message: 'Value of fishType must be an array.' })
    }
  }
  const [journal] = await Journals.insert({ ...req.body, userId: user.id });
  const { userId, id, ...rest } = journal;
  return res.status(200).json({ id, username: user.username, ...rest });
});

// UPDATE A JOURNAL ENTRY
router.put('/:id', async (req, res) => {
  if (req.body.userId) return res.status(401).json({ message: 'Not able to update userId'})
  const id = req.params.id;
  const user = res.locals.decodedJwt;
  const [journal] = await Journals.update(id, req.body);
  const { userId, ...rest } = journal;
  return res.status(200).json({ id, username: user.username, ...rest });
});

// GET ALL JOURNAL ENTRIES
router.get('/', async (req, res) => {
  const journals = await Journals.find();
  return res.status(200).json(journals);
});

// GET USERS JOURNAL ENTRIES
router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const entries = await Journals.findBy({ userId: id });
  entries.length
    ? res.status(200).json(entries)
    : res.status(404).json({ message: 'No entries found for this user' });
})

// DELETE A JOURNAL ENTRY
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const status = await Journals.remove(id);
  status
    ? res.status(204).end()
    : res.status(404).json({ message: 'Entry not found' });
});

module.exports = router;