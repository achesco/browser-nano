var _ = module.exports = {
    
    extend: function (obj) {
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];
            for (prop in source) {
                if (hasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    },
    
    clone: function(obj) {
        return _.extend({}, obj);
    },

    isEmpty: function (obj) {
        if (obj === null) return true;
        return Object.keys(obj).length === 0;
    }
}