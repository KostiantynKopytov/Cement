define([], function() {
    return function(module) {
        module.directive('testmodule', function() {
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
    };
});
