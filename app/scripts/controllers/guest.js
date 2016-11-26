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
