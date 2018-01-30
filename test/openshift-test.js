const test = require('tape');
const openshiftTestAssistant = require('openshift-test-assistant');

const request = require('supertest');

test('setup', function (t) {
    openshiftTestAssistant.deploy({
        "projectLocation" : __dirname + "/..",
        "strictSSL" : false
    }).then(() => {
        t.ok(true); //indicate success
        t.end();
    }).catch(reason => {
        t.fail(reason);
        t.end();
    });
});

test('test openshift greeting with no query param', (t) => {
    if (!openshiftTestAssistant.isReady()){
        t.skip();
        t.end();
    }
    else {
        request(openshiftTestAssistant.getRoute())
            .get('/api/greeting')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                t.equal(response.body.content, 'Hello, World');
                t.end();
            })
            .catch(reason => {
                t.fail(reason);
                t.end();
            });
    }
});

test('test openshift greeting with query param', (t) => {
    if (!openshiftTestAssistant.isReady()){
        t.skip();
        t.end();
    }
    else {
        request(openshiftTestAssistant.getRoute())
            .get('/api/greeting?name=Luke')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                t.equal(response.body.content, 'Hello, Luke');
                t.end();
            })
            .catch(reason => {
                t.fail(reason);
                t.end();
            });
    }
});

test('teardown', function (t){
    openshiftTestAssistant.undeploy({
        "projectLocation" : __dirname + "/..",
        "strictSSL" : false
    }).then(() => {
        t.end();
    }).catch(reason => {
        t.fail(reason);
        t.end();
    });
});





