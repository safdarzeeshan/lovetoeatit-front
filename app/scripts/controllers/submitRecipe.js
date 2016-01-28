'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:SubmitRecipeCtrl
 * @description
 * # SubmitRecipeCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('SubmitRecipeCtrl',
    function ($scope, Recipe) {

    $scope.recipe = {};
    $scope.success= false;
    $scope.processForm = function() {

        console.log($scope.recipe.ingredients);

        //adding the value name to each ingredient
        for(var i=0; i < $scope.recipe.ingredients.length; i++){
            $scope.recipe.ingredients[i] = JSON.parse('{"name":"' + $scope.recipe.ingredients[i].trim() + '"}');
            console.log($scope.recipe.ingredients[i]);
        }

        Recipe.$submitRecipe($scope.recipe)
        .success(function(response) {
            console.log(response);
            $scope.success= true;
            $scope.local_id = response.local_id;

        }), function(error){
            console.log('error' + error);
        };
    };

});