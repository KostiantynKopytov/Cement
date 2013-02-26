define([], function() {
    return function(module) {
        module.factory('coreService', ["$resource", function($resource) {
            return $resource('/core/~:type?path=:path');
        }]);
    };
});