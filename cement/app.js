define(['require', '../shared/requirejs/config'], function (require) {
    require(['module!core', 'module!admin', 'module!portal'], function () {
        var module = angular.module('cement.portal.app', ['core', 'admin', 'portal']);
        module.config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
            }]);

        var html = document.getElementsByTagName('html');
        angular.bootstrap(html, ['cement.portal.app']);
    });
});
