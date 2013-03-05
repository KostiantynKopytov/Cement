define(['jquery', 'module!core', 'extensions', 'jquery-ui'], function ($, module, ext) {
    module.directive('ctPlaceholder', [function() {
        return {
//            replace: true,
            template: '<div ct-widget="{{ widget.type }}" data="widget.data" ng-repeat="widget in widgets"></div>',
            restrict: 'A',
            scope: {
                widgets: '=ctPlaceholder'
            },
            link: function (scope, element) {
                var links = $("link[data-usage='0']");
                links.remove();

                var senderScope = null;
                var senderIndex = 0;

                var updateRatio = function (event, ui) {
                    var helper = $(ui.helper);
                    var helperWidth = helper.width();
                    var helperHeight = helper.height();
                    var minRatio = Math.min(1.0, window.screen.width / helperWidth / 3, window.screen.height / helperHeight / 3);
                    helper.transformOrigin("0%", "0%").transform('scale({0}, {1})', minRatio, minRatio);
                    helper.css('opacity', 0.5).width("auto").height("auto");
                };

                $(element).sortable({
                    connectWith: '[ct-placeholder]',
                    items: '>[ct-widget]',
                    cursor: 'pointer',
                    cursorAt: { left: 0, top: -32 },
                    distance: 10,
                    forcePlaceholderSize: false,
                    forceHelperSize: false,
                    tolerance: "pointer",
                    start: function (event, ui) {
                        ui.placeholder.attr('style', '').html(ui.item.clone().html()).addClass('ct-placeholder-targetplace');
                        senderScope = ui.item.parent().data('$scope');
                        senderIndex = ui.item.index();
                        console.log('start', senderScope, senderIndex);
                    },
                    change: updateRatio,
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
                    activeClass: 'ct-placeholder-active',
                    accept: '[ct-widget]'
                }).disableSelection();

                scope.$on('$destory', function () {
                    $(element).sortable('destroy');
                    $(element).droppable('destroy');
                });
            }
        };
    }]);
});
