define([], function() {
    return function(module) {
        module.directive('requireDirective', ['$q', '$rootScope', function($q, $rootScope) {
            console.log('requireDirective loaded', $rootScope);
            return {
                replace: true,
                restrict: 'E',
                scope: {
                    
                },
                link: function(scope, element, attrs) {
                    var defer = $q.defer();
                    require([attrs.name.replace(/[.]/g, '/')], function() {
                        console.log('requireDirective', attrs.name);
                        angular.module('hack', [attrs.name], function() {
                            console.log('requireDirective', attrs.name);
                            defer.resolve({});
                        });
                    });
                    return defer.promise;
                }
            };
        }]);
    };
});
