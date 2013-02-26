define(['jquery', 'module!core'], function($, module) {
    module.directive('placeholder', function($compile) {
        return {
            replace: true,
            template: '<div class="placeholder"></div>',
            restrict: 'E',
            link: function(scope, element, attrs) {
                element.addClass(attrs.name);
                scope.$watch('page.placeholders.' + attrs.name + '.length', function() {
                    element.html('');
                    var val = scope.page.placeholders[attrs.name];
                    $.each(val, function(index, widget) {
                        var html = String.Format('<{0} settings="page.placeholders.{1}[{2}].settings"></{0}>', widget.directive, attrs.name, index);
                        var compiled = $compile(html)(scope);
                        element.append(compiled);
                    });
                });
            }
        };
    });
});