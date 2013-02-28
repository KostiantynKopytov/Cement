define(['jquery', '../module'], function ($, module) {
    module.directive('requireCss', function() {
        return {
            restrict: 'E',
            scope: {},
            link: function($scope, $element, $attrs) {
                var selector = String.Format("link[href='{0}']", $attrs.href);
                var link = $(selector);

                if (!link.exists()) {
                    link = $('<link type="text/css" rel="stylesheet" />').attr("data-usage", "1").attr('href', $attrs.href).appendTo('head');
                } else {
                    link.attr('data-usage', link.attr('data-usage') - (-1));
                }
                
                $scope.$on('$destroy', function() {
                    link.attr('data-usage', link.attr('data-usage') - 1);
                });
            }
        };
    });
});