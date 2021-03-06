// 'use strict';

/**
 * @ngdoc overview
 * @name loveToEatItFrontEndApp
 * @description
 * # loveToEatItFrontEndApp
 *
 * Main module of the application.
 */
var loveToEatItFrontEndApp = angular.module('loveToEatItFrontEndApp', [
    'ngCookies', 'ui.router', 'csrf-cross-domain', 'ngStorage', 'checklist-model', 'ngFileUpload', 'ngImgCrop', 'duScroll', 'angularModalService', 'ngAnimate','ui.bootstrap', 'angular-carousel', 'ngTouch','underscore','cfp.hotkeys', 'slickCarousel'
]).factory('responseIntercepter', function ($q) {
    return {
        response: function (response) {
            // do something on success
            // console.log('response.headers', response.headers());
            if (response.headers()['content-type'] === "application/json; charset=utf-8") {
            }
            return response;
        },
        responseError: function (response) {
            // do something on error
            return $q.reject(response);
        }
    };

}).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'x-csrftoken';
    // $httpProvider.defaults.headers.post["x-csrftoken"] = $cookies.get('x-csrftoken');

    $httpProvider.interceptors.push('responseIntercepter');
    $httpProvider.interceptors.push(function ($cookies) {
        return {
            'request': function (config) {
                if ($cookies.get('x-csrftoken') || $cookies.get('csrftoken')) {
                    //config.headers['X-CSRFToken'] = $cookies.get('x-csrftoken');
                    config.headers['x-csrftoken'] = $cookies.get('x-csrftoken') || $cookies.get('csrftoken');
                }

                if($cookies.get('token')){
                    config.headers['Authorization'] = 'Token ' + $cookies.get('token');
                }
                return config;
            }
        };
    });

    $urlRouterProvider.otherwise(function($injector, $location){
        $injector.invoke(function($state) {
            $state.go('guest.landingpage_user');
        });
    });

    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider


        // HOME STATES AND NESTED VIEWS

        .state('guest', {
            url: '',
            templateUrl: 'views/guest.html',
            controller: 'GuestCtrl',
            requireLogin: false

        })

        .state('guest.landingpage_user', {
            url: '/foodie',
            templateUrl: 'views/landingpage_user.html',
            controller: 'LandingPageUserCtrl',
            requireLogin: false

        })

        .state('guest.landingpage_foodblogger', {
            url: '/foodbloggers',
            templateUrl: 'views/landingpage_foodbloggers.html',
            controller: 'LandingPageFBCtrl',
            requireLogin: false

        })

        .state('guest.foodbloggersfaq', {
            url: '/foodbloggersfaq',
            templateUrl: 'views/foodbloggers_faq.html',
            controller: 'FaqFbCtrl',
            requireLogin: false
        })

        .state('privacypolicy', {
            url: '/privacypolicy',
            templateUrl: 'views/privacypolicy.html',
            requireLogin: false
        })

        .state('termsofuse', {
            url: '/termsofuse',
            templateUrl: 'views/termsofuse.html',
            requireLogin: false
        })

        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            requireLogin: false

        })

        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl',
            requireLogin: false

        })

        .state('resetpassword', {
            url: '/resetpassword',
            templateUrl: 'views/reset_password.html',
            controller: 'ResetPasswordCtrl',
            requireLogin: false

        })

        .state('resetpasswordconfirm', {
            url: '/resetpasswordconfirm/:firstToken/:passwordResetToken',
            templateUrl: 'views/reset_password_confirm.html',
            controller: 'ResetPasswordConfirmCtrl',
            requireLogin: false

        })

        .state('iguser', {
            url: '/iguser?code',
            templateUrl: 'views/iguser.html',
            controller: 'AuthUserCtrl',
            requireLogin: false
        })

        .state('igfoodblogger', {
            url: '/iguser/foodblogger?code',
            templateUrl: 'views/iguser.html',
            controller: 'AuthFbCtrl',
            requireLogin: false
        })

        .state('onboarding', {
            url: '/welcome',
            templateUrl: 'views/onboarding.html',
            controller: 'OnboardingCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })


        .state('onboarding.userdiet', {
            url: '/userhealth',
            templateUrl: 'views/onboarding_userdiet.html',
            controller: 'OnboardingUserDietCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })

        .state('onboarding.instagram_connect', {
            url: '/userinstagram',
            templateUrl: 'views/onboarding_instagram_connect.html',
            controller: 'UserProfileCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })

        .state('onboarding.howitworks', {
            url: '/howitworks',
            templateUrl: 'views/onboarding_howitworks.html',
            controller: 'HowitworksCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })

        .state('onboarding.foodbloggers', {
            url: '/foodbloggers',
            templateUrl: 'views/onboarding_foodbloggers.html',
            controller: 'FoodBloggersCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })

        .state('user',{
            url: '/home',
            templateUrl: 'views/user.html',
            controller: 'UserCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']
        })

        .state('user.profile', {
            url: '/profile',
            templateUrl: 'views/user_profile.html',
            controller: 'UserProfileCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']
        })

        .state('user.changepassword', {
            url: '/changepassword',
            templateUrl: 'views/change_password.html',
            controller: 'ChangePasswordCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']
        })

        .state('instagramconnect', {
            url: '/instagramconnect?access_token',
            templateUrl: 'views/instagram_connect.html',
            controller: 'InstagramConnectCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress','Complete']
        })

        .state('user.allRecipes', {
            url: '/recipes',
            templateUrl: 'views/allRecipes.html',
            controller: 'AllRecipesCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete'],
            guestState: 'guest.allRecipes'

        })

        .state('guest.allRecipes', {
            url: '/recipes',
            templateUrl: 'views/allRecipes.html',
            controller: 'AllRecipesCtrl',
            requireLogin: false,
            userState: 'user.allRecipes'

        })

        .state('user.recipe', {
            url: '/recipe?id',
            templateUrl: 'views/recipe.html',
            controller: 'RecipeCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete'],
            guestState: 'guest.recipe'

        })

        .state('guest.recipe', {
            url: '/recipe?id',
            templateUrl: 'views/recipe.html',
            controller: 'RecipeCtrl',
            requireLogin: false,
            userState: 'user.recipe'
        })

        .state('user.tagrecipes', {
            url: '/tagrecipes?name&tag',
            templateUrl: 'views/allTagRecipes.html',
            controller: 'AllTagRecipesCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete'],
            guestState: 'guest.tagrecipes'

        })

        .state('guest.tagrecipes', {
            url: '/tagrecipes?name&tag',
            templateUrl: 'views/allTagRecipes.html',
            controller: 'AllTagRecipesCtrl',
            requireLogin: false,
            userState: 'user.tagrecipes'

        })

        .state('user.foodbloggerrecipes', {
            url: '/foodblogger?name',
            templateUrl: 'views/foodblogger_recipes.html',
            controller: 'FoodbloggerRecipesCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete'],
            guestState: 'guest.foodbloggerrecipes'

        })

        .state('guest.foodbloggerrecipes', {
            url: '/foodblogger?name',
            templateUrl: 'views/foodblogger_recipes.html',
            controller: 'FoodbloggerRecipesCtrl',
            requireLogin: false,
            userState: 'user.foodbloggerrecipes'

        })

        .state('user.compilation', {
            url: '/compilation?name',
            templateUrl: 'views/compilation.html',
            controller: 'CompilationCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete'],
            guestState: 'guest.compilation'

        })

        .state('guest.compilation', {
            url: '/compilation?name',
            templateUrl: 'views/compilation.html',
            controller: 'CompilationCtrl',
            requireLogin: false,
            userState: 'user.compilation'

        })

        .state('user.searchResults', {
            url: '/search?q',
            templateUrl: 'views/searchResults.html',
            controller: 'SearchRecipeCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete'],
            guestState: 'guest.searchResults'

        })

        .state('guest.searchResults', {
            url: '/search?q',
            templateUrl: 'views/searchResults.html',
            controller: 'SearchRecipeCtrl',
            requireLogin: false,
            userState: 'user.searchResults'

        })

        .state('user.feed', {
            url: '/feed',
            templateUrl: 'views/feed.html',
            controller: 'FeedCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.likes', {
            url: '/likes',
            templateUrl: 'views/likes.html',
            controller: 'LikesCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.collections', {
            url: '/collections',
            templateUrl: 'views/collections.html',
            controller: 'CollectionsCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.collection', {
            url: '/collection?collection_tag',
            templateUrl: 'views/collectionTag.html',
            controller: 'CollectionTagCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBloggerWaiting','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.submitRecipe', {
            url: '/submitrecipe',
            templateUrl: 'views/submitRecipe.html',
            controller: 'SubmitRecipeCtrl',
            requireLogin: true,
            role: ['FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.submitRecipeAdmin', {
            url: '/submitrecipeadmin',
            templateUrl: 'views/submitRecipeAdmin.html',
            controller: 'SubmitRecipeAdminCtrl',
            requireLogin: true,
            role: ['Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.editRecipe', {
            url: '/editrecipe',
            templateUrl: 'views/editRecipe.html',
            controller: 'EditRecipeCtrl',
            requireLogin: true,
            role: ['Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.allUsers', {
            url: '/allusers',
            templateUrl: 'views/allUsers.html',
            controller: 'AllUsersCtrl',
            requireLogin: true,
            role: ['Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.editUser', {
            url: '/edituser?username',
            templateUrl: 'views/edituser.html',
            controller: 'EditUserCtrl',
            requireLogin: true,
            role: ['Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.submittedRecipes', {
            url: '/submittedrecipes',
            templateUrl: 'views/submittedRecipes.html',
            controller: 'SubmittedRecipesCtrl',
            requireLogin: true,
            role: ['FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {});

}).config(function (csrfCDProvider) {

    // Django default name
    csrfCDProvider.setHeaderName('x-csrftoken');
    csrfCDProvider.setCookieName('CSRFToken');

}).config(function(hotkeysProvider) {
    hotkeysProvider.includeCheatSheet = false;

}).config(function (slickCarouselConfig) {
    slickCarouselConfig.dots = false;
    slickCarouselConfig.autoplay = false;

}).run(function ($http, $cookies, $rootScope, $location, $state, Auth, $localStorage, Config, $stateParams) {

    $http.defaults.headers.post['x-csrftoken'] = $cookies.get('x-csrftoken') || $cookies.get('csrftoken');

    $http.get(Config.$baseUrl + '/api/csrftoken').success(function (data, status, headers) {

        var token = data['csrftoken'] || $cookies.get('x-csrftoken') || $cookies.get('csrftoken');
        $http.defaults.headers.post['x-csrftoken'] = token;
        $cookies.put('csrftoken', token, {domain:Config.$csrfDomain});

    }, function () {
        console.log('FAILED', $cookies);
        console.log(arguments);
    });

    //check if state requires user to be logged in and the permission
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

        $rootScope.previousState = fromState;

        if (toState.requireLogin && Auth.$isLoggedIn()){

            //check if user has completed onboarding
            if(((toState.onboardingStatus).indexOf(Auth.$onboardingStatus()))===-1){

                if(Auth.$onboardingStatus()==='New'|| Auth.$onboardingStatus()==='InProgress'){
                    $state.transitionTo('onboarding.instagram_connect');
                    event.preventDefault();
                }
                if(Auth.$onboardingStatus()==='Complete'){
                    $state.transitionTo('user.feed');
                    event.preventDefault();
                }
            }

            //check if user role allows access to page
            if (((toState.role).indexOf(Auth.$userRole()))===-1){
                console.log('redirecting to feed');
                // role isn’t correct
                $state.transitionTo('user.feed');
                event.preventDefault();
            }
        }

        //redirect logged in user to user page
        if (!toState.requireLogin && Auth.$isLoggedIn() && toState.hasOwnProperty('userState')){

            if(toState.name === 'guest.foodbloggerrecipes'){
                $state.transitionTo(toState.userState, {'name': toParams.name});
                event.preventDefault();
            }

            if(toState.name === 'guest.recipe'){
                $state.transitionTo(toState.userState, {'id': toParams.id});
                event.preventDefault();
            }

            if(toState.name === 'guest.compilation'){
                $state.transitionTo(toState.userState, {'name': toParams.name});
                event.preventDefault();
            }

            if(toState.name === 'guest.tagrecipes'){
                $state.transitionTo(toState.userState, {'tag': toParams.tag, 'name': toParams.name });
                event.preventDefault();
            }

            if((toState.name === 'guest.allRecipes') || (toState.name === 'guest.searchResults')){
                $state.transitionTo(toState.userState);
                event.preventDefault();
            }

        }

        //redirect logged in user to default page
        if (!toState.requireLogin && Auth.$isLoggedIn() && !toState.hasOwnProperty('userState')){

            $state.transitionTo('user.feed');
            event.preventDefault();

        }

        //redirect unlogged in user to guest state
        if (toState.requireLogin && !Auth.$isLoggedIn() && toState.hasOwnProperty('guestState')){

            if(toState.name === 'user.foodbloggerrecipes'){
                $state.transitionTo(toState.guestState, {'name': toParams.name});
                event.preventDefault();
            }

            if(toState.name === 'user.recipe'){
                $state.transitionTo(toState.guestState, {'id': toParams.id});
                event.preventDefault();
            }

            if(toState.name === 'user.compilation'){
                $state.transitionTo(toState.guestState, {'name': toParams.name});
                event.preventDefault();
            }

            if(toState.name === 'user.tagrecipes'){
                $state.transitionTo(toState.guestState, {'tag': toParams.tag, 'name': toParams.name });
                event.preventDefault();
            }

            if((toState.name === 'user.allRecipes') || (toState.name === 'user.searchResults')){
                $state.transitionTo(toState.guestState);
                event.preventDefault();
            }

        }

        //redirect unlogged in user to login page
        if (toState.requireLogin && !Auth.$isLoggedIn() && !toState.hasOwnProperty('guestState')){
            $state.transitionTo('guest.landingpage_user');
            event.preventDefault();
        }

    });

});