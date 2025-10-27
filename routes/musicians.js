const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'musicians.json');

function ensureDataFile() {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]', 'utf8');
  } catch (err) {
    // If we can't create the file (permissions, locked file, etc.), don't throw —
    // higher-level code will fall back to in-memory store.
    fileAvailable = false;
    console.warn('Warning: could not ensure data file exists:', err && err.message);
  }
}

function load() {
  ensureDataFile();
  if (!fileAvailable) return musicians;
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    fileAvailable = false;
    console.warn('Warning: failed to read data file, using memory store:', e && e.message);
    return musicians;
  }
}

function save(arr) {
  try {
    ensureDataFile();
    fs.writeFileSync(dataFile, JSON.stringify(arr, null, 2), 'utf8');
    fileAvailable = true;
    return true;
  } catch (err) {
    fileAvailable = false;
    console.warn('Warning: failed to save data to file, falling back to memory. Error:', err && err.message);
    return false;
  }
}

// file availability flag — if false we operate purely in-memory
let fileAvailable = true;

// in-memory cache that's kept in sync with file for small app convenience
let musicians = [];
let nextId = 1;

// try to initialize from file; if file not available we'll keep memory-only
const _initial = load();
if (Array.isArray(_initial) && _initial.length > 0) {
  musicians = _initial;
  nextId = musicians.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;
}

// GET /musicians - list all musicians
router.get('/', (req, res) => {
  musicians = load();
  res.json(musicians);
});

// GET /musicians/:id - get by id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  musicians = load();
  const m = musicians.find(x => x.id === id);
  if (!m) return res.status(404).json({ error: 'not found' });
  res.json(m);
});

// POST /musicians - create a musician
router.post('/', (req, res) => {
  const { name, instrument } = req.body;
  if (!name || !instrument) {
    return res.status(400).json({ error: 'name and instrument are required' });
  }
  const musician = { id: nextId++, name, instrument };
  musicians = load();
  musicians.push(musician);
  save(musicians);
  res.status(201).json(musician);
});

// PUT /musicians/:id - replace musician
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, instrument } = req.body;
  if (!name || !instrument) return res.status(400).json({ error: 'name and instrument are required' });
  musicians = load();
  const idx = musicians.findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const updated = { id, name, instrument };
  musicians[idx] = updated;
  save(musicians);
  res.json(updated);
});

// PATCH /musicians/:id - partial update
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, instrument } = req.body;
  if (name === undefined && instrument === undefined) return res.status(400).json({ error: 'name or instrument required' });
  musicians = load();
  const m = musicians.find(x => x.id === id);
  if (!m) return res.status(404).json({ error: 'not found' });
  if (name !== undefined) m.name = name;
  if (instrument !== undefined) m.instrument = instrument;
  save(musicians);
  res.json(m);
});

// DELETE /musicians/:id - delete a musician
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  musicians = load();
  const idx = musicians.findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const deleted = musicians.splice(idx, 1)[0];
  save(musicians);
  res.json(deleted);
});

// For tests: helper to reset datastore
router._reset = () => {
  try {
    ensureDataFile();
    musicians = [];
    nextId = 1;
    save(musicians);
  } catch (err) {
    // If we can't write to disk, still reset in-memory state so tests can proceed.
    console.warn('Warning: could not reset data file, resetting in-memory only:', err && err.message);
    musicians = [];
    nextId = 1;
  }
};

module.exports = router;
