define(['jquery', 'module!core', 'extensions', 'jquery-ui'], function ($, module) {
    module.directive('ctPlaceholder', ['$compile', function($compile) {
        return {
//            replace: true,
            template: '<div ct-widget="{{ widget.type }}" data="widget.data" ng-repeat="widget in widgets"></div>',
            restrict: 'A',
            scope: {
                widgets: '=ctPlaceholder'
            },
            link: function (scope, element, attrs) {
                var links = $("link[data-usage='0']");
                links.remove();

                var senderScope = null;
                var senderIndex = 0;

                $(element).sortable({
                    connectWith: '[ct-placeholder]',
                    items: '>[ct-widget]',
                    cursor: 'pointer',
                    cursorAt: { top: 0, left: 0 },
                    distance: 10,
                    forceHelperSize: true,
                    tolerance: "pointer",
                    start: function (event, ui) {
                        ui.placeholder.attr('style', '').addClass('ct-placeholder-targetplace').html(ui.item.clone().html());
                        senderScope = ui.item.parent().data('$scope');
                        senderIndex = ui.item.index();
                        console.log('start', senderScope, senderIndex);
                    },
                    stop: function (event, ui) {
                        var item = ui.item.data('$scope');

                        var recevierElement = ui.item.parent();
                        var receiverScope = recevierElement.data('$scope');
                        var receiverIndex = ui.item.index();

                        senderScope.widgets.splice(senderIndex, 1);
                        receiverScope.widgets = receiverScope.widgets || [];
                        receiverScope.widgets.splice(receiverIndex, 0, { type: item.type, data: item.data });
                        scope.$root.$apply();

                        console.log('stop', receiverScope, receiverIndex);
                    }
                }).droppable({
                    greedy: true,
                    activeClass: 'ct-placeholder-active'
                }).disableSelection();

                scope.$on('$destory', function () {
                    $(element).sortable('destroy');
                    $(element).droppable('destroy');
                });
            }
        };
    }]);
});
