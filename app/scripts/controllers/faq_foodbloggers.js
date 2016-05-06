'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:FaqFbCtrl
 * @description
 * # FaqFbCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('FaqFbCtrl',
    function ($scope, $window, Config) {

        $scope.oneAtATime = true;

        $scope.faqs = [
            {
                question: 'Are you going to share my full recipe?',
                answer: 'We never share the full recipe. All we do is give your followers (AKA Love To Eat It users) a little taste test of your delicious food by sharing the scrumptious ingredients and along with it a link to the full recipe on your blog'
            },
            {
                question: 'Do you have any claim over my content?',
                answer: 'Your content will always belong to you along with our beating hearts.'
            },
            {
                question: 'How does the cookbook work?',
                answer: "It's really quite magical. When Love To Eat It users like your Instagram recipe posts that are affiliated with us, the recipe is instantly added to their online cookbook. To peruse through it, they can just go to our website and access it whenever they want. Each cookbook page includes a picture of your recipe, list of ingredients and a link to the recipe on your blog."
            },
            {
                question: 'Do my readers need to be signed up?',
                answer: 'Yes they will need to sign up!'
            },
            {
                question: 'How do I sign up?',
                answer: 'Yes they will need to sign up!'
            },
            {
                question: 'What does the code look like?',
                answer: 'Yes they will need to sign up!'
            },
            {
                question: 'Do I need to use the code on all my pictures?',
                answer: 'Yes they will need to sign up!'
            },
            {
                question: 'How long does it take for my content to appear on the site?',
                answer: 'Yes they will need to sign up!'
            },
            {
                question: 'What is your criteria of accepting food blogger?',
                answer: 'Yes they will need to sign up!'
            },
            {
                question: "What if I don't want to share the code?",
                answer: "You'll break our hearts and Love To Eat It users won't get to add your gorgeous recipes to their cookbooks."
            },
        ];

    $scope.login = function() {
        $window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=2e3edb17f4c34ccdb832240b38a3fc12&redirect_uri=' + Config.$redirectUrl + '/iguser&response_type=code';
        $localStorage.foodBloggerStatus = 'FoodBloggerWaiting';
        amplitude.logEvent('Clicked login');
    };
});