require(['../requirejs/config'], function() {
    require(['module!core!deps'], function(core) {
        core.config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
            }]);

        var html = document.getElementsByTagName('html');
        angular.bootstrap(html, ['core']);
    });
});