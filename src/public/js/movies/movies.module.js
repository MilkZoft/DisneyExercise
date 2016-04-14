(function() {
    'use strict';

    define(function(require) {
        // Loading dependencies
        require([
            'restangular',
            'movies/movies.controller',

            // Services
            'movies/components/services/movies.module'
        ], function() {
            angular.bootstrap(document, ['moviesApp']);
        });

        var angular = require('angular');

        angular
            .module('moviesApp', [
                'restangular',
                'movies.moviesDataService',
                'ngSanitize'
            ])
            .config(MoviesAppConfig);

        MoviesAppConfig.$inject = [
            'RestangularProvider'
        ];

        function MoviesAppConfig(RestangularProvider) {
            RestangularProvider.setBaseUrl('http://localhost/DisneyExercise/');
            RestangularProvider.setDefaultHttpFields({
                withCredentials: true
            });
        }
    });
})();
