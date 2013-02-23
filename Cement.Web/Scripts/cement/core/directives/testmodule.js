define([], function() {
    return {
        name: 'testmodule',
        factory: function($compile) {
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
        }
    };
});
