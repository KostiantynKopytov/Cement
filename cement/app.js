require(['../shared/requirejs/config'], function () {
    require(['module!core!deps', 'module!admin!deps', 'module!portal!deps'], function (core) {
        core.config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
            }]);

        var html = document.getElementsByTagName('html');
        angular.bootstrap(html, ['core', 'admin', 'portal']);
    });
});
