const nodeshift = require('nodeshift');


nodeshift.deployApplication().then((message) => {
  console.log('Application Depoyed');
}).catch((err) => {
  console.error('Error', err);
})
