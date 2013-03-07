define(['module!portal', 'extensions'], function (module, extensions) {
    module.directive('ctNavigation', ['coreService', '$location', function(coreService, $location) {
        return {
            templateUrl: '/portal/widgets/navigation/navigation.widget.html',
            restrict: 'A',
            scope: {
                data: '=ctNavigation'
            },
            controller: function($scope, $element, $attrs) {
                $scope.$watch('data', function(url) {
                    coreService.getMenu(url || '/').success(function(menu) {
                        $scope.menu = menu.filter(function(val) {
                            return val._id == '/';
                        });
                    });
                });

                $scope.navClass = function(page) {
                    var currentRoute = $location.path() || '/';
                    return page === currentRoute.toLowerCase() ? 'active' : '';
                };
            }
        };
    }]);
});