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

            // for(var i in $scope.recipes){
            //     if($scope.recipes[i].ig_media_associated=='true'){
            //         console.log('it is true');
            //     }

            //     if($scope.recipes[i].ig_media_associated=='false'){
            //         console.log('it is false');
            //     }
            // }
            // $scope.recipes[0].ig_media_associated = false;

        });
    }
);