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
    function ($scope, $localStorage, FoodBlogger, $state, Auth, ModalService) {

        amplitude.logEvent('Onboarding - User diet form');
        $scope.onboarding_status = $localStorage.onboarding_status;
        $scope.user = {};


        FoodBlogger.$getDietTagsList()
        .success(function(response){
            $scope.diet_tags = response;

            Auth.$getUserDietTags()
            .success(function(diet_tags){

                for (var i in diet_tags){
                    for(var j in $scope.diet_tags){
                        if (diet_tags[i].name === $scope.diet_tags[j].name){
                            $scope.diet_tags[j].selected = 'Y'
                        }
                    }
                }

            }),function(error){
                console.log('cannot retrieve user information');
            };
        });

        $scope.instagram_example = function(){
            ModalService.showModal({
                templateUrl: 'views/modal_instagram.html',
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


        $scope.submitUserForm = function(){
            //get selected diet_tags
            amplitude.logEvent('Onboarding - Clicked submit from user diet ')
            var d_ts = [];
            for(var i in $scope.diet_tags){
                if($scope.diet_tags[i].selected=='Y'){
                    d_ts.push(JSON.parse('{"name":"' + $scope.diet_tags[i].name.trim() + '"}'));
                }
            }
            $scope.user.diet_tags = d_ts

            //update user information
            Auth.$updateUserDietTags(d_ts)
            .success(function(response){
                $state.go('onboarding.howitworks');

            }),function(error){
                console.log('cannot update user information' + error);
            };
        };
    });