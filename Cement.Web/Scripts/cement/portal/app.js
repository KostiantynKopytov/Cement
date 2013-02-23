defineModule('cement.portal.app',
    ['cement.core.controllers', 'cement.core.directives'],
    ['cement/core/controllers/PageController', 'cement/core/directives/placeholder', 'cement/core/directives/testmodule'],
    ['$routeProvider', '$locationProvider', 'TemplateUrl', '$provide', '$controllerProvider',
        function($routeProvider, $locationProvider, templateUrl) {
            console.log('cement portal init');

            require();

            $routeProvider.otherwise({
                templateUrl: templateUrl,
                controller: 'PageController'
            });
            $locationProvider.html5Mode(true);
        }]);
