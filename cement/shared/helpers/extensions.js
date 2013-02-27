﻿define(['jquery', 'underscore'], function ($, _) {
    // ------ .Net string extensions ------ //
    String.Format = function () {
        var args = arguments;
        return args[0].replace(/\{(\d+)\}/gm, function (match, index) {
            index = parseInt(index);
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
    
    // ------ Array extensions ------ //
    Array.prototype.forEach = function(callback) {
        _.each(this, callback);
    };
    Array.prototype.contains = function (val) {
        _.contains(this, val);
    };
    
    // ------ jQuery extensions ------ //
    $.exists = function (selector) { return ($(selector).length > 0); };
    $.fn.exists = function () { return ($(this).length > 0); };

    //outer Html
    $.fn.outerHtml = function () {
        return $('<div />').html(this.clone()).html();
    };

    return {
        registerDirectives: function (module, name, templates, factory) {
            templates.forEach(function (template) {
                var templateUrl = String.Format('/portal/widgets/{0}/{1}.html', name, template);
                module.directive(name + template.capitalize(), factory(templateUrl));
            });
        }
    };

});
