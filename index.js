const express = require('express');
const musiciansRouter = require('./routes/musicians');

const app = express();
app.use(express.json());

// Serve static UI
app.use(express.static('public'));

app.use('/musicians', musiciansRouter);

// health (keeps JSON health available at /health)
const pkg = require('./package.json');
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: pkg.version,
  });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = app;
