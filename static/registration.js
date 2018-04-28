var registration_application = angular.module('registration_app',[])


registration_application.controller('registration_controller',['$scope','$http', function ($scope, $http) {

    console.log('inside registration controller');
    $scope.register_new_user = function () {
        console.log('testing register function');
    }
}]);

