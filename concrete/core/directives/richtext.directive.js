define(['jquery', 'module!core', 'libs/markitup/sets/default/set', 'jquery-markitup', 'css!libs/markitup/sets/default/style'], function ($, module, markitupSettings) {
    module.directive('ctRichText', function () {
        return {
            restrict: 'AC',
            link: function (scope, element, $attrs) {
                markitupSettings.afterInsert = function () {
                    //scope.$root.$apply();
                };
                $(element).markItUp(markitupSettings);
            }
        };
    });
});