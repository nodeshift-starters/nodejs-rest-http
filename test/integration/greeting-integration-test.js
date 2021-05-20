/* eslint-disable no-undef */
'use strict';

const assert = require('assert');
const supertest = require('supertest');
const rhoaster = require('rhoaster');

const testEnvironment = rhoaster({
  deploymentName: 'nodejs-rest-http',
  dockerImage: 'registry.access.redhat.com/ubi8/nodejs-12'
});

describe('Greeting route', () => {
  let route;
  before(async function () {
    this.timeout(0);
    route = await testEnvironment.deploy();
  });

  it('/api/greeting', async () => {
    const { body } = await supertest(route)
      .get('/api/greeting')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(body.content, 'Hello, World!');
  });

  it('/api/greeting with query param', async () => {
    const { body } = await supertest(route)
      .get('/api/greeting?name=luke')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(body.content, 'Hello, luke');
  });

  after(async function () {
    this.timeout(0);
    await testEnvironment.undeploy();
  });
});
