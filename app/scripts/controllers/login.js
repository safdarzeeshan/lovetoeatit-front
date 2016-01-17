'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('LoginCtrl',
    function ($scope, $window) {

    $scope.login = function() {
        $window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=2e3edb17f4c34ccdb832240b38a3fc12&redirect_uri=http://lovetoeat.it:9000/user&response_type=code';
    };

});