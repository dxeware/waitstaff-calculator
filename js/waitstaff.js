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
            debug("price = " + $scope.mealForm.price.$modelValue);
            debug("tax = " + $scope.mealForm.tax.$modelValue);

            //Calculate customer charges and waiter earnings
            subtotal = $scope.mealForm.price.$modelValue *
                              ( 1 + $scope.mealForm.tax.$modelValue/100 );

            debug("subtotal = " + subtotal);
            tipDollars = subtotal * $scope.mealForm.tip.$modelValue/100;
            debug("tipDollars = " + tipDollars);
            mealTotal = subtotal + tipDollars;
            debug("mealTotal = " + mealTotal);

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
    // Fill in the user's answers for story
    $scope.fillIn = function() {
        $scope.answers[0] = $scope.relative1;
        $scope.answers[1] = $scope.adjective1;
        $scope.answers[2] = $scope.adjective2;
        $scope.answers[3] = $scope.adjective3;
        $scope.answers[4] = $scope.person1;
        $scope.answers[5] = $scope.adjective4;
        $scope.answers[6] = $scope.person1;
        $scope.answers[7] = $scope.adjective5;
        $scope.answers[8] = $scope.verbed;
        $scope.answers[9] = $scope.body;
        $scope.answers[10] = $scope.verbing;
        $scope.answers[11] = $scope.nounpl;
        $scope.answers[12] = $scope.noun;
        $scope.answers[13] = $scope.adverb;
        $scope.answers[14] = $scope.verb1;
        $scope.answers[15] = $scope.verb2;
        $scope.answers[16] = $scope.hugenumber;
        $scope.answers[17] = $scope.relative2;
        $scope.answers[18] = $scope.person2;


    };

    // Reset in order to start over
    $scope.startOver = function() {
        $scope.showStory=false;
        $scope.showInputs=true;

        for (var i = 0; i < $scope.answers.length; i++) {
            $scope.answers[i] = "";
        }

        $scope.relative1 = "";
        $scope.adjective1 = "";
        $scope.adjective2 = "";
        $scope.adjective3 = "";
        $scope.person1 = "";
        $scope.adjective4 = "";
        $scope.person1 = "";
        $scope.adjective5 = "";
        $scope.verbed = "";
        $scope.body = "";
        $scope.verbing = "";
        $scope.nounpl = "";
        $scope.noun = "";
        $scope.adverb = "";
        $scope.verb1 = "";
        $scope.verb2 = "";
        $scope.hugenumber = "";
        $scope.relative2 = "";
        $scope.person2 = "";
    };
});
