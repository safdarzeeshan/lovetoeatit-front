'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('LandingPageUserCtrl',
    function ($scope, $window, Config, Brand, ModalService, $state) {

    $scope.scroll = 0;
    $scope.brand ={};
    $scope.emailBrandCta = true;
    $scope.emailBrandSuccess = false;

    amplitude.logEvent('User Landing page');

    $scope.login = function(){
        amplitude.logEvent('User clicked Login');
        $state.go('login');
    };

    $scope.register = function(){
        amplitude.logEvent('User clicked Sign Up');
        $state.go('register');
    };

    $scope.emailBrandDataForm = function(){
        amplitude.logEvent('User clicked Drop us a line');
        $scope.emailBrandCta = false;
    };

    $scope.submitBrandForm = function(){
        amplitude.logEvent('Brand form submitted');
        $scope.emailBrandSuccess = true;

        Brand.$emailBrandData($scope.brand)
        .success(function(response){
            console.log(response);

        }),function(error){
            console.log('cannot send email' + error);
        };
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