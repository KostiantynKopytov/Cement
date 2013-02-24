define(['angular',
        'cement/core/controllers/PageController',
        'cement/core/directives/requireDirective',
        'cement/core/directives/requireCss',
        'cement/core/directives/placeholder',
        'cement/core/directives/testmodule',
        //'cement/core/services/pageService'
    ], function (angular) {
    var dependsOn = [];
    var module = angular.module('cement.portal.app.factory', dependsOn);
    for (var i = 1; i < arguments.length; i++) {
        var child = arguments[i];
        child(module, dependsOn);
    }
});