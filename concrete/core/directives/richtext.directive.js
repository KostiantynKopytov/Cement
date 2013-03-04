define(['jquery', 'module!core', 'libs/markitup/sets/default/set', 'jquery-markitup', 'css!libs/markitup/sets/default/style'], function ($, module, markitupSettings) {
    module.directive('ctRichText', function () {
        return {
            restrict: 'A',
            scope: {},
            link: function ($scope, element, $attrs) {
                $(element).markItUp(markitupSettings);
            }
        };
    });
});