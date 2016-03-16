'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:SearchRecipeCtrl
 * @description
 * # SearchRecipeCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('SearchRecipeCtrl',
    function ($scope, $stateParams, $state, Recipe) {

        var searchTerm = $stateParams.q;

        console.log(searchTerm);
        Recipe.$getRecipeSearch(searchTerm)
        .then(function( response ) {
            console.log(response.data);
            $scope.recipes = response.data;
        });

        $scope.getRecipe = function(id){
            console.log(id)
            $state.go('user.recipe' , { 'id': id});
        };
    }
);