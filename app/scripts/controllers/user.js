'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('UserCtrl',
    function ($scope, $localStorage, $location, $state, Auth) {

    var role,
        setupProfile;

    //check role
    role = function(){

        if (Auth.$userRole() === 'FoodBlogger'){
            $scope.FoodBlogger = true;
        }

        if (Auth.$userRole() === 'Admin'){
            $scope.Admin = true;
        }
    };

    setupProfile = function(){

        Auth.$getUser()
        .success(function(response){
            //populate profile picture and username
            $scope.user = response;
            console.log($scope.user)
            amplitude.setUserId(response.instagram_id);

        }),function(error){
            console.log('cannot retrieve user information');
        };

    };

    $scope.navClass = function (page) {
        var path = $location.path().split('/')[2];
        var currentRoute = path || 'feed';
        return page === currentRoute ? 'active' : '';
    };

    $scope.logout = function() {

        Auth.$logoutUser()
        .success(function() {
            //clear localstorage
            $localStorage.$reset();
            amplitude.logEvent('Clicked Logout');
            amplitude.clearUserProperties();
            $state.go('login');

        }), function(error){
            console.log('error' + error);
        };
    };

    $scope.search = function(searchTerm){
        $state.go('user.searchResults' , { 'q': searchTerm});
        //Add search term to amplitude
        var searchProperties = {
            'searchTerm': searchTerm,
        };
        amplitude.logEvent('Clicked search', searchProperties);
    };

    $scope.gotoFeed = function() {
        $state.go('user.feed');
        amplitude.logEvent('Clicked Feed');
    };

    $scope.gotoLikes = function() {
        $state.go('user.likes');
        amplitude.logEvent('Clicked Likes');
    };

    $scope.gotoCollections = function() {
        $state.go('user.collections');
        amplitude.logEvent('Clicked Collections');
    };

    $scope.gotoAllRecipes = function() {
        $state.go('user.allRecipes');
        amplitude.logEvent('Clicked Discover');
    };

    $scope.gotoSubmitRecipe = function() {
        $state.go('user.submitRecipe', { reload: true });
        amplitude.logEvent('Clicked Submit recipe');
    };

    $scope.gotoEditRecipe = function() {
        $state.go('user.editRecipe', { reload: true });
        amplitude.logEvent('Clicked Edit recipe');
    };

    $scope.gotoSubmittedRecipes = function() {
        $state.go('user.submittedRecipes');
        amplitude.logEvent('Clicked Submitted recipes');
    };

    role();
    setupProfile();

});