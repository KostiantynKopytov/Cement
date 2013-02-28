define(['module!core', 'extensions'], function(module) {
    module.directive('layout', function() {
        return {
            restrict: 'E',
            link: function() {
                var links = $("link[data-usage='0']");
                links.remove();
            }
        };
    });
});