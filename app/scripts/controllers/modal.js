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
        $scope.message = message;
    });

angular.module('loveToEatItFrontEndApp')
.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);