angular.module('WaitStaffApp', ['ngRoute'])
  //.value('owmCities', ['New York', 'Dallas', 'Chicago'])
  .config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl : 'home.html',
      controller : 'HomeCtrl'
    }).when('/new-meal', {
      templateUrl : 'meal.html',
      controller : 'MealCtrl',
      /*resolve : {
        city : function(owmCities, $route, $location) {
          var city = $route.current.params.city;
          if (owmCities.indexOf(city) == -1) {
            $location.path('/error');
            return;
          }
          return city;
        }
      } */
    }).when('/my-earnings', {
      templateUrl : 'earnings.html',
      controller : 'EarningsCtrl',
    });
    //.when('/error', {
    //  template : '<p>Error - Page Not Found</p>'
    // })

  }])
  .controller('HomeCtrl', function($scope) {
    // empty for now
  })
  .controller('MealCtrl', function($scope) {
    // do nothing for now
  })
  .controller('EarningsCtrl', function($scope) {
    // do nothing for now
  });

