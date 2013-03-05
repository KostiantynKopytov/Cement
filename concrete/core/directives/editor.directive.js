define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctEditor', ['$compile', '$interpolate', function($compile, $interpolate) {
        return {
            restrict: 'A',
            compile: function(tElement, tAttrs) {
                tElement.append($('<div ng-include />').attr('src', 'editor.url'));

                return function(scope, element, attrs) {
                    var editorUrl = null;

                    element.addClass('editable');

                    var editButton = $('<button class="edit-button btn btn-mini" type="button" />').prepend($('<i class="icon-wrench"/>'));
                    editButton.on('click', function () {
                        scope.editor = {
                            context: ext.cleanClone(scope),
                            url: editorUrl,
                            ok: function() {
                                scope = ext.extend(scope, scope.editor.context);
                                console.log(scope);
                                delete scope.editor;
                            },
                            cancel: function() {
                                delete scope.editor;
                            }
                        };
                        scope.$apply();
                    });
                    element.append(editButton);

                    scope.$watch(function() { return $interpolate(attrs.ctEditor)(scope); }, function(url) {
                        editorUrl = url;
                    });
                };
            },
        };
    }]);
});