var app = angular.module('userInfoApp', [])
    .controller('userInfoCtrl', [
        '$scope', '$http',
        function($scope, $http) {
        
        $scope.longTerm = [];
        $scope.shortTerm = [];
        $scope.daily = [];
        
        /*Obtains the username associated with the cookie. */
        var cookieString = document.cookie;
        var cookieSplitValue = cookieString.split('=');
        var username = cookieSplitValue[1];
        
        /*Get the current goals for the user from the database. */
        $scope.getCurrentGoals = function() {
            $http({
                method: "GET",
                url: '/getList/' + username,
            })
            .then(function(response) {
                angular.copy(response.data, $scope.longTerm);
            })
            , function errorCheck(response) {
                alert("There was a problem obtaining the list.");
            }
        }
        $scope.getCurrentGoals();
        
        /* Adds a new goal. */
        $scope.addLongTerm = function() {
            if ($scope.newLongTerm == '') {
                alert("You seem to have forgotten to add a goal. Please try again.");
            }
            for(var i = 0; i < $scope.longTerm.length; ++i) {
                    if ($scope.longTerm[i] == $scope.newLongTerm) {
                        alert("This goal has already been added to the list.");
                        return;
                    }
            }
            var longTermObject = {"listItem" : $scope.newLongTerm};
            var longJsonString = JSON.stringify(longTermObject);
            $http({
            method: "PUT",
            url: '/putList/' + username,
            data: longJsonString
            })
            .then(function(response) {
                $scope.longTerm.push(response.data);
            })
            , function errorCheck(response) {
                alert("We were unable to add the item to the list.");
            } 
            $scope.newLongTerm = '';
        };
        
        /*Deletes cookie and logs the user out. */
        $scope.logout = function() {
            var cookieToDelete = document.cookie;
            var cookieSplit = cookieToDelete.split('=');
            var potentialDeleteCookie = "username=" + cookieSplit[1] + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            document.cookie = "username=" + cookieSplit[1] + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.replace("http://18.216.163.75:8080");
        }
        
        /*Deletes a goal from local array and database. */
        $scope.deleteLongGoal = function(goalToDelete) {
            var deleteGoalObject = {"deleteGoal" : goalToDelete};
            $http({
                method: "PUT",
                url: '/putList/' + username,
                data: deleteGoalObject
            })
            .then(function(response) {
                for (var i = 0; i < $scope.longTerm.length; ++i) {
                    if ($scope.longTerm[i] == goalToDelete) {
                        $scope.longTerm.splice(i, 1);
                        return;
                    }
                }
            })
            , function errorCheck(response) {
                alert("Oops! There was a problem with deleting the goal.");
            }
        }
    }
    ]);