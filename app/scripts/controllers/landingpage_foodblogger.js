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

    amplitude.logEvent('FoodBloggerLanding page');
    $scope.login = function(){
        console.log('clicked login');
        $state.go('login');
    };

    $scope.register = function(){
        $localStorage.foodBloggerStatus = 'FoodBloggerWaiting';
        $state.go('register');
    };

    $scope.gotoFbFaq = function(){
        $state.go('foodbloggersfaq');
    };

});