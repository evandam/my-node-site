define([], function() {
  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        title: 'About Me'
      })
      .state('work', {
        url: '/work',
        title: 'My Work'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        title: 'Contact Me'
      });
  };
  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  return config;
});
