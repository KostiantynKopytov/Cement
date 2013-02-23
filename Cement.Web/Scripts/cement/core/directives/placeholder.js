define([], function() {
    return {
        name: 'placeholder',
        factory: function ($compile) {
            return {
                replace: true,
                restrict: 'E',
                scope: {
                    module: '='
                },
                link: function(scope, element) {
                    element.replaceWith($compile("<" + scope.module.name + " settings='module.settings'>" + "</" + scope.module.name + ">")(scope));
                }
            };
        }
    };
});
