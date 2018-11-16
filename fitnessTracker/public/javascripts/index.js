var app = angular.module('myApp', [])
    .controller('myCtrl', ['$scope', '$http',
    function($scope, $http) {
         
         if (document.cookie) {
             var tempCookie = document.cookie;
             console.log(tempCookie);
             window.location.replace("userPage.html");
         }
         
         $scope.submitSignIn = function() {
             if (!$scope.signInUsername || !$scope.signInPassword) {
                 alert("You forgot to add some information. Please try again.");
                 $scope.signInUsername = '';
                $scope.signInPassword = '';
                 return;
             }
             
             
            var userInfo = {"username": $scope.signInUsername, "password": $scope.signInPassword}
            console.log("Made it here!!!");
            //api?paramA=valueA&paramB=valueB
            var verifyUrl = "users?" + "username" + "=" + $scope.signInUsername + "&" + "password" + "=" + $scope.signInPassword;
            console.log(verifyUrl);
            console.log("made it here!>");
            $http.get(verifyUrl)
            .then(function(response) {
                console.log("DATA: " + response.data);
                if (response.data) {
                    console.log("Sassy frass");
                    var oldCookieString = document.cookie;
                    console.log("Login cookie:" + oldCookieString);
                    if (oldCookieString) {
                        console.log(oldCookieString);
                        window.location.replace("userPage.html");
                    }
                    else {
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
                        console.log(utcCompleteDate);
                        var stringDate = utcCompleteDate.toString();
                        var shortDate = stringDate.split(' ');
                        console.log(shortDate[0]);
                        var potentialCookie = "username=" + response.data + "; expires=" + shortDate[0] + ", " + shortDate[2] + " " + shortDate[1] + " " + shortDate[3] + " " + shortDate[4] + " UTC";
                        console.log(potentialCookie);
                        document.cookie = potentialCookie;
                        var newCookieString = document.cookie;
                        console.log("Cookie String: " + newCookieString);
                        window.location.replace("userPage.html");
                    }
                
                }
                if (!response.data) {
                    alert("The information you inserted was incorrect. Please try again.");
                }
            });
            $scope.signInUsername = '';
            $scope.signInPassword = '';
        };
    }
]);
