define(['../core/controllers/PageController',
        './controllers/AppController',
        '../core/directives/layout',
        '../core/directives/requireCss',
        '../core/directives/placeholder',
        '../core/services/coreService',
        '../core/widgets/navigation/directive',
        '../core/widgets/text/directive'
    ], function() {
        return angular.module('cement.portal.app.factory', ['core']);
    });