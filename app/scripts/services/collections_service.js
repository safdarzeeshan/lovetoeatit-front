'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Collections', function( $http ) {

    var collectionsFactory = {},
        baseUrl = 'http://mykloudkitchen.com:8000';

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