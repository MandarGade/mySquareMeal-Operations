var welcome = angular.module('welcome',['ngCookies'])

welcome.controller('welcome_controller',['$scope','$http','$cookies', function ($scope, $http, $cookies) {

    console.log('inside welcome controller')
    $cookies.put('email','');
    location.reload();
    $scope.window_redirect = function(){
        window.location="/login.html";
    }
}]);