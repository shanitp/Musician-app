# Musician App

Simple Node.js + Express app exposing endpoints to GET, POST, and DELETE musicians using an in-memory store.

Endpoints:
- GET /musicians
- POST /musicians { name, instrument }
- DELETE /musicians/:id

Run locally:

```powershell
npm install
npm start
```

Run tests:

```powershell
npm test
```

UI:

After starting the server (`npm start`) open a browser and visit:

http://localhost:3000/

The page provides a simple form to add musicians and a list with Delete buttons to remove them.
