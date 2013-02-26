define(['../core/controllers/PageController',
        '../core/directives/requireDirective',
        '../core/directives/layout',
        '../core/directives/requireCss',
        '../core/directives/placeholder',
        '../core/directives/testmodule',
        '../core/widgets/navigation/directive'
    ], function() {
        var module = angular.module('cement.portal.app.factory', []);
        _.each(arguments, function (x) { x(module); })
        return module;
    });
