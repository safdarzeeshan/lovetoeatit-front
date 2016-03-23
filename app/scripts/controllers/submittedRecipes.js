'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:SubmittedRecipesCtrl
 * @description
 * # SubmittedRecipesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('SubmittedRecipesCtrl',
    function ($scope, $window, $state,  FoodBlogger) {

        amplitude.logEvent('Submitted recipes page');
        //get likes and populate scope
        FoodBlogger.$getSubmittedRecipes()
        .then(function( response ) {
            $scope.recipes = response.data;
        });

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});
            var recipeProperties = {
                'id': id,
            };
            amplitude.logEvent('Clicked recipe details', recipeProperties);
        };
    }
);