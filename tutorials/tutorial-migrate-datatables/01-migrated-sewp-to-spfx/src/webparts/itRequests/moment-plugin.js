// UMD
(
  function (factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
      // AMD
      define(['jquery'], function ($) {
        return factory($, window, document);
      });
    } else if (typeof exports === 'object') {
      // CommonJS
      module.exports = function (root, $) {
        if (!root) {
          root = window;
        }

        if (!$) {
          $ = typeof window !== 'undefined'
            ? require('jquery')
            : require('jquery')(root);
        }

        return factory($, root, root.document);
      };
    } else {
      // Browser
      factory(jQuery, window, document);
    }
  }

  (function ($, window, document) {
    $.fn.dataTable.render.moment = function (from, to, locale) {
      // Argument shifting
      if (arguments.length === 1) {
        locale = 'en';
        to = from;
        from = 'YYYY-MM-DD';
      } else if (arguments.length === 2) {
        locale = 'en';
      }

      return function (d, type, row) {
        var moment = require('moment');
        var m = moment(d, from, locale, true);

        // Order and type get a number value from Moment, everything else
        // sees the rendered value
        return m.format(type === 'sort' || type === 'type' ? 'x' : to);
      };
    };
  })
);