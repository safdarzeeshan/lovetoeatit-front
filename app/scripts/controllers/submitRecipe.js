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
    function ($scope, $state, FoodBlogger, Upload, $cookies, ModalService, $element) {

    amplitude.logEvent('Submit Recipe page');
    $scope.recipe ={};
    $scope.tempImage ={};
    $scope.success= false;
    $scope.showForm= false;
    $scope.fromImageUrl= false;
    $scope.fromImageLocal= false;
    $scope.noRecipeInfo= false;
    $scope.imageUploading= false;
    $scope.loading= false;
    $scope.submittingRecipe= false;
    $scope.limit = 3;
    var checked;

    // $scope.success= true;
    // $scope.showForm= true;

    $scope.processForm = function() {

        amplitude.logEvent('Clicked to process url');
        $scope.loading= true;
        //get information from recipe scraping API
        FoodBlogger.$scrapeRecipe($scope.recipe.url)
        .success(function(response){

            $scope.loading= false;
            $scope.showForm= true;
            $scope.fromImageUrl= true;
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
        }).catch(function(error){
            console.log(error);
            $scope.loading= false;
            $scope.showForm= true;
            $scope.fromImageUrl= true;
            // $scope.noRecipeInfo= true;
            amplitude.logEvent('error');
            console.log(error);
            $scope.submittingRecipe= false;
            ModalService.showModal({
                templateUrl: 'views/modal_error.html',
                controller: "ModalCtrl",
                inputs: {
                    message: "We weren't able to get any recipe information. You'll have to enter in manually. Sorry :("
                }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function() {
                });
            });
            amplitude.logEvent('error');
        });
    };

    $scope.submitRecipeForm = function() {

        $scope.submittingRecipe= true;

        console.log(Upload.dataUrltoBlob($scope.tempImage.croppedDataUrl));

        amplitude.logEvent('Clicked Submit Recipe Button');

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
        .success(function(response){
            $scope.submittingRecipe =false;
            $scope.success= true;
            $scope.local_id = response.local_id;

        }).catch(function(error){
            console.log(error);
            $scope.submittingRecipe= false;
            ModalService.showModal({
                templateUrl: 'views/modal_error.html',
                controller: "ModalCtrl",
                inputs: {
                    message: 'There was an error. Please double check the recipe'
                }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function() {
                });
            });
            amplitude.logEvent('error');
        });
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
            console.log(response)
            $scope.tempImage.picUrlFile=response;
            $scope.tempImage.fileName = response.substring(response.lastIndexOf('/')+1);

        }).catch(function(error){
            $scope.imageUploading= false;
            ModalService.showModal({
                templateUrl: 'views/modal_error.html',
                controller: "ModalCtrl",
                inputs: {
                    message: 'Unable to get image from URL. Please check the URL.'
                }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function() {
                });
            });
            amplitude.logEvent(' image refresh error');
        });
    };

    $scope.deleteIngredient = function($index, recipe) {
        recipe.ingredients.splice($index, 1);
        amplitude.logEvent('Ingredient deleted');
    };

    $scope.addIngredient = function() {
        if ($scope.recipe.ingredients == undefined){
            $scope.recipe.ingredients= [];
        }
        $scope.recipe.ingredients.push({});
        amplitude.logEvent('Ingredient added');
    };

    $scope.checkChangedTag = function() {

        checked = $scope.collection_tags.filter(function( tag ) {
            return tag.selected === 'Y';
        });
        $scope.cl = checked.length;
    };

    $scope.gotoSubmittedRecipes = function() {
        $state.go('user.submittedRecipes');
        amplitude.logEvent('Clicked Submitted recipes');
    };
});