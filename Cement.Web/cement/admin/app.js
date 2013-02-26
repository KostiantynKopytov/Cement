define([], function () {
    return angular.module('cement.admin', [],
        ['$routeProvider', '$locationProvider', 'TemplateUrl', '$provide', '$controllerProvider',
            function ($routeProvider, $locationProvider, templateUrl) {
                console.log('cement admin init');

                $routeProvider.otherwise({
                    templateUrl: templateUrl,
                    controller: 'cement/controllers/PageController'
                });
                $locationProvider.html5Mode(true);
            }]);
});