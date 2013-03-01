define(['module!portal', 'jquery', 'name!.'], function(module, $, widgetUrl) {
    module.controller('text.controller', ['$scope', function($scope) {
        $scope.edit = function() {
            $scope.editorUrl = widgetUrl + "/text.editor.html";
            $scope.newSettings = $.extend({}, $scope.widget.settings);
        };

        $scope.ok = function() {
            $scope.widget.settings = $.extend($scope.widget.settings, $scope.newSettings);
            $scope.editorUrl = null;
        };

        $scope.cancel = function() {
            $scope.editorUrl = null;
        };
    }]);
});
