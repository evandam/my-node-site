'use strict';

let
  express = require('express'),
  bodyParser = require('body-parser');
var
  app = express();

app.use(bodyParser.json());

function handleResponse(error, out, res) {
  if (error) {
    console.error(error.stack);
    res.status(500).send({error: error.message});
  } else {
    res.send(out);
  }
}

module.exports = {
  init: function(config) {
    app.use(express.static(config.static));
    // define other routes handleResponse

    // Html5Mode
    app.all('/*', function(req, res) {
      res.sendFile(config.static + '/index.html');
    });
    app.listen(config.port, function() {
      console.log('express listening on port %s', config.port);
    });
  }
};
