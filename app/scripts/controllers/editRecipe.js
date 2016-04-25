'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:EditRecipeCtrl
 * @description
 * # EditRecipeCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('EditRecipeCtrl',
    function ($scope, FoodBlogger, Recipe, Upload, $state, ModalService) {


    amplitude.logEvent('Edit recipe page');
    $scope.recipe ={};
    $scope.success= false;
    $scope.showForm= false;
    $scope.edited= false;
    $scope.deleted= false;
    var current_food_blogger ={}
    var collection_tags ={}
    var diet_tags ={}
    var category_tags ={}
    $scope.tempImage ={};
    $scope.fromImageUrl= false;
    $scope.fromImageLocal= false;
    $scope.loading= false;
    $scope.editingRecipe= false;
    $scope.limit = 3;
    var checked;

    $scope.processForm = function() {
        $scope.loading= true;
        amplitude.logEvent('Clicked to process recipe id');
        //get recipe information from database
        Recipe.$getRecipe($scope.recipe.local_id)
        .then(function( response ) {
            $scope.loading= false;
            $scope.fromImageUrl= true;

            //populate form with recipe information
            $scope.recipe.url = response.data.url;
            $scope.recipe.image_url = response.data.image_url;
            $scope.tempImage.picUrlFile=response.data.image_url;
            $scope.recipe.name = response.data.name;
            $scope.recipe.snippet = response.data.snippet;
            $scope.recipe.time = response.data.time;
            $scope.recipe.serving_size = response.data.serving_size;
            $scope.recipe.ingredients = response.data.ingredients;
            collection_tags = response.data.collection_tags;
            category_tags = response.data.category_tags;
            diet_tags = response.data.diet_tags;
            $scope.showForm = true;
            current_food_blogger = response.data.food_blogger;

            //get list of food bloggers
            FoodBlogger.$getFoodBloggersList()
            .then(function(response){
                $scope.food_blogger_list = response.data;
                $scope.recipe.food_blogger = current_food_blogger.id.toString();
            });

            //get list of collection tags
            FoodBlogger.$getCollectionTagsList()
            .then(function(response){
                $scope.collection_tags = response.data;

                //check the collection ags for this recips
                for (var i in collection_tags){
                    console.log(collection_tags[i].name);
                    for(var j in $scope.collection_tags){
                        if (collection_tags[i].name === $scope.collection_tags[j].name){
                        $scope.collection_tags[j].selected = 'Y'
                        }
                    }
                }
            });

            //get list of diet tags
            FoodBlogger.$getDietTagsList()
            .then(function(response){
                $scope.diet_tags = response.data;

                //check the diet ags for this recipe
                for (var i in diet_tags){
                    for(var j in $scope.diet_tags){
                        if (diet_tags[i].name === $scope.diet_tags[j].name){
                        $scope.diet_tags[j].selected = 'Y'
                        }
                    }
                }
            });

            //get list of category tags
            FoodBlogger.$getCategoryTagsList()
            .then(function(response){
                $scope.category_tags = response.data;

                //check the collection ags for this recips
                for (var i in category_tags){
                    console.log(category_tags[i].name);
                    for(var j in $scope.category_tags){
                        if (category_tags[i].name === $scope.category_tags[j].name){
                        $scope.category_tags[j].selected = 'Y'
                        }
                    }
                }
            });
        });
    };

    $scope.scrapeForm = function() {
        //get recipe information from database
        amplitude.logEvent('Clicked scrape url in edit recipe');
        FoodBlogger.$scrapeRecipe($scope.recipe.url)
        .success(function(response){

            console.log(response);

            $scope.recipe.url = response.url;
            $scope.recipe.image_url = response.image_url;
            $scope.recipe.name = response.name;
            $scope.recipe.snippet = response.snippet;
            $scope.recipe.time = response.time;
            $scope.recipe.serving_size = response.serving_size;
            $scope.recipe.ingredients = response.ingredients;

            if (response.image_url){
                $scope.imageUploading= true;
                FoodBlogger.$getTempImageUrl($scope.recipe.image_url)
                .success(function(response){
                    $scope.imageUploading= false;
                    $scope.tempImage.picUrlFile=response;
                    $scope.tempImage.fileName = response.substring(response.lastIndexOf('/')+1);

                }), function(error){
                    console.log('error' + error);
                };
            }

        }).catch(function(error){
            console.log(error.data);
            ModalService.showModal({
                templateUrl: 'views/modal_error.html',
                controller: "ModalCtrl",
                inputs: {
                    message: error.data.error
                }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function() {
                        // $scope.message = "You said " + result;
                });
            });
            amplitude.logEvent('error');
        });
    };

    $scope.submitForm = function() {

        console.log(Upload.dataUrltoBlob($scope.tempImage.croppedDataUrl));

        amplitude.logEvent('Clicked edit recipe button');
        $scope.editingRecipe= true;
        //get selected collection_tags
        var c_ts = [];
        for(var i in $scope.collection_tags){
            if($scope.collection_tags[i].selected=='Y'){
                c_ts.push(JSON.parse('{"name":"' + $scope.collection_tags[i].name.trim() + '"}'));
            }
        }
        $scope.recipe.collection_tags = c_ts

        var d_ts = [];
        for(var i in $scope.diet_tags){
            if($scope.diet_tags[i].selected=='Y'){
                d_ts.push(JSON.parse('{"name":"' + $scope.diet_tags[i].name.trim() + '"}'));
            }
        }
        $scope.recipe.diet_tags = d_ts

        var cat_ts = [];
        for(var i in $scope.category_tags){
            if($scope.category_tags[i].selected=='Y'){
                cat_ts.push(JSON.parse('{"name":"' + $scope.category_tags[i].name.trim() + '"}'));
            }
        }
        $scope.recipe.category_tags = cat_ts

        FoodBlogger.$editRecipe($scope.recipe.local_id, angular.toJson($scope.recipe), Upload.dataUrltoBlob($scope.tempImage.croppedDataUrl), $scope.tempImage.fileName )
        .success(function(response) {
            $scope.editingRecipe= false;
            $scope.success= true;
            $scope.edited= true;
            $scope.local_id = response.local_id;

        }), function(error){
            console.log('error' + error);
        };
    };

    $scope.uploadFromLocal= function(){
        $scope.fromImageUrl= false;
        $scope.fromImageLocal= true;
    };

    $scope.refreshImageUrl = function(imageUrl){
        $scope.fromImageUrl= true;
        $scope.fromImageLocal= false;
        $scope.imageUploading= true;
        FoodBlogger.$getTempImageUrl(imageUrl)
        .success(function(response){
            $scope.imageUploading= false;
            $scope.tempImage.picUrlFile=response;
            $scope.tempImage.fileName = response.substring(response.lastIndexOf('/')+1);
        });
    };

    $scope.deleteIngredient = function($index, recipe) {
        recipe.ingredients.splice($index, 1);
    };

    $scope.deleteRecipe = function(local_id) {

        FoodBlogger.$deleteRecipe(local_id )
        .success(function(response) {
            $scope.success=true
            $scope.deleted=true
            $scope.local_id = local_id;

        }), function(error){
            console.log('error' + error);
        };

        var recipeProperties = {
            'id': local_id,
        };
        amplitude.logEvent('Clicked Delete recipe', recipeProperties);
    };

    $scope.addIngredient = function() {
        // var newIngredient = $scope.recipe.ingredients.length+1;
        $scope.recipe.ingredients.push({});
    };

    $scope.editRecipeRefresh = function(){
        $state.transitionTo($state.current, {}, { reload: true, inherit: true, notify: true })
    }

    $scope.checkChangedTag = function() {

        checked = $scope.collection_tags.filter(function( tag ) {
            console.log( 'tag: ', tag );
            return tag.selected === "Y"
        });

        $scope.cl = checked.length;
    };

});