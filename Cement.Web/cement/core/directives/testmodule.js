define(['module!core'], function(module) {
    module.directive('testmodule', function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                settings: '='
            },
            template: "<div><h4>{{ settings.title }}</h4><div>{{ content }}</div></div>",
            link: function(scope, element, attrs) {
                scope.content = "teststst";
            }
        };
    });
});