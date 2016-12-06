'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('OnboardingCtrl',
    function ($rootScope) {

        $rootScope.title ="Pre heating the oven";
        $rootScope.shareDescription = 'Keep track of your favourite recipes from food bloggers on Instagram! Sign-up, like a picture with our link in it & we’ll hook you with recipe info.';


});