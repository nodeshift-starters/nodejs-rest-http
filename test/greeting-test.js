const test = require('ava');
const supertest = require('supertest');

const app = require('../app');

test('test out greeting route with no query param', async (t) => {
  t.plan(1);
  const response = await supertest(app)
    .get('/api/greeting')
    .expect('Content-Type', /json/)
    .expect(200);
  t.is(response.body.content, 'Hello, World');
});

test('test out greeting route with a query param', async (t) => {
  t.plan(1);
  const response = await supertest(app)
    .get('/api/greeting?name=Luke')
    .expect('Content-Type', /json/)
    .expect(200);
  t.is(response.body.content, 'Hello, Luke');
});
