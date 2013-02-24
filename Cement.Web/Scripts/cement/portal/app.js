require.config(requireCfg);

defineModule({
    name: 'cement.portal.app',
    moduleDeps: ['cement.core.controllers', 'cement.core.directives'],
    configFn: ['$routeProvider', '$locationProvider', '$provide', '$controllerProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider.otherwise({
                template: "<ng-include src='page.layout'></ng-include>",
                controller: 'PageController'
            });
            $locationProvider.html5Mode(true);
        }],
    callback: function() {
        var html = document.getElementsByTagName('html');
        angular.bootstrap(html, ['cement.portal.app']);
    }
});
