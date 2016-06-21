'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:AllRecipesCtrl
 * @description
 * # AllRecipesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('AllRecipesCtrl',
    function ($scope, $window, $state, Recipe, Likes, FoodBlogger) {

        $scope.limit = 40;
        $scope.loading= true;
        $scope.tags = ['Mains', 'Desserts'];
        // $scope.tagFilter= {{collection_tags:{name:''}};

        $scope.d_ts=[];
        $scope.c_ts=[];

        $scope.checkChangedDietTag = function() {
            $scope.d_ts = [];
            for(var i in $scope.diet_tags){
                if($scope.diet_tags[i].selected=='Y'){
                    $scope.d_ts.push($scope.diet_tags[i].name);
                }
            }
        };

        $scope.checkChangedCollectionTag = function() {
            $scope.c_ts = [];
            for(var i in $scope.collection_tags){
                if($scope.collection_tags[i].selected=='Y'){
                    $scope.c_ts.push($scope.collection_tags[i].name);
                }
            }
        };

        FoodBlogger.$getDietTagsList()
        .then(function(response){
            $scope.diet_tags = response.data;
        });

        FoodBlogger.$getCollectionTagsList()
        .then(function(response){
            $scope.collection_tags = response.data;
        });

        amplitude.logEvent('Discover Page');
        //get all recipes and populate scope
        Recipe.$getAllRecipes()
        .then(function( response ) {
            $scope.recipes = response.data;
            $scope.loading= false;

        })
        .catch(function(error){
            console.log(error);
        });

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});
            var recipeProperties = {
                'id': id,
            };
            amplitude.logEvent('Clicked recipe details', recipeProperties);
        };

        $scope.likeClick = function($index, recipe_local_id){
            amplitude.logEvent('Recipe thumbnail like clicked ');

            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){

                if (response.data.has_user_liked === true){
                    $scope.recipes[$index].has_user_liked = true;
                }

                if (response.data.has_user_liked === false){
                    $scope.recipes[$index].has_user_liked = false;
                }

                $scope.recipes[$index].no_of_likes = response.data.no_of_likes;
            });

        };
    }
)

angular.module('loveToEatItFrontEndApp')
.filter('dietFilter',function () {

    return function(recipes, d_ts){

        if (d_ts.length == 0){
            return recipes;
        }

        var filteredRecipes = [];

        angular.forEach(recipes, function(recipe, key){
            angular.forEach(recipe.diet_tags, function(d_t, key){
                if (d_ts.indexOf(d_t.name) !=-1 && filteredRecipes.indexOf(recipe) ==-1){
                    filteredRecipes.push(recipe);
                }
            });
        });
        return filteredRecipes;
    };

});

angular.module('loveToEatItFrontEndApp')
.filter('collectionFilter',function () {

    return function(recipes, c_ts){

        if (c_ts.length == 0){
            return recipes;
        }

        var filteredRecipes = [];

        angular.forEach(recipes, function(recipe, key){
            angular.forEach(recipe.collection_tags, function(c_t, key){
                if (c_ts.indexOf(c_t.name) !=-1 && filteredRecipes.indexOf(recipe) ==-1){
                    filteredRecipes.push(recipe);
                }
            });
        });
        return filteredRecipes;
    };

});