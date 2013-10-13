angular.module('angular-transitions', ['ui.select2', 'ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/view/page1');
  $stateProvider
  .state('view', { controller: 'ViewAnimationsCtrl', url: '/view', templateUrl: './partials/view/main.html' })
  .state('view.page1', { url: '/page1', templateUrl: './partials/view/page1.html' })
  .state('view.page2', { url: '/page2', templateUrl: './partials/view/page2.html' })
  .state('repeat', { controller: 'RepeatAnimationsCtrl', url: '/repeat', templateUrl: './partials/repeat/main.html' });
})
.controller('MainCtrl', function ($scope) {
  $scope.currentState = '';
  $scope.$on('$stateChangeSuccess', function (e, state) {
    $scope.currentState = state.name;
  });
})
.controller('ViewAnimationsCtrl', function ($scope, $location) {
  var animations = [{
    name: 'Vertical flip',
    value: {
      enter: 'at-view-flip-in-vertical',
      leave: 'at-view-flip-out-vertical'
    }
  },
  {
    name: 'Horizontal flip',
    value: {
      enter: 'at-view-flip-in-horizontal',
      leave: 'at-view-flip-out-horizontal'
    }
  },
  {
    name: 'Fade',
    value: {
      enter: 'at-view-fade-in',
      leave: 'at-view-fade-out'
    }
  },
  {
    name: 'Slide from left',
    value: {
      enter: 'at-view-slide-in-left',
      leave: 'at-view-slide-out-left'
    }
  },
  {
    name: 'Slide in left, slide out right',
    value: {
      enter: 'at-view-slide-in-left',
      leave: 'at-view-slide-out-right',
    }
  },
  {
    name: 'Rotate top-left',
    value: {
      enter: 'at-view-slide-in-bottom',
      leave: 'at-view-rotate-fade-out'
    }
  },
  {
    name: 'Slide & rotate left',
    value: {
      enter: 'at-view-slide-in-left',
      leave: 'at-view-flip-out-right'
    }
  },
  {
    name: 'Emerge and scale',
    value: {
      enter: 'at-view-emerge',
      leave: 'at-view-scale-out'
    }
  },
  {
    name: 'Slide & opposite rotate left',
    value: {
      enter: 'at-view-slide-in-left',
      leave: 'at-view-flip-out-right-opposite'
    }
  },
  {
    name: 'Scale in',
    value: {
      enter: 'at-view-scale-in',
      leave: 'at-view-fade-out'
    }
  },
  {
    name: 'Slide from right',
    value: {
      enter: 'at-view-slide-in-right',
      leave: 'at-view-slide-out-right'
    }
  },
  {
    name: 'Slide from top',
    value: {
      enter: 'at-view-slide-in-top',
      leave: 'at-view-slide-out-top'
    }
  },
  {
    name: 'Slide from bottom',
    value: {
      enter: 'at-view-slide-in-bottom',
      leave: 'at-view-slide-out-bottom'
    }
  }];

  $scope.animations = animations;
  $scope.current = angular.toJson(animations[0].value);
  $scope.getAnimation = function () {
    return angular.fromJson($scope.current);
  };

  var pages = ['page1', 'page2'],
      currentPage = 0;
  $scope.toggle = function () {
    $location.path('view/' + pages[currentPage = (currentPage + 1) % 2]);
  };
})
.controller('RepeatAnimationsCtrl', function ($scope) {
  // Et his contentiones consectetuer conclusionemque.
  $scope.collection = [
    'Copiosae',
    'Eloquentiam',
    'Deseruisse',
    'Conclusionemque',
    'Instructior',
    'Eluquantiam',
    'Contentiones',
    'Cituperata'
  ];


  var animations = [{
    name: 'Wave',
    value: {
      enter: 'at-repeat-wave-in',
      leave: 'at-repeat-wave-out'
    }
  },
  {
    name: 'Grow',
    value: {
      enter: 'at-repeat-grow-in',
      leave: 'at-repeat-grow-out'
    }
  },
  {
    name: 'Fan',
    value: {
      enter: 'at-repeat-fan-in',
      leave: 'at-repeat-fan-out'
    }
  },
  {
    name: 'Fade',
    value: {
      enter: 'at-repeat-fade-in',
      leave: 'at-repeat-fade-out'
    }
  },
  {
    name: 'Horizontal Flip',
    value: {
      enter: 'at-repeat-flip-in-horizontal',
      leave: 'at-repeat-flip-out-horizontal'
    }
  },
  {
    name: 'Vertical Flip',
    value: {
      enter: 'at-repeat-flip-in-vertical',
      leave: 'at-repeat-flip-out-vertical'
    }
  },
  {
    name: 'Twirl',
    value: {
      enter: 'at-repeat-twirl-in',
      leave: 'at-repeat-twirl-out'
    }
  },
  {
    name: 'Fly reverse',
    value: {
      enter: 'at-repeat-fly-reverse-in',
      leave: 'at-repeat-fly-reverse-out'
    }
  },
  {
    name: 'Macro',
    value: {
      enter: 'at-repeat-macro-in',
      leave: 'at-repeat-macro-out'
    }
  }];

  $scope.animations = animations;
  $scope.current = angular.toJson(animations[0].value);

  $scope.getAnimation = function () {
    return angular.fromJson($scope.current);
  };

  var removed = [];
  $scope.removeItem = function () {
    if ($scope.collection.length)
      removed.push($scope.collection.pop());
  };
  $scope.addItem = function () {
    if (removed.length)
      $scope.collection.push(removed.pop());
  };
});