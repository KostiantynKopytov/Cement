define(['angular'], function(angular) {
    angular.module('Cement.Directives').directive('testmodule', function() {
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
