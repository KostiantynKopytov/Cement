define(['module!core', 'extensions', 'json!./$templates'], function (module, extensions, templates) {
    extensions.registerDirectives(module, 'navigation', templates, function (templateUrl) {
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