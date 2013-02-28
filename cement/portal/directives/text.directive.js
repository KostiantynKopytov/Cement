define(['module!portal', 'jquery','extensions', 'json!./*.html~name'], function(module, $) {
    module.directive('text', [function () {
        return {
            restrict: 'E',
            controller: function($scope) {
                $scope.editMode = false;

                $scope.edit = function () {
                    $scope.newSettings = $.extend({}, $scope.widget.settings);
                    $scope.editMode = true;
                };

                $scope.buttons = {
                    'Ok': function () {
                        $scope.$apply(function() {
                            $scope.widget.settings = $.extend($scope.widget.settings, $scope.newSettings);
                            $scope.editMode = false;
                        });
                    },
                    'Cancel': function() {
                        $scope.$apply(function() {
                            $scope.editMode = false;
                        });
                    }
                };
            }
        };
    }]);
});