'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:InstagramconnectCtrl
 * @description
 * # InstagramconnectCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('InstagramConnectCtrl', function ($scope, $stateParams, $http, $location, Auth, $state) {

    var igConnect,
    token,
    igInfo,
    data;

    igConnect = function(){
        console.log('we are HHERRRE');
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

            Auth.$updateUser(data)
            .then(function(data){

                if(Auth.$onboardingStatus()==='New'|| Auth.$onboardingStatus()==='InProgress'){
                    $state.transitionTo('onboarding.instagram_connect');
                    event.preventDefault();
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
