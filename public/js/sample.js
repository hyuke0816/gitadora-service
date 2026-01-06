!(function (t) {
  var e = {};
  function n(r) {
    if (e[r]) return e[r].exports;
    var i = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var i in t)
          n.d(
            r,
            i,
            function (e) {
              return t[e];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 41));
})([
  function (t, e, n) {
    "use strict";
    n.d(e, "b", function () {
      return i;
    }),
      n.d(e, "a", function () {
        return o;
      }),
      n.d(e, "d", function () {
        return a;
      }),
      n.d(e, "f", function () {
        return s;
      }),
      n.d(e, "c", function () {
        return c;
      }),
      n.d(e, "e", function () {
        return u;
      });
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
    
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    var r = function (t, e) {
      return (r =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        })(t, e);
    };
    function i(t, e) {
      function n() {
        this.constructor = t;
      }
      r(t, e),
        (t.prototype =
          null === e
            ? Object.create(e)
            : ((n.prototype = e.prototype), new n()));
    }
    var o = function () {
      return (o =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var i in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t;
        }).apply(this, arguments);
    };
    function a(t, e) {
      var n = {};
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) &&
          e.indexOf(r) < 0 &&
          (n[r] = t[r]);
      if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
          e.indexOf(r[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
            (n[r[i]] = t[r[i]]);
      }
      return n;
    }
    function s(t) {
      var e = "function" == typeof Symbol && Symbol.iterator,
        n = e && t[e],
        r = 0;
      if (n) return n.call(t);
      if (t && "number" == typeof t.length)
        return {
          next: function () {
            return (
              t && r >= t.length && (t = void 0),
              { value: t && t[r++], done: !t }
            );
          },
        };
      throw new TypeError(
        e ? "Object is not iterable." : "Symbol.iterator is not defined."
      );
    }
    function c(t, e) {
      var n = "function" == typeof Symbol && t[Symbol.iterator];
      if (!n) return t;
      var r,
        i,
        o = n.call(t),
        a = [];
      try {
        for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
          a.push(r.value);
      } catch (t) {
        i = { error: t };
      } finally {
        try {
          r && !r.done && (n = o.return) && n.call(o);
        } finally {
          if (i) throw i.error;
        }
      }
      return a;
    }
    function u() {
      for (var t = [], e = 0; e < arguments.length; e++)
        t = t.concat(c(arguments[e]));
      return t;
    }
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return r;
    });
    var r = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;
  },
  ,
  function (t, e, n) {
    "use strict";
    n.d(e, "b", function () {
      return i;
    }),
      n.d(e, "a", function () {
        return o;
      }),
      n.d(e, "c", function () {
        return a;
      }),
      n.d(e, "d", function () {
        return s;
      });
    var r = n(20);
    function i(t) {
      var e = Object(r.b)().getClient(),
        n = t || (e && e.getOptions());
      return !!n && ("tracesSampleRate" in n || "tracesSampler" in n);
    }
    function o(t) {
      var e = (t || Object(r.b)()).getScope();
      return e && e.getTransaction();
    }
    function a(t) {
      return t / 1e3;
    }
    function s(t) {
      return 1e3 * t;
    }
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "d", function () {
      return i;
    }),
      n.d(e, "e", function () {
        return a;
      }),
      n.d(e, "a", function () {
        return s;
      }),
      n.d(e, "b", function () {
        return c;
      }),
      n.d(e, "l", function () {
        return u;
      }),
      n.d(e, "j", function () {
        return l;
      }),
      n.d(e, "i", function () {
        return f;
      }),
      n.d(e, "f", function () {
        return p;
      }),
      n.d(e, "c", function () {
        return d;
      }),
      n.d(e, "k", function () {
        return h;
      }),
      n.d(e, "n", function () {
        return v;
      }),
      n.d(e, "m", function () {
        return g;
      }),
      n.d(e, "h", function () {
        return m;
      }),
      n.d(e, "g", function () {
        return y;
      });
    var r = Object.prototype.toString;
    function i(t) {
      switch (r.call(t)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
          return !0;
        default:
          return y(t, Error);
      }
    }
    function o(t, e) {
      return r.call(t) === "[object " + e + "]";
    }
    function a(t) {
      return o(t, "ErrorEvent");
    }
    function s(t) {
      return o(t, "DOMError");
    }
    function c(t) {
      return o(t, "DOMException");
    }
    function u(t) {
      return o(t, "String");
    }
    function l(t) {
      return null === t || ("object" != typeof t && "function" != typeof t);
    }
    function f(t) {
      return o(t, "Object");
    }
    function p(t) {
      return "undefined" != typeof Event && y(t, Event);
    }
    function d(t) {
      return "undefined" != typeof Element && y(t, Element);
    }
    function h(t) {
      return o(t, "RegExp");
    }
    function v(t) {
      return Boolean(t && t.then && "function" == typeof t.then);
    }
    function g(t) {
      return (
        f(t) &&
        "nativeEvent" in t &&
        "preventDefault" in t &&
        "stopPropagation" in t
      );
    }
    function m(t) {
      return "number" == typeof t && t != t;
    }
    function y(t, e) {
      try {
        return t instanceof e;
      } catch (t) {
        return !1;
      }
    }
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return c;
    }),
      n.d(e, "b", function () {
        return u;
      }),
      n.d(e, "c", function () {
        return r;
      });
    var r,
      i = n(0),
      o = n(9),
      a = n(6),
      s = Object(a.a)(),
      c = ["debug", "info", "warn", "error", "log", "assert"];
    function u(t) {
      var e = Object(a.a)();
      if (!("console" in e)) return t();
      var n = e.console,
        r = {};
      c.forEach(function (t) {
        var i = n[t] && n[t].__sentry_original__;
        t in e.console && i && ((r[t] = n[t]), (n[t] = i));
      });
      try {
        return t();
      } finally {
        Object.keys(r).forEach(function (t) {
          n[t] = r[t];
        });
      }
    }
    function l() {
      var t = !1,
        e = {
          enable: function () {
            t = !0;
          },
          disable: function () {
            t = !1;
          },
        };
      return (
        o.a
          ? c.forEach(function (n) {
              e[n] = function () {
                for (var e = [], r = 0; r < arguments.length; r++)
                  e[r] = arguments[r];
                t &&
                  u(function () {
                    var t;
                    (t = s.console)[n].apply(
                      t,
                      Object(i.e)(["Sentry Logger [" + n + "]:"], e)
                    );
                  });
              };
            })
          : c.forEach(function (t) {
              e[t] = function () {};
            }),
        e
      );
    }
    r = o.a ? Object(a.b)("logger", l) : l();
  },
  function (t, e, n) {
    "use strict";
    (function (t) {
      n.d(e, "a", function () {
        return o;
      }),
        n.d(e, "b", function () {
          return a;
        });
      var r = n(8),
        i = {};
      function o() {
        return Object(r.b)()
          ? t
          : "undefined" != typeof window
          ? window
          : "undefined" != typeof self
          ? self
          : i;
      }
      function a(t, e, n) {
        var r = n || o(),
          i = (r.__SENTRY__ = r.__SENTRY__ || {});
        return i[t] || (i[t] = e());
      }
    }).call(this, n(29));
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "e", function () {
      return s;
    }),
      n.d(e, "a", function () {
        return c;
      }),
      n.d(e, "g", function () {
        return u;
      }),
      n.d(e, "f", function () {
        return l;
      }),
      n.d(e, "h", function () {
        return f;
      }),
      n.d(e, "b", function () {
        return p;
      }),
      n.d(e, "d", function () {
        return v;
      }),
      n.d(e, "c", function () {
        return g;
      });
    var r = n(0),
      i = n(32),
      o = n(4),
      a = n(16);
    function s(t, e, n) {
      if (e in t) {
        var r = t[e],
          i = n(r);
        if ("function" == typeof i)
          try {
            u(i, r);
          } catch (t) {}
        t[e] = i;
      }
    }
    function c(t, e, n) {
      Object.defineProperty(t, e, { value: n, writable: !0, configurable: !0 });
    }
    function u(t, e) {
      var n = e.prototype || {};
      (t.prototype = e.prototype = n), c(t, "__sentry_original__", e);
    }
    function l(t) {
      return t.__sentry_original__;
    }
    function f(t) {
      return Object.keys(t)
        .map(function (e) {
          return encodeURIComponent(e) + "=" + encodeURIComponent(t[e]);
        })
        .join("&");
    }
    function p(t) {
      var e = t;
      if (Object(o.d)(t))
        e = Object(r.a)(
          { message: t.message, name: t.name, stack: t.stack },
          h(t)
        );
      else if (Object(o.f)(t)) {
        var n = t;
        (e = Object(r.a)(
          {
            type: n.type,
            target: d(n.target),
            currentTarget: d(n.currentTarget),
          },
          h(n)
        )),
          "undefined" != typeof CustomEvent &&
            Object(o.g)(t, CustomEvent) &&
            (e.detail = n.detail);
      }
      return e;
    }
    function d(t) {
      try {
        return Object(o.c)(t)
          ? Object(i.b)(t)
          : Object.prototype.toString.call(t);
      } catch (t) {
        return "<unknown>";
      }
    }
    function h(t) {
      var e = {};
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      return e;
    }
    function v(t, e) {
      void 0 === e && (e = 40);
      var n = Object.keys(p(t));
      if ((n.sort(), !n.length)) return "[object has no keys]";
      if (n[0].length >= e) return Object(a.d)(n[0], e);
      for (var r = n.length; r > 0; r--) {
        var i = n.slice(0, r).join(", ");
        if (!(i.length > e)) return r === n.length ? i : Object(a.d)(i, e);
      }
      return "";
    }
    function g(t) {
      var e, n;
      if (Object(o.i)(t)) {
        var i = {};
        try {
          for (
            var a = Object(r.f)(Object.keys(t)), s = a.next();
            !s.done;
            s = a.next()
          ) {
            var c = s.value;
            void 0 !== t[c] && (i[c] = g(t[c]));
          }
        } catch (t) {
          e = { error: t };
        } finally {
          try {
            s && !s.done && (n = a.return) && n.call(a);
          } finally {
            if (e) throw e.error;
          }
        }
        return i;
      }
      return Array.isArray(t) ? t.map(g) : t;
    }
  },
  function (t, e, n) {
    "use strict";
    (function (t, r) {
      n.d(e, "b", function () {
        return o;
      }),
        n.d(e, "a", function () {
          return a;
        }),
        n.d(e, "c", function () {
          return s;
        });
      var i = n(31);
      function o() {
        return (
          !Object(i.a)() &&
          "[object process]" ===
            Object.prototype.toString.call(void 0 !== t ? t : 0)
        );
      }
      function a(t, e) {
        return t.require(e);
      }
      function s(t) {
        var e;
        try {
          e = a(r, t);
        } catch (t) {}
        try {
          var n = a(r, "process").cwd;
          e = a(r, n() + "/node_modules/" + t);
        } catch (t) {}
        return e;
      }
    }).call(this, n(40), n(26)(t));
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return r;
    });
    var r = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;
  },
  function (t, e, n) {
    var r;
    /*!
     * jQuery JavaScript Library v3.7.1
     * https://jquery.com/
     *
     * Copyright OpenJS Foundation and other contributors
     * Released under the MIT license
     * https://jquery.org/license
     *
     * Date: 2023-08-28T13:37Z
     */ !(function (e, n) {
      "use strict";
      "object" == typeof t.exports
        ? (t.exports = e.document
            ? n(e, !0)
            : function (t) {
                if (!t.document)
                  throw new Error("jQuery requires a window with a document");
                return n(t);
              })
        : n(e);
    })("undefined" != typeof window ? window : this, function (n, i) {
      "use strict";
      var o = [],
        a = Object.getPrototypeOf,
        s = o.slice,
        c = o.flat
          ? function (t) {
              return o.flat.call(t);
            }
          : function (t) {
              return o.concat.apply([], t);
            },
        u = o.push,
        l = o.indexOf,
        f = {},
        p = f.toString,
        d = f.hasOwnProperty,
        h = d.toString,
        v = h.call(Object),
        g = {},
        m = function (t) {
          return (
            "function" == typeof t &&
            "number" != typeof t.nodeType &&
            "function" != typeof t.item
          );
        },
        y = function (t) {
          return null != t && t === t.window;
        },
        b = n.document,
        _ = { type: !0, src: !0, nonce: !0, noModule: !0 };
      function x(t, e, n) {
        var r,
          i,
          o = (n = n || b).createElement("script");
        if (((o.text = t), e))
          for (r in _)
            (i = e[r] || (e.getAttribute && e.getAttribute(r))) &&
              o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o);
      }
      function O(t) {
        return null == t
          ? t + ""
          : "object" == typeof t || "function" == typeof t
          ? f[p.call(t)] || "object"
          : typeof t;
      }
      var j = /HTML$/i,
        w = function (t, e) {
          return new w.fn.init(t, e);
        };
      function S(t) {
        var e = !!t && "length" in t && t.length,
          n = O(t);
        return (
          !m(t) &&
          !y(t) &&
          ("array" === n ||
            0 === e ||
            ("number" == typeof e && e > 0 && e - 1 in t))
        );
      }
      function T(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
      }
      (w.fn = w.prototype =
        {
          jquery: "3.7.1",
          constructor: w,
          length: 0,
          toArray: function () {
            return s.call(this);
          },
          get: function (t) {
            return null == t
              ? s.call(this)
              : t < 0
              ? this[t + this.length]
              : this[t];
          },
          pushStack: function (t) {
            var e = w.merge(this.constructor(), t);
            return (e.prevObject = this), e;
          },
          each: function (t) {
            return w.each(this, t);
          },
          map: function (t) {
            return this.pushStack(
              w.map(this, function (e, n) {
                return t.call(e, n, e);
              })
            );
          },
          slice: function () {
            return this.pushStack(s.apply(this, arguments));
          },
          first: function () {
            return this.eq(0);
          },
          last: function () {
            return this.eq(-1);
          },
          even: function () {
            return this.pushStack(
              w.grep(this, function (t, e) {
                return (e + 1) % 2;
              })
            );
          },
          odd: function () {
            return this.pushStack(
              w.grep(this, function (t, e) {
                return e % 2;
              })
            );
          },
          eq: function (t) {
            var e = this.length,
              n = +t + (t < 0 ? e : 0);
            return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
          },
          end: function () {
            return this.prevObject || this.constructor();
          },
          push: u,
          sort: o.sort,
          splice: o.splice,
        }),
        (w.extend = w.fn.extend =
          function () {
            var t,
              e,
              n,
              r,
              i,
              o,
              a = arguments[0] || {},
              s = 1,
              c = arguments.length,
              u = !1;
            for (
              "boolean" == typeof a && ((u = a), (a = arguments[s] || {}), s++),
                "object" == typeof a || m(a) || (a = {}),
                s === c && ((a = this), s--);
              s < c;
              s++
            )
              if (null != (t = arguments[s]))
                for (e in t)
                  (r = t[e]),
                    "__proto__" !== e &&
                      a !== r &&
                      (u && r && (w.isPlainObject(r) || (i = Array.isArray(r)))
                        ? ((n = a[e]),
                          (o =
                            i && !Array.isArray(n)
                              ? []
                              : i || w.isPlainObject(n)
                              ? n
                              : {}),
                          (i = !1),
                          (a[e] = w.extend(u, o, r)))
                        : void 0 !== r && (a[e] = r));
            return a;
          }),
        w.extend({
          expando: "jQuery" + ("3.7.1" + Math.random()).replace(/\D/g, ""),
          isReady: !0,
          error: function (t) {
            throw new Error(t);
          },
          noop: function () {},
          isPlainObject: function (t) {
            var e, n;
            return (
              !(!t || "[object Object]" !== p.call(t)) &&
              (!(e = a(t)) ||
                ("function" ==
                  typeof (n = d.call(e, "constructor") && e.constructor) &&
                  h.call(n) === v))
            );
          },
          isEmptyObject: function (t) {
            var e;
            for (e in t) return !1;
            return !0;
          },
          globalEval: function (t, e, n) {
            x(t, { nonce: e && e.nonce }, n);
          },
          each: function (t, e) {
            var n,
              r = 0;
            if (S(t))
              for (n = t.length; r < n && !1 !== e.call(t[r], r, t[r]); r++);
            else for (r in t) if (!1 === e.call(t[r], r, t[r])) break;
            return t;
          },
          text: function (t) {
            var e,
              n = "",
              r = 0,
              i = t.nodeType;
            if (!i) for (; (e = t[r++]); ) n += w.text(e);
            return 1 === i || 11 === i
              ? t.textContent
              : 9 === i
              ? t.documentElement.textContent
              : 3 === i || 4 === i
              ? t.nodeValue
              : n;
          },
          makeArray: function (t, e) {
            var n = e || [];
            return (
              null != t &&
                (S(Object(t))
                  ? w.merge(n, "string" == typeof t ? [t] : t)
                  : u.call(n, t)),
              n
            );
          },
          inArray: function (t, e, n) {
            return null == e ? -1 : l.call(e, t, n);
          },
          isXMLDoc: function (t) {
            var e = t && t.namespaceURI,
              n = t && (t.ownerDocument || t).documentElement;
            return !j.test(e || (n && n.nodeName) || "HTML");
          },
          merge: function (t, e) {
            for (var n = +e.length, r = 0, i = t.length; r < n; r++)
              t[i++] = e[r];
            return (t.length = i), t;
          },
          grep: function (t, e, n) {
            for (var r = [], i = 0, o = t.length, a = !n; i < o; i++)
              !e(t[i], i) !== a && r.push(t[i]);
            return r;
          },
          map: function (t, e, n) {
            var r,
              i,
              o = 0,
              a = [];
            if (S(t))
              for (r = t.length; o < r; o++)
                null != (i = e(t[o], o, n)) && a.push(i);
            else for (o in t) null != (i = e(t[o], o, n)) && a.push(i);
            return c(a);
          },
          guid: 1,
          support: g,
        }),
        "function" == typeof Symbol &&
          (w.fn[Symbol.iterator] = o[Symbol.iterator]),
        w.each(
          "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
            " "
          ),
          function (t, e) {
            f["[object " + e + "]"] = e.toLowerCase();
          }
        );
      var E = o.pop,
        k = o.sort,
        C = o.splice,
        N = "[\\x20\\t\\r\\n\\f]",
        A = new RegExp("^" + N + "+|((?:^|[^\\\\])(?:\\\\.)*)" + N + "+$", "g");
      w.contains = function (t, e) {
        var n = e && e.parentNode;
        return (
          t === n ||
          !(
            !n ||
            1 !== n.nodeType ||
            !(t.contains
              ? t.contains(n)
              : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n))
          )
        );
      };
      var L = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      function D(t, e) {
        return e
          ? "\0" === t
            ? "�"
            : t.slice(0, -1) +
              "\\" +
              t.charCodeAt(t.length - 1).toString(16) +
              " "
          : "\\" + t;
      }
      w.escapeSelector = function (t) {
        return (t + "").replace(L, D);
      };
      var R = b,
        I = u;
      !(function () {
        var t,
          e,
          r,
          i,
          a,
          c,
          u,
          f,
          p,
          h,
          v = I,
          m = w.expando,
          y = 0,
          b = 0,
          _ = tt(),
          x = tt(),
          O = tt(),
          j = tt(),
          S = function (t, e) {
            return t === e && (a = !0), 0;
          },
          L =
            "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
          D =
            "(?:\\\\[\\da-fA-F]{1,6}" +
            N +
            "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
          P =
            "\\[" +
            N +
            "*(" +
            D +
            ")(?:" +
            N +
            "*([*^$|!~]?=)" +
            N +
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
            D +
            "))|)" +
            N +
            "*\\]",
          q =
            ":(" +
            D +
            ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
            P +
            ")*)|.*)\\)|)",
          M = new RegExp(N + "+", "g"),
          H = new RegExp("^" + N + "*," + N + "*"),
          F = new RegExp("^" + N + "*([>+~]|" + N + ")" + N + "*"),
          B = new RegExp(N + "|>"),
          U = new RegExp(q),
          W = new RegExp("^" + D + "$"),
          z = {
            ID: new RegExp("^#(" + D + ")"),
            CLASS: new RegExp("^\\.(" + D + ")"),
            TAG: new RegExp("^(" + D + "|[*])"),
            ATTR: new RegExp("^" + P),
            PSEUDO: new RegExp("^" + q),
            CHILD: new RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                N +
                "*(even|odd|(([+-]|)(\\d*)n|)" +
                N +
                "*(?:([+-]|)" +
                N +
                "*(\\d+)|))" +
                N +
                "*\\)|)",
              "i"
            ),
            bool: new RegExp("^(?:" + L + ")$", "i"),
            needsContext: new RegExp(
              "^" +
                N +
                "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                N +
                "*((?:-\\d)?\\d*)" +
                N +
                "*\\)|)(?=[^-]|$)",
              "i"
            ),
          },
          $ = /^(?:input|select|textarea|button)$/i,
          Y = /^h\d$/i,
          G = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
          X = /[+~]/,
          V = new RegExp(
            "\\\\[\\da-fA-F]{1,6}" + N + "?|\\\\([^\\r\\n\\f])",
            "g"
          ),
          J = function (t, e) {
            var n = "0x" + t.slice(1) - 65536;
            return (
              e ||
              (n < 0
                ? String.fromCharCode(n + 65536)
                : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
            );
          },
          K = function () {
            ct();
          },
          Q = pt(
            function (t) {
              return !0 === t.disabled && T(t, "fieldset");
            },
            { dir: "parentNode", next: "legend" }
          );
        try {
          v.apply((o = s.call(R.childNodes)), R.childNodes),
            o[R.childNodes.length].nodeType;
        } catch (t) {
          v = {
            apply: function (t, e) {
              I.apply(t, s.call(e));
            },
            call: function (t) {
              I.apply(t, s.call(arguments, 1));
            },
          };
        }
        function Z(t, e, n, r) {
          var i,
            o,
            a,
            s,
            u,
            l,
            d,
            h = e && e.ownerDocument,
            y = e ? e.nodeType : 9;
          if (
            ((n = n || []),
            "string" != typeof t || !t || (1 !== y && 9 !== y && 11 !== y))
          )
            return n;
          if (!r && (ct(e), (e = e || c), f)) {
            if (11 !== y && (u = G.exec(t)))
              if ((i = u[1])) {
                if (9 === y) {
                  if (!(a = e.getElementById(i))) return n;
                  if (a.id === i) return v.call(n, a), n;
                } else if (
                  h &&
                  (a = h.getElementById(i)) &&
                  Z.contains(e, a) &&
                  a.id === i
                )
                  return v.call(n, a), n;
              } else {
                if (u[2]) return v.apply(n, e.getElementsByTagName(t)), n;
                if ((i = u[3]) && e.getElementsByClassName)
                  return v.apply(n, e.getElementsByClassName(i)), n;
              }
            if (!(j[t + " "] || (p && p.test(t)))) {
              if (((d = t), (h = e), 1 === y && (B.test(t) || F.test(t)))) {
                for (
                  ((h = (X.test(t) && st(e.parentNode)) || e) == e &&
                    g.scope) ||
                    ((s = e.getAttribute("id"))
                      ? (s = w.escapeSelector(s))
                      : e.setAttribute("id", (s = m))),
                    o = (l = lt(t)).length;
                  o--;

                )
                  l[o] = (s ? "#" + s : ":scope") + " " + ft(l[o]);
                d = l.join(",");
              }
              try {
                return v.apply(n, h.querySelectorAll(d)), n;
              } catch (e) {
                j(t, !0);
              } finally {
                s === m && e.removeAttribute("id");
              }
            }
          }
          return yt(t.replace(A, "$1"), e, n, r);
        }
        function tt() {
          var t = [];
          return function n(r, i) {
            return (
              t.push(r + " ") > e.cacheLength && delete n[t.shift()],
              (n[r + " "] = i)
            );
          };
        }
        function et(t) {
          return (t[m] = !0), t;
        }
        function nt(t) {
          var e = c.createElement("fieldset");
          try {
            return !!t(e);
          } catch (t) {
            return !1;
          } finally {
            e.parentNode && e.parentNode.removeChild(e), (e = null);
          }
        }
        function rt(t) {
          return function (e) {
            return T(e, "input") && e.type === t;
          };
        }
        function it(t) {
          return function (e) {
            return (T(e, "input") || T(e, "button")) && e.type === t;
          };
        }
        function ot(t) {
          return function (e) {
            return "form" in e
              ? e.parentNode && !1 === e.disabled
                ? "label" in e
                  ? "label" in e.parentNode
                    ? e.parentNode.disabled === t
                    : e.disabled === t
                  : e.isDisabled === t || (e.isDisabled !== !t && Q(e) === t)
                : e.disabled === t
              : "label" in e && e.disabled === t;
          };
        }
        function at(t) {
          return et(function (e) {
            return (
              (e = +e),
              et(function (n, r) {
                for (var i, o = t([], n.length, e), a = o.length; a--; )
                  n[(i = o[a])] && (n[i] = !(r[i] = n[i]));
              })
            );
          });
        }
        function st(t) {
          return t && void 0 !== t.getElementsByTagName && t;
        }
        function ct(t) {
          var n,
            r = t ? t.ownerDocument || t : R;
          return r != c && 9 === r.nodeType && r.documentElement
            ? ((u = (c = r).documentElement),
              (f = !w.isXMLDoc(c)),
              (h = u.matches || u.webkitMatchesSelector || u.msMatchesSelector),
              u.msMatchesSelector &&
                R != c &&
                (n = c.defaultView) &&
                n.top !== n &&
                n.addEventListener("unload", K),
              (g.getById = nt(function (t) {
                return (
                  (u.appendChild(t).id = w.expando),
                  !c.getElementsByName || !c.getElementsByName(w.expando).length
                );
              })),
              (g.disconnectedMatch = nt(function (t) {
                return h.call(t, "*");
              })),
              (g.scope = nt(function () {
                return c.querySelectorAll(":scope");
              })),
              (g.cssHas = nt(function () {
                try {
                  return c.querySelector(":has(*,:jqfake)"), !1;
                } catch (t) {
                  return !0;
                }
              })),
              g.getById
                ? ((e.filter.ID = function (t) {
                    var e = t.replace(V, J);
                    return function (t) {
                      return t.getAttribute("id") === e;
                    };
                  }),
                  (e.find.ID = function (t, e) {
                    if (void 0 !== e.getElementById && f) {
                      var n = e.getElementById(t);
                      return n ? [n] : [];
                    }
                  }))
                : ((e.filter.ID = function (t) {
                    var e = t.replace(V, J);
                    return function (t) {
                      var n =
                        void 0 !== t.getAttributeNode &&
                        t.getAttributeNode("id");
                      return n && n.value === e;
                    };
                  }),
                  (e.find.ID = function (t, e) {
                    if (void 0 !== e.getElementById && f) {
                      var n,
                        r,
                        i,
                        o = e.getElementById(t);
                      if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === t)
                          return [o];
                        for (i = e.getElementsByName(t), r = 0; (o = i[r++]); )
                          if ((n = o.getAttributeNode("id")) && n.value === t)
                            return [o];
                      }
                      return [];
                    }
                  })),
              (e.find.TAG = function (t, e) {
                return void 0 !== e.getElementsByTagName
                  ? e.getElementsByTagName(t)
                  : e.querySelectorAll(t);
              }),
              (e.find.CLASS = function (t, e) {
                if (void 0 !== e.getElementsByClassName && f)
                  return e.getElementsByClassName(t);
              }),
              (p = []),
              nt(function (t) {
                var e;
                (u.appendChild(t).innerHTML =
                  "<a id='" +
                  m +
                  "' href='' disabled='disabled'></a><select id='" +
                  m +
                  "-\r\\' disabled='disabled'><option selected=''></option></select>"),
                  t.querySelectorAll("[selected]").length ||
                    p.push("\\[" + N + "*(?:value|" + L + ")"),
                  t.querySelectorAll("[id~=" + m + "-]").length || p.push("~="),
                  t.querySelectorAll("a#" + m + "+*").length ||
                    p.push(".#.+[+~]"),
                  t.querySelectorAll(":checked").length || p.push(":checked"),
                  (e = c.createElement("input")).setAttribute("type", "hidden"),
                  t.appendChild(e).setAttribute("name", "D"),
                  (u.appendChild(t).disabled = !0),
                  2 !== t.querySelectorAll(":disabled").length &&
                    p.push(":enabled", ":disabled"),
                  (e = c.createElement("input")).setAttribute("name", ""),
                  t.appendChild(e),
                  t.querySelectorAll("[name='']").length ||
                    p.push("\\[" + N + "*name" + N + "*=" + N + "*(?:''|\"\")");
              }),
              g.cssHas || p.push(":has"),
              (p = p.length && new RegExp(p.join("|"))),
              (S = function (t, e) {
                if (t === e) return (a = !0), 0;
                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return (
                  n ||
                  (1 &
                    (n =
                      (t.ownerDocument || t) == (e.ownerDocument || e)
                        ? t.compareDocumentPosition(e)
                        : 1) ||
                  (!g.sortDetached && e.compareDocumentPosition(t) === n)
                    ? t === c || (t.ownerDocument == R && Z.contains(R, t))
                      ? -1
                      : e === c || (e.ownerDocument == R && Z.contains(R, e))
                      ? 1
                      : i
                      ? l.call(i, t) - l.call(i, e)
                      : 0
                    : 4 & n
                    ? -1
                    : 1)
                );
              }),
              c)
            : c;
        }
        for (t in ((Z.matches = function (t, e) {
          return Z(t, null, null, e);
        }),
        (Z.matchesSelector = function (t, e) {
          if ((ct(t), f && !j[e + " "] && (!p || !p.test(e))))
            try {
              var n = h.call(t, e);
              if (
                n ||
                g.disconnectedMatch ||
                (t.document && 11 !== t.document.nodeType)
              )
                return n;
            } catch (t) {
              j(e, !0);
            }
          return Z(e, c, null, [t]).length > 0;
        }),
        (Z.contains = function (t, e) {
          return (t.ownerDocument || t) != c && ct(t), w.contains(t, e);
        }),
        (Z.attr = function (t, n) {
          (t.ownerDocument || t) != c && ct(t);
          var r = e.attrHandle[n.toLowerCase()],
            i =
              r && d.call(e.attrHandle, n.toLowerCase()) ? r(t, n, !f) : void 0;
          return void 0 !== i ? i : t.getAttribute(n);
        }),
        (Z.error = function (t) {
          throw new Error("Syntax error, unrecognized expression: " + t);
        }),
        (w.uniqueSort = function (t) {
          var e,
            n = [],
            r = 0,
            o = 0;
          if (
            ((a = !g.sortStable),
            (i = !g.sortStable && s.call(t, 0)),
            k.call(t, S),
            a)
          ) {
            for (; (e = t[o++]); ) e === t[o] && (r = n.push(o));
            for (; r--; ) C.call(t, n[r], 1);
          }
          return (i = null), t;
        }),
        (w.fn.uniqueSort = function () {
          return this.pushStack(w.uniqueSort(s.apply(this)));
        }),
        ((e = w.expr =
          {
            cacheLength: 50,
            createPseudo: et,
            match: z,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (t) {
                return (
                  (t[1] = t[1].replace(V, J)),
                  (t[3] = (t[3] || t[4] || t[5] || "").replace(V, J)),
                  "~=" === t[2] && (t[3] = " " + t[3] + " "),
                  t.slice(0, 4)
                );
              },
              CHILD: function (t) {
                return (
                  (t[1] = t[1].toLowerCase()),
                  "nth" === t[1].slice(0, 3)
                    ? (t[3] || Z.error(t[0]),
                      (t[4] = +(t[4]
                        ? t[5] + (t[6] || 1)
                        : 2 * ("even" === t[3] || "odd" === t[3]))),
                      (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                    : t[3] && Z.error(t[0]),
                  t
                );
              },
              PSEUDO: function (t) {
                var e,
                  n = !t[6] && t[2];
                return z.CHILD.test(t[0])
                  ? null
                  : (t[3]
                      ? (t[2] = t[4] || t[5] || "")
                      : n &&
                        U.test(n) &&
                        (e = lt(n, !0)) &&
                        (e = n.indexOf(")", n.length - e) - n.length) &&
                        ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
                    t.slice(0, 3));
              },
            },
            filter: {
              TAG: function (t) {
                var e = t.replace(V, J).toLowerCase();
                return "*" === t
                  ? function () {
                      return !0;
                    }
                  : function (t) {
                      return T(t, e);
                    };
              },
              CLASS: function (t) {
                var e = _[t + " "];
                return (
                  e ||
                  ((e = new RegExp("(^|" + N + ")" + t + "(" + N + "|$)")) &&
                    _(t, function (t) {
                      return e.test(
                        ("string" == typeof t.className && t.className) ||
                          (void 0 !== t.getAttribute &&
                            t.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (t, e, n) {
                return function (r) {
                  var i = Z.attr(r, t);
                  return null == i
                    ? "!=" === e
                    : !e ||
                        ((i += ""),
                        "=" === e
                          ? i === n
                          : "!=" === e
                          ? i !== n
                          : "^=" === e
                          ? n && 0 === i.indexOf(n)
                          : "*=" === e
                          ? n && i.indexOf(n) > -1
                          : "$=" === e
                          ? n && i.slice(-n.length) === n
                          : "~=" === e
                          ? (" " + i.replace(M, " ") + " ").indexOf(n) > -1
                          : "|=" === e &&
                            (i === n || i.slice(0, n.length + 1) === n + "-"));
                };
              },
              CHILD: function (t, e, n, r, i) {
                var o = "nth" !== t.slice(0, 3),
                  a = "last" !== t.slice(-4),
                  s = "of-type" === e;
                return 1 === r && 0 === i
                  ? function (t) {
                      return !!t.parentNode;
                    }
                  : function (e, n, c) {
                      var u,
                        l,
                        f,
                        p,
                        d,
                        h = o !== a ? "nextSibling" : "previousSibling",
                        v = e.parentNode,
                        g = s && e.nodeName.toLowerCase(),
                        b = !c && !s,
                        _ = !1;
                      if (v) {
                        if (o) {
                          for (; h; ) {
                            for (f = e; (f = f[h]); )
                              if (s ? T(f, g) : 1 === f.nodeType) return !1;
                            d = h = "only" === t && !d && "nextSibling";
                          }
                          return !0;
                        }
                        if (((d = [a ? v.firstChild : v.lastChild]), a && b)) {
                          for (
                            _ =
                              (p =
                                (u = (l = v[m] || (v[m] = {}))[t] || [])[0] ===
                                  y && u[1]) && u[2],
                              f = p && v.childNodes[p];
                            (f = (++p && f && f[h]) || (_ = p = 0) || d.pop());

                          )
                            if (1 === f.nodeType && ++_ && f === e) {
                              l[t] = [y, p, _];
                              break;
                            }
                        } else if (
                          (b &&
                            (_ = p =
                              (u = (l = e[m] || (e[m] = {}))[t] || [])[0] ===
                                y && u[1]),
                          !1 === _)
                        )
                          for (
                            ;
                            (f =
                              (++p && f && f[h]) || (_ = p = 0) || d.pop()) &&
                            (!(s ? T(f, g) : 1 === f.nodeType) ||
                              !++_ ||
                              (b && ((l = f[m] || (f[m] = {}))[t] = [y, _]),
                              f !== e));

                          );
                        return (_ -= i) === r || (_ % r == 0 && _ / r >= 0);
                      }
                    };
              },
              PSEUDO: function (t, n) {
                var r,
                  i =
                    e.pseudos[t] ||
                    e.setFilters[t.toLowerCase()] ||
                    Z.error("unsupported pseudo: " + t);
                return i[m]
                  ? i(n)
                  : i.length > 1
                  ? ((r = [t, t, "", n]),
                    e.setFilters.hasOwnProperty(t.toLowerCase())
                      ? et(function (t, e) {
                          for (var r, o = i(t, n), a = o.length; a--; )
                            t[(r = l.call(t, o[a]))] = !(e[r] = o[a]);
                        })
                      : function (t) {
                          return i(t, 0, r);
                        })
                  : i;
              },
            },
            pseudos: {
              not: et(function (t) {
                var e = [],
                  n = [],
                  r = mt(t.replace(A, "$1"));
                return r[m]
                  ? et(function (t, e, n, i) {
                      for (var o, a = r(t, null, i, []), s = t.length; s--; )
                        (o = a[s]) && (t[s] = !(e[s] = o));
                    })
                  : function (t, i, o) {
                      return (
                        (e[0] = t), r(e, null, o, n), (e[0] = null), !n.pop()
                      );
                    };
              }),
              has: et(function (t) {
                return function (e) {
                  return Z(t, e).length > 0;
                };
              }),
              contains: et(function (t) {
                return (
                  (t = t.replace(V, J)),
                  function (e) {
                    return (e.textContent || w.text(e)).indexOf(t) > -1;
                  }
                );
              }),
              lang: et(function (t) {
                return (
                  W.test(t || "") || Z.error("unsupported lang: " + t),
                  (t = t.replace(V, J).toLowerCase()),
                  function (e) {
                    var n;
                    do {
                      if (
                        (n = f
                          ? e.lang
                          : e.getAttribute("xml:lang") ||
                            e.getAttribute("lang"))
                      )
                        return (
                          (n = n.toLowerCase()) === t ||
                          0 === n.indexOf(t + "-")
                        );
                    } while ((e = e.parentNode) && 1 === e.nodeType);
                    return !1;
                  }
                );
              }),
              target: function (t) {
                var e = n.location && n.location.hash;
                return e && e.slice(1) === t.id;
              },
              root: function (t) {
                return t === u;
              },
              focus: function (t) {
                return (
                  t ===
                    (function () {
                      try {
                        return c.activeElement;
                      } catch (t) {}
                    })() &&
                  c.hasFocus() &&
                  !!(t.type || t.href || ~t.tabIndex)
                );
              },
              enabled: ot(!1),
              disabled: ot(!0),
              checked: function (t) {
                return (
                  (T(t, "input") && !!t.checked) ||
                  (T(t, "option") && !!t.selected)
                );
              },
              selected: function (t) {
                return (
                  t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                );
              },
              empty: function (t) {
                for (t = t.firstChild; t; t = t.nextSibling)
                  if (t.nodeType < 6) return !1;
                return !0;
              },
              parent: function (t) {
                return !e.pseudos.empty(t);
              },
              header: function (t) {
                return Y.test(t.nodeName);
              },
              input: function (t) {
                return $.test(t.nodeName);
              },
              button: function (t) {
                return (T(t, "input") && "button" === t.type) || T(t, "button");
              },
              text: function (t) {
                var e;
                return (
                  T(t, "input") &&
                  "text" === t.type &&
                  (null == (e = t.getAttribute("type")) ||
                    "text" === e.toLowerCase())
                );
              },
              first: at(function () {
                return [0];
              }),
              last: at(function (t, e) {
                return [e - 1];
              }),
              eq: at(function (t, e, n) {
                return [n < 0 ? n + e : n];
              }),
              even: at(function (t, e) {
                for (var n = 0; n < e; n += 2) t.push(n);
                return t;
              }),
              odd: at(function (t, e) {
                for (var n = 1; n < e; n += 2) t.push(n);
                return t;
              }),
              lt: at(function (t, e, n) {
                var r;
                for (r = n < 0 ? n + e : n > e ? e : n; --r >= 0; ) t.push(r);
                return t;
              }),
              gt: at(function (t, e, n) {
                for (var r = n < 0 ? n + e : n; ++r < e; ) t.push(r);
                return t;
              }),
            },
          }).pseudos.nth = e.pseudos.eq),
        { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
          e.pseudos[t] = rt(t);
        for (t in { submit: !0, reset: !0 }) e.pseudos[t] = it(t);
        function ut() {}
        function lt(t, n) {
          var r,
            i,
            o,
            a,
            s,
            c,
            u,
            l = x[t + " "];
          if (l) return n ? 0 : l.slice(0);
          for (s = t, c = [], u = e.preFilter; s; ) {
            for (a in ((r && !(i = H.exec(s))) ||
              (i && (s = s.slice(i[0].length) || s), c.push((o = []))),
            (r = !1),
            (i = F.exec(s)) &&
              ((r = i.shift()),
              o.push({ value: r, type: i[0].replace(A, " ") }),
              (s = s.slice(r.length))),
            e.filter))
              !(i = z[a].exec(s)) ||
                (u[a] && !(i = u[a](i))) ||
                ((r = i.shift()),
                o.push({ value: r, type: a, matches: i }),
                (s = s.slice(r.length)));
            if (!r) break;
          }
          return n ? s.length : s ? Z.error(t) : x(t, c).slice(0);
        }
        function ft(t) {
          for (var e = 0, n = t.length, r = ""; e < n; e++) r += t[e].value;
          return r;
        }
        function pt(t, e, n) {
          var r = e.dir,
            i = e.next,
            o = i || r,
            a = n && "parentNode" === o,
            s = b++;
          return e.first
            ? function (e, n, i) {
                for (; (e = e[r]); )
                  if (1 === e.nodeType || a) return t(e, n, i);
                return !1;
              }
            : function (e, n, c) {
                var u,
                  l,
                  f = [y, s];
                if (c) {
                  for (; (e = e[r]); )
                    if ((1 === e.nodeType || a) && t(e, n, c)) return !0;
                } else
                  for (; (e = e[r]); )
                    if (1 === e.nodeType || a)
                      if (((l = e[m] || (e[m] = {})), i && T(e, i)))
                        e = e[r] || e;
                      else {
                        if ((u = l[o]) && u[0] === y && u[1] === s)
                          return (f[2] = u[2]);
                        if (((l[o] = f), (f[2] = t(e, n, c)))) return !0;
                      }
                return !1;
              };
        }
        function dt(t) {
          return t.length > 1
            ? function (e, n, r) {
                for (var i = t.length; i--; ) if (!t[i](e, n, r)) return !1;
                return !0;
              }
            : t[0];
        }
        function ht(t, e, n, r, i) {
          for (var o, a = [], s = 0, c = t.length, u = null != e; s < c; s++)
            (o = t[s]) && ((n && !n(o, r, i)) || (a.push(o), u && e.push(s)));
          return a;
        }
        function vt(t, e, n, r, i, o) {
          return (
            r && !r[m] && (r = vt(r)),
            i && !i[m] && (i = vt(i, o)),
            et(function (o, a, s, c) {
              var u,
                f,
                p,
                d,
                h = [],
                g = [],
                m = a.length,
                y =
                  o ||
                  (function (t, e, n) {
                    for (var r = 0, i = e.length; r < i; r++) Z(t, e[r], n);
                    return n;
                  })(e || "*", s.nodeType ? [s] : s, []),
                b = !t || (!o && e) ? y : ht(y, h, t, s, c);
              if (
                (n ? n(b, (d = i || (o ? t : m || r) ? [] : a), s, c) : (d = b),
                r)
              )
                for (u = ht(d, g), r(u, [], s, c), f = u.length; f--; )
                  (p = u[f]) && (d[g[f]] = !(b[g[f]] = p));
              if (o) {
                if (i || t) {
                  if (i) {
                    for (u = [], f = d.length; f--; )
                      (p = d[f]) && u.push((b[f] = p));
                    i(null, (d = []), u, c);
                  }
                  for (f = d.length; f--; )
                    (p = d[f]) &&
                      (u = i ? l.call(o, p) : h[f]) > -1 &&
                      (o[u] = !(a[u] = p));
                }
              } else (d = ht(d === a ? d.splice(m, d.length) : d)), i ? i(null, a, d, c) : v.apply(a, d);
            })
          );
        }
        function gt(t) {
          for (
            var n,
              i,
              o,
              a = t.length,
              s = e.relative[t[0].type],
              c = s || e.relative[" "],
              u = s ? 1 : 0,
              f = pt(
                function (t) {
                  return t === n;
                },
                c,
                !0
              ),
              p = pt(
                function (t) {
                  return l.call(n, t) > -1;
                },
                c,
                !0
              ),
              d = [
                function (t, e, i) {
                  var o =
                    (!s && (i || e != r)) ||
                    ((n = e).nodeType ? f(t, e, i) : p(t, e, i));
                  return (n = null), o;
                },
              ];
            u < a;
            u++
          )
            if ((i = e.relative[t[u].type])) d = [pt(dt(d), i)];
            else {
              if ((i = e.filter[t[u].type].apply(null, t[u].matches))[m]) {
                for (o = ++u; o < a && !e.relative[t[o].type]; o++);
                return vt(
                  u > 1 && dt(d),
                  u > 1 &&
                    ft(
                      t
                        .slice(0, u - 1)
                        .concat({ value: " " === t[u - 2].type ? "*" : "" })
                    ).replace(A, "$1"),
                  i,
                  u < o && gt(t.slice(u, o)),
                  o < a && gt((t = t.slice(o))),
                  o < a && ft(t)
                );
              }
              d.push(i);
            }
          return dt(d);
        }
        function mt(t, n) {
          var i,
            o = [],
            a = [],
            s = O[t + " "];
          if (!s) {
            for (n || (n = lt(t)), i = n.length; i--; )
              (s = gt(n[i]))[m] ? o.push(s) : a.push(s);
            (s = O(
              t,
              (function (t, n) {
                var i = n.length > 0,
                  o = t.length > 0,
                  a = function (a, s, u, l, p) {
                    var d,
                      h,
                      g,
                      m = 0,
                      b = "0",
                      _ = a && [],
                      x = [],
                      O = r,
                      j = a || (o && e.find.TAG("*", p)),
                      S = (y += null == O ? 1 : Math.random() || 0.1),
                      T = j.length;
                    for (
                      p && (r = s == c || s || p);
                      b !== T && null != (d = j[b]);
                      b++
                    ) {
                      if (o && d) {
                        for (
                          h = 0, s || d.ownerDocument == c || (ct(d), (u = !f));
                          (g = t[h++]);

                        )
                          if (g(d, s || c, u)) {
                            v.call(l, d);
                            break;
                          }
                        p && (y = S);
                      }
                      i && ((d = !g && d) && m--, a && _.push(d));
                    }
                    if (((m += b), i && b !== m)) {
                      for (h = 0; (g = n[h++]); ) g(_, x, s, u);
                      if (a) {
                        if (m > 0)
                          for (; b--; ) _[b] || x[b] || (x[b] = E.call(l));
                        x = ht(x);
                      }
                      v.apply(l, x),
                        p &&
                          !a &&
                          x.length > 0 &&
                          m + n.length > 1 &&
                          w.uniqueSort(l);
                    }
                    return p && ((y = S), (r = O)), _;
                  };
                return i ? et(a) : a;
              })(a, o)
            )).selector = t;
          }
          return s;
        }
        function yt(t, n, r, i) {
          var o,
            a,
            s,
            c,
            u,
            l = "function" == typeof t && t,
            p = !i && lt((t = l.selector || t));
          if (((r = r || []), 1 === p.length)) {
            if (
              (a = p[0] = p[0].slice(0)).length > 2 &&
              "ID" === (s = a[0]).type &&
              9 === n.nodeType &&
              f &&
              e.relative[a[1].type]
            ) {
              if (!(n = (e.find.ID(s.matches[0].replace(V, J), n) || [])[0]))
                return r;
              l && (n = n.parentNode), (t = t.slice(a.shift().value.length));
            }
            for (
              o = z.needsContext.test(t) ? 0 : a.length;
              o-- && ((s = a[o]), !e.relative[(c = s.type)]);

            )
              if (
                (u = e.find[c]) &&
                (i = u(
                  s.matches[0].replace(V, J),
                  (X.test(a[0].type) && st(n.parentNode)) || n
                ))
              ) {
                if ((a.splice(o, 1), !(t = i.length && ft(a))))
                  return v.apply(r, i), r;
                break;
              }
          }
          return (
            (l || mt(t, p))(
              i,
              n,
              !f,
              r,
              !n || (X.test(t) && st(n.parentNode)) || n
            ),
            r
          );
        }
        (ut.prototype = e.filters = e.pseudos),
          (e.setFilters = new ut()),
          (g.sortStable = m.split("").sort(S).join("") === m),
          ct(),
          (g.sortDetached = nt(function (t) {
            return 1 & t.compareDocumentPosition(c.createElement("fieldset"));
          })),
          (w.find = Z),
          (w.expr[":"] = w.expr.pseudos),
          (w.unique = w.uniqueSort),
          (Z.compile = mt),
          (Z.select = yt),
          (Z.setDocument = ct),
          (Z.tokenize = lt),
          (Z.escape = w.escapeSelector),
          (Z.getText = w.text),
          (Z.isXML = w.isXMLDoc),
          (Z.selectors = w.expr),
          (Z.support = w.support),
          (Z.uniqueSort = w.uniqueSort);
      })();
      var P = function (t, e, n) {
          for (var r = [], i = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; )
            if (1 === t.nodeType) {
              if (i && w(t).is(n)) break;
              r.push(t);
            }
          return r;
        },
        q = function (t, e) {
          for (var n = []; t; t = t.nextSibling)
            1 === t.nodeType && t !== e && n.push(t);
          return n;
        },
        M = w.expr.match.needsContext,
        H = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
      function F(t, e, n) {
        return m(e)
          ? w.grep(t, function (t, r) {
              return !!e.call(t, r, t) !== n;
            })
          : e.nodeType
          ? w.grep(t, function (t) {
              return (t === e) !== n;
            })
          : "string" != typeof e
          ? w.grep(t, function (t) {
              return l.call(e, t) > -1 !== n;
            })
          : w.filter(e, t, n);
      }
      (w.filter = function (t, e, n) {
        var r = e[0];
        return (
          n && (t = ":not(" + t + ")"),
          1 === e.length && 1 === r.nodeType
            ? w.find.matchesSelector(r, t)
              ? [r]
              : []
            : w.find.matches(
                t,
                w.grep(e, function (t) {
                  return 1 === t.nodeType;
                })
              )
        );
      }),
        w.fn.extend({
          find: function (t) {
            var e,
              n,
              r = this.length,
              i = this;
            if ("string" != typeof t)
              return this.pushStack(
                w(t).filter(function () {
                  for (e = 0; e < r; e++) if (w.contains(i[e], this)) return !0;
                })
              );
            for (n = this.pushStack([]), e = 0; e < r; e++) w.find(t, i[e], n);
            return r > 1 ? w.uniqueSort(n) : n;
          },
          filter: function (t) {
            return this.pushStack(F(this, t || [], !1));
          },
          not: function (t) {
            return this.pushStack(F(this, t || [], !0));
          },
          is: function (t) {
            return !!F(
              this,
              "string" == typeof t && M.test(t) ? w(t) : t || [],
              !1
            ).length;
          },
        });
      var B,
        U = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
      ((w.fn.init = function (t, e, n) {
        var r, i;
        if (!t) return this;
        if (((n = n || B), "string" == typeof t)) {
          if (
            !(r =
              "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3
                ? [null, t, null]
                : U.exec(t)) ||
            (!r[1] && e)
          )
            return !e || e.jquery
              ? (e || n).find(t)
              : this.constructor(e).find(t);
          if (r[1]) {
            if (
              ((e = e instanceof w ? e[0] : e),
              w.merge(
                this,
                w.parseHTML(
                  r[1],
                  e && e.nodeType ? e.ownerDocument || e : b,
                  !0
                )
              ),
              H.test(r[1]) && w.isPlainObject(e))
            )
              for (r in e) m(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
            return this;
          }
          return (
            (i = b.getElementById(r[2])) && ((this[0] = i), (this.length = 1)),
            this
          );
        }
        return t.nodeType
          ? ((this[0] = t), (this.length = 1), this)
          : m(t)
          ? void 0 !== n.ready
            ? n.ready(t)
            : t(w)
          : w.makeArray(t, this);
      }).prototype = w.fn),
        (B = w(b));
      var W = /^(?:parents|prev(?:Until|All))/,
        z = { children: !0, contents: !0, next: !0, prev: !0 };
      function $(t, e) {
        for (; (t = t[e]) && 1 !== t.nodeType; );
        return t;
      }
      w.fn.extend({
        has: function (t) {
          var e = w(t, this),
            n = e.length;
          return this.filter(function () {
            for (var t = 0; t < n; t++) if (w.contains(this, e[t])) return !0;
          });
        },
        closest: function (t, e) {
          var n,
            r = 0,
            i = this.length,
            o = [],
            a = "string" != typeof t && w(t);
          if (!M.test(t))
            for (; r < i; r++)
              for (n = this[r]; n && n !== e; n = n.parentNode)
                if (
                  n.nodeType < 11 &&
                  (a
                    ? a.index(n) > -1
                    : 1 === n.nodeType && w.find.matchesSelector(n, t))
                ) {
                  o.push(n);
                  break;
                }
          return this.pushStack(o.length > 1 ? w.uniqueSort(o) : o);
        },
        index: function (t) {
          return t
            ? "string" == typeof t
              ? l.call(w(t), this[0])
              : l.call(this, t.jquery ? t[0] : t)
            : this[0] && this[0].parentNode
            ? this.first().prevAll().length
            : -1;
        },
        add: function (t, e) {
          return this.pushStack(w.uniqueSort(w.merge(this.get(), w(t, e))));
        },
        addBack: function (t) {
          return this.add(
            null == t ? this.prevObject : this.prevObject.filter(t)
          );
        },
      }),
        w.each(
          {
            parent: function (t) {
              var e = t.parentNode;
              return e && 11 !== e.nodeType ? e : null;
            },
            parents: function (t) {
              return P(t, "parentNode");
            },
            parentsUntil: function (t, e, n) {
              return P(t, "parentNode", n);
            },
            next: function (t) {
              return $(t, "nextSibling");
            },
            prev: function (t) {
              return $(t, "previousSibling");
            },
            nextAll: function (t) {
              return P(t, "nextSibling");
            },
            prevAll: function (t) {
              return P(t, "previousSibling");
            },
            nextUntil: function (t, e, n) {
              return P(t, "nextSibling", n);
            },
            prevUntil: function (t, e, n) {
              return P(t, "previousSibling", n);
            },
            siblings: function (t) {
              return q((t.parentNode || {}).firstChild, t);
            },
            children: function (t) {
              return q(t.firstChild);
            },
            contents: function (t) {
              return null != t.contentDocument && a(t.contentDocument)
                ? t.contentDocument
                : (T(t, "template") && (t = t.content || t),
                  w.merge([], t.childNodes));
            },
          },
          function (t, e) {
            w.fn[t] = function (n, r) {
              var i = w.map(this, e, n);
              return (
                "Until" !== t.slice(-5) && (r = n),
                r && "string" == typeof r && (i = w.filter(r, i)),
                this.length > 1 &&
                  (z[t] || w.uniqueSort(i), W.test(t) && i.reverse()),
                this.pushStack(i)
              );
            };
          }
        );
      var Y = /[^\x20\t\r\n\f]+/g;
      function G(t) {
        return t;
      }
      function X(t) {
        throw t;
      }
      function V(t, e, n, r) {
        var i;
        try {
          t && m((i = t.promise))
            ? i.call(t).done(e).fail(n)
            : t && m((i = t.then))
            ? i.call(t, e, n)
            : e.apply(void 0, [t].slice(r));
        } catch (t) {
          n.apply(void 0, [t]);
        }
      }
      (w.Callbacks = function (t) {
        t =
          "string" == typeof t
            ? (function (t) {
                var e = {};
                return (
                  w.each(t.match(Y) || [], function (t, n) {
                    e[n] = !0;
                  }),
                  e
                );
              })(t)
            : w.extend({}, t);
        var e,
          n,
          r,
          i,
          o = [],
          a = [],
          s = -1,
          c = function () {
            for (i = i || t.once, r = e = !0; a.length; s = -1)
              for (n = a.shift(); ++s < o.length; )
                !1 === o[s].apply(n[0], n[1]) &&
                  t.stopOnFalse &&
                  ((s = o.length), (n = !1));
            t.memory || (n = !1), (e = !1), i && (o = n ? [] : "");
          },
          u = {
            add: function () {
              return (
                o &&
                  (n && !e && ((s = o.length - 1), a.push(n)),
                  (function e(n) {
                    w.each(n, function (n, r) {
                      m(r)
                        ? (t.unique && u.has(r)) || o.push(r)
                        : r && r.length && "string" !== O(r) && e(r);
                    });
                  })(arguments),
                  n && !e && c()),
                this
              );
            },
            remove: function () {
              return (
                w.each(arguments, function (t, e) {
                  for (var n; (n = w.inArray(e, o, n)) > -1; )
                    o.splice(n, 1), n <= s && s--;
                }),
                this
              );
            },
            has: function (t) {
              return t ? w.inArray(t, o) > -1 : o.length > 0;
            },
            empty: function () {
              return o && (o = []), this;
            },
            disable: function () {
              return (i = a = []), (o = n = ""), this;
            },
            disabled: function () {
              return !o;
            },
            lock: function () {
              return (i = a = []), n || e || (o = n = ""), this;
            },
            locked: function () {
              return !!i;
            },
            fireWith: function (t, n) {
              return (
                i ||
                  ((n = [t, (n = n || []).slice ? n.slice() : n]),
                  a.push(n),
                  e || c()),
                this
              );
            },
            fire: function () {
              return u.fireWith(this, arguments), this;
            },
            fired: function () {
              return !!r;
            },
          };
        return u;
      }),
        w.extend({
          Deferred: function (t) {
            var e = [
                [
                  "notify",
                  "progress",
                  w.Callbacks("memory"),
                  w.Callbacks("memory"),
                  2,
                ],
                [
                  "resolve",
                  "done",
                  w.Callbacks("once memory"),
                  w.Callbacks("once memory"),
                  0,
                  "resolved",
                ],
                [
                  "reject",
                  "fail",
                  w.Callbacks("once memory"),
                  w.Callbacks("once memory"),
                  1,
                  "rejected",
                ],
              ],
              r = "pending",
              i = {
                state: function () {
                  return r;
                },
                always: function () {
                  return o.done(arguments).fail(arguments), this;
                },
                catch: function (t) {
                  return i.then(null, t);
                },
                pipe: function () {
                  var t = arguments;
                  return w
                    .Deferred(function (n) {
                      w.each(e, function (e, r) {
                        var i = m(t[r[4]]) && t[r[4]];
                        o[r[1]](function () {
                          var t = i && i.apply(this, arguments);
                          t && m(t.promise)
                            ? t
                                .promise()
                                .progress(n.notify)
                                .done(n.resolve)
                                .fail(n.reject)
                            : n[r[0] + "With"](this, i ? [t] : arguments);
                        });
                      }),
                        (t = null);
                    })
                    .promise();
                },
                then: function (t, r, i) {
                  var o = 0;
                  function a(t, e, r, i) {
                    return function () {
                      var s = this,
                        c = arguments,
                        u = function () {
                          var n, u;
                          if (!(t < o)) {
                            if ((n = r.apply(s, c)) === e.promise())
                              throw new TypeError("Thenable self-resolution");
                            (u =
                              n &&
                              ("object" == typeof n ||
                                "function" == typeof n) &&
                              n.then),
                              m(u)
                                ? i
                                  ? u.call(n, a(o, e, G, i), a(o, e, X, i))
                                  : (o++,
                                    u.call(
                                      n,
                                      a(o, e, G, i),
                                      a(o, e, X, i),
                                      a(o, e, G, e.notifyWith)
                                    ))
                                : (r !== G && ((s = void 0), (c = [n])),
                                  (i || e.resolveWith)(s, c));
                          }
                        },
                        l = i
                          ? u
                          : function () {
                              try {
                                u();
                              } catch (n) {
                                w.Deferred.exceptionHook &&
                                  w.Deferred.exceptionHook(n, l.error),
                                  t + 1 >= o &&
                                    (r !== X && ((s = void 0), (c = [n])),
                                    e.rejectWith(s, c));
                              }
                            };
                      t
                        ? l()
                        : (w.Deferred.getErrorHook
                            ? (l.error = w.Deferred.getErrorHook())
                            : w.Deferred.getStackHook &&
                              (l.error = w.Deferred.getStackHook()),
                          n.setTimeout(l));
                    };
                  }
                  return w
                    .Deferred(function (n) {
                      e[0][3].add(a(0, n, m(i) ? i : G, n.notifyWith)),
                        e[1][3].add(a(0, n, m(t) ? t : G)),
                        e[2][3].add(a(0, n, m(r) ? r : X));
                    })
                    .promise();
                },
                promise: function (t) {
                  return null != t ? w.extend(t, i) : i;
                },
              },
              o = {};
            return (
              w.each(e, function (t, n) {
                var a = n[2],
                  s = n[5];
                (i[n[1]] = a.add),
                  s &&
                    a.add(
                      function () {
                        r = s;
                      },
                      e[3 - t][2].disable,
                      e[3 - t][3].disable,
                      e[0][2].lock,
                      e[0][3].lock
                    ),
                  a.add(n[3].fire),
                  (o[n[0]] = function () {
                    return (
                      o[n[0] + "With"](this === o ? void 0 : this, arguments),
                      this
                    );
                  }),
                  (o[n[0] + "With"] = a.fireWith);
              }),
              i.promise(o),
              t && t.call(o, o),
              o
            );
          },
          when: function (t) {
            var e = arguments.length,
              n = e,
              r = Array(n),
              i = s.call(arguments),
              o = w.Deferred(),
              a = function (t) {
                return function (n) {
                  (r[t] = this),
                    (i[t] = arguments.length > 1 ? s.call(arguments) : n),
                    --e || o.resolveWith(r, i);
                };
              };
            if (
              e <= 1 &&
              (V(t, o.done(a(n)).resolve, o.reject, !e),
              "pending" === o.state() || m(i[n] && i[n].then))
            )
              return o.then();
            for (; n--; ) V(i[n], a(n), o.reject);
            return o.promise();
          },
        });
      var J = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
      (w.Deferred.exceptionHook = function (t, e) {
        n.console &&
          n.console.warn &&
          t &&
          J.test(t.name) &&
          n.console.warn("jQuery.Deferred exception: " + t.message, t.stack, e);
      }),
        (w.readyException = function (t) {
          n.setTimeout(function () {
            throw t;
          });
        });
      var K = w.Deferred();
      function Q() {
        b.removeEventListener("DOMContentLoaded", Q),
          n.removeEventListener("load", Q),
          w.ready();
      }
      (w.fn.ready = function (t) {
        return (
          K.then(t).catch(function (t) {
            w.readyException(t);
          }),
          this
        );
      }),
        w.extend({
          isReady: !1,
          readyWait: 1,
          ready: function (t) {
            (!0 === t ? --w.readyWait : w.isReady) ||
              ((w.isReady = !0),
              (!0 !== t && --w.readyWait > 0) || K.resolveWith(b, [w]));
          },
        }),
        (w.ready.then = K.then),
        "complete" === b.readyState ||
        ("loading" !== b.readyState && !b.documentElement.doScroll)
          ? n.setTimeout(w.ready)
          : (b.addEventListener("DOMContentLoaded", Q),
            n.addEventListener("load", Q));
      var Z = function (t, e, n, r, i, o, a) {
          var s = 0,
            c = t.length,
            u = null == n;
          if ("object" === O(n))
            for (s in ((i = !0), n)) Z(t, e, s, n[s], !0, o, a);
          else if (
            void 0 !== r &&
            ((i = !0),
            m(r) || (a = !0),
            u &&
              (a
                ? (e.call(t, r), (e = null))
                : ((u = e),
                  (e = function (t, e, n) {
                    return u.call(w(t), n);
                  }))),
            e)
          )
            for (; s < c; s++) e(t[s], n, a ? r : r.call(t[s], s, e(t[s], n)));
          return i ? t : u ? e.call(t) : c ? e(t[0], n) : o;
        },
        tt = /^-ms-/,
        et = /-([a-z])/g;
      function nt(t, e) {
        return e.toUpperCase();
      }
      function rt(t) {
        return t.replace(tt, "ms-").replace(et, nt);
      }
      var it = function (t) {
        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
      };
      function ot() {
        this.expando = w.expando + ot.uid++;
      }
      (ot.uid = 1),
        (ot.prototype = {
          cache: function (t) {
            var e = t[this.expando];
            return (
              e ||
                ((e = {}),
                it(t) &&
                  (t.nodeType
                    ? (t[this.expando] = e)
                    : Object.defineProperty(t, this.expando, {
                        value: e,
                        configurable: !0,
                      }))),
              e
            );
          },
          set: function (t, e, n) {
            var r,
              i = this.cache(t);
            if ("string" == typeof e) i[rt(e)] = n;
            else for (r in e) i[rt(r)] = e[r];
            return i;
          },
          get: function (t, e) {
            return void 0 === e
              ? this.cache(t)
              : t[this.expando] && t[this.expando][rt(e)];
          },
          access: function (t, e, n) {
            return void 0 === e || (e && "string" == typeof e && void 0 === n)
              ? this.get(t, e)
              : (this.set(t, e, n), void 0 !== n ? n : e);
          },
          remove: function (t, e) {
            var n,
              r = t[this.expando];
            if (void 0 !== r) {
              if (void 0 !== e) {
                n = (e = Array.isArray(e)
                  ? e.map(rt)
                  : (e = rt(e)) in r
                  ? [e]
                  : e.match(Y) || []).length;
                for (; n--; ) delete r[e[n]];
              }
              (void 0 === e || w.isEmptyObject(r)) &&
                (t.nodeType
                  ? (t[this.expando] = void 0)
                  : delete t[this.expando]);
            }
          },
          hasData: function (t) {
            var e = t[this.expando];
            return void 0 !== e && !w.isEmptyObject(e);
          },
        });
      var at = new ot(),
        st = new ot(),
        ct = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ut = /[A-Z]/g;
      function lt(t, e, n) {
        var r;
        if (void 0 === n && 1 === t.nodeType)
          if (
            ((r = "data-" + e.replace(ut, "-$&").toLowerCase()),
            "string" == typeof (n = t.getAttribute(r)))
          ) {
            try {
              n = (function (t) {
                return (
                  "true" === t ||
                  ("false" !== t &&
                    ("null" === t
                      ? null
                      : t === +t + ""
                      ? +t
                      : ct.test(t)
                      ? JSON.parse(t)
                      : t))
                );
              })(n);
            } catch (t) {}
            st.set(t, e, n);
          } else n = void 0;
        return n;
      }
      w.extend({
        hasData: function (t) {
          return st.hasData(t) || at.hasData(t);
        },
        data: function (t, e, n) {
          return st.access(t, e, n);
        },
        removeData: function (t, e) {
          st.remove(t, e);
        },
        _data: function (t, e, n) {
          return at.access(t, e, n);
        },
        _removeData: function (t, e) {
          at.remove(t, e);
        },
      }),
        w.fn.extend({
          data: function (t, e) {
            var n,
              r,
              i,
              o = this[0],
              a = o && o.attributes;
            if (void 0 === t) {
              if (
                this.length &&
                ((i = st.get(o)),
                1 === o.nodeType && !at.get(o, "hasDataAttrs"))
              ) {
                for (n = a.length; n--; )
                  a[n] &&
                    0 === (r = a[n].name).indexOf("data-") &&
                    ((r = rt(r.slice(5))), lt(o, r, i[r]));
                at.set(o, "hasDataAttrs", !0);
              }
              return i;
            }
            return "object" == typeof t
              ? this.each(function () {
                  st.set(this, t);
                })
              : Z(
                  this,
                  function (e) {
                    var n;
                    if (o && void 0 === e)
                      return void 0 !== (n = st.get(o, t)) ||
                        void 0 !== (n = lt(o, t))
                        ? n
                        : void 0;
                    this.each(function () {
                      st.set(this, t, e);
                    });
                  },
                  null,
                  e,
                  arguments.length > 1,
                  null,
                  !0
                );
          },
          removeData: function (t) {
            return this.each(function () {
              st.remove(this, t);
            });
          },
        }),
        w.extend({
          queue: function (t, e, n) {
            var r;
            if (t)
              return (
                (e = (e || "fx") + "queue"),
                (r = at.get(t, e)),
                n &&
                  (!r || Array.isArray(n)
                    ? (r = at.access(t, e, w.makeArray(n)))
                    : r.push(n)),
                r || []
              );
          },
          dequeue: function (t, e) {
            e = e || "fx";
            var n = w.queue(t, e),
              r = n.length,
              i = n.shift(),
              o = w._queueHooks(t, e);
            "inprogress" === i && ((i = n.shift()), r--),
              i &&
                ("fx" === e && n.unshift("inprogress"),
                delete o.stop,
                i.call(
                  t,
                  function () {
                    w.dequeue(t, e);
                  },
                  o
                )),
              !r && o && o.empty.fire();
          },
          _queueHooks: function (t, e) {
            var n = e + "queueHooks";
            return (
              at.get(t, n) ||
              at.access(t, n, {
                empty: w.Callbacks("once memory").add(function () {
                  at.remove(t, [e + "queue", n]);
                }),
              })
            );
          },
        }),
        w.fn.extend({
          queue: function (t, e) {
            var n = 2;
            return (
              "string" != typeof t && ((e = t), (t = "fx"), n--),
              arguments.length < n
                ? w.queue(this[0], t)
                : void 0 === e
                ? this
                : this.each(function () {
                    var n = w.queue(this, t, e);
                    w._queueHooks(this, t),
                      "fx" === t && "inprogress" !== n[0] && w.dequeue(this, t);
                  })
            );
          },
          dequeue: function (t) {
            return this.each(function () {
              w.dequeue(this, t);
            });
          },
          clearQueue: function (t) {
            return this.queue(t || "fx", []);
          },
          promise: function (t, e) {
            var n,
              r = 1,
              i = w.Deferred(),
              o = this,
              a = this.length,
              s = function () {
                --r || i.resolveWith(o, [o]);
              };
            for (
              "string" != typeof t && ((e = t), (t = void 0)), t = t || "fx";
              a--;

            )
              (n = at.get(o[a], t + "queueHooks")) &&
                n.empty &&
                (r++, n.empty.add(s));
            return s(), i.promise(e);
          },
        });
      var ft = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        pt = new RegExp("^(?:([+-])=|)(" + ft + ")([a-z%]*)$", "i"),
        dt = ["Top", "Right", "Bottom", "Left"],
        ht = b.documentElement,
        vt = function (t) {
          return w.contains(t.ownerDocument, t);
        },
        gt = { composed: !0 };
      ht.getRootNode &&
        (vt = function (t) {
          return (
            w.contains(t.ownerDocument, t) ||
            t.getRootNode(gt) === t.ownerDocument
          );
        });
      var mt = function (t, e) {
        return (
          "none" === (t = e || t).style.display ||
          ("" === t.style.display && vt(t) && "none" === w.css(t, "display"))
        );
      };
      function yt(t, e, n, r) {
        var i,
          o,
          a = 20,
          s = r
            ? function () {
                return r.cur();
              }
            : function () {
                return w.css(t, e, "");
              },
          c = s(),
          u = (n && n[3]) || (w.cssNumber[e] ? "" : "px"),
          l =
            t.nodeType &&
            (w.cssNumber[e] || ("px" !== u && +c)) &&
            pt.exec(w.css(t, e));
        if (l && l[3] !== u) {
          for (c /= 2, u = u || l[3], l = +c || 1; a--; )
            w.style(t, e, l + u),
              (1 - o) * (1 - (o = s() / c || 0.5)) <= 0 && (a = 0),
              (l /= o);
          (l *= 2), w.style(t, e, l + u), (n = n || []);
        }
        return (
          n &&
            ((l = +l || +c || 0),
            (i = n[1] ? l + (n[1] + 1) * n[2] : +n[2]),
            r && ((r.unit = u), (r.start = l), (r.end = i))),
          i
        );
      }
      var bt = {};
      function _t(t) {
        var e,
          n = t.ownerDocument,
          r = t.nodeName,
          i = bt[r];
        return (
          i ||
          ((e = n.body.appendChild(n.createElement(r))),
          (i = w.css(e, "display")),
          e.parentNode.removeChild(e),
          "none" === i && (i = "block"),
          (bt[r] = i),
          i)
        );
      }
      function xt(t, e) {
        for (var n, r, i = [], o = 0, a = t.length; o < a; o++)
          (r = t[o]).style &&
            ((n = r.style.display),
            e
              ? ("none" === n &&
                  ((i[o] = at.get(r, "display") || null),
                  i[o] || (r.style.display = "")),
                "" === r.style.display && mt(r) && (i[o] = _t(r)))
              : "none" !== n && ((i[o] = "none"), at.set(r, "display", n)));
        for (o = 0; o < a; o++) null != i[o] && (t[o].style.display = i[o]);
        return t;
      }
      w.fn.extend({
        show: function () {
          return xt(this, !0);
        },
        hide: function () {
          return xt(this);
        },
        toggle: function (t) {
          return "boolean" == typeof t
            ? t
              ? this.show()
              : this.hide()
            : this.each(function () {
                mt(this) ? w(this).show() : w(this).hide();
              });
        },
      });
      var Ot,
        jt,
        wt = /^(?:checkbox|radio)$/i,
        St = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        Tt = /^$|^module$|\/(?:java|ecma)script/i;
      (Ot = b.createDocumentFragment().appendChild(b.createElement("div"))),
        (jt = b.createElement("input")).setAttribute("type", "radio"),
        jt.setAttribute("checked", "checked"),
        jt.setAttribute("name", "t"),
        Ot.appendChild(jt),
        (g.checkClone = Ot.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (Ot.innerHTML = "<textarea>x</textarea>"),
        (g.noCloneChecked = !!Ot.cloneNode(!0).lastChild.defaultValue),
        (Ot.innerHTML = "<option></option>"),
        (g.option = !!Ot.lastChild);
      var Et = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""],
      };
      function kt(t, e) {
        var n;
        return (
          (n =
            void 0 !== t.getElementsByTagName
              ? t.getElementsByTagName(e || "*")
              : void 0 !== t.querySelectorAll
              ? t.querySelectorAll(e || "*")
              : []),
          void 0 === e || (e && T(t, e)) ? w.merge([t], n) : n
        );
      }
      function Ct(t, e) {
        for (var n = 0, r = t.length; n < r; n++)
          at.set(t[n], "globalEval", !e || at.get(e[n], "globalEval"));
      }
      (Et.tbody = Et.tfoot = Et.colgroup = Et.caption = Et.thead),
        (Et.th = Et.td),
        g.option ||
          (Et.optgroup = Et.option =
            [1, "<select multiple='multiple'>", "</select>"]);
      var Nt = /<|&#?\w+;/;
      function At(t, e, n, r, i) {
        for (
          var o,
            a,
            s,
            c,
            u,
            l,
            f = e.createDocumentFragment(),
            p = [],
            d = 0,
            h = t.length;
          d < h;
          d++
        )
          if ((o = t[d]) || 0 === o)
            if ("object" === O(o)) w.merge(p, o.nodeType ? [o] : o);
            else if (Nt.test(o)) {
              for (
                a = a || f.appendChild(e.createElement("div")),
                  s = (St.exec(o) || ["", ""])[1].toLowerCase(),
                  c = Et[s] || Et._default,
                  a.innerHTML = c[1] + w.htmlPrefilter(o) + c[2],
                  l = c[0];
                l--;

              )
                a = a.lastChild;
              w.merge(p, a.childNodes), ((a = f.firstChild).textContent = "");
            } else p.push(e.createTextNode(o));
        for (f.textContent = "", d = 0; (o = p[d++]); )
          if (r && w.inArray(o, r) > -1) i && i.push(o);
          else if (
            ((u = vt(o)), (a = kt(f.appendChild(o), "script")), u && Ct(a), n)
          )
            for (l = 0; (o = a[l++]); ) Tt.test(o.type || "") && n.push(o);
        return f;
      }
      var Lt = /^([^.]*)(?:\.(.+)|)/;
      function Dt() {
        return !0;
      }
      function Rt() {
        return !1;
      }
      function It(t, e, n, r, i, o) {
        var a, s;
        if ("object" == typeof e) {
          for (s in ("string" != typeof n && ((r = r || n), (n = void 0)), e))
            It(t, s, n, r, e[s], o);
          return t;
        }
        if (
          (null == r && null == i
            ? ((i = n), (r = n = void 0))
            : null == i &&
              ("string" == typeof n
                ? ((i = r), (r = void 0))
                : ((i = r), (r = n), (n = void 0))),
          !1 === i)
        )
          i = Rt;
        else if (!i) return t;
        return (
          1 === o &&
            ((a = i),
            ((i = function (t) {
              return w().off(t), a.apply(this, arguments);
            }).guid = a.guid || (a.guid = w.guid++))),
          t.each(function () {
            w.event.add(this, e, i, r, n);
          })
        );
      }
      function Pt(t, e, n) {
        n
          ? (at.set(t, e, !1),
            w.event.add(t, e, {
              namespace: !1,
              handler: function (t) {
                var n,
                  r = at.get(this, e);
                if (1 & t.isTrigger && this[e]) {
                  if (r)
                    (w.event.special[e] || {}).delegateType &&
                      t.stopPropagation();
                  else if (
                    ((r = s.call(arguments)),
                    at.set(this, e, r),
                    this[e](),
                    (n = at.get(this, e)),
                    at.set(this, e, !1),
                    r !== n)
                  )
                    return t.stopImmediatePropagation(), t.preventDefault(), n;
                } else
                  r &&
                    (at.set(this, e, w.event.trigger(r[0], r.slice(1), this)),
                    t.stopPropagation(),
                    (t.isImmediatePropagationStopped = Dt));
              },
            }))
          : void 0 === at.get(t, e) && w.event.add(t, e, Dt);
      }
      (w.event = {
        global: {},
        add: function (t, e, n, r, i) {
          var o,
            a,
            s,
            c,
            u,
            l,
            f,
            p,
            d,
            h,
            v,
            g = at.get(t);
          if (it(t))
            for (
              n.handler && ((n = (o = n).handler), (i = o.selector)),
                i && w.find.matchesSelector(ht, i),
                n.guid || (n.guid = w.guid++),
                (c = g.events) || (c = g.events = Object.create(null)),
                (a = g.handle) ||
                  (a = g.handle =
                    function (e) {
                      return void 0 !== w && w.event.triggered !== e.type
                        ? w.event.dispatch.apply(t, arguments)
                        : void 0;
                    }),
                u = (e = (e || "").match(Y) || [""]).length;
              u--;

            )
              (d = v = (s = Lt.exec(e[u]) || [])[1]),
                (h = (s[2] || "").split(".").sort()),
                d &&
                  ((f = w.event.special[d] || {}),
                  (d = (i ? f.delegateType : f.bindType) || d),
                  (f = w.event.special[d] || {}),
                  (l = w.extend(
                    {
                      type: d,
                      origType: v,
                      data: r,
                      handler: n,
                      guid: n.guid,
                      selector: i,
                      needsContext: i && w.expr.match.needsContext.test(i),
                      namespace: h.join("."),
                    },
                    o
                  )),
                  (p = c[d]) ||
                    (((p = c[d] = []).delegateCount = 0),
                    (f.setup && !1 !== f.setup.call(t, r, h, a)) ||
                      (t.addEventListener && t.addEventListener(d, a))),
                  f.add &&
                    (f.add.call(t, l),
                    l.handler.guid || (l.handler.guid = n.guid)),
                  i ? p.splice(p.delegateCount++, 0, l) : p.push(l),
                  (w.event.global[d] = !0));
        },
        remove: function (t, e, n, r, i) {
          var o,
            a,
            s,
            c,
            u,
            l,
            f,
            p,
            d,
            h,
            v,
            g = at.hasData(t) && at.get(t);
          if (g && (c = g.events)) {
            for (u = (e = (e || "").match(Y) || [""]).length; u--; )
              if (
                ((d = v = (s = Lt.exec(e[u]) || [])[1]),
                (h = (s[2] || "").split(".").sort()),
                d)
              ) {
                for (
                  f = w.event.special[d] || {},
                    p = c[(d = (r ? f.delegateType : f.bindType) || d)] || [],
                    s =
                      s[2] &&
                      new RegExp(
                        "(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"
                      ),
                    a = o = p.length;
                  o--;

                )
                  (l = p[o]),
                    (!i && v !== l.origType) ||
                      (n && n.guid !== l.guid) ||
                      (s && !s.test(l.namespace)) ||
                      (r && r !== l.selector && ("**" !== r || !l.selector)) ||
                      (p.splice(o, 1),
                      l.selector && p.delegateCount--,
                      f.remove && f.remove.call(t, l));
                a &&
                  !p.length &&
                  ((f.teardown && !1 !== f.teardown.call(t, h, g.handle)) ||
                    w.removeEvent(t, d, g.handle),
                  delete c[d]);
              } else for (d in c) w.event.remove(t, d + e[u], n, r, !0);
            w.isEmptyObject(c) && at.remove(t, "handle events");
          }
        },
        dispatch: function (t) {
          var e,
            n,
            r,
            i,
            o,
            a,
            s = new Array(arguments.length),
            c = w.event.fix(t),
            u = (at.get(this, "events") || Object.create(null))[c.type] || [],
            l = w.event.special[c.type] || {};
          for (s[0] = c, e = 1; e < arguments.length; e++) s[e] = arguments[e];
          if (
            ((c.delegateTarget = this),
            !l.preDispatch || !1 !== l.preDispatch.call(this, c))
          ) {
            for (
              a = w.event.handlers.call(this, c, u), e = 0;
              (i = a[e++]) && !c.isPropagationStopped();

            )
              for (
                c.currentTarget = i.elem, n = 0;
                (o = i.handlers[n++]) && !c.isImmediatePropagationStopped();

              )
                (c.rnamespace &&
                  !1 !== o.namespace &&
                  !c.rnamespace.test(o.namespace)) ||
                  ((c.handleObj = o),
                  (c.data = o.data),
                  void 0 !==
                    (r = (
                      (w.event.special[o.origType] || {}).handle || o.handler
                    ).apply(i.elem, s)) &&
                    !1 === (c.result = r) &&
                    (c.preventDefault(), c.stopPropagation()));
            return l.postDispatch && l.postDispatch.call(this, c), c.result;
          }
        },
        handlers: function (t, e) {
          var n,
            r,
            i,
            o,
            a,
            s = [],
            c = e.delegateCount,
            u = t.target;
          if (c && u.nodeType && !("click" === t.type && t.button >= 1))
            for (; u !== this; u = u.parentNode || this)
              if (
                1 === u.nodeType &&
                ("click" !== t.type || !0 !== u.disabled)
              ) {
                for (o = [], a = {}, n = 0; n < c; n++)
                  void 0 === a[(i = (r = e[n]).selector + " ")] &&
                    (a[i] = r.needsContext
                      ? w(i, this).index(u) > -1
                      : w.find(i, this, null, [u]).length),
                    a[i] && o.push(r);
                o.length && s.push({ elem: u, handlers: o });
              }
          return (
            (u = this),
            c < e.length && s.push({ elem: u, handlers: e.slice(c) }),
            s
          );
        },
        addProp: function (t, e) {
          Object.defineProperty(w.Event.prototype, t, {
            enumerable: !0,
            configurable: !0,
            get: m(e)
              ? function () {
                  if (this.originalEvent) return e(this.originalEvent);
                }
              : function () {
                  if (this.originalEvent) return this.originalEvent[t];
                },
            set: function (e) {
              Object.defineProperty(this, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: e,
              });
            },
          });
        },
        fix: function (t) {
          return t[w.expando] ? t : new w.Event(t);
        },
        special: {
          load: { noBubble: !0 },
          click: {
            setup: function (t) {
              var e = this || t;
              return (
                wt.test(e.type) &&
                  e.click &&
                  T(e, "input") &&
                  Pt(e, "click", !0),
                !1
              );
            },
            trigger: function (t) {
              var e = this || t;
              return (
                wt.test(e.type) && e.click && T(e, "input") && Pt(e, "click"),
                !0
              );
            },
            _default: function (t) {
              var e = t.target;
              return (
                (wt.test(e.type) &&
                  e.click &&
                  T(e, "input") &&
                  at.get(e, "click")) ||
                T(e, "a")
              );
            },
          },
          beforeunload: {
            postDispatch: function (t) {
              void 0 !== t.result &&
                t.originalEvent &&
                (t.originalEvent.returnValue = t.result);
            },
          },
        },
      }),
        (w.removeEvent = function (t, e, n) {
          t.removeEventListener && t.removeEventListener(e, n);
        }),
        (w.Event = function (t, e) {
          if (!(this instanceof w.Event)) return new w.Event(t, e);
          t && t.type
            ? ((this.originalEvent = t),
              (this.type = t.type),
              (this.isDefaultPrevented =
                t.defaultPrevented ||
                (void 0 === t.defaultPrevented && !1 === t.returnValue)
                  ? Dt
                  : Rt),
              (this.target =
                t.target && 3 === t.target.nodeType
                  ? t.target.parentNode
                  : t.target),
              (this.currentTarget = t.currentTarget),
              (this.relatedTarget = t.relatedTarget))
            : (this.type = t),
            e && w.extend(this, e),
            (this.timeStamp = (t && t.timeStamp) || Date.now()),
            (this[w.expando] = !0);
        }),
        (w.Event.prototype = {
          constructor: w.Event,
          isDefaultPrevented: Rt,
          isPropagationStopped: Rt,
          isImmediatePropagationStopped: Rt,
          isSimulated: !1,
          preventDefault: function () {
            var t = this.originalEvent;
            (this.isDefaultPrevented = Dt),
              t && !this.isSimulated && t.preventDefault();
          },
          stopPropagation: function () {
            var t = this.originalEvent;
            (this.isPropagationStopped = Dt),
              t && !this.isSimulated && t.stopPropagation();
          },
          stopImmediatePropagation: function () {
            var t = this.originalEvent;
            (this.isImmediatePropagationStopped = Dt),
              t && !this.isSimulated && t.stopImmediatePropagation(),
              this.stopPropagation();
          },
        }),
        w.each(
          {
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            char: !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: !0,
          },
          w.event.addProp
        ),
        w.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
          function n(t) {
            if (b.documentMode) {
              var n = at.get(this, "handle"),
                r = w.event.fix(t);
              (r.type = "focusin" === t.type ? "focus" : "blur"),
                (r.isSimulated = !0),
                n(t),
                r.target === r.currentTarget && n(r);
            } else w.event.simulate(e, t.target, w.event.fix(t));
          }
          (w.event.special[t] = {
            setup: function () {
              var r;
              if ((Pt(this, t, !0), !b.documentMode)) return !1;
              (r = at.get(this, e)) || this.addEventListener(e, n),
                at.set(this, e, (r || 0) + 1);
            },
            trigger: function () {
              return Pt(this, t), !0;
            },
            teardown: function () {
              var t;
              if (!b.documentMode) return !1;
              (t = at.get(this, e) - 1)
                ? at.set(this, e, t)
                : (this.removeEventListener(e, n), at.remove(this, e));
            },
            _default: function (e) {
              return at.get(e.target, t);
            },
            delegateType: e,
          }),
            (w.event.special[e] = {
              setup: function () {
                var r = this.ownerDocument || this.document || this,
                  i = b.documentMode ? this : r,
                  o = at.get(i, e);
                o ||
                  (b.documentMode
                    ? this.addEventListener(e, n)
                    : r.addEventListener(t, n, !0)),
                  at.set(i, e, (o || 0) + 1);
              },
              teardown: function () {
                var r = this.ownerDocument || this.document || this,
                  i = b.documentMode ? this : r,
                  o = at.get(i, e) - 1;
                o
                  ? at.set(i, e, o)
                  : (b.documentMode
                      ? this.removeEventListener(e, n)
                      : r.removeEventListener(t, n, !0),
                    at.remove(i, e));
              },
            });
        }),
        w.each(
          {
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout",
          },
          function (t, e) {
            w.event.special[t] = {
              delegateType: e,
              bindType: e,
              handle: function (t) {
                var n,
                  r = this,
                  i = t.relatedTarget,
                  o = t.handleObj;
                return (
                  (i && (i === r || w.contains(r, i))) ||
                    ((t.type = o.origType),
                    (n = o.handler.apply(this, arguments)),
                    (t.type = e)),
                  n
                );
              },
            };
          }
        ),
        w.fn.extend({
          on: function (t, e, n, r) {
            return It(this, t, e, n, r);
          },
          one: function (t, e, n, r) {
            return It(this, t, e, n, r, 1);
          },
          off: function (t, e, n) {
            var r, i;
            if (t && t.preventDefault && t.handleObj)
              return (
                (r = t.handleObj),
                w(t.delegateTarget).off(
                  r.namespace ? r.origType + "." + r.namespace : r.origType,
                  r.selector,
                  r.handler
                ),
                this
              );
            if ("object" == typeof t) {
              for (i in t) this.off(i, e, t[i]);
              return this;
            }
            return (
              (!1 !== e && "function" != typeof e) || ((n = e), (e = void 0)),
              !1 === n && (n = Rt),
              this.each(function () {
                w.event.remove(this, t, n, e);
              })
            );
          },
        });
      var qt = /<script|<style|<link/i,
        Mt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ht = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
      function Ft(t, e) {
        return (
          (T(t, "table") &&
            T(11 !== e.nodeType ? e : e.firstChild, "tr") &&
            w(t).children("tbody")[0]) ||
          t
        );
      }
      function Bt(t) {
        return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
      }
      function Ut(t) {
        return (
          "true/" === (t.type || "").slice(0, 5)
            ? (t.type = t.type.slice(5))
            : t.removeAttribute("type"),
          t
        );
      }
      function Wt(t, e) {
        var n, r, i, o, a, s;
        if (1 === e.nodeType) {
          if (at.hasData(t) && (s = at.get(t).events))
            for (i in (at.remove(e, "handle events"), s))
              for (n = 0, r = s[i].length; n < r; n++)
                w.event.add(e, i, s[i][n]);
          st.hasData(t) &&
            ((o = st.access(t)), (a = w.extend({}, o)), st.set(e, a));
        }
      }
      function zt(t, e) {
        var n = e.nodeName.toLowerCase();
        "input" === n && wt.test(t.type)
          ? (e.checked = t.checked)
          : ("input" !== n && "textarea" !== n) ||
            (e.defaultValue = t.defaultValue);
      }
      function $t(t, e, n, r) {
        e = c(e);
        var i,
          o,
          a,
          s,
          u,
          l,
          f = 0,
          p = t.length,
          d = p - 1,
          h = e[0],
          v = m(h);
        if (v || (p > 1 && "string" == typeof h && !g.checkClone && Mt.test(h)))
          return t.each(function (i) {
            var o = t.eq(i);
            v && (e[0] = h.call(this, i, o.html())), $t(o, e, n, r);
          });
        if (
          p &&
          ((o = (i = At(e, t[0].ownerDocument, !1, t, r)).firstChild),
          1 === i.childNodes.length && (i = o),
          o || r)
        ) {
          for (s = (a = w.map(kt(i, "script"), Bt)).length; f < p; f++)
            (u = i),
              f !== d &&
                ((u = w.clone(u, !0, !0)), s && w.merge(a, kt(u, "script"))),
              n.call(t[f], u, f);
          if (s)
            for (
              l = a[a.length - 1].ownerDocument, w.map(a, Ut), f = 0;
              f < s;
              f++
            )
              (u = a[f]),
                Tt.test(u.type || "") &&
                  !at.access(u, "globalEval") &&
                  w.contains(l, u) &&
                  (u.src && "module" !== (u.type || "").toLowerCase()
                    ? w._evalUrl &&
                      !u.noModule &&
                      w._evalUrl(
                        u.src,
                        { nonce: u.nonce || u.getAttribute("nonce") },
                        l
                      )
                    : x(u.textContent.replace(Ht, ""), u, l));
        }
        return t;
      }
      function Yt(t, e, n) {
        for (var r, i = e ? w.filter(e, t) : t, o = 0; null != (r = i[o]); o++)
          n || 1 !== r.nodeType || w.cleanData(kt(r)),
            r.parentNode &&
              (n && vt(r) && Ct(kt(r, "script")), r.parentNode.removeChild(r));
        return t;
      }
      w.extend({
        htmlPrefilter: function (t) {
          return t;
        },
        clone: function (t, e, n) {
          var r,
            i,
            o,
            a,
            s = t.cloneNode(!0),
            c = vt(t);
          if (
            !(
              g.noCloneChecked ||
              (1 !== t.nodeType && 11 !== t.nodeType) ||
              w.isXMLDoc(t)
            )
          )
            for (a = kt(s), r = 0, i = (o = kt(t)).length; r < i; r++)
              zt(o[r], a[r]);
          if (e)
            if (n)
              for (
                o = o || kt(t), a = a || kt(s), r = 0, i = o.length;
                r < i;
                r++
              )
                Wt(o[r], a[r]);
            else Wt(t, s);
          return (
            (a = kt(s, "script")).length > 0 && Ct(a, !c && kt(t, "script")), s
          );
        },
        cleanData: function (t) {
          for (
            var e, n, r, i = w.event.special, o = 0;
            void 0 !== (n = t[o]);
            o++
          )
            if (it(n)) {
              if ((e = n[at.expando])) {
                if (e.events)
                  for (r in e.events)
                    i[r] ? w.event.remove(n, r) : w.removeEvent(n, r, e.handle);
                n[at.expando] = void 0;
              }
              n[st.expando] && (n[st.expando] = void 0);
            }
        },
      }),
        w.fn.extend({
          detach: function (t) {
            return Yt(this, t, !0);
          },
          remove: function (t) {
            return Yt(this, t);
          },
          text: function (t) {
            return Z(
              this,
              function (t) {
                return void 0 === t
                  ? w.text(this)
                  : this.empty().each(function () {
                      (1 !== this.nodeType &&
                        11 !== this.nodeType &&
                        9 !== this.nodeType) ||
                        (this.textContent = t);
                    });
              },
              null,
              t,
              arguments.length
            );
          },
          append: function () {
            return $t(this, arguments, function (t) {
              (1 !== this.nodeType &&
                11 !== this.nodeType &&
                9 !== this.nodeType) ||
                Ft(this, t).appendChild(t);
            });
          },
          prepend: function () {
            return $t(this, arguments, function (t) {
              if (
                1 === this.nodeType ||
                11 === this.nodeType ||
                9 === this.nodeType
              ) {
                var e = Ft(this, t);
                e.insertBefore(t, e.firstChild);
              }
            });
          },
          before: function () {
            return $t(this, arguments, function (t) {
              this.parentNode && this.parentNode.insertBefore(t, this);
            });
          },
          after: function () {
            return $t(this, arguments, function (t) {
              this.parentNode &&
                this.parentNode.insertBefore(t, this.nextSibling);
            });
          },
          empty: function () {
            for (var t, e = 0; null != (t = this[e]); e++)
              1 === t.nodeType &&
                (w.cleanData(kt(t, !1)), (t.textContent = ""));
            return this;
          },
          clone: function (t, e) {
            return (
              (t = null != t && t),
              (e = null == e ? t : e),
              this.map(function () {
                return w.clone(this, t, e);
              })
            );
          },
          html: function (t) {
            return Z(
              this,
              function (t) {
                var e = this[0] || {},
                  n = 0,
                  r = this.length;
                if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                if (
                  "string" == typeof t &&
                  !qt.test(t) &&
                  !Et[(St.exec(t) || ["", ""])[1].toLowerCase()]
                ) {
                  t = w.htmlPrefilter(t);
                  try {
                    for (; n < r; n++)
                      1 === (e = this[n] || {}).nodeType &&
                        (w.cleanData(kt(e, !1)), (e.innerHTML = t));
                    e = 0;
                  } catch (t) {}
                }
                e && this.empty().append(t);
              },
              null,
              t,
              arguments.length
            );
          },
          replaceWith: function () {
            var t = [];
            return $t(
              this,
              arguments,
              function (e) {
                var n = this.parentNode;
                w.inArray(this, t) < 0 &&
                  (w.cleanData(kt(this)), n && n.replaceChild(e, this));
              },
              t
            );
          },
        }),
        w.each(
          {
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith",
          },
          function (t, e) {
            w.fn[t] = function (t) {
              for (
                var n, r = [], i = w(t), o = i.length - 1, a = 0;
                a <= o;
                a++
              )
                (n = a === o ? this : this.clone(!0)),
                  w(i[a])[e](n),
                  u.apply(r, n.get());
              return this.pushStack(r);
            };
          }
        );
      var Gt = new RegExp("^(" + ft + ")(?!px)[a-z%]+$", "i"),
        Xt = /^--/,
        Vt = function (t) {
          var e = t.ownerDocument.defaultView;
          return (e && e.opener) || (e = n), e.getComputedStyle(t);
        },
        Jt = function (t, e, n) {
          var r,
            i,
            o = {};
          for (i in e) (o[i] = t.style[i]), (t.style[i] = e[i]);
          for (i in ((r = n.call(t)), e)) t.style[i] = o[i];
          return r;
        },
        Kt = new RegExp(dt.join("|"), "i");
      function Qt(t, e, n) {
        var r,
          i,
          o,
          a,
          s = Xt.test(e),
          c = t.style;
        return (
          (n = n || Vt(t)) &&
            ((a = n.getPropertyValue(e) || n[e]),
            s && a && (a = a.replace(A, "$1") || void 0),
            "" !== a || vt(t) || (a = w.style(t, e)),
            !g.pixelBoxStyles() &&
              Gt.test(a) &&
              Kt.test(e) &&
              ((r = c.width),
              (i = c.minWidth),
              (o = c.maxWidth),
              (c.minWidth = c.maxWidth = c.width = a),
              (a = n.width),
              (c.width = r),
              (c.minWidth = i),
              (c.maxWidth = o))),
          void 0 !== a ? a + "" : a
        );
      }
      function Zt(t, e) {
        return {
          get: function () {
            if (!t()) return (this.get = e).apply(this, arguments);
            delete this.get;
          },
        };
      }
      !(function () {
        function t() {
          if (l) {
            (u.style.cssText =
              "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
              (l.style.cssText =
                "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
              ht.appendChild(u).appendChild(l);
            var t = n.getComputedStyle(l);
            (r = "1%" !== t.top),
              (c = 12 === e(t.marginLeft)),
              (l.style.right = "60%"),
              (a = 36 === e(t.right)),
              (i = 36 === e(t.width)),
              (l.style.position = "absolute"),
              (o = 12 === e(l.offsetWidth / 3)),
              ht.removeChild(u),
              (l = null);
          }
        }
        function e(t) {
          return Math.round(parseFloat(t));
        }
        var r,
          i,
          o,
          a,
          s,
          c,
          u = b.createElement("div"),
          l = b.createElement("div");
        l.style &&
          ((l.style.backgroundClip = "content-box"),
          (l.cloneNode(!0).style.backgroundClip = ""),
          (g.clearCloneStyle = "content-box" === l.style.backgroundClip),
          w.extend(g, {
            boxSizingReliable: function () {
              return t(), i;
            },
            pixelBoxStyles: function () {
              return t(), a;
            },
            pixelPosition: function () {
              return t(), r;
            },
            reliableMarginLeft: function () {
              return t(), c;
            },
            scrollboxSize: function () {
              return t(), o;
            },
            reliableTrDimensions: function () {
              var t, e, r, i;
              return (
                null == s &&
                  ((t = b.createElement("table")),
                  (e = b.createElement("tr")),
                  (r = b.createElement("div")),
                  (t.style.cssText =
                    "position:absolute;left:-11111px;border-collapse:separate"),
                  (e.style.cssText = "box-sizing:content-box;border:1px solid"),
                  (e.style.height = "1px"),
                  (r.style.height = "9px"),
                  (r.style.display = "block"),
                  ht.appendChild(t).appendChild(e).appendChild(r),
                  (i = n.getComputedStyle(e)),
                  (s =
                    parseInt(i.height, 10) +
                      parseInt(i.borderTopWidth, 10) +
                      parseInt(i.borderBottomWidth, 10) ===
                    e.offsetHeight),
                  ht.removeChild(t)),
                s
              );
            },
          }));
      })();
      var te = ["Webkit", "Moz", "ms"],
        ee = b.createElement("div").style,
        ne = {};
      function re(t) {
        var e = w.cssProps[t] || ne[t];
        return (
          e ||
          (t in ee
            ? t
            : (ne[t] =
                (function (t) {
                  for (
                    var e = t[0].toUpperCase() + t.slice(1), n = te.length;
                    n--;

                  )
                    if ((t = te[n] + e) in ee) return t;
                })(t) || t))
        );
      }
      var ie = /^(none|table(?!-c[ea]).+)/,
        oe = { position: "absolute", visibility: "hidden", display: "block" },
        ae = { letterSpacing: "0", fontWeight: "400" };
      function se(t, e, n) {
        var r = pt.exec(e);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : e;
      }
      function ce(t, e, n, r, i, o) {
        var a = "width" === e ? 1 : 0,
          s = 0,
          c = 0,
          u = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; a < 4; a += 2)
          "margin" === n && (u += w.css(t, n + dt[a], !0, i)),
            r
              ? ("content" === n && (c -= w.css(t, "padding" + dt[a], !0, i)),
                "margin" !== n &&
                  (c -= w.css(t, "border" + dt[a] + "Width", !0, i)))
              : ((c += w.css(t, "padding" + dt[a], !0, i)),
                "padding" !== n
                  ? (c += w.css(t, "border" + dt[a] + "Width", !0, i))
                  : (s += w.css(t, "border" + dt[a] + "Width", !0, i)));
        return (
          !r &&
            o >= 0 &&
            (c +=
              Math.max(
                0,
                Math.ceil(
                  t["offset" + e[0].toUpperCase() + e.slice(1)] -
                    o -
                    c -
                    s -
                    0.5
                )
              ) || 0),
          c + u
        );
      }
      function ue(t, e, n) {
        var r = Vt(t),
          i =
            (!g.boxSizingReliable() || n) &&
            "border-box" === w.css(t, "boxSizing", !1, r),
          o = i,
          a = Qt(t, e, r),
          s = "offset" + e[0].toUpperCase() + e.slice(1);
        if (Gt.test(a)) {
          if (!n) return a;
          a = "auto";
        }
        return (
          ((!g.boxSizingReliable() && i) ||
            (!g.reliableTrDimensions() && T(t, "tr")) ||
            "auto" === a ||
            (!parseFloat(a) && "inline" === w.css(t, "display", !1, r))) &&
            t.getClientRects().length &&
            ((i = "border-box" === w.css(t, "boxSizing", !1, r)),
            (o = s in t) && (a = t[s])),
          (a = parseFloat(a) || 0) +
            ce(t, e, n || (i ? "border" : "content"), o, r, a) +
            "px"
        );
      }
      function le(t, e, n, r, i) {
        return new le.prototype.init(t, e, n, r, i);
      }
      w.extend({
        cssHooks: {
          opacity: {
            get: function (t, e) {
              if (e) {
                var n = Qt(t, "opacity");
                return "" === n ? "1" : n;
              }
            },
          },
        },
        cssNumber: {
          animationIterationCount: !0,
          aspectRatio: !0,
          borderImageSlice: !0,
          columnCount: !0,
          flexGrow: !0,
          flexShrink: !0,
          fontWeight: !0,
          gridArea: !0,
          gridColumn: !0,
          gridColumnEnd: !0,
          gridColumnStart: !0,
          gridRow: !0,
          gridRowEnd: !0,
          gridRowStart: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          scale: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0,
          fillOpacity: !0,
          floodOpacity: !0,
          stopOpacity: !0,
          strokeMiterlimit: !0,
          strokeOpacity: !0,
        },
        cssProps: {},
        style: function (t, e, n, r) {
          if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
            var i,
              o,
              a,
              s = rt(e),
              c = Xt.test(e),
              u = t.style;
            if (
              (c || (e = re(s)),
              (a = w.cssHooks[e] || w.cssHooks[s]),
              void 0 === n)
            )
              return a && "get" in a && void 0 !== (i = a.get(t, !1, r))
                ? i
                : u[e];
            "string" === (o = typeof n) &&
              (i = pt.exec(n)) &&
              i[1] &&
              ((n = yt(t, e, i)), (o = "number")),
              null != n &&
                n == n &&
                ("number" !== o ||
                  c ||
                  (n += (i && i[3]) || (w.cssNumber[s] ? "" : "px")),
                g.clearCloneStyle ||
                  "" !== n ||
                  0 !== e.indexOf("background") ||
                  (u[e] = "inherit"),
                (a && "set" in a && void 0 === (n = a.set(t, n, r))) ||
                  (c ? u.setProperty(e, n) : (u[e] = n)));
          }
        },
        css: function (t, e, n, r) {
          var i,
            o,
            a,
            s = rt(e);
          return (
            Xt.test(e) || (e = re(s)),
            (a = w.cssHooks[e] || w.cssHooks[s]) &&
              "get" in a &&
              (i = a.get(t, !0, n)),
            void 0 === i && (i = Qt(t, e, r)),
            "normal" === i && e in ae && (i = ae[e]),
            "" === n || n
              ? ((o = parseFloat(i)), !0 === n || isFinite(o) ? o || 0 : i)
              : i
          );
        },
      }),
        w.each(["height", "width"], function (t, e) {
          w.cssHooks[e] = {
            get: function (t, n, r) {
              if (n)
                return !ie.test(w.css(t, "display")) ||
                  (t.getClientRects().length && t.getBoundingClientRect().width)
                  ? ue(t, e, r)
                  : Jt(t, oe, function () {
                      return ue(t, e, r);
                    });
            },
            set: function (t, n, r) {
              var i,
                o = Vt(t),
                a = !g.scrollboxSize() && "absolute" === o.position,
                s = (a || r) && "border-box" === w.css(t, "boxSizing", !1, o),
                c = r ? ce(t, e, r, s, o) : 0;
              return (
                s &&
                  a &&
                  (c -= Math.ceil(
                    t["offset" + e[0].toUpperCase() + e.slice(1)] -
                      parseFloat(o[e]) -
                      ce(t, e, "border", !1, o) -
                      0.5
                  )),
                c &&
                  (i = pt.exec(n)) &&
                  "px" !== (i[3] || "px") &&
                  ((t.style[e] = n), (n = w.css(t, e))),
                se(0, n, c)
              );
            },
          };
        }),
        (w.cssHooks.marginLeft = Zt(g.reliableMarginLeft, function (t, e) {
          if (e)
            return (
              (parseFloat(Qt(t, "marginLeft")) ||
                t.getBoundingClientRect().left -
                  Jt(t, { marginLeft: 0 }, function () {
                    return t.getBoundingClientRect().left;
                  })) + "px"
            );
        })),
        w.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
          (w.cssHooks[t + e] = {
            expand: function (n) {
              for (
                var r = 0,
                  i = {},
                  o = "string" == typeof n ? n.split(" ") : [n];
                r < 4;
                r++
              )
                i[t + dt[r] + e] = o[r] || o[r - 2] || o[0];
              return i;
            },
          }),
            "margin" !== t && (w.cssHooks[t + e].set = se);
        }),
        w.fn.extend({
          css: function (t, e) {
            return Z(
              this,
              function (t, e, n) {
                var r,
                  i,
                  o = {},
                  a = 0;
                if (Array.isArray(e)) {
                  for (r = Vt(t), i = e.length; a < i; a++)
                    o[e[a]] = w.css(t, e[a], !1, r);
                  return o;
                }
                return void 0 !== n ? w.style(t, e, n) : w.css(t, e);
              },
              t,
              e,
              arguments.length > 1
            );
          },
        }),
        (w.Tween = le),
        (le.prototype = {
          constructor: le,
          init: function (t, e, n, r, i, o) {
            (this.elem = t),
              (this.prop = n),
              (this.easing = i || w.easing._default),
              (this.options = e),
              (this.start = this.now = this.cur()),
              (this.end = r),
              (this.unit = o || (w.cssNumber[n] ? "" : "px"));
          },
          cur: function () {
            var t = le.propHooks[this.prop];
            return t && t.get ? t.get(this) : le.propHooks._default.get(this);
          },
          run: function (t) {
            var e,
              n = le.propHooks[this.prop];
            return (
              this.options.duration
                ? (this.pos = e =
                    w.easing[this.easing](
                      t,
                      this.options.duration * t,
                      0,
                      1,
                      this.options.duration
                    ))
                : (this.pos = e = t),
              (this.now = (this.end - this.start) * e + this.start),
              this.options.step &&
                this.options.step.call(this.elem, this.now, this),
              n && n.set ? n.set(this) : le.propHooks._default.set(this),
              this
            );
          },
        }),
        (le.prototype.init.prototype = le.prototype),
        (le.propHooks = {
          _default: {
            get: function (t) {
              var e;
              return 1 !== t.elem.nodeType ||
                (null != t.elem[t.prop] && null == t.elem.style[t.prop])
                ? t.elem[t.prop]
                : (e = w.css(t.elem, t.prop, "")) && "auto" !== e
                ? e
                : 0;
            },
            set: function (t) {
              w.fx.step[t.prop]
                ? w.fx.step[t.prop](t)
                : 1 !== t.elem.nodeType ||
                  (!w.cssHooks[t.prop] && null == t.elem.style[re(t.prop)])
                ? (t.elem[t.prop] = t.now)
                : w.style(t.elem, t.prop, t.now + t.unit);
            },
          },
        }),
        (le.propHooks.scrollTop = le.propHooks.scrollLeft =
          {
            set: function (t) {
              t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
            },
          }),
        (w.easing = {
          linear: function (t) {
            return t;
          },
          swing: function (t) {
            return 0.5 - Math.cos(t * Math.PI) / 2;
          },
          _default: "swing",
        }),
        (w.fx = le.prototype.init),
        (w.fx.step = {});
      var fe,
        pe,
        de = /^(?:toggle|show|hide)$/,
        he = /queueHooks$/;
      function ve() {
        pe &&
          (!1 === b.hidden && n.requestAnimationFrame
            ? n.requestAnimationFrame(ve)
            : n.setTimeout(ve, w.fx.interval),
          w.fx.tick());
      }
      function ge() {
        return (
          n.setTimeout(function () {
            fe = void 0;
          }),
          (fe = Date.now())
        );
      }
      function me(t, e) {
        var n,
          r = 0,
          i = { height: t };
        for (e = e ? 1 : 0; r < 4; r += 2 - e)
          i["margin" + (n = dt[r])] = i["padding" + n] = t;
        return e && (i.opacity = i.width = t), i;
      }
      function ye(t, e, n) {
        for (
          var r,
            i = (be.tweeners[e] || []).concat(be.tweeners["*"]),
            o = 0,
            a = i.length;
          o < a;
          o++
        )
          if ((r = i[o].call(n, e, t))) return r;
      }
      function be(t, e, n) {
        var r,
          i,
          o = 0,
          a = be.prefilters.length,
          s = w.Deferred().always(function () {
            delete c.elem;
          }),
          c = function () {
            if (i) return !1;
            for (
              var e = fe || ge(),
                n = Math.max(0, u.startTime + u.duration - e),
                r = 1 - (n / u.duration || 0),
                o = 0,
                a = u.tweens.length;
              o < a;
              o++
            )
              u.tweens[o].run(r);
            return (
              s.notifyWith(t, [u, r, n]),
              r < 1 && a
                ? n
                : (a || s.notifyWith(t, [u, 1, 0]), s.resolveWith(t, [u]), !1)
            );
          },
          u = s.promise({
            elem: t,
            props: w.extend({}, e),
            opts: w.extend(
              !0,
              { specialEasing: {}, easing: w.easing._default },
              n
            ),
            originalProperties: e,
            originalOptions: n,
            startTime: fe || ge(),
            duration: n.duration,
            tweens: [],
            createTween: function (e, n) {
              var r = w.Tween(
                t,
                u.opts,
                e,
                n,
                u.opts.specialEasing[e] || u.opts.easing
              );
              return u.tweens.push(r), r;
            },
            stop: function (e) {
              var n = 0,
                r = e ? u.tweens.length : 0;
              if (i) return this;
              for (i = !0; n < r; n++) u.tweens[n].run(1);
              return (
                e
                  ? (s.notifyWith(t, [u, 1, 0]), s.resolveWith(t, [u, e]))
                  : s.rejectWith(t, [u, e]),
                this
              );
            },
          }),
          l = u.props;
        for (
          !(function (t, e) {
            var n, r, i, o, a;
            for (n in t)
              if (
                ((i = e[(r = rt(n))]),
                (o = t[n]),
                Array.isArray(o) && ((i = o[1]), (o = t[n] = o[0])),
                n !== r && ((t[r] = o), delete t[n]),
                (a = w.cssHooks[r]) && ("expand" in a))
              )
                for (n in ((o = a.expand(o)), delete t[r], o))
                  (n in t) || ((t[n] = o[n]), (e[n] = i));
              else e[r] = i;
          })(l, u.opts.specialEasing);
          o < a;
          o++
        )
          if ((r = be.prefilters[o].call(u, t, l, u.opts)))
            return (
              m(r.stop) &&
                (w._queueHooks(u.elem, u.opts.queue).stop = r.stop.bind(r)),
              r
            );
        return (
          w.map(l, ye, u),
          m(u.opts.start) && u.opts.start.call(t, u),
          u
            .progress(u.opts.progress)
            .done(u.opts.done, u.opts.complete)
            .fail(u.opts.fail)
            .always(u.opts.always),
          w.fx.timer(w.extend(c, { elem: t, anim: u, queue: u.opts.queue })),
          u
        );
      }
      (w.Animation = w.extend(be, {
        tweeners: {
          "*": [
            function (t, e) {
              var n = this.createTween(t, e);
              return yt(n.elem, t, pt.exec(e), n), n;
            },
          ],
        },
        tweener: function (t, e) {
          m(t) ? ((e = t), (t = ["*"])) : (t = t.match(Y));
          for (var n, r = 0, i = t.length; r < i; r++)
            (n = t[r]),
              (be.tweeners[n] = be.tweeners[n] || []),
              be.tweeners[n].unshift(e);
        },
        prefilters: [
          function (t, e, n) {
            var r,
              i,
              o,
              a,
              s,
              c,
              u,
              l,
              f = "width" in e || "height" in e,
              p = this,
              d = {},
              h = t.style,
              v = t.nodeType && mt(t),
              g = at.get(t, "fxshow");
            for (r in (n.queue ||
              (null == (a = w._queueHooks(t, "fx")).unqueued &&
                ((a.unqueued = 0),
                (s = a.empty.fire),
                (a.empty.fire = function () {
                  a.unqueued || s();
                })),
              a.unqueued++,
              p.always(function () {
                p.always(function () {
                  a.unqueued--, w.queue(t, "fx").length || a.empty.fire();
                });
              })),
            e))
              if (((i = e[r]), de.test(i))) {
                if (
                  (delete e[r],
                  (o = o || "toggle" === i),
                  i === (v ? "hide" : "show"))
                ) {
                  if ("show" !== i || !g || void 0 === g[r]) continue;
                  v = !0;
                }
                d[r] = (g && g[r]) || w.style(t, r);
              }
            if ((c = !w.isEmptyObject(e)) || !w.isEmptyObject(d))
              for (r in (f &&
                1 === t.nodeType &&
                ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                null == (u = g && g.display) && (u = at.get(t, "display")),
                "none" === (l = w.css(t, "display")) &&
                  (u
                    ? (l = u)
                    : (xt([t], !0),
                      (u = t.style.display || u),
                      (l = w.css(t, "display")),
                      xt([t]))),
                ("inline" === l || ("inline-block" === l && null != u)) &&
                  "none" === w.css(t, "float") &&
                  (c ||
                    (p.done(function () {
                      h.display = u;
                    }),
                    null == u &&
                      ((l = h.display), (u = "none" === l ? "" : l))),
                  (h.display = "inline-block"))),
              n.overflow &&
                ((h.overflow = "hidden"),
                p.always(function () {
                  (h.overflow = n.overflow[0]),
                    (h.overflowX = n.overflow[1]),
                    (h.overflowY = n.overflow[2]);
                })),
              (c = !1),
              d))
                c ||
                  (g
                    ? "hidden" in g && (v = g.hidden)
                    : (g = at.access(t, "fxshow", { display: u })),
                  o && (g.hidden = !v),
                  v && xt([t], !0),
                  p.done(function () {
                    for (r in (v || xt([t]), at.remove(t, "fxshow"), d))
                      w.style(t, r, d[r]);
                  })),
                  (c = ye(v ? g[r] : 0, r, p)),
                  r in g ||
                    ((g[r] = c.start), v && ((c.end = c.start), (c.start = 0)));
          },
        ],
        prefilter: function (t, e) {
          e ? be.prefilters.unshift(t) : be.prefilters.push(t);
        },
      })),
        (w.speed = function (t, e, n) {
          var r =
            t && "object" == typeof t
              ? w.extend({}, t)
              : {
                  complete: n || (!n && e) || (m(t) && t),
                  duration: t,
                  easing: (n && e) || (e && !m(e) && e),
                };
          return (
            w.fx.off
              ? (r.duration = 0)
              : "number" != typeof r.duration &&
                (r.duration in w.fx.speeds
                  ? (r.duration = w.fx.speeds[r.duration])
                  : (r.duration = w.fx.speeds._default)),
            (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
            (r.old = r.complete),
            (r.complete = function () {
              m(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue);
            }),
            r
          );
        }),
        w.fn.extend({
          fadeTo: function (t, e, n, r) {
            return this.filter(mt)
              .css("opacity", 0)
              .show()
              .end()
              .animate({ opacity: e }, t, n, r);
          },
          animate: function (t, e, n, r) {
            var i = w.isEmptyObject(t),
              o = w.speed(e, n, r),
              a = function () {
                var e = be(this, w.extend({}, t), o);
                (i || at.get(this, "finish")) && e.stop(!0);
              };
            return (
              (a.finish = a),
              i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
            );
          },
          stop: function (t, e, n) {
            var r = function (t) {
              var e = t.stop;
              delete t.stop, e(n);
            };
            return (
              "string" != typeof t && ((n = e), (e = t), (t = void 0)),
              e && this.queue(t || "fx", []),
              this.each(function () {
                var e = !0,
                  i = null != t && t + "queueHooks",
                  o = w.timers,
                  a = at.get(this);
                if (i) a[i] && a[i].stop && r(a[i]);
                else for (i in a) a[i] && a[i].stop && he.test(i) && r(a[i]);
                for (i = o.length; i--; )
                  o[i].elem !== this ||
                    (null != t && o[i].queue !== t) ||
                    (o[i].anim.stop(n), (e = !1), o.splice(i, 1));
                (!e && n) || w.dequeue(this, t);
              })
            );
          },
          finish: function (t) {
            return (
              !1 !== t && (t = t || "fx"),
              this.each(function () {
                var e,
                  n = at.get(this),
                  r = n[t + "queue"],
                  i = n[t + "queueHooks"],
                  o = w.timers,
                  a = r ? r.length : 0;
                for (
                  n.finish = !0,
                    w.queue(this, t, []),
                    i && i.stop && i.stop.call(this, !0),
                    e = o.length;
                  e--;

                )
                  o[e].elem === this &&
                    o[e].queue === t &&
                    (o[e].anim.stop(!0), o.splice(e, 1));
                for (e = 0; e < a; e++)
                  r[e] && r[e].finish && r[e].finish.call(this);
                delete n.finish;
              })
            );
          },
        }),
        w.each(["toggle", "show", "hide"], function (t, e) {
          var n = w.fn[e];
          w.fn[e] = function (t, r, i) {
            return null == t || "boolean" == typeof t
              ? n.apply(this, arguments)
              : this.animate(me(e, !0), t, r, i);
          };
        }),
        w.each(
          {
            slideDown: me("show"),
            slideUp: me("hide"),
            slideToggle: me("toggle"),
            fadeIn: { opacity: "show" },
            fadeOut: { opacity: "hide" },
            fadeToggle: { opacity: "toggle" },
          },
          function (t, e) {
            w.fn[t] = function (t, n, r) {
              return this.animate(e, t, n, r);
            };
          }
        ),
        (w.timers = []),
        (w.fx.tick = function () {
          var t,
            e = 0,
            n = w.timers;
          for (fe = Date.now(); e < n.length; e++)
            (t = n[e])() || n[e] !== t || n.splice(e--, 1);
          n.length || w.fx.stop(), (fe = void 0);
        }),
        (w.fx.timer = function (t) {
          w.timers.push(t), w.fx.start();
        }),
        (w.fx.interval = 13),
        (w.fx.start = function () {
          pe || ((pe = !0), ve());
        }),
        (w.fx.stop = function () {
          pe = null;
        }),
        (w.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (w.fn.delay = function (t, e) {
          return (
            (t = (w.fx && w.fx.speeds[t]) || t),
            (e = e || "fx"),
            this.queue(e, function (e, r) {
              var i = n.setTimeout(e, t);
              r.stop = function () {
                n.clearTimeout(i);
              };
            })
          );
        }),
        (function () {
          var t = b.createElement("input"),
            e = b
              .createElement("select")
              .appendChild(b.createElement("option"));
          (t.type = "checkbox"),
            (g.checkOn = "" !== t.value),
            (g.optSelected = e.selected),
            ((t = b.createElement("input")).value = "t"),
            (t.type = "radio"),
            (g.radioValue = "t" === t.value);
        })();
      var _e,
        xe = w.expr.attrHandle;
      w.fn.extend({
        attr: function (t, e) {
          return Z(this, w.attr, t, e, arguments.length > 1);
        },
        removeAttr: function (t) {
          return this.each(function () {
            w.removeAttr(this, t);
          });
        },
      }),
        w.extend({
          attr: function (t, e, n) {
            var r,
              i,
              o = t.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
              return void 0 === t.getAttribute
                ? w.prop(t, e, n)
                : ((1 === o && w.isXMLDoc(t)) ||
                    (i =
                      w.attrHooks[e.toLowerCase()] ||
                      (w.expr.match.bool.test(e) ? _e : void 0)),
                  void 0 !== n
                    ? null === n
                      ? void w.removeAttr(t, e)
                      : i && "set" in i && void 0 !== (r = i.set(t, n, e))
                      ? r
                      : (t.setAttribute(e, n + ""), n)
                    : i && "get" in i && null !== (r = i.get(t, e))
                    ? r
                    : null == (r = w.find.attr(t, e))
                    ? void 0
                    : r);
          },
          attrHooks: {
            type: {
              set: function (t, e) {
                if (!g.radioValue && "radio" === e && T(t, "input")) {
                  var n = t.value;
                  return t.setAttribute("type", e), n && (t.value = n), e;
                }
              },
            },
          },
          removeAttr: function (t, e) {
            var n,
              r = 0,
              i = e && e.match(Y);
            if (i && 1 === t.nodeType)
              for (; (n = i[r++]); ) t.removeAttribute(n);
          },
        }),
        (_e = {
          set: function (t, e, n) {
            return !1 === e ? w.removeAttr(t, n) : t.setAttribute(n, n), n;
          },
        }),
        w.each(w.expr.match.bool.source.match(/\w+/g), function (t, e) {
          var n = xe[e] || w.find.attr;
          xe[e] = function (t, e, r) {
            var i,
              o,
              a = e.toLowerCase();
            return (
              r ||
                ((o = xe[a]),
                (xe[a] = i),
                (i = null != n(t, e, r) ? a : null),
                (xe[a] = o)),
              i
            );
          };
        });
      var Oe = /^(?:input|select|textarea|button)$/i,
        je = /^(?:a|area)$/i;
      function we(t) {
        return (t.match(Y) || []).join(" ");
      }
      function Se(t) {
        return (t.getAttribute && t.getAttribute("class")) || "";
      }
      function Te(t) {
        return Array.isArray(t)
          ? t
          : ("string" == typeof t && t.match(Y)) || [];
      }
      w.fn.extend({
        prop: function (t, e) {
          return Z(this, w.prop, t, e, arguments.length > 1);
        },
        removeProp: function (t) {
          return this.each(function () {
            delete this[w.propFix[t] || t];
          });
        },
      }),
        w.extend({
          prop: function (t, e, n) {
            var r,
              i,
              o = t.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
              return (
                (1 === o && w.isXMLDoc(t)) ||
                  ((e = w.propFix[e] || e), (i = w.propHooks[e])),
                void 0 !== n
                  ? i && "set" in i && void 0 !== (r = i.set(t, n, e))
                    ? r
                    : (t[e] = n)
                  : i && "get" in i && null !== (r = i.get(t, e))
                  ? r
                  : t[e]
              );
          },
          propHooks: {
            tabIndex: {
              get: function (t) {
                var e = w.find.attr(t, "tabindex");
                return e
                  ? parseInt(e, 10)
                  : Oe.test(t.nodeName) || (je.test(t.nodeName) && t.href)
                  ? 0
                  : -1;
              },
            },
          },
          propFix: { for: "htmlFor", class: "className" },
        }),
        g.optSelected ||
          (w.propHooks.selected = {
            get: function (t) {
              var e = t.parentNode;
              return e && e.parentNode && e.parentNode.selectedIndex, null;
            },
            set: function (t) {
              var e = t.parentNode;
              e &&
                (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
            },
          }),
        w.each(
          [
            "tabIndex",
            "readOnly",
            "maxLength",
            "cellSpacing",
            "cellPadding",
            "rowSpan",
            "colSpan",
            "useMap",
            "frameBorder",
            "contentEditable",
          ],
          function () {
            w.propFix[this.toLowerCase()] = this;
          }
        ),
        w.fn.extend({
          addClass: function (t) {
            var e, n, r, i, o, a;
            return m(t)
              ? this.each(function (e) {
                  w(this).addClass(t.call(this, e, Se(this)));
                })
              : (e = Te(t)).length
              ? this.each(function () {
                  if (
                    ((r = Se(this)),
                    (n = 1 === this.nodeType && " " + we(r) + " "))
                  ) {
                    for (o = 0; o < e.length; o++)
                      (i = e[o]),
                        n.indexOf(" " + i + " ") < 0 && (n += i + " ");
                    (a = we(n)), r !== a && this.setAttribute("class", a);
                  }
                })
              : this;
          },
          removeClass: function (t) {
            var e, n, r, i, o, a;
            return m(t)
              ? this.each(function (e) {
                  w(this).removeClass(t.call(this, e, Se(this)));
                })
              : arguments.length
              ? (e = Te(t)).length
                ? this.each(function () {
                    if (
                      ((r = Se(this)),
                      (n = 1 === this.nodeType && " " + we(r) + " "))
                    ) {
                      for (o = 0; o < e.length; o++)
                        for (i = e[o]; n.indexOf(" " + i + " ") > -1; )
                          n = n.replace(" " + i + " ", " ");
                      (a = we(n)), r !== a && this.setAttribute("class", a);
                    }
                  })
                : this
              : this.attr("class", "");
          },
          toggleClass: function (t, e) {
            var n,
              r,
              i,
              o,
              a = typeof t,
              s = "string" === a || Array.isArray(t);
            return m(t)
              ? this.each(function (n) {
                  w(this).toggleClass(t.call(this, n, Se(this), e), e);
                })
              : "boolean" == typeof e && s
              ? e
                ? this.addClass(t)
                : this.removeClass(t)
              : ((n = Te(t)),
                this.each(function () {
                  if (s)
                    for (o = w(this), i = 0; i < n.length; i++)
                      (r = n[i]),
                        o.hasClass(r) ? o.removeClass(r) : o.addClass(r);
                  else
                    (void 0 !== t && "boolean" !== a) ||
                      ((r = Se(this)) && at.set(this, "__className__", r),
                      this.setAttribute &&
                        this.setAttribute(
                          "class",
                          r || !1 === t
                            ? ""
                            : at.get(this, "__className__") || ""
                        ));
                }));
          },
          hasClass: function (t) {
            var e,
              n,
              r = 0;
            for (e = " " + t + " "; (n = this[r++]); )
              if (1 === n.nodeType && (" " + we(Se(n)) + " ").indexOf(e) > -1)
                return !0;
            return !1;
          },
        });
      var Ee = /\r/g;
      w.fn.extend({
        val: function (t) {
          var e,
            n,
            r,
            i = this[0];
          return arguments.length
            ? ((r = m(t)),
              this.each(function (n) {
                var i;
                1 === this.nodeType &&
                  (null == (i = r ? t.call(this, n, w(this).val()) : t)
                    ? (i = "")
                    : "number" == typeof i
                    ? (i += "")
                    : Array.isArray(i) &&
                      (i = w.map(i, function (t) {
                        return null == t ? "" : t + "";
                      })),
                  ((e =
                    w.valHooks[this.type] ||
                    w.valHooks[this.nodeName.toLowerCase()]) &&
                    "set" in e &&
                    void 0 !== e.set(this, i, "value")) ||
                    (this.value = i));
              }))
            : i
            ? (e =
                w.valHooks[i.type] || w.valHooks[i.nodeName.toLowerCase()]) &&
              "get" in e &&
              void 0 !== (n = e.get(i, "value"))
              ? n
              : "string" == typeof (n = i.value)
              ? n.replace(Ee, "")
              : null == n
              ? ""
              : n
            : void 0;
        },
      }),
        w.extend({
          valHooks: {
            option: {
              get: function (t) {
                var e = w.find.attr(t, "value");
                return null != e ? e : we(w.text(t));
              },
            },
            select: {
              get: function (t) {
                var e,
                  n,
                  r,
                  i = t.options,
                  o = t.selectedIndex,
                  a = "select-one" === t.type,
                  s = a ? null : [],
                  c = a ? o + 1 : i.length;
                for (r = o < 0 ? c : a ? o : 0; r < c; r++)
                  if (
                    ((n = i[r]).selected || r === o) &&
                    !n.disabled &&
                    (!n.parentNode.disabled || !T(n.parentNode, "optgroup"))
                  ) {
                    if (((e = w(n).val()), a)) return e;
                    s.push(e);
                  }
                return s;
              },
              set: function (t, e) {
                for (
                  var n, r, i = t.options, o = w.makeArray(e), a = i.length;
                  a--;

                )
                  ((r = i[a]).selected =
                    w.inArray(w.valHooks.option.get(r), o) > -1) && (n = !0);
                return n || (t.selectedIndex = -1), o;
              },
            },
          },
        }),
        w.each(["radio", "checkbox"], function () {
          (w.valHooks[this] = {
            set: function (t, e) {
              if (Array.isArray(e))
                return (t.checked = w.inArray(w(t).val(), e) > -1);
            },
          }),
            g.checkOn ||
              (w.valHooks[this].get = function (t) {
                return null === t.getAttribute("value") ? "on" : t.value;
              });
        });
      var ke = n.location,
        Ce = { guid: Date.now() },
        Ne = /\?/;
      w.parseXML = function (t) {
        var e, r;
        if (!t || "string" != typeof t) return null;
        try {
          e = new n.DOMParser().parseFromString(t, "text/xml");
        } catch (t) {}
        return (
          (r = e && e.getElementsByTagName("parsererror")[0]),
          (e && !r) ||
            w.error(
              "Invalid XML: " +
                (r
                  ? w
                      .map(r.childNodes, function (t) {
                        return t.textContent;
                      })
                      .join("\n")
                  : t)
            ),
          e
        );
      };
      var Ae = /^(?:focusinfocus|focusoutblur)$/,
        Le = function (t) {
          t.stopPropagation();
        };
      w.extend(w.event, {
        trigger: function (t, e, r, i) {
          var o,
            a,
            s,
            c,
            u,
            l,
            f,
            p,
            h = [r || b],
            v = d.call(t, "type") ? t.type : t,
            g = d.call(t, "namespace") ? t.namespace.split(".") : [];
          if (
            ((a = p = s = r = r || b),
            3 !== r.nodeType &&
              8 !== r.nodeType &&
              !Ae.test(v + w.event.triggered) &&
              (v.indexOf(".") > -1 &&
                ((g = v.split(".")), (v = g.shift()), g.sort()),
              (u = v.indexOf(":") < 0 && "on" + v),
              ((t = t[w.expando]
                ? t
                : new w.Event(v, "object" == typeof t && t)).isTrigger = i
                ? 2
                : 3),
              (t.namespace = g.join(".")),
              (t.rnamespace = t.namespace
                ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)")
                : null),
              (t.result = void 0),
              t.target || (t.target = r),
              (e = null == e ? [t] : w.makeArray(e, [t])),
              (f = w.event.special[v] || {}),
              i || !f.trigger || !1 !== f.trigger.apply(r, e)))
          ) {
            if (!i && !f.noBubble && !y(r)) {
              for (
                c = f.delegateType || v, Ae.test(c + v) || (a = a.parentNode);
                a;
                a = a.parentNode
              )
                h.push(a), (s = a);
              s === (r.ownerDocument || b) &&
                h.push(s.defaultView || s.parentWindow || n);
            }
            for (o = 0; (a = h[o++]) && !t.isPropagationStopped(); )
              (p = a),
                (t.type = o > 1 ? c : f.bindType || v),
                (l =
                  (at.get(a, "events") || Object.create(null))[t.type] &&
                  at.get(a, "handle")) && l.apply(a, e),
                (l = u && a[u]) &&
                  l.apply &&
                  it(a) &&
                  ((t.result = l.apply(a, e)),
                  !1 === t.result && t.preventDefault());
            return (
              (t.type = v),
              i ||
                t.isDefaultPrevented() ||
                (f._default && !1 !== f._default.apply(h.pop(), e)) ||
                !it(r) ||
                (u &&
                  m(r[v]) &&
                  !y(r) &&
                  ((s = r[u]) && (r[u] = null),
                  (w.event.triggered = v),
                  t.isPropagationStopped() && p.addEventListener(v, Le),
                  r[v](),
                  t.isPropagationStopped() && p.removeEventListener(v, Le),
                  (w.event.triggered = void 0),
                  s && (r[u] = s))),
              t.result
            );
          }
        },
        simulate: function (t, e, n) {
          var r = w.extend(new w.Event(), n, { type: t, isSimulated: !0 });
          w.event.trigger(r, null, e);
        },
      }),
        w.fn.extend({
          trigger: function (t, e) {
            return this.each(function () {
              w.event.trigger(t, e, this);
            });
          },
          triggerHandler: function (t, e) {
            var n = this[0];
            if (n) return w.event.trigger(t, e, n, !0);
          },
        });
      var De = /\[\]$/,
        Re = /\r?\n/g,
        Ie = /^(?:submit|button|image|reset|file)$/i,
        Pe = /^(?:input|select|textarea|keygen)/i;
      function qe(t, e, n, r) {
        var i;
        if (Array.isArray(e))
          w.each(e, function (e, i) {
            n || De.test(t)
              ? r(t, i)
              : qe(
                  t + "[" + ("object" == typeof i && null != i ? e : "") + "]",
                  i,
                  n,
                  r
                );
          });
        else if (n || "object" !== O(e)) r(t, e);
        else for (i in e) qe(t + "[" + i + "]", e[i], n, r);
      }
      (w.param = function (t, e) {
        var n,
          r = [],
          i = function (t, e) {
            var n = m(e) ? e() : e;
            r[r.length] =
              encodeURIComponent(t) +
              "=" +
              encodeURIComponent(null == n ? "" : n);
          };
        if (null == t) return "";
        if (Array.isArray(t) || (t.jquery && !w.isPlainObject(t)))
          w.each(t, function () {
            i(this.name, this.value);
          });
        else for (n in t) qe(n, t[n], e, i);
        return r.join("&");
      }),
        w.fn.extend({
          serialize: function () {
            return w.param(this.serializeArray());
          },
          serializeArray: function () {
            return this.map(function () {
              var t = w.prop(this, "elements");
              return t ? w.makeArray(t) : this;
            })
              .filter(function () {
                var t = this.type;
                return (
                  this.name &&
                  !w(this).is(":disabled") &&
                  Pe.test(this.nodeName) &&
                  !Ie.test(t) &&
                  (this.checked || !wt.test(t))
                );
              })
              .map(function (t, e) {
                var n = w(this).val();
                return null == n
                  ? null
                  : Array.isArray(n)
                  ? w.map(n, function (t) {
                      return { name: e.name, value: t.replace(Re, "\r\n") };
                    })
                  : { name: e.name, value: n.replace(Re, "\r\n") };
              })
              .get();
          },
        });
      var Me = /%20/g,
        He = /#.*$/,
        Fe = /([?&])_=[^&]*/,
        Be = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Ue = /^(?:GET|HEAD)$/,
        We = /^\/\//,
        ze = {},
        $e = {},
        Ye = "*/".concat("*"),
        Ge = b.createElement("a");
      function Xe(t) {
        return function (e, n) {
          "string" != typeof e && ((n = e), (e = "*"));
          var r,
            i = 0,
            o = e.toLowerCase().match(Y) || [];
          if (m(n))
            for (; (r = o[i++]); )
              "+" === r[0]
                ? ((r = r.slice(1) || "*"), (t[r] = t[r] || []).unshift(n))
                : (t[r] = t[r] || []).push(n);
        };
      }
      function Ve(t, e, n, r) {
        var i = {},
          o = t === $e;
        function a(s) {
          var c;
          return (
            (i[s] = !0),
            w.each(t[s] || [], function (t, s) {
              var u = s(e, n, r);
              return "string" != typeof u || o || i[u]
                ? o
                  ? !(c = u)
                  : void 0
                : (e.dataTypes.unshift(u), a(u), !1);
            }),
            c
          );
        }
        return a(e.dataTypes[0]) || (!i["*"] && a("*"));
      }
      function Je(t, e) {
        var n,
          r,
          i = w.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((i[n] ? t : r || (r = {}))[n] = e[n]);
        return r && w.extend(!0, t, r), t;
      }
      (Ge.href = ke.href),
        w.extend({
          active: 0,
          lastModified: {},
          etag: {},
          ajaxSettings: {
            url: ke.href,
            type: "GET",
            isLocal:
              /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                ke.protocol
              ),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
              "*": Ye,
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript",
            },
            contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
            responseFields: {
              xml: "responseXML",
              text: "responseText",
              json: "responseJSON",
            },
            converters: {
              "* text": String,
              "text html": !0,
              "text json": JSON.parse,
              "text xml": w.parseXML,
            },
            flatOptions: { url: !0, context: !0 },
          },
          ajaxSetup: function (t, e) {
            return e ? Je(Je(t, w.ajaxSettings), e) : Je(w.ajaxSettings, t);
          },
          ajaxPrefilter: Xe(ze),
          ajaxTransport: Xe($e),
          ajax: function (t, e) {
            "object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
            var r,
              i,
              o,
              a,
              s,
              c,
              u,
              l,
              f,
              p,
              d = w.ajaxSetup({}, e),
              h = d.context || d,
              v = d.context && (h.nodeType || h.jquery) ? w(h) : w.event,
              g = w.Deferred(),
              m = w.Callbacks("once memory"),
              y = d.statusCode || {},
              _ = {},
              x = {},
              O = "canceled",
              j = {
                readyState: 0,
                getResponseHeader: function (t) {
                  var e;
                  if (u) {
                    if (!a)
                      for (a = {}; (e = Be.exec(o)); )
                        a[e[1].toLowerCase() + " "] = (
                          a[e[1].toLowerCase() + " "] || []
                        ).concat(e[2]);
                    e = a[t.toLowerCase() + " "];
                  }
                  return null == e ? null : e.join(", ");
                },
                getAllResponseHeaders: function () {
                  return u ? o : null;
                },
                setRequestHeader: function (t, e) {
                  return (
                    null == u &&
                      ((t = x[t.toLowerCase()] = x[t.toLowerCase()] || t),
                      (_[t] = e)),
                    this
                  );
                },
                overrideMimeType: function (t) {
                  return null == u && (d.mimeType = t), this;
                },
                statusCode: function (t) {
                  var e;
                  if (t)
                    if (u) j.always(t[j.status]);
                    else for (e in t) y[e] = [y[e], t[e]];
                  return this;
                },
                abort: function (t) {
                  var e = t || O;
                  return r && r.abort(e), S(0, e), this;
                },
              };
            if (
              (g.promise(j),
              (d.url = ((t || d.url || ke.href) + "").replace(
                We,
                ke.protocol + "//"
              )),
              (d.type = e.method || e.type || d.method || d.type),
              (d.dataTypes = (d.dataType || "*").toLowerCase().match(Y) || [
                "",
              ]),
              null == d.crossDomain)
            ) {
              c = b.createElement("a");
              try {
                (c.href = d.url),
                  (c.href = c.href),
                  (d.crossDomain =
                    Ge.protocol + "//" + Ge.host != c.protocol + "//" + c.host);
              } catch (t) {
                d.crossDomain = !0;
              }
            }
            if (
              (d.data &&
                d.processData &&
                "string" != typeof d.data &&
                (d.data = w.param(d.data, d.traditional)),
              Ve(ze, d, e, j),
              u)
            )
              return j;
            for (f in ((l = w.event && d.global) &&
              0 == w.active++ &&
              w.event.trigger("ajaxStart"),
            (d.type = d.type.toUpperCase()),
            (d.hasContent = !Ue.test(d.type)),
            (i = d.url.replace(He, "")),
            d.hasContent
              ? d.data &&
                d.processData &&
                0 ===
                  (d.contentType || "").indexOf(
                    "application/x-www-form-urlencoded"
                  ) &&
                (d.data = d.data.replace(Me, "+"))
              : ((p = d.url.slice(i.length)),
                d.data &&
                  (d.processData || "string" == typeof d.data) &&
                  ((i += (Ne.test(i) ? "&" : "?") + d.data), delete d.data),
                !1 === d.cache &&
                  ((i = i.replace(Fe, "$1")),
                  (p = (Ne.test(i) ? "&" : "?") + "_=" + Ce.guid++ + p)),
                (d.url = i + p)),
            d.ifModified &&
              (w.lastModified[i] &&
                j.setRequestHeader("If-Modified-Since", w.lastModified[i]),
              w.etag[i] && j.setRequestHeader("If-None-Match", w.etag[i])),
            ((d.data && d.hasContent && !1 !== d.contentType) ||
              e.contentType) &&
              j.setRequestHeader("Content-Type", d.contentType),
            j.setRequestHeader(
              "Accept",
              d.dataTypes[0] && d.accepts[d.dataTypes[0]]
                ? d.accepts[d.dataTypes[0]] +
                    ("*" !== d.dataTypes[0] ? ", " + Ye + "; q=0.01" : "")
                : d.accepts["*"]
            ),
            d.headers))
              j.setRequestHeader(f, d.headers[f]);
            if (d.beforeSend && (!1 === d.beforeSend.call(h, j, d) || u))
              return j.abort();
            if (
              ((O = "abort"),
              m.add(d.complete),
              j.done(d.success),
              j.fail(d.error),
              (r = Ve($e, d, e, j)))
            ) {
              if (((j.readyState = 1), l && v.trigger("ajaxSend", [j, d]), u))
                return j;
              d.async &&
                d.timeout > 0 &&
                (s = n.setTimeout(function () {
                  j.abort("timeout");
                }, d.timeout));
              try {
                (u = !1), r.send(_, S);
              } catch (t) {
                if (u) throw t;
                S(-1, t);
              }
            } else S(-1, "No Transport");
            function S(t, e, a, c) {
              var f,
                p,
                b,
                _,
                x,
                O = e;
              u ||
                ((u = !0),
                s && n.clearTimeout(s),
                (r = void 0),
                (o = c || ""),
                (j.readyState = t > 0 ? 4 : 0),
                (f = (t >= 200 && t < 300) || 304 === t),
                a &&
                  (_ = (function (t, e, n) {
                    for (
                      var r, i, o, a, s = t.contents, c = t.dataTypes;
                      "*" === c[0];

                    )
                      c.shift(),
                        void 0 === r &&
                          (r =
                            t.mimeType || e.getResponseHeader("Content-Type"));
                    if (r)
                      for (i in s)
                        if (s[i] && s[i].test(r)) {
                          c.unshift(i);
                          break;
                        }
                    if (c[0] in n) o = c[0];
                    else {
                      for (i in n) {
                        if (!c[0] || t.converters[i + " " + c[0]]) {
                          o = i;
                          break;
                        }
                        a || (a = i);
                      }
                      o = o || a;
                    }
                    if (o) return o !== c[0] && c.unshift(o), n[o];
                  })(d, j, a)),
                !f &&
                  w.inArray("script", d.dataTypes) > -1 &&
                  w.inArray("json", d.dataTypes) < 0 &&
                  (d.converters["text script"] = function () {}),
                (_ = (function (t, e, n, r) {
                  var i,
                    o,
                    a,
                    s,
                    c,
                    u = {},
                    l = t.dataTypes.slice();
                  if (l[1])
                    for (a in t.converters)
                      u[a.toLowerCase()] = t.converters[a];
                  for (o = l.shift(); o; )
                    if (
                      (t.responseFields[o] && (n[t.responseFields[o]] = e),
                      !c &&
                        r &&
                        t.dataFilter &&
                        (e = t.dataFilter(e, t.dataType)),
                      (c = o),
                      (o = l.shift()))
                    )
                      if ("*" === o) o = c;
                      else if ("*" !== c && c !== o) {
                        if (!(a = u[c + " " + o] || u["* " + o]))
                          for (i in u)
                            if (
                              (s = i.split(" "))[1] === o &&
                              (a = u[c + " " + s[0]] || u["* " + s[0]])
                            ) {
                              !0 === a
                                ? (a = u[i])
                                : !0 !== u[i] && ((o = s[0]), l.unshift(s[1]));
                              break;
                            }
                        if (!0 !== a)
                          if (a && t.throws) e = a(e);
                          else
                            try {
                              e = a(e);
                            } catch (t) {
                              return {
                                state: "parsererror",
                                error: a
                                  ? t
                                  : "No conversion from " + c + " to " + o,
                              };
                            }
                      }
                  return { state: "success", data: e };
                })(d, _, j, f)),
                f
                  ? (d.ifModified &&
                      ((x = j.getResponseHeader("Last-Modified")) &&
                        (w.lastModified[i] = x),
                      (x = j.getResponseHeader("etag")) && (w.etag[i] = x)),
                    204 === t || "HEAD" === d.type
                      ? (O = "nocontent")
                      : 304 === t
                      ? (O = "notmodified")
                      : ((O = _.state), (p = _.data), (f = !(b = _.error))))
                  : ((b = O), (!t && O) || ((O = "error"), t < 0 && (t = 0))),
                (j.status = t),
                (j.statusText = (e || O) + ""),
                f ? g.resolveWith(h, [p, O, j]) : g.rejectWith(h, [j, O, b]),
                j.statusCode(y),
                (y = void 0),
                l &&
                  v.trigger(f ? "ajaxSuccess" : "ajaxError", [j, d, f ? p : b]),
                m.fireWith(h, [j, O]),
                l &&
                  (v.trigger("ajaxComplete", [j, d]),
                  --w.active || w.event.trigger("ajaxStop")));
            }
            return j;
          },
          getJSON: function (t, e, n) {
            return w.get(t, e, n, "json");
          },
          getScript: function (t, e) {
            return w.get(t, void 0, e, "script");
          },
        }),
        w.each(["get", "post"], function (t, e) {
          w[e] = function (t, n, r, i) {
            return (
              m(n) && ((i = i || r), (r = n), (n = void 0)),
              w.ajax(
                w.extend(
                  { url: t, type: e, dataType: i, data: n, success: r },
                  w.isPlainObject(t) && t
                )
              )
            );
          };
        }),
        w.ajaxPrefilter(function (t) {
          var e;
          for (e in t.headers)
            "content-type" === e.toLowerCase() &&
              (t.contentType = t.headers[e] || "");
        }),
        (w._evalUrl = function (t, e, n) {
          return w.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: { "text script": function () {} },
            dataFilter: function (t) {
              w.globalEval(t, e, n);
            },
          });
        }),
        w.fn.extend({
          wrapAll: function (t) {
            var e;
            return (
              this[0] &&
                (m(t) && (t = t.call(this[0])),
                (e = w(t, this[0].ownerDocument).eq(0).clone(!0)),
                this[0].parentNode && e.insertBefore(this[0]),
                e
                  .map(function () {
                    for (var t = this; t.firstElementChild; )
                      t = t.firstElementChild;
                    return t;
                  })
                  .append(this)),
              this
            );
          },
          wrapInner: function (t) {
            return m(t)
              ? this.each(function (e) {
                  w(this).wrapInner(t.call(this, e));
                })
              : this.each(function () {
                  var e = w(this),
                    n = e.contents();
                  n.length ? n.wrapAll(t) : e.append(t);
                });
          },
          wrap: function (t) {
            var e = m(t);
            return this.each(function (n) {
              w(this).wrapAll(e ? t.call(this, n) : t);
            });
          },
          unwrap: function (t) {
            return (
              this.parent(t)
                .not("body")
                .each(function () {
                  w(this).replaceWith(this.childNodes);
                }),
              this
            );
          },
        }),
        (w.expr.pseudos.hidden = function (t) {
          return !w.expr.pseudos.visible(t);
        }),
        (w.expr.pseudos.visible = function (t) {
          return !!(
            t.offsetWidth ||
            t.offsetHeight ||
            t.getClientRects().length
          );
        }),
        (w.ajaxSettings.xhr = function () {
          try {
            return new n.XMLHttpRequest();
          } catch (t) {}
        });
      var Ke = { 0: 200, 1223: 204 },
        Qe = w.ajaxSettings.xhr();
      (g.cors = !!Qe && "withCredentials" in Qe),
        (g.ajax = Qe = !!Qe),
        w.ajaxTransport(function (t) {
          var e, r;
          if (g.cors || (Qe && !t.crossDomain))
            return {
              send: function (i, o) {
                var a,
                  s = t.xhr();
                if (
                  (s.open(t.type, t.url, t.async, t.username, t.password),
                  t.xhrFields)
                )
                  for (a in t.xhrFields) s[a] = t.xhrFields[a];
                for (a in (t.mimeType &&
                  s.overrideMimeType &&
                  s.overrideMimeType(t.mimeType),
                t.crossDomain ||
                  i["X-Requested-With"] ||
                  (i["X-Requested-With"] = "XMLHttpRequest"),
                i))
                  s.setRequestHeader(a, i[a]);
                (e = function (t) {
                  return function () {
                    e &&
                      ((e =
                        r =
                        s.onload =
                        s.onerror =
                        s.onabort =
                        s.ontimeout =
                        s.onreadystatechange =
                          null),
                      "abort" === t
                        ? s.abort()
                        : "error" === t
                        ? "number" != typeof s.status
                          ? o(0, "error")
                          : o(s.status, s.statusText)
                        : o(
                            Ke[s.status] || s.status,
                            s.statusText,
                            "text" !== (s.responseType || "text") ||
                              "string" != typeof s.responseText
                              ? { binary: s.response }
                              : { text: s.responseText },
                            s.getAllResponseHeaders()
                          ));
                  };
                }),
                  (s.onload = e()),
                  (r = s.onerror = s.ontimeout = e("error")),
                  void 0 !== s.onabort
                    ? (s.onabort = r)
                    : (s.onreadystatechange = function () {
                        4 === s.readyState &&
                          n.setTimeout(function () {
                            e && r();
                          });
                      }),
                  (e = e("abort"));
                try {
                  s.send((t.hasContent && t.data) || null);
                } catch (t) {
                  if (e) throw t;
                }
              },
              abort: function () {
                e && e();
              },
            };
        }),
        w.ajaxPrefilter(function (t) {
          t.crossDomain && (t.contents.script = !1);
        }),
        w.ajaxSetup({
          accepts: {
            script:
              "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
          },
          contents: { script: /\b(?:java|ecma)script\b/ },
          converters: {
            "text script": function (t) {
              return w.globalEval(t), t;
            },
          },
        }),
        w.ajaxPrefilter("script", function (t) {
          void 0 === t.cache && (t.cache = !1),
            t.crossDomain && (t.type = "GET");
        }),
        w.ajaxTransport("script", function (t) {
          var e, n;
          if (t.crossDomain || t.scriptAttrs)
            return {
              send: function (r, i) {
                (e = w("<script>")
                  .attr(t.scriptAttrs || {})
                  .prop({ charset: t.scriptCharset, src: t.url })
                  .on(
                    "load error",
                    (n = function (t) {
                      e.remove(),
                        (n = null),
                        t && i("error" === t.type ? 404 : 200, t.type);
                    })
                  )),
                  b.head.appendChild(e[0]);
              },
              abort: function () {
                n && n();
              },
            };
        });
      var Ze,
        tn = [],
        en = /(=)\?(?=&|$)|\?\?/;
      w.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
          var t = tn.pop() || w.expando + "_" + Ce.guid++;
          return (this[t] = !0), t;
        },
      }),
        w.ajaxPrefilter("json jsonp", function (t, e, r) {
          var i,
            o,
            a,
            s =
              !1 !== t.jsonp &&
              (en.test(t.url)
                ? "url"
                : "string" == typeof t.data &&
                  0 ===
                    (t.contentType || "").indexOf(
                      "application/x-www-form-urlencoded"
                    ) &&
                  en.test(t.data) &&
                  "data");
          if (s || "jsonp" === t.dataTypes[0])
            return (
              (i = t.jsonpCallback =
                m(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
              s
                ? (t[s] = t[s].replace(en, "$1" + i))
                : !1 !== t.jsonp &&
                  (t.url += (Ne.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
              (t.converters["script json"] = function () {
                return a || w.error(i + " was not called"), a[0];
              }),
              (t.dataTypes[0] = "json"),
              (o = n[i]),
              (n[i] = function () {
                a = arguments;
              }),
              r.always(function () {
                void 0 === o ? w(n).removeProp(i) : (n[i] = o),
                  t[i] && ((t.jsonpCallback = e.jsonpCallback), tn.push(i)),
                  a && m(o) && o(a[0]),
                  (a = o = void 0);
              }),
              "script"
            );
        }),
        (g.createHTMLDocument =
          (((Ze = b.implementation.createHTMLDocument("").body).innerHTML =
            "<form></form><form></form>"),
          2 === Ze.childNodes.length)),
        (w.parseHTML = function (t, e, n) {
          return "string" != typeof t
            ? []
            : ("boolean" == typeof e && ((n = e), (e = !1)),
              e ||
                (g.createHTMLDocument
                  ? (((r = (e =
                      b.implementation.createHTMLDocument("")).createElement(
                      "base"
                    )).href = b.location.href),
                    e.head.appendChild(r))
                  : (e = b)),
              (o = !n && []),
              (i = H.exec(t))
                ? [e.createElement(i[1])]
                : ((i = At([t], e, o)),
                  o && o.length && w(o).remove(),
                  w.merge([], i.childNodes)));
          var r, i, o;
        }),
        (w.fn.load = function (t, e, n) {
          var r,
            i,
            o,
            a = this,
            s = t.indexOf(" ");
          return (
            s > -1 && ((r = we(t.slice(s))), (t = t.slice(0, s))),
            m(e)
              ? ((n = e), (e = void 0))
              : e && "object" == typeof e && (i = "POST"),
            a.length > 0 &&
              w
                .ajax({ url: t, type: i || "GET", dataType: "html", data: e })
                .done(function (t) {
                  (o = arguments),
                    a.html(r ? w("<div>").append(w.parseHTML(t)).find(r) : t);
                })
                .always(
                  n &&
                    function (t, e) {
                      a.each(function () {
                        n.apply(this, o || [t.responseText, e, t]);
                      });
                    }
                ),
            this
          );
        }),
        (w.expr.pseudos.animated = function (t) {
          return w.grep(w.timers, function (e) {
            return t === e.elem;
          }).length;
        }),
        (w.offset = {
          setOffset: function (t, e, n) {
            var r,
              i,
              o,
              a,
              s,
              c,
              u = w.css(t, "position"),
              l = w(t),
              f = {};
            "static" === u && (t.style.position = "relative"),
              (s = l.offset()),
              (o = w.css(t, "top")),
              (c = w.css(t, "left")),
              ("absolute" === u || "fixed" === u) &&
              (o + c).indexOf("auto") > -1
                ? ((a = (r = l.position()).top), (i = r.left))
                : ((a = parseFloat(o) || 0), (i = parseFloat(c) || 0)),
              m(e) && (e = e.call(t, n, w.extend({}, s))),
              null != e.top && (f.top = e.top - s.top + a),
              null != e.left && (f.left = e.left - s.left + i),
              "using" in e ? e.using.call(t, f) : l.css(f);
          },
        }),
        w.fn.extend({
          offset: function (t) {
            if (arguments.length)
              return void 0 === t
                ? this
                : this.each(function (e) {
                    w.offset.setOffset(this, t, e);
                  });
            var e,
              n,
              r = this[0];
            return r
              ? r.getClientRects().length
                ? ((e = r.getBoundingClientRect()),
                  (n = r.ownerDocument.defaultView),
                  { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
                : { top: 0, left: 0 }
              : void 0;
          },
          position: function () {
            if (this[0]) {
              var t,
                e,
                n,
                r = this[0],
                i = { top: 0, left: 0 };
              if ("fixed" === w.css(r, "position"))
                e = r.getBoundingClientRect();
              else {
                for (
                  e = this.offset(),
                    n = r.ownerDocument,
                    t = r.offsetParent || n.documentElement;
                  t &&
                  (t === n.body || t === n.documentElement) &&
                  "static" === w.css(t, "position");

                )
                  t = t.parentNode;
                t &&
                  t !== r &&
                  1 === t.nodeType &&
                  (((i = w(t).offset()).top += w.css(t, "borderTopWidth", !0)),
                  (i.left += w.css(t, "borderLeftWidth", !0)));
              }
              return {
                top: e.top - i.top - w.css(r, "marginTop", !0),
                left: e.left - i.left - w.css(r, "marginLeft", !0),
              };
            }
          },
          offsetParent: function () {
            return this.map(function () {
              for (
                var t = this.offsetParent;
                t && "static" === w.css(t, "position");

              )
                t = t.offsetParent;
              return t || ht;
            });
          },
        }),
        w.each(
          { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
          function (t, e) {
            var n = "pageYOffset" === e;
            w.fn[t] = function (r) {
              return Z(
                this,
                function (t, r, i) {
                  var o;
                  if (
                    (y(t) ? (o = t) : 9 === t.nodeType && (o = t.defaultView),
                    void 0 === i)
                  )
                    return o ? o[e] : t[r];
                  o
                    ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset)
                    : (t[r] = i);
                },
                t,
                r,
                arguments.length
              );
            };
          }
        ),
        w.each(["top", "left"], function (t, e) {
          w.cssHooks[e] = Zt(g.pixelPosition, function (t, n) {
            if (n)
              return (n = Qt(t, e)), Gt.test(n) ? w(t).position()[e] + "px" : n;
          });
        }),
        w.each({ Height: "height", Width: "width" }, function (t, e) {
          w.each(
            { padding: "inner" + t, content: e, "": "outer" + t },
            function (n, r) {
              w.fn[r] = function (i, o) {
                var a = arguments.length && (n || "boolean" != typeof i),
                  s = n || (!0 === i || !0 === o ? "margin" : "border");
                return Z(
                  this,
                  function (e, n, i) {
                    var o;
                    return y(e)
                      ? 0 === r.indexOf("outer")
                        ? e["inner" + t]
                        : e.document.documentElement["client" + t]
                      : 9 === e.nodeType
                      ? ((o = e.documentElement),
                        Math.max(
                          e.body["scroll" + t],
                          o["scroll" + t],
                          e.body["offset" + t],
                          o["offset" + t],
                          o["client" + t]
                        ))
                      : void 0 === i
                      ? w.css(e, n, s)
                      : w.style(e, n, i, s);
                  },
                  e,
                  a ? i : void 0,
                  a
                );
              };
            }
          );
        }),
        w.each(
          [
            "ajaxStart",
            "ajaxStop",
            "ajaxComplete",
            "ajaxError",
            "ajaxSuccess",
            "ajaxSend",
          ],
          function (t, e) {
            w.fn[e] = function (t) {
              return this.on(e, t);
            };
          }
        ),
        w.fn.extend({
          bind: function (t, e, n) {
            return this.on(t, null, e, n);
          },
          unbind: function (t, e) {
            return this.off(t, null, e);
          },
          delegate: function (t, e, n, r) {
            return this.on(e, t, n, r);
          },
          undelegate: function (t, e, n) {
            return 1 === arguments.length
              ? this.off(t, "**")
              : this.off(e, t || "**", n);
          },
          hover: function (t, e) {
            return this.on("mouseenter", t).on("mouseleave", e || t);
          },
        }),
        w.each(
          "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
            " "
          ),
          function (t, e) {
            w.fn[e] = function (t, n) {
              return arguments.length > 0
                ? this.on(e, null, t, n)
                : this.trigger(e);
            };
          }
        );
      var nn = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
      (w.proxy = function (t, e) {
        var n, r, i;
        if (("string" == typeof e && ((n = t[e]), (e = t), (t = n)), m(t)))
          return (
            (r = s.call(arguments, 2)),
            ((i = function () {
              return t.apply(e || this, r.concat(s.call(arguments)));
            }).guid = t.guid =
              t.guid || w.guid++),
            i
          );
      }),
        (w.holdReady = function (t) {
          t ? w.readyWait++ : w.ready(!0);
        }),
        (w.isArray = Array.isArray),
        (w.parseJSON = JSON.parse),
        (w.nodeName = T),
        (w.isFunction = m),
        (w.isWindow = y),
        (w.camelCase = rt),
        (w.type = O),
        (w.now = Date.now),
        (w.isNumeric = function (t) {
          var e = w.type(t);
          return (
            ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
          );
        }),
        (w.trim = function (t) {
          return null == t ? "" : (t + "").replace(nn, "$1");
        }),
        void 0 ===
          (r = function () {
            return w;
          }.apply(e, [])) || (t.exports = r);
      var rn = n.jQuery,
        on = n.$;
      return (
        (w.noConflict = function (t) {
          return (
            n.$ === w && (n.$ = on), t && n.jQuery === w && (n.jQuery = rn), w
          );
        }),
        void 0 === i && (n.jQuery = n.$ = w),
        w
      );
    });
  },
  function (t, e, n) {
    "use strict";
    (function (t) {
      n.d(e, "b", function () {
        return c;
      }),
        n.d(e, "c", function () {
          return u;
        }),
        n.d(e, "d", function () {
          return l;
        }),
        n.d(e, "a", function () {
          return f;
        });
      var r = n(6),
        i = n(8),
        o = {
          nowSeconds: function () {
            return Date.now() / 1e3;
          },
        };
      var a = Object(i.b)()
          ? (function () {
              try {
                return Object(i.a)(t, "perf_hooks").performance;
              } catch (t) {
                return;
              }
            })()
          : (function () {
              var t = Object(r.a)().performance;
              if (t && t.now)
                return {
                  now: function () {
                    return t.now();
                  },
                  timeOrigin: Date.now() - t.now(),
                };
            })(),
        s =
          void 0 === a
            ? o
            : {
                nowSeconds: function () {
                  return (a.timeOrigin + a.now()) / 1e3;
                },
              },
        c = o.nowSeconds.bind(o),
        u = s.nowSeconds.bind(s),
        l = u,
        f = (function () {
          var t = Object(r.a)().performance;
          if (t && t.now) {
            var e = t.now(),
              n = Date.now(),
              i = t.timeOrigin ? Math.abs(t.timeOrigin + e - n) : 36e5,
              o = i < 36e5,
              a = t.timing && t.timing.navigationStart,
              s = "number" == typeof a ? Math.abs(a + e - n) : 36e5;
            return o || s < 36e5
              ? i <= s
                ? ("timeOrigin", t.timeOrigin)
                : ("navigationStart", a)
              : ("dateNow", n);
          }
          ("none");
        })();
    }).call(this, n(26)(t));
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "b", function () {
      return s;
    }),
      n.d(e, "a", function () {
        return c;
      });
    var r = n(0),
      i = n(21),
      o = n(11),
      a = n(7),
      s = (function () {
        function t(t) {
          void 0 === t && (t = 1e3), (this.spans = []), (this._maxlen = t);
        }
        return (
          (t.prototype.add = function (t) {
            this.spans.length > this._maxlen
              ? (t.spanRecorder = void 0)
              : this.spans.push(t);
          }),
          t
        );
      })(),
      c = (function () {
        function t(t) {
          if (
            ((this.traceId = Object(i.f)()),
            (this.spanId = Object(i.f)().substring(16)),
            (this.startTimestamp = Object(o.d)()),
            (this.tags = {}),
            (this.data = {}),
            !t)
          )
            return this;
          t.traceId && (this.traceId = t.traceId),
            t.spanId && (this.spanId = t.spanId),
            t.parentSpanId && (this.parentSpanId = t.parentSpanId),
            "sampled" in t && (this.sampled = t.sampled),
            t.op && (this.op = t.op),
            t.description && (this.description = t.description),
            t.data && (this.data = t.data),
            t.tags && (this.tags = t.tags),
            t.status && (this.status = t.status),
            t.startTimestamp && (this.startTimestamp = t.startTimestamp),
            t.endTimestamp && (this.endTimestamp = t.endTimestamp);
        }
        return (
          (t.prototype.child = function (t) {
            return this.startChild(t);
          }),
          (t.prototype.startChild = function (e) {
            var n = new t(
              Object(r.a)(Object(r.a)({}, e), {
                parentSpanId: this.spanId,
                sampled: this.sampled,
                traceId: this.traceId,
              })
            );
            return (
              (n.spanRecorder = this.spanRecorder),
              n.spanRecorder && n.spanRecorder.add(n),
              (n.transaction = this.transaction),
              n
            );
          }),
          (t.prototype.setTag = function (t, e) {
            var n;
            return (
              (this.tags = Object(r.a)(
                Object(r.a)({}, this.tags),
                (((n = {})[t] = e), n)
              )),
              this
            );
          }),
          (t.prototype.setData = function (t, e) {
            var n;
            return (
              (this.data = Object(r.a)(
                Object(r.a)({}, this.data),
                (((n = {})[t] = e), n)
              )),
              this
            );
          }),
          (t.prototype.setStatus = function (t) {
            return (this.status = t), this;
          }),
          (t.prototype.setHttpStatus = function (t) {
            this.setTag("http.status_code", String(t));
            var e = (function (t) {
              if (t < 400 && t >= 100) return "ok";
              if (t >= 400 && t < 500)
                switch (t) {
                  case 401:
                    return "unauthenticated";
                  case 403:
                    return "permission_denied";
                  case 404:
                    return "not_found";
                  case 409:
                    return "already_exists";
                  case 413:
                    return "failed_precondition";
                  case 429:
                    return "resource_exhausted";
                  default:
                    return "invalid_argument";
                }
              if (t >= 500 && t < 600)
                switch (t) {
                  case 501:
                    return "unimplemented";
                  case 503:
                    return "unavailable";
                  case 504:
                    return "deadline_exceeded";
                  default:
                    return "internal_error";
                }
              return "unknown_error";
            })(t);
            return "unknown_error" !== e && this.setStatus(e), this;
          }),
          (t.prototype.isSuccess = function () {
            return "ok" === this.status;
          }),
          (t.prototype.finish = function (t) {
            this.endTimestamp = "number" == typeof t ? t : Object(o.d)();
          }),
          (t.prototype.toTraceparent = function () {
            var t = "";
            return (
              void 0 !== this.sampled && (t = this.sampled ? "-1" : "-0"),
              this.traceId + "-" + this.spanId + t
            );
          }),
          (t.prototype.toContext = function () {
            return Object(a.c)({
              data: this.data,
              description: this.description,
              endTimestamp: this.endTimestamp,
              op: this.op,
              parentSpanId: this.parentSpanId,
              sampled: this.sampled,
              spanId: this.spanId,
              startTimestamp: this.startTimestamp,
              status: this.status,
              tags: this.tags,
              traceId: this.traceId,
            });
          }),
          (t.prototype.updateWithContext = function (t) {
            var e, n, r, i, o;
            return (
              (this.data = null != (e = t.data) ? e : {}),
              (this.description = t.description),
              (this.endTimestamp = t.endTimestamp),
              (this.op = t.op),
              (this.parentSpanId = t.parentSpanId),
              (this.sampled = t.sampled),
              (this.spanId = null != (n = t.spanId) ? n : this.spanId),
              (this.startTimestamp =
                null != (r = t.startTimestamp) ? r : this.startTimestamp),
              (this.status = t.status),
              (this.tags = null != (i = t.tags) ? i : {}),
              (this.traceId = null != (o = t.traceId) ? o : this.traceId),
              this
            );
          }),
          (t.prototype.getTraceContext = function () {
            return Object(a.c)({
              data: Object.keys(this.data).length > 0 ? this.data : void 0,
              description: this.description,
              op: this.op,
              parent_span_id: this.parentSpanId,
              span_id: this.spanId,
              status: this.status,
              tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
              trace_id: this.traceId,
            });
          }),
          (t.prototype.toJSON = function () {
            return Object(a.c)({
              data: Object.keys(this.data).length > 0 ? this.data : void 0,
              description: this.description,
              op: this.op,
              parent_span_id: this.parentSpanId,
              span_id: this.spanId,
              start_timestamp: this.startTimestamp,
              status: this.status,
              tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
              timestamp: this.endTimestamp,
              trace_id: this.traceId,
            });
          }),
          t
        );
      })();
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return r;
    }),
      n.d(e, "b", function () {
        return i;
      });
    var r = "finishReason",
      i = ["heartbeatFailed", "idleTimeout", "documentHidden"];
  },
  ,
  function (t, e, n) {
    "use strict";
    (function (t) {
      n.d(e, "b", function () {
        return g;
      }),
        n.d(e, "a", function () {
          return m;
        });
      var r = n(0),
        i = n(20),
        o = n(5),
        a = n(4),
        s = n(8),
        c = n(34),
        u = n(1),
        l = n(18),
        f = n(19),
        p = n(3);
      function d() {
        var t = this.getScope();
        if (t) {
          var e = t.getSpan();
          if (e) return { "sentry-trace": e.toTraceparent() };
        }
        return {};
      }
      function h(t, e, n) {
        return Object(p.b)(e)
          ? void 0 !== t.sampled
            ? (t.setMetadata({
                transactionSampling: { method: "explicitly_set" },
              }),
              t)
            : ("function" == typeof e.tracesSampler
                ? ((r = e.tracesSampler(n)),
                  t.setMetadata({
                    transactionSampling: {
                      method: "client_sampler",
                      rate: Number(r),
                    },
                  }))
                : void 0 !== n.parentSampled
                ? ((r = n.parentSampled),
                  t.setMetadata({
                    transactionSampling: { method: "inheritance" },
                  }))
                : ((r = e.tracesSampleRate),
                  t.setMetadata({
                    transactionSampling: {
                      method: "client_rate",
                      rate: Number(r),
                    },
                  })),
              (function (t) {
                if (
                  Object(a.h)(t) ||
                  ("number" != typeof t && "boolean" != typeof t)
                )
                  return (
                    u.a &&
                      o.c.warn(
                        "[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got " +
                          JSON.stringify(t) +
                          " of type " +
                          JSON.stringify(typeof t) +
                          "."
                      ),
                    !1
                  );
                if (t < 0 || t > 1)
                  return (
                    u.a &&
                      o.c.warn(
                        "[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got " +
                          t +
                          "."
                      ),
                    !1
                  );
                return !0;
              })(r)
                ? r
                  ? ((t.sampled = Math.random() < r),
                    t.sampled
                      ? (u.a &&
                          o.c.log(
                            "[Tracing] starting " +
                              t.op +
                              " transaction - " +
                              t.name
                          ),
                        t)
                      : (u.a &&
                          o.c.log(
                            "[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = " +
                              Number(r) +
                              ")"
                          ),
                        t))
                  : (u.a &&
                      o.c.log(
                        "[Tracing] Discarding transaction because " +
                          ("function" == typeof e.tracesSampler
                            ? "tracesSampler returned 0 or false"
                            : "a negative sampling decision was inherited or tracesSampleRate is set to 0")
                      ),
                    (t.sampled = !1),
                    t)
                : (u.a &&
                    o.c.warn(
                      "[Tracing] Discarding transaction because of invalid sample rate."
                    ),
                  (t.sampled = !1),
                  t))
          : ((t.sampled = !1), t);
        var r;
      }
      function v(t, e) {
        var n = this.getClient(),
          i = (n && n.getOptions()) || {},
          o = new f.a(t, this);
        return (
          (o = h(
            o,
            i,
            Object(r.a)(
              { parentSampled: t.parentSampled, transactionContext: t },
              e
            )
          )).sampled &&
            o.initSpanRecorder(i._experiments && i._experiments.maxSpans),
          o
        );
      }
      function g(t, e, n, i, o) {
        var a = t.getClient(),
          s = (a && a.getOptions()) || {},
          c = new l.b(e, t, n, i);
        return (
          (c = h(
            c,
            s,
            Object(r.a)(
              { parentSampled: e.parentSampled, transactionContext: e },
              o
            )
          )).sampled &&
            c.initSpanRecorder(s._experiments && s._experiments.maxSpans),
          c
        );
      }
      function m() {
        var e;
        (e = Object(i.c)()).__SENTRY__ &&
          ((e.__SENTRY__.extensions = e.__SENTRY__.extensions || {}),
          e.__SENTRY__.extensions.startTransaction ||
            (e.__SENTRY__.extensions.startTransaction = v),
          e.__SENTRY__.extensions.traceHeaders ||
            (e.__SENTRY__.extensions.traceHeaders = d)),
          Object(s.b)() &&
            (function () {
              var e = Object(i.c)();
              if (e.__SENTRY__) {
                var n = {
                    mongodb: function () {
                      return new (Object(s.a)(
                        t,
                        "./integrations/node/mongo"
                      ).Mongo)();
                    },
                    mongoose: function () {
                      return new (Object(s.a)(
                        t,
                        "./integrations/node/mongo"
                      ).Mongo)({ mongoose: !0 });
                    },
                    mysql: function () {
                      return new (Object(s.a)(
                        t,
                        "./integrations/node/mysql"
                      ).Mysql)();
                    },
                    pg: function () {
                      return new (Object(s.a)(
                        t,
                        "./integrations/node/postgres"
                      ).Postgres)();
                    },
                  },
                  o = Object.keys(n)
                    .filter(function (t) {
                      return !!Object(s.c)(t);
                    })
                    .map(function (t) {
                      try {
                        return n[t]();
                      } catch (t) {
                        return;
                      }
                    })
                    .filter(function (t) {
                      return t;
                    });
                o.length > 0 &&
                  (e.__SENTRY__.integrations = Object(r.e)(
                    e.__SENTRY__.integrations || [],
                    o
                  ));
              }
            })(),
          Object(c.a)();
      }
    }).call(this, n(26)(t));
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "d", function () {
      return i;
    }),
      n.d(e, "c", function () {
        return o;
      }),
      n.d(e, "b", function () {
        return a;
      }),
      n.d(e, "a", function () {
        return s;
      });
    var r = n(4);
    function i(t, e) {
      return (
        void 0 === e && (e = 0),
        "string" != typeof t || 0 === e || t.length <= e
          ? t
          : t.substr(0, e) + "..."
      );
    }
    function o(t, e) {
      var n = t,
        r = n.length;
      if (r <= 150) return n;
      e > r && (e = r);
      var i = Math.max(e - 60, 0);
      i < 5 && (i = 0);
      var o = Math.min(i + 140, r);
      return (
        o > r - 5 && (o = r),
        o === r && (i = Math.max(o - 140, 0)),
        (n = n.slice(i, o)),
        i > 0 && (n = "'{snip} " + n),
        o < r && (n += " {snip}"),
        n
      );
    }
    function a(t, e) {
      if (!Array.isArray(t)) return "";
      for (var n = [], r = 0; r < t.length; r++) {
        var i = t[r];
        try {
          n.push(String(i));
        } catch (t) {
          n.push("[value cannot be serialized]");
        }
      }
      return n.join(e);
    }
    function s(t, e) {
      return (
        !!Object(r.l)(t) &&
        (Object(r.k)(e)
          ? e.test(t)
          : "string" == typeof e && -1 !== t.indexOf(e))
      );
    }
  },
  function (t, e) {
    var n = [
        "galaxywave_delta",
        "galaxywave",
        "fuzzup",
        "highvoltage",
        "nextage",
        "exchain",
        "matixx",
        "tbre",
        "tb",
      ],
      r = n[0],
      i = n[1];
    t.exports = {
      APP_VERSION: "v1.42.2",
      CURRENT_VERSION: r,
      CURRENT_VERSION_2: i,
      ON_SERVICE_VERSIONS: [
        "galaxywave_delta",
        "galaxywave",
        "fuzzup",
        "highvoltage",
      ],
      NO_EAM_PATH_VERSIONS: ["nextage", "exchain", "matixx", "tbre", "tb"],
      ALL_VERSIONS: n,
      VERSION_NAME: {
        tb: "Tri-Boost",
        tbre: "Tri-Boost Re:EVOLVE",
        matixx: "Matixx",
        exchain: "EXCHAIN",
        nextage: "NEX+AGE",
        highvoltage: "HIGH-VOLTAGE",
        fuzzup: "FUZZ-UP",
        galaxywave: "GALAXY WAVE",
        galaxywave_delta: "GALAXY WAVE DELTA",
      },
      OLD_NAME_MAP: {
        "Windy Fairy -GITADO ROCK ver.-": "Windy Fairy -GITADOROCK ver.-",
      },
    };
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return l;
    }),
      n.d(e, "b", function () {
        return p;
      });
    var r = n(0),
      i = n(11),
      o = n(5),
      a = n(13),
      s = n(1),
      c = n(12),
      u = n(19),
      l = 1e3,
      f = (function (t) {
        function e(e, n, r, i) {
          void 0 === r && (r = "");
          var o = t.call(this, i) || this;
          return (
            (o._pushActivity = e),
            (o._popActivity = n),
            (o.transactionSpanId = r),
            o
          );
        }
        return (
          Object(r.b)(e, t),
          (e.prototype.add = function (e) {
            var n = this;
            e.spanId !== this.transactionSpanId &&
              ((e.finish = function (t) {
                (e.endTimestamp = "number" == typeof t ? t : Object(i.d)()),
                  n._popActivity(e.spanId);
              }),
              void 0 === e.endTimestamp && this._pushActivity(e.spanId)),
              t.prototype.add.call(this, e);
          }),
          e
        );
      })(c.b),
      p = (function (t) {
        function e(e, n, r, i) {
          void 0 === r && (r = l), void 0 === i && (i = !1);
          var a = t.call(this, e, n) || this;
          return (
            (a._idleHub = n),
            (a._idleTimeout = r),
            (a._onScope = i),
            (a.activities = {}),
            (a._heartbeatCounter = 0),
            (a._finished = !1),
            (a._beforeFinishCallbacks = []),
            n &&
              i &&
              (d(n),
              s.a &&
                o.c.log(
                  "Setting idle transaction on scope. Span ID: " + a.spanId
                ),
              n.configureScope(function (t) {
                return t.setSpan(a);
              })),
            (a._initTimeout = setTimeout(function () {
              a._finished || a.finish();
            }, a._idleTimeout)),
            a
          );
        }
        return (
          Object(r.b)(e, t),
          (e.prototype.finish = function (e) {
            var n,
              a,
              c = this;
            if (
              (void 0 === e && (e = Object(i.d)()),
              (this._finished = !0),
              (this.activities = {}),
              this.spanRecorder)
            ) {
              s.a &&
                o.c.log(
                  "[Tracing] finishing IdleTransaction",
                  new Date(1e3 * e).toISOString(),
                  this.op
                );
              try {
                for (
                  var u = Object(r.f)(this._beforeFinishCallbacks),
                    l = u.next();
                  !l.done;
                  l = u.next()
                ) {
                  (0, l.value)(this, e);
                }
              } catch (t) {
                n = { error: t };
              } finally {
                try {
                  l && !l.done && (a = u.return) && a.call(u);
                } finally {
                  if (n) throw n.error;
                }
              }
              (this.spanRecorder.spans = this.spanRecorder.spans.filter(
                function (t) {
                  if (t.spanId === c.spanId) return !0;
                  t.endTimestamp ||
                    ((t.endTimestamp = e),
                    t.setStatus("cancelled"),
                    s.a &&
                      o.c.log(
                        "[Tracing] cancelling span since transaction ended early",
                        JSON.stringify(t, void 0, 2)
                      ));
                  var n = t.startTimestamp < e;
                  return (
                    n ||
                      (s.a &&
                        o.c.log(
                          "[Tracing] discarding Span since it happened after Transaction was finished",
                          JSON.stringify(t, void 0, 2)
                        )),
                    n
                  );
                }
              )),
                s.a && o.c.log("[Tracing] flushing IdleTransaction");
            } else s.a && o.c.log("[Tracing] No active IdleTransaction");
            return (
              this._onScope && d(this._idleHub),
              t.prototype.finish.call(this, e)
            );
          }),
          (e.prototype.registerBeforeFinishCallback = function (t) {
            this._beforeFinishCallbacks.push(t);
          }),
          (e.prototype.initSpanRecorder = function (t) {
            var e = this;
            if (!this.spanRecorder) {
              (this.spanRecorder = new f(
                function (t) {
                  e._finished || e._pushActivity(t);
                },
                function (t) {
                  e._finished || e._popActivity(t);
                },
                this.spanId,
                t
              )),
                s.a && o.c.log("Starting heartbeat"),
                this._pingHeartbeat();
            }
            this.spanRecorder.add(this);
          }),
          (e.prototype._pushActivity = function (t) {
            this._initTimeout &&
              (clearTimeout(this._initTimeout), (this._initTimeout = void 0)),
              s.a && o.c.log("[Tracing] pushActivity: " + t),
              (this.activities[t] = !0),
              s.a &&
                o.c.log(
                  "[Tracing] new activities count",
                  Object.keys(this.activities).length
                );
          }),
          (e.prototype._popActivity = function (t) {
            var e = this;
            if (
              (this.activities[t] &&
                (s.a && o.c.log("[Tracing] popActivity " + t),
                delete this.activities[t],
                s.a &&
                  o.c.log(
                    "[Tracing] new activities count",
                    Object.keys(this.activities).length
                  )),
              0 === Object.keys(this.activities).length)
            ) {
              var n = this._idleTimeout,
                r = Object(i.d)() + n / 1e3;
              setTimeout(function () {
                e._finished || (e.setTag(a.a, a.b[1]), e.finish(r));
              }, n);
            }
          }),
          (e.prototype._beat = function () {
            if (!this._finished) {
              var t = Object.keys(this.activities).join("");
              t === this._prevHeartbeatString
                ? (this._heartbeatCounter += 1)
                : (this._heartbeatCounter = 1),
                (this._prevHeartbeatString = t),
                this._heartbeatCounter >= 3
                  ? (s.a &&
                      o.c.log(
                        "[Tracing] Transaction finished because of no change for 3 heart beats"
                      ),
                    this.setStatus("deadline_exceeded"),
                    this.setTag(a.a, a.b[0]),
                    this.finish())
                  : this._pingHeartbeat();
            }
          }),
          (e.prototype._pingHeartbeat = function () {
            var t = this;
            s.a &&
              o.c.log(
                "pinging Heartbeat -> current counter: " +
                  this._heartbeatCounter
              ),
              setTimeout(function () {
                t._beat();
              }, 5e3);
          }),
          e
        );
      })(u.a);
    function d(t) {
      if (t) {
        var e = t.getScope();
        if (e) e.getTransaction() && e.setSpan(void 0);
      }
    }
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return l;
    });
    var r = n(0),
      i = n(20),
      o = n(4),
      a = n(5),
      s = n(7),
      c = n(1),
      u = n(12),
      l = (function (t) {
        function e(e, n) {
          var r = t.call(this, e) || this;
          return (
            (r._measurements = {}),
            (r._hub = Object(i.b)()),
            Object(o.g)(n, i.a) && (r._hub = n),
            (r.name = e.name || ""),
            (r.metadata = e.metadata || {}),
            (r._trimEnd = e.trimEnd),
            (r.transaction = r),
            r
          );
        }
        return (
          Object(r.b)(e, t),
          (e.prototype.setName = function (t) {
            this.name = t;
          }),
          (e.prototype.initSpanRecorder = function (t) {
            void 0 === t && (t = 1e3),
              this.spanRecorder || (this.spanRecorder = new u.b(t)),
              this.spanRecorder.add(this);
          }),
          (e.prototype.setMeasurements = function (t) {
            this._measurements = Object(r.a)({}, t);
          }),
          (e.prototype.setMetadata = function (t) {
            this.metadata = Object(r.a)(Object(r.a)({}, this.metadata), t);
          }),
          (e.prototype.finish = function (e) {
            var n = this;
            if (void 0 === this.endTimestamp) {
              if (
                (this.name ||
                  (c.a &&
                    a.c.warn(
                      "Transaction has no name, falling back to `<unlabeled transaction>`."
                    ),
                  (this.name = "<unlabeled transaction>")),
                t.prototype.finish.call(this, e),
                !0 === this.sampled)
              ) {
                var r = this.spanRecorder
                  ? this.spanRecorder.spans.filter(function (t) {
                      return t !== n && t.endTimestamp;
                    })
                  : [];
                this._trimEnd &&
                  r.length > 0 &&
                  (this.endTimestamp = r.reduce(function (t, e) {
                    return t.endTimestamp && e.endTimestamp
                      ? t.endTimestamp > e.endTimestamp
                        ? t
                        : e
                      : t;
                  }).endTimestamp);
                var i = {
                  contexts: { trace: this.getTraceContext() },
                  spans: r,
                  start_timestamp: this.startTimestamp,
                  tags: this.tags,
                  timestamp: this.endTimestamp,
                  transaction: this.name,
                  type: "transaction",
                  sdkProcessingMetadata: this.metadata,
                };
                return (
                  Object.keys(this._measurements).length > 0 &&
                    (c.a &&
                      a.c.log(
                        "[Measurements] Adding measurements to transaction",
                        JSON.stringify(this._measurements, void 0, 2)
                      ),
                    (i.measurements = this._measurements)),
                  c.a &&
                    a.c.log(
                      "[Tracing] Finishing " +
                        this.op +
                        " transaction: " +
                        this.name +
                        "."
                    ),
                  this._hub.captureEvent(i)
                );
              }
              c.a &&
                a.c.log(
                  "[Tracing] Discarding transaction because its trace was not chosen to be sampled."
                );
              var o = this._hub.getClient(),
                s = o && o.getTransport && o.getTransport();
              s &&
                s.recordLostEvent &&
                s.recordLostEvent("sample_rate", "transaction");
            }
          }),
          (e.prototype.toContext = function () {
            var e = t.prototype.toContext.call(this);
            return Object(s.c)(
              Object(r.a)(Object(r.a)({}, e), {
                name: this.name,
                trimEnd: this._trimEnd,
              })
            );
          }),
          (e.prototype.updateWithContext = function (e) {
            var n;
            return (
              t.prototype.updateWithContext.call(this, e),
              (this.name = null != (n = e.name) ? n : ""),
              (this._trimEnd = e.trimEnd),
              this
            );
          }),
          e
        );
      })(u.a);
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return p;
    }),
      n.d(e, "c", function () {
        return d;
      }),
      n.d(e, "b", function () {
        return v;
      });
    var r = n(0),
      i = n(21),
      o = n(11),
      a = n(5),
      s = n(6),
      c = n(8),
      u = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
      l = n(25),
      f = n(33),
      p = (function () {
        function t(t, e, n) {
          void 0 === e && (e = new l.a()),
            void 0 === n && (n = 4),
            (this._version = n),
            (this._stack = [{}]),
            (this.getStackTop().scope = e),
            t && this.bindClient(t);
        }
        return (
          (t.prototype.isOlderThan = function (t) {
            return this._version < t;
          }),
          (t.prototype.bindClient = function (t) {
            (this.getStackTop().client = t),
              t && t.setupIntegrations && t.setupIntegrations();
          }),
          (t.prototype.pushScope = function () {
            var t = l.a.clone(this.getScope());
            return (
              this.getStack().push({ client: this.getClient(), scope: t }), t
            );
          }),
          (t.prototype.popScope = function () {
            return !(this.getStack().length <= 1) && !!this.getStack().pop();
          }),
          (t.prototype.withScope = function (t) {
            var e = this.pushScope();
            try {
              t(e);
            } finally {
              this.popScope();
            }
          }),
          (t.prototype.getClient = function () {
            return this.getStackTop().client;
          }),
          (t.prototype.getScope = function () {
            return this.getStackTop().scope;
          }),
          (t.prototype.getStack = function () {
            return this._stack;
          }),
          (t.prototype.getStackTop = function () {
            return this._stack[this._stack.length - 1];
          }),
          (t.prototype.captureException = function (t, e) {
            var n = (this._lastEventId =
                e && e.event_id ? e.event_id : Object(i.f)()),
              o = e;
            if (!e) {
              var a = void 0;
              try {
                throw new Error("Sentry syntheticException");
              } catch (t) {
                a = t;
              }
              o = { originalException: t, syntheticException: a };
            }
            return (
              this._invokeClient(
                "captureException",
                t,
                Object(r.a)(Object(r.a)({}, o), { event_id: n })
              ),
              n
            );
          }),
          (t.prototype.captureMessage = function (t, e, n) {
            var o = (this._lastEventId =
                n && n.event_id ? n.event_id : Object(i.f)()),
              a = n;
            if (!n) {
              var s = void 0;
              try {
                throw new Error(t);
              } catch (t) {
                s = t;
              }
              a = { originalException: t, syntheticException: s };
            }
            return (
              this._invokeClient(
                "captureMessage",
                t,
                e,
                Object(r.a)(Object(r.a)({}, a), { event_id: o })
              ),
              o
            );
          }),
          (t.prototype.captureEvent = function (t, e) {
            var n = e && e.event_id ? e.event_id : Object(i.f)();
            return (
              "transaction" !== t.type && (this._lastEventId = n),
              this._invokeClient(
                "captureEvent",
                t,
                Object(r.a)(Object(r.a)({}, e), { event_id: n })
              ),
              n
            );
          }),
          (t.prototype.lastEventId = function () {
            return this._lastEventId;
          }),
          (t.prototype.addBreadcrumb = function (t, e) {
            var n = this.getStackTop(),
              i = n.scope,
              s = n.client;
            if (i && s) {
              var c = (s.getOptions && s.getOptions()) || {},
                u = c.beforeBreadcrumb,
                l = void 0 === u ? null : u,
                f = c.maxBreadcrumbs,
                p = void 0 === f ? 100 : f;
              if (!(p <= 0)) {
                var d = Object(o.b)(),
                  h = Object(r.a)({ timestamp: d }, t),
                  v = l
                    ? Object(a.b)(function () {
                        return l(h, e);
                      })
                    : h;
                null !== v && i.addBreadcrumb(v, p);
              }
            }
          }),
          (t.prototype.setUser = function (t) {
            var e = this.getScope();
            e && e.setUser(t);
          }),
          (t.prototype.setTags = function (t) {
            var e = this.getScope();
            e && e.setTags(t);
          }),
          (t.prototype.setExtras = function (t) {
            var e = this.getScope();
            e && e.setExtras(t);
          }),
          (t.prototype.setTag = function (t, e) {
            var n = this.getScope();
            n && n.setTag(t, e);
          }),
          (t.prototype.setExtra = function (t, e) {
            var n = this.getScope();
            n && n.setExtra(t, e);
          }),
          (t.prototype.setContext = function (t, e) {
            var n = this.getScope();
            n && n.setContext(t, e);
          }),
          (t.prototype.configureScope = function (t) {
            var e = this.getStackTop(),
              n = e.scope,
              r = e.client;
            n && r && t(n);
          }),
          (t.prototype.run = function (t) {
            var e = h(this);
            try {
              t(this);
            } finally {
              h(e);
            }
          }),
          (t.prototype.getIntegration = function (t) {
            var e = this.getClient();
            if (!e) return null;
            try {
              return e.getIntegration(t);
            } catch (e) {
              return (
                u &&
                  a.c.warn(
                    "Cannot retrieve integration " +
                      t.id +
                      " from the current Hub"
                  ),
                null
              );
            }
          }),
          (t.prototype.startSpan = function (t) {
            return this._callExtensionMethod("startSpan", t);
          }),
          (t.prototype.startTransaction = function (t, e) {
            return this._callExtensionMethod("startTransaction", t, e);
          }),
          (t.prototype.traceHeaders = function () {
            return this._callExtensionMethod("traceHeaders");
          }),
          (t.prototype.captureSession = function (t) {
            if ((void 0 === t && (t = !1), t)) return this.endSession();
            this._sendSessionUpdate();
          }),
          (t.prototype.endSession = function () {
            var t = this.getStackTop(),
              e = t && t.scope,
              n = e && e.getSession();
            n && n.close(), this._sendSessionUpdate(), e && e.setSession();
          }),
          (t.prototype.startSession = function (t) {
            var e = this.getStackTop(),
              n = e.scope,
              i = e.client,
              o = (i && i.getOptions()) || {},
              a = o.release,
              c = o.environment,
              u = (Object(s.a)().navigator || {}).userAgent,
              l = new f.a(
                Object(r.a)(
                  Object(r.a)(
                    Object(r.a)(
                      { release: a, environment: c },
                      n && { user: n.getUser() }
                    ),
                    u && { userAgent: u }
                  ),
                  t
                )
              );
            if (n) {
              var p = n.getSession && n.getSession();
              p && "ok" === p.status && p.update({ status: "exited" }),
                this.endSession(),
                n.setSession(l);
            }
            return l;
          }),
          (t.prototype._sendSessionUpdate = function () {
            var t = this.getStackTop(),
              e = t.scope,
              n = t.client;
            if (e) {
              var r = e.getSession && e.getSession();
              r && n && n.captureSession && n.captureSession(r);
            }
          }),
          (t.prototype._invokeClient = function (t) {
            for (var e, n = [], i = 1; i < arguments.length; i++)
              n[i - 1] = arguments[i];
            var o = this.getStackTop(),
              a = o.scope,
              s = o.client;
            s && s[t] && (e = s)[t].apply(e, Object(r.e)(n, [a]));
          }),
          (t.prototype._callExtensionMethod = function (t) {
            for (var e = [], n = 1; n < arguments.length; n++)
              e[n - 1] = arguments[n];
            var r = d(),
              i = r.__SENTRY__;
            if (i && i.extensions && "function" == typeof i.extensions[t])
              return i.extensions[t].apply(this, e);
            u &&
              a.c.warn(
                "Extension method " + t + " couldn't be found, doing nothing."
              );
          }),
          t
        );
      })();
    function d() {
      var t = Object(s.a)();
      return (
        (t.__SENTRY__ = t.__SENTRY__ || { extensions: {}, hub: void 0 }), t
      );
    }
    function h(t) {
      var e = d(),
        n = m(e);
      return y(e, t), n;
    }
    function v() {
      var t = d();
      return (
        (g(t) && !m(t).isOlderThan(4)) || y(t, new p()),
        Object(c.b)()
          ? (function (t) {
              try {
                var e = d().__SENTRY__,
                  n =
                    e &&
                    e.extensions &&
                    e.extensions.domain &&
                    e.extensions.domain.active;
                if (!n) return m(t);
                if (!g(n) || m(n).isOlderThan(4)) {
                  var r = m(t).getStackTop();
                  y(n, new p(r.client, l.a.clone(r.scope)));
                }
                return m(n);
              } catch (e) {
                return m(t);
              }
            })(t)
          : m(t)
      );
    }
    function g(t) {
      return !!(t && t.__SENTRY__ && t.__SENTRY__.hub);
    }
    function m(t) {
      return Object(s.b)(
        "hub",
        function () {
          return new p();
        },
        t
      );
    }
    function y(t, e) {
      return !!t && (((t.__SENTRY__ = t.__SENTRY__ || {}).hub = e), !0);
    }
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "f", function () {
      return a;
    }),
      n.d(e, "e", function () {
        return s;
      }),
      n.d(e, "d", function () {
        return u;
      }),
      n.d(e, "b", function () {
        return l;
      }),
      n.d(e, "a", function () {
        return f;
      }),
      n.d(e, "c", function () {
        return p;
      });
    var r = n(0),
      i = n(6),
      o = n(7);
    n(16);
    function a() {
      var t = Object(i.a)(),
        e = t.crypto || t.msCrypto;
      if (void 0 !== e && e.getRandomValues) {
        var n = new Uint16Array(8);
        e.getRandomValues(n),
          (n[3] = (4095 & n[3]) | 16384),
          (n[4] = (16383 & n[4]) | 32768);
        var r = function (t) {
          for (var e = t.toString(16); e.length < 4; ) e = "0" + e;
          return e;
        };
        return (
          r(n[0]) +
          r(n[1]) +
          r(n[2]) +
          r(n[3]) +
          r(n[4]) +
          r(n[5]) +
          r(n[6]) +
          r(n[7])
        );
      }
      return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var e = (16 * Math.random()) | 0;
        return ("x" === t ? e : (3 & e) | 8).toString(16);
      });
    }
    function s(t) {
      if (!t) return {};
      var e = t.match(
        /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
      );
      if (!e) return {};
      var n = e[6] || "",
        r = e[8] || "";
      return { host: e[4], path: e[5], protocol: e[2], relative: e[5] + n + r };
    }
    function c(t) {
      return t.exception && t.exception.values ? t.exception.values[0] : void 0;
    }
    function u(t) {
      var e = t.message,
        n = t.event_id;
      if (e) return e;
      var r = c(t);
      return r
        ? r.type && r.value
          ? r.type + ": " + r.value
          : r.type || r.value || n || "<unknown>"
        : n || "<unknown>";
    }
    function l(t, e, n) {
      var r = (t.exception = t.exception || {}),
        i = (r.values = r.values || []),
        o = (i[0] = i[0] || {});
      o.value || (o.value = e || ""), o.type || (o.type = n || "Error");
    }
    function f(t, e) {
      var n = c(t);
      if (n) {
        var i = n.mechanism;
        if (
          ((n.mechanism = Object(r.a)(
            Object(r.a)(Object(r.a)({}, { type: "generic", handled: !0 }), i),
            e
          )),
          e && "data" in e)
        ) {
          var o = Object(r.a)(Object(r.a)({}, i && i.data), e.data);
          n.mechanism.data = o;
        }
      }
    }
    function p(t) {
      if (t && t.__sentry_captured__) return !0;
      try {
        Object(o.a)(t, "__sentry_captured__", !0);
      } catch (t) {}
      return !1;
    }
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "c", function () {
      return i;
    }),
      n.d(e, "b", function () {
        return o;
      }),
      n.d(e, "a", function () {
        return a;
      });
    var r = n(4);
    function i(t) {
      return new a(function (e) {
        e(t);
      });
    }
    function o(t) {
      return new a(function (e, n) {
        n(t);
      });
    }
    var a = (function () {
      function t(t) {
        var e = this;
        (this._state = 0),
          (this._handlers = []),
          (this._resolve = function (t) {
            e._setResult(1, t);
          }),
          (this._reject = function (t) {
            e._setResult(2, t);
          }),
          (this._setResult = function (t, n) {
            0 === e._state &&
              (Object(r.n)(n)
                ? n.then(e._resolve, e._reject)
                : ((e._state = t), (e._value = n), e._executeHandlers()));
          }),
          (this._executeHandlers = function () {
            if (0 !== e._state) {
              var t = e._handlers.slice();
              (e._handlers = []),
                t.forEach(function (t) {
                  t[0] ||
                    (1 === e._state && t[1](e._value),
                    2 === e._state && t[2](e._value),
                    (t[0] = !0));
                });
            }
          });
        try {
          t(this._resolve, this._reject);
        } catch (t) {
          this._reject(t);
        }
      }
      return (
        (t.prototype.then = function (e, n) {
          var r = this;
          return new t(function (t, i) {
            r._handlers.push([
              !1,
              function (n) {
                if (e)
                  try {
                    t(e(n));
                  } catch (t) {
                    i(t);
                  }
                else t(n);
              },
              function (e) {
                if (n)
                  try {
                    t(n(e));
                  } catch (t) {
                    i(t);
                  }
                else i(e);
              },
            ]),
              r._executeHandlers();
          });
        }),
        (t.prototype.catch = function (t) {
          return this.then(function (t) {
            return t;
          }, t);
        }),
        (t.prototype.finally = function (e) {
          var n = this;
          return new t(function (t, r) {
            var i, o;
            return n
              .then(
                function (t) {
                  (o = !1), (i = t), e && e();
                },
                function (t) {
                  (o = !0), (i = t), e && e();
                }
              )
              .then(function () {
                o ? r(i) : t(i);
              });
          });
        }),
        t
      );
    })();
  },
  ,
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return i;
    }),
      n.d(e, "b", function () {
        return a;
      });
    var r = n(0);
    function i() {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      var n = t
        .sort(function (t, e) {
          return t[0] - e[0];
        })
        .map(function (t) {
          return t[1];
        });
      return function (t, e) {
        var i, a, s, c;
        void 0 === e && (e = 0);
        var u = [];
        try {
          for (
            var l = Object(r.f)(t.split("\n").slice(e)), f = l.next();
            !f.done;
            f = l.next()
          ) {
            var p = f.value;
            try {
              for (
                var d = ((s = void 0), Object(r.f)(n)), h = d.next();
                !h.done;
                h = d.next()
              ) {
                var v = (0, h.value)(p);
                if (v) {
                  u.push(v);
                  break;
                }
              }
            } catch (t) {
              s = { error: t };
            } finally {
              try {
                h && !h.done && (c = d.return) && c.call(d);
              } finally {
                if (s) throw s.error;
              }
            }
          }
        } catch (t) {
          i = { error: t };
        } finally {
          try {
            f && !f.done && (a = l.return) && a.call(l);
          } finally {
            if (i) throw i.error;
          }
        }
        return o(u);
      };
    }
    function o(t) {
      if (!t.length) return [];
      var e = t,
        n = e[0].function || "",
        i = e[e.length - 1].function || "";
      return (
        (-1 === n.indexOf("captureMessage") &&
          -1 === n.indexOf("captureException")) ||
          (e = e.slice(1)),
        -1 !== i.indexOf("sentryWrapped") && (e = e.slice(0, -1)),
        e
          .slice(0, 50)
          .map(function (t) {
            return Object(r.a)(Object(r.a)({}, t), {
              filename: t.filename || e[0].filename,
              function: t.function || "?",
            });
          })
          .reverse()
      );
    }
    function a(t) {
      try {
        return (t && "function" == typeof t && t.name) || "<anonymous>";
      } catch (t) {
        return "<anonymous>";
      }
    }
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return c;
    }),
      n.d(e, "b", function () {
        return l;
      });
    var r = n(0),
      i = n(4),
      o = n(11),
      a = n(22),
      s = n(6),
      c = (function () {
        function t() {
          (this._notifyingListeners = !1),
            (this._scopeListeners = []),
            (this._eventProcessors = []),
            (this._breadcrumbs = []),
            (this._user = {}),
            (this._tags = {}),
            (this._extra = {}),
            (this._contexts = {}),
            (this._sdkProcessingMetadata = {});
        }
        return (
          (t.clone = function (e) {
            var n = new t();
            return (
              e &&
                ((n._breadcrumbs = Object(r.e)(e._breadcrumbs)),
                (n._tags = Object(r.a)({}, e._tags)),
                (n._extra = Object(r.a)({}, e._extra)),
                (n._contexts = Object(r.a)({}, e._contexts)),
                (n._user = e._user),
                (n._level = e._level),
                (n._span = e._span),
                (n._session = e._session),
                (n._transactionName = e._transactionName),
                (n._fingerprint = e._fingerprint),
                (n._eventProcessors = Object(r.e)(e._eventProcessors)),
                (n._requestSession = e._requestSession)),
              n
            );
          }),
          (t.prototype.addScopeListener = function (t) {
            this._scopeListeners.push(t);
          }),
          (t.prototype.addEventProcessor = function (t) {
            return this._eventProcessors.push(t), this;
          }),
          (t.prototype.setUser = function (t) {
            return (
              (this._user = t || {}),
              this._session && this._session.update({ user: t }),
              this._notifyScopeListeners(),
              this
            );
          }),
          (t.prototype.getUser = function () {
            return this._user;
          }),
          (t.prototype.getRequestSession = function () {
            return this._requestSession;
          }),
          (t.prototype.setRequestSession = function (t) {
            return (this._requestSession = t), this;
          }),
          (t.prototype.setTags = function (t) {
            return (
              (this._tags = Object(r.a)(Object(r.a)({}, this._tags), t)),
              this._notifyScopeListeners(),
              this
            );
          }),
          (t.prototype.setTag = function (t, e) {
            var n;
            return (
              (this._tags = Object(r.a)(
                Object(r.a)({}, this._tags),
                (((n = {})[t] = e), n)
              )),
              this._notifyScopeListeners(),
              this
            );
          }),
          (t.prototype.setExtras = function (t) {
            return (
              (this._extra = Object(r.a)(Object(r.a)({}, this._extra), t)),
              this._notifyScopeListeners(),
              this
            );
          }),
          (t.prototype.setExtra = function (t, e) {
            var n;
            return (
              (this._extra = Object(r.a)(
                Object(r.a)({}, this._extra),
                (((n = {})[t] = e), n)
              )),
              this._notifyScopeListeners(),
              this
            );
          }),
          (t.prototype.setFingerprint = function (t) {
            return (this._fingerprint = t), this._notifyScopeListeners(), this;
          }),
          (t.prototype.setLevel = function (t) {
            return (this._level = t), this._notifyScopeListeners(), this;
          }),
          (t.prototype.setTransactionName = function (t) {
            return (
              (this._transactionName = t), this._notifyScopeListeners(), this
            );
          }),
          (t.prototype.setTransaction = function (t) {
            return this.setTransactionName(t);
          }),
          (t.prototype.setContext = function (t, e) {
            var n;
            return (
              null === e
                ? delete this._contexts[t]
                : (this._contexts = Object(r.a)(
                    Object(r.a)({}, this._contexts),
                    (((n = {})[t] = e), n)
                  )),
              this._notifyScopeListeners(),
              this
            );
          }),
          (t.prototype.setSpan = function (t) {
            return (this._span = t), this._notifyScopeListeners(), this;
          }),
          (t.prototype.getSpan = function () {
            return this._span;
          }),
          (t.prototype.getTransaction = function () {
            var t = this.getSpan();
            return t && t.transaction;
          }),
          (t.prototype.setSession = function (t) {
            return (
              t ? (this._session = t) : delete this._session,
              this._notifyScopeListeners(),
              this
            );
          }),
          (t.prototype.getSession = function () {
            return this._session;
          }),
          (t.prototype.update = function (e) {
            if (!e) return this;
            if ("function" == typeof e) {
              var n = e(this);
              return n instanceof t ? n : this;
            }
            return (
              e instanceof t
                ? ((this._tags = Object(r.a)(
                    Object(r.a)({}, this._tags),
                    e._tags
                  )),
                  (this._extra = Object(r.a)(
                    Object(r.a)({}, this._extra),
                    e._extra
                  )),
                  (this._contexts = Object(r.a)(
                    Object(r.a)({}, this._contexts),
                    e._contexts
                  )),
                  e._user &&
                    Object.keys(e._user).length &&
                    (this._user = e._user),
                  e._level && (this._level = e._level),
                  e._fingerprint && (this._fingerprint = e._fingerprint),
                  e._requestSession &&
                    (this._requestSession = e._requestSession))
                : Object(i.i)(e) &&
                  ((e = e),
                  (this._tags = Object(r.a)(
                    Object(r.a)({}, this._tags),
                    e.tags
                  )),
                  (this._extra = Object(r.a)(
                    Object(r.a)({}, this._extra),
                    e.extra
                  )),
                  (this._contexts = Object(r.a)(
                    Object(r.a)({}, this._contexts),
                    e.contexts
                  )),
                  e.user && (this._user = e.user),
                  e.level && (this._level = e.level),
                  e.fingerprint && (this._fingerprint = e.fingerprint),
                  e.requestSession &&
                    (this._requestSession = e.requestSession)),
              this
            );
          }),
          (t.prototype.clear = function () {
            return (
              (this._breadcrumbs = []),
              (this._tags = {}),
              (this._extra = {}),
              (this._user = {}),
              (this._contexts = {}),
              (this._level = void 0),
              (this._transactionName = void 0),
              (this._fingerprint = void 0),
              (this._requestSession = void 0),
              (this._span = void 0),
              (this._session = void 0),
              this._notifyScopeListeners(),
              this
            );
          }),
          (t.prototype.addBreadcrumb = function (t, e) {
            var n = "number" == typeof e ? Math.min(e, 100) : 100;
            if (n <= 0) return this;
            var i = Object(r.a)({ timestamp: Object(o.b)() }, t);
            return (
              (this._breadcrumbs = Object(r.e)(this._breadcrumbs, [i]).slice(
                -n
              )),
              this._notifyScopeListeners(),
              this
            );
          }),
          (t.prototype.clearBreadcrumbs = function () {
            return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
          }),
          (t.prototype.applyToEvent = function (t, e) {
            if (
              (this._extra &&
                Object.keys(this._extra).length &&
                (t.extra = Object(r.a)(Object(r.a)({}, this._extra), t.extra)),
              this._tags &&
                Object.keys(this._tags).length &&
                (t.tags = Object(r.a)(Object(r.a)({}, this._tags), t.tags)),
              this._user &&
                Object.keys(this._user).length &&
                (t.user = Object(r.a)(Object(r.a)({}, this._user), t.user)),
              this._contexts &&
                Object.keys(this._contexts).length &&
                (t.contexts = Object(r.a)(
                  Object(r.a)({}, this._contexts),
                  t.contexts
                )),
              this._level && (t.level = this._level),
              this._transactionName && (t.transaction = this._transactionName),
              this._span)
            ) {
              t.contexts = Object(r.a)(
                { trace: this._span.getTraceContext() },
                t.contexts
              );
              var n = this._span.transaction && this._span.transaction.name;
              n && (t.tags = Object(r.a)({ transaction: n }, t.tags));
            }
            return (
              this._applyFingerprint(t),
              (t.breadcrumbs = Object(r.e)(
                t.breadcrumbs || [],
                this._breadcrumbs
              )),
              (t.breadcrumbs =
                t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0),
              (t.sdkProcessingMetadata = this._sdkProcessingMetadata),
              this._notifyEventProcessors(
                Object(r.e)(u(), this._eventProcessors),
                t,
                e
              )
            );
          }),
          (t.prototype.setSDKProcessingMetadata = function (t) {
            return (
              (this._sdkProcessingMetadata = Object(r.a)(
                Object(r.a)({}, this._sdkProcessingMetadata),
                t
              )),
              this
            );
          }),
          (t.prototype._notifyEventProcessors = function (t, e, n, o) {
            var s = this;
            return (
              void 0 === o && (o = 0),
              new a.a(function (a, c) {
                var u = t[o];
                if (null === e || "function" != typeof u) a(e);
                else {
                  var l = u(Object(r.a)({}, e), n);
                  Object(i.n)(l)
                    ? l
                        .then(function (e) {
                          return s
                            ._notifyEventProcessors(t, e, n, o + 1)
                            .then(a);
                        })
                        .then(null, c)
                    : s
                        ._notifyEventProcessors(t, l, n, o + 1)
                        .then(a)
                        .then(null, c);
                }
              })
            );
          }),
          (t.prototype._notifyScopeListeners = function () {
            var t = this;
            this._notifyingListeners ||
              ((this._notifyingListeners = !0),
              this._scopeListeners.forEach(function (e) {
                e(t);
              }),
              (this._notifyingListeners = !1));
          }),
          (t.prototype._applyFingerprint = function (t) {
            (t.fingerprint = t.fingerprint
              ? Array.isArray(t.fingerprint)
                ? t.fingerprint
                : [t.fingerprint]
              : []),
              this._fingerprint &&
                (t.fingerprint = t.fingerprint.concat(this._fingerprint)),
              t.fingerprint && !t.fingerprint.length && delete t.fingerprint;
          }),
          t
        );
      })();
    function u() {
      return Object(s.b)("globalEventProcessors", function () {
        return [];
      });
    }
    function l(t) {
      u().push(t);
    }
  },
  function (t, e) {
    t.exports = function (t) {
      if (!t.webpackPolyfill) {
        var e = Object.create(t);
        e.children || (e.children = []),
          Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function () {
              return e.l;
            },
          }),
          Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function () {
              return e.i;
            },
          }),
          Object.defineProperty(e, "exports", { enumerable: !0 }),
          (e.webpackPolyfill = 1);
      }
      return e;
    };
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "b", function () {
      return a;
    }),
      n.d(e, "a", function () {
        return s;
      }),
      n.d(e, "d", function () {
        return c;
      }),
      n.d(e, "e", function () {
        return u;
      }),
      n.d(e, "c", function () {
        return l;
      });
    var r = n(9),
      i = n(6),
      o = n(5);
    function a() {
      if (!("fetch" in Object(i.a)())) return !1;
      try {
        return new Headers(), new Request(""), new Response(), !0;
      } catch (t) {
        return !1;
      }
    }
    function s(t) {
      return (
        t &&
        /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
      );
    }
    function c() {
      if (!a()) return !1;
      var t = Object(i.a)();
      if (s(t.fetch)) return !0;
      var e = !1,
        n = t.document;
      if (n && "function" == typeof n.createElement)
        try {
          var c = n.createElement("iframe");
          (c.hidden = !0),
            n.head.appendChild(c),
            c.contentWindow &&
              c.contentWindow.fetch &&
              (e = s(c.contentWindow.fetch)),
            n.head.removeChild(c);
        } catch (t) {
          r.a &&
            o.c.warn(
              "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
              t
            );
        }
      return e;
    }
    function u() {
      if (!a()) return !1;
      try {
        return new Request("_", { referrerPolicy: "origin" }), !0;
      } catch (t) {
        return !1;
      }
    }
    function l() {
      var t = Object(i.a)(),
        e = t.chrome,
        n = e && e.app && e.app.runtime,
        r = "history" in t && !!t.history.pushState && !!t.history.replaceState;
      return !n && r;
    }
  },
  ,
  function (t, e) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (n = window);
    }
    t.exports = n;
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return i;
    });
    var r = new RegExp(
      "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$"
    );
    function i(t) {
      var e = t.match(r);
      if (e) {
        var n = void 0;
        return (
          "1" === e[3] ? (n = !0) : "0" === e[3] && (n = !1),
          { traceId: e[1], parentSampled: n, parentSpanId: e[2] }
        );
      }
    }
  },
  function (t, e, n) {
    "use strict";
    function r() {
      return (
        "undefined" != typeof __SENTRY_BROWSER_BUNDLE__ &&
        !!__SENTRY_BROWSER_BUNDLE__
      );
    }
    n.d(e, "a", function () {
      return r;
    });
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "b", function () {
      return o;
    }),
      n.d(e, "a", function () {
        return s;
      });
    var r = n(6),
      i = n(4);
    function o(t, e) {
      try {
        for (
          var n = t, r = [], i = 0, o = 0, s = " > ".length, c = void 0;
          n &&
          i++ < 5 &&
          !(
            "html" === (c = a(n, e)) ||
            (i > 1 && o + r.length * s + c.length >= 80)
          );

        )
          r.push(c), (o += c.length), (n = n.parentNode);
        return r.reverse().join(" > ");
      } catch (t) {
        return "<unknown>";
      }
    }
    function a(t, e) {
      var n,
        r,
        o,
        a,
        s,
        c = t,
        u = [];
      if (!c || !c.tagName) return "";
      u.push(c.tagName.toLowerCase());
      var l =
        e && e.length
          ? e
              .filter(function (t) {
                return c.getAttribute(t);
              })
              .map(function (t) {
                return [t, c.getAttribute(t)];
              })
          : null;
      if (l && l.length)
        l.forEach(function (t) {
          u.push("[" + t[0] + '="' + t[1] + '"]');
        });
      else if (
        (c.id && u.push("#" + c.id), (n = c.className) && Object(i.l)(n))
      )
        for (r = n.split(/\s+/), s = 0; s < r.length; s++) u.push("." + r[s]);
      var f = ["type", "name", "title", "alt"];
      for (s = 0; s < f.length; s++)
        (o = f[s]),
          (a = c.getAttribute(o)) && u.push("[" + o + '="' + a + '"]');
      return u.join("");
    }
    function s() {
      var t = Object(r.a)();
      try {
        return t.document.location.href;
      } catch (t) {
        return "";
      }
    }
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return a;
    });
    var r = n(21),
      i = n(11),
      o = n(7),
      a = (function () {
        function t(t) {
          (this.errors = 0),
            (this.sid = Object(r.f)()),
            (this.duration = 0),
            (this.status = "ok"),
            (this.init = !0),
            (this.ignoreDuration = !1);
          var e = Object(i.c)();
          (this.timestamp = e), (this.started = e), t && this.update(t);
        }
        return (
          (t.prototype.update = function (t) {
            if (
              (void 0 === t && (t = {}),
              t.user &&
                (!this.ipAddress &&
                  t.user.ip_address &&
                  (this.ipAddress = t.user.ip_address),
                this.did ||
                  t.did ||
                  (this.did = t.user.id || t.user.email || t.user.username)),
              (this.timestamp = t.timestamp || Object(i.c)()),
              t.ignoreDuration && (this.ignoreDuration = t.ignoreDuration),
              t.sid && (this.sid = 32 === t.sid.length ? t.sid : Object(r.f)()),
              void 0 !== t.init && (this.init = t.init),
              !this.did && t.did && (this.did = "" + t.did),
              "number" == typeof t.started && (this.started = t.started),
              this.ignoreDuration)
            )
              this.duration = void 0;
            else if ("number" == typeof t.duration) this.duration = t.duration;
            else {
              var e = this.timestamp - this.started;
              this.duration = e >= 0 ? e : 0;
            }
            t.release && (this.release = t.release),
              t.environment && (this.environment = t.environment),
              !this.ipAddress && t.ipAddress && (this.ipAddress = t.ipAddress),
              !this.userAgent && t.userAgent && (this.userAgent = t.userAgent),
              "number" == typeof t.errors && (this.errors = t.errors),
              t.status && (this.status = t.status);
          }),
          (t.prototype.close = function (t) {
            t
              ? this.update({ status: t })
              : "ok" === this.status
              ? this.update({ status: "exited" })
              : this.update();
          }),
          (t.prototype.toJSON = function () {
            return Object(o.c)({
              sid: "" + this.sid,
              init: this.init,
              started: new Date(1e3 * this.started).toISOString(),
              timestamp: new Date(1e3 * this.timestamp).toISOString(),
              status: this.status,
              errors: this.errors,
              did:
                "number" == typeof this.did || "string" == typeof this.did
                  ? "" + this.did
                  : void 0,
              duration: this.duration,
              attrs: {
                release: this.release,
                environment: this.environment,
                ip_address: this.ipAddress,
                user_agent: this.userAgent,
              },
            });
          }),
          t
        );
      })();
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return s;
    });
    var r = n(36),
      i = n(5),
      o = n(1),
      a = n(3);
    function s() {
      Object(r.a)("error", c), Object(r.a)("unhandledrejection", c);
    }
    function c() {
      var t = Object(a.a)();
      if (t) {
        o.a &&
          i.c.log(
            "[Tracing] Transaction: internal_error -> Global error occured"
          ),
          t.setStatus("internal_error");
      }
    }
  },
  function (t, e, n) {
    "use strict";
    function r() {
      var t = "function" == typeof WeakSet,
        e = t ? new WeakSet() : [];
      return [
        function (n) {
          if (t) return !!e.has(n) || (e.add(n), !1);
          for (var r = 0; r < e.length; r++) {
            if (e[r] === n) return !0;
          }
          return e.push(n), !1;
        },
        function (n) {
          if (t) e.delete(n);
          else
            for (var r = 0; r < e.length; r++)
              if (e[r] === n) {
                e.splice(r, 1);
                break;
              }
        },
      ];
    }
    n.d(e, "a", function () {
      return r;
    });
  },
  function (t, e, n) {
    "use strict";
    n.d(e, "a", function () {
      return g;
    });
    var r,
      i = n(0),
      o = n(9),
      a = n(6),
      s = n(4),
      c = n(5),
      u = n(7),
      l = n(24),
      f = n(27),
      p = Object(a.a)(),
      d = {},
      h = {};
    function v(t) {
      if (!h[t])
        switch (((h[t] = !0), t)) {
          case "console":
            !(function () {
              if (!("console" in p)) return;
              c.a.forEach(function (t) {
                t in p.console &&
                  Object(u.e)(p.console, t, function (e) {
                    return function () {
                      for (var n = [], r = 0; r < arguments.length; r++)
                        n[r] = arguments[r];
                      m("console", { args: n, level: t }),
                        e && e.apply(p.console, n);
                    };
                  });
              });
            })();
            break;
          case "dom":
            !(function () {
              if (!("document" in p)) return;
              var t = m.bind(null, "dom"),
                e = O(t, !0);
              p.document.addEventListener("click", e, !1),
                p.document.addEventListener("keypress", e, !1),
                ["EventTarget", "Node"].forEach(function (e) {
                  var n = p[e] && p[e].prototype;
                  n &&
                    n.hasOwnProperty &&
                    n.hasOwnProperty("addEventListener") &&
                    (Object(u.e)(n, "addEventListener", function (e) {
                      return function (n, r, i) {
                        if ("click" === n || "keypress" == n)
                          try {
                            var o = (this.__sentry_instrumentation_handlers__ =
                                this.__sentry_instrumentation_handlers__ || {}),
                              a = (o[n] = o[n] || { refCount: 0 });
                            if (!a.handler) {
                              var s = O(t);
                              (a.handler = s), e.call(this, n, s, i);
                            }
                            a.refCount += 1;
                          } catch (t) {}
                        return e.call(this, n, r, i);
                      };
                    }),
                    Object(u.e)(n, "removeEventListener", function (t) {
                      return function (e, n, r) {
                        if ("click" === e || "keypress" == e)
                          try {
                            var i =
                                this.__sentry_instrumentation_handlers__ || {},
                              o = i[e];
                            o &&
                              ((o.refCount -= 1),
                              o.refCount <= 0 &&
                                (t.call(this, e, o.handler, r),
                                (o.handler = void 0),
                                delete i[e]),
                              0 === Object.keys(i).length &&
                                delete this
                                  .__sentry_instrumentation_handlers__);
                          } catch (t) {}
                        return t.call(this, e, n, r);
                      };
                    }));
                });
            })();
            break;
          case "xhr":
            !(function () {
              if (!("XMLHttpRequest" in p)) return;
              var t = XMLHttpRequest.prototype;
              Object(u.e)(t, "open", function (t) {
                return function () {
                  for (var e = [], n = 0; n < arguments.length; n++)
                    e[n] = arguments[n];
                  var r = this,
                    i = e[1],
                    o = (r.__sentry_xhr__ = {
                      method: Object(s.l)(e[0]) ? e[0].toUpperCase() : e[0],
                      url: e[1],
                    });
                  Object(s.l)(i) &&
                    "POST" === o.method &&
                    i.match(/sentry_key/) &&
                    (r.__sentry_own_request__ = !0);
                  var a = function () {
                    if (4 === r.readyState) {
                      try {
                        o.status_code = r.status;
                      } catch (t) {}
                      m("xhr", {
                        args: e,
                        endTimestamp: Date.now(),
                        startTimestamp: Date.now(),
                        xhr: r,
                      });
                    }
                  };
                  return (
                    "onreadystatechange" in r &&
                    "function" == typeof r.onreadystatechange
                      ? Object(u.e)(r, "onreadystatechange", function (t) {
                          return function () {
                            for (var e = [], n = 0; n < arguments.length; n++)
                              e[n] = arguments[n];
                            return a(), t.apply(r, e);
                          };
                        })
                      : r.addEventListener("readystatechange", a),
                    t.apply(r, e)
                  );
                };
              }),
                Object(u.e)(t, "send", function (t) {
                  return function () {
                    for (var e = [], n = 0; n < arguments.length; n++)
                      e[n] = arguments[n];
                    return (
                      this.__sentry_xhr__ &&
                        void 0 !== e[0] &&
                        (this.__sentry_xhr__.body = e[0]),
                      m("xhr", {
                        args: e,
                        startTimestamp: Date.now(),
                        xhr: this,
                      }),
                      t.apply(this, e)
                    );
                  };
                });
            })();
            break;
          case "fetch":
            !(function () {
              if (!Object(f.d)()) return;
              Object(u.e)(p, "fetch", function (t) {
                return function () {
                  for (var e = [], n = 0; n < arguments.length; n++)
                    e[n] = arguments[n];
                  var r = {
                    args: e,
                    fetchData: { method: y(e), url: b(e) },
                    startTimestamp: Date.now(),
                  };
                  return (
                    m("fetch", Object(i.a)({}, r)),
                    t.apply(p, e).then(
                      function (t) {
                        return (
                          m(
                            "fetch",
                            Object(i.a)(Object(i.a)({}, r), {
                              endTimestamp: Date.now(),
                              response: t,
                            })
                          ),
                          t
                        );
                      },
                      function (t) {
                        throw (
                          (m(
                            "fetch",
                            Object(i.a)(Object(i.a)({}, r), {
                              endTimestamp: Date.now(),
                              error: t,
                            })
                          ),
                          t)
                        );
                      }
                    )
                  );
                };
              });
            })();
            break;
          case "history":
            !(function () {
              if (!Object(f.c)()) return;
              var t = p.onpopstate;
              function e(t) {
                return function () {
                  for (var e = [], n = 0; n < arguments.length; n++)
                    e[n] = arguments[n];
                  var i = e.length > 2 ? e[2] : void 0;
                  if (i) {
                    var o = r,
                      a = String(i);
                    (r = a), m("history", { from: o, to: a });
                  }
                  return t.apply(this, e);
                };
              }
              (p.onpopstate = function () {
                for (var e = [], n = 0; n < arguments.length; n++)
                  e[n] = arguments[n];
                var i = p.location.href,
                  o = r;
                if (((r = i), m("history", { from: o, to: i }), t))
                  try {
                    return t.apply(this, e);
                  } catch (t) {}
              }),
                Object(u.e)(p.history, "pushState", e),
                Object(u.e)(p.history, "replaceState", e);
            })();
            break;
          case "error":
            (j = p.onerror),
              (p.onerror = function (t, e, n, r, i) {
                return (
                  m("error", { column: r, error: i, line: n, msg: t, url: e }),
                  !!j && j.apply(this, arguments)
                );
              });
            break;
          case "unhandledrejection":
            (w = p.onunhandledrejection),
              (p.onunhandledrejection = function (t) {
                return (
                  m("unhandledrejection", t), !w || w.apply(this, arguments)
                );
              });
            break;
          default:
            return void (o.a && c.c.warn("unknown instrumentation type:", t));
        }
    }
    function g(t, e) {
      (d[t] = d[t] || []), d[t].push(e), v(t);
    }
    function m(t, e) {
      var n, r;
      if (t && d[t])
        try {
          for (
            var a = Object(i.f)(d[t] || []), s = a.next();
            !s.done;
            s = a.next()
          ) {
            var u = s.value;
            try {
              u(e);
            } catch (e) {
              o.a &&
                c.c.error(
                  "Error while triggering instrumentation handler.\nType: " +
                    t +
                    "\nName: " +
                    Object(l.b)(u) +
                    "\nError:",
                  e
                );
            }
          }
        } catch (t) {
          n = { error: t };
        } finally {
          try {
            s && !s.done && (r = a.return) && r.call(a);
          } finally {
            if (n) throw n.error;
          }
        }
    }
    function y(t) {
      return (
        void 0 === t && (t = []),
        "Request" in p && Object(s.g)(t[0], Request) && t[0].method
          ? String(t[0].method).toUpperCase()
          : t[1] && t[1].method
          ? String(t[1].method).toUpperCase()
          : "GET"
      );
    }
    function b(t) {
      return (
        void 0 === t && (t = []),
        "string" == typeof t[0]
          ? t[0]
          : "Request" in p && Object(s.g)(t[0], Request)
          ? t[0].url
          : String(t[0])
      );
    }
    var _, x;
    function O(t, e) {
      return (
        void 0 === e && (e = !1),
        function (n) {
          if (
            n &&
            x !== n &&
            !(function (t) {
              if ("keypress" !== t.type) return !1;
              try {
                var e = t.target;
                if (!e || !e.tagName) return !0;
                if (
                  "INPUT" === e.tagName ||
                  "TEXTAREA" === e.tagName ||
                  e.isContentEditable
                )
                  return !1;
              } catch (t) {}
              return !0;
            })(n)
          ) {
            var r = "keypress" === n.type ? "input" : n.type;
            (void 0 === _ ||
              (function (t, e) {
                if (!t) return !0;
                if (t.type !== e.type) return !0;
                try {
                  if (t.target !== e.target) return !0;
                } catch (t) {}
                return !1;
              })(x, n)) &&
              (t({ event: n, name: r, global: e }), (x = n)),
              clearTimeout(_),
              (_ = p.setTimeout(function () {
                _ = void 0;
              }, 1e3));
          }
        }
      );
    }
    var j = null;
    var w = null;
  },
  ,
  ,
  function (t, e, n) {
    var r = (function (t) {
      "use strict";
      var e = Object.prototype,
        n = e.hasOwnProperty,
        r =
          Object.defineProperty ||
          function (t, e, n) {
            t[e] = n.value;
          },
        i = "function" == typeof Symbol ? Symbol : {},
        o = i.iterator || "@@iterator",
        a = i.asyncIterator || "@@asyncIterator",
        s = i.toStringTag || "@@toStringTag";
      function c(t, e, n) {
        return (
          Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        c({}, "");
      } catch (t) {
        c = function (t, e, n) {
          return (t[e] = n);
        };
      }
      function u(t, e, n, i) {
        var o = e && e.prototype instanceof p ? e : p,
          a = Object.create(o.prototype),
          s = new S(i || []);
        return r(a, "_invoke", { value: x(t, n, s) }), a;
      }
      function l(t, e, n) {
        try {
          return { type: "normal", arg: t.call(e, n) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      t.wrap = u;
      var f = {};
      function p() {}
      function d() {}
      function h() {}
      var v = {};
      c(v, o, function () {
        return this;
      });
      var g = Object.getPrototypeOf,
        m = g && g(g(T([])));
      m && m !== e && n.call(m, o) && (v = m);
      var y = (h.prototype = p.prototype = Object.create(v));
      function b(t) {
        ["next", "throw", "return"].forEach(function (e) {
          c(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function _(t, e) {
        var i;
        r(this, "_invoke", {
          value: function (r, o) {
            function a() {
              return new e(function (i, a) {
                !(function r(i, o, a, s) {
                  var c = l(t[i], t, o);
                  if ("throw" !== c.type) {
                    var u = c.arg,
                      f = u.value;
                    return f && "object" == typeof f && n.call(f, "__await")
                      ? e.resolve(f.__await).then(
                          function (t) {
                            r("next", t, a, s);
                          },
                          function (t) {
                            r("throw", t, a, s);
                          }
                        )
                      : e.resolve(f).then(
                          function (t) {
                            (u.value = t), a(u);
                          },
                          function (t) {
                            return r("throw", t, a, s);
                          }
                        );
                  }
                  s(c.arg);
                })(r, o, i, a);
              });
            }
            return (i = i ? i.then(a, a) : a());
          },
        });
      }
      function x(t, e, n) {
        var r = "suspendedStart";
        return function (i, o) {
          if ("executing" === r)
            throw new Error("Generator is already running");
          if ("completed" === r) {
            if ("throw" === i) throw o;
            return { value: void 0, done: !0 };
          }
          for (n.method = i, n.arg = o; ; ) {
            var a = n.delegate;
            if (a) {
              var s = O(a, n);
              if (s) {
                if (s === f) continue;
                return s;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;
            else if ("throw" === n.method) {
              if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            r = "executing";
            var c = l(t, e, n);
            if ("normal" === c.type) {
              if (((r = n.done ? "completed" : "suspendedYield"), c.arg === f))
                continue;
              return { value: c.arg, done: n.done };
            }
            "throw" === c.type &&
              ((r = "completed"), (n.method = "throw"), (n.arg = c.arg));
          }
        };
      }
      function O(t, e) {
        var n = e.method,
          r = t.iterator[n];
        if (void 0 === r)
          return (
            (e.delegate = null),
            ("throw" === n &&
              t.iterator.return &&
              ((e.method = "return"),
              (e.arg = void 0),
              O(t, e),
              "throw" === e.method)) ||
              ("return" !== n &&
                ((e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a '" + n + "' method"
                )))),
            f
          );
        var i = l(r, t.iterator, e.arg);
        if ("throw" === i.type)
          return (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), f;
        var o = i.arg;
        return o
          ? o.done
            ? ((e[t.resultName] = o.value),
              (e.next = t.nextLoc),
              "return" !== e.method && ((e.method = "next"), (e.arg = void 0)),
              (e.delegate = null),
              f)
            : o
          : ((e.method = "throw"),
            (e.arg = new TypeError("iterator result is not an object")),
            (e.delegate = null),
            f);
      }
      function j(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function w(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function S(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(j, this),
          this.reset(!0);
      }
      function T(t) {
        if (null != t) {
          var e = t[o];
          if (e) return e.call(t);
          if ("function" == typeof t.next) return t;
          if (!isNaN(t.length)) {
            var r = -1,
              i = function e() {
                for (; ++r < t.length; )
                  if (n.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
                return (e.value = void 0), (e.done = !0), e;
              };
            return (i.next = i);
          }
        }
        throw new TypeError(typeof t + " is not iterable");
      }
      return (
        (d.prototype = h),
        r(y, "constructor", { value: h, configurable: !0 }),
        r(h, "constructor", { value: d, configurable: !0 }),
        (d.displayName = c(h, s, "GeneratorFunction")),
        (t.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === d || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (t.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, h)
              : ((t.__proto__ = h), c(t, s, "GeneratorFunction")),
            (t.prototype = Object.create(y)),
            t
          );
        }),
        (t.awrap = function (t) {
          return { __await: t };
        }),
        b(_.prototype),
        c(_.prototype, a, function () {
          return this;
        }),
        (t.AsyncIterator = _),
        (t.async = function (e, n, r, i, o) {
          void 0 === o && (o = Promise);
          var a = new _(u(e, n, r, i), o);
          return t.isGeneratorFunction(n)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        b(y),
        c(y, s, "Generator"),
        c(y, o, function () {
          return this;
        }),
        c(y, "toString", function () {
          return "[object Generator]";
        }),
        (t.keys = function (t) {
          var e = Object(t),
            n = [];
          for (var r in e) n.push(r);
          return (
            n.reverse(),
            function t() {
              for (; n.length; ) {
                var r = n.pop();
                if (r in e) return (t.value = r), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (t.values = T),
        (S.prototype = {
          constructor: S,
          reset: function (t) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = void 0),
              this.tryEntries.forEach(w),
              !t)
            )
              for (var e in this)
                "t" === e.charAt(0) &&
                  n.call(this, e) &&
                  !isNaN(+e.slice(1)) &&
                  (this[e] = void 0);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (t) {
            if (this.done) throw t;
            var e = this;
            function r(n, r) {
              return (
                (a.type = "throw"),
                (a.arg = t),
                (e.next = n),
                r && ((e.method = "next"), (e.arg = void 0)),
                !!r
              );
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var o = this.tryEntries[i],
                a = o.completion;
              if ("root" === o.tryLoc) return r("end");
              if (o.tryLoc <= this.prev) {
                var s = n.call(o, "catchLoc"),
                  c = n.call(o, "finallyLoc");
                if (s && c) {
                  if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                  if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                } else if (s) {
                  if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                } else {
                  if (!c)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var i = this.tryEntries[r];
              if (
                i.tryLoc <= this.prev &&
                n.call(i, "finallyLoc") &&
                this.prev < i.finallyLoc
              ) {
                var o = i;
                break;
              }
            }
            o &&
              ("break" === t || "continue" === t) &&
              o.tryLoc <= e &&
              e <= o.finallyLoc &&
              (o = null);
            var a = o ? o.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              o
                ? ((this.method = "next"), (this.next = o.finallyLoc), f)
                : this.complete(a)
            );
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && e && (this.next = e),
              f
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.finallyLoc === t)
                return this.complete(n.completion, n.afterLoc), w(n), f;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.tryLoc === t) {
                var r = n.completion;
                if ("throw" === r.type) {
                  var i = r.arg;
                  w(n);
                }
                return i;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (t, e, n) {
            return (
              (this.delegate = { iterator: T(t), resultName: e, nextLoc: n }),
              "next" === this.method && (this.arg = void 0),
              f
            );
          },
        }),
        t
      );
    })(t.exports);
    try {
      regeneratorRuntime = r;
    } catch (t) {
      "object" == typeof globalThis
        ? (globalThis.regeneratorRuntime = r)
        : Function("r", "regeneratorRuntime = r")(r);
    }
  },
  function (t, e) {
    var n,
      r,
      i = (t.exports = {});
    function o() {
      throw new Error("setTimeout has not been defined");
    }
    function a() {
      throw new Error("clearTimeout has not been defined");
    }
    function s(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === o || !n) && setTimeout)
        return (n = setTimeout), setTimeout(t, 0);
      try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }
    !(function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : o;
      } catch (t) {
        n = o;
      }
      try {
        r = "function" == typeof clearTimeout ? clearTimeout : a;
      } catch (t) {
        r = a;
      }
    })();
    var c,
      u = [],
      l = !1,
      f = -1;
    function p() {
      l &&
        c &&
        ((l = !1), c.length ? (u = c.concat(u)) : (f = -1), u.length && d());
    }
    function d() {
      if (!l) {
        var t = s(p);
        l = !0;
        for (var e = u.length; e; ) {
          for (c = u, u = []; ++f < e; ) c && c[f].run();
          (f = -1), (e = u.length);
        }
        (c = null),
          (l = !1),
          (function (t) {
            if (r === clearTimeout) return clearTimeout(t);
            if ((r === a || !r) && clearTimeout)
              return (r = clearTimeout), clearTimeout(t);
            try {
              r(t);
            } catch (e) {
              try {
                return r.call(null, t);
              } catch (e) {
                return r.call(this, t);
              }
            }
          })(t);
      }
    }
    function h(t, e) {
      (this.fun = t), (this.array = e);
    }
    function v() {}
    (i.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      u.push(new h(t, e)), 1 !== u.length || l || s(d);
    }),
      (h.prototype.run = function () {
        this.fun.apply(null, this.array);
      }),
      (i.title = "browser"),
      (i.browser = !0),
      (i.env = {}),
      (i.argv = []),
      (i.version = ""),
      (i.versions = {}),
      (i.on = v),
      (i.addListener = v),
      (i.once = v),
      (i.off = v),
      (i.removeListener = v),
      (i.removeAllListeners = v),
      (i.emit = v),
      (i.prependListener = v),
      (i.prependOnceListener = v),
      (i.listeners = function (t) {
        return [];
      }),
      (i.binding = function (t) {
        throw new Error("process.binding is not supported");
      }),
      (i.cwd = function () {
        return "/";
      }),
      (i.chdir = function (t) {
        throw new Error("process.chdir is not supported");
      }),
      (i.umask = function () {
        return 0;
      });
  },
  function (t, e, n) {
    "use strict";
    n.r(e);
    var r = {};
    n.r(r),
      n.d(r, "FunctionToString", function () {
        return l;
      }),
      n.d(r, "InboundFilters", function () {
        return g;
      });
    var i = {};
    n.r(i),
      n.d(i, "Express", function () {
        return Ae;
      }),
      n.d(i, "Postgres", function () {
        return Ie;
      }),
      n.d(i, "Mysql", function () {
        return Pe;
      }),
      n.d(i, "Mongo", function () {
        return He;
      }),
      n.d(i, "BrowserTracing", function () {
        return cn;
      });
    var o,
      a = n(10),
      s = n.n(a),
      c = (n(39), n(0)),
      u = n(7),
      l = (function () {
        function t() {
          this.name = t.id;
        }
        return (
          (t.prototype.setupOnce = function () {
            (o = Function.prototype.toString),
              (Function.prototype.toString = function () {
                for (var t = [], e = 0; e < arguments.length; e++)
                  t[e] = arguments[e];
                var n = Object(u.f)(this) || this;
                return o.apply(n, t);
              });
          }),
          (t.id = "FunctionToString"),
          t
        );
      })(),
      f = n(5),
      p = n(21),
      d = n(16),
      h = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
      v = [
        /^Script error\.?$/,
        /^Javascript error: Script error\.? on line 0$/,
      ],
      g = (function () {
        function t(e) {
          void 0 === e && (e = {}), (this._options = e), (this.name = t.id);
        }
        return (
          (t.prototype.setupOnce = function (e, n) {
            e(function (e) {
              var r = n();
              if (r) {
                var i = r.getIntegration(t);
                if (i) {
                  var o = r.getClient(),
                    a = o ? o.getOptions() : {};
                  return (function (t, e) {
                    if (
                      e.ignoreInternal &&
                      (function (t) {
                        try {
                          return "SentryError" === t.exception.values[0].type;
                        } catch (t) {}
                        return !1;
                      })(t)
                    )
                      return (
                        h &&
                          f.c.warn(
                            "Event dropped due to being internal Sentry Error.\nEvent: " +
                              Object(p.d)(t)
                          ),
                        !0
                      );
                    if (
                      (function (t, e) {
                        if (!e || !e.length) return !1;
                        return (function (t) {
                          if (t.message) return [t.message];
                          if (t.exception)
                            try {
                              var e =
                                  (t.exception.values &&
                                    t.exception.values[0]) ||
                                  {},
                                n = e.type,
                                r = void 0 === n ? "" : n,
                                i = e.value,
                                o = void 0 === i ? "" : i;
                              return ["" + o, r + ": " + o];
                            } catch (e) {
                              return (
                                h &&
                                  f.c.error(
                                    "Cannot extract message for event " +
                                      Object(p.d)(t)
                                  ),
                                []
                              );
                            }
                          return [];
                        })(t).some(function (t) {
                          return e.some(function (e) {
                            return Object(d.a)(t, e);
                          });
                        });
                      })(t, e.ignoreErrors)
                    )
                      return (
                        h &&
                          f.c.warn(
                            "Event dropped due to being matched by `ignoreErrors` option.\nEvent: " +
                              Object(p.d)(t)
                          ),
                        !0
                      );
                    if (
                      (function (t, e) {
                        if (!e || !e.length) return !1;
                        var n = y(t);
                        return (
                          !!n &&
                          e.some(function (t) {
                            return Object(d.a)(n, t);
                          })
                        );
                      })(t, e.denyUrls)
                    )
                      return (
                        h &&
                          f.c.warn(
                            "Event dropped due to being matched by `denyUrls` option.\nEvent: " +
                              Object(p.d)(t) +
                              ".\nUrl: " +
                              y(t)
                          ),
                        !0
                      );
                    if (
                      !(function (t, e) {
                        if (!e || !e.length) return !0;
                        var n = y(t);
                        return (
                          !n ||
                          e.some(function (t) {
                            return Object(d.a)(n, t);
                          })
                        );
                      })(t, e.allowUrls)
                    )
                      return (
                        h &&
                          f.c.warn(
                            "Event dropped due to not being matched by `allowUrls` option.\nEvent: " +
                              Object(p.d)(t) +
                              ".\nUrl: " +
                              y(t)
                          ),
                        !0
                      );
                    return !1;
                  })(
                    e,
                    (function (t, e) {
                      void 0 === t && (t = {});
                      void 0 === e && (e = {});
                      return {
                        allowUrls: Object(c.e)(
                          t.whitelistUrls || [],
                          t.allowUrls || [],
                          e.whitelistUrls || [],
                          e.allowUrls || []
                        ),
                        denyUrls: Object(c.e)(
                          t.blacklistUrls || [],
                          t.denyUrls || [],
                          e.blacklistUrls || [],
                          e.denyUrls || []
                        ),
                        ignoreErrors: Object(c.e)(
                          t.ignoreErrors || [],
                          e.ignoreErrors || [],
                          v
                        ),
                        ignoreInternal:
                          void 0 === t.ignoreInternal || t.ignoreInternal,
                      };
                    })(i._options, a)
                  )
                    ? null
                    : e;
                }
              }
              return e;
            });
          }),
          (t.id = "InboundFilters"),
          t
        );
      })();
    function m(t) {
      void 0 === t && (t = []);
      for (var e = t.length - 1; e >= 0; e--) {
        var n = t[e];
        if (n && "<anonymous>" !== n.filename && "[native code]" !== n.filename)
          return n.filename || null;
      }
      return null;
    }
    function y(t) {
      try {
        if (t.stacktrace) return m(t.stacktrace.frames);
        var e;
        try {
          e = t.exception.values[0].stacktrace.frames;
        } catch (t) {}
        return e ? m(e) : null;
      } catch (e) {
        return (
          h && f.c.error("Cannot extract url for event " + Object(p.d)(t)), null
        );
      }
    }
    var b = n(20);
    var _ = n(6),
      x = n(22),
      O = n(36),
      j = n(25),
      w =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array
          ? function (t, e) {
              return (t.__proto__ = e), t;
            }
          : function (t, e) {
              for (var n in e)
                Object.prototype.hasOwnProperty.call(t, n) || (t[n] = e[n]);
              return t;
            });
    var S = (function (t) {
        function e(e) {
          var n = this.constructor,
            r = t.call(this, e) || this;
          return (
            (r.message = e),
            (r.name = n.prototype.constructor.name),
            w(r, n.prototype),
            r
          );
        }
        return Object(c.b)(e, t), e;
      })(Error),
      T = n(9),
      E = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
    function k(t, e) {
      void 0 === e && (e = !1);
      var n = t.host,
        r = t.path,
        i = t.pass,
        o = t.port,
        a = t.projectId;
      return (
        t.protocol +
        "://" +
        t.publicKey +
        (e && i ? ":" + i : "") +
        "@" +
        n +
        (o ? ":" + o : "") +
        "/" +
        (r ? r + "/" : r) +
        a
      );
    }
    function C(t) {
      return (
        "user" in t && !("publicKey" in t) && (t.publicKey = t.user),
        {
          user: t.publicKey || "",
          protocol: t.protocol,
          publicKey: t.publicKey || "",
          pass: t.pass || "",
          host: t.host,
          port: t.port || "",
          path: t.path || "",
          projectId: t.projectId,
        }
      );
    }
    function N(t) {
      var e =
        "string" == typeof t
          ? (function (t) {
              var e = E.exec(t);
              if (!e) throw new S("Invalid Sentry Dsn: " + t);
              var n = Object(c.c)(e.slice(1), 6),
                r = n[0],
                i = n[1],
                o = n[2],
                a = void 0 === o ? "" : o,
                s = n[3],
                u = n[4],
                l = void 0 === u ? "" : u,
                f = "",
                p = n[5],
                d = p.split("/");
              if (
                (d.length > 1 &&
                  ((f = d.slice(0, -1).join("/")), (p = d.pop())),
                p)
              ) {
                var h = p.match(/^\d+/);
                h && (p = h[0]);
              }
              return C({
                host: s,
                pass: a,
                path: f,
                projectId: p,
                port: l,
                protocol: r,
                publicKey: i,
              });
            })(t)
          : C(t);
      return (
        (function (t) {
          if (T.a) {
            var e = t.port,
              n = t.projectId,
              r = t.protocol;
            if (
              (["protocol", "publicKey", "host", "projectId"].forEach(function (
                e
              ) {
                if (!t[e]) throw new S("Invalid Sentry Dsn: " + e + " missing");
              }),
              !n.match(/^\d+$/))
            )
              throw new S("Invalid Sentry Dsn: Invalid projectId " + n);
            if (
              !(function (t) {
                return "http" === t || "https" === t;
              })(r)
            )
              throw new S("Invalid Sentry Dsn: Invalid protocol " + r);
            if (e && isNaN(parseInt(e, 10)))
              throw new S("Invalid Sentry Dsn: Invalid port " + e);
          }
        })(e),
        e
      );
    }
    var A = n(4),
      L = n(11),
      D = n(45),
      R = [];
    function I(t) {
      return t.reduce(function (t, e) {
        return (
          t.every(function (t) {
            return e.name !== t.name;
          }) && t.push(e),
          t
        );
      }, []);
    }
    function P(t) {
      var e = {};
      return (
        (function (t) {
          var e =
              (t.defaultIntegrations && Object(c.e)(t.defaultIntegrations)) ||
              [],
            n = t.integrations,
            r = Object(c.e)(I(e));
          Array.isArray(n)
            ? (r = Object(c.e)(
                r.filter(function (t) {
                  return n.every(function (e) {
                    return e.name !== t.name;
                  });
                }),
                I(n)
              ))
            : "function" == typeof n &&
              ((r = n(r)), (r = Array.isArray(r) ? r : [r]));
          var i = r.map(function (t) {
            return t.name;
          });
          return (
            -1 !== i.indexOf("Debug") &&
              r.push.apply(r, Object(c.e)(r.splice(i.indexOf("Debug"), 1))),
            r
          );
        })(t).forEach(function (t) {
          (e[t.name] = t),
            (function (t) {
              -1 === R.indexOf(t.name) &&
                (t.setupOnce(j.b, b.b),
                R.push(t.name),
                h && f.c.log("Integration installed: " + t.name));
            })(t);
        }),
        Object(u.a)(e, "initialized", !0),
        e
      );
    }
    var q = "Not capturing exception because it's already been captured.",
      M = (function () {
        function t(t, e) {
          (this._integrations = {}),
            (this._numProcessing = 0),
            (this._backend = new t(e)),
            (this._options = e),
            e.dsn && (this._dsn = N(e.dsn));
        }
        return (
          (t.prototype.captureException = function (t, e, n) {
            var r = this;
            if (!Object(p.c)(t)) {
              var i = e && e.event_id;
              return (
                this._process(
                  this._getBackend()
                    .eventFromException(t, e)
                    .then(function (t) {
                      return r._captureEvent(t, e, n);
                    })
                    .then(function (t) {
                      i = t;
                    })
                ),
                i
              );
            }
            h && f.c.log(q);
          }),
          (t.prototype.captureMessage = function (t, e, n, r) {
            var i = this,
              o = n && n.event_id,
              a = Object(A.j)(t)
                ? this._getBackend().eventFromMessage(String(t), e, n)
                : this._getBackend().eventFromException(t, n);
            return (
              this._process(
                a
                  .then(function (t) {
                    return i._captureEvent(t, n, r);
                  })
                  .then(function (t) {
                    o = t;
                  })
              ),
              o
            );
          }),
          (t.prototype.captureEvent = function (t, e, n) {
            if (
              !(e && e.originalException && Object(p.c)(e.originalException))
            ) {
              var r = e && e.event_id;
              return (
                this._process(
                  this._captureEvent(t, e, n).then(function (t) {
                    r = t;
                  })
                ),
                r
              );
            }
            h && f.c.log(q);
          }),
          (t.prototype.captureSession = function (t) {
            this._isEnabled()
              ? "string" != typeof t.release
                ? h &&
                  f.c.warn(
                    "Discarded session because of missing or non-string release"
                  )
                : (this._sendSession(t), t.update({ init: !1 }))
              : h && f.c.warn("SDK not enabled, will not capture session.");
          }),
          (t.prototype.getDsn = function () {
            return this._dsn;
          }),
          (t.prototype.getOptions = function () {
            return this._options;
          }),
          (t.prototype.getTransport = function () {
            return this._getBackend().getTransport();
          }),
          (t.prototype.flush = function (t) {
            var e = this;
            return this._isClientDoneProcessing(t).then(function (n) {
              return e
                .getTransport()
                .close(t)
                .then(function (t) {
                  return n && t;
                });
            });
          }),
          (t.prototype.close = function (t) {
            var e = this;
            return this.flush(t).then(function (t) {
              return (e.getOptions().enabled = !1), t;
            });
          }),
          (t.prototype.setupIntegrations = function () {
            this._isEnabled() &&
              !this._integrations.initialized &&
              (this._integrations = P(this._options));
          }),
          (t.prototype.getIntegration = function (t) {
            try {
              return this._integrations[t.id] || null;
            } catch (e) {
              return (
                h &&
                  f.c.warn(
                    "Cannot retrieve integration " +
                      t.id +
                      " from the current Client"
                  ),
                null
              );
            }
          }),
          (t.prototype._updateSessionFromEvent = function (t, e) {
            var n,
              r,
              i = !1,
              o = !1,
              a = e.exception && e.exception.values;
            if (a) {
              o = !0;
              try {
                for (
                  var s = Object(c.f)(a), u = s.next();
                  !u.done;
                  u = s.next()
                ) {
                  var l = u.value.mechanism;
                  if (l && !1 === l.handled) {
                    i = !0;
                    break;
                  }
                }
              } catch (t) {
                n = { error: t };
              } finally {
                try {
                  u && !u.done && (r = s.return) && r.call(s);
                } finally {
                  if (n) throw n.error;
                }
              }
            }
            var f = "ok" === t.status;
            ((f && 0 === t.errors) || (f && i)) &&
              (t.update(
                Object(c.a)(Object(c.a)({}, i && { status: "crashed" }), {
                  errors: t.errors || Number(o || i),
                })
              ),
              this.captureSession(t));
          }),
          (t.prototype._sendSession = function (t) {
            this._getBackend().sendSession(t);
          }),
          (t.prototype._isClientDoneProcessing = function (t) {
            var e = this;
            return new x.a(function (n) {
              var r = 0,
                i = setInterval(function () {
                  0 == e._numProcessing
                    ? (clearInterval(i), n(!0))
                    : ((r += 1), t && r >= t && (clearInterval(i), n(!1)));
                }, 1);
            });
          }),
          (t.prototype._getBackend = function () {
            return this._backend;
          }),
          (t.prototype._isEnabled = function () {
            return !1 !== this.getOptions().enabled && void 0 !== this._dsn;
          }),
          (t.prototype._prepareEvent = function (t, e, n) {
            var r = this,
              i = this.getOptions(),
              o = i.normalizeDepth,
              a = void 0 === o ? 3 : o,
              s = i.normalizeMaxBreadth,
              u = void 0 === s ? 1e3 : s,
              l = Object(c.a)(Object(c.a)({}, t), {
                event_id:
                  t.event_id || (n && n.event_id ? n.event_id : Object(p.f)()),
                timestamp: t.timestamp || Object(L.b)(),
              });
            this._applyClientOptions(l), this._applyIntegrationsMetadata(l);
            var f = e;
            n &&
              n.captureContext &&
              (f = j.a.clone(f).update(n.captureContext));
            var d = Object(x.c)(l);
            return (
              f && (d = f.applyToEvent(l, n)),
              d.then(function (t) {
                return (
                  t &&
                    (t.sdkProcessingMetadata = Object(c.a)(
                      Object(c.a)({}, t.sdkProcessingMetadata),
                      { normalizeDepth: Object(D.a)(a) + " (" + typeof a + ")" }
                    )),
                  "number" == typeof a && a > 0 ? r._normalizeEvent(t, a, u) : t
                );
              })
            );
          }),
          (t.prototype._normalizeEvent = function (t, e, n) {
            if (!t) return null;
            var r = Object(c.a)(
              Object(c.a)(
                Object(c.a)(
                  Object(c.a)(
                    Object(c.a)({}, t),
                    t.breadcrumbs && {
                      breadcrumbs: t.breadcrumbs.map(function (t) {
                        return Object(c.a)(
                          Object(c.a)({}, t),
                          t.data && { data: Object(D.a)(t.data, e, n) }
                        );
                      }),
                    }
                  ),
                  t.user && { user: Object(D.a)(t.user, e, n) }
                ),
                t.contexts && { contexts: Object(D.a)(t.contexts, e, n) }
              ),
              t.extra && { extra: Object(D.a)(t.extra, e, n) }
            );
            return (
              t.contexts &&
                t.contexts.trace &&
                (r.contexts.trace = t.contexts.trace),
              (r.sdkProcessingMetadata = Object(c.a)(
                Object(c.a)({}, r.sdkProcessingMetadata),
                { baseClientNormalized: !0 }
              )),
              r
            );
          }),
          (t.prototype._applyClientOptions = function (t) {
            var e = this.getOptions(),
              n = e.environment,
              r = e.release,
              i = e.dist,
              o = e.maxValueLength,
              a = void 0 === o ? 250 : o;
            "environment" in t ||
              (t.environment = "environment" in e ? n : "production"),
              void 0 === t.release && void 0 !== r && (t.release = r),
              void 0 === t.dist && void 0 !== i && (t.dist = i),
              t.message && (t.message = Object(d.d)(t.message, a));
            var s = t.exception && t.exception.values && t.exception.values[0];
            s && s.value && (s.value = Object(d.d)(s.value, a));
            var c = t.request;
            c && c.url && (c.url = Object(d.d)(c.url, a));
          }),
          (t.prototype._applyIntegrationsMetadata = function (t) {
            var e = Object.keys(this._integrations);
            e.length > 0 &&
              ((t.sdk = t.sdk || {}),
              (t.sdk.integrations = Object(c.e)(t.sdk.integrations || [], e)));
          }),
          (t.prototype._sendEvent = function (t) {
            this._getBackend().sendEvent(t);
          }),
          (t.prototype._captureEvent = function (t, e, n) {
            return this._processEvent(t, e, n).then(
              function (t) {
                return t.event_id;
              },
              function (t) {
                h && f.c.error(t);
              }
            );
          }),
          (t.prototype._processEvent = function (t, e, n) {
            var r = this,
              i = this.getOptions(),
              o = i.beforeSend,
              a = i.sampleRate,
              s = this.getTransport();
            function c(t, e) {
              s.recordLostEvent && s.recordLostEvent(t, e);
            }
            if (!this._isEnabled())
              return Object(x.b)(
                new S("SDK not enabled, will not capture event.")
              );
            var u = "transaction" === t.type;
            return !u && "number" == typeof a && Math.random() > a
              ? (c("sample_rate", "event"),
                Object(x.b)(
                  new S(
                    "Discarding event because it's not included in the random sample (sampling rate = " +
                      a +
                      ")"
                  )
                ))
              : this._prepareEvent(t, n, e)
                  .then(function (n) {
                    if (null === n)
                      throw (
                        (c("event_processor", t.type || "event"),
                        new S(
                          "An event processor returned null, will not send event."
                        ))
                      );
                    return (e && e.data && !0 === e.data.__sentry__) || u || !o
                      ? n
                      : (function (t) {
                          var e =
                            "`beforeSend` method has to return `null` or a valid event.";
                          if (Object(A.n)(t))
                            return t.then(
                              function (t) {
                                if (!Object(A.i)(t) && null !== t)
                                  throw new S(e);
                                return t;
                              },
                              function (t) {
                                throw new S("beforeSend rejected with " + t);
                              }
                            );
                          if (!Object(A.i)(t) && null !== t) throw new S(e);
                          return t;
                        })(o(n, e));
                  })
                  .then(function (e) {
                    if (null === e)
                      throw (
                        (c("before_send", t.type || "event"),
                        new S(
                          "`beforeSend` returned `null`, will not send event."
                        ))
                      );
                    var i = n && n.getSession && n.getSession();
                    return (
                      !u && i && r._updateSessionFromEvent(i, e),
                      r._sendEvent(e),
                      e
                    );
                  })
                  .then(null, function (t) {
                    if (t instanceof S) throw t;
                    throw (
                      (r.captureException(t, {
                        data: { __sentry__: !0 },
                        originalException: t,
                      }),
                      new S(
                        "Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " +
                          t
                      ))
                    );
                  });
          }),
          (t.prototype._process = function (t) {
            var e = this;
            (this._numProcessing += 1),
              t.then(
                function (t) {
                  return (e._numProcessing -= 1), t;
                },
                function (t) {
                  return (e._numProcessing -= 1), t;
                }
              );
          }),
          t
        );
      })();
    !(function () {
      function t(t, e, n) {
        void 0 === e && (e = {}),
          (this.dsn = t),
          (this._dsnObject = N(t)),
          (this.metadata = e),
          (this._tunnel = n);
      }
      (t.prototype.getDsn = function () {
        return this._dsnObject;
      }),
        (t.prototype.forceEnvelope = function () {
          return !!this._tunnel;
        }),
        (t.prototype.getBaseApiEndpoint = function () {
          return F(this._dsnObject);
        }),
        (t.prototype.getStoreEndpoint = function () {
          return W(this._dsnObject);
        }),
        (t.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
          return z(this._dsnObject);
        }),
        (t.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function () {
          return $(this._dsnObject, this._tunnel);
        });
    })();
    function H(t, e, n) {
      return { initDsn: t, metadata: e || {}, dsn: N(t), tunnel: n };
    }
    function F(t) {
      var e = t.protocol ? t.protocol + ":" : "",
        n = t.port ? ":" + t.port : "";
      return e + "//" + t.host + n + (t.path ? "/" + t.path : "") + "/api/";
    }
    function B(t, e) {
      return "" + F(t) + t.projectId + "/" + e + "/";
    }
    function U(t) {
      return Object(u.h)({ sentry_key: t.publicKey, sentry_version: "7" });
    }
    function W(t) {
      return B(t, "store");
    }
    function z(t) {
      return W(t) + "?" + U(t);
    }
    function $(t, e) {
      return (
        e ||
        (function (t) {
          return B(t, "envelope");
        })(t) +
          "?" +
          U(t)
      );
    }
    function Y(t, e) {
      return void 0 === e && (e = []), [t, e];
    }
    function G(t) {
      var e = Object(c.c)(t, 2),
        n = e[0],
        r = e[1],
        i = JSON.stringify(n);
      return r.reduce(function (t, e) {
        var n = Object(c.c)(e, 2),
          r = n[0],
          i = n[1],
          o = Object(A.j)(i) ? String(i) : JSON.stringify(i);
        return t + "\n" + JSON.stringify(r) + "\n" + o;
      }, i);
    }
    function X(t) {
      if (t.metadata && t.metadata.sdk) {
        var e = t.metadata.sdk;
        return { name: e.name, version: e.version };
      }
    }
    function V(t, e) {
      return e
        ? ((t.sdk = t.sdk || {}),
          (t.sdk.name = t.sdk.name || e.name),
          (t.sdk.version = t.sdk.version || e.version),
          (t.sdk.integrations = Object(c.e)(
            t.sdk.integrations || [],
            e.integrations || []
          )),
          (t.sdk.packages = Object(c.e)(
            t.sdk.packages || [],
            e.packages || []
          )),
          t)
        : t;
    }
    function J(t, e) {
      var n = X(e),
        r = "aggregates" in t ? "sessions" : "session";
      return [
        Y(
          Object(c.a)(
            Object(c.a)({ sent_at: new Date().toISOString() }, n && { sdk: n }),
            !!e.tunnel && { dsn: k(e.dsn) }
          ),
          [[{ type: r }, t]]
        ),
        r,
      ];
    }
    var K,
      Q = (function () {
        function t() {}
        return (
          (t.prototype.sendEvent = function (t) {
            return Object(x.c)({
              reason:
                "NoopTransport: Event has been skipped because no Dsn is configured.",
              status: "skipped",
            });
          }),
          (t.prototype.close = function (t) {
            return Object(x.c)(!0);
          }),
          t
        );
      })(),
      Z = (function () {
        function t(t) {
          (this._options = t),
            this._options.dsn ||
              (h && f.c.warn("No DSN provided, backend will not do anything.")),
            (this._transport = this._setupTransport());
        }
        return (
          (t.prototype.eventFromException = function (t, e) {
            throw new S("Backend has to implement `eventFromException` method");
          }),
          (t.prototype.eventFromMessage = function (t, e, n) {
            throw new S("Backend has to implement `eventFromMessage` method");
          }),
          (t.prototype.sendEvent = function (t) {
            if (
              this._newTransport &&
              this._options.dsn &&
              this._options._experiments &&
              this._options._experiments.newTransport
            ) {
              var e = (function (t, e) {
                var n = X(e),
                  r = t.type || "event",
                  i = (t.sdkProcessingMetadata || {}).transactionSampling || {},
                  o = i.method,
                  a = i.rate;
                return (
                  V(t, e.metadata.sdk),
                  (t.tags = t.tags || {}),
                  (t.extra = t.extra || {}),
                  (t.sdkProcessingMetadata &&
                    t.sdkProcessingMetadata.baseClientNormalized) ||
                    ((t.tags.skippedNormalization = !0),
                    (t.extra.normalizeDepth = t.sdkProcessingMetadata
                      ? t.sdkProcessingMetadata.normalizeDepth
                      : "unset")),
                  delete t.sdkProcessingMetadata,
                  Y(
                    Object(c.a)(
                      Object(c.a)(
                        {
                          event_id: t.event_id,
                          sent_at: new Date().toISOString(),
                        },
                        n && { sdk: n }
                      ),
                      !!e.tunnel && { dsn: k(e.dsn) }
                    ),
                    [[{ type: r, sample_rates: [{ id: o, rate: a }] }, t]]
                  )
                );
              })(
                t,
                H(
                  this._options.dsn,
                  this._options._metadata,
                  this._options.tunnel
                )
              );
              this._newTransport.send(e).then(null, function (t) {
                h && f.c.error("Error while sending event:", t);
              });
            } else
              this._transport.sendEvent(t).then(null, function (t) {
                h && f.c.error("Error while sending event:", t);
              });
          }),
          (t.prototype.sendSession = function (t) {
            if (this._transport.sendSession)
              if (
                this._newTransport &&
                this._options.dsn &&
                this._options._experiments &&
                this._options._experiments.newTransport
              ) {
                var e = H(
                    this._options.dsn,
                    this._options._metadata,
                    this._options.tunnel
                  ),
                  n = Object(c.c)(J(t, e), 1)[0];
                this._newTransport.send(n).then(null, function (t) {
                  h && f.c.error("Error while sending session:", t);
                });
              } else
                this._transport.sendSession(t).then(null, function (t) {
                  h && f.c.error("Error while sending session:", t);
                });
            else
              h &&
                f.c.warn(
                  "Dropping session because custom transport doesn't implement sendSession"
                );
          }),
          (t.prototype.getTransport = function () {
            return this._transport;
          }),
          (t.prototype._setupTransport = function () {
            return new Q();
          }),
          t
        );
      })();
    !(function (t) {
      (t.Fatal = "fatal"),
        (t.Error = "error"),
        (t.Warning = "warning"),
        (t.Log = "log"),
        (t.Info = "info"),
        (t.Debug = "debug"),
        (t.Critical = "critical");
    })(K || (K = {}));
    var tt = n(27),
      et = n(24);
    function nt(t, e, n, r) {
      var i = { filename: t, function: e, in_app: !0 };
      return void 0 !== n && (i.lineno = n), void 0 !== r && (i.colno = r), i;
    }
    var rt =
        /^\s*at (?:(.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
      it = /\((\S*)(?::(\d+))(?::(\d+))\)/,
      ot = [
        30,
        function (t) {
          var e = rt.exec(t);
          if (e) {
            if (e[2] && 0 === e[2].indexOf("eval")) {
              var n = it.exec(e[2]);
              n && ((e[2] = n[1]), (e[3] = n[2]), (e[4] = n[3]));
            }
            var r = Object(c.c)(vt(e[1] || "?", e[2]), 2),
              i = r[0];
            return nt(r[1], i, e[3] ? +e[3] : void 0, e[4] ? +e[4] : void 0);
          }
        },
      ],
      at =
        /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
      st = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
      ct = [
        50,
        function (t) {
          var e,
            n = at.exec(t);
          if (n) {
            if (n[3] && n[3].indexOf(" > eval") > -1) {
              var r = st.exec(n[3]);
              r &&
                ((n[1] = n[1] || "eval"),
                (n[3] = r[1]),
                (n[4] = r[2]),
                (n[5] = ""));
            }
            var i = n[3],
              o = n[1] || "?";
            return (
              (o = (e = Object(c.c)(vt(o, i), 2))[0]),
              nt((i = e[1]), o, n[4] ? +n[4] : void 0, n[5] ? +n[5] : void 0)
            );
          }
        },
      ],
      ut =
        /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
      lt = [
        40,
        function (t) {
          var e = ut.exec(t);
          return e
            ? nt(e[2], e[1] || "?", +e[3], e[4] ? +e[4] : void 0)
            : void 0;
        },
      ],
      ft = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
      pt = [
        10,
        function (t) {
          var e = ft.exec(t);
          return e ? nt(e[2], e[3] || "?", +e[1]) : void 0;
        },
      ],
      dt =
        / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i,
      ht = [
        20,
        function (t) {
          var e = dt.exec(t);
          return e ? nt(e[5], e[3] || e[4] || "?", +e[1], +e[2]) : void 0;
        },
      ],
      vt = function (t, e) {
        var n = -1 !== t.indexOf("safari-extension"),
          r = -1 !== t.indexOf("safari-web-extension");
        return n || r
          ? [
              -1 !== t.indexOf("@") ? t.split("@")[0] : "?",
              n ? "safari-extension:" + e : "safari-web-extension:" + e,
            ]
          : [t, e];
      };
    function gt(t) {
      var e = yt(t),
        n = { type: t && t.name, value: _t(t) };
      return (
        e.length && (n.stacktrace = { frames: e }),
        void 0 === n.type &&
          "" === n.value &&
          (n.value = "Unrecoverable error caught"),
        n
      );
    }
    function mt(t) {
      return { exception: { values: [gt(t)] } };
    }
    function yt(t) {
      var e = t.stacktrace || t.stack || "",
        n = (function (t) {
          if (t) {
            if ("number" == typeof t.framesToPop) return t.framesToPop;
            if (bt.test(t.message)) return 1;
          }
          return 0;
        })(t);
      try {
        return Object(et.a)(pt, ht, ot, lt, ct)(e, n);
      } catch (t) {}
      return [];
    }
    var bt = /Minified React error #\d+;/i;
    function _t(t) {
      var e = t && t.message;
      return e
        ? e.error && "string" == typeof e.error.message
          ? e.error.message
          : e
        : "No error message";
    }
    function xt(t, e, n, r) {
      var i;
      if (Object(A.e)(t) && t.error) return mt(t.error);
      if (Object(A.a)(t) || Object(A.b)(t)) {
        var o = t;
        if ("stack" in t) i = mt(t);
        else {
          var a = o.name || (Object(A.a)(o) ? "DOMError" : "DOMException"),
            s = o.message ? a + ": " + o.message : a;
          (i = Ot(s, e, n)), Object(p.b)(i, s);
        }
        return (
          "code" in o &&
            (i.tags = Object(c.a)(Object(c.a)({}, i.tags), {
              "DOMException.code": "" + o.code,
            })),
          i
        );
      }
      return Object(A.d)(t)
        ? mt(t)
        : Object(A.i)(t) || Object(A.f)(t)
        ? ((i = (function (t, e, n) {
            var r = {
              exception: {
                values: [
                  {
                    type: Object(A.f)(t)
                      ? t.constructor.name
                      : n
                      ? "UnhandledRejection"
                      : "Error",
                    value:
                      "Non-Error " +
                      (n ? "promise rejection" : "exception") +
                      " captured with keys: " +
                      Object(u.d)(t),
                  },
                ],
              },
              extra: { __serialized__: Object(D.b)(t) },
            };
            if (e) {
              var i = yt(e);
              i.length && (r.stacktrace = { frames: i });
            }
            return r;
          })(t, e, r)),
          Object(p.a)(i, { synthetic: !0 }),
          i)
        : ((i = Ot(t, e, n)),
          Object(p.b)(i, "" + t, void 0),
          Object(p.a)(i, { synthetic: !0 }),
          i);
    }
    function Ot(t, e, n) {
      var r = { message: t };
      if (n && e) {
        var i = yt(e);
        i.length && (r.stacktrace = { frames: i });
      }
      return r;
    }
    function jt(t) {
      var e = [];
      function n(t) {
        return e.splice(e.indexOf(t), 1)[0];
      }
      return {
        $: e,
        add: function (r) {
          if (!(void 0 === t || e.length < t))
            return Object(x.b)(
              new S("Not adding Promise due to buffer limit reached.")
            );
          var i = r();
          return (
            -1 === e.indexOf(i) && e.push(i),
            i
              .then(function () {
                return n(i);
              })
              .then(null, function () {
                return n(i).then(null, function () {});
              }),
            i
          );
        },
        drain: function (t) {
          return new x.a(function (n, r) {
            var i = e.length;
            if (!i) return n(!0);
            var o = setTimeout(function () {
              t && t > 0 && n(!1);
            }, t);
            e.forEach(function (t) {
              Object(x.c)(t).then(function () {
                --i || (clearTimeout(o), n(!0));
              }, r);
            });
          });
        },
      };
    }
    function wt(t, e) {
      return t[e] || t.all || 0;
    }
    function St(t, e, n) {
      return void 0 === n && (n = Date.now()), wt(t, e) > n;
    }
    function Tt(t, e, n) {
      var r, i, o, a;
      void 0 === n && (n = Date.now());
      var s = Object(c.a)({}, t),
        u = e["x-sentry-rate-limits"],
        l = e["retry-after"];
      if (u)
        try {
          for (
            var f = Object(c.f)(u.trim().split(",")), p = f.next();
            !p.done;
            p = f.next()
          ) {
            var d = p.value.split(":", 2),
              h = parseInt(d[0], 10),
              v = 1e3 * (isNaN(h) ? 60 : h);
            if (d[1])
              try {
                for (
                  var g = ((o = void 0), Object(c.f)(d[1].split(";"))),
                    m = g.next();
                  !m.done;
                  m = g.next()
                ) {
                  s[m.value] = n + v;
                }
              } catch (t) {
                o = { error: t };
              } finally {
                try {
                  m && !m.done && (a = g.return) && a.call(g);
                } finally {
                  if (o) throw o.error;
                }
              }
            else s.all = n + v;
          }
        } catch (t) {
          r = { error: t };
        } finally {
          try {
            p && !p.done && (i = f.return) && i.call(f);
          } finally {
            if (r) throw r.error;
          }
        }
      else
        l &&
          (s.all =
            n +
            (function (t, e) {
              void 0 === e && (e = Date.now());
              var n = parseInt("" + t, 10);
              if (!isNaN(n)) return 1e3 * n;
              var r = Date.parse("" + t);
              return isNaN(r) ? 6e4 : r - e;
            })(l, n));
      return s;
    }
    function Et(t) {
      return t >= 200 && t < 300
        ? "success"
        : 429 === t
        ? "rate_limit"
        : t >= 400 && t < 500
        ? "invalid"
        : t >= 500
        ? "failed"
        : "unknown";
    }
    function kt(t, e, n) {
      void 0 === n && (n = jt(t.bufferSize || 30));
      var r = {};
      return {
        send: function (t) {
          var i = (function (t) {
              var e = Object(c.c)(t, 2),
                n = Object(c.c)(e[1], 1);
              return Object(c.c)(n[0], 1)[0].type;
            })(t),
            o = "event" === i ? "error" : i,
            a = { category: o, body: G(t) };
          return St(r, o)
            ? Object(x.b)({ status: "rate_limit", reason: Ct(r, o) })
            : n.add(function () {
                return e(a).then(function (t) {
                  var e = t.body,
                    n = t.headers,
                    i = t.reason,
                    a = Et(t.statusCode);
                  return (
                    n && (r = Tt(r, n)),
                    "success" === a
                      ? Object(x.c)({ status: a, reason: i })
                      : Object(x.b)({
                          status: a,
                          reason:
                            i ||
                            e ||
                            ("rate_limit" === a
                              ? Ct(r, o)
                              : "Unknown transport error"),
                        })
                  );
                });
              });
        },
        flush: function (t) {
          return n.drain(t);
        },
      };
    }
    function Ct(t, e) {
      return (
        "Too many " +
        e +
        " requests, backing off until: " +
        new Date(wt(t, e)).toISOString()
      );
    }
    var Nt,
      At = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
      Lt = Object(_.a)();
    function Dt() {
      if (Nt) return Nt;
      if (Object(tt.a)(Lt.fetch)) return (Nt = Lt.fetch.bind(Lt));
      var t = Lt.document,
        e = Lt.fetch;
      if (t && "function" == typeof t.createElement)
        try {
          var n = t.createElement("iframe");
          (n.hidden = !0), t.head.appendChild(n);
          var r = n.contentWindow;
          r && r.fetch && (e = r.fetch), t.head.removeChild(n);
        } catch (t) {
          At &&
            f.c.warn(
              "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
              t
            );
        }
      return (Nt = e.bind(Lt));
    }
    function Rt(t, e) {
      if (
        "[object Navigator]" ===
          Object.prototype.toString.call(Lt && Lt.navigator) &&
        "function" == typeof Lt.navigator.sendBeacon
      )
        return Lt.navigator.sendBeacon.bind(Lt.navigator)(t, e);
      if (Object(tt.b)()) {
        var n = Dt();
        n(t, {
          body: e,
          method: "POST",
          credentials: "omit",
          keepalive: !0,
        }).then(null, function (t) {
          console.error(t);
        });
      } else;
    }
    function It(t) {
      return "event" === t ? "error" : t;
    }
    var Pt = Object(_.a)(),
      qt = (function () {
        function t(t) {
          var e = this;
          (this.options = t),
            (this._buffer = jt(30)),
            (this._rateLimits = {}),
            (this._outcomes = {}),
            (this._api = H(t.dsn, t._metadata, t.tunnel)),
            (this.url = z(this._api.dsn)),
            this.options.sendClientReports &&
              Pt.document &&
              Pt.document.addEventListener("visibilitychange", function () {
                "hidden" === Pt.document.visibilityState && e._flushOutcomes();
              });
        }
        return (
          (t.prototype.sendEvent = function (t) {
            return this._sendRequest(
              (function (t, e) {
                var n,
                  r = X(e),
                  i = t.type || "event",
                  o = "transaction" === i || !!e.tunnel,
                  a = (t.sdkProcessingMetadata || {}).transactionSampling || {},
                  s = a.method,
                  u = a.rate;
                V(t, e.metadata.sdk),
                  (t.tags = t.tags || {}),
                  (t.extra = t.extra || {}),
                  (t.sdkProcessingMetadata &&
                    t.sdkProcessingMetadata.baseClientNormalized) ||
                    ((t.tags.skippedNormalization = !0),
                    (t.extra.normalizeDepth = t.sdkProcessingMetadata
                      ? t.sdkProcessingMetadata.normalizeDepth
                      : "unset")),
                  delete t.sdkProcessingMetadata;
                try {
                  n = JSON.stringify(t);
                } catch (e) {
                  (t.tags.JSONStringifyError = !0),
                    (t.extra.JSONStringifyError = e);
                  try {
                    n = JSON.stringify(Object(D.a)(t));
                  } catch (t) {
                    var l = t;
                    n = JSON.stringify({
                      message: "JSON.stringify error after renormalization",
                      extra: { message: l.message, stack: l.stack },
                    });
                  }
                }
                var f = {
                  body: n,
                  type: i,
                  url: o ? $(e.dsn, e.tunnel) : z(e.dsn),
                };
                if (o) {
                  var p = Y(
                    Object(c.a)(
                      Object(c.a)(
                        {
                          event_id: t.event_id,
                          sent_at: new Date().toISOString(),
                        },
                        r && { sdk: r }
                      ),
                      !!e.tunnel && { dsn: k(e.dsn) }
                    ),
                    [[{ type: i, sample_rates: [{ id: s, rate: u }] }, f.body]]
                  );
                  f.body = G(p);
                }
                return f;
              })(t, this._api),
              t
            );
          }),
          (t.prototype.sendSession = function (t) {
            return this._sendRequest(
              (function (t, e) {
                var n = Object(c.c)(J(t, e), 2),
                  r = n[0],
                  i = n[1];
                return { body: G(r), type: i, url: $(e.dsn, e.tunnel) };
              })(t, this._api),
              t
            );
          }),
          (t.prototype.close = function (t) {
            return this._buffer.drain(t);
          }),
          (t.prototype.recordLostEvent = function (t, e) {
            var n;
            if (this.options.sendClientReports) {
              var r = It(e) + ":" + t;
              At && f.c.log("Adding outcome: " + r),
                (this._outcomes[r] =
                  (null != (n = this._outcomes[r]) ? n : 0) + 1);
            }
          }),
          (t.prototype._flushOutcomes = function () {
            if (this.options.sendClientReports) {
              var t = this._outcomes;
              if (((this._outcomes = {}), Object.keys(t).length)) {
                At &&
                  f.c.log("Flushing outcomes:\n" + JSON.stringify(t, null, 2));
                var e,
                  n,
                  r,
                  i = $(this._api.dsn, this._api.tunnel),
                  o = Object.keys(t).map(function (e) {
                    var n = Object(c.c)(e.split(":"), 2),
                      r = n[0];
                    return { reason: n[1], category: r, quantity: t[e] };
                  }),
                  a =
                    ((e = o),
                    Y(
                      (n = this._api.tunnel && k(this._api.dsn))
                        ? { dsn: n }
                        : {},
                      [
                        [
                          { type: "client_report" },
                          {
                            timestamp: r || Object(L.b)(),
                            discarded_events: e,
                          },
                        ],
                      ]
                    ));
                try {
                  Rt(i, G(a));
                } catch (t) {
                  At && f.c.error(t);
                }
              } else At && f.c.log("No outcomes to flush");
            }
          }),
          (t.prototype._handleResponse = function (t) {
            var e = t.requestType,
              n = t.response,
              r = t.headers,
              i = t.resolve,
              o = t.reject,
              a = Et(n.status);
            (this._rateLimits = Tt(this._rateLimits, r)),
              this._isRateLimited(e) &&
                At &&
                f.c.warn(
                  "Too many " +
                    e +
                    " requests, backing off until: " +
                    this._disabledUntil(e)
                ),
              "success" !== a ? o(n) : i({ status: a });
          }),
          (t.prototype._disabledUntil = function (t) {
            var e = It(t);
            return new Date(wt(this._rateLimits, e));
          }),
          (t.prototype._isRateLimited = function (t) {
            var e = It(t);
            return St(this._rateLimits, e);
          }),
          t
        );
      })(),
      Mt = (function (t) {
        function e(e, n) {
          void 0 === n && (n = Dt());
          var r = t.call(this, e) || this;
          return (r._fetch = n), r;
        }
        return (
          Object(c.b)(e, t),
          (e.prototype._sendRequest = function (t, e) {
            var n = this;
            if (this._isRateLimited(t.type))
              return (
                this.recordLostEvent("ratelimit_backoff", t.type),
                Promise.reject({
                  event: e,
                  type: t.type,
                  reason:
                    "Transport for " +
                    t.type +
                    " requests locked till " +
                    this._disabledUntil(t.type) +
                    " due to too many requests.",
                  status: 429,
                })
              );
            var r = {
              body: t.body,
              method: "POST",
              referrerPolicy: Object(tt.e)() ? "origin" : "",
            };
            return (
              void 0 !== this.options.fetchParameters &&
                Object.assign(r, this.options.fetchParameters),
              void 0 !== this.options.headers &&
                (r.headers = this.options.headers),
              this._buffer
                .add(function () {
                  return new x.a(function (e, i) {
                    n._fetch(t.url, r)
                      .then(function (r) {
                        var o = {
                          "x-sentry-rate-limits": r.headers.get(
                            "X-Sentry-Rate-Limits"
                          ),
                          "retry-after": r.headers.get("Retry-After"),
                        };
                        n._handleResponse({
                          requestType: t.type,
                          response: r,
                          headers: o,
                          resolve: e,
                          reject: i,
                        });
                      })
                      .catch(i);
                  });
                })
                .then(void 0, function (e) {
                  throw (
                    (e instanceof S
                      ? n.recordLostEvent("queue_overflow", t.type)
                      : n.recordLostEvent("network_error", t.type),
                    e)
                  );
                })
            );
          }),
          e
        );
      })(qt);
    var Ht = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          Object(c.b)(e, t),
          (e.prototype._sendRequest = function (t, e) {
            var n = this;
            return this._isRateLimited(t.type)
              ? (this.recordLostEvent("ratelimit_backoff", t.type),
                Promise.reject({
                  event: e,
                  type: t.type,
                  reason:
                    "Transport for " +
                    t.type +
                    " requests locked till " +
                    this._disabledUntil(t.type) +
                    " due to too many requests.",
                  status: 429,
                }))
              : this._buffer
                  .add(function () {
                    return new x.a(function (e, r) {
                      var i = new XMLHttpRequest();
                      for (var o in ((i.onreadystatechange = function () {
                        if (4 === i.readyState) {
                          var o = {
                            "x-sentry-rate-limits": i.getResponseHeader(
                              "X-Sentry-Rate-Limits"
                            ),
                            "retry-after": i.getResponseHeader("Retry-After"),
                          };
                          n._handleResponse({
                            requestType: t.type,
                            response: i,
                            headers: o,
                            resolve: e,
                            reject: r,
                          });
                        }
                      }),
                      i.open("POST", t.url),
                      n.options.headers))
                        Object.prototype.hasOwnProperty.call(
                          n.options.headers,
                          o
                        ) && i.setRequestHeader(o, n.options.headers[o]);
                      i.send(t.body);
                    });
                  })
                  .then(void 0, function (e) {
                    throw (
                      (e instanceof S
                        ? n.recordLostEvent("queue_overflow", t.type)
                        : n.recordLostEvent("network_error", t.type),
                      e)
                    );
                  });
          }),
          e
        );
      })(qt),
      Ft = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          Object(c.b)(e, t),
          (e.prototype.eventFromException = function (t, e) {
            return (function (t, e, n) {
              var r = xt(t, (e && e.syntheticException) || void 0, n);
              return (
                Object(p.a)(r),
                (r.level = K.Error),
                e && e.event_id && (r.event_id = e.event_id),
                Object(x.c)(r)
              );
            })(t, e, this._options.attachStacktrace);
          }),
          (e.prototype.eventFromMessage = function (t, e, n) {
            return (
              void 0 === e && (e = K.Info),
              (function (t, e, n, r) {
                void 0 === e && (e = K.Info);
                var i = Ot(t, (n && n.syntheticException) || void 0, r);
                return (
                  (i.level = e),
                  n && n.event_id && (i.event_id = n.event_id),
                  Object(x.c)(i)
                );
              })(t, e, n, this._options.attachStacktrace)
            );
          }),
          (e.prototype._setupTransport = function () {
            if (!this._options.dsn)
              return t.prototype._setupTransport.call(this);
            var e,
              n,
              r = Object(c.a)(Object(c.a)({}, this._options.transportOptions), {
                dsn: this._options.dsn,
                tunnel: this._options.tunnel,
                sendClientReports: this._options.sendClientReports,
                _metadata: this._options._metadata,
              }),
              i = H(r.dsn, r._metadata, r.tunnel),
              o = $(i.dsn, i.tunnel);
            if (this._options.transport) return new this._options.transport(r);
            if (Object(tt.b)()) {
              var a = Object(c.a)({}, r.fetchParameters);
              return (
                (this._newTransport =
                  ((e = { requestOptions: a, url: o }),
                  void 0 === n && (n = Dt()),
                  kt({ bufferSize: e.bufferSize }, function (t) {
                    var r = Object(c.a)(
                      {
                        body: t.body,
                        method: "POST",
                        referrerPolicy: "origin",
                      },
                      e.requestOptions
                    );
                    return n(e.url, r).then(function (t) {
                      return t.text().then(function (e) {
                        return {
                          body: e,
                          headers: {
                            "x-sentry-rate-limits": t.headers.get(
                              "X-Sentry-Rate-Limits"
                            ),
                            "retry-after": t.headers.get("Retry-After"),
                          },
                          reason: t.statusText,
                          statusCode: t.status,
                        };
                      });
                    });
                  }))),
                new Mt(r)
              );
            }
            return (
              (this._newTransport = (function (t) {
                return kt({ bufferSize: t.bufferSize }, function (e) {
                  return new x.a(function (n, r) {
                    var i = new XMLHttpRequest();
                    for (var o in ((i.onreadystatechange = function () {
                      if (4 === i.readyState) {
                        var t = {
                          body: i.response,
                          headers: {
                            "x-sentry-rate-limits": i.getResponseHeader(
                              "X-Sentry-Rate-Limits"
                            ),
                            "retry-after": i.getResponseHeader("Retry-After"),
                          },
                          reason: i.statusText,
                          statusCode: i.status,
                        };
                        n(t);
                      }
                    }),
                    i.open("POST", t.url),
                    t.headers))
                      Object.prototype.hasOwnProperty.call(t.headers, o) &&
                        i.setRequestHeader(o, t.headers[o]);
                    i.send(e.body);
                  });
                });
              })({ url: o, headers: r.headers })),
              new Ht(r)
            );
          }),
          e
        );
      })(Z);
    function Bt(t) {
      for (var e = [], n = 1; n < arguments.length; n++)
        e[n - 1] = arguments[n];
      var r = Object(b.b)();
      if (r && r[t]) return r[t].apply(r, Object(c.e)(e));
      throw new Error(
        "No hub defined or " +
          t +
          " was not found on the hub, please open a bug report."
      );
    }
    function Ut(t, e) {
      return Bt("captureException", t, {
        captureContext: e,
        originalException: t,
        syntheticException: new Error("Sentry syntheticException"),
      });
    }
    function Wt(t) {
      Bt("withScope", t);
    }
    var zt = Object(_.a)(),
      $t = 0;
    function Yt() {
      return $t > 0;
    }
    function Gt() {
      ($t += 1),
        setTimeout(function () {
          $t -= 1;
        });
    }
    function Xt(t, e, n) {
      if ((void 0 === e && (e = {}), "function" != typeof t)) return t;
      try {
        var r = t.__sentry_wrapped__;
        if (r) return r;
        if (Object(u.f)(t)) return t;
      } catch (e) {
        return t;
      }
      var i = function () {
        var r = Array.prototype.slice.call(arguments);
        try {
          n && "function" == typeof n && n.apply(this, arguments);
          var i = r.map(function (t) {
            return Xt(t, e);
          });
          return t.apply(this, i);
        } catch (t) {
          throw (
            (Gt(),
            Wt(function (n) {
              n.addEventProcessor(function (t) {
                return (
                  e.mechanism &&
                    (Object(p.b)(t, void 0, void 0),
                    Object(p.a)(t, e.mechanism)),
                  (t.extra = Object(c.a)(Object(c.a)({}, t.extra), {
                    arguments: r,
                  })),
                  t
                );
              }),
                Ut(t);
            }),
            t)
          );
        }
      };
      try {
        for (var o in t)
          Object.prototype.hasOwnProperty.call(t, o) && (i[o] = t[o]);
      } catch (t) {}
      Object(u.g)(i, t), Object(u.a)(t, "__sentry_wrapped__", i);
      try {
        Object.getOwnPropertyDescriptor(i, "name").configurable &&
          Object.defineProperty(i, "name", {
            get: function () {
              return t.name;
            },
          });
      } catch (t) {}
      return i;
    }
    function Vt(t) {
      if ((void 0 === t && (t = {}), zt.document))
        if (t.eventId)
          if (t.dsn) {
            var e = zt.document.createElement("script");
            (e.async = !0),
              (e.src = (function (t, e) {
                var n = N(t),
                  r = F(n) + "embed/error-page/",
                  i = "dsn=" + k(n);
                for (var o in e)
                  if ("dsn" !== o)
                    if ("user" === o) {
                      if (!e.user) continue;
                      e.user.name &&
                        (i += "&name=" + encodeURIComponent(e.user.name)),
                        e.user.email &&
                          (i += "&email=" + encodeURIComponent(e.user.email));
                    } else
                      i +=
                        "&" +
                        encodeURIComponent(o) +
                        "=" +
                        encodeURIComponent(e[o]);
                return r + "?" + i;
              })(t.dsn, t)),
              t.onLoad && (e.onload = t.onLoad);
            var n = zt.document.head || zt.document.body;
            n && n.appendChild(e);
          } else At && f.c.error("Missing dsn option in showReportDialog call");
        else At && f.c.error("Missing eventId option in showReportDialog call");
    }
    var Jt = n(32),
      Kt = ["fatal", "error", "warning", "log", "info", "debug", "critical"];
    function Qt(t) {
      return "warn" === t
        ? K.Warning
        : (function (t) {
            return -1 !== Kt.indexOf(t);
          })(t)
        ? t
        : K.Log;
    }
    var Zt = (function () {
      function t(e) {
        (this.name = t.id),
          (this._options = Object(c.a)(
            {
              console: !0,
              dom: !0,
              fetch: !0,
              history: !0,
              sentry: !0,
              xhr: !0,
            },
            e
          ));
      }
      return (
        (t.prototype.addSentryBreadcrumb = function (t) {
          this._options.sentry &&
            Object(b.b)().addBreadcrumb(
              {
                category:
                  "sentry." +
                  ("transaction" === t.type ? "transaction" : "event"),
                event_id: t.event_id,
                level: t.level,
                message: Object(p.d)(t),
              },
              { event: t }
            );
        }),
        (t.prototype.setupOnce = function () {
          var t;
          this._options.console && Object(O.a)("console", te),
            this._options.dom &&
              Object(O.a)(
                "dom",
                ((t = this._options.dom),
                function (e) {
                  var n,
                    r = "object" == typeof t ? t.serializeAttribute : void 0;
                  "string" == typeof r && (r = [r]);
                  try {
                    n = e.event.target
                      ? Object(Jt.b)(e.event.target, r)
                      : Object(Jt.b)(e.event, r);
                  } catch (t) {
                    n = "<unknown>";
                  }
                  0 !== n.length &&
                    Object(b.b)().addBreadcrumb(
                      { category: "ui." + e.name, message: n },
                      { event: e.event, name: e.name, global: e.global }
                    );
                })
              ),
            this._options.xhr && Object(O.a)("xhr", ee),
            this._options.fetch && Object(O.a)("fetch", ne),
            this._options.history && Object(O.a)("history", re);
        }),
        (t.id = "Breadcrumbs"),
        t
      );
    })();
    function te(t) {
      var e = {
        category: "console",
        data: { arguments: t.args, logger: "console" },
        level: Qt(t.level),
        message: Object(d.b)(t.args, " "),
      };
      if ("assert" === t.level) {
        if (!1 !== t.args[0]) return;
        (e.message =
          "Assertion failed: " +
          (Object(d.b)(t.args.slice(1), " ") || "console.assert")),
          (e.data.arguments = t.args.slice(1));
      }
      Object(b.b)().addBreadcrumb(e, { input: t.args, level: t.level });
    }
    function ee(t) {
      if (t.endTimestamp) {
        if (t.xhr.__sentry_own_request__) return;
        var e = t.xhr.__sentry_xhr__ || {},
          n = e.method,
          r = e.url,
          i = e.status_code,
          o = e.body;
        Object(b.b)().addBreadcrumb(
          {
            category: "xhr",
            data: { method: n, url: r, status_code: i },
            type: "http",
          },
          { xhr: t.xhr, input: o }
        );
      } else;
    }
    function ne(t) {
      t.endTimestamp &&
        ((t.fetchData.url.match(/sentry_key/) &&
          "POST" === t.fetchData.method) ||
          (t.error
            ? Object(b.b)().addBreadcrumb(
                {
                  category: "fetch",
                  data: t.fetchData,
                  level: K.Error,
                  type: "http",
                },
                { data: t.error, input: t.args }
              )
            : Object(b.b)().addBreadcrumb(
                {
                  category: "fetch",
                  data: Object(c.a)(Object(c.a)({}, t.fetchData), {
                    status_code: t.response.status,
                  }),
                  type: "http",
                },
                { input: t.args, response: t.response }
              )));
    }
    function re(t) {
      var e = Object(_.a)(),
        n = t.from,
        r = t.to,
        i = Object(p.e)(e.location.href),
        o = Object(p.e)(n),
        a = Object(p.e)(r);
      o.path || (o = i),
        i.protocol === a.protocol && i.host === a.host && (r = a.relative),
        i.protocol === o.protocol && i.host === o.host && (n = o.relative),
        Object(b.b)().addBreadcrumb({
          category: "navigation",
          data: { from: n, to: r },
        });
    }
    var ie = (function (t) {
        function e(e) {
          void 0 === e && (e = {});
          return (
            (e._metadata = e._metadata || {}),
            (e._metadata.sdk = e._metadata.sdk || {
              name: "sentry.javascript.browser",
              packages: [{ name: "npm:@sentry/browser", version: "6.19.7" }],
              version: "6.19.7",
            }),
            t.call(this, Ft, e) || this
          );
        }
        return (
          Object(c.b)(e, t),
          (e.prototype.showReportDialog = function (t) {
            void 0 === t && (t = {}),
              Object(_.a)().document &&
                (this._isEnabled()
                  ? Vt(
                      Object(c.a)(Object(c.a)({}, t), {
                        dsn: t.dsn || this.getDsn(),
                      })
                    )
                  : At &&
                    f.c.error(
                      "Trying to call showReportDialog with Sentry Client disabled"
                    ));
          }),
          (e.prototype._prepareEvent = function (e, n, r) {
            return (
              (e.platform = e.platform || "javascript"),
              t.prototype._prepareEvent.call(this, e, n, r)
            );
          }),
          (e.prototype._sendEvent = function (e) {
            var n = this.getIntegration(Zt);
            n && n.addSentryBreadcrumb(e), t.prototype._sendEvent.call(this, e);
          }),
          e
        );
      })(M),
      oe = [
        "EventTarget",
        "Window",
        "Node",
        "ApplicationCache",
        "AudioTrackList",
        "ChannelMergerNode",
        "CryptoOperation",
        "EventSource",
        "FileReader",
        "HTMLUnknownElement",
        "IDBDatabase",
        "IDBRequest",
        "IDBTransaction",
        "KeyOperation",
        "MediaController",
        "MessagePort",
        "ModalWindow",
        "Notification",
        "SVGElementInstance",
        "Screen",
        "TextTrack",
        "TextTrackCue",
        "TextTrackList",
        "WebSocket",
        "WebSocketWorker",
        "Worker",
        "XMLHttpRequest",
        "XMLHttpRequestEventTarget",
        "XMLHttpRequestUpload",
      ],
      ae = (function () {
        function t(e) {
          (this.name = t.id),
            (this._options = Object(c.a)(
              {
                XMLHttpRequest: !0,
                eventTarget: !0,
                requestAnimationFrame: !0,
                setInterval: !0,
                setTimeout: !0,
              },
              e
            ));
        }
        return (
          (t.prototype.setupOnce = function () {
            var t = Object(_.a)();
            this._options.setTimeout && Object(u.e)(t, "setTimeout", se),
              this._options.setInterval && Object(u.e)(t, "setInterval", se),
              this._options.requestAnimationFrame &&
                Object(u.e)(t, "requestAnimationFrame", ce),
              this._options.XMLHttpRequest &&
                "XMLHttpRequest" in t &&
                Object(u.e)(XMLHttpRequest.prototype, "send", ue);
            var e = this._options.eventTarget;
            e && (Array.isArray(e) ? e : oe).forEach(le);
          }),
          (t.id = "TryCatch"),
          t
        );
      })();
    function se(t) {
      return function () {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        var r = e[0];
        return (
          (e[0] = Xt(r, {
            mechanism: {
              data: { function: Object(et.b)(t) },
              handled: !0,
              type: "instrument",
            },
          })),
          t.apply(this, e)
        );
      };
    }
    function ce(t) {
      return function (e) {
        return t.apply(this, [
          Xt(e, {
            mechanism: {
              data: {
                function: "requestAnimationFrame",
                handler: Object(et.b)(t),
              },
              handled: !0,
              type: "instrument",
            },
          }),
        ]);
      };
    }
    function ue(t) {
      return function () {
        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
        var r = this,
          i = ["onload", "onerror", "onprogress", "onreadystatechange"];
        return (
          i.forEach(function (t) {
            t in r &&
              "function" == typeof r[t] &&
              Object(u.e)(r, t, function (e) {
                var n = {
                    mechanism: {
                      data: { function: t, handler: Object(et.b)(e) },
                      handled: !0,
                      type: "instrument",
                    },
                  },
                  r = Object(u.f)(e);
                return (
                  r && (n.mechanism.data.handler = Object(et.b)(r)), Xt(e, n)
                );
              });
          }),
          t.apply(this, e)
        );
      };
    }
    function le(t) {
      var e = Object(_.a)(),
        n = e[t] && e[t].prototype;
      n &&
        n.hasOwnProperty &&
        n.hasOwnProperty("addEventListener") &&
        (Object(u.e)(n, "addEventListener", function (e) {
          return function (n, r, i) {
            try {
              "function" == typeof r.handleEvent &&
                (r.handleEvent = Xt(r.handleEvent.bind(r), {
                  mechanism: {
                    data: {
                      function: "handleEvent",
                      handler: Object(et.b)(r),
                      target: t,
                    },
                    handled: !0,
                    type: "instrument",
                  },
                }));
            } catch (t) {}
            return e.apply(this, [
              n,
              Xt(r, {
                mechanism: {
                  data: {
                    function: "addEventListener",
                    handler: Object(et.b)(r),
                    target: t,
                  },
                  handled: !0,
                  type: "instrument",
                },
              }),
              i,
            ]);
          };
        }),
        Object(u.e)(n, "removeEventListener", function (t) {
          return function (e, n, r) {
            var i = n;
            try {
              var o = i && i.__sentry_wrapped__;
              o && t.call(this, e, o, r);
            } catch (t) {}
            return t.call(this, e, i, r);
          };
        }));
    }
    var fe = (function () {
      function t(e) {
        (this.name = t.id),
          (this._installFunc = { onerror: pe, onunhandledrejection: de }),
          (this._options = Object(c.a)(
            { onerror: !0, onunhandledrejection: !0 },
            e
          ));
      }
      return (
        (t.prototype.setupOnce = function () {
          Error.stackTraceLimit = 50;
          var t,
            e = this._options;
          for (var n in e) {
            var r = this._installFunc[n];
            r &&
              e[n] &&
              ((t = n),
              At && f.c.log("Global Handler attached: " + t),
              r(),
              (this._installFunc[n] = void 0));
          }
        }),
        (t.id = "GlobalHandlers"),
        t
      );
    })();
    function pe() {
      Object(O.a)("error", function (t) {
        var e = Object(c.c)(ge(), 2),
          n = e[0],
          r = e[1];
        if (n.getIntegration(fe)) {
          var i = t.msg,
            o = t.url,
            a = t.line,
            s = t.column,
            u = t.error;
          if (!(Yt() || (u && u.__sentry_own_request__))) {
            var l =
              void 0 === u && Object(A.l)(i)
                ? (function (t, e, n, r) {
                    var i = Object(A.e)(t) ? t.message : t,
                      o = "Error",
                      a = i.match(
                        /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i
                      );
                    a && ((o = a[1]), (i = a[2]));
                    return he(
                      { exception: { values: [{ type: o, value: i }] } },
                      e,
                      n,
                      r
                    );
                  })(i, o, a, s)
                : he(xt(u || i, void 0, r, !1), o, a, s);
            (l.level = K.Error), ve(n, u, l, "onerror");
          }
        }
      });
    }
    function de() {
      Object(O.a)("unhandledrejection", function (t) {
        var e = Object(c.c)(ge(), 2),
          n = e[0],
          r = e[1];
        if (n.getIntegration(fe)) {
          var i = t;
          try {
            "reason" in t
              ? (i = t.reason)
              : "detail" in t && "reason" in t.detail && (i = t.detail.reason);
          } catch (t) {}
          if (Yt() || (i && i.__sentry_own_request__)) return !0;
          var o = Object(A.j)(i)
            ? {
                exception: {
                  values: [
                    {
                      type: "UnhandledRejection",
                      value:
                        "Non-Error promise rejection captured with value: " +
                        String(i),
                    },
                  ],
                },
              }
            : xt(i, void 0, r, !0);
          (o.level = K.Error), ve(n, i, o, "onunhandledrejection");
        }
      });
    }
    function he(t, e, n, r) {
      var i = (t.exception = t.exception || {}),
        o = (i.values = i.values || []),
        a = (o[0] = o[0] || {}),
        s = (a.stacktrace = a.stacktrace || {}),
        c = (s.frames = s.frames || []),
        u = isNaN(parseInt(r, 10)) ? void 0 : r,
        l = isNaN(parseInt(n, 10)) ? void 0 : n,
        f = Object(A.l)(e) && e.length > 0 ? e : Object(Jt.a)();
      return (
        0 === c.length &&
          c.push({
            colno: u,
            filename: f,
            function: "?",
            in_app: !0,
            lineno: l,
          }),
        t
      );
    }
    function ve(t, e, n, r) {
      Object(p.a)(n, { handled: !1, type: r }),
        t.captureEvent(n, { originalException: e });
    }
    function ge() {
      var t = Object(b.b)(),
        e = t.getClient();
      return [t, e && e.getOptions().attachStacktrace];
    }
    var me = (function () {
      function t(e) {
        void 0 === e && (e = {}),
          (this.name = t.id),
          (this._key = e.key || "cause"),
          (this._limit = e.limit || 5);
      }
      return (
        (t.prototype.setupOnce = function () {
          Object(j.b)(function (e, n) {
            var r = Object(b.b)().getIntegration(t);
            return r
              ? (function (t, e, n, r) {
                  if (
                    !(
                      n.exception &&
                      n.exception.values &&
                      r &&
                      Object(A.g)(r.originalException, Error)
                    )
                  )
                    return n;
                  var i = (function t(e, n, r, i) {
                    void 0 === i && (i = []);
                    if (!Object(A.g)(n[r], Error) || i.length + 1 >= e)
                      return i;
                    var o = gt(n[r]);
                    return t(e, n[r], r, Object(c.e)([o], i));
                  })(e, r.originalException, t);
                  return (
                    (n.exception.values = Object(c.e)(i, n.exception.values)), n
                  );
                })(r._key, r._limit, e, n)
              : e;
          });
        }),
        (t.id = "LinkedErrors"),
        t
      );
    })();
    var ye = (function () {
      function t() {
        this.name = t.id;
      }
      return (
        (t.prototype.setupOnce = function (e, n) {
          e(function (e) {
            var r = n().getIntegration(t);
            if (r) {
              try {
                if (
                  (function (t, e) {
                    if (!e) return !1;
                    if (
                      (function (t, e) {
                        var n = t.message,
                          r = e.message;
                        if (!n && !r) return !1;
                        if ((n && !r) || (!n && r)) return !1;
                        if (n !== r) return !1;
                        if (!_e(t, e)) return !1;
                        if (!be(t, e)) return !1;
                        return !0;
                      })(t, e)
                    )
                      return !0;
                    if (
                      (function (t, e) {
                        var n = xe(e),
                          r = xe(t);
                        if (!n || !r) return !1;
                        if (n.type !== r.type || n.value !== r.value) return !1;
                        if (!_e(t, e)) return !1;
                        if (!be(t, e)) return !1;
                        return !0;
                      })(t, e)
                    )
                      return !0;
                    return !1;
                  })(e, r._previousEvent)
                )
                  return (
                    At &&
                      f.c.warn(
                        "Event dropped due to being a duplicate of previously captured event."
                      ),
                    null
                  );
              } catch (t) {
                return (r._previousEvent = e);
              }
              return (r._previousEvent = e);
            }
            return e;
          });
        }),
        (t.id = "Dedupe"),
        t
      );
    })();
    function be(t, e) {
      var n = Oe(t),
        r = Oe(e);
      if (!n && !r) return !0;
      if ((n && !r) || (!n && r)) return !1;
      if (((n = n), (r = r).length !== n.length)) return !1;
      for (var i = 0; i < r.length; i++) {
        var o = r[i],
          a = n[i];
        if (
          o.filename !== a.filename ||
          o.lineno !== a.lineno ||
          o.colno !== a.colno ||
          o.function !== a.function
        )
          return !1;
      }
      return !0;
    }
    function _e(t, e) {
      var n = t.fingerprint,
        r = e.fingerprint;
      if (!n && !r) return !0;
      if ((n && !r) || (!n && r)) return !1;
      (n = n), (r = r);
      try {
        return !(n.join("") !== r.join(""));
      } catch (t) {
        return !1;
      }
    }
    function xe(t) {
      return t.exception && t.exception.values && t.exception.values[0];
    }
    function Oe(t) {
      var e = t.exception;
      if (e)
        try {
          return e.values[0].stacktrace.frames;
        } catch (t) {
          return;
        }
      else if (t.stacktrace) return t.stacktrace.frames;
    }
    var je = Object(_.a)(),
      we = (function () {
        function t() {
          this.name = t.id;
        }
        return (
          (t.prototype.setupOnce = function () {
            Object(j.b)(function (e) {
              if (Object(b.b)().getIntegration(t)) {
                if (!je.navigator && !je.location && !je.document) return e;
                var n =
                    (e.request && e.request.url) ||
                    (je.location && je.location.href),
                  r = (je.document || {}).referrer,
                  i = (je.navigator || {}).userAgent,
                  o = Object(c.a)(
                    Object(c.a)(
                      Object(c.a)({}, e.request && e.request.headers),
                      r && { Referer: r }
                    ),
                    i && { "User-Agent": i }
                  ),
                  a = Object(c.a)(Object(c.a)({}, n && { url: n }), {
                    headers: o,
                  });
                return Object(c.a)(Object(c.a)({}, e), { request: a });
              }
              return e;
            });
          }),
          (t.id = "UserAgent"),
          t
        );
      })(),
      Se = [
        new r.InboundFilters(),
        new r.FunctionToString(),
        new ae(),
        new Zt(),
        new fe(),
        new me(),
        new ye(),
        new we(),
      ];
    function Te(t) {
      if (
        (void 0 === t && (t = {}),
        void 0 === t.defaultIntegrations && (t.defaultIntegrations = Se),
        void 0 === t.release)
      ) {
        var e = Object(_.a)();
        e.SENTRY_RELEASE &&
          e.SENTRY_RELEASE.id &&
          (t.release = e.SENTRY_RELEASE.id);
      }
      void 0 === t.autoSessionTracking && (t.autoSessionTracking = !0),
        void 0 === t.sendClientReports && (t.sendClientReports = !0),
        (function (t, e) {
          !0 === e.debug &&
            (h
              ? f.c.enable()
              : console.warn(
                  "[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."
                ));
          var n = Object(b.b)(),
            r = n.getScope();
          r && r.update(e.initialScope);
          var i = new t(e);
          n.bindClient(i);
        })(ie, t),
        t.autoSessionTracking &&
          (function () {
            if (void 0 === Object(_.a)().document)
              return void (
                At &&
                f.c.warn(
                  "Session tracking in non-browser environment with @sentry/browser is not supported."
                )
              );
            var t = Object(b.b)();
            if (!t.captureSession) return;
            Ee(t),
              Object(O.a)("history", function (t) {
                var e = t.from,
                  n = t.to;
                void 0 !== e && e !== n && Ee(Object(b.b)());
              });
          })();
    }
    function Ee(t) {
      t.startSession({ ignoreDuration: !0 }), t.captureSession();
    }
    function ke(t) {
      (t._metadata = t._metadata || {}),
        (t._metadata.sdk = t._metadata.sdk || {
          name: "sentry.javascript.react",
          packages: [{ name: "npm:@sentry/react", version: "6.19.7" }],
          version: "6.19.7",
        }),
        Te(t);
    }
    var Ce = n(15),
      Ne = n(1),
      Ae = (function () {
        function t(e) {
          void 0 === e && (e = {}),
            (this.name = t.id),
            (this._router = e.router || e.app),
            (this._methods = (Array.isArray(e.methods) ? e.methods : []).concat(
              "use"
            ));
        }
        return (
          (t.prototype.setupOnce = function () {
            this._router
              ? (function (t, e) {
                  void 0 === e && (e = []);
                  e.forEach(function (e) {
                    return (function (t, e) {
                      var n = t[e];
                      return (
                        (t[e] = function () {
                          for (var t = [], r = 0; r < arguments.length; r++)
                            t[r] = arguments[r];
                          return n.call.apply(n, Object(c.e)([this], De(t, e)));
                        }),
                        t
                      );
                    })(t, e);
                  });
                })(this._router, this._methods)
              : Ne.a &&
                f.c.error("ExpressIntegration is missing an Express instance");
          }),
          (t.id = "Express"),
          t
        );
      })();
    function Le(t, e) {
      var n = t.length;
      switch (n) {
        case 2:
          return function (n, r) {
            var i = r.__sentry_transaction;
            if (i) {
              var o = i.startChild({
                description: t.name,
                op: "express.middleware." + e,
              });
              r.once("finish", function () {
                o.finish();
              });
            }
            return t.call(this, n, r);
          };
        case 3:
          return function (n, r, i) {
            var o,
              a =
                null === (o = r.__sentry_transaction) || void 0 === o
                  ? void 0
                  : o.startChild({
                      description: t.name,
                      op: "express.middleware." + e,
                    });
            t.call(this, n, r, function () {
              for (var t, e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
              null === (t = a) || void 0 === t || t.finish(),
                i.call.apply(i, Object(c.e)([this], e));
            });
          };
        case 4:
          return function (n, r, i, o) {
            var a,
              s =
                null === (a = i.__sentry_transaction) || void 0 === a
                  ? void 0
                  : a.startChild({
                      description: t.name,
                      op: "express.middleware." + e,
                    });
            t.call(this, n, r, i, function () {
              for (var t, e = [], n = 0; n < arguments.length; n++)
                e[n] = arguments[n];
              null === (t = s) || void 0 === t || t.finish(),
                o.call.apply(o, Object(c.e)([this], e));
            });
          };
        default:
          throw new Error("Express middleware takes 2-4 arguments. Got: " + n);
      }
    }
    function De(t, e) {
      return t.map(function (t) {
        return "function" == typeof t
          ? Le(t, e)
          : Array.isArray(t)
          ? t.map(function (t) {
              return "function" == typeof t ? Le(t, e) : t;
            })
          : t;
      });
    }
    var Re = n(8),
      Ie = (function () {
        function t(e) {
          void 0 === e && (e = {}),
            (this.name = t.id),
            (this._usePgNative = !!e.usePgNative);
        }
        return (
          (t.prototype.setupOnce = function (t, e) {
            var n,
              r = Object(Re.c)("pg");
            if (r)
              if (
                !this._usePgNative ||
                (null === (n = r.native) || void 0 === n ? void 0 : n.Client)
              ) {
                var i = (this._usePgNative ? r.native : r).Client;
                Object(u.e)(i.prototype, "query", function (t) {
                  return function (n, r, i) {
                    var o,
                      a,
                      s,
                      c =
                        null ===
                          (a =
                            null === (o = e().getScope()) || void 0 === o
                              ? void 0
                              : o.getSpan()) || void 0 === a
                          ? void 0
                          : a.startChild({
                              description: "string" == typeof n ? n : n.text,
                              op: "db",
                            });
                    if ("function" == typeof i)
                      return t.call(this, n, r, function (t, e) {
                        var n;
                        null === (n = c) || void 0 === n || n.finish(), i(t, e);
                      });
                    if ("function" == typeof r)
                      return t.call(this, n, function (t, e) {
                        var n;
                        null === (n = c) || void 0 === n || n.finish(), r(t, e);
                      });
                    var u = void 0 !== r ? t.call(this, n, r) : t.call(this, n);
                    return Object(A.n)(u)
                      ? u.then(function (t) {
                          var e;
                          return (
                            null === (e = c) || void 0 === e || e.finish(), t
                          );
                        })
                      : (null === (s = c) || void 0 === s || s.finish(), u);
                  };
                });
              } else
                Ne.a &&
                  f.c.error(
                    "Postgres Integration was unable to access 'pg-native' bindings."
                  );
            else
              Ne.a &&
                f.c.error(
                  "Postgres Integration was unable to require `pg` package."
                );
          }),
          (t.id = "Postgres"),
          t
        );
      })(),
      Pe = (function () {
        function t() {
          this.name = t.id;
        }
        return (
          (t.prototype.setupOnce = function (t, e) {
            var n = Object(Re.c)("mysql/lib/Connection.js");
            n
              ? Object(u.e)(n, "createQuery", function (t) {
                  return function (n, r, i) {
                    var o,
                      a,
                      s =
                        null ===
                          (a =
                            null === (o = e().getScope()) || void 0 === o
                              ? void 0
                              : o.getSpan()) || void 0 === a
                          ? void 0
                          : a.startChild({
                              description: "string" == typeof n ? n : n.sql,
                              op: "db",
                            });
                    return "function" == typeof i
                      ? t.call(this, n, r, function (t, e, n) {
                          var r;
                          null === (r = s) || void 0 === r || r.finish(),
                            i(t, e, n);
                        })
                      : "function" == typeof r
                      ? t.call(this, n, function (t, e, n) {
                          var i;
                          null === (i = s) || void 0 === i || i.finish(),
                            r(t, e, n);
                        })
                      : t.call(this, n, r, i);
                  };
                })
              : Ne.a &&
                f.c.error(
                  "Mysql Integration was unable to require `mysql` package."
                );
          }),
          (t.id = "Mysql"),
          t
        );
      })(),
      qe = [
        "aggregate",
        "bulkWrite",
        "countDocuments",
        "createIndex",
        "createIndexes",
        "deleteMany",
        "deleteOne",
        "distinct",
        "drop",
        "dropIndex",
        "dropIndexes",
        "estimatedDocumentCount",
        "find",
        "findOne",
        "findOneAndDelete",
        "findOneAndReplace",
        "findOneAndUpdate",
        "indexes",
        "indexExists",
        "indexInformation",
        "initializeOrderedBulkOp",
        "insertMany",
        "insertOne",
        "isCapped",
        "mapReduce",
        "options",
        "parallelCollectionScan",
        "rename",
        "replaceOne",
        "stats",
        "updateMany",
        "updateOne",
      ],
      Me = {
        bulkWrite: ["operations"],
        countDocuments: ["query"],
        createIndex: ["fieldOrSpec"],
        createIndexes: ["indexSpecs"],
        deleteMany: ["filter"],
        deleteOne: ["filter"],
        distinct: ["key", "query"],
        dropIndex: ["indexName"],
        find: ["query"],
        findOne: ["query"],
        findOneAndDelete: ["filter"],
        findOneAndReplace: ["filter", "replacement"],
        findOneAndUpdate: ["filter", "update"],
        indexExists: ["indexes"],
        insertMany: ["docs"],
        insertOne: ["doc"],
        mapReduce: ["map", "reduce"],
        rename: ["newName"],
        replaceOne: ["filter", "doc"],
        updateMany: ["filter", "update"],
        updateOne: ["filter", "update"],
      },
      He = (function () {
        function t(e) {
          void 0 === e && (e = {}),
            (this.name = t.id),
            (this._operations = Array.isArray(e.operations)
              ? e.operations
              : qe),
            (this._describeOperations =
              !("describeOperations" in e) || e.describeOperations),
            (this._useMongoose = !!e.useMongoose);
        }
        return (
          (t.prototype.setupOnce = function (t, e) {
            var n = this._useMongoose ? "mongoose" : "mongodb",
              r = Object(Re.c)(n);
            r
              ? this._instrumentOperations(r.Collection, this._operations, e)
              : Ne.a &&
                f.c.error(
                  "Mongo Integration was unable to require `" + n + "` package."
                );
          }),
          (t.prototype._instrumentOperations = function (t, e, n) {
            var r = this;
            e.forEach(function (e) {
              return r._patchOperation(t, e, n);
            });
          }),
          (t.prototype._patchOperation = function (t, e, n) {
            if (e in t.prototype) {
              var r = this._getSpanContextFromOperationArguments.bind(this);
              Object(u.e)(t.prototype, e, function (t) {
                return function () {
                  for (var i, o, a, s, u = [], l = 0; l < arguments.length; l++)
                    u[l] = arguments[l];
                  var f = u[u.length - 1],
                    p = n().getScope(),
                    d = null === (i = p) || void 0 === i ? void 0 : i.getSpan();
                  if (
                    "function" != typeof f ||
                    ("mapReduce" === e && 2 === u.length)
                  ) {
                    var h =
                        null === (o = d) || void 0 === o
                          ? void 0
                          : o.startChild(r(this, e, u)),
                      v = t.call.apply(t, Object(c.e)([this], u));
                    return Object(A.n)(v)
                      ? v.then(function (t) {
                          var e;
                          return (
                            null === (e = h) || void 0 === e || e.finish(), t
                          );
                        })
                      : (null === (a = h) || void 0 === a || a.finish(), v);
                  }
                  var g =
                    null === (s = d) || void 0 === s
                      ? void 0
                      : s.startChild(r(this, e, u.slice(0, -1)));
                  return t.call.apply(
                    t,
                    Object(c.e)([this], u.slice(0, -1), [
                      function (t, e) {
                        var n;
                        null === (n = g) || void 0 === n || n.finish(), f(t, e);
                      },
                    ])
                  );
                };
              });
            }
          }),
          (t.prototype._getSpanContextFromOperationArguments = function (
            t,
            e,
            n
          ) {
            var r = {
                collectionName: t.collectionName,
                dbName: t.dbName,
                namespace: t.namespace,
              },
              i = { op: "db", description: e, data: r },
              o = Me[e],
              a = Array.isArray(this._describeOperations)
                ? this._describeOperations.includes(e)
                : this._describeOperations;
            if (!o || !a) return i;
            try {
              if ("mapReduce" === e) {
                var s = Object(c.c)(n, 2),
                  u = s[0],
                  l = s[1];
                (r[o[0]] = "string" == typeof u ? u : u.name || "<anonymous>"),
                  (r[o[1]] =
                    "string" == typeof l ? l : l.name || "<anonymous>");
              } else
                for (var f = 0; f < o.length; f++)
                  r[o[f]] = JSON.stringify(n[f]);
            } catch (t) {}
            return i;
          }),
          (t.id = "Mongo"),
          t
        );
      })(),
      Fe = n(18),
      Be = n(3),
      Ue = n(30),
      We = n(13),
      ze = Object(_.a)();
    var $e = function (t, e, n) {
        var r;
        return function (i) {
          e.value >= 0 &&
            (i || n) &&
            ((e.delta = e.value - (r || 0)),
            (e.delta || void 0 === r) && ((r = e.value), t(e)));
        };
      },
      Ye = function (t, e) {
        return {
          name: t,
          value: null != e ? e : -1,
          delta: 0,
          entries: [],
          id:
            "v2-" +
            Date.now() +
            "-" +
            (Math.floor(8999999999999 * Math.random()) + 1e12),
        };
      },
      Ge = function (t, e) {
        try {
          if (PerformanceObserver.supportedEntryTypes.includes(t)) {
            if ("first-input" === t && !("PerformanceEventTiming" in self))
              return;
            var n = new PerformanceObserver(function (t) {
              return t.getEntries().map(e);
            });
            return n.observe({ type: t, buffered: !0 }), n;
          }
        } catch (t) {}
      },
      Xe = function (t, e) {
        var n = function (r) {
          ("pagehide" !== r.type &&
            "hidden" !== Object(_.a)().document.visibilityState) ||
            (t(r),
            e &&
              (removeEventListener("visibilitychange", n, !0),
              removeEventListener("pagehide", n, !0)));
        };
        addEventListener("visibilitychange", n, !0),
          addEventListener("pagehide", n, !0);
      },
      Ve = -1,
      Je = function () {
        return (
          Ve < 0 &&
            ((Ve =
              "hidden" === Object(_.a)().document.visibilityState ? 0 : 1 / 0),
            Xe(function (t) {
              var e = t.timeStamp;
              Ve = e;
            }, !0)),
          {
            get firstHiddenTime() {
              return Ve;
            },
          }
        );
      },
      Ke = {},
      Qe = Object(_.a)(),
      Ze = (function () {
        function t(t) {
          void 0 === t && (t = !1),
            (this._reportAllChanges = t),
            (this._measurements = {}),
            (this._performanceCursor = 0),
            !Object(Re.b)() &&
              Qe &&
              Qe.performance &&
              Qe.document &&
              (Qe.performance.mark &&
                Qe.performance.mark("sentry-tracing-init"),
              this._trackCLS(),
              this._trackLCP(),
              this._trackFID());
        }
        return (
          (t.prototype.addPerformanceEntries = function (t) {
            var e = this;
            if (Qe && Qe.performance && Qe.performance.getEntries && L.a) {
              Ne.a &&
                f.c.log(
                  "[Tracing] Adding & adjusting spans using Performance API"
                );
              var n,
                r,
                i = Object(Be.c)(L.a);
              if (
                (Qe.performance
                  .getEntries()
                  .slice(this._performanceCursor)
                  .forEach(function (o) {
                    var a = Object(Be.c)(o.startTime),
                      s = Object(Be.c)(o.duration);
                    if (!("navigation" === t.op && i + a < t.startTimestamp))
                      switch (o.entryType) {
                        case "navigation":
                          !(function (t, e, n) {
                            [
                              "unloadEvent",
                              "redirect",
                              "domContentLoadedEvent",
                              "loadEvent",
                              "connect",
                            ].forEach(function (r) {
                              tn(t, e, r, n);
                            }),
                              tn(
                                t,
                                e,
                                "secureConnection",
                                n,
                                "TLS/SSL",
                                "connectEnd"
                              ),
                              tn(
                                t,
                                e,
                                "fetch",
                                n,
                                "cache",
                                "domainLookupStart"
                              ),
                              tn(t, e, "domainLookup", n, "DNS"),
                              (function (t, e, n) {
                                en(t, {
                                  op: "browser",
                                  description: "request",
                                  startTimestamp:
                                    n + Object(Be.c)(e.requestStart),
                                  endTimestamp: n + Object(Be.c)(e.responseEnd),
                                }),
                                  en(t, {
                                    op: "browser",
                                    description: "response",
                                    startTimestamp:
                                      n + Object(Be.c)(e.responseStart),
                                    endTimestamp:
                                      n + Object(Be.c)(e.responseEnd),
                                  });
                              })(t, e, n);
                          })(t, o, i),
                            (n = i + Object(Be.c)(o.responseStart)),
                            (r = i + Object(Be.c)(o.requestStart));
                          break;
                        case "mark":
                        case "paint":
                        case "measure":
                          var c = (function (t, e, n, r, i) {
                              var o = i + n,
                                a = o + r;
                              return (
                                en(t, {
                                  description: e.name,
                                  endTimestamp: a,
                                  op: e.entryType,
                                  startTimestamp: o,
                                }),
                                o
                              );
                            })(t, o, a, s, i),
                            u = Je(),
                            l = o.startTime < u.firstHiddenTime;
                          "first-paint" === o.name &&
                            l &&
                            (Ne.a && f.c.log("[Measurements] Adding FP"),
                            (e._measurements.fp = { value: o.startTime }),
                            (e._measurements["mark.fp"] = { value: c })),
                            "first-contentful-paint" === o.name &&
                              l &&
                              (Ne.a && f.c.log("[Measurements] Adding FCP"),
                              (e._measurements.fcp = { value: o.startTime }),
                              (e._measurements["mark.fcp"] = { value: c }));
                          break;
                        case "resource":
                          var p = o.name.replace(Qe.location.origin, "");
                          !(function (t, e, n, r, i, o) {
                            if (
                              "xmlhttprequest" === e.initiatorType ||
                              "fetch" === e.initiatorType
                            )
                              return;
                            var a = {};
                            "transferSize" in e &&
                              (a["Transfer Size"] = e.transferSize);
                            "encodedBodySize" in e &&
                              (a["Encoded Body Size"] = e.encodedBodySize);
                            "decodedBodySize" in e &&
                              (a["Decoded Body Size"] = e.decodedBodySize);
                            var s = o + r;
                            en(t, {
                              description: n,
                              endTimestamp: s + i,
                              op: e.initiatorType
                                ? "resource." + e.initiatorType
                                : "resource",
                              startTimestamp: s,
                              data: a,
                            });
                          })(t, o, p, a, s, i);
                      }
                  }),
                (this._performanceCursor = Math.max(
                  performance.getEntries().length - 1,
                  0
                )),
                this._trackNavigator(t),
                "pageload" === t.op)
              ) {
                var o = Object(Be.c)(L.a);
                "number" == typeof n &&
                  (Ne.a && f.c.log("[Measurements] Adding TTFB"),
                  (this._measurements.ttfb = {
                    value: 1e3 * (n - t.startTimestamp),
                  }),
                  "number" == typeof r &&
                    r <= n &&
                    (this._measurements["ttfb.requestTime"] = {
                      value: 1e3 * (n - r),
                    })),
                  ["fcp", "fp", "lcp"].forEach(function (n) {
                    if (e._measurements[n] && !(o >= t.startTimestamp)) {
                      var r = e._measurements[n].value,
                        i = o + Object(Be.c)(r),
                        a = Math.abs(1e3 * (i - t.startTimestamp)),
                        s = a - r;
                      Ne.a &&
                        f.c.log(
                          "[Measurements] Normalized " +
                            n +
                            " from " +
                            r +
                            " to " +
                            a +
                            " (" +
                            s +
                            ")"
                        ),
                        (e._measurements[n].value = a);
                    }
                  }),
                  this._measurements["mark.fid"] &&
                    this._measurements.fid &&
                    en(t, {
                      description: "first input delay",
                      endTimestamp:
                        this._measurements["mark.fid"].value +
                        Object(Be.c)(this._measurements.fid.value),
                      op: "web.vitals",
                      startTimestamp: this._measurements["mark.fid"].value,
                    }),
                  "fcp" in this._measurements || delete this._measurements.cls,
                  t.setMeasurements(this._measurements),
                  (function (t, e, n) {
                    e &&
                      (Ne.a && f.c.log("[Measurements] Adding LCP Data"),
                      e.element &&
                        t.setTag("lcp.element", Object(Jt.b)(e.element)),
                      e.id && t.setTag("lcp.id", e.id),
                      e.url && t.setTag("lcp.url", e.url.trim().slice(0, 200)),
                      t.setTag("lcp.size", e.size));
                    n &&
                      n.sources &&
                      (Ne.a && f.c.log("[Measurements] Adding CLS Data"),
                      n.sources.forEach(function (e, n) {
                        return t.setTag(
                          "cls.source." + (n + 1),
                          Object(Jt.b)(e.node)
                        );
                      }));
                  })(t, this._lcpEntry, this._clsEntry),
                  t.setTag("sentry_reportAllChanges", this._reportAllChanges);
              }
            }
          }),
          (t.prototype._trackNavigator = function (t) {
            var e = Qe.navigator;
            if (e) {
              var n = e.connection;
              n &&
                (n.effectiveType &&
                  t.setTag("effectiveConnectionType", n.effectiveType),
                n.type && t.setTag("connectionType", n.type),
                nn(n.rtt) &&
                  (this._measurements["connection.rtt"] = { value: n.rtt }),
                nn(n.downlink) &&
                  (this._measurements["connection.downlink"] = {
                    value: n.downlink,
                  })),
                nn(e.deviceMemory) &&
                  t.setTag("deviceMemory", String(e.deviceMemory)),
                nn(e.hardwareConcurrency) &&
                  t.setTag(
                    "hardwareConcurrency",
                    String(e.hardwareConcurrency)
                  );
            }
          }),
          (t.prototype._trackCLS = function () {
            var t = this;
            !(function (t, e) {
              var n,
                r = Ye("CLS", 0),
                i = 0,
                o = [],
                a = function (t) {
                  if (t && !t.hadRecentInput) {
                    var e = o[0],
                      a = o[o.length - 1];
                    i &&
                    0 !== o.length &&
                    t.startTime - a.startTime < 1e3 &&
                    t.startTime - e.startTime < 5e3
                      ? ((i += t.value), o.push(t))
                      : ((i = t.value), (o = [t])),
                      i > r.value && ((r.value = i), (r.entries = o), n && n());
                  }
                },
                s = Ge("layout-shift", a);
              s &&
                ((n = $e(t, r, e)),
                Xe(function () {
                  s.takeRecords().map(a), n(!0);
                }));
            })(function (e) {
              var n = e.entries.pop();
              n &&
                (Ne.a && f.c.log("[Measurements] Adding CLS"),
                (t._measurements.cls = { value: e.value }),
                (t._clsEntry = n));
            });
          }),
          (t.prototype._trackLCP = function () {
            var t = this;
            !(function (t, e) {
              var n,
                r = Je(),
                i = Ye("LCP"),
                o = function (t) {
                  var e = t.startTime;
                  e < r.firstHiddenTime && ((i.value = e), i.entries.push(t)),
                    n && n();
                },
                a = Ge("largest-contentful-paint", o);
              if (a) {
                n = $e(t, i, e);
                var s = function () {
                  Ke[i.id] ||
                    (a.takeRecords().map(o),
                    a.disconnect(),
                    (Ke[i.id] = !0),
                    n(!0));
                };
                ["keydown", "click"].forEach(function (t) {
                  addEventListener(t, s, { once: !0, capture: !0 });
                }),
                  Xe(s, !0);
              }
            })(function (e) {
              var n = e.entries.pop();
              if (n) {
                var r = Object(Be.c)(L.a),
                  i = Object(Be.c)(n.startTime);
                Ne.a && f.c.log("[Measurements] Adding LCP"),
                  (t._measurements.lcp = { value: e.value }),
                  (t._measurements["mark.lcp"] = { value: r + i }),
                  (t._lcpEntry = n);
              }
            }, this._reportAllChanges);
          }),
          (t.prototype._trackFID = function () {
            var t = this;
            !(function (t, e) {
              var n,
                r = Je(),
                i = Ye("FID"),
                o = function (t) {
                  n &&
                    t.startTime < r.firstHiddenTime &&
                    ((i.value = t.processingStart - t.startTime),
                    i.entries.push(t),
                    n(!0));
                },
                a = Ge("first-input", o);
              a &&
                ((n = $e(t, i, e)),
                Xe(function () {
                  a.takeRecords().map(o), a.disconnect();
                }, !0));
            })(function (e) {
              var n = e.entries.pop();
              if (n) {
                var r = Object(Be.c)(L.a),
                  i = Object(Be.c)(n.startTime);
                Ne.a && f.c.log("[Measurements] Adding FID"),
                  (t._measurements.fid = { value: e.value }),
                  (t._measurements["mark.fid"] = { value: r + i });
              }
            });
          }),
          t
        );
      })();
    function tn(t, e, n, r, i, o) {
      var a = o ? e[o] : e[n + "End"],
        s = e[n + "Start"];
      s &&
        a &&
        en(t, {
          op: "browser",
          description: null != i ? i : n,
          startTimestamp: r + Object(Be.c)(s),
          endTimestamp: r + Object(Be.c)(a),
        });
    }
    function en(t, e) {
      var n = e.startTimestamp,
        r = Object(c.d)(e, ["startTimestamp"]);
      return (
        n && t.startTimestamp > n && (t.startTimestamp = n),
        t.startChild(Object(c.a)({ startTimestamp: n }, r))
      );
    }
    function nn(t) {
      return "number" == typeof t && isFinite(t);
    }
    var rn = {
      traceFetch: !0,
      traceXHR: !0,
      tracingOrigins: ["localhost", /^\//],
    };
    function on(t) {
      var e = Object(c.a)(Object(c.a)({}, rn), t),
        n = e.traceFetch,
        r = e.traceXHR,
        i = e.tracingOrigins,
        o = e.shouldCreateSpanForRequest,
        a = {},
        s = function (t) {
          if (a[t]) return a[t];
          var e = i;
          return (
            (a[t] =
              e.some(function (e) {
                return Object(d.a)(t, e);
              }) && !Object(d.a)(t, "sentry_key")),
            a[t]
          );
        },
        u = s;
      "function" == typeof o &&
        (u = function (t) {
          return s(t) && o(t);
        });
      var l = {};
      n &&
        Object(O.a)("fetch", function (t) {
          !(function (t, e, n) {
            if (!Object(Be.b)() || !t.fetchData || !e(t.fetchData.url)) return;
            if (t.endTimestamp) {
              var r = t.fetchData.__span;
              if (!r) return;
              return void (
                (o = n[r]) &&
                (t.response
                  ? o.setHttpStatus(t.response.status)
                  : t.error && o.setStatus("internal_error"),
                o.finish(),
                delete n[r])
              );
            }
            var i = Object(Be.a)();
            if (i) {
              var o = i.startChild({
                data: Object(c.a)(Object(c.a)({}, t.fetchData), {
                  type: "fetch",
                }),
                description: t.fetchData.method + " " + t.fetchData.url,
                op: "http.client",
              });
              (t.fetchData.__span = o.spanId), (n[o.spanId] = o);
              var a = (t.args[0] = t.args[0]),
                s = (t.args[1] = t.args[1] || {}),
                u = s.headers;
              Object(A.g)(a, Request) && (u = a.headers),
                u
                  ? "function" == typeof u.append
                    ? u.append("sentry-trace", o.toTraceparent())
                    : (u = Array.isArray(u)
                        ? Object(c.e)(u, [["sentry-trace", o.toTraceparent()]])
                        : Object(c.a)(Object(c.a)({}, u), {
                            "sentry-trace": o.toTraceparent(),
                          }))
                  : (u = { "sentry-trace": o.toTraceparent() }),
                (s.headers = u);
            }
          })(t, u, l);
        }),
        r &&
          Object(O.a)("xhr", function (t) {
            !(function (t, e, n) {
              if (
                !Object(Be.b)() ||
                (t.xhr && t.xhr.__sentry_own_request__) ||
                !(t.xhr && t.xhr.__sentry_xhr__ && e(t.xhr.__sentry_xhr__.url))
              )
                return;
              var r = t.xhr.__sentry_xhr__;
              if (t.endTimestamp) {
                var i = t.xhr.__sentry_xhr_span_id__;
                if (!i) return;
                return void (
                  (a = n[i]) &&
                  (a.setHttpStatus(r.status_code), a.finish(), delete n[i])
                );
              }
              var o = Object(Be.a)();
              if (o) {
                var a = o.startChild({
                  data: Object(c.a)(Object(c.a)({}, r.data), {
                    type: "xhr",
                    method: r.method,
                    url: r.url,
                  }),
                  description: r.method + " " + r.url,
                  op: "http.client",
                });
                if (
                  ((t.xhr.__sentry_xhr_span_id__ = a.spanId),
                  (n[t.xhr.__sentry_xhr_span_id__] = a),
                  t.xhr.setRequestHeader)
                )
                  try {
                    t.xhr.setRequestHeader("sentry-trace", a.toTraceparent());
                  } catch (t) {}
              }
            })(t, u, l);
          });
    }
    var an = Object(_.a)();
    var sn = Object(c.a)(
        {
          idleTimeout: Fe.a,
          markBackgroundTransactions: !0,
          maxTransactionDuration: 600,
          routingInstrumentation: function (t, e, n) {
            if (
              (void 0 === e && (e = !0),
              void 0 === n && (n = !0),
              an && an.location)
            ) {
              var r,
                i = an.location.href;
              e && (r = t({ name: an.location.pathname, op: "pageload" })),
                n &&
                  Object(O.a)("history", function (e) {
                    var n = e.to,
                      o = e.from;
                    void 0 === o && i && -1 !== i.indexOf(n)
                      ? (i = void 0)
                      : o !== n &&
                        ((i = void 0),
                        r &&
                          (Ne.a &&
                            f.c.log(
                              "[Tracing] Finishing current transaction with op: " +
                                r.op
                            ),
                          r.finish()),
                        (r = t({
                          name: an.location.pathname,
                          op: "navigation",
                        })));
                  });
            } else
              Ne.a &&
                f.c.warn(
                  "Could not initialize routing instrumentation due to invalid location"
                );
          },
          startTransactionOnLocationChange: !0,
          startTransactionOnPageLoad: !0,
        },
        rn
      ),
      cn = (function () {
        function t(e) {
          (this.name = t.id), (this._configuredIdleTimeout = void 0);
          var n = rn.tracingOrigins;
          e &&
            ((this._configuredIdleTimeout = e.idleTimeout),
            e.tracingOrigins &&
            Array.isArray(e.tracingOrigins) &&
            0 !== e.tracingOrigins.length
              ? (n = e.tracingOrigins)
              : Ne.a && (this._emitOptionsWarning = !0)),
            (this.options = Object(c.a)(Object(c.a)(Object(c.a)({}, sn), e), {
              tracingOrigins: n,
            }));
          var r = this.options._metricOptions;
          this._metrics = new Ze(r && r._reportAllChanges);
        }
        return (
          (t.prototype.setupOnce = function (t, e) {
            var n = this;
            (this._getCurrentHub = e),
              this._emitOptionsWarning &&
                (Ne.a &&
                  f.c.warn(
                    "[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace."
                  ),
                Ne.a &&
                  f.c.warn(
                    "[Tracing] We added a reasonable default for you: " +
                      rn.tracingOrigins
                  ));
            var r = this.options,
              i = r.routingInstrumentation,
              o = r.startTransactionOnLocationChange,
              a = r.startTransactionOnPageLoad,
              s = r.markBackgroundTransactions,
              c = r.traceFetch,
              u = r.traceXHR,
              l = r.tracingOrigins,
              p = r.shouldCreateSpanForRequest;
            i(
              function (t) {
                return n._createRouteTransaction(t);
              },
              a,
              o
            ),
              s &&
                (ze && ze.document
                  ? ze.document.addEventListener(
                      "visibilitychange",
                      function () {
                        var t = Object(Be.a)();
                        ze.document.hidden &&
                          t &&
                          (Ne.a &&
                            f.c.log(
                              "[Tracing] Transaction: cancelled -> since tab moved to the background, op: " +
                                t.op
                            ),
                          t.status || t.setStatus("cancelled"),
                          t.setTag("visibilitychange", "document.hidden"),
                          t.setTag(We.a, We.b[2]),
                          t.finish());
                      }
                    )
                  : Ne.a &&
                    f.c.warn(
                      "[Tracing] Could not set up background tab detection due to lack of global document"
                    )),
              on({
                traceFetch: c,
                traceXHR: u,
                tracingOrigins: l,
                shouldCreateSpanForRequest: p,
              });
          }),
          (t.prototype._createRouteTransaction = function (t) {
            var e = this;
            if (this._getCurrentHub) {
              var n = this.options,
                r = n.beforeNavigate,
                i = n.idleTimeout,
                o = n.maxTransactionDuration,
                a =
                  "pageload" === t.op
                    ? (function () {
                        var t =
                          ((e = "sentry-trace"),
                          (n = Object(_.a)().document.querySelector(
                            "meta[name=" + e + "]"
                          )),
                          n ? n.getAttribute("content") : null);
                        var e, n;
                        if (t) return Object(Ue.a)(t);
                        return;
                      })()
                    : void 0,
                s = Object(c.a)(Object(c.a)(Object(c.a)({}, t), a), {
                  trimEnd: !0,
                }),
                u = "function" == typeof r ? r(s) : s,
                l =
                  void 0 === u
                    ? Object(c.a)(Object(c.a)({}, s), { sampled: !1 })
                    : u;
              !1 === l.sampled &&
                Ne.a &&
                f.c.log(
                  "[Tracing] Will not send " +
                    l.op +
                    " transaction because of beforeNavigate."
                ),
                Ne.a &&
                  f.c.log(
                    "[Tracing] Starting " + l.op + " transaction on scope"
                  );
              var p = this._getCurrentHub(),
                d = Object(_.a)().location,
                h = Object(Ce.b)(p, l, i, !0, { location: d });
              return (
                h.registerBeforeFinishCallback(function (t, n) {
                  e._metrics.addPerformanceEntries(t),
                    (function (t, e, n) {
                      var r = n - e.startTimestamp;
                      n &&
                        (r > t || r < 0) &&
                        (e.setStatus("deadline_exceeded"),
                        e.setTag("maxTransactionDurationExceeded", "true"));
                    })(Object(Be.d)(o), t, n);
                }),
                h.setTag("idleTimeout", this._configuredIdleTimeout),
                h
              );
            }
            Ne.a &&
              f.c.warn(
                "[Tracing] Did not create " +
                  t.op +
                  " transaction because _getCurrentHub is invalid."
              );
          }),
          (t.id = "BrowserTracing"),
          t
        );
      })();
    Object(Ce.a)();
    var un = n(17);
    function ln(t) {
      return (ln =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function fn() {
      /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ fn =
        function () {
          return e;
        };
      var t,
        e = {},
        n = Object.prototype,
        r = n.hasOwnProperty,
        i =
          Object.defineProperty ||
          function (t, e, n) {
            t[e] = n.value;
          },
        o = "function" == typeof Symbol ? Symbol : {},
        a = o.iterator || "@@iterator",
        s = o.asyncIterator || "@@asyncIterator",
        c = o.toStringTag || "@@toStringTag";
      function u(t, e, n) {
        return (
          Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          t[e]
        );
      }
      try {
        u({}, "");
      } catch (t) {
        u = function (t, e, n) {
          return (t[e] = n);
        };
      }
      function l(t, e, n, r) {
        var o = e && e.prototype instanceof g ? e : g,
          a = Object.create(o.prototype),
          s = new C(r || []);
        return i(a, "_invoke", { value: S(t, n, s) }), a;
      }
      function f(t, e, n) {
        try {
          return { type: "normal", arg: t.call(e, n) };
        } catch (t) {
          return { type: "throw", arg: t };
        }
      }
      e.wrap = l;
      var p = "suspendedStart",
        d = "executing",
        h = "completed",
        v = {};
      function g() {}
      function m() {}
      function y() {}
      var b = {};
      u(b, a, function () {
        return this;
      });
      var _ = Object.getPrototypeOf,
        x = _ && _(_(N([])));
      x && x !== n && r.call(x, a) && (b = x);
      var O = (y.prototype = g.prototype = Object.create(b));
      function j(t) {
        ["next", "throw", "return"].forEach(function (e) {
          u(t, e, function (t) {
            return this._invoke(e, t);
          });
        });
      }
      function w(t, e) {
        function n(i, o, a, s) {
          var c = f(t[i], t, o);
          if ("throw" !== c.type) {
            var u = c.arg,
              l = u.value;
            return l && "object" == ln(l) && r.call(l, "__await")
              ? e.resolve(l.__await).then(
                  function (t) {
                    n("next", t, a, s);
                  },
                  function (t) {
                    n("throw", t, a, s);
                  }
                )
              : e.resolve(l).then(
                  function (t) {
                    (u.value = t), a(u);
                  },
                  function (t) {
                    return n("throw", t, a, s);
                  }
                );
          }
          s(c.arg);
        }
        var o;
        i(this, "_invoke", {
          value: function (t, r) {
            function i() {
              return new e(function (e, i) {
                n(t, r, e, i);
              });
            }
            return (o = o ? o.then(i, i) : i());
          },
        });
      }
      function S(e, n, r) {
        var i = p;
        return function (o, a) {
          if (i === d) throw new Error("Generator is already running");
          if (i === h) {
            if ("throw" === o) throw a;
            return { value: t, done: !0 };
          }
          for (r.method = o, r.arg = a; ; ) {
            var s = r.delegate;
            if (s) {
              var c = T(s, r);
              if (c) {
                if (c === v) continue;
                return c;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;
            else if ("throw" === r.method) {
              if (i === p) throw ((i = h), r.arg);
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            i = d;
            var u = f(e, n, r);
            if ("normal" === u.type) {
              if (((i = r.done ? h : "suspendedYield"), u.arg === v)) continue;
              return { value: u.arg, done: r.done };
            }
            "throw" === u.type &&
              ((i = h), (r.method = "throw"), (r.arg = u.arg));
          }
        };
      }
      function T(e, n) {
        var r = n.method,
          i = e.iterator[r];
        if (i === t)
          return (
            (n.delegate = null),
            ("throw" === r &&
              e.iterator.return &&
              ((n.method = "return"),
              (n.arg = t),
              T(e, n),
              "throw" === n.method)) ||
              ("return" !== r &&
                ((n.method = "throw"),
                (n.arg = new TypeError(
                  "The iterator does not provide a '" + r + "' method"
                )))),
            v
          );
        var o = f(i, e.iterator, n.arg);
        if ("throw" === o.type)
          return (n.method = "throw"), (n.arg = o.arg), (n.delegate = null), v;
        var a = o.arg;
        return a
          ? a.done
            ? ((n[e.resultName] = a.value),
              (n.next = e.nextLoc),
              "return" !== n.method && ((n.method = "next"), (n.arg = t)),
              (n.delegate = null),
              v)
            : a
          : ((n.method = "throw"),
            (n.arg = new TypeError("iterator result is not an object")),
            (n.delegate = null),
            v);
      }
      function E(t) {
        var e = { tryLoc: t[0] };
        1 in t && (e.catchLoc = t[1]),
          2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
          this.tryEntries.push(e);
      }
      function k(t) {
        var e = t.completion || {};
        (e.type = "normal"), delete e.arg, (t.completion = e);
      }
      function C(t) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          t.forEach(E, this),
          this.reset(!0);
      }
      function N(e) {
        if (e || "" === e) {
          var n = e[a];
          if (n) return n.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var i = -1,
              o = function n() {
                for (; ++i < e.length; )
                  if (r.call(e, i)) return (n.value = e[i]), (n.done = !1), n;
                return (n.value = t), (n.done = !0), n;
              };
            return (o.next = o);
          }
        }
        throw new TypeError(ln(e) + " is not iterable");
      }
      return (
        (m.prototype = y),
        i(O, "constructor", { value: y, configurable: !0 }),
        i(y, "constructor", { value: m, configurable: !0 }),
        (m.displayName = u(y, c, "GeneratorFunction")),
        (e.isGeneratorFunction = function (t) {
          var e = "function" == typeof t && t.constructor;
          return (
            !!e &&
            (e === m || "GeneratorFunction" === (e.displayName || e.name))
          );
        }),
        (e.mark = function (t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, y)
              : ((t.__proto__ = y), u(t, c, "GeneratorFunction")),
            (t.prototype = Object.create(O)),
            t
          );
        }),
        (e.awrap = function (t) {
          return { __await: t };
        }),
        j(w.prototype),
        u(w.prototype, s, function () {
          return this;
        }),
        (e.AsyncIterator = w),
        (e.async = function (t, n, r, i, o) {
          void 0 === o && (o = Promise);
          var a = new w(l(t, n, r, i), o);
          return e.isGeneratorFunction(n)
            ? a
            : a.next().then(function (t) {
                return t.done ? t.value : a.next();
              });
        }),
        j(O),
        u(O, c, "Generator"),
        u(O, a, function () {
          return this;
        }),
        u(O, "toString", function () {
          return "[object Generator]";
        }),
        (e.keys = function (t) {
          var e = Object(t),
            n = [];
          for (var r in e) n.push(r);
          return (
            n.reverse(),
            function t() {
              for (; n.length; ) {
                var r = n.pop();
                if (r in e) return (t.value = r), (t.done = !1), t;
              }
              return (t.done = !0), t;
            }
          );
        }),
        (e.values = N),
        (C.prototype = {
          constructor: C,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = t),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = t),
              this.tryEntries.forEach(k),
              !e)
            )
              for (var n in this)
                "t" === n.charAt(0) &&
                  r.call(this, n) &&
                  !isNaN(+n.slice(1)) &&
                  (this[n] = t);
          },
          stop: function () {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var n = this;
            function i(r, i) {
              return (
                (s.type = "throw"),
                (s.arg = e),
                (n.next = r),
                i && ((n.method = "next"), (n.arg = t)),
                !!i
              );
            }
            for (var o = this.tryEntries.length - 1; o >= 0; --o) {
              var a = this.tryEntries[o],
                s = a.completion;
              if ("root" === a.tryLoc) return i("end");
              if (a.tryLoc <= this.prev) {
                var c = r.call(a, "catchLoc"),
                  u = r.call(a, "finallyLoc");
                if (c && u) {
                  if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                  if (this.prev < a.finallyLoc) return i(a.finallyLoc);
                } else if (c) {
                  if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                } else {
                  if (!u)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < a.finallyLoc) return i(a.finallyLoc);
                }
              }
            }
          },
          abrupt: function (t, e) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var i = this.tryEntries[n];
              if (
                i.tryLoc <= this.prev &&
                r.call(i, "finallyLoc") &&
                this.prev < i.finallyLoc
              ) {
                var o = i;
                break;
              }
            }
            o &&
              ("break" === t || "continue" === t) &&
              o.tryLoc <= e &&
              e <= o.finallyLoc &&
              (o = null);
            var a = o ? o.completion : {};
            return (
              (a.type = t),
              (a.arg = e),
              o
                ? ((this.method = "next"), (this.next = o.finallyLoc), v)
                : this.complete(a)
            );
          },
          complete: function (t, e) {
            if ("throw" === t.type) throw t.arg;
            return (
              "break" === t.type || "continue" === t.type
                ? (this.next = t.arg)
                : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && e && (this.next = e),
              v
            );
          },
          finish: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.finallyLoc === t)
                return this.complete(n.completion, n.afterLoc), k(n), v;
            }
          },
          catch: function (t) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
              var n = this.tryEntries[e];
              if (n.tryLoc === t) {
                var r = n.completion;
                if ("throw" === r.type) {
                  var i = r.arg;
                  k(n);
                }
                return i;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (e, n, r) {
            return (
              (this.delegate = { iterator: N(e), resultName: n, nextLoc: r }),
              "next" === this.method && (this.arg = t),
              v
            );
          },
        }),
        e
      );
    }
    function pn(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function dn(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? pn(Object(n), !0).forEach(function (e) {
              hn(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : pn(Object(n)).forEach(function (e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    function hn(t, e, n) {
      var r;
      return (
        (r = (function (t, e) {
          if ("object" != ln(t) || !t) return t;
          var n = t[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(t, e || "default");
            if ("object" != ln(r)) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(t);
        })(e, "string")),
        (e = "symbol" == ln(r) ? r : String(r)) in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    function vn(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != n) {
            var r,
              i,
              o,
              a,
              s = [],
              c = !0,
              u = !1;
            try {
              if (((o = (n = n.call(t)).next), 0 === e)) {
                if (Object(n) !== n) return;
                c = !1;
              } else
                for (
                  ;
                  !(c = (r = o.call(n)).done) &&
                  (s.push(r.value), s.length !== e);
                  c = !0
                );
            } catch (t) {
              (u = !0), (i = t);
            } finally {
              try {
                if (
                  !c &&
                  null != n.return &&
                  ((a = n.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (u) throw i;
              }
            }
            return s;
          }
        })(t, e) ||
        (function (t, e) {
          if (!t) return;
          if ("string" == typeof t) return gn(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          "Object" === n && t.constructor && (n = t.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(t);
          if (
            "Arguments" === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return gn(t, e);
        })(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function gn(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function mn(t, e, n, r, i, o, a) {
      try {
        var s = t[o](a),
          c = s.value;
      } catch (t) {
        return void n(t);
      }
      s.done ? e(c) : Promise.resolve(c).then(r, i);
    }
    function yn(t) {
      return function () {
        var e = this,
          n = arguments;
        return new Promise(function (r, i) {
          var o = t.apply(e, n);
          function a(t) {
            mn(o, r, i, a, s, "next", t);
          }
          function s(t) {
            mn(o, r, i, a, s, "throw", t);
          }
          a(void 0);
        });
      };
    }
    function bn() {
      return (bn = yn(
        fn().mark(function t(e, n, r) {
          var o, a, c, u, l, f, p, d, h, v, g, m, y, b;
          return fn().wrap(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if (
                      ((b = function (t) {
                        return function (e, n) {
                          console.error(
                            "".concat(e.responseText, "\n\nstatus: ").concat(n)
                          ),
                            m(
                              ""
                                .concat(t, "\n\n")
                                .concat(e.responseText, "\n\nstatus: ")
                                .concat(n)
                            );
                        };
                      }),
                      (y = function () {
                        return (y = yn(
                          fn().mark(function t(e) {
                            var i;
                            return fn().wrap(function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    if (e) {
                                      t.next = 2;
                                      break;
                                    }
                                    return t.abrupt("return");
                                  case 2:
                                    return (
                                      console.error(e),
                                      (i = JSON.stringify(e)),
                                      (t.next = 6),
                                      s.a.ajax({
                                        url: "".concat(n, "/graphql"),
                                        method: "POST",
                                        contentType: "application/json",
                                        data: JSON.stringify({
                                          query:
                                            "\n        mutation PostError($version: Version, $error: String, $date: String, $userAgent: String) {\n          postError(version: $version, error: $error, date: $date, userAgent: $userAgent)\n        }\n      ",
                                          variables: {
                                            version: r,
                                            error: i,
                                            date: _n(),
                                            userAgent:
                                              window.navigator.userAgent,
                                          },
                                        }),
                                        error: function () {
                                          alert(
                                            "[failed to report error]\nエラーが発生しました。\n出了点问题。\nYou got an error.\n\n[error message]\n".concat(
                                              i
                                            )
                                          );
                                        },
                                        success: function () {
                                          alert(
                                            "[error reported]\nエラーが発生しました。\n出了点问题。\nYou got an error.\n\n[error message]\n".concat(
                                              i
                                            )
                                          );
                                        },
                                      })
                                    );
                                  case 6:
                                  case "end":
                                    return t.stop();
                                }
                            }, t);
                          })
                        )).apply(this, arguments);
                      }),
                      (m = function (t) {
                        return y.apply(this, arguments);
                      }),
                      (g = function () {
                        return (g = yn(
                          fn().mark(function t() {
                            var e, n, i, o, a, c, u;
                            return fn().wrap(function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    return (
                                      (e =
                                        "//p.eagate.573.jp/game/gfdm/gitadora_"
                                          .concat(r, "/p")
                                          .concat(
                                            un.NO_EAM_PATH_VERSIONS.includes(r)
                                              ? "/eam"
                                              : "",
                                            "/playdata/profile.html"
                                          )),
                                      (n = {}),
                                      (t.next = 4),
                                      s.a.ajax({ url: e, error: b(e) })
                                    );
                                  case 4:
                                    return (
                                      (i = t.sent),
                                      ((o =
                                        document.implementation.createHTMLDocument(
                                          "html"
                                        )).documentElement.innerHTML = i),
                                      (a = s()(o)
                                        .find(".profile_name_frame")
                                        .text()),
                                      (c = ""),
                                      (u = ""),
                                      "matixx" === r || "tbre" === r
                                        ? (c = s()(o)
                                            .find(".common_frame_date")
                                            .text()
                                            .substring(10, 26))
                                        : ((c =
                                            (c = s()(o)
                                              .find(
                                                "#contents > .maincont > h2"
                                              )
                                              .text()
                                              .match(/[a-zA-Z0-9]+/)) && c[0]),
                                          (u = s()(o)
                                            .find("div.common_frame_date")
                                            .text()
                                            .trim())),
                                      (n.playerName = a),
                                      (n.cardNumber = c),
                                      (n.gitadoraId = u),
                                      t.abrupt("return", n)
                                    );
                                  case 15:
                                  case "end":
                                    return t.stop();
                                }
                            }, t);
                          })
                        )).apply(this, arguments);
                      }),
                      (v = function () {
                        return g.apply(this, arguments);
                      }),
                      (h = function () {
                        return (h = yn(
                          fn().mark(function t(e, n) {
                            return fn().wrap(function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    return (
                                      (t.next = 2),
                                      s.a.ajax({
                                        url: e,
                                        error: b(e),
                                        success: function (t) {
                                          var e =
                                            document.implementation.createHTMLDocument(
                                              "html"
                                            );
                                          e.documentElement.innerHTML = t;
                                          for (
                                            var r = s()(e)
                                                .find(".skill_table_tb")
                                                .children()
                                                .eq(1)
                                                .children(),
                                              i = [],
                                              a = 0,
                                              c = 0;
                                            c < 25;
                                            c++
                                          )
                                            try {
                                              var u = r.eq(c),
                                                l = u
                                                  .find("a.text_link")
                                                  .eq(0)
                                                  .text(),
                                                f = u
                                                  .find(
                                                    "div.music_seq_box > div"
                                                  )
                                                  .eq(0)
                                                  .attr("class")
                                                  .substring(14, 15),
                                                p = u
                                                  .find(
                                                    "div.music_seq_box > div"
                                                  )
                                                  .eq(1)
                                                  .attr("class")
                                                  .substring(14, 17),
                                                d = u
                                                  .find("td.skill_cell")
                                                  .text();
                                              d = d
                                                .substring(0, d.length - 8)
                                                .trim();
                                              var h = u
                                                  .find("td.achive_cell")
                                                  .text()
                                                  .trim(),
                                                v = u
                                                  .find("td.diff_cell")
                                                  .text()
                                                  .trim();
                                              i.push({
                                                name: l,
                                                part: f,
                                                diff: p,
                                                skill_value: d,
                                                achive_value: h,
                                                diff_value: v,
                                              }),
                                                (a += parseFloat(d));
                                            } catch (t) {
                                              break;
                                            }
                                          o[n] = {
                                            point: a.toFixed(2),
                                            data: i,
                                          };
                                        },
                                      })
                                    );
                                  case 2:
                                  case "end":
                                    return t.stop();
                                }
                            }, t);
                          })
                        )).apply(this, arguments);
                      }),
                      (d = function (t, e) {
                        return h.apply(this, arguments);
                      }),
                      console.log("Running script ".concat(un.APP_VERSION)),
                      ke({
                        dsn: "https://6d26c7e100a84ae2ae01f54719c5ca19@o912155.ingest.sentry.io/5848955",
                        integrations: [new i.BrowserTracing()],
                        tracesSampleRate: 0.1,
                        environment: "production",
                      }),
                      (o = {}),
                      (t.prev = 10),
                      "p.eagate.573.jp" == window.location.hostname)
                    ) {
                      t.next = 14;
                      break;
                    }
                    return (
                      alert(
                        "コナミ様のサイト(http://p.eagate.573.jp/)で行ってください。\n\n请在Konami的官方网站(http://p.eagate.573.jp/)上点击书签。\n\nPlease make sure you are on Konami official site(http://p.eagate.573.jp/)."
                      ),
                      t.abrupt("return")
                    );
                  case 14:
                    return (t.next = 16), Promise.all([v()]);
                  case 16:
                    if (
                      ((a = t.sent),
                      (c = vn(a, 1)),
                      (u = c[0]),
                      console.log("profileData", u),
                      u.cardNumber)
                    ) {
                      t.next = 23;
                      break;
                    }
                    return (
                      alert(
                        "プレイヤーデータ取得できません。ログインした状態でもう一度試してみてください。\n\n无法取得玩家数据，请检查您是否已经登录。\n\nFailed to fetch player data. Please log in."
                      ),
                      t.abrupt("return")
                    );
                  case 23:
                    return (
                      (l = [
                        "//p.eagate.573.jp/game/gfdm/gitadora_"
                          .concat(r, "/p")
                          .concat(
                            un.NO_EAM_PATH_VERSIONS.includes(r) ? "/eam" : "",
                            "/playdata/skill.html?gtype=gf&stype=0"
                          ),
                        "//p.eagate.573.jp/game/gfdm/gitadora_"
                          .concat(r, "/p")
                          .concat(
                            un.NO_EAM_PATH_VERSIONS.includes(r) ? "/eam" : "",
                            "/playdata/skill.html?gtype=gf&stype=1"
                          ),
                        "//p.eagate.573.jp/game/gfdm/gitadora_"
                          .concat(r, "/p")
                          .concat(
                            un.NO_EAM_PATH_VERSIONS.includes(r) ? "/eam" : "",
                            "/playdata/skill.html?gtype=dm&stype=0"
                          ),
                        "//p.eagate.573.jp/game/gfdm/gitadora_"
                          .concat(r, "/p")
                          .concat(
                            un.NO_EAM_PATH_VERSIONS.includes(r) ? "/eam" : "",
                            "/playdata/skill.html?gtype=dm&stype=1"
                          ),
                      ]),
                      (f = [
                        "guitar_other",
                        "guitar_hot",
                        "drum_other",
                        "drum_hot",
                      ]),
                      (t.next = 27),
                      Promise.all(
                        [0, 1, 2, 3].map(function (t) {
                          return d(l[t], f[t]);
                        })
                      )
                    );
                  case 27:
                    return (
                      (t.next = 29),
                      s.a.ajax({
                        url: "".concat(n, "/graphql"),
                        error: b("".concat(n, "/graphql")),
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({
                          query:
                            "\n        mutation Upload($version: Version, $data: UserInput) {\n          upload(version: $version, data: $data)\n        }\n      ",
                          variables: {
                            version: r,
                            data: dn(
                              dn({}, u),
                              {},
                              {
                                guitarSkill: {
                                  hot: o.guitar_hot,
                                  other: o.guitar_other,
                                },
                                drumSkill: {
                                  hot: o.drum_hot,
                                  other: o.drum_other,
                                },
                                updateDate: _n(),
                              }
                            ),
                          },
                        }),
                      })
                    );
                  case 29:
                    (p = t.sent).errors
                      ? m(p.errors)
                      : (window.location = ""
                          .concat(e, "/")
                          .concat(r, "/")
                          .concat(p.data.upload, "/g?setLocalStorage=")
                          .concat(p.data.upload)),
                      (t.next = 36);
                    break;
                  case 33:
                    (t.prev = 33), (t.t0 = t.catch(10)), m(t.t0);
                  case 36:
                  case "end":
                    return t.stop();
                }
            },
            t,
            null,
            [[10, 33]]
          );
        })
      )).apply(this, arguments);
    }
    function _n() {
      var t = new Date(),
        e = t.getMinutes(),
        n = t.getHours(),
        r = t.getDate(),
        i = t.getMonth() + 1,
        o = t.getFullYear();
      return (
        e < 10 && (e = "0".concat(e)),
        n < 10 && (n = "0".concat(n)),
        r < 10 && (r = "0".concat(r)),
        i < 10 && (i = "0".concat(i)),
        "".concat(o, "/").concat(i, "/").concat(r, " ").concat(n, ":").concat(e)
      );
    }
    (function (t, e, n) {
      bn.apply(this, arguments);
    })(
      "http://gsv.fun",
      "//gitadora-skill-viewer.herokuapp.com",
      "galaxywave_delta"
    );
  },
  ,
  ,
  ,
  function (t, e, n) {
    "use strict";
    (function (t) {
      n.d(e, "a", function () {
        return c;
      }),
        n.d(e, "b", function () {
          return u;
        });
      var r = n(0),
        i = n(4),
        o = n(35),
        a = n(7),
        s = n(24);
      function c(e, n, c) {
        void 0 === n && (n = 1 / 0), void 0 === c && (c = 1 / 0);
        try {
          return (function e(n, c, u, l, f) {
            void 0 === u && (u = 1 / 0);
            void 0 === l && (l = 1 / 0);
            void 0 === f && (f = Object(o.a)());
            var p = Object(r.c)(f, 2),
              d = p[0],
              h = p[1],
              v = c;
            if (v && "function" == typeof v.toJSON)
              try {
                return v.toJSON();
              } catch (t) {}
            if (
              null === c ||
              (["number", "boolean", "string"].includes(typeof c) &&
                !Object(i.h)(c))
            )
              return c;
            var g = (function (e, n) {
              try {
                return "domain" === e && n && "object" == typeof n && n._events
                  ? "[Domain]"
                  : "domainEmitter" === e
                  ? "[DomainEmitter]"
                  : void 0 !== t && n === t
                  ? "[Global]"
                  : "undefined" != typeof window && n === window
                  ? "[Window]"
                  : "undefined" != typeof document && n === document
                  ? "[Document]"
                  : Object(i.m)(n)
                  ? "[SyntheticEvent]"
                  : "number" == typeof n && n != n
                  ? "[NaN]"
                  : void 0 === n
                  ? "[undefined]"
                  : "function" == typeof n
                  ? "[Function: " + Object(s.b)(n) + "]"
                  : "symbol" == typeof n
                  ? "[" + String(n) + "]"
                  : "bigint" == typeof n
                  ? "[BigInt: " + String(n) + "]"
                  : "[object " +
                    Object.getPrototypeOf(n).constructor.name +
                    "]";
              } catch (t) {
                return "**non-serializable** (" + t + ")";
              }
            })(n, c);
            if (!g.startsWith("[object ")) return g;
            if (0 === u) return g.replace("object ", "");
            if (d(c)) return "[Circular ~]";
            var m = Array.isArray(c) ? [] : {},
              y = 0,
              b = Object(i.d)(c) || Object(i.f)(c) ? Object(a.b)(c) : c;
            for (var _ in b)
              if (Object.prototype.hasOwnProperty.call(b, _)) {
                if (y >= l) {
                  m[_] = "[MaxProperties ~]";
                  break;
                }
                var x = b[_];
                (m[_] = e(_, x, u - 1, l, f)), (y += 1);
              }
            return h(c), m;
          })("", e, n, c);
        } catch (t) {
          return { ERROR: "**non-serializable** (" + t + ")" };
        }
      }
      function u(t, e, n) {
        void 0 === e && (e = 3), void 0 === n && (n = 102400);
        var r,
          i = c(t, e);
        return (
          (r = i),
          (function (t) {
            return ~-encodeURI(t).split(/%..|./).length;
          })(JSON.stringify(r)) > n
            ? u(t, e - 1, n)
            : i
        );
      }
    }).call(this, n(29));
  },
]);
