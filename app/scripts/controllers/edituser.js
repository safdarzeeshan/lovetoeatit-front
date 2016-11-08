'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:EdituserCtrl
 * @description
 * # EdituserCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
    .controller('EditUserCtrl', function ($scope, Auth, FoodBlogger, $window, $stateParams, $state) {

        $scope.loading= true;
        $scope.success = false;
        $scope.blogger_info ={};
        var updateRole;
        var username = $stateParams.username;


        Auth.$getUserUsername(username)
        .success(function( response ) {
            $scope.loading= false;
            console.log(response);
            $scope.user_to_edit = response;

            //check if user has blogger info
            FoodBlogger.$getNewFoodBlogger($scope.user_to_edit.username)
            .success(function( response ) {
                console.log(response);
                if (response.blogger_info_exists == false){
                    $scope.blogger_info_exists = false;
                }

                else{
                    $scope.blogger_info_exists = true;
                    $scope.blogger_info = response;
                }

            })
            .catch(function(error){
                console.log(error);
            });
        })
        .catch(function(error){
            $scope.loading= false;
            console.log(error);
        });


        $scope.createBloggerInfo = function(){

            //update role
            updateRole()

            if ($scope.user_to_edit.role == 'FoodBlogger'){
                //update role and blogger_info
                $scope.blogger_info.username = $scope.user_to_edit.username;
                console.log($scope.blogger_info);

                FoodBlogger.$createFoodBlogger($scope.blogger_info)
                .success(function(response){
                    $scope.blogger_info_update = 'Blogger Information Created';
                    console.log(response);
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        };

        $scope.updateBloggerInfo = function(){

            //update role
            updateRole()

            if ($scope.user_to_edit.role == 'FoodBlogger'){
                //update role and blogger_info
                $scope.blogger_info.username = $scope.user_to_edit.username;
                console.log($scope.blogger_info);

                FoodBlogger.$updateFoodBlogger($scope.blogger_info)
                .success(function(response){
                    $scope.blogger_info_update = 'Blogger Information Updated';
                    console.log(response);
                })
                .catch(function(error){
                    console.log(error);
                });
            }
        };

        updateRole = function(){
            var data = {
                'username':$scope.user_to_edit.username,
                'role':$scope.user_to_edit.role
            };

            Auth.$updateUserRole(data)
            .then(function( response ) {
                console.log(response.data);
                $scope.success = true;
                $scope.role_update = 'User Role Updated';
            })
            .catch(function(error){
                console.log(error);
            });
        }

        $scope.gotoAllUsers = function(){
            $state.go('user.allUsers');
        };
    }
);
