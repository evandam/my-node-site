define([], function() {
  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('about', {
        url: '/',
        templateUrl: 'components/about/about.html',
        title: 'About Me'
      })
      .state('work', {
        url: '/work',
        title: 'My Work'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'components/contact/contact.html',
        title: 'Contact Me'
      });
  };
  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  return config;
});
