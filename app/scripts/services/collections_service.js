'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Collections', function( $http, Config ) {

    var collectionsFactory = {},
        baseUrl = Config.$baseUrl;

    collectionsFactory.$getAllCollections = function() {
        return $http.get( baseUrl + '/api/recipecollections' );
    };

    collectionsFactory.$getCollection = function(tag) {
        return $http.get( baseUrl + '/api/recipecollection?collection_tag=' +tag );
    };

    collectionsFactory.$getCollectionsFeed = function() {
        return $http.get( baseUrl + '/api/recipecollectionsfeed' );
    };

    return collectionsFactory;
});