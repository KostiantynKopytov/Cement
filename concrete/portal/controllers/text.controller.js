define(['module!portal'], function (module) {
    module.controller('ctEditorControler', function () {
        return ['$scope', '$element', function (scope, element) {
            scope.edit = function () {
                scope.editorUrl = widgetUrl + "/text.editor.html";
                scope.newSettings = $.extend({}, scope.widget.settings);
            };

            scope.ok = function () {
                scope.widget.settings = $.extend(scope.widget.settings, scope.newSettings);
                scope.editorUrl = null;
            };

            scope.cancel = function () {
                scope.editorUrl = null;
            };
        }];
    });
});