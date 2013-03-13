define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctWidget', ['$compile', function($compile) {
        return {
            restrict: 'A',
            scope: {
                type: '@ctWidget',
                data: '='
            },
            link: function(scope, element) {
                scope.$watch('type', function (type) {
                    var editorUrl = String.Format("/core/widgets/{0}/{0}.editor.html", scope.type);
                    var jqWidget = $('<div ct-' + type + '="data"/>');

                    $.ajax({
                        url: editorUrl,
                        type: 'HEAD'
                    }).done(function () {
                        jqWidget.attr('ct-editor', editorUrl);
                    }).fail(function () {
                        
                    }).always(function () {
                        var compiled = $compile(jqWidget)(scope);
                        element.html('').append(compiled);
                        scope.$apply();
                    });
                });
            }
        };
    }]);
});
