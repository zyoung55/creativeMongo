var app = angular.module('userApp', [])
.controller('userCtrl', function($scope, $http) {
    
    $scope.submitSignUp = function() {
        console.log("username" + $scope.signUpUsername);
        if (!$scope.signUpUsername || !$scope.signUpPassword || !$scope.signUpConfirmPassword) {
            alert("Some user input was not added. Please try again will all input boxes filled.");
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
        
        console.log("Made it here!!!");
        console.log($scope.signUpConfirmPassword);
    
        $http({
            method: "POST",
            url: "/users/" + $scope.signUpUsername,
            data: userInfo 
        })
        .then(function(response) {
            if (response.data) {
                console.log("Data" + response.data);
                var date = new Date();
                var day = date.getDay();
                console.log("day: " + day);
                var utcDate = date.getUTCDate(); //Get day of the month
                var utcYear = date.getUTCFullYear(); //Get the current year.
                var utcHour = date.getUTCHours(); //Get current hours.
                var utcMinutes = date.getMinutes(); //Get current Minutes
                var utcMonth = date.getUTCMonth(); //Current month;
                var utcSeconds = date.getUTCSeconds(); //Get current seconds.
                var utcMillisecond = date.getMilliseconds(); //Get current milliseconds.
                console.log("date: " + utcDate + " Year " + utcYear + " Hour:" + utcHour + " Minutes:" + utcMinutes + " month" + utcMonth);
                var nextUtcDay = utcDate + 1;
                var utcCompleteDate = new Date(utcYear, utcMonth, nextUtcDay, utcHour, utcMinutes, utcSeconds, utcMillisecond);
                //var potentialCookie = "username=" + response.data + "expires=" utcDate + 1
                console.log(utcCompleteDate);
                var stringDate = utcCompleteDate.toString();
                var shortDate = stringDate.split(' ');
                console.log(shortDate[0]);
                var potentialCookie = "username=" + response.data + "; expires=" + shortDate[0] + ", " + shortDate[2] + " " + shortDate[1] + " " + shortDate[3] + " " + shortDate[4] + " UTC";
                console.log(potentialCookie);
                document.cookie = potentialCookie;
                var cookieString = document.cookie;
                console.log("Cookie String: " + cookieString);
                window.location.replace("userPage.html");
            }
        }, function errorCheck(response) {
            alert("Somebody has already signed up with that username. Please try a different input.");
        })
        $scope.signUpUsername = '';
        $scope.signUpPassword = '';
        $scope.signUpConfirmPassword = '';
    }
})