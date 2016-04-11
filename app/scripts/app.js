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
    'ngCookies', 'ui.router', 'csrf-cross-domain', 'ngStorage', 'checklist-model', 'ngFileUpload', 'ngImgCrop'

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
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $httpProvider.defaults.headers.post["x-csrftoken"] = $cookies.get('x-csrftoken');

    $httpProvider.interceptors.push('responseIntercepter');
    $httpProvider.interceptors.push(function ($cookies) {
        return {
            'request': function (config) {
                if ($cookies.get('csrftoken')) {
                    config.headers['X-CSRFToken'] = $cookies.get('x-csrftoken');
                }
                return config;
            }
        };
    });

    $urlRouterProvider.otherwise('/home/feed');
    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider


        // HOME STATES AND NESTED VIEWS

        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            requireLogin: false

        })

        .state('iguser', {
            url: '/iguser?code',
            controller: 'AuthCtrl',
            requireLogin: false

        })


        .state('onboarding', {
            url: '/welcome',
            templateUrl: 'views/onboarding.html',
            controller: 'OnboardingCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })

        .state('onboarding.userinfo', {
            url: '/user',
            templateUrl: 'views/onboarding_user.html',
            controller: 'OnboardingUserCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })

        .state('onboarding.userdiet', {
            url: '/userhealth',
            templateUrl: 'views/onboarding_userdiet.html',
            controller: 'OnboardingUserDietCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })

        .state('onboarding.howitworks', {
            url: '/howitworks',
            templateUrl: 'views/onboarding_howitworks.html',
            controller: 'HowitworksCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })

        .state('onboarding.foodbloggers', {
            url: '/foodbloggers',
            templateUrl: 'views/onboarding_foodbloggers.html',
            controller: 'FoodBloggersCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['New', 'InProgress']
        })

        .state('user',{
            url: '/home',
            templateUrl: 'views/user.html',
            controller: 'UserCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']
        })

        .state('user.feed', {
            url: '/feed',
            templateUrl: 'views/feed.html',
            controller: 'FeedCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.likes', {
            url: '/likes',
            templateUrl: 'views/likes.html',
            controller: 'LikesCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.collections', {
            url: '/collections',
            templateUrl: 'views/collections.html',
            controller: 'CollectionsCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.collection', {
            url: '/collection?collection_tag',
            templateUrl: 'views/collectionTag.html',
            controller: 'CollectionTagCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.allRecipes', {
            url: '/recipes',
            templateUrl: 'views/allRecipes.html',
            controller: 'AllRecipesCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.recipe', {
            url: '/recipe?id',
            templateUrl: 'views/recipe.html',
            controller: 'RecipeCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
            onboardingStatus: ['Complete']

        })

        .state('user.searchResults', {
            url: '/search?q',
            templateUrl: 'views/searchResults.html',
            controller: 'SearchRecipeCtrl',
            requireLogin: true,
            role: ['Foodie','FoodBlogger','Admin'],
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

        .state('user.editRecipe', {
            url: '/editrecipe',
            templateUrl: 'views/editRecipe.html',
            controller: 'EditRecipeCtrl',
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
    csrfCDProvider.setHeaderName('X-CSRFToken');
    csrfCDProvider.setCookieName('CSRFToken');


}).run(function ($http, $cookies, $rootScope, $location, $state, Auth, $localStorage) {

    $http.defaults.headers.post['x-csrftoken'] = $cookies.csrftoken;

    $http.get('http://localhost:8000/api/csrftoken').success(function (data, status, headers) {
        // $http.defaults.headers.post["x-csrftoken"] = data['csrftoken'];
        $http.defaults.headers.post['x-csrftoken'] = $cookies.get('x-csrftoken');
        $cookies.put('x-csrftoken', data['csrftoken']);
    }, function () {
        console.log('FAILED', $cookies);
        console.log(arguments);
    });

    //check if state requires user to be logged in and the permission
    $rootScope.$on('$stateChangeStart', function(event, toState){

        if (toState.requireLogin && Auth.$isLoggedIn()){

            //check if user has completed onboarding
            if(((toState.onboardingStatus).indexOf(Auth.$onboardingStatus()))===-1){

                if(Auth.$onboardingStatus()==='New'|| Auth.$onboardingStatus()==='InProgress'){
                    $state.transitionTo('onboarding.userinfo');
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

        //redirect logged in user to default page
        if (!toState.requireLogin && Auth.$isLoggedIn()){

            $state.transitionTo('user.feed');
            event.preventDefault();
        }

        //redirect unlogged in user to login page
        if (toState.requireLogin && !Auth.$isLoggedIn()){

            // User isn’t authenticated
            $state.transitionTo('login');
            event.preventDefault();
        }
    });
});

