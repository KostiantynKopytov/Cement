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
                
                var sender = null;
                var senderIndex = 0;
                $(element).sortable({
                    connectWith: '[ct-placeholder]',
                    cursor: 'pointer',
                    cursorAt: { top: 0, left: 0 },
                    distance: 10,
                    forcePlaceholderSize: true,
                    forceHelperSize: true,
                    tolerance: "pointer",
                    scroll: false,
                    start: function (event, ui) {
                        console.log('start drag', ui);
                        $(element).sortable("refresh");
                        ui.placeholder.attr('style', '').addClass('placeholder-targetplace').html(ui.item.html());
                        sender = ui.item.parent().data('$scope');
                        senderIndex = ui.item.index();
                    },
                    remove: function (event, ui) {
                        console.log('remove', ui);
                    },
                    receive: function (event, ui) {
                        console.log('receive', ui);
                    },
                    update: function (event, ui) {
                        console.log('update', ui);
                    },
                    beforeStop: function (event, ui) {
                        console.log('beforeStop', ui);
                    },
                    sort: function (event, ui) {
                        console.log('sort', ui);
                    },
                    stop: function (event, ui) {
                        console.log('stop drag', ui);
                        var item = ui.item.data('$scope');

                        var receiver = ui.item.parent().data('$scope');
                        var receiverIndex = ui.item.index();

                        sender.widgets.splice(senderIndex, 1);
                        receiver.widgets = receiver.widgets || [];
                        receiver.widgets.splice(receiverIndex, 0, item.widget);
                        scope.$apply();
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
