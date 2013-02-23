define(['angular'], function(angular) {
    angular.module('Cement.Directives').directive('placeholder', function($compile) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                module: '='
            },
            link: function(scope, element, attrs) {
                element.replaceWith($compile("<" + scope.module.name + " settings='module.settings'>" + "</" + scope.module.name + ">")(scope));

            }
        };
    });
});
