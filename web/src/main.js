require.config({
  paths: {
    "angular": "bower_components/angular/angular",
    "bootstrap": "bower_components/bootstrap/dist/js/bootstrap",
    "jquery": "bower_components/jquery/dist/jquery",
    "requirejs": "bower_components/requirejs/require",
    "angular-bootstrap": "bower_components/angular-bootstrap/ui-bootstrap-tpls",
    "angular-ui-router": "bower_components/angular-ui-router/release/angular-ui-router"
  },
  packages: [],
  shim: {
    "angular": {
      exports: "angular"
    },
    "angular-bootstrap": {
      deps: [
        "angular"
      ]
    },
    "angular-ui-router": {
      deps: [
        "angular"
      ]
    },
    "jQuery": {
      exports: "jQuery"
    }
  }
});

require(['angular', 'app'], function (angular, app) {
  angular.bootstrap(document.body, [app.name]);
});
