'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
    .controller('ModalCtrl', function($scope, close, message) {
        console.log('message is' + message);
        $scope.message = message;
        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };
    });

