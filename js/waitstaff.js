var DEBUG_MODE = true;
var debug = function(msg) {
  if (DEBUG_MODE === true) {
      console.log("DEBUG:", msg);
  }
};

angular.module('waitstaffCalc', [])
  .controller('inputCtrl', function($scope) {

    var tipCount = 0;
    var mealCount = 0;

    $scope.priceMin = 0.01;
    $scope.percentageMax = 100;

    // Validity checking of inputs and show story is OK
    $scope.submit = function() {

        var subtotal, tipDollars, mealTotal;
        var avgTip;


        debug("Caught form submission!");

        debug("Form valid = " + $scope.mealForm.$valid);
        if( !$scope.mealForm.$valid ) {
            debug("tax error max= " + $scope.mealForm.tax.$error.max);
            debug("tax error min= " + $scope.mealForm.tax.$error.min);
            if( $scope.mealForm.tax.$error.min || $scope.mealForm.tax.$error.max ) {
                $scope.errorMsg = "The tax rate must be > 0 and <= " + $scope.percentageMax + "!";
                debug($scope.errorMsg);
            } else if ( $scope.mealForm.tip.$error.min || $scope.mealForm.tip.$error.max ) {
                $scope.errorMsg = "The tip must be > 0 and <= " + $scope.percentageMax + "!";
                debug($scope.errorMsg);
            } else if ( $scope.mealForm.price.$error.min ) {
                $scope.errorMsg = "The meal price must be > $0!";
                debug($scope.errorMsg);
            }
        } else {

            // Clear errorMsg
            $scope.errorMsg = "";

            //Calculate customer charges and waiter earnings
            subtotal = $scope.mealForm.price.$modelValue *
                              ( 1 + $scope.mealForm.tax.$modelValue/100 );

            tipDollars = subtotal * $scope.mealForm.tip.$modelValue/100;
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

        $scope.price = "";
        $scope.tax = "";
        $scope.tip = "";
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



});
