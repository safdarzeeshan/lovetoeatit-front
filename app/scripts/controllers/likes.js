'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:MainCtrl
 * @description
 * # LikesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('LikesCtrl',
    function ($scope, $window, $rootScope, $state,  Likes, $http, $cookies) {

        $scope.limit = 40;
        $scope.loading= true;
        amplitude.logEvent('Likes page');
        $scope.no_likes = false;

        $rootScope.title ="Your recipe likes";
        $rootScope.shareDescription = 'Keep track of your favourite recipes from food bloggers on Instagram! Sign-up, like a picture with our link in it & we’ll hook you with recipe info.';


        //get likes and populate scope
        Likes.$getLikes()
        .then(function( response ) {
            $scope.loading= false;
            $scope.likes = response.data;

            if($scope.likes.length == 0){
                $scope.no_likes = true;
            }
        })
        .catch(function(error){
            console.log(error);
        });

        $scope.likeClick = function($index, recipe_local_id){
            amplitude.logEvent('Recipe thumbnail like clicked ');

            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){

                if (response.data.has_user_liked === true){
                    $scope.likes[$index].has_user_liked = true;
                }

                if (response.data.has_user_liked === false){
                    $scope.likes[$index].has_user_liked = false;
                }

                $scope.likes[$index].no_of_likes = response.data.no_of_likes;
            });
        };
    }
);