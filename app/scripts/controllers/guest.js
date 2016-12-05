'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:GuestCtrl
 * @description
 * # GuestCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('GuestCtrl', function ($scope, Likes, $state, Auth, ModalService, $element) {

        $scope.login = function(){
            amplitude.logEvent('User clicked Login');
            $state.go('login');
        };

        $scope.userStatus = 'guest';

        if(Auth.$isLoggedIn())
        {
            $scope.userStatus= 'user';
        }

        $scope.signupRegisterModal = function(){
            ModalService.showModal({
                templateUrl: 'views/modal_register_or_login.html',
                controller: 'ModalLoginSignUpCtrl'
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(state) {
                        console.log(state);
                        $state.go(state);
                    });
            });
        };

        $scope.gotoRegister = function(){
            $state.go('register');
        };


        $scope.getRecipe = function(id){
            $state.go($scope.userStatus + '.recipe' , { 'id': id});
            var recipeProperties = {
                'id': id,
            };
            amplitude.logEvent('Clicked recipe details', recipeProperties);
        };

        $scope.search = function(searchTerm){
            $state.go('guest.searchResults' , { 'q': searchTerm});
            //Add search term to amplitude
            var searchProperties = {
                'searchTerm': searchTerm,
            };
            amplitude.logEvent('Clicked search', searchProperties);
        };

        $scope.gotoAllRecipes = function() {
            $state.go('guest.allRecipes');
            amplitude.logEvent('Clicked Discover');
        };

        $scope.gotoFbPage = function(){
            console.log('here');
            $state.go('guest.landingpage_foodblogger');
            amplitude.logEvent('Clicked are you a foodblooger');
        };

  });

angular.module('loveToEatItFrontEndApp')
    .controller('ModalLoginSignUpCtrl', function($scope, close, $state ) {

        var messages = ['Eat me now! Sign up or login to get cooking!',
                    "If you can't smell what the rock's been cooking you need to sign up or login",
                    'Begin your foodie adventure by signing up or logging in'];

        var rand_message = messages[Math.floor(Math.random() * messages.length)];

        $scope.message = rand_message;


        $scope.gotoSignup = function(){
            close('register', 300);
        };

        $scope.gotoLogin = function(){
            close('login', 300);
        };
});
