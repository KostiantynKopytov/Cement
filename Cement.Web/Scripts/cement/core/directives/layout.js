define(['jquery'], function ($) {
    return function(module) {
        module.directive('layout', function() {
            return {
                restrict: 'E',
                link: function () {
                    var links = $("link[toDelete='true']");
                    console.log(links);
                    links.remove();
                }
            };
        });
    };
});