var app = angular.module('userInfoApp', [])
    .controller('userInfoCtrl', [
        '$scope', '$http',
        function($scope, $http) {
        
        $scope.longTerm = [];
        $scope.shortTerm = [];
        $scope.daily = [];
        
        var cookieString = document.cookie;
        var cookieSplitValue = cookieString.split('=');
        var username = cookieSplitValue[1];
        console.log(cookieSplitValue[1]);
        
        $scope.getCurrentGoals = function() {
            $http({
                method: "GET",
                url: '/getList/' + username,
            })
            .then(function(response) {
                console.log(response.data);
                console.log($scope.longTerm);
                angular.copy(response.data, $scope.longTerm);
            })
            , function errorCheck(response) {
                alert("There was a problem obtaining the list.");
            }
        }
        $scope.getCurrentGoals();
        
        $scope.addLongTerm = function() {
            console.log("made it here!!!");
            for(var i = 0; i < $scope.longTerm.length; ++i) {
                console.log("here!" + $scope.longTerm[i]);
                console.log("New Long term goal: " + $scope.newLongTerm);
                    if ($scope.longTerm[i] == $scope.newLongTerm) {
                        console.log("winkyFace");
                        alert("This goal has already been added to the list.");
                        return;
                    }
            }
            
            console.log("Long Term value: " + $scope.newLongTerm);
            var longTermObject = {"listItem" : $scope.newLongTerm};
            var longJsonString = JSON.stringify(longTermObject);
            console.log(longJsonString);
            console.log("made it into addLongTerm!");
            $http({
            method: "PUT",
            url: '/putList/' + username,
            data: longJsonString
            })
            .then(function(response) {
                console.log("DATA " + response.data);
                $scope.longTerm.push(response.data);
                console.log("LONGTERM ARRAY");
                console.log($scope.longTerm);
            })
            , function errorCheck(response) {
                alert("We were unable to add the item to the list.");
            } 
        };
        
        $scope.addShortTerm = function() {
            console.log("made it into addShortTerm!");
        };
        
        $scope.addDaily = function() {
            console.log("made it into addDaily!");
        };
        
        $scope.deleteCookie = function() {
            var cookieToDelete = document.cookie;
            var cookieSplit = cookieToDelete.split('=');
            console.log(cookieSplit[1]);
            var potentialDeleteCookie = "username=" + cookieSplit[1] + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            console.log(potentialDeleteCookie);
            document.cookie = "username=" + cookieSplit[1] + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            console.log()
            console.log(cookieToDelete);
            window.location.replace("http://18.216.163.75:8080");
        }
        
        $scope.deleteLongGoal = function(goalToDelete) {
            console.log("Made it into delete long goal!");
            console.log("Goal to delete" + goalToDelete);
            //var deleteGoalJson = JSON.stringify(goalToDelete);
            var deleteGoalObject = {"deleteGoal" : goalToDelete};
            console.log("deleteGoalObject"+ deleteGoalObject);
            //console.log("Delete JSON" + deleteGoalJson);
            $http({
                method: "PUT",
                url: '/putList/' + username,
                data: deleteGoalObject
            })
            .success(function(data) {
                console.log("Delete worked!");
            })
            , function errorCheck(response) {
                alert("There is a problem with deleting the goal.");
            }
        }
    }
    ]);