define(['jquery', 'module!core', 'extensions', 'jquery-ui'], function ($, module) {
    module.directive('ctPlaceholder', ['$compile', function() {
        return {
//            replace: true,
            template: '<div ct-widget widget="widget" ng-repeat="widget in widgets"></div>',
            restrict: 'EA',
            scope: {
                widgets: '='
            },
            link: function (scope, element, attrs) {
                var links = $("link[data-usage='0']");
                links.remove();
                
                var item = null;
                var receiver = null;
                var receiverIndex = 0;
                var sender = null;
                var senderIndex = 0;
                $(element).sortable({
                    connectWith: '[ct-placeholder]',
                    cursor: 'move',
                    cursorAt: { top: 0, left: 0 },
                    forcePlaceholderSize: true,
                    forceHelperSize: true,
                    tolerance: "pointer",
                    distance: 10,
                    over: function (event, ui) {
                        var parent = ui.placeholder.parent();
                        receiver = parent.data('$scope');
                        receiverIndex = ui.placeholder.index();
                    },
                    activate: function (event, ui) {
                        $("[ct-placeholder]").sortable("refresh");
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

                scope.$on('$destory', function() {
                    $(element).sortable('destroy');
                    $(element).droppable('destroy');
                });
            }
        };
    }]);
});
