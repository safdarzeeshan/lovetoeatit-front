'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Likes', function( $http ) {

    var likesFactory = {},
        baseUrl = 'http://mykloudkitchen.com:8000';

    likesFactory.$getLikes = function() {
        return $http.get( baseUrl + '/api/userlikes' );
    };

    likesFactory.$getLastLike = function() {
        return $http.get( baseUrl + '/api/lastliked' );
    };

    likesFactory.$likeRecipe = function(recipe_local_id) {
        return $http.get( baseUrl + '/api/likerecipe?id=' +recipe_local_id );
    };

    return likesFactory;
});