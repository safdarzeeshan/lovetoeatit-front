'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:MainCtrl
 * @description
 * # FoodBloggersCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('FoodBloggersCtrl',
    function ($scope, $window, $state, FoodBlogger, Auth, $localStorage) {

        amplitude.logEvent('Onboarding - Food bloggers page')
        //get likes and populate scope
        FoodBlogger.$getFoodBloggersList()
        .then(function( response ) {
            console.log(response.data);
            $scope.foodbloggers = response.data;
        });

        $scope.onboardingComplete = function(){
            console.log('completing onboarding_status');
            amplitude.logEvent('Onboarding - clicked show me some recipes');

            this.onboarding_status = {'onboarding_status':'Complete'};
            Auth.$updateUserOnboardingStatus(this.onboarding_status)
            .success(function(response){
                $localStorage.onboarding_status = 'Complete';
                $state.go('user.feed');

            }),function(error){
                console.log('cannot retrieve user information' + error);
            };

        };

        $scope.gotoInstagramAccount = function(intagramUsername){
            amplitude.logEvent('Onboarding - clicked ' + + intagramUsername + ' instagram');
            $window.open('http://www.instagram.com/' + intagramUsername);
        }
    }
);