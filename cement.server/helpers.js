(function(module, require) {

    String.prototype.endsWith = function(str) {
        var indexOf = this.indexOf(str);
        return (indexOf >= 0) && ((indexOf + str.length) == this.length);
    };

    String.prototype.startsWith = function(str) {
        var indexOf = this.indexOf(str);
        return indexOf == 0;
    };

})(module, require);
