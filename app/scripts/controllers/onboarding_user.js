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
    function ($scope, $localStorage, FoodBlogger, $state, Auth, ModalService) {

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
            amplitude.logEvent('Onboarding user info - Clicked sign up ')
            //update user information
            if ($localStorage.foodBloggerStatus === 'FoodBloggerWaiting'){
                $scope.user.role = 'FoodBloggerWaiting';
            }

            Auth.$updateUser($scope.user)
            .success(function(response){
                Auth.$userSuccessEmail()
                .success(function(){
                    console.log('email sent to user');
                }),function(error){
                    console.log(error)
                };

                $state.go('onboarding.userdiet');

            }),function(error){
                console.log('cannot update user information' + error);
            };
        };

        $scope.termsOfUse = function(){
            ModalService.showModal({
                templateUrl: 'views/modal_termsofuse.html',
                controller: "ModalCtrl",
                inputs: {
                message: "These are our terms of use"
            }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function() {
                });
            });

        };
    });