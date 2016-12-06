'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:CollectionsCtrl
 * @description
 * # CollectionsCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('CollectionsCtrl',
    function ($scope, $window, $rootScope, $state, Collections, $filter) {

        amplitude.logEvent('Collections page');
        $scope.loading= true;
        $scope.no_collections = false;

        $rootScope.title = 'Your Cookbook';
        $rootScope.shareDescription = 'Keep track of your favourite recipes from food bloggers on Instagram! Sign-up, like a picture with our link in it & we’ll hook you with recipe info.';


        //get all recipes and populate scope
        Collections.$getAllCollections()
        .then(function( response ) {
            $scope.loading= false;
            $scope.collections = response.data;

            if($scope.collections.length == 0){
                $scope.no_collections = true;
            }

        });

        $scope.getCollection = function(collectionTag){
            $state.go('user.collection' , { 'collection_tag': collectionTag});
            var collectionProperties = {
                'tag': collectionTag,
            };
            amplitude.logEvent('Clicked collection', collectionProperties);
        };
    }
);

// todo - this module gets called no matter what
angular.module('loveToEatItFrontEndApp')
.filter('user_liked_image',function () {

    return function(recipes){

        var imageUrl;
        angular.forEach(recipes, function(recipe, key){
            if (recipe.has_user_liked === true){
                imageUrl =  recipe.image_url;
            }
        });
        return imageUrl;
    };

});

angular.module('loveToEatItFrontEndApp')
.filter('user_liked_recipe_count',function ($filter) {

    return function(recipes){
        return recipes.length;
    };

});