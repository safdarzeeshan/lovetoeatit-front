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

    $scope.foodBloggers = function() {
        $state.go('foodbloggers');
    };

});