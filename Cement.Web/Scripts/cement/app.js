angular.module('Cement', ["Cement.Controllers", "Cement.Directives"], ["$routeProvider", "$locationProvider", "TemplateUrl", function ($routeProvider, $locationProvider, templateUrl) {
    $routeProvider.otherwise({
        templateUrl: templateUrl,
        controller: 'PageController'
    });
    $locationProvider.html5Mode(true);
}]);

angular.module('Cement.Controllers', []);

angular.module('Cement.Directives', []);