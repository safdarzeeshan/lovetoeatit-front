'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Brand', function( $http, $cookies, Config ) {

    var brandFactory = {},
        baseUrl = Config.$baseUrl;

    brandFactory.$emailBrandData = function(brandData) {

        return $http({
            method: 'POST',
            url: baseUrl + '/api/brandContact',
            headers : {'x-csrftoken': $cookies.get('x-csrftoken'),'Content-Type': 'application/json'},
            data: brandData
        });
    };

    return brandFactory;
});