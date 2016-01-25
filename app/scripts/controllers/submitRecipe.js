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
    $scope.processForm = function() {
        Recipe.$submitRecipe($scope.recipe)
        .success(function() {
            $scope.message='Success';

        }), function(error){
            console.log('error' + error);
        };

        // console.log($scope.recipe);
    };

});