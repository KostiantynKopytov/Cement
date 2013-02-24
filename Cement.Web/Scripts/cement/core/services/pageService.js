define(['angular', 'angular-resource'], function (angular) {
    return angular.module('cement.core.services.pageService', ['ngResource'], function ($provide) {
        $provide.factory('pageService', ["$resource", function ($resource) {
            return $resource('/core/~page?path=:path');
        }]);
    });
});
