var app = angular.module('userApp', [])
.controller('userCtrl', function($scope, $http) {
    
    /*Submit signup/make sure username is not already in the database.*/
    $scope.submitSignUp = function() {
        if (!$scope.signUpUsername || !$scope.signUpPassword || !$scope.signUpConfirmPassword) {
            alert("Some user input was not added. Please try again with all input boxes filled.");
            $scope.signUpUsername = '';
            $scope.signUpPassword = '';
            $scope.signUpConfirmPassword = '';
            return;
        }
    
        if ($scope.signUpPassword != $scope.signUpConfirmPassword) {
            alert("Your two passwords did not match. Please try again.");
            $scope.signUpPassword = '';
            $scope.signUpConfirmPassword = '';
            return;
        }
        
        var userInfo = {"username": $scope.signUpUsername, "password": $scope.signUpConfirmPassword}
        
        $http({
            method: "POST",
            url: "/users/" + $scope.signUpUsername,
            data: userInfo 
        })
        .then(function(response) {
            if (response.data) {
                /*Create cookie. */
                var date = new Date();
                var day = date.getDay();
                var utcDate = date.getUTCDate(); //Get day of the month
                var utcYear = date.getUTCFullYear(); //Get the current year.
                var utcHour = date.getUTCHours(); //Get current hours.
                var utcMinutes = date.getMinutes(); //Get current Minutes
                var utcMonth = date.getUTCMonth(); //Current month;
                var utcSeconds = date.getUTCSeconds(); //Get current seconds.
                var utcMillisecond = date.getMilliseconds(); //Get current milliseconds.
                var nextUtcDay = utcDate + 1;
                var utcCompleteDate = new Date(utcYear, utcMonth, nextUtcDay, utcHour, utcMinutes, utcSeconds, utcMillisecond);
                var stringDate = utcCompleteDate.toString();
                var shortDate = stringDate.split(' ');
                var potentialCookie = "username=" + response.data + "; expires=" + shortDate[0] + ", " + shortDate[2] + " " + shortDate[1] + " " + shortDate[3] + " " + shortDate[4] + " UTC";
                document.cookie = potentialCookie;
                var cookieString = document.cookie;
                window.location.replace("userPage.html");
            }
        }, 
        function errorCheck(response) {
            alert("Somebody has already signed up with that username. Please try a different input.");
        })
        $scope.signUpUsername = '';
        $scope.signUpPassword = '';
        $scope.signUpConfirmPassword = '';
    }
})