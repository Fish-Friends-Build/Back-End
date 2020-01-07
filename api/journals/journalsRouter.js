const router = require('express').Router();
const Journals = require('./journalsModel.js');

// ADD A NEW JOURNAL ENTRY
router.post('/', validateEntryContent, async (req, res) => {
  const user = res.locals.decodedJwt;
  const [journal] = await Journals.insert({ ...req.body, userId: user.id });
  const { userId, id, ...rest } = journal;
  return res.status(200).json({ id, username: user.username, ...rest });
});

// UPDATE A JOURNAL ENTRY
router.put('/:id', validateEntryUser, validateEntryContent, async (req, res) => {
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
router.delete('/:id', validateEntryUser, async (req, res) => {
  const id = req.params.id;
  const status = await Journals.remove(id);
  status
    ? res.status(204).end()
    : res.status(404).json({ message: 'Entry not found' });
});

// CUSTOM MIDDLEWARE
async function validateEntryUser(req, res, next) {
  const id = req.params.id;
  const [entry] = await Journals.findBy({ "j.id": id });
  if (!entry) return res.status(404).json({ message: 'Invalid journal id.' });
  if (entry.userId !== res.locals.decodedJwt.id) return res.status(403).end();
  next();
};

function validateEntryContent(req, res, next) {
  const {
    numFishCaught,
    date,
    timeOfDay,
    location,
    fishType,
    bankOrBoat,
    waterType
  } = req.body;

  let missing = [];
  if (numFishCaught === null) missing.push(' numFishCaught');
  if (!date) missing.push(' date');
  if (!timeOfDay) missing.push(' timeOfDay');
  if (!location) missing.push(' location');
  if (!bankOrBoat) missing.push(' bankOrBoat');
  if (!waterType) missing.push(' waterType');

  if (fishType) {
    if (!Array.isArray(fishType)) {
      req.body.fishType = [fishType];
    }
  };

  missing.length
    ? res.status(401).json({ message: `Missing fields: ${missing.map(m => m)}.`})
    : next();
}

module.exports = router;