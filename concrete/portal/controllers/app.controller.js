define(['module!portal'], function(module) {
    module.controller('AppController', ["$scope", "$location", "coreService", function($scope, $location, coreService) {
        $scope.$on("$locationChangeSuccess", function () {
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
            var item = null;
            var receiver = null;
            var receiverIndex = 0;
            var sender = null;
            var senderIndex = 0;
            $('.droppable.ui-sortable').sortable('destroy');
            $('.droppable.ui-droppable').droppable('destroy');
            $('.droppable').sortable({
                connectWith: '.droppable',
                cursor: 'move',
                cursorAt: { top: 0, left: 0 },
                forcePlaceholderSize: true,
                forceHelperSize: true,
                tolerance: "pointer",
                distance: 10,
                over: function(event, ui) {
                    var parent = ui.placeholder.parent();
                    receiver = parent.data('$scope');
                    receiverIndex = ui.placeholder.index();
                },
                activate: function (event, ui) {
                    $(".droppable").sortable("refresh");
                    ui.placeholder && ui.placeholder.attr('style', '').addClass('placeholder-targetplace').html(ui.item.html());
                    var parent = ui.placeholder.parent();
                    receiver = parent.data('$scope');
                    receiverIndex = ui.placeholder.index();
                },
                receive: function (event, ui) {
                    item = ui.item.data('$scope');
                    sender = ui.sender.data('$scope');
                    senderIndex = sender.widgets.indexOf(item.widget);
                    console.log('beforeStop', sender.widgets, senderIndex, receiver.widgets, receiverIndex);

                    sender.widgets.splice(senderIndex, 1);
                    receiver.widgets = receiver.widgets || [];
                    receiver.widgets.splice(receiverIndex, 0, item.widget);
                    $scope.$apply();
                }
            }).droppable({
                greedy: true,
                activeClass: 'placeholder-active'
            }).disableSelection();
        });

    }]);
});