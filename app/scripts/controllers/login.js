'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('LoginCtrl', function ($http, $cookies, $rootScope, Validate, Auth, $scope, $state, $window, $localStorage) {

    $scope.model = {'email':'','password':''};
    $scope.loading = false;

    amplitude.logEvent('Login Page');

    $rootScope.title ="Login";

    $scope.gotoRegister = function(){
        amplitude.logEvent('Clicked sign up');
        $state.go('register');
    };

    $scope.gotoResetPassword = function(){
        amplitude.logEvent('Clicked forgot password');
        $state.go('resetpassword');
    };

    $scope.login = function(formData){
        amplitude.logEvent('login form submitted');
        $scope.errors = [];
        Validate.form_validation(formData,$scope.errors);
        if(!formData.$invalid){
            $scope.loading = true;
            Auth.$loginUserLocal($scope.model.email, $scope.model.password)
            .success(function(data){
                // success case
                $http.defaults.headers.common.Authorization = 'Token ' + data.key;
                $cookies.put('token', data.key);
                amplitude.logEvent('Login Successful');

                Auth.$getUser()
                .success(function(response){
                    //email is set as unique id for amplitude
                    amplitude.setUserId(response.email);
                    //populate profile picture and username
                    $scope.user = response;
                    $localStorage.role = response.role;
                    $localStorage.isAuthenticated = 'true';
                    $localStorage.onboarding_status = response.onboarding_status;


                    if ($localStorage.foodBloggerStatus === 'FoodBloggerWaiting' && $localStorage.role === 'FoodBlogger'){
                        $localStorage.foodBloggerStatus = 'FoodBloggerValidated';
                    }

                    if ($localStorage.onboarding_status === 'New' || $localStorage.onboarding_status === 'InProgress'){
                        $state.go('onboarding.instagram_connect');
                    }

                    if ($localStorage.onboarding_status === 'Complete'){
                        console.log('going to feed')
                        $state.go('user.feed');
                    }

                    //user has not connected ig profile
                    if ($localStorage.onboarding_status === null){
                        amplitude.logEvent('User has not customuser');
                        console.log('no customuser')
                        $localStorage.role = 'Foodie';
                        $localStorage.onboarding_status = 'New';
                        $state.go('onboarding.instagram_connect');
                    }

                }),function(error){
                    console.log('cannot retrieve user information');
                };

            })
            .catch(function(errors){
                // error case
                amplitude.logEvent('User login error ' + errors.data);
                $scope.loading = false;
                $scope.errors = errors.data;
            });
        }
    }
});
