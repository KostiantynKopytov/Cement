define(['_', 'angular-resource'], function(_) {
    return function(module) {
        module.requires = _.union(module.requires, ['ngResource']);
        module.directive('navigation', ['$resource', '$location', function ($resource, $location) {
            return {
                replace: true,
                restrict: 'E',
                scope: {
                    settings: '='
                },
                controller: function($scope, $element, $attrs) {
                    $resource("/core/~menu/").get({}, function(menu) {
                        $scope.menu = menu;
                    });

                    $scope.navClass = function(page) {
                        var currentRoute = $location.path() || '/home';
                        return page === currentRoute.toLowerCase() ? 'active' : '';
                    };
                },
                templateUrl: "/scripts/cement/core/widgets/navigation/template.html"
            };
        }]);
    };
});