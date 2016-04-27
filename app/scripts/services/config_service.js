'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Config', function() {

    var config = {};

    //local - Backend
    config.$baseUrl = 'http://mykloudkitchen.com:8000';

    //AWS - Backend
    // config.$baseUrl = 'http://ltei-backend-dev-2.us-west-2.elasticbeanstalk.com'

    //Local - Recipe Scraper
    // config.$recipeScraperUrl = 'http://localhost:9292';

    //AWS - Recipe Scraper
    config.$recipeScraperUrl = 'http://recipescraper.lovetoeat.it';

    return config;
});