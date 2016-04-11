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
    function ($scope, $state, FoodBlogger, Upload, $cookies) {

    amplitude.logEvent('Submit Recipe page');
    $scope.recipe ={};
    $scope.tempImage ={};
    $scope.success= false;
    $scope.showForm= false;
    $scope.fromImageUrl= false;
    $scope.fromImageLocal= false;
    $scope.noRecipeInfo= false;
    $scope.imageUploading= false;

    // $scope.success= true;
    // $scope.showForm= true;

    $scope.processForm = function() {

        amplitude.logEvent('Clicked to process url');
        //get information from recipe scraping API
        FoodBlogger.$scrapeRecipe($scope.recipe.url)
        .success(function(response){

            $scope.showForm= true;
            $scope.fromImageUrl= true;

            if (response.error === 'no information available'){
                $scope.noRecipeInfo= true;
                amplitude.logEvent('no information available');
            }

            else {
                $scope.recipe = response;
                //get image from url
                console.log($scope.recipe.image_url);
                if ($scope.recipe.image_url !== null){
                    $scope.imageUploading= true;
                    FoodBlogger.$getTempImageUrl($scope.recipe.image_url)
                    .success(function(response){
                        $scope.imageUploading= false;
                        console.log(response);
                        $scope.tempImage.picUrlFile=response;
                        $scope.tempImage.fileName = response.substring(response.lastIndexOf('/')+1);
                    });
                }
            }

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
        })
        .catch(function(error){
            console.log(error);
            amplitude.logEvent('error');
        });
    };

    $scope.submitRecipeForm = function() {

        amplitude.logEvent('Clicked Submit Recipe Button');
        //validate that image has been added
        // console.log($scope.tempImage.croppedDataUrl);

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
            $scope.success= true;
            $scope.local_id = response.local_id;

        }), function(error){
            console.log('there is an error');
        };
    };

    $scope.uploadPic = function(croppedDataUrl) {
        Upload.upload({
            url: 'http://localhost:8000/api/uploadimage/',
            data: {image: Upload.dataUrltoBlob(croppedDataUrl)},
        });
    };

    $scope.uploadFromLocal= function(){
        amplitude.logEvent('Clicked upload from local');
        $scope.fromImageUrl= false;
        $scope.fromImageLocal= true;
    };

    $scope.refreshImageUrl = function(imageUrl){
        amplitude.logEvent('Image URL refreshed');

        $scope.imageUploading= true;
        FoodBlogger.$getTempImageUrl(imageUrl)
        .success(function(response){
            $scope.imageUploading= false;
            $scope.tempImage.picUrlFile=response;
            $scope.tempImage.fileName = response.substring(response.lastIndexOf('/')+1);
        });
    };

    $scope.deleteIngredient = function($index, recipe) {
        recipe.ingredients.splice($index, 1);
        amplitude.logEvent('Ingredient deleted');
    };

    $scope.addIngredient = function() {
        // var newIngredient = $scope.recipe.ingredients.length+1;
        $scope.recipe.ingredients.push({});
        amplitude.logEvent('Ingredient added');
    };

    $scope.gotoSubmittedRecipes = function() {
        $state.go('user.submittedRecipes');
        amplitude.logEvent('Clicked Submitted recipes');
    };
});