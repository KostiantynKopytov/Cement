define(['module!core', 'extensions'], function (module) {
    module.factory('coreService', ["$http", function ($http) {
        var noop = function () { };
        return {
            get: function (options, success, error) {
                var path = options.path;
                if (path && !path.startsWith("/")) {
                    path = "/" + path;
                }
                var url = String.Format("/${0}{1}", options.type, path || "");
                var getPromise = $http.get(url, { cache: true });
                return getPromise.success(success || noop).error(error || noop);
            }
        };
    }]);
});