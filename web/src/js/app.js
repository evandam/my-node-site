define([
  'angular',
  'app.config',
  './navbar/module',
  'angular-bootstrap',
  'angular-ui-router'
], function (angular, config, navbar) {
  var app = angular.module('MySite', [
    'ui.router',
    'ui.bootstrap',
    navbar.name
  ]);
  app.config(config);
  return app;
});
