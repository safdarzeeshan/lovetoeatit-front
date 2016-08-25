'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:InstagramconnectCtrl
 * @description
 * # InstagramconnectCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('InstagramConnectCtrl', function ($localStorage, $scope, $stateParams, $http, $location, Auth, $state) {

    var igConnect,
    token,
    igInfo,
    data;

    igConnect = function(){
        //get  token
        $scope.location = $location.url();
        token = $location.hash().split('=')[1];
        //get user instagam information

        $http.jsonp('https://api.instagram.com/v1/users/self/?access_token=' + token + '&callback=JSON_CALLBACK')
        .then(function(response) {
            console.log(response.data.data);
            igInfo = response.data.data;
            //update user's profile with their Instagram information
            data = {ig_username:igInfo.username,
                    ig_id: igInfo.id,
                    ig_profile_image_url:igInfo.profile_picture,
                    ig_token:token
                    };

            if ($localStorage.foodBloggerStatus === 'FoodBloggerWaiting'){
                console.log('food blogger in waiting')
                data.role=$localStorage.foodBloggerStatus;
            }

            console.log(data)
            Auth.$updateUser(data)
            .then(function(data){

                console.log(data)
                $localStorage.role = data.data.role;
                $localStorage.onboarding_status = data.data.onboarding_status;

                if(Auth.$onboardingStatus()==='New'|| Auth.$onboardingStatus()==='InProgress'){

                    //send user success email
                    Auth.$userSuccessEmail()
                    .success(function(){
                        console.log('email sent to user');
                    }),function(error){
                        console.log(error);
                    };
                    $state.transitionTo('onboarding.userdiet');
                }

                else{
                    $state.go('user.profile');
                }

            },function(data){
            // error case
                $scope.error = data;
            });
        });
    };

    igConnect();
  });