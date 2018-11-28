// Wait for page load

$(window).on('load', function () {
  $('#wait-for-load').fadeOut(50);
});

// Back-to-top function

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('#back-to-top').fadeIn(200);
    } else {
      $('#back-to-top').fadeOut(200);
    }
  });
  // scroll body to 0px on click
  $('#back-to-top').on('click touch', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });

});

// Floating email UI

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#email-box').fadeIn(200);
    } else {
      $('#email-box').fadeOut(200);
    }
  });
});

//Header link to index

document.getElementById('header').onclick = function () {
  window.location = './index.html';
};

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
! function () {
  "use strict";

  function t(o) {
    if (!o) throw new Error("No options passed to Waypoint constructor");
    if (!o.element) throw new Error("No element option passed to Waypoint constructor");
    if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
    this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
  }
  var e = 0,
    i = {};
  t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t)
  }, t.prototype.trigger = function (t) {
    this.enabled && this.callback && this.callback.apply(this, t)
  }, t.prototype.destroy = function () {
    this.context.remove(this), this.group.remove(this), delete i[this.key]
  }, t.prototype.disable = function () {
    return this.enabled = !1, this
  }, t.prototype.enable = function () {
    return this.context.refresh(), this.enabled = !0, this
  }, t.prototype.next = function () {
    return this.group.next(this)
  }, t.prototype.previous = function () {
    return this.group.previous(this)
  }, t.invokeAll = function (t) {
    var e = [];
    for (var o in i) e.push(i[o]);
    for (var n = 0, r = e.length; r > n; n++) e[n][t]()
  }, t.destroyAll = function () {
    t.invokeAll("destroy")
  }, t.disableAll = function () {
    t.invokeAll("disable")
  }, t.enableAll = function () {
    t.Context.refreshAll();
    for (var e in i) i[e].enabled = !0;
    return this
  }, t.refreshAll = function () {
    t.Context.refreshAll()
  }, t.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight
  }, t.viewportWidth = function () {
    return document.documentElement.clientWidth
  }, t.adapters = [], t.defaults = {
    context: window,
    continuous: !0,
    enabled: !0,
    group: "default",
    horizontal: !1,
    offset: 0
  }, t.offsetAliases = {
    "bottom-in-view": function () {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    "right-in-view": function () {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }, window.Waypoint = t
}(),
function () {
  "use strict";

  function t(t) {
    window.setTimeout(t, 1e3 / 60)
  }

  function e(t) {
    this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }, this.waypoints = {
      vertical: {},
      horizontal: {}
    }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
  }
  var i = 0,
    o = {},
    n = window.Waypoint,
    r = window.onload;
  e.prototype.add = function (t) {
    var e = t.options.horizontal ? "horizontal" : "vertical";
    this.waypoints[e][t.key] = t, this.refresh()
  }, e.prototype.checkEmpty = function () {
    var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
      e = this.Adapter.isEmptyObject(this.waypoints.vertical),
      i = this.element == this.element.window;
    t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
  }, e.prototype.createThrottledResizeHandler = function () {
    function t() {
      e.handleResize(), e.didResize = !1
    }
    var e = this;
    this.adapter.on("resize.waypoints", function () {
      e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
    })
  }, e.prototype.createThrottledScrollHandler = function () {
    function t() {
      e.handleScroll(), e.didScroll = !1
    }
    var e = this;
    this.adapter.on("scroll.waypoints", function () {
      (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
    })
  }, e.prototype.handleResize = function () {
    n.Context.refreshAll()
  }, e.prototype.handleScroll = function () {
    var t = {},
      e = {
        horizontal: {
          newScroll: this.adapter.scrollLeft(),
          oldScroll: this.oldScroll.x,
          forward: "right",
          backward: "left"
        },
        vertical: {
          newScroll: this.adapter.scrollTop(),
          oldScroll: this.oldScroll.y,
          forward: "down",
          backward: "up"
        }
      };
    for (var i in e) {
      var o = e[i],
        n = o.newScroll > o.oldScroll,
        r = n ? o.forward : o.backward;
      for (var s in this.waypoints[i]) {
        var a = this.waypoints[i][s];
        if (null !== a.triggerPoint) {
          var l = o.oldScroll < a.triggerPoint,
            h = o.newScroll >= a.triggerPoint,
            p = l && h,
            u = !l && !h;
          (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
        }
      }
    }
    for (var c in t) t[c].flushTriggers();
    this.oldScroll = {
      x: e.horizontal.newScroll,
      y: e.vertical.newScroll
    }
  }, e.prototype.innerHeight = function () {
    return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
  }, e.prototype.remove = function (t) {
    delete this.waypoints[t.axis][t.key], this.checkEmpty()
  }, e.prototype.innerWidth = function () {
    return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
  }, e.prototype.destroy = function () {
    var t = [];
    for (var e in this.waypoints)
      for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
    for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
  }, e.prototype.refresh = function () {
    var t, e = this.element == this.element.window,
      i = e ? void 0 : this.adapter.offset(),
      o = {};
    this.handleScroll(), t = {
      horizontal: {
        contextOffset: e ? 0 : i.left,
        contextScroll: e ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: "right",
        backward: "left",
        offsetProp: "left"
      },
      vertical: {
        contextOffset: e ? 0 : i.top,
        contextScroll: e ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: "down",
        backward: "up",
        offsetProp: "top"
      }
    };
    for (var r in t) {
      var s = t[r];
      for (var a in this.waypoints[r]) {
        var l, h, p, u, c, d = this.waypoints[r][a],
          f = d.options.offset,
          w = d.triggerPoint,
          y = 0,
          g = null == w;
        d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
      }
    }
    return n.requestAnimationFrame(function () {
      for (var t in o) o[t].flushTriggers()
    }), this
  }, e.findOrCreateByElement = function (t) {
    return e.findByElement(t) || new e(t)
  }, e.refreshAll = function () {
    for (var t in o) o[t].refresh()
  }, e.findByElement = function (t) {
    return o[t.waypointContextKey]
  }, window.onload = function () {
    r && r(), e.refreshAll()
  }, n.requestAnimationFrame = function (e) {
    var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
    i.call(window, e)
  }, n.Context = e
}(),
function () {
  "use strict";

  function t(t, e) {
    return t.triggerPoint - e.triggerPoint
  }

  function e(t, e) {
    return e.triggerPoint - t.triggerPoint
  }

  function i(t) {
    this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
  }
  var o = {
      vertical: {},
      horizontal: {}
    },
    n = window.Waypoint;
  i.prototype.add = function (t) {
    this.waypoints.push(t)
  }, i.prototype.clearTriggerQueues = function () {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }, i.prototype.flushTriggers = function () {
    for (var i in this.triggerQueues) {
      var o = this.triggerQueues[i],
        n = "up" === i || "left" === i;
      o.sort(n ? e : t);
      for (var r = 0, s = o.length; s > r; r += 1) {
        var a = o[r];
        (a.options.continuous || r === o.length - 1) && a.trigger([i])
      }
    }
    this.clearTriggerQueues()
  }, i.prototype.next = function (e) {
    this.waypoints.sort(t);
    var i = n.Adapter.inArray(e, this.waypoints),
      o = i === this.waypoints.length - 1;
    return o ? null : this.waypoints[i + 1]
  }, i.prototype.previous = function (e) {
    this.waypoints.sort(t);
    var i = n.Adapter.inArray(e, this.waypoints);
    return i ? this.waypoints[i - 1] : null
  }, i.prototype.queueTrigger = function (t, e) {
    this.triggerQueues[e].push(t)
  }, i.prototype.remove = function (t) {
    var e = n.Adapter.inArray(t, this.waypoints);
    e > -1 && this.waypoints.splice(e, 1)
  }, i.prototype.first = function () {
    return this.waypoints[0]
  }, i.prototype.last = function () {
    return this.waypoints[this.waypoints.length - 1]
  }, i.findOrCreate = function (t) {
    return o[t.axis][t.name] || new i(t)
  }, n.Group = i
}(),
function () {
  "use strict";

  function t(t) {
    this.$element = e(t)
  }
  var e = window.jQuery,
    i = window.Waypoint;
  e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
    t.prototype[i] = function () {
      var t = Array.prototype.slice.call(arguments);
      return this.$element[i].apply(this.$element, t)
    }
  }), e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
    t[o] = e[o]
  }), i.adapters.push({
    name: "jquery",
    Adapter: t
  }), i.Adapter = t
}(),
function () {
  "use strict";

  function t(t) {
    return function () {
      var i = [],
        o = arguments[0];
      return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function () {
        var n = t.extend({}, o, {
          element: this
        });
        "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
      }), i
    }
  }
  var e = window.Waypoint;
  window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();

$(document).ready(function () {

  $('.trigger-images').css({
    'opacity': 0
  });

  $('.trigger-images').each(function () {
    $(this).waypoint(function () {
      $(this.element).addClass('fadeIn');
    }, {
      offset: '80%'
    });
  });


});

/*!
 * smooth-scroll v12.1.5: Animate scrolling to anchor links
 * (c) 2017 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/smooth-scroll
 */

/**
 * closest() polyfill
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while ((i < 0) && (el = el.parentElement));
    return el;
  };
}

/**
 * requestAnimationFrame() polyfill
 * By Erik Möller. Fixes from Paul Irish and Tino Zijdel.
 * @link http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @link http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * @license MIT
 */
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout((function () {
          callback(currTime + timeToCall);
        }),
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}());

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], (function () {
      return factory(root);
    }));
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.SmoothScroll = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {

  'use strict';

  //
  // Feature Test
  //

  var supports =
    'querySelector' in document &&
    'addEventListener' in window &&
    'requestAnimationFrame' in window &&
    'closest' in window.Element.prototype;


  //
  // Default settings
  //

  var defaults = {
    // Selectors
    ignore: '[data-scroll-ignore]',
    header: null,

    // Speed & Easing
    speed: 500,
    offset: 0,
    easing: 'easeInOutCubic',
    customEasing: null,

    // Callback API
    before: function () {},
    after: function () {}
  };


  //
  // Utility Methods
  //

  /**
   * Merge two or more objects. Returns a new object.
   * @param {Object}   objects  The objects to merge together
   * @returns {Object}          Merged values of defaults and options
   */
  var extend = function () {

    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    // Merge the object into the extended object
    var merge = function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          extended[prop] = obj[prop];
        }
      }
    };

    // Loop through each object and conduct a merge
    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;

  };

  /**
   * Get the height of an element.
   * @param  {Node} elem The element to get the height of
   * @return {Number}    The element's height in pixels
   */
  var getHeight = function (elem) {
    return parseInt(window.getComputedStyle(elem).height, 10);
  };

  /**
   * Escape special characters for use with querySelector
   * @param {String} id The anchor ID to escape
   * @author Mathias Bynens
   * @link https://github.com/mathiasbynens/CSS.escape
   */
  var escapeCharacters = function (id) {

    // Remove leading hash
    if (id.charAt(0) === '#') {
      id = id.substr(1);
    }

    var string = String(id);
    var length = string.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);
    while (++index < length) {
      codeUnit = string.charCodeAt(index);
      // Note: there’s no need to special-case astral symbols, surrogate
      // pairs, or lone surrogates.

      // If the character is NULL (U+0000), then throw an
      // `InvalidCharacterError` exception and terminate these steps.
      if (codeUnit === 0x0000) {
        throw new InvalidCharacterError(
          'Invalid character: the input contains U+0000.'
        );
      }

      if (
        // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
        // U+007F, […]
        (codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
        // If the character is the first character and is in the range [0-9]
        // (U+0030 to U+0039), […]
        (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
        // If the character is the second character and is in the range [0-9]
        // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
        (
          index === 1 &&
          codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
          firstCodeUnit === 0x002D
        )
      ) {
        // http://dev.w3.org/csswg/cssom/#escape-a-character-as-code-point
        result += '\\' + codeUnit.toString(16) + ' ';
        continue;
      }

      // If the character is not handled by one of the above rules and is
      // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
      // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
      // U+005A), or [a-z] (U+0061 to U+007A), […]
      if (
        codeUnit >= 0x0080 ||
        codeUnit === 0x002D ||
        codeUnit === 0x005F ||
        codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
        codeUnit >= 0x0041 && codeUnit <= 0x005A ||
        codeUnit >= 0x0061 && codeUnit <= 0x007A
      ) {
        // the character itself
        result += string.charAt(index);
        continue;
      }

      // Otherwise, the escaped character.
      // http://dev.w3.org/csswg/cssom/#escape-a-character
      result += '\\' + string.charAt(index);

    }

    return '#' + result;

  };

  /**
   * Calculate the easing pattern
   * @link https://gist.github.com/gre/1650294
   * @param {String} type Easing pattern
   * @param {Number} time Time animation should take to complete
   * @returns {Number}
   */
  var easingPattern = function (settings, time) {
    var pattern;

    // Default Easing Patterns
    if (settings.easing === 'easeInQuad') pattern = time * time; // accelerating from zero velocity
    if (settings.easing === 'easeOutQuad') pattern = time * (2 - time); // decelerating to zero velocity
    if (settings.easing === 'easeInOutQuad') pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time; // acceleration until halfway, then deceleration
    if (settings.easing === 'easeInCubic') pattern = time * time * time; // accelerating from zero velocity
    if (settings.easing === 'easeOutCubic') pattern = (--time) * time * time + 1; // decelerating to zero velocity
    if (settings.easing === 'easeInOutCubic') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
    if (settings.easing === 'easeInQuart') pattern = time * time * time * time; // accelerating from zero velocity
    if (settings.easing === 'easeOutQuart') pattern = 1 - (--time) * time * time * time; // decelerating to zero velocity
    if (settings.easing === 'easeInOutQuart') pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time; // acceleration until halfway, then deceleration
    if (settings.easing === 'easeInQuint') pattern = time * time * time * time * time; // accelerating from zero velocity
    if (settings.easing === 'easeOutQuint') pattern = 1 + (--time) * time * time * time * time; // decelerating to zero velocity
    if (settings.easing === 'easeInOutQuint') pattern = time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time; // acceleration until halfway, then deceleration

    // Custom Easing Patterns
    if (!!settings.customEasing) pattern = settings.customEasing(time);

    return pattern || time; // no easing, no acceleration
  };

  /**
   * Determine the document's height
   * @returns {Number}
   */
  var getDocumentHeight = function () {
    return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
  };

  /**
   * Calculate how far to scroll
   * @param {Element} anchor The anchor element to scroll to
   * @param {Number} headerHeight Height of a fixed header, if any
   * @param {Number} offset Number of pixels by which to offset scroll
   * @returns {Number}
   */
  var getEndLocation = function (anchor, headerHeight, offset) {
    var location = 0;
    if (anchor.offsetParent) {
      do {
        location += anchor.offsetTop;
        anchor = anchor.offsetParent;
      } while (anchor);
    }
    location = Math.max(location - headerHeight - offset, 0);
    return location;
  };

  /**
   * Get the height of the fixed header
   * @param  {Node}   header The header
   * @return {Number}        The height of the header
   */
  var getHeaderHeight = function (header) {
    return !header ? 0 : (getHeight(header) + header.offsetTop);
  };

  /**
   * Bring the anchored element into focus
   * @param {Node}     anchor      The anchor element
   * @param {Number}   endLocation The end location to scroll to
   * @param {Boolean}  isNum       If true, scroll is to a position rather than an element
   */
  var adjustFocus = function (anchor, endLocation, isNum) {

    // Don't run if scrolling to a number on the page
    if (isNum) return;

    // Otherwise, bring anchor element into focus
    anchor.focus();
    if (document.activeElement.id !== anchor.id) {
      anchor.setAttribute('tabindex', '-1');
      anchor.focus();
      anchor.style.outline = 'none';
    }
    window.scrollTo(0, endLocation);

  };

  /**
   * Check to see if user prefers reduced motion
   * @param  {Object} settings Script settings
   */
  var reduceMotion = function (settings) {
    if ('matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches) {
      return true;
    }
    return false;
  };


  //
  // SmoothScroll Constructor
  //

  var SmoothScroll = function (selector, options) {

    //
    // Variables
    //

    var smoothScroll = {}; // Object for public APIs
    var settings, anchor, toggle, fixedHeader, headerHeight, eventTimeout, animationInterval;


    //
    // Methods
    //

    /**
     * Cancel a scroll-in-progress
     */
    smoothScroll.cancelScroll = function () {
      // clearInterval(animationInterval);
      cancelAnimationFrame(animationInterval);
    };

    /**
     * Start/stop the scrolling animation
     * @param {Node|Number} anchor  The element or position to scroll to
     * @param {Element}     toggle  The element that toggled the scroll event
     * @param {Object}      options
     */
    smoothScroll.animateScroll = function (anchor, toggle, options) {

      // Local settings
      var animateSettings = extend(settings || defaults, options || {}); // Merge user options with defaults

      // Selectors and variables
      var isNum = Object.prototype.toString.call(anchor) === '[object Number]' ? true : false;
      var anchorElem = isNum || !anchor.tagName ? null : anchor;
      if (!isNum && !anchorElem) return;
      var startLocation = window.pageYOffset; // Current location on the page
      if (animateSettings.header && !fixedHeader) {
        // Get the fixed header if not already set
        fixedHeader = document.querySelector(animateSettings.header);
      }
      if (!headerHeight) {
        // Get the height of a fixed header if one exists and not already set
        headerHeight = getHeaderHeight(fixedHeader);
      }
      var endLocation = isNum ? anchor : getEndLocation(anchorElem, headerHeight, parseInt((typeof animateSettings.offset === 'function' ? animateSettings.offset() : animateSettings.offset), 10)); // Location to scroll to
      var distance = endLocation - startLocation; // distance to travel
      var documentHeight = getDocumentHeight();
      var timeLapsed = 0;
      var start, percentage, position;

      /**
       * Stop the scroll animation when it reaches its target (or the bottom/top of page)
       * @param {Number} position Current position on the page
       * @param {Number} endLocation Scroll to location
       * @param {Number} animationInterval How much to scroll on this loop
       */
      var stopAnimateScroll = function (position, endLocation) {

        // Get the current location
        var currentLocation = window.pageYOffset;

        // Check if the end location has been reached yet (or we've hit the end of the document)
        if (position == endLocation || currentLocation == endLocation || ((startLocation < endLocation && window.innerHeight + currentLocation) >= documentHeight)) {

          // Clear the animation timer
          smoothScroll.cancelScroll();

          // Bring the anchored element into focus
          adjustFocus(anchor, endLocation, isNum);

          // Run callback after animation complete
          animateSettings.after(anchor, toggle);

          // Reset start
          start = null;

          return true;

        }
      };

      /**
       * Loop scrolling animation
       */
      var loopAnimateScroll = function (timestamp) {
        if (!start) {
          start = timestamp;
        }
        timeLapsed += timestamp - start;
        percentage = (timeLapsed / parseInt(animateSettings.speed, 10));
        percentage = (percentage > 1) ? 1 : percentage;
        position = startLocation + (distance * easingPattern(animateSettings, percentage));
        window.scrollTo(0, Math.floor(position));
        if (!stopAnimateScroll(position, endLocation)) {
          window.requestAnimationFrame(loopAnimateScroll);
          start = timestamp;
        }
      };

      /**
       * Reset position to fix weird iOS bug
       * @link https://github.com/cferdinandi/smooth-scroll/issues/45
       */
      if (window.pageYOffset === 0) {
        window.scrollTo(0, 0);
      }

      // Run callback before animation starts
      animateSettings.before(anchor, toggle);

      // Start scrolling animation
      smoothScroll.cancelScroll();
      window.requestAnimationFrame(loopAnimateScroll);


    };

    /**
     * Handle has change event
     */
    var hashChangeHandler = function (event) {

      // Only run if there's an anchor element to scroll to
      if (!anchor) return;

      // Reset the anchor element's ID
      anchor.id = anchor.getAttribute('data-scroll-id');

      // Scroll to the anchored content
      smoothScroll.animateScroll(anchor, toggle);

      // Reset anchor and toggle
      anchor = null;
      toggle = null;

    };

    /**
     * If smooth scroll element clicked, animate scroll
     */
    var clickHandler = function (event) {

      // Don't run if the user prefers reduced motion
      if (reduceMotion(settings)) return;

      // Don't run if right-click or command/control + click
      if (event.button !== 0 || event.metaKey || event.ctrlKey) return;

      // Check if a smooth scroll link was clicked
      toggle = event.target.closest(selector);
      if (!toggle || toggle.tagName.toLowerCase() !== 'a' || event.target.closest(settings.ignore)) return;

      // Only run if link is an anchor and points to the current page
      if (toggle.hostname !== window.location.hostname || toggle.pathname !== window.location.pathname || !/#/.test(toggle.href)) return;

      // Get the sanitized hash
      var hash;
      try {
        hash = escapeCharacters(decodeURIComponent(toggle.hash));
      } catch (e) {
        hash = escapeCharacters(toggle.hash);
      }

      // If the hash is empty, scroll to the top of the page
      if (hash === '#') {

        // Prevent default link behavior
        event.preventDefault();

        // Set the anchored element
        anchor = document.body;

        // Save or create the ID as a data attribute and remove it (prevents scroll jump)
        var id = anchor.id ? anchor.id : 'smooth-scroll-top';
        anchor.setAttribute('data-scroll-id', id);
        anchor.id = '';

        // If no hash change event will happen, fire manually
        // Otherwise, update the hash
        if (window.location.hash.substring(1) === id) {
          hashChangeHandler();
        } else {
          window.location.hash = id;
        }

        return;

      }

      // Get the anchored element
      anchor = document.querySelector(hash);

      // If anchored element exists, save the ID as a data attribute and remove it (prevents scroll jump)
      if (!anchor) return;
      anchor.setAttribute('data-scroll-id', anchor.id);
      anchor.id = '';

      // If no hash change event will happen, fire manually
      if (toggle.hash === window.location.hash) {
        event.preventDefault();
        hashChangeHandler();
      }

    };

    /**
     * On window scroll and resize, only run events at a rate of 15fps for better performance
     */
    var resizeThrottler = function (event) {
      if (!eventTimeout) {
        eventTimeout = setTimeout((function () {
          eventTimeout = null; // Reset timeout
          headerHeight = getHeaderHeight(fixedHeader); // Get the height of a fixed header if one exists
        }), 66);
      }
    };

    /**
     * Destroy the current initialization.
     */
    smoothScroll.destroy = function () {

      // If plugin isn't already initialized, stop
      if (!settings) return;

      // Remove event listeners
      document.removeEventListener('click', clickHandler, false);
      window.removeEventListener('resize', resizeThrottler, false);

      // Cancel any scrolls-in-progress
      smoothScroll.cancelScroll();

      // Reset variables
      settings = null;
      anchor = null;
      toggle = null;
      fixedHeader = null;
      headerHeight = null;
      eventTimeout = null;
      animationInterval = null;
    };

    /**
     * Initialize Smooth Scroll
     * @param {Object} options User settings
     */
    smoothScroll.init = function (options) {

      // feature test
      if (!supports) return;

      // Destroy any existing initializations
      smoothScroll.destroy();

      // Selectors and variables
      settings = extend(defaults, options || {}); // Merge user options with defaults
      fixedHeader = settings.header ? document.querySelector(settings.header) : null; // Get the fixed header
      headerHeight = getHeaderHeight(fixedHeader);

      // When a toggle is clicked, run the click handler
      document.addEventListener('click', clickHandler, false);

      // Listen for hash changes
      window.addEventListener('hashchange', hashChangeHandler, false);

      // If window is resized and there's a fixed header, recalculate its size
      if (fixedHeader) {
        window.addEventListener('resize', resizeThrottler, false);
      }

    };


    //
    // Initialize plugin
    //

    smoothScroll.init(options);


    //
    // Public APIs
    //

    return smoothScroll;

  };

  return SmoothScroll;

}));

$(window).on('hashchange', function (e) {
  history.replaceState("", document.title, e.originalEvent.oldURL);
});
