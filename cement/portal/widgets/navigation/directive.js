define(['module!core', 'extensions'], function (module, extensions) {

    extensions.registerDirectives(module, 'navigation', ['template'], function(templateUrl) {
        return ['coreService', '$location', function(coreService, $location) {
            return {
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
                templateUrl: templateUrl
            };
        }];
    });
});