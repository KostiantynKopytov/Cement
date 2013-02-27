define([
        '../core/directives/layout',
        '../core/directives/requireCss',
        '../core/directives/placeholder',
        '../core/directives/widget',
        '../core/services/coreService',
        './controllers/AppController',
        './widgets/navigation/directive',
        './widgets/text/directive',
        '../admin/widgets/editorPane/directive'
    ], function() {
        return angular.module('cement.portal.app.factory', ['core']);
    });