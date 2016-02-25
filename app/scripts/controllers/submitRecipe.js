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
    function ($scope, FoodBlogger, Upload) {

    $scope.recipe ={};
    $scope.success= false;
    $scope.showForm= false;
    $scope.processForm = function() {

        //get information from recipe scraping API
        FoodBlogger.$scrapeRecipe($scope.recipe.url)
        .success(function(response){
            $scope.showForm= true;
            $scope.recipe = response;

            //get list of collection tags
            FoodBlogger.$getCollectionTagsList()
            .then(function(response){
                $scope.collection_tags = response.data;
            });
        });
    };

    $scope.submitForm = function() {

        //get selected collection_tags
        var c_ts = [];
        for(var i in $scope.collection_tags){
            if($scope.collection_tags[i].selected=='Y'){
                c_ts.push(JSON.parse('{"name":"' + $scope.collection_tags[i].name.trim() + '"}'));
            }
        }

        $scope.recipe.collection_tags = c_ts
        // submit recipe
        FoodBlogger.$submitRecipe($scope.recipe)
        // FoodBlogger.$submitRecipeWithImage($scope.recipe)
        .success(function(response) {
            console.log(response);
            $scope.success= true;
            $scope.local_id = response.local_id;

        }), function(error){
            console.log('error' + error);
        };
    };

    $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
          url: 'http://localhost:8000/api/uploadimage/',
          data: {image: file, name: $scope.username},
        });

        // file.upload.then(function (response) {
        //   $timeout(function () {
        //     file.result = response.data;
        //   });
        // }, function (response) {
        //   if (response.status > 0)
        //     $scope.errorMsg = response.status + ': ' + response.data;
        // }, function (evt) {
        //   // Math.min is to fix IE which reports 200% sometimes
        //   file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        // });
    }
});

// adding the value name to each ingredient
// for(var i=0; i < $scope.recipe.collection_tags.length; i++){
//     $scope.recipe.collection_tags[i] = JSON.parse('{"name":"' + $scope.recipe.collection_tags[i].trim() + '"}');
//     console.log($scope.recipe.collection_tags[i]);
// }