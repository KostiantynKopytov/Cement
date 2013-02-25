define(['angular',
        'cement/core/controllers/PageController',
        'cement/core/directives/requireDirective',
        'cement/core/directives/requireCss',
        'cement/core/directives/placeholder',
        'cement/core/directives/testmodule',
        'cement/core/widgets/navigation/directive'
    ], function (angular) {
    var module = angular.module('cement.portal.app.factory', []);
    for (var i = 1; i < arguments.length; i++) {
        var child = arguments[i];
        child(module);
    }
});