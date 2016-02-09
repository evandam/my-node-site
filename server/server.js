'use strict';

let
  express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  PORT = process.env.PORT || 3000,
  STATIC = path.join(__dirname, '..', 'web', 'dist');
var
  app = express();

app.use(bodyParser.json());
app.use(express.static(STATIC));
// Html5Mode
app.all('/*', function(req, res) {
  res.sendFile(path.join(STATIC, 'index.html'));
});

app.listen(PORT, function() {
  console.log('express listening on port %s', PORT);
});

function handleResponse(error, out, res) {
  if (error) {
    console.error(error.stack);
    res.status(500).send({error: error.message});
  } else {
    res.send(out);
  }
}
