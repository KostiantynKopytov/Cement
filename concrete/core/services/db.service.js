define(['module!core', 'angular', 'extensions'], function(module, angular) {
    module.factory('dbService', ["$http", '$cacheFactory', function($http, $cacheFactory) {
        var caches = {};
        var cache = function(type) {
            return caches[type] || (caches[type] = $cacheFactory('$db$' + type));
        };
        var api = {
            getEntity: function(entityType, entityId) {
                var url = String.Format('/$entity/{0}/{1}', entityType, entityId);
                return $http.get(url, { cache: cache(entityType) });
            },
            putEntity: function(entityType, entityId, data) {
                var url = String.Format('/$entity/{0}/{1}', entityType, entityId);
                return $http.put(url, angular.toJson(data)).success(function() {
                    api.clearCache(entityType);
                });
            },
            clearCache: function(entityType) {
                cache(entityType).removeAll();
            }
        };
        return api;
    }]);
});