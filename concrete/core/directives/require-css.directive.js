define(['jquery', 'module!core', 'require', 'extensions'], function($, module, require, ext) {
    module.directive('ctRequireCss', ['$compile', function($compile) {
        return {
            restrict: 'A',
            compile: function(tElement, tAttrs) {
                tElement.hide();
                return function (scope, element, attrs) {
                    var name = attrs.ctRequireCss;
                    require(['css!' + name], function () {
                        element.removeAttr("style");

                        scope.$on('$destroy', function () {
                            var selector = String.Format("style[data-href='{0}']", name);
                            var link = $(selector);
                            link.attr('data-usage', (link.attr('data-usage') || 0) - 1);
                        });
                    });
                };
            }
        };
    }]);
});