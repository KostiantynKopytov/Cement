requirejs.config(requireCfg);
requirejs.onError = function(error) {
    console.error('require error: ', error);
};

define(['angular', 'cement/portal/app.factory'], function (angular) {
    var module = angular.module('cement.portal.app', ['cement.portal.app.factory']);
    module.config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.otherwise({
                template: "<ng-include src='page.layoutUrl'></ng-include>",
                controller: 'PageController',
            });
            $locationProvider.html5Mode(true);
        }]);
    
    var html = document.getElementsByTagName('html');
    angular.bootstrap(html, ['cement.portal.app']);
});
