define(['module!core', 'extensions'], function (module) {
    module.factory('coreService', ["$http", function ($http) {
        var noop = function () { };
        return {
            getPage: function (path) {
                var url = String.Format("/$page{0}", path || "");
                return $http.get(url, { cache: true });
            },
            putPage: function (path, data) {
                var url = String.Format("/$page{0}", path || "");
                return $http.put(url, data);
            },
            getMenu: function () {
                return $http.get("/$menu", { cache: true });
            }
        };
    }]);
});