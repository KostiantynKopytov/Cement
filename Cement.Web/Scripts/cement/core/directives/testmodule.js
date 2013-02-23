define(['cement/core/directives'], function (core) {
    core.directive('testmodule', function ($compile) {
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
