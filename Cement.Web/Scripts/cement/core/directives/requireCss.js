define(['module!core'], function(module) {
    module.directive('requireCss', function() {
        return {
            restrict: 'E',
            link: function($scope, $element, $attrs) {
                var selector = String.Format("link[href='{0}']", $attrs.href);
                var link = $(selector);

                if (!link.exists()) {
                    link = $('<link type="text/css" rel="stylesheet" />').attr('href', $attrs.href).appendTo('head');
                } else {
                    link.removeAttr('toDelete');
                }
                $scope.$on('$destroy', function() {
                    link.attr('toDelete', true);
                });
            }
        };
    });
});