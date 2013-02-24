define(['angular', 'angular-resource'], function (angular) {
    return angular.module('cement.core.services.pageService', ['ngResource'], function ($provide) {
        console.log('pageService');
        $provide.factory('pageService', ["$resource", function ($resource) {
            return $resource('/core/~page?path=:path');
        }]);
    });
});
