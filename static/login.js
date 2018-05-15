var login_application = angular.module('login_app',['ngCookies'])

login_application.controller('login_controller',['$scope','$http','$cookies', function ($scope, $http, $cookies) {

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
                console.log('redirecting to home...')
                $cookies.put('email',email);
                window.location.href = '/home';
                //console.log($cookies.get('email'));
            }
            else if(response.data == 'failure - incorrect password'){
                console.log('Invalid credentials')
                //window.alert("Invalid credentials")
                angular.element(document.getElementById("password_alert")).append(angular.element('<div class="alert alert-danger alert-dismissible" style="height: 20px; width: 40%; margin-left: 27%; margin-right: 27%"> <a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Invalid Password</strong> Please enter a correct password.</div>'));
            }
            else if(response.data.indexOf('failure - user profile does not exists for')>=0){
                console.log('User does not exists')
                 angular.element(document.getElementById("password_alert")).append(angular.element('<div class="alert alert-info alert-dismissible" style="height: 20px; width: 40%; margin-left: 27%; margin-right: 27%"> <a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Invalid email</strong>  If new to mySquareMeal, please create an account.</div>'));
            }
        }, function (error) {
            console.log(error);
        });

        $scope.email = null;
        $scope.password = null;
    }
}]);

