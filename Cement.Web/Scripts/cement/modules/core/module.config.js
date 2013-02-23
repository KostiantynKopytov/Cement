define(['angular'], function(angular) {
    angular.module('init', []).config(['$provide', '$controllerProvider', function ($provide, $controllerProvider) {
        console.log('init');
        $provide.provider({
            $controller: {
                $get: ['$injector', '$window', '$q', function ($injector, $window, $q) {
//                    console.log('$get', $injector, $window, $q);
                    var fn = $controllerProvider.$get[2]($injector, $window);
                    return function (constructor, locals) {
//                        console.log('$get-inner', constructor, locals);
                        if (angular.isString(constructor)) {
                            var deferred = $q.defer();
                            require([constructor], function (controller) {
                                console.log('$get-inner-controller', controller);
                                deferred.resolve(fn(controller, locals));
                            });
        
                            return deferred.promise;
                        }
        
                        return fn(constructor, locals);
                    };
                }],
                register: function (name, constructor) {
                    console.log(name);
                    return $controllerProvider.register(name, constructor);
                }
            }
        });
    }]);

    angular.module('Cement', ['init'],
        ['$routeProvider', '$locationProvider', 'TemplateUrl', '$provide', '$controllerProvider',
            function($routeProvider, $locationProvider, templateUrl) {
                console.log('cement init');

                $routeProvider.otherwise({
                    templateUrl: templateUrl,
                    controller: 'cement/controllers/PageController'
                });
                $locationProvider.html5Mode(true);
            }]);

    angular.module('Cement.Controllers', []);

    angular.module('Cement.Directives', []);
});