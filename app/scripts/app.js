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
    'ngCookies', 'ui.router', 'csrf-cross-domain', 'ngStorage'

]).factory('responseIntercepter', function ($q) {
    return {
        response: function (response) {
            // do something on success
            console.log('response.headers', response.headers());
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

    $urlRouterProvider.otherwise('/home/likes');
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

        .state('user',{
            url: '/home',
            templateUrl: 'views/user.html',
            controller: 'UserCtrl',
            requireLogin: true
        })

        .state('user.likes', {
            url: '/likes',
            templateUrl: 'views/likes.html',
            controller: 'LikesCtrl',
            requireLogin: true

        })

        .state('user.allRecipes', {
            url: '/recipes',
            templateUrl: 'views/allRecipes.html',
            controller: 'AllRecipesCtrl',
            requireLogin: true

        })

        .state('user.recipe', {
            url: '/recipe?id',
            templateUrl: 'views/recipe.html',
            controller: 'RecipeCtrl',
            requireLogin: true

        })

        .state('user.submitRecipe', {
            url: '/submitrecipe',
            templateUrl: 'views/submitRecipe.html',
            controller: 'SubmitRecipeCtrl',
            requireLogin: true

        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {});

}).config(function (csrfCDProvider) {

    // Django default name
    csrfCDProvider.setHeaderName('X-CSRFToken');
    csrfCDProvider.setCookieName('CSRFToken');


}).run(function ($http, $cookies, $rootScope, $location, $state, Auth) {

    $http.defaults.headers.post['x-csrftoken'] = $cookies.csrftoken;

    $http.get('http://localhost:8000/api/csrftoken').success(function (data, status, headers) {
        // $http.defaults.headers.post["x-csrftoken"] = data['csrftoken'];
        $http.defaults.headers.post['x-csrftoken'] = $cookies.get('x-csrftoken');
        $cookies.put('x-csrftoken', data['csrftoken']);
    }, function () {
        console.log('FAILED', $cookies);
        console.log(arguments);
    });

    //check if state requires user to be logged in
    $rootScope.$on('$stateChangeStart', function(event, toState){
        if (toState.requireLogin && !Auth.$isLoggedIn()){
            // User isn’t authenticated
            $state.transitionTo('login');
            event.preventDefault();
        }
    });
});

