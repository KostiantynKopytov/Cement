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

                        var wrapper = $('<div />');
                        var widget = $('<div ct-' + type + '="data"/>').appendTo(wrapper);
                        var ribbon = $('<div class="ribbon" />').appendTo(wrapper);

                        if (editors.indexOf(editorUrl) >= 0) {
                            element.addClass('editable');

                            var editButton = $('<button class="widget-button btn btn-mini btn-1" type="button" ng-click="onedit()" />').prepend($('<i class="icon-edit"/>'));
                            scope.onedit = function() {
                                scope.showEditor = true;
                            };
                            ribbon.append(editButton);
                            $('<div ct-editor show="showEditor" data="data"/>').attr('src', '/' + editorUrl).appendTo(wrapper);
                        }

                        if (element.parent('[ct-placeholder]').exists()) {
                            var deleteButton = $('<button class="widget-button btn btn-mini btn-0" type="button" />').prepend($('<i class="icon-remove"/>'));
                            ribbon.append(deleteButton);

                            deleteButton.on('click', function() {
                                var placeholder = element.parent().data('$scope');
                                placeholder.widgets.splice(element.index(), 1);
                                scope.$parent.$apply();
                            });
                        }

                        var compiled = $compile(wrapper.children())(scope);
                        element.append(compiled);
                    });
                };
            }
        };
    }]);
});