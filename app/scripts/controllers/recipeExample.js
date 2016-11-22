'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:RecipepickCtrl
 * @description
 * # RecipepickCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('RecipeExampleCtrl',
        function ($scope, $window, $stateParams, Recipe, $state, ModalService, $element) {

        amplitude.logEvent('Recipe Example Details page');
        var id = $stateParams.id;
        // var $scope.heart;

        Recipe.$getRecipeExample(id)
        .then(function( response ) {
            $scope.recipe = response.data;
            var c_t = response.data.collection_tags[0].name

            // Recipe.$getRelatedRecipes(c_t)
            // .then(function( response ) {

            //     var related_recipes = [];
            //     angular.forEach(response.data, function(recipe){
            //         if (recipe.local_id !== id){
            //         related_recipes.push(recipe);
            //         }
            //     });
            //     $scope.relatedRecipes = related_recipes;
            // });
        });

        $scope.gotoRecipe = function(recipe_url) {
            $window.open(recipe_url);
            amplitude.logEvent('Recipe blog link clicked');
        };

        $scope.gotoFbRecipes = function(blog_name) {
            $state.go('user.foodbloggerrecipes' , {'name': blog_name});
        };

        $scope.gotoBlog = function(blog_url) {
            $window.open(blog_url);
            amplitude.logEvent('Food Blogger blog link clicked');
        };

        $scope.likeClick = function(recipe_local_id){
            amplitude.logEvent('Recipe like clicked');
            Likes.$likeRecipe(recipe_local_id)
            .then(function(response){
                $scope.recipe.has_user_liked = response.data.has_user_liked;
                $scope.recipe.no_of_likes = response.data.no_of_likes;
            });
        };

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});
            var recipeProperties = {
                'id': id,
            };
            amplitude.logEvent('Clicked recipe details', recipeProperties);
        };

        $scope.gotoSignup = function(){
            //open modal
            $state.go('register');
        };


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
