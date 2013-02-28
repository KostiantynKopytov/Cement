define(['module!portal', 'extensions', 'json!./*.html~name'], function(module) {
    module.directive('text', [function () {
        return {
            restrict: 'E',
            controller: function($scope) {
                $scope.editMode = false;
                $scope.toggleEdit = function () {
                    $scope.editMode = !$scope.editMode;
                };

                $scope.newSettings = {
                    title: $scope.widget.settings.title,
                    content: $scope.widget.settings.content
                };

                $scope.applySettings = function () {
                    $scope.widget.settings.title = $scope.newSettings.title;
                    $scope.widget.settings.content = $scope.newSettings.content;
                    $scope.editMode = false;
                };
                $scope.clearForm = function () {
                    $scope.newSettings = {};
                    $scope.editMode = false;
                };
                
            }
        };
    }]);
});