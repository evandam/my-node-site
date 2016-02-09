define([], function() {
  function directive($state) {
    return {
      restrict: 'AE',
      templateUrl: '/views/navbar.html',
      transclude: true,
      scope: {
        title: '@evNavbar'
      },
      link: function postLink(scope, element, attrs) {
        // Get concrete states, and make a proper title if not provided.
        scope.states = $state.get().filter(function(state) {
          return !state.abstract;
        }).map(function(state) {
          if (!state.title) {
            state.title = state.name.charAt(0).toUpperCase() + state.name.slice(1);
          }
          return state;
        });
      }
    };
  };
  directive.$inject = ['$state'];
  return directive;
});
