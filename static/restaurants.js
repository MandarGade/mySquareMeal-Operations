angular.module('restaurants_app', ['ngCookies'])
    .controller('restaurants_app_controller',[ '$scope', '$http','$cookies',function ($scope, $http, $cookies) {
        console.log('inside restaurants controller')
        var latitude = $cookies.get('latitude');
        var longitude = $cookies.get('longitude');
        console.log(latitude)

        $http({
                method: 'POST',
                url: 'http://6fda1099.ngrok.io/recommendation',
                headers: { 'Content-Type': 'application/json' },
                data: {'latitude':latitude, 'longitude':longitude}
            }).then(function (response) {
                if(response.status == 200){
                    response_data = JSON.stringify(response);
                    console.log(JSON.parse(response_data).data);
                    $scope.restaurants_data = JSON.parse(response_data).data
                }
                else{
                  console.log('can not display result...')
                }
            }, function (error) {
                console.log(error);
            });

}]);