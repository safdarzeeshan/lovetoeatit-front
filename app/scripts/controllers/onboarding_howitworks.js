'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:HowitworksCtrl
 * @description
 * # HowitworksCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('HowitworksCtrl',
    function ($scope, $window, $state) {

    amplitude.logEvent('Onboarding - How it works page')
    $scope.foodBloggers = function() {
        $state.go('onboarding.foodbloggers');
        amplitude.logEvent('Onboarding - Clicked Food bloggers')
    };

});