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
    function ($scope, $window, $state, Collections) {

        //get all recipes and populate scope
        Collections.$getAllCollections()
        .then(function( response ) {
            $scope.collections = response.data;
        });

        $scope.getCollection = function(collectionTag){
            $state.go('user.collection' , { 'collection_tag': collectionTag});
        };
    }
);

angular.module('loveToEatItFrontEndApp')
.filter('user_liked_image',function () {

    return function(recipes){

        var imageUrl;
        angular.forEach(recipes, function(recipe, key){
            if (recipe.has_user_liked === true){
                console.log(recipe.image_url);
                imageUrl =  recipe.image_url;
            }

        });

        return imageUrl;
    };

});