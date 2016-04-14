(function() {
    'use strict';

    define(function(require) {
        var angular = require('angular');

        angular
            .module('movies.moviesDataService', [
                'restangular'
            ])
            .factory('moviesDataService', MoviesDataService);

        MoviesDataService.$inject = [
            'Restangular'
        ];

        function MoviesDataService(Restangular) {
            return {
                getMovies: function() {
                    return Restangular.one('data/movies.json').get();
                }
            };
        }
    });
})();
