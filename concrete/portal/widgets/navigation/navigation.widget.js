define(['module!portal', 'extensions'], function (module, extensions) {
    module.directive('ctNavigation', ['coreService', '$location', function(coreService, $location) {
        return {
            templateUrl: '/portal/widgets/navigation/navigation.widget.html',
            restrict: 'A',
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