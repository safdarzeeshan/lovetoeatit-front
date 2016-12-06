'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:AlltagrecipesCtrl
 * @description
 * # AlltagrecipesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('AllTagRecipesCtrl', function ($scope, $rootScope, $stateParams, Auth, Recipe, $state) {

    var tag = $stateParams.tag;
    var name = $stateParams.name;

    $rootScope.title = 'Find ' + $stateParams.name + ' Recipes';

    $scope.loading= true;
    $scope.limit = 40;

    Recipe.$getTagRecipes(tag, name)
    .then(function( response ) {
        $scope.loading= false;
        $scope.tag = name;
        $scope.recipes = response.data;
        $rootScope.shareImage = response.data[0].image_url;
    });


    $scope.likeClick = function($index, recipe_local_id){
        amplitude.logEvent('Recipe thumbnail like clicked ');

        Likes.$likeRecipe(recipe_local_id)
        .then(function(response){

            if (response.data.has_user_liked === true){
                $scope.recipes[$index].has_user_liked = true;
            }

            if (response.data.has_user_liked === false){
                $scope.recipes[$index].has_user_liked = false;
            }

            $scope.recipes[$index].no_of_likes = response.data.no_of_likes;
        });

    };
  });
