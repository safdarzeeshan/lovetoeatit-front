'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:OnboardingCtrl
 * @description
 * # OnboardingCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('OnboardingUserCtrl',
    function ($scope, $localStorage, FoodBlogger, $state, Auth) {

        amplitude.logEvent('Onboarding - User info form');
        $scope.onboarding_status = $localStorage.onboarding_status;
        $scope.user = {};

        //popuate user form
        Auth.$getUser()
        .success(function(response){
            console.log(response.first_name)
            $scope.user.first_name = response.first_name;
            $scope.user.last_name = response.last_name;
            $scope.user.email = response.email;

        }),function(error){
            console.log('cannot retrieve user information');
        };


        $scope.submitUserForm = function(){
            amplitude.logEvent('Onboarding user info- Clicked sign up ')
            console.log($scope.user);
            //update user information
            Auth.$updateUser($scope.user)
            .success(function(response){
                $state.go('onboarding.userdiet');

            }),function(error){
                console.log('cannot update user information' + error);
            };
        };
    });