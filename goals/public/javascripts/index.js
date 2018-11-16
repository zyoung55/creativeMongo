var app = angular.module('myApp', [])
    .controller('myCtrl', ['$scope', '$http',
    function($scope, $http) {
         
     /*Checks to see if there is a cookie.*/
         if (document.cookie) {
             var tempCookie = document.cookie;
             window.location.replace("userPage.html");
         }
         
         /*Signs user in and sets cookie.*/
         $scope.submitSignIn = function() {
            if (!$scope.signInUsername || !$scope.signInPassword) {
                alert("You forgot to add some information. Please try again.");
                $scope.signInUsername = '';
                $scope.signInPassword = '';
                return;
            }
            
            var userInfo = {"username": $scope.signInUsername, "password": $scope.signInPassword}
            var verifyUrl = "users?" + "username" + "=" + $scope.signInUsername + "&" + "password" + "=" + $scope.signInPassword;
            
            $http.get(verifyUrl)
            .then(function(response) {
                if (response.data) {
                    var oldCookieString = document.cookie;
                    if (oldCookieString) {
                        window.location.replace("userPage.html");
                    }
                    else {
                        /*Create cookie */
                        var date = new Date();
                        var day = date.getDay();
                        var utcDate = date.getUTCDate();
                        var utcYear = date.getUTCFullYear(); 
                        var utcHour = date.getUTCHours(); 
                        var utcMinutes = date.getMinutes(); 
                        var utcMonth = date.getUTCMonth(); 
                        var utcSeconds = date.getUTCSeconds(); 
                        var utcMillisecond = date.getMilliseconds(); 
                        var nextUtcDay = utcDate + 1;
                        var utcCompleteDate = new Date(utcYear, utcMonth, nextUtcDay, utcHour, utcMinutes, utcSeconds, utcMillisecond);
                        var stringDate = utcCompleteDate.toString();
                        var shortDate = stringDate.split(' ');
                        var potentialCookie = "username=" + response.data + "; expires=" + shortDate[0] + ", " + shortDate[2] + " " + shortDate[1] + " " + shortDate[3] + " " + shortDate[4] + " UTC";
                        document.cookie = potentialCookie;
                        var newCookieString = document.cookie;
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
