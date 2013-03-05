define(['jquery', 'underscore'], function($, _) {
    // ------ .Net string extensions ------ //
    String.Format = function() {
        var args = arguments;
        return args[0].replace(/\{(\d+)\}/gm, function(match, index) {
            index = parseInt(index, 10);
            return args[index + 1];
        });
    };
    String.prototype.capitalize = function() {
        return this.replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1 + p2.toUpperCase(); });
    };
    String.prototype.trim = function() {
        return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""));
    };
    String.prototype.endsWith = function(str) {
        return (this.match(str + "$") == str);
    };
    String.prototype.startsWith = function(str) {
        return (this.match("^" + str) == str);
    };

    // ------ jQuery extensions ------ //
    $.exists = function(selector) { return ($(selector).length > 0); };
    $.fn.exists = function() { return ($(this).length > 0); };

    //outer Html
    $.fn.outerHtml = function() {
        return $('<div />').html(this.clone()).html();
    };
    $.fn.transform = function() {
        var transform = String.Format.apply(null, arguments);
        return this.css('transform', transform).css('-webkit-transform', transform).css('-ms-transform', transform).css('-moz-transform', transform).css('-o-transform', transform);
    };
    $.fn.transformOrigin = function(x, y, z) {
        var origin = String.Format('{0} {1}', x, y, z);
        return this.css('transform-origin', origin).css('-webkit-transform-origin', origin).css('-ms-transform-origin', origin).css('-moz-transform-origin', origin).css('-o-transform-origin', origin);
    };

    var filter$ = function(key) {
        return key && key[0] !== '$' && key !== 'this';
    };

    var cleanClone = function (obj, visited) {
        visited = visited || [];
        if (visited.indexOf(obj) >= 0) {
            return obj;
        }

        visited.push(obj);

        if (!obj || typeof obj !== 'object') {
            return obj;
        }
       
        var result = $.isArray(obj) ? [] : {};
        var keys = Object.keys(obj).filter(filter$);
        keys.forEach(function (key) {
            var val = obj[key];
            if (typeof val !== 'function') {
                result[key] = cleanClone(val, visited);
            }
        });
        console.log('clone end:', result);
        return result;
    };

    var extend = function(obj) {
        return typeof(obj) === "object" ? $.extend.apply($, arguments) : arguments[arguments.length - 1];
    };

    return {
        cleanClone: cleanClone,
        extend: extend
    };
});