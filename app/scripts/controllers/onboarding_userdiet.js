'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:OnboardingCtrl
 * @description
 * # OnboardingCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('OnboardingUserDietCtrl',
    function ($scope, $localStorage, FoodBlogger, $state, Auth) {

        amplitude.logEvent('Onboarding - User diet form');
        $scope.onboarding_status = $localStorage.onboarding_status;
        $scope.user = {};

        FoodBlogger.$getDietTagsList()
        .success(function(response){
            $scope.diet_tags = response;

            Auth.$getUser()
            .success(function(response){
                $scope.user.first_name = response.first_name;
                $scope.user.last_name = response.last_name;
                $scope.user.email = response.email;

                for (var i in response.diet_tags){
                    for(var j in $scope.diet_tags){
                        if (response.diet_tags[i].name === $scope.diet_tags[j].name){
                            $scope.diet_tags[j].selected = 'Y'
                        }
                    }
                }

            }),function(error){
                console.log('cannot retrieve user information');
            };
        });


        $scope.submitUserForm = function(){
            //get selected diet_tags
            amplitude.logEvent('Onboarding - Clicked submit ')
            var d_ts = [];
            for(var i in $scope.diet_tags){
                if($scope.diet_tags[i].selected=='Y'){
                    d_ts.push(JSON.parse('{"name":"' + $scope.diet_tags[i].name.trim() + '"}'));
                }
            }
            $scope.user.diet_tags = d_ts

            //update user information
            Auth.$updateUser($scope.user)
            .success(function(response){
                $state.go('onboarding.howitworks');

            }),function(error){
                console.log('cannot update user information' + error);
            };
        };
    });