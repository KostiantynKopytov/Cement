define(['angular',
        'cement/core/directives/requireDirective',
        'cement/core/directives/requireCss',
        'cement/core/directives/placeholder',
        'cement/core/directives/testmodule',
    ],
    function(angular) {
        return angular.module('cement.core.directives', [
            'cement.core.directives.requireDirective',
            'cement.core.directives.placeholder',
            'cement.core.directives.testmodule',
            'cement.core.directives.requireCss'
        ]);
//        for (var i = 1; i < arguments.length; i++) {
//            var directive = arguments[i];
//            module.directive(directive.name, directive.factory);
//        }
    }
);