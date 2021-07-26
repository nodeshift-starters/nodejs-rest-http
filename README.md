 ![Node.js CI](https://github.com/nodeshift-starters/nodejs-rest-http/workflows/ci/badge.svg)
 [![Coverage Status](https://coveralls.io/repos/github/nodeshift-starters/nodejs-rest-http/badge.svg?branch=master)](https://coveralls.io/github/nodeshift-starters/nodejs-rest-http?branch=master)

## Running The Example

You can run this example as node processes on your localhost, as pods on a local
[code-ready-containers](https://developers.redhat.com/products/codeready-containers/overview) installation.

### Localhost

To run the basic application on your local machine, just run the commands bellow:

```
$ npm install
$ npm start
```

If you want debug information, you can set `DEBUG` environment variable and start the application:

```
$ DEBUG=* npm start
```

This will launch the application on port 8080.

### CodeReady Containers

CRC should be started, and you should be logged in with a currently
active project. Then run the `npm run openshift` command.

```sh
$ crc setup # Set-up the hypervisor
$ crc start # Initialize the openshift cluster
$ oc login -u developer # Login
$ oc new-project my-example-project # Create a project to deploy to
$ npm run openshift # Deploys the example app
```

This app has an example of integration test using an [integration test tool for Node.js apps on OpenShift](https://github.com/nodeshift/rhoaster)

Once you started your local OpenShift instance you can check it out by running the following commands:

```
npm run test:integration
```

It will deploy the app to local OpenShift and run the tests located on `test/integration` directory.

```
npm run test:integration:undeploy
```

Performs undeploy of the app inside local OpenShift.
