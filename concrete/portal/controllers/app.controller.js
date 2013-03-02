define(['module!portal'], function(module) {
    module.controller('AppController', ["$scope", "$location", "coreService", function($scope, $location, coreService) {
        $scope.$on("$locationChangeStart", function() {
            coreService.getPage($location.path()).success(function (page) {
                $scope.page = page || {};
            }).error(function() {
                // TODO: handle this
                $scope.page = {};
            });
        });

        $scope.moveWidget = function(source, destination) {
            var widget = source.splice(0, 1);
            if (widget.length > 0) {
                destination.push(widget[0]);
            }
        };

        $scope.changeTitle = function() {
            $scope.page.placeholders.left[0].settings.title += " vasya";
        };
        
        $scope.$watch(function () {
            return $('[ct-placeholder], [ct-widget]').length;
        }, function () {
            console.log('refresh drag & drop');
            $('[ct-placeholder].ui-sortable').sortable('destroy');
            $('[ct-placeholder].ui-droppable').droppable('destroy');
            $('[ct-placeholder]').sortable({
                connectWith: '[ct-placeholder]',
                cursor: 'pointer',
                cursorAt: { top: -10, left: -10 },
                distance: 5
            }).droppable({
                hoverClass: 'ui-state-hover',
                greedy: true
//                activeClass: 'ui-state-active'
            });
        });

    }]);
});