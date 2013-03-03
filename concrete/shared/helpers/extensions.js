define(['jquery', 'underscore'], function ($, _) {
    // ------ .Net string extensions ------ //
    String.Format = function () {
        var args = arguments;
        return args[0].replace(/\{(\d+)\}/gm, function (match, index) {
            index = parseInt(index, 10);
            return args[index + 1];
        });
    };
    String.prototype.capitalize = function () {
        return this.replace(/(^|\s)([a-z])/g, function (m, p1, p2) { return p1 + p2.toUpperCase(); });
    };
    String.prototype.trim = function () {
        return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""));
    };
    String.prototype.endsWith = function (str) {
        return (this.match(str + "$") == str);
    };
    String.prototype.startsWith = function (str) {
        return (this.match("^" + str) == str);
    };
    
    // ------ jQuery extensions ------ //
    $.exists = function (selector) { return ($(selector).length > 0); };
    $.fn.exists = function () { return ($(this).length > 0); };

    //outer Html
    $.fn.outerHtml = function () {
        return $('<div />').html(this.clone()).html();
    };

    return {
        extend: function (obj) {
            return typeof(obj) === "Object" ? $.extend.apply($, arguments) : arguments[arguments.length - 1];
        }
    };
});
