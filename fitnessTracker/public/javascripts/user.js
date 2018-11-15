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
                //window.location.replace("userPage.html");
            }
        }, function errorCheck(response) {
            alert("Somebody has already signed up with that username. Please try a different input.");
        })
        $scope.signUpUsername = '';
        $scope.signUpPassword = '';
        $scope.signUpConfirmPassword = '';
    }
})