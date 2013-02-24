define(['angular'], function(angular) {
    var module = angular.module('cement.core.directives.requireDirective', []);
    module.directive('requireDirective', ['$q', function($q) {
        console.log('requireDirective loaded');
        return {
            replace: true,
            restrict: 'E',
            scope: {
            },
            link: function (scope, element, attrs) {
                var defer = $q.defer();
                require([attrs.name.replace(/[.]/g, '/')], function() {
                    console.log('requireDirective', attrs.name);
                    defer.resolve({});
                });
                return defer.promise;
            }
        };
    }]);
});
