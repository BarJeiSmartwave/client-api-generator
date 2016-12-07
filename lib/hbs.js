'use strict';

// setup custom helpers

module.exports = {
  setup: (handlebars) => {
    // source: http://stackoverflow.com/questions/14887677/handlebars-helper-functions-extract-property-names
    // context : object you wish to transform
    // options.fn will contain the HTML block
    handlebars.registerHelper('pairs', function(context, options) {
        var cells = [], html, k;
        for (k in context) {
            if (context.hasOwnProperty(k)) {
                html = options.fn({
                    key: k,
                    value: context[k]
                });
                cells.push(html);
            }
        }
        return cells.join('');
    });
  }
}
