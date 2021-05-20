/* eslint-disable no-undef */
const assert = require('assert');
const supertest = require('supertest');

const app = require('../app');

describe('Greeting route', () => {
  it('with no query param', async () => {
    const { body } = await supertest(app)
      .get('/api/greeting')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(body.content, 'Hello, World!');
  });

  it('with a query param', async () => {
    const { body } = await supertest(app)
      .get('/api/greeting?name=Luke')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(body.content, 'Hello, Luke');
  });
});
