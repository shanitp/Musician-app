const express = require('express');
const musiciansRouter = require('./routes/musicians');

const app = express();
app.use(express.json());

// Serve static UI
app.use(express.static('public'));

app.use('/musicians', musiciansRouter);

// health (keeps JSON health available at /health)
app.get('/health', (req, res) => res.json({ ok: true }));

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = app;
