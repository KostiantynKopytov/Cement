define(['angular'], function (angular) {
    var module = angular.module('cement.core.directives.testmodule', []);
    module.directive('testmodule', function () {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                settings: '='
            },
            template: "<div>{{ settings.title }}</div>",
            link: function(scope, element, attrs) {
            }
        };
    });
});
