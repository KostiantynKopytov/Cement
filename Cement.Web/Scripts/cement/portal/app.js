define(['../requirejs/config'], function () {
    define('cement-app', ['app.factory'], function () {
        var module = angular.module('cement.portal.app', ['cement.portal.app.factory']);
        module.config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider.otherwise({
                    template: "<ng-include src='page.layoutUrl'></ng-include>",
                    controller: 'PageController',
                });
                $locationProvider.html5Mode(true);
            }]);

        var html = document.getElementsByTagName('html');
        angular.bootstrap(html, ['cement.portal.app']);
    });

    require(['cement-app'], function () {
    });
});
