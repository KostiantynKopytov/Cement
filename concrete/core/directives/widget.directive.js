define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctWidget', ['$compile', function($compile) {
        return {
            restrict: 'A',
            scope: {
                type: '@ctWidget',
                data: '='
            },
            compile: function (tElement, tAttrs) {
                console.log(tElement);

                return function(scope, element) {
                    scope.$watch('type', function(type) {
                        var editorUrl = String.Format("/core/widgets/{0}/{0}.editor.html", scope.type);
                        tElement.append($('<div ng-include />').attr('src', 'editor.url'));
                        var jqEditor = null;
                        var jqWidget = $('<div ct-' + type + '="data"/>');

                        $.ajax({
                            url: editorUrl,
                            type: 'HEAD'
                        }).done(function() {
                            jqEditor = $('<div />').attr('ct-editor', editorUrl).addClass('editable');
                            jqEditor.append(jqWidget);
                        }).fail(function() {

                        }).always(function() {
                            var compiled = $compile(jqEditor || jqWidget)(scope);
                            element.html('').append(compiled);
                            scope.$apply();
                        });
                    });
                };
            }
        };
    }]);
});
