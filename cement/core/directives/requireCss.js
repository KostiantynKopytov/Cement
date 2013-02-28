define(['jquery', 'module!core'], function($, module) {
    module.directive('requireCss', function() {
        return {
            restrict: 'E',
            scope: {},
            link: function($scope, $element, $attrs) {
                var selector = String.Format("link[href='{0}']", $attrs.href);
                var link = $(selector);

                if (!link.exists()) {
                    link = $('<link type="text/css" rel="stylesheet" usage="1" />').attr('href', $attrs.href).appendTo('head');
                } else {
                    link.attr('usage', parseInt(link.attr('usage'), 10) + 1);
                }
                
                $scope.$on('$destroy', function() {
                    link.attr('usage', parseInt(link.attr('usage'), 10) - 1);
                });
            }
        };
    });
});