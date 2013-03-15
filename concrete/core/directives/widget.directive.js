define(['jquery', 'module!core', 'extensions', 'json!core/**/*.editor.html'], function($, module, ext, editors) {
    module.directive('ctWidget', ['$compile', function($compile) {
        return {
            restrict: 'A',
            scope: {
                type: '@ctWidget',
                data: '='
            },
            compile: function(tElement, tAttrs) {
                return function(scope, element) {
                    scope.$watch('type', function(type) {
                        var editorUrl = String.Format("core/widgets/{0}/{0}.editor.html", scope.type);

                        var jqWidget = $('<div><div ct-' + type + '="data"/></div>');

                        if (editors.indexOf(editorUrl) >= 0) {
                            element.addClass('editable');

                            var editButton = $('<button class="widget-button btn btn-mini btn-1" type="button" />').prepend($('<i class="icon-edit"/>'));
                            jqWidget.append(editButton);
                            jqWidget.append($('<div ng-include />').attr('src', 'editor.url'));

                            editButton.on('click', function() {
                                console.log('click', scope);
                                scope.editor = {
                                    data: ext.cleanClone(scope.data),
                                    url: "/" + editorUrl,
                                    ok: function() {
                                        scope.data = ext.extend(scope.data, scope.editor.data);
                                        delete scope.editor;
                                    },
                                    cancel: function() {
                                        delete scope.editor;
                                    }
                                };
                                scope.$apply();
                            });
                        }

                        if (element.parent('[ct-placeholder]').exists()) {
                            var deleteButton = $('<button class="widget-button btn btn-mini btn-0" type="button" />').prepend($('<i class="icon-remove"/>'));
                            jqWidget.append(deleteButton);

                            deleteButton.on('click', function() {
                                var placeholder = element.parent().data('$scope');
                                placeholder.widgets.splice(element.index(), 1);
                                scope.$parent.$apply();
                            });
                        }

                        var compiled = $compile(jqWidget.children())(scope);
                        element.append(compiled);
                    });
                };
            }
        };
    }]);
});