define(['module!core', 'extensions'], function (module) {
    module.factory('coreService', ["$http", '$cacheFactory', function ($http, $cacheFactory) {
        var cache = $cacheFactory('$page');
        return {
            getPage: function (path) {
                var url = String.Format("/$page{0}", path || "");
                return $http.get(url, { cache: cache });
            },
            putPage: function (path, data) {
                var url = String.Format("/$page{0}", path || "");
                return $http.put(url, data).success(function () {
                    cache.removeAll();
                });
            },
            getMenu: function (path) {
                var url = String.Format("/$menu{0}", path || "");
                return $http.get(url, { cache: cache });
            }
        };
    }]);
});