'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('LandingPageFBCtrl',
    function ($scope, $window, $rootScope, $localStorage, Config, ModalService, $state, $element) {

    $rootScope.title = "Foodbloggers love us";

    $scope.featured_bloggers = [
        {
            name:'Simply Stacie',
            image:'https://s3-us-west-2.amazonaws.com/ltei-webpage-static/food-bloggers/simply_stacie.jpg',
            blog_url:'http://www.simplystacie.net/'
        },
        {
            name:'Little Bits Of...',
            image:'https://s3-us-west-2.amazonaws.com/ltei-webpage-static/food-bloggers/little_bits_of.jpg',
            blog_url:'http://littlebitsof.com/'
        },
        {
            name:'Holistic Foodie',
            image:'https://s3-us-west-2.amazonaws.com/ltei-webpage-static/food-bloggers/hollistic_foodie.jpg',
            blog_url:'http://holisticfoodie.com/'
        },
        {
            name:'My Daily Randomness',
            image:'https://s3-us-west-2.amazonaws.com/ltei-webpage-static/food-bloggers/my_daily_randomness.jpg',
            blog_url:'http://www.brittanystager.com'
        }];

    amplitude.logEvent('Food Blogger Landing page');
    $scope.login = function(){
        amplitude.logEvent('Food Blogger clicked Login');
        $state.go('login');
    };

    $scope.register = function(){
        $localStorage.foodBloggerStatus = 'FoodBloggerWaiting';
        amplitude.logEvent('Food Blogger clicked Sign Up');
        $state.go('register');
    };

    $scope.gotoFbFaq = function(){
        amplitude.logEvent('Food Blogger clicked FAQ');
        $state.go('foodbloggersfaq');
    };

    $scope.gotoFbRecipes = function(blog_name){
        $state.go('guest.foodbloggerrecipes' , {'name': blog_name});
    };

    $scope.fbVideo = function(){
        ModalService.showModal({
            templateUrl: 'views/modal_video.html',
            controller: "ModalCtrl",
            inputs: {
                message: "https://www.youtube.com/embed/WlAjuWGgzv8?autohide=2&showinfo=0&autoplay=1"
        }
        }).then(function(modal) {
            modal.element.modal();
            modal.element.on('hidden.bs.modal', function() {
                $('.modal-video').remove();
            });
        });
    }

});