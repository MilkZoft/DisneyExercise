(function() {
    'use strict';

    require.config({
        paths: {
            // General dependencies
            'angular': '../bower_components/angular/angular.min',
            'lodash': '../bower_components/lodash/dist/lodash.min',
            'restangular': '../bower_components/restangular/dist/restangular.min',

            // Local dependencies
            'moviesApp': 'movies/movies.module'
        },

        priority: ['angular'],

        shim: {
            'angular': {
                exports: 'angular'
            },

            'lodash': {
                exports: '_'
            },

            'restangular': {
                deps: ['angular', 'lodash'],
            },

            'moviesApp': {
                deps: ['angular']
            }
        }
    });

    require([
        'moviesApp'
    ]);
})();
