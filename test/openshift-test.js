const test = require('tape');
const OpenshiftTestAssistant = require('openshift-test-assistant');
const openshiftAssistant = new OpenshiftTestAssistant();
const path = require('path');
const request = require('supertest');

test('setup', (t) => {
  t.plan(1);
  openshiftAssistant.deploy({
    'projectLocation': path.join(__dirname, '/..'),
    'strictSSL': false
  }).then(() => {
    t.pass('Application deployed'); // indicate success
  }).catch(reason => {
    t.fail(reason);
  });
});

test('test openshift greeting with no query param', (t) => {
  t.plan(1);
  if (!openshiftAssistant.isReady()) {
    t.skip('Application not ready, skipping the test');
  } else {
    request(openshiftAssistant.getRoute())
      .get('/api/greeting')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        t.equal(response.body.content, 'Hello, World', 'Received message should math the expected one');
      })
      .catch(reason => {
        t.fail(reason);
      });
  }
});

test('test openshift greeting with query param', (t) => {
  t.plan(1);
  if (!openshiftAssistant.isReady()) {
    t.skip('Application not ready, skipping the test');
  } else {
    request(openshiftAssistant.getRoute())
      .get('/api/greeting?name=Luke')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        t.equal(response.body.content, 'Hello, Luke', 'Received message should math the expected one');
      })
      .catch(reason => {
        t.fail(reason);
      });
  }
});

test('teardown', (t) => {
  t.plan(1);
  openshiftAssistant.undeploy()
    .then(() => {
      t.pass('Application successfully undeployed');
    }).catch(reason => {
      t.fail(reason);
    });
});
