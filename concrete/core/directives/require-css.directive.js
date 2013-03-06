define(['jquery', 'module!core', 'require', 'extensions'], function($, module, require, ext) {
    module.directive('ctRequireCss', ['$compile', function($compile) {
        return {
            restrict: 'A',
            compile: function(tElement, tAttrs) {

                var content = tElement.contents();
                tElement.html('');

                return function(scope, element, attrs) {
                    var name = attrs.ctRequireCss;
                    require(['css!' + name], function (text) {
                        var link = ext.appendStyles(name, text);
                        link.attr('data-usage', (link.attr('data-usage') || 0) - (-1));

                        scope.$on('$destroy', function () {
                            link.attr('data-usage', (link.attr('data-usage') || 0) - 1);
                        });

                        var compiled = $compile($('<div />').append(content))(scope);
                        element.append(compiled.contents());
                        scope.$apply();
                    });
                };
            }
        };
    }]);
});