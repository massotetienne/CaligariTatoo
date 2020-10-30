module.exports = {

    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    limit: function (arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },   
    last: function (value, n) {
        return value.slice(-Math.abs(n))
    }, 
    limitChar: function (text, nb) {
        str = text
        return str.substring(0, nb) 
    },
    limitCharacter : function (text ,nb){
        str = text 
        return str.substring(0, nb) + "..."
    }
}