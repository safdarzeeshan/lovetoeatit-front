'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('User', function( $http ) {

    var userFactory = {},
        baseUrl = 'http://mykloudkitchen.com:8000';

    userFactory.$getLikes = function() {
        return $http.get( baseUrl + '/api/userlikes' );
    };

    return userFactory;
});