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
                cursor: 'move',
                cursorAt: { top: 0, left: 0 },
                helper: function() {
                    return $('<div/>');
                },
                tolerance: "pointer",
                distance: 10,
                activate: function (event, ui) {
                    ui.placeholder && ui.placeholder.attr('style', '').addClass('placeholder-targetplace').html(ui.item.html());
                    console.log('activate', event, ui);
                },
                receive: function (event, ui) {
                    console.log('receive', event, ui);
                },
            }).droppable({
                greedy: true,
                activeClass: 'placeholder-active'
            });
        });

    }]);
});