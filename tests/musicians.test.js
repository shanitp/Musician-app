const request = require('supertest');
const app = require('../index');
const musiciansRouter = require('../routes/musicians');

beforeEach(() => {
  // reset in-memory store
  musiciansRouter._reset();
});

test('GET /musicians initially empty', async () => {
  const res = await request(app).get('/musicians');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([]);
});

test('POST /musicians creates musician', async () => {
  const payload = { name: 'John Doe', instrument: 'Guitar' };
  const res = await request(app).post('/musicians').send(payload);
  expect(res.statusCode).toBe(201);
  expect(res.body).toMatchObject(payload);
  expect(res.body.id).toBeDefined();

  const getRes = await request(app).get('/musicians');
  expect(getRes.body).toHaveLength(1);
});

test('DELETE /musicians/:id deletes musician', async () => {
  const payload = { name: 'Jane', instrument: 'Piano' };
  const post = await request(app).post('/musicians').send(payload);
  const id = post.body.id;

  const del = await request(app).delete(`/musicians/${id}`);
  expect(del.statusCode).toBe(200);
  expect(del.body.id).toBe(id);

  const getRes = await request(app).get('/musicians');
  expect(getRes.body).toHaveLength(0);
});

test('POST validation returns 400', async () => {
  const res = await request(app).post('/musicians').send({ instrument: 'Violin' });
  expect(res.statusCode).toBe(400);
});

test('GET /musicians/:id returns musician by id', async () => {
  const payload = { name: 'IdGuy', instrument: 'Bass' };
  const post = await request(app).post('/musicians').send(payload);
  const id = post.body.id;

  const get = await request(app).get(`/musicians/${id}`);
  expect(get.statusCode).toBe(200);
  expect(get.body).toMatchObject(payload);
});

test('PUT /musicians/:id replaces musician', async () => {
  const payload = { name: 'Old', instrument: 'Violin' };
  const post = await request(app).post('/musicians').send(payload);
  const id = post.body.id;

  const updated = { name: 'New Name', instrument: 'Cello' };
  const put = await request(app).put(`/musicians/${id}`).send(updated);
  expect(put.statusCode).toBe(200);
  expect(put.body).toMatchObject(updated);

  const get = await request(app).get(`/musicians/${id}`);
  expect(get.body).toMatchObject(updated);
});

test('PATCH /musicians/:id updates partly', async () => {
  const payload = { name: 'Patchy', instrument: 'Flute' };
  const post = await request(app).post('/musicians').send(payload);
  const id = post.body.id;

  const patch = await request(app).patch(`/musicians/${id}`).send({ instrument: 'Sax' });
  expect(patch.statusCode).toBe(200);
  expect(patch.body.instrument).toBe('Sax');
  expect(patch.body.name).toBe('Patchy');
});
