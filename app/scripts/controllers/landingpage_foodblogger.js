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
    function ($scope, $window, $localStorage, Config, $state) {

    amplitude.logEvent('Food Blogger Landing page');
    $scope.login = function(){
        amplitude.logEvent('Food Blogger clicked Login');
        $state.go('login');
    };

    $scope.register = function(){
        $localStorage.foodBloggerStatus = 'FoodBloggerWaiting';
        amplitude.logEvent('Food Blogger clicked Sign Up');
        $state.go('register');
    };

    $scope.gotoFbFaq = function(){
        amplitude.logEvent('Food Blogger clicked FAQ');
        $state.go('foodbloggersfaq');
    };

});