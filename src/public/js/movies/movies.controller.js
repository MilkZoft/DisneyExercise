(function() {
    'use strict';

    define(function(require) {
        var angular = require('angular');
        var _ = require('lodash');

        angular
            .module('moviesApp')
            .controller('MoviesAppController', MoviesAppController)
            .filter('time', TimeFilter);

        function TimeFilter() {
            return function(seconds) {
                var hours = seconds / 3600;
                var minutes;
                var remainingSeconds;

                hours -= hours - Math.floor(hours);
                remainingSeconds = seconds - (hours * 3600);
                minutes = Math.ceil(remainingSeconds / 60);

                return hours + 'hrs ' + minutes + 'mins';
            };
        }

        MoviesAppController.$inject = [
            'moviesDataService',
            '$sce'
        ];

        function MoviesAppController(moviesDataService, $sce) {
            var vm = this;

            vm.sortBy = sortBy;
            vm.search = search;
            vm.showMovie = showMovie;
            vm.goBack = '';

            moviesDataService
                .getMovies()
                .then(function(response) {
                    vm.movies = response.items;
                    vm.filteredMovies = vm.movies;
                    vm.moviesCount = vm.movies.length;
                });

            function sortBy(type) {
                vm.filteredMovies = vm.movies;

                if (type === 'date') {
                    vm.filteredMovies = vm.movies.sort(function(a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });
                } else if (type === 'name') {
                    vm.filteredMovies = vm.movies.sort(function(a, b) {
                        if (a.title < b.title) return -1;
                        if (a.title > b.title) return 1;

                        return 0;
                    });
                }
            }

            function search(term) {
                vm.filteredMovies = vm.movies;

                if (term) {
                    vm.filteredMovies = vm.movies.filter(function(movie) {
                        return movie.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
                    });
                }
            }

            function showMovie(slug) {
                console.log('entra');
                vm.filteredMovies = vm.movies;

                if (slug) {
                    vm.filteredMovies = vm.movies.filter(function(item) {
                        return item.slug === slug;
                    });

                    if (vm.filteredMovies.length === 1) {
                        vm.goBack = $sce.trustAsHtml('<a class="go-back" href="index.html">Go Back</a>');
                    }
                }
            }
        }
    });
})();
