'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:EditRecipeCtrl
 * @description
 * # EditRecipeCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('EditRecipeCtrl',
    function ($scope, FoodBlogger, Recipe) {

    $scope.recipe ={};
    $scope.success= false;
    $scope.showForm= false;
    var current_food_blogger ={}
    var collection_tags ={}

    $scope.processForm = function() {

        //get recipe information from database
        Recipe.$getRecipe($scope.recipe.local_id)
        .then(function( response ) {

            //populate form with recipe information
            $scope.recipe.url = response.data.url;
            $scope.recipe.image_url = response.data.image_url;
            $scope.recipe.name = response.data.name;
            $scope.recipe.snippet = response.data.snippet;
            $scope.recipe.time = response.data.time;
            $scope.recipe.serving_size = response.data.serving_size;
            $scope.recipe.ingredients = response.data.ingredients;
            collection_tags = response.data.collection_tags;
            $scope.showForm = true;
            current_food_blogger = response.data.food_blogger;

            //get list of food bloggers
            FoodBlogger.$getFoodBloggersList()
            .then(function(response){
                $scope.food_blogger_list = response.data;
                $scope.recipe.food_blogger = current_food_blogger.id.toString();
            });

            //get list of collection tags
            FoodBlogger.$getCollectionTagsList()
            .then(function(response){
                $scope.collection_tags = response.data;

                //check the collection ags for this recips
                for (var i in collection_tags){
                    console.log(collection_tags[i].name);
                    for(var j in $scope.collection_tags){
                        if (collection_tags[i].name === $scope.collection_tags[j].name){
                        $scope.collection_tags[j].selected = 'Y'
                        }
                    }
                }
            });
        });
    };

    $scope.scrapeForm = function() {
        //get recipe information from database
        FoodBlogger.$scrapeRecipe($scope.recipe.url)
        .success(function(response){
            $scope.recipe.url = response.url;
            $scope.recipe.image_url = response.image_url;
            $scope.recipe.name = response.name;
            $scope.recipe.snippet = response.snippet;
            $scope.recipe.time = response.time;
            $scope.recipe.serving_size = response.serving_size;
            $scope.recipe.ingredients = response.ingredients;
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
        FoodBlogger.$editRecipe($scope.recipe.local_id, $scope.recipe)
        .success(function(response) {
            $scope.success= true;
            $scope.local_id = response.local_id;

        }), function(error){
            console.log('error' + error);
        };
    };

});