'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('LandingPageFBCtrl',
    function ($scope, $window, $localStorage, Config) {

    $scope.scroll = 0;
    amplitude.logEvent('Landing page');
    $scope.login = function() {
        $window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=2e3edb17f4c34ccdb832240b38a3fc12&redirect_uri=' + Config.$redirectUrl + '/iguser&response_type=code';
        $localStorage.foodBloggerStatus = 'FoodBloggerWaiting';
        amplitude.logEvent('Clicked login');
    };

});