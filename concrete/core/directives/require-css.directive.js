define(['jquery', 'module!core'], function($, module) {
    module.directive('ctRequireCss', function() {
        return {
            restrict: 'A',
            template: '',
            replace: true,
            scope: {},
            link: function($scope, $element, $attrs) {
                var selector = String.Format("link[href='{0}']", $attrs.ctRequireCss);
                var link = $(selector);

                if (!link.exists()) {
                    link = $('<link type="text/css" rel="stylesheet" />').attr("data-usage", "1").attr('href', $attrs.ctRequireCss).appendTo('head');
                } else {
                    link.attr('data-usage', (link.attr('data-usage') || 0) - (-1));
                }

                $scope.$on('$destroy', function() {
                    link.attr('data-usage', (link.attr('data-usage') || 0) - 1);
                });
            }
        };
    });
});