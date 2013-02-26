define(['../core/controllers/PageController',
        '../core/directives/requireDirective',
        '../core/directives/layout',
        '../core/directives/requireCss',
        '../core/directives/placeholder',
        '../core/directives/testmodule',
        '../core/services/coreService',
        '../core/widgets/navigation/directive'
    ], function() {
        return angular.module('cement.portal.app.factory', ['core']);
    });