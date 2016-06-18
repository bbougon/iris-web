'use strict';

angular.module('scroll', [])
    .controller('ScrollController', ['$scope', '$location', '$anchorScroll',
        function ($scope, $location, $anchorScroll) {
            $scope.backToTop = function () {
                $location.hash('header');
                $anchorScroll();
            };
        }]);