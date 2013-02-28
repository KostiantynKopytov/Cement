define(['module!core', 'extensions', 'jquery-ui'], function(module) {
    var template = "<div id='dialog'><div ng-transclude></div></div>";
    module.directive('jqueryDialog', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                showDialog: "=",
                title: "@",
                buttons: "="
            },
            link: function(scope, element, attrs) {
                $(element).dialog({
                    autoOpen: false,
                    modal: true,
                    close: function () {
                        if (scope.showDialog) {
                            scope.$apply('showDialog = false');
                        }
                    }
                });

                scope.$watch('showDialog', function (showDialog) {
                    var isOpen = $(element).dialog('isOpen');
                    if (showDialog && !isOpen) {
                        $(element).dialog('option', 'buttons', scope.buttons);
                        $(element).dialog('option', 'title', scope.title);
                        $(element).dialog('open');
                    } else if (!showDialog && isOpen) {
                        $(element).dialog('close');
                    }
                });
            },
            template: template
        };
    });
});