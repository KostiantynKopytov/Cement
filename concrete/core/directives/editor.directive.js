define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctEditor', ['$compile', '$interpolate', function($compile, $interpolate) {
        return {
            restrict: 'A',
            compile: function(tElement, tAttrs) {
                var editButton = $('<button class="edit-button btn btn-mini" type="button" />').prepend($('<i class="icon-wrench"/>'));
                tElement.append(editButton);
                tElement.append($('<div ng-include />').attr('src', 'editor.url'));

                return function(scope, element, attrs) {
                    var editorUrl = null;

                    editButton.on('click', function() {
                        console.log('click', scope);
                        scope.editor = {
                            context: ext.cleanClone(scope),
                            url: editorUrl,
                            ok: function() {
                                scope = ext.extend(scope, scope.editor.context);
                                delete scope.editor;
                            },
                            cancel: function() {
                                delete scope.editor;
                            }
                        };
                        scope.$apply();
                    });

                    attrs.$observe('ctEditor', function(value) {
                        editorUrl = $interpolate(value)(scope);
                    });
                };
            },
        };
    }]);
});