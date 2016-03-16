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
    function ($scope, FoodBlogger, Upload, $cookies) {

    $scope.recipe ={};
    $scope.tempImage ={};
    $scope.success= false;
    $scope.showForm= false;
    $scope.fromImageUrl= false;
    $scope.fromImageLocal= false;
    var uploadrecipe;
    $scope.processForm = function(croppedDataUrl) {

        //get information from recipe scraping API
        FoodBlogger.$scrapeRecipe($scope.recipe.url)
        .success(function(response){
            $scope.showForm= true;
            $scope.fromImageUrl= true;
            $scope.recipe = response;

            //get image from url
            FoodBlogger.$getTempImageUrl($scope.recipe.image_url)
            .success(function(response){
                console.log(response);
                $scope.tempImage.picUrlFile=response;
                $scope.tempImage.fileName = response.substring(response.lastIndexOf('/')+1);
            });

            //get list of tags
            FoodBlogger.$getCollectionTagsList()
            .then(function(response){
                $scope.collection_tags = response.data;
            });

            FoodBlogger.$getDietTagsList()
            .then(function(response){
                $scope.diet_tags = response.data;
            });

            FoodBlogger.$getCategoryTagsList()
            .then(function(response){
                $scope.category_tags = response.data;
            });
        });
    };

    $scope.submitRecipeForm = function() {

        //validate that image has been added
        console.log($scope.tempImage.croppedDataUrl);

        //get selected collection_tags
        var c_ts = [];
        for(var i in $scope.collection_tags){
            if($scope.collection_tags[i].selected=='Y'){
                c_ts.push(JSON.parse('{"name":"' + $scope.collection_tags[i].name.trim() + '"}'));
            }
        }
        $scope.recipe.collection_tags = c_ts

        var d_ts = [];
        for(var i in $scope.diet_tags){
            if($scope.diet_tags[i].selected=='Y'){
                d_ts.push(JSON.parse('{"name":"' + $scope.diet_tags[i].name.trim() + '"}'));
            }
        }
        $scope.recipe.diet_tags = d_ts

        var cat_ts = [];
        for(var i in $scope.category_tags){
            if($scope.category_tags[i].selected=='Y'){
                cat_ts.push(JSON.parse('{"name":"' + $scope.category_tags[i].name.trim() + '"}'));
            }
        }
        $scope.recipe.category_tags = cat_ts

        //submit recipe
        FoodBlogger.$submitRecipeWithImage(angular.toJson($scope.recipe), Upload.dataUrltoBlob($scope.tempImage.croppedDataUrl), $scope.tempImage.fileName )
        .success(function(response) {
            console.log(response);
            $scope.success= true;
            $scope.local_id = response.local_id;

        }), function(error){
            console.log('error' + error);
        };
    };

    $scope.uploadPic = function(croppedDataUrl) {
        console.log($scope.test.input);
        console.log($scope.croppedDataUrl);
        console.log('here');
        Upload.upload({
            url: 'http://localhost:8000/api/uploadimage/',
            data: {image: Upload.dataUrltoBlob(croppedDataUrl)},
        });
    };

    $scope.uploadFromLocal= function(){
        $scope.fromImageUrl= false;
        $scope.fromImageLocal= true;
    };

    $scope.refreshImageUrl = function(imageUrl){
        FoodBlogger.$getTempImageUrl(imageUrl)
        .success(function(response){
            console.log(response);
            $scope.tempImage.picUrlFile=response;
            $scope.tempImage.fileName = response.substring(response.lastIndexOf('/')+1);
        });
    };

    $scope.deleteIngredient = function($index, recipe) {
        recipe.ingredients.splice($index, 1);
    };
});