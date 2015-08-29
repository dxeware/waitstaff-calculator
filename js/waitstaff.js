var DEBUG_MODE = true;
var debug = function(msg) {
  if (DEBUG_MODE === true) {
      console.log("DEBUG:", msg);
  }
};

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
    // do nothing for now
  })
  .controller('MealCtrl', function($scope) {
    //$scope.showHome = true;
    var tipCount = 0;
    var mealCount = 0;

    $scope.priceMin = 0.01;
    $scope.percentageMax = 100;

    $scope.meal = {
        price: "",
        tax: "",
        tip: ""
    };

    $scope.error = {
        msg: ""
    };

    // Validity checking of inputs and show story is OK
    $scope.submit = function() {

        var subtotal, tipDollars, mealTotal;
        var avgTip;


        debug("Caught form submission!");

        debug("Form valid = " + $scope.mealForm.$valid);
        if( !$scope.mealForm.$valid ) {
            debug("tax error max= " + $scope.mealForm.tax.$error.max);
            debug("tax error min= " + $scope.mealForm.tax.$error.min);
            if ( ( $scope.mealForm.price.$error.required ) ||
                    ( $scope.mealForm.tax.$error.required ) ||
                    ( $scope.mealForm.tip.$error.required ) ) {
                $scope.error.msg = "All inputs are required!";
                debug($scope.error.msg);
            } else if( $scope.mealForm.tax.$error.min || $scope.mealForm.tax.$error.max ) {
                $scope.error.msg = "The tax rate must be > 0 and <= " + $scope.percentageMax + "!";
                debug($scope.error.msg);
            } else if ( $scope.mealForm.tip.$error.min || $scope.mealForm.tip.$error.max ) {
                $scope.error.msg = "The tip must be > 0 and <= " + $scope.percentageMax + "!";
                debug($scope.error.msg);
            } else if ( $scope.mealForm.price.$error.min ) {
                $scope.error.msg = "The meal price must be > $0!";
                debug($scope.error.msg);
            }
        } else {

            // Clear errorMsg
            $scope.error.msg = "";

            //Calculate customer charges and waiter earnings
            subtotal = $scope.meal.price *
                              ( 1 + $scope.meal.tax/100 );

            tipDollars = subtotal * $scope.meal.tip/100;
            mealTotal = subtotal + tipDollars;

            tipCount += tipDollars;
            mealCount += subtotal;

            //Display to view -- handling rounding to 2 decimal places
            $scope.subtotalStr = subtotal.toFixed(2);
            $scope.tipDollarsStr = tipDollars.toFixed(2);
            $scope.mealTotalStr = mealTotal.toFixed(2);

            $scope.tipCountStr = tipCount.toFixed(2);
            $scope.mealCountStr = mealCount.toFixed(2);
            $scope.avgTipStr = (tipCount / mealCount * 100).toFixed(2);
        }
    };

    // Clear user inputs when cancel button pressed
    $scope.cancel = function() {

        $scope.error.msg = "";
        $scope.meal.price = "";
        $scope.meal.tax = "";
        $scope.meal.tip = "";
    };

    // Reset in order to start over
    $scope.startOver = function() {
        tipCount = 0;
        mealCount = 0;

        //Clear inputs by calling cancel()
        $scope.cancel();

        $scope.subtotalStr = "";
        $scope.tipDollarsStr = "";
        $scope.mealTotalStr = "";
        $scope.tipCountStr = "";
        $scope.mealCountStr = "";
        $scope.avgTipStr = "";

    };

  })
  .controller('EarningsCtrl', function($scope) {
    // do nothing for now
  });

