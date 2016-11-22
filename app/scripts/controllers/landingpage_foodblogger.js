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
    function ($scope, $window, $localStorage, Config, ModalService, $state, $element) {

    $scope.featured_bloggers = [
        {
            name:'Simply Stacie',
            image:'/images/food_bloggers/simply_stacie.jpg',
            blog_url:'http://www.simplystacie.net/'
        },
        {
            name:'Little Bits of Real Food',
            image:'/images/food_bloggers/little_bits_of.jpg',
            blog_url:'http://littlebitsof.com/'
        },
        {
            name:'Hollistic Foodie',
            image:'/images/food_bloggers/hollistic_foodie.jpg',
            blog_url:'http://holisticfoodie.com/'
        },
        {
            name:'My Daily Randomness',
            image:'/images/food_bloggers/my_daily_randomness.jpg',
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

    $scope.gotoFbPage = function(blog_url){
        $window.open(blog_url);
    }

    $scope.fbVideo = function(){
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

});