define(['module!portal', 'jquery','extensions', 'json!./*.html~name'], function(module, $) {
    module.directive('text', [function () {
        return {
            restrict: 'E',
            controller: function($scope) {
                $scope.editMode = false;

                $scope.edit = function () {
                    $scope.editorUrl = '/portal/widgets/text/text.editor.html';
                    $scope.newSettings = $.extend({}, $scope.widget.settings);
                };

                $scope.ok = function() {
                    $scope.widget.settings = $.extend($scope.widget.settings, $scope.newSettings);
                    $scope.editorUrl = null;
                };

                $scope.cancel = function () {
                    $scope.editorUrl = null;
                };
            }
        };
    }]);
});