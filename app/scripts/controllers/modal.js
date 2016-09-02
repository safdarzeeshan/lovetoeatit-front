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
        $scope.close = function() {
            close(null, 500); // close, but give 500ms for bootstrap to animate
        };
    });

angular.module('loveToEatItFrontEndApp')
.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);