var profile_application = angular.module('profile_app',['ngCookies'])


profile_application.controller('profile_controller',['$scope','$http','$cookies', function ($scope, $http, $cookies) {

    console.log('inside profile controller');
    $scope.input_list = /^[\w,\s]*$/;
    var email = $cookies.get('email');
    console.log(email)


    $http({

        method: 'POST',
        url: '/get_profile_data',
        headers: { 'Content-Type': 'application/json' },
        data: {'email':email}
    }).then(function (response) {


        if(response.status == 200){
            console.log(response.data['allergies'].length);
            for(var i=0; i<response.data['allergies'].length; i++){
                var element_str = '<div style="margin-top: 2px"><u><b><font size="4">' +
                    response.data['allergies'][i]
                    +'</font></b></u></div>';
                angular.element(document.getElementById('allergy_list')).append(element_str);
            }
            $scope.result_array = response.data['allergies'];
        }
        else{
            console.log('Can get profile data')
        }
    }, function (error) {
        console.log(error);
    });


    $scope.add_allergies = function (allergies) {
        console.log('testing addition function');
        console.log(allergies);

        $http({

            method: 'POST',
            url: '/add_to_profile',
            headers: { 'Content-Type': 'application/json' },
            data: {'email':email,'allergies':allergies}
        }).then(function (response) {
            //console.log(response.data)
            if(response.data == 'success'){
                console.log('success');
                location.reload();
            }
            else{
                angular.element(document.getElementById("allergy_list")).append(angular.element('<div class="alert alert-info alert-dismissible" style="height: 15px; width: 50%; margin-left: 27%; margin-right: 27%; margin-top: 5px"> <a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Can not update profile !!! </strong>  Appologies for inconvenience !</div>'));
                console.log('Can not update profile')
            }
        }, function (error) {
            console.log(error);
        });

    }

    $scope.remove_allergies = function (allergies) {
        console.log('testing remove function');
        console.log(allergies);

        $http({

            method: 'POST',
            url: '/remove_from_profile',
            headers: { 'Content-Type': 'application/json' },
            data: {'email':email,'allergies':allergies}
        }).then(function (response) {
            //console.log(response.data)
            if(response.data == 'success'){
                console.log('success');
                location.reload();
            }
            else{
                angular.element(document.getElementById("allergy_list")).append(angular.element('<div class="alert alert-info alert-dismissible" style="height: 15px; width: 50%; margin-left: 27%; margin-right: 27%; margin-top: 5px"> <a class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Can not update profile !!! </strong>  Appologies for inconvenience !</div>'));
                console.log('Can not update profile')
            }
        }, function (error) {
            console.log(error);
        });
    }


}]);

