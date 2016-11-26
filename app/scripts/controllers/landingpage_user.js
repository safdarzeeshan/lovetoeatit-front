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
    function ($scope, Recipe, $window, Config, Brand, ModalService, $state, $element, $rootScope) {

    $rootScope.title = 'Begin your foodie adventure';

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

        $state.go('guest.recipe' , { 'id': id});
        var recipeProperties = {
            'id': id,
        };
        amplitude.logEvent('Clicked recipe pick', recipeProperties);
    };

});