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
    function ($scope, Recipe, FoodBlogger, $window, Config, Brand, ModalService, $state, $element, $rootScope) {

    $rootScope.title = 'Begin your foodie adventure';

    amplitude.logEvent('User Landing page');


    Recipe.$getTopRecipePicks()
    .then(function( response ) {
        console.log(response.data)
        $scope.recipes = response.data;

    })
    .catch(function(error){
        console.log(error);
    });

    FoodBlogger.$getCategoryTagsList()
    .then(function(response){
        console.log(response.data)
        $scope.categoryTags=response.data;
    })
    .catch(function(error){
        console.log(error);
    });

    $scope.gotoCategoryTagRecipes = function(name){
        $state.go('guest.tagrecipes' , { 'tag': 'category_tag', 'name': name});
    };

    $scope.login = function(){
        amplitude.logEvent('User clicked Login');
        $state.go('login');
    };

    $scope.register = function(){
        amplitude.logEvent('User clicked Sign Up');
        $state.go('register');
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

        $state.go('guest.recipe' , { 'id': id});
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