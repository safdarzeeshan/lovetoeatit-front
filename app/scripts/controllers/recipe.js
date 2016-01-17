'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:RecipeCtrl
 * @description
 * # RecipeCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('RecipeCtrl',
    function ($scope, $window, $stateParams, Recipe) {

        var id = $stateParams.id;
        console.log('recipe id is ' + id );
        Recipe.$getRecipe(id)
        .then(function( response ) {
            console.log('users data: ', response.data );
            $scope.recipe = response.data;
        });
    }
);