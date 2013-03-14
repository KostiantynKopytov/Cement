define(['module!core'], function(module) {

    var singlePageMode = true;

    module.config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(singlePageMode);
    }]);

    module.factory('locationService', ["$location", function($location) {
        return {
            path: function(val) {
                if (typeof val === "undefined") {
                    return singlePageMode ? $location.path() : window.location.pathname;
                } else {
                    if (singlePageMode) {
                        $location.path(val);
                    } else {
                        window.location.pathname = val;
                    }
                    return val;
                }
            }
        };
    }]);
});