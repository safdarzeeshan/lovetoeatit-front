'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:OnboardingCtrl
 * @description
 * # OnboardingCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('OnboardingCtrl',
    function ($scope, $localStorage, FoodBlogger, $state, Auth) {

        $scope.onboarding_status = $localStorage.onboarding_status;
        $scope.user = {};

        FoodBlogger.$getDietTagsList()
        .success(function(response){
            $scope.diet_tags = response;

            FoodBlogger.$getCategoryTagsList()
            .success(function(response){
                $scope.category_tags = response;
                //popuate user form
                Auth.$getUser()
                .success(function(response){
                    console.log(response.first_name)
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

                    for (var i in response.category_tags){
                        for(var j in $scope.category_tags){
                            if (response.category_tags[i].name === $scope.category_tags[j].name){
                            $scope.category_tags[j].selected = 'Y'
                            }
                        }
                    }

                }),function(error){
                    console.log('cannot retrieve user information');
                };
            });
        });

        $scope.submitUserForm = function(){
            //get selected diet_tags
            var d_ts = [];
            for(var i in $scope.diet_tags){
                if($scope.diet_tags[i].selected=='Y'){
                    d_ts.push(JSON.parse('{"name":"' + $scope.diet_tags[i].name.trim() + '"}'));
                }
            }
            $scope.user.diet_tags = d_ts

            //get selected category_tags
            var c_ts = [];
            for(var i in $scope.category_tags){
                if($scope.category_tags[i].selected=='Y'){
                    c_ts.push(JSON.parse('{"name":"' + $scope.category_tags[i].name.trim() + '"}'));
                }
            }
            $scope.user.category_tags = c_ts
            //update user information
            Auth.$updateUser($scope.user)
            .success(function(response){
                $state.go('howitworks');

            }),function(error){
                console.log('cannot update user information' + error);
            };
        };
    });