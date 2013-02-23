defineModule({
    name: 'cement.portal.app',
    moduleDeps: ['cement.core.controllers', 'cement.core.directives'],
    fileDeps: ['cement/core/directives/placeholder', 'cement/core/directives/testmodule'],
    configFn: ['$routeProvider', '$locationProvider', 'TemplateUrl', '$provide', '$controllerProvider',
        function($routeProvider, $locationProvider, templateUrl) {
            $routeProvider.otherwise({
                templateUrl: templateUrl,
                controller: 'PageController'
            });
            $locationProvider.html5Mode(true);
        }]
});
