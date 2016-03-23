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
    function ($scope, $window, $state, Collections, $filter) {

        amplitude.logEvent('Collections page');

        //get all recipes and populate scope
        Collections.$getAllCollections()
        .then(function( response ) {
            $scope.collections = response.data;

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
        var recipes_liked = $filter('filter')(recipes, { has_user_liked: "true" });
        return recipes_liked.length;
    };

});