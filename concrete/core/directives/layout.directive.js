define(['module!core', 'extensions'], function (module) {
    module.directive('ctLayout', function() {
        return {
            restrict: 'E',
            link: function() {
                var links = $("link[data-usage='0']");
                links.remove();
            }
        };
    });
});