angular.module('angular-transitions', ['ui.select2', 'ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
  'use strict';
  $urlRouterProvider.otherwise('/view/page1');
  $stateProvider
  .state('view', { controller: 'ViewAnimationsCtrl', url: '/view', templateUrl: './partials/view/main.html' })
  .state('view.page1', { url: '/page1', templateUrl: './partials/view/page1.html' })
  .state('view.page2', { url: '/page2', templateUrl: './partials/view/page2.html' })
  .state('repeat', { controller: 'RepeatAnimationsCtrl', url: '/repeat', templateUrl: './partials/repeat/main.html' });
})
.controller('MainCtrl', function ($scope, $state, Stylesheet, CSSParser) {
  'use strict';
  var pageStyleMap = {
      'view': ['http://localhost:8000/css/view/1.1.5/animations.css', 'http://localhost:8000/css/view/1.2.0/animations.css'],
      'repeat': ['http://localhost:8000/css/repeat/1.1.5/animations.css', 'http://localhost:8000/css/repeat/1.2.0/animations.css']
    },
    loaded = [false, false];

  $scope.selectedStyle = {};
  $scope.loading = true;
  $scope.$on('$stateChangeSuccess', function (e, state) {
    $scope.currentState = state.name;
  });
  function getViewName(state) {
    return (state.name.indexOf('view') >= 0) ? 'view' : 'repeat';
  }
  $scope.showCSS = function () {
    var view = getViewName($state.current),
        styles = pageStyleMap[view];
    $scope.resetDialog();
    Stylesheet(styles[0]).then(function (s) {
      $scope.v115Rules = cssbeautify(CSSParser.extractStyle([$scope.selectedStyle.enter, $scope.selectedStyle.leave], CSSParser.parse(s)));
      loaded[0] = true;
      if (loaded[1]) {
        $scope.loading = false;
      }
    });
    Stylesheet(styles[1]).then(function (s) {
      $scope.v120Rules = cssbeautify(CSSParser.extractStyle([$scope.selectedStyle.enter, $scope.selectedStyle.leave], CSSParser.parse(s)));
      loaded[1] = true;
      if (loaded[0]) {
        $scope.loading = false;
      }
    });
  };
  $scope.setSelectedStyle = function (style) {
    $scope.selectedStyle = JSON.parse(style);
  };
  $scope.resetDialog = function () {
    loaded = [false, false];
    $scope.loading = true;
  };
})
.controller('ViewAnimationsCtrl', function ($scope, $location) {
  'use strict';
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
  $scope.$watch('current', function (v) {
    $scope.setSelectedStyle(v);
  });
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
  'use strict';
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
  $scope.$watch('current', function (v) {
    $scope.setSelectedStyle(v);
  });
  $scope.getAnimation = function () {
    $scope.setSelectedStyle($scope.current);
    return angular.fromJson($scope.current);
  };

  var removed = [];
  $scope.removeItem = function () {
    if ($scope.collection.length) {
      removed.push($scope.collection.pop());
    }
  };
  $scope.addItem = function () {
    if (removed.length) {
      $scope.collection.push(removed.pop());
    }
  };
})
.factory('Stylesheet', function ($q, $http) {
  'use strict';
  var cache = {};
  return function (url) {
    if (cache[url]) {
      return $q.when(cache[url]);
    } else {
      return $http.get(url)
      .then(function (data) {
        data = data.data;
        cache[url] = data;
        return data;
      });
    }
  };
})
.factory('CSSParser', function () {
  'use strict';
  return {
    parse: function (input) {
      var parser = new CSSParser();
      return parser.parse(input, false, false);
    },
    extractStyle: function (names, data) {
      var result = null;
      if (data) {
        data.cssRules.forEach(function (r) {
          names.forEach(function (name) {
            if (r.mSelectorText.indexOf(name) >= 0) {
              result = result || '';
              result += r.parsedCssText;
            }
          });
        });
      }
      return result;
    }
  };
})
.directive('atSelectable', function () {
  'use strict';
  return function (scope, el) {
    $(el).focus(function () {
      var $this = $(this);
      $this.select();
      $this.mouseup(function () {
        $this.unbind('mouseup');
        return false;
      });
    });
  };
});