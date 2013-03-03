define(['module!core', 'extensions'], function (module) {
    module.factory('dbService', ["$http", '$cacheFactory', function ($http, $cacheFactory) {
        var cache = $cacheFactory('$db');
        return {
            getEntity: function (entityType, entityId) {
                var url = String.Format("/$entity/{0}/{1}", entityType, entityId);
                return $http.get(url, { cache: cache });
            },
            putEntity: function (entityType, entityId, data) {
                var url = String.Format("/$entity/{0}/{1}", entityType, entityId);
                return $http.put(url, data).success(function () {
                    cache.removeAll();
                });
            }
        };
    }]);
});