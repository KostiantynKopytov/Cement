define(['module!portal', 'extensions', 'json!./*.html~name'], function(module, extensions, templates) {
    module.directive('navigation', ['coreService', '$location', function(coreService, $location) {
        return {
            restrict: 'E',
            controller: function($scope, $element, $attrs) {
                coreService.getMenu().success(function(menu) {
                    $scope.menu = menu;
                });

                $scope.navClass = function(page) {
                    var currentRoute = $location.path() || '/home';
                    return page === currentRoute.toLowerCase() ? 'active' : '';
                };
            }
        };
    }]);
});