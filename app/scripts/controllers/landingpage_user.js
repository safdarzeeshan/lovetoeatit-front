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
    function ($scope, Recipe, $window, Config, Brand, ModalService, $state, $element) {

    $scope.scroll = 0;
    $scope.brand ={};
    $scope.emailBrandCta = true;
    $scope.emailBrandSuccess = false;

    amplitude.logEvent('User Landing page');


    Recipe.$getTopRecipePicks()
    .then(function( response ) {
        console.log(response.data)
        $scope.recipes = response.data;

    })
    .catch(function(error){
        console.log(error);
    });

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

    $scope.howitworksVideo = function(){
        amplitude.logEvent('clicked user how it works video');

        ModalService.showModal({
            templateUrl: 'views/modal_video.html',
            controller: "ModalCtrl",
            inputs: {
                message: "https://www.youtube.com/embed/79D-0dY255w?autohide=2&showinfo=0&autoplay=1"
        }
        }).then(function(modal) {
            modal.element.modal();
            modal.element.on('hidden.bs.modal', function() {
                $('.modal-video').remove();
            });
        });
    }

    $scope.gotoRecipeExample = function(id){

        console.log('here');

        $state.go('recipeexample' , { 'id': id});
        var recipeProperties = {
            'id': id,
        };
        amplitude.logEvent('Clicked recipe pick', recipeProperties);
    };

    $scope.gotoFoodbloggerPage = function(){
        amplitude.logEvent('clicked on goto foodblogger page');
        $state.go('landingpage_foodblogger');
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