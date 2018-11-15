var app = angular.module('myApp', [])
    .controller('myCtrl', ['$scope', '$http',
    function($scope, $http) {
    
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
                    //window.location.replace("userPage.html");
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
