define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctWidget', ['$compile', function($compile) {
        return {
            restrict: 'A',
            scope: {
                type: '@ctWidget',
                data: '='
            },
            link: function(scope, element) {
                scope.$watch('type', function(type) {
                    var editorUrl = String.Format("/core/widgets/{0}/{0}.editor.html", scope.type);

                    var jqWidget = $('<div><div ct-' + type + '="data"/></div>');

                    $.ajax({
                        url: editorUrl,
                        type: 'HEAD'
                    }).done(function() {
                        element.addClass('editable');

                        var editButton = $('<button class="edit-button btn btn-mini" type="button" />').prepend($('<i class="icon-wrench"/>'));
                        jqWidget.append(editButton);
                        jqWidget.append($('<div ng-include />').attr('src', 'editor.url'));

                        editButton.on('click', function() {
                            console.log('click', scope);
                            scope.editor = {
                                data: ext.cleanClone(scope.data),
                                url: editorUrl,
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

                    }).fail(function() {

                    }).always(function() {
                        var compiled = $compile(jqWidget.children())(scope);
                        element.html('').append(compiled);
                        scope.$apply();
                    });
                });
            }
        };
    }]);
});