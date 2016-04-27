'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('LoginUserCtrl',
    function ($scope, $window, Config) {

    $scope.scroll = 0;
    amplitude.logEvent('Landing page');
    $scope.login = function() {
        $window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=2e3edb17f4c34ccdb832240b38a3fc12&redirect_uri=' + Config.$redirectUrl  + '/iguser&response_type=code';
        amplitude.logEvent('Clicked login');
    };

});

angular.module('loveToEatItFrontEndApp')
.directive('scrollPosition',function ($window) {

    return {
        scope: {
            scroll: '=scrollPosition'
        },
        link: function(scope, element, attrs) {
            var windowEl = angular.element($window);
            var handler = function() {
                scope.scroll = windowEl.scrollTop();
            };
            windowEl.on('scroll', scope.$apply.bind(scope, handler));
            handler();
        }
    };

});