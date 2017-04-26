var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//
app.use('/api/greeting', (request, response) => {
  const name = request.query ? request.query.name : undefined;
  response.send({content: `Hello, ${name || 'World'}`});
});

module.exports = app;
