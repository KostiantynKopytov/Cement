requirejs.config(requireCfg);
requirejs.onError = function(error) {
    console.error('require error: ', error);
};

define(['angular', 'angular-resource', 'cement/core/controllers', 'cement/core/directives', 'cement/core/services'], function (angular) {
    var module = angular.module('cement.portal.app', ['ngResource', 'cement.core.controllers', 'cement.core.directives', 'cement.core.services']);
    module.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider.otherwise({
                template: "<ng-include src='page.layout'></ng-include>",
                controller: 'PageController',
//                resolve: {
//                    delay: function($q, $resource, $location) {
//                        var delay = $q.defer();
//                        var pageService = $resource('/core/~page' + $location.$$path);
//                        console.log('loading page:', pageService, $location.$$path);
//                        pageService.get({}, function (x) {
//                            console.log('loaded page:', x);
//                            delay.resolve({layout: 'Page2'}); // BUG: use result x
//                        });
//                        return delay.promise;
//                    }
//                }
            });
            $locationProvider.html5Mode(true);
        }]);
    
    var html = document.getElementsByTagName('html');
    angular.bootstrap(html, ['cement.portal.app']);
});
