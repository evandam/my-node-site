define([
  'angular',
  './navbarDirective'
], function(angular, directive) {
  var module = angular.module('navbar', [])
    .directive('evNavbar', directive);

  return module;
});
