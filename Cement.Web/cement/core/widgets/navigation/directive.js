define(['module!core'], function(module) {
    module.directive('navigation', ['coreService', '$location', function(coreService, $location) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                settings: '='
            },
            controller: function($scope, $element, $attrs) {
                coreService.get({ type: 'menu' }, function(menu) {
                    $scope.menu = menu;
                });

                $scope.navClass = function(page) {
                    var currentRoute = $location.path() || '/home';
                    return page === currentRoute.toLowerCase() ? 'active' : '';
                };
            },
            templateUrl: "/cement/core/widgets/navigation/template.html"
        };
    }]);
});