﻿define(['module!core'], function(module) {
    module.directive('layout', function() {
        return {
            restrict: 'E',
            link: function() {
                var links = $("link[toDelete='true']");
                links.remove();
            }
        };
    });
});