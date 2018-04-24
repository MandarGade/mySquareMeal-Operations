var login_application = angular.module('login_app',[])

login_application.controller('login_controller',['$scope','$http', function ($scope, $http) {

    console.log('inside login controller')
    
    $scope.verification = function (email, password) {
        console.log(email)
        console.log(password)
        console.log('logging in with '+email);

        $http({

            method: 'POST',
            url: '/verification',
            headers: { 'Content-Type': 'application/json' },
            data: {'email':email, 'password':password}
        }).then(function (response) {
            console.log(response.data)
            if(response.data == 'success'){
                window.location.href = '/home'
            }
            else if(response.data == 'failure'){
                console.log('Invalid credentials')
            }
        }, function (error) {
            console.log(error);
        });

        $scope.email = null;
        $scope.password = null;
    }
}]);

