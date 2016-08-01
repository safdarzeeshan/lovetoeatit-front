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

        $scope.diet_ts=[];
        $scope.collection_ts=[];
        $scope.category_ts=[];

        $scope.checkChangedDietTag = function() {
            $scope.diet_ts = [];
            for(var i in $scope.diet_tags){
                if($scope.diet_tags[i].selected=='Y'){
                    $scope.diet_ts.push($scope.diet_tags[i].name);
                }
            }
        };

        $scope.checkChangedCollectionTag = function() {
            $scope.collection_ts = [];
            for(var i in $scope.collection_tags){
                if($scope.collection_tags[i].selected=='Y'){
                    $scope.collection_ts.push($scope.collection_tags[i].name);
                }
            }
            console.log($scope.collection_ts);
        };

        $scope.checkChangedCategoryTag = function() {
            $scope.category_ts = [];
            for(var i in $scope.category_tags){
                if($scope.category_tags[i].selected=='Y'){
                    $scope.category_ts.push($scope.category_tags[i].name);
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

        FoodBlogger.$getCategoryTagsList()
        .then(function(response){
            $scope.category_tags = response.data;
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

    return function(recipes, diet_ts){

        if (diet_ts.length == 0){
            return recipes;
        }

        var filteredRecipes = [];

        angular.forEach(recipes, function(recipe, key){
            angular.forEach(recipe.diet_tags, function(diet_t, key){
                if (diet_ts.indexOf(diet_t.name) !=-1 && filteredRecipes.indexOf(recipe) ==-1){
                    filteredRecipes.push(recipe);
                }
            });
        });
        return filteredRecipes;
    };
});

angular.module('loveToEatItFrontEndApp')
.filter('collectionFilter',function () {

    return function(recipes, collection_ts){

        if (collection_ts.length == 0){
            return recipes;
        }

        var filteredRecipes = [];

        angular.forEach(recipes, function(recipe, key){
            angular.forEach(recipe.collection_tags, function(collection_t, key){
                if (collection_ts.indexOf(collection_t.name) !=-1 && filteredRecipes.indexOf(recipe) ==-1){
                    filteredRecipes.push(recipe);
                }
            });
        });
        return filteredRecipes;
    };
});

angular.module('loveToEatItFrontEndApp')
.filter('categoryFilter',function () {

    return function(recipes, category_ts){

        if (category_ts.length == 0){
            return recipes;
        }

        var filteredRecipes = [];

        angular.forEach(recipes, function(recipe, key){
            angular.forEach(recipe.category_tags, function(category_t, key){
                if (category_ts.indexOf(category_t.name) !=-1 && filteredRecipes.indexOf(recipe) ==-1){
                    filteredRecipes.push(recipe);
                }
            });
        });
        return filteredRecipes;
    };
});