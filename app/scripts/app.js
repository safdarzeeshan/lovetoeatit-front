'use strict';

/**
 * @ngdoc overview
 * @name loveToEatItFrontEndApp
 * @description
 * # loveToEatItFrontEndApp
 *
 * Main module of the application.
 */
var loveToEatItFrontEndApp = angular.module('loveToEatItFrontEndApp', [
    'ngCookies', 'ui.router'
]);

loveToEatItFrontEndApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
    $stateProvider


        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'

        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'

        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
        });

});