define(['module!core', 'angular-resource'], function (module) {
    module.requires = _.union(module.requires, ['ngResource']);
    module.factory('coreService', ["$resource", function($resource) {
        return $resource('/core/~:type?path=:path');
    }]);
});