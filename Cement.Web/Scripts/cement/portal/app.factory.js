define(['angular-resource',
        '../core/controllers/PageController',
        '../core/directives/requireDirective',
        '../core/directives/layout',
        '../core/directives/requireCss',
        '../core/directives/placeholder',
        '../core/directives/testmodule',
        '../core/services/coreService',
        '../core/widgets/navigation/directive'
    ], function() {
        var module = angular.module('cement.portal.app.factory', ['ngResource']);
        var factories = _.toArray(arguments).slice(1);
        _.each(factories, function(registerFactory) {
                registerFactory(module);
        });
        return module;
    });