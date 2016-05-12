! function() {
  var rhLocalName = "rhLocal" + Math.random().toString().substring(2, 8);
  window.rhGlobal = window.rhGlobal || {}, rhGlobal.modules = rhGlobal.modules || [];
  var old = rhGlobal.define;
  rhGlobal.define = function(a, b, c, d) {
    function e() {
      define ? define(a, b, c) : setTimeout(e, 100)
    }
    e(), d || rhGlobal.modules.push({
      a: a,
      b: b,
      c: c
    }), old && old(a, b, c, !0)
  }, rhGlobal.define.amd = !0, rhGlobal.define.rhLocalName = rhLocalName;
  var requirejs, require, define;
  ! function(global) {
    function isFunction(a) {
      return "[object Function]" === ostring.call(a)
    }

    function isArray(a) {
      return "[object Array]" === ostring.call(a)
    }

    function each(a, b) {
      if (a) {
        var c;
        for (c = 0; c < a.length && (!a[c] || !b(a[c], c, a)); c += 1);
      }
    }

    function eachReverse(a, b) {
      if (a) {
        var c;
        for (c = a.length - 1; c > -1 && (!a[c] || !b(a[c], c, a)); c -= 1);
      }
    }

    function hasProp(a, b) {
      return hasOwn.call(a, b)
    }

    function getOwn(a, b) {
      return hasProp(a, b) && a[b]
    }

    function eachProp(a, b) {
      var c;
      for (c in a)
        if (hasProp(a, c) && b(a[c], c)) break
    }

    function mixin(a, b, c, d) {
      return b && eachProp(b, function(b, e) {
        (c || !hasProp(a, e)) && (!d || "object" != typeof b || !b || isArray(b) || isFunction(b) || b instanceof RegExp ? a[e] = b : (a[e] || (a[e] = {}), mixin(a[e], b, c, d)))
      }), a
    }

    function bind(a, b) {
      return function() {
        return b.apply(a, arguments)
      }
    }

    function scripts() {
      return document.getElementsByTagName("script")
    }

    function defaultOnError(a) {
      throw a
    }

    function getGlobal(a) {
      if (!a) return a;
      var b = global;
      return each(a.split("."), function(a) {
        b = b[a]
      }), b
    }

    function makeError(a, b, c, d) {
      var e = new Error(b + "\nhttp://requirejs.org/docs/errors.html#" + a);
      return e.requireType = a, e.requireModules = d, c && (e.originalError = c), e
    }

    function newContext(a) {
      function b(a) {
        var b, c;
        for (b = 0; b < a.length; b++)
          if (c = a[b], "." === c) a.splice(b, 1), b -= 1;
          else if (".." === c) {
          if (0 === b || 1 === b && ".." === a[2] || ".." === a[b - 1]) continue;
          b > 0 && (a.splice(b - 1, 2), b -= 2)
        }
      }

      function c(a, c, d) {
        var e, f, g, h, i, j, k, l, m, n, o, p, q = c && c.split("/"),
          r = x.map,
          s = r && r["*"];
        if (a && (a = a.split("/"), k = a.length - 1, x.nodeIdCompat && jsSuffixRegExp.test(a[k]) && (a[k] = a[k].replace(jsSuffixRegExp, "")), "." === a[0].charAt(0) && q && (p = q.slice(0, q.length - 1), a = p.concat(a)), b(a), a = a.join("/")), d && r && (q || s)) {
          g = a.split("/");
          a: for (h = g.length; h > 0; h -= 1) {
            if (j = g.slice(0, h).join("/"), q)
              for (i = q.length; i > 0; i -= 1)
                if (f = getOwn(r, q.slice(0, i).join("/")), f && (f = getOwn(f, j))) {
                  l = f, m = h;
                  break a
                }!n && s && getOwn(s, j) && (n = getOwn(s, j), o = h)
          }!l && n && (l = n, m = o), l && (g.splice(0, m, l), a = g.join("/"))
        }
        return e = getOwn(x.pkgs, a), e ? e : a
      }

      function d(a) {
        isBrowser && each(scripts(), function(b) {
          return b.getAttribute("data-requiremodule") === a && b.getAttribute("data-requirecontext") === u.contextName ? (b.parentNode.removeChild(b), !0) : void 0
        })
      }

      function e(a) {
        var b = getOwn(x.paths, a);
        return b && isArray(b) && b.length > 1 ? (b.shift(), u.require.undef(a), u.makeRequire(null, {
          skipMap: !0
        })([a]), !0) : void 0
      }

      function f(a) {
        var b, c = a ? a.indexOf("!") : -1;
        return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a]
      }

      function g(a, b, d, e) {
        var g, h, i, j, k = null,
          l = b ? b.name : null,
          m = a,
          n = !0,
          o = "";
        return a || (n = !1, a = "_@r" + (F += 1)), j = f(a), k = j[0], a = j[1], k && (k = c(k, l, e), h = getOwn(C, k)), a && (k ? o = h && h.normalize ? h.normalize(a, function(a) {
          return c(a, l, e)
        }) : -1 === a.indexOf("!") ? c(a, l, e) : a : (o = c(a, l, e), j = f(o), k = j[0], o = j[1], d = !0, g = u.nameToUrl(o))), i = !k || h || d ? "" : "_unnormalized" + (G += 1), {
          prefix: k,
          name: o,
          parentMap: b,
          unnormalized: !!i,
          url: g,
          originalName: m,
          isDefine: n,
          id: (k ? k + "!" + o : o) + i
        }
      }

      function h(a) {
        var b = a.id,
          c = getOwn(y, b);
        return c || (c = y[b] = new u.Module(a)), c
      }

      function i(a, b, c) {
        var d = a.id,
          e = getOwn(y, d);
        !hasProp(C, d) || e && !e.defineEmitComplete ? (e = h(a), e.error && "error" === b ? c(e.error) : e.on(b, c)) : "defined" === b && c(C[d])
      }

      function j(a, b) {
        var c = a.requireModules,
          d = !1;
        b ? b(a) : (each(c, function(b) {
          var c = getOwn(y, b);
          c && (c.error = a, c.events.error && (d = !0, c.emit("error", a)))
        }), d || req.onError(a))
      }

      function k() {
        globalDefQueue.length && (each(globalDefQueue, function(a) {
          var b = a[0];
          "string" == typeof b && (u.defQueueMap[b] = !0), B.push(a)
        }), globalDefQueue = [])
      }

      function l(a) {
        delete y[a], delete z[a]
      }

      function m(a, b, c) {
        var d = a.map.id;
        a.error ? a.emit("error", a.error) : (b[d] = !0, each(a.depMaps, function(d, e) {
          var f = d.id,
            g = getOwn(y, f);
          !g || a.depMatched[e] || c[f] || (getOwn(b, f) ? (a.defineDep(e, C[f]), a.check()) : m(g, b, c))
        }), c[d] = !0)
      }

      function n() {
        var a, b, c = 1e3 * x.waitSeconds,
          f = c && u.startTime + c < (new Date).getTime(),
          g = [],
          h = [],
          i = !1,
          k = !0;
        if (!s) {
          if (s = !0, eachProp(z, function(a) {
              var c = a.map,
                j = c.id;
              if (a.enabled && (c.isDefine || h.push(a), !a.error))
                if (!a.inited && f) e(j) ? (b = !0, i = !0) : (g.push(j), d(j));
                else if (!a.inited && a.fetched && c.isDefine && (i = !0, !c.prefix)) return k = !1
            }), f && g.length) return a = makeError("timeout", "Load timeout for modules: " + g, null, g), a.contextName = u.contextName, j(a);
          k && each(h, function(a) {
            m(a, {}, {})
          }), f && !b || !i || !isBrowser && !isWebWorker || w || (w = setTimeout(function() {
            w = 0, n()
          }, 50)), s = !1
        }
      }

      function o(a) {
        hasProp(C, a[0]) || h(g(a[0], null, !0)).init(a[1], a[2])
      }

      function p(a, b, c, d) {
        a.detachEvent && !isOpera ? d && a.detachEvent(d, b) : a.removeEventListener(c, b, !1)
      }

      function q(a) {
        var b = a.currentTarget || a.srcElement;
        return p(b, u.onScriptLoad, "load", "onreadystatechange"), p(b, u.onScriptError, "error"), {
          node: b,
          id: b && b.getAttribute("data-requiremodule")
        }
      }

      function r() {
        var a;
        for (k(); B.length;) {
          if (a = B.shift(), null === a[0]) return j(makeError("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));
          o(a)
        }
        u.defQueueMap = {}
      }
      var s, t, u, v, w, x = {
          waitSeconds: 7,
          baseUrl: "./",
          paths: {},
          bundles: {},
          pkgs: {},
          shim: {},
          config: {}
        },
        y = {},
        z = {},
        A = {},
        B = [],
        C = {},
        D = {},
        E = {},
        F = 1,
        G = 1;
      return v = {
        require: function(a) {
          return a.require ? a.require : a.require = u.makeRequire(a.map)
        },
        exports: function(a) {
          return a.usingExports = !0, a.map.isDefine ? a.exports ? C[a.map.id] = a.exports : a.exports = C[a.map.id] = {} : void 0
        },
        module: function(a) {
          return a.module ? a.module : a.module = {
            id: a.map.id,
            uri: a.map.url,
            config: function() {
              return getOwn(x.config, a.map.id) || {}
            },
            exports: a.exports || (a.exports = {})
          }
        }
      }, t = function(a) {
        this.events = getOwn(A, a.id) || {}, this.map = a, this.shim = getOwn(x.shim, a.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
      }, t.prototype = {
        init: function(a, b, c, d) {
          d = d || {}, this.inited || (this.factory = b, c ? this.on("error", c) : this.events.error && (c = bind(this, function(a) {
            this.emit("error", a)
          })), this.depMaps = a && a.slice(0), this.errback = c, this.inited = !0, this.ignore = d.ignore, d.enabled || this.enabled ? this.enable() : this.check())
        },
        defineDep: function(a, b) {
          this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b)
        },
        fetch: function() {
          if (!this.fetched) {
            this.fetched = !0, u.startTime = (new Date).getTime();
            var a = this.map;
            return this.shim ? void u.makeRequire(this.map, {
              enableBuildCallback: !0
            })(this.shim.deps || [], bind(this, function() {
              return a.prefix ? this.callPlugin() : this.load()
            })) : a.prefix ? this.callPlugin() : this.load()
          }
        },
        load: function() {
          var a = this.map.url;
          D[a] || (D[a] = !0, u.load(this.map.id, a))
        },
        check: function() {
          if (this.enabled && !this.enabling) {
            var a, b, c = this.map.id,
              d = this.depExports,
              e = this.exports,
              f = this.factory;
            if (this.inited) {
              if (this.error) this.emit("error", this.error);
              else if (!this.defining) {
                if (this.defining = !0, this.depCount < 1 && !this.defined) {
                  if (isFunction(f)) {
                    try {
                      e = u.execCb(c, f, d, e)
                    } catch (g) {
                      a = g
                    }
                    if (this.map.isDefine && void 0 === e && (b = this.module, b ? e = b.exports : this.usingExports && (e = this.exports)), a) {
                      if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) return a.requireMap = this.map, a.requireModules = this.map.isDefine ? [this.map.id] : null, a.requireType = this.map.isDefine ? "define" : "require", j(this.error = a);
                      "undefined" != typeof console && console.error || req.onError(a)
                    }
                  } else e = f;
                  if (this.exports = e, this.map.isDefine && !this.ignore && (C[c] = e, req.onResourceLoad)) {
                    var h = [];
                    each(this.depMaps, function(a) {
                      h.push(a.normalizedMap || a)
                    }), req.onResourceLoad(u, this.map, h)
                  }
                  l(c), this.defined = !0
                }
                this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
              }
            } else hasProp(u.defQueueMap, c) || this.fetch()
          }
        },
        callPlugin: function() {
          var a = this.map,
            b = a.id,
            d = g(a.prefix);
          this.depMaps.push(d), i(d, "defined", bind(this, function(d) {
            var e, f, k, m = getOwn(E, this.map.id),
              n = this.map.name,
              o = this.map.parentMap ? this.map.parentMap.name : null,
              p = u.makeRequire(a.parentMap, {
                enableBuildCallback: !0
              });
            return this.map.unnormalized ? (d.normalize && (n = d.normalize(n, function(a) {
              return c(a, o, !0)
            }) || ""), f = g(a.prefix + "!" + n, this.map.parentMap), i(f, "defined", bind(this, function(a) {
              this.map.normalizedMap = f, this.init([], function() {
                return a
              }, null, {
                enabled: !0,
                ignore: !0
              })
            })), k = getOwn(y, f.id), void(k && (this.depMaps.push(f), this.events.error && k.on("error", bind(this, function(a) {
              this.emit("error", a)
            })), k.enable()))) : m ? (this.map.url = u.nameToUrl(m), void this.load()) : (e = bind(this, function(a) {
              this.init([], function() {
                return a
              }, null, {
                enabled: !0
              })
            }), e.error = bind(this, function(a) {
              this.inited = !0, this.error = a, a.requireModules = [b], eachProp(y, function(a) {
                0 === a.map.id.indexOf(b + "_unnormalized") && l(a.map.id)
              }), j(a)
            }), e.fromText = bind(this, function(c, d) {
              var f = a.name,
                i = g(f),
                k = useInteractive;
              d && (c = d), k && (useInteractive = !1), h(i), hasProp(x.config, b) && (x.config[f] = x.config[b]);
              try {
                req.exec(c)
              } catch (l) {
                return j(makeError("fromtexteval", "fromText eval for " + b + " failed: " + l, l, [b]))
              }
              k && (useInteractive = !0), this.depMaps.push(i), u.completeLoad(f), p([f], e)
            }), void d.load(a.name, p, e, x))
          })), u.enable(d, this), this.pluginMaps[d.id] = d
        },
        enable: function() {
          z[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(a, b) {
            var c, d, e;
            if ("string" == typeof a) {
              if (a = g(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[b] = a, e = getOwn(v, a.id)) return void(this.depExports[b] = e(this));
              this.depCount += 1, i(a, "defined", bind(this, function(a) {
                this.undefed || (this.defineDep(b, a), this.check())
              })), this.errback ? i(a, "error", bind(this, this.errback)) : this.events.error && i(a, "error", bind(this, function(a) {
                this.emit("error", a)
              }))
            }
            c = a.id, d = y[c], hasProp(v, c) || !d || d.enabled || u.enable(a, this)
          })), eachProp(this.pluginMaps, bind(this, function(a) {
            var b = getOwn(y, a.id);
            b && !b.enabled && u.enable(a, this)
          })), this.enabling = !1, this.check()
        },
        on: function(a, b) {
          var c = this.events[a];
          c || (c = this.events[a] = []), c.push(b)
        },
        emit: function(a, b) {
          each(this.events[a], function(a) {
            a(b)
          }), "error" === a && delete this.events[a]
        }
      }, u = {
        config: x,
        contextName: a,
        registry: y,
        defined: C,
        urlFetched: D,
        defQueue: B,
        defQueueMap: {},
        Module: t,
        makeModuleMap: g,
        nextTick: req.nextTick,
        onError: j,
        configure: function(a) {
          a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");
          var b = x.shim,
            c = {
              paths: !0,
              bundles: !0,
              config: !0,
              map: !0
            };
          eachProp(a, function(a, b) {
            c[b] ? (x[b] || (x[b] = {}), mixin(x[b], a, !0, !0)) : x[b] = a
          }), a.bundles && eachProp(a.bundles, function(a, b) {
            each(a, function(a) {
              a !== b && (E[a] = b)
            })
          }), a.shim && (eachProp(a.shim, function(a, c) {
            isArray(a) && (a = {
              deps: a
            }), !a.exports && !a.init || a.exportsFn || (a.exportsFn = u.makeShimExports(a)), b[c] = a
          }), x.shim = b), a.packages && each(a.packages, function(a) {
            var b, c;
            a = "string" == typeof a ? {
              name: a
            } : a, c = a.name, b = a.location, b && (x.paths[c] = a.location), x.pkgs[c] = a.name + "/" + (a.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
          }), eachProp(y, function(a, b) {
            a.inited || a.map.unnormalized || (a.map = g(b, null, !0))
          }), (a.deps || a.callback) && u.require(a.deps || [], a.callback)
        },
        makeShimExports: function(a) {
          function b() {
            var b;
            return a.init && (b = a.init.apply(global, arguments)), b || a.exports && getGlobal(a.exports)
          }
          return b
        },
        makeRequire: function(b, e) {
          function f(c, d, i) {
            var k, l, m;
            return e.enableBuildCallback && d && isFunction(d) && (d.__requireJsBuild = !0), "string" == typeof c ? isFunction(d) ? j(makeError("requireargs", "Invalid require call"), i) : b && hasProp(v, c) ? v[c](y[b.id]) : req.get ? req.get(u, c, b, f) : (l = g(c, b, !1, !0), k = l.id, hasProp(C, k) ? C[k] : j(makeError("notloaded", 'Module name "' + k + '" has not been loaded yet for context: ' + a + (b ? "" : ". Use require([])")))) : (r(), u.nextTick(function() {
              r(), m = h(g(null, b)), m.skipMap = e.skipMap, m.init(c, d, i, {
                enabled: !0
              }), n()
            }), f)
          }
          return e = e || {}, mixin(f, {
            isBrowser: isBrowser,
            toUrl: function(a) {
              var d, e = a.lastIndexOf("."),
                f = a.split("/")[0],
                g = "." === f || ".." === f;
              return -1 !== e && (!g || e > 1) && (d = a.substring(e, a.length), a = a.substring(0, e)), u.nameToUrl(c(a, b && b.id, !0), d, !0)
            },
            defined: function(a) {
              return hasProp(C, g(a, b, !1, !0).id)
            },
            specified: function(a) {
              return a = g(a, b, !1, !0).id, hasProp(C, a) || hasProp(y, a)
            }
          }), b || (f.undef = function(a) {
            k();
            var c = g(a, b, !0),
              e = getOwn(y, a);
            e.undefed = !0, d(a), delete C[a], delete D[c.url], delete A[a], eachReverse(B, function(b, c) {
              b[0] === a && B.splice(c, 1)
            }), delete u.defQueueMap[a], e && (e.events.defined && (A[a] = e.events), l(a))
          }), f
        },
        enable: function(a) {
          var b = getOwn(y, a.id);
          b && h(a).enable()
        },
        completeLoad: function(a) {
          var b, c, d, f = getOwn(x.shim, a) || {},
            g = f.exports;
          for (k(); B.length;) {
            if (c = B.shift(), null === c[0]) {
              if (c[0] = a, b) break;
              b = !0
            } else c[0] === a && (b = !0);
            o(c)
          }
          if (u.defQueueMap = {}, d = getOwn(y, a), !b && !hasProp(C, a) && d && !d.inited) {
            if (!(!x.enforceDefine || g && getGlobal(g))) return e(a) ? void 0 : j(makeError("nodefine", "No define call for " + a, null, [a]));
            o([a, f.deps || [], f.exportsFn])
          }
          n()
        },
        nameToUrl: function(a, b, c) {
          var d, e, f, g, h, i, j, k = getOwn(x.pkgs, a);
          if (k && (a = k), j = getOwn(E, a)) return u.nameToUrl(j, b, c);
          if (req.jsExtRegExp.test(a)) h = a + (b || "");
          else {
            for (d = x.paths, e = a.split("/"), f = e.length; f > 0; f -= 1)
              if (g = e.slice(0, f).join("/"), i = getOwn(d, g)) {
                isArray(i) && (i = i[0]), e.splice(0, f, i);
                break
              }
            h = e.join("/"), h += b || (/^data\:|\?/.test(h) || c ? "" : ".js"), h = ("/" === h.charAt(0) || h.match(/^[\w\+\.\-]+:/) ? "" : x.baseUrl) + h
          }
          return x.urlArgs ? h + ((-1 === h.indexOf("?") ? "?" : "&") + x.urlArgs) : h
        },
        load: function(a, b) {
          req.load(u, a, b)
        },
        execCb: function(a, b, c, d) {
          return b.apply(d, c)
        },
        onScriptLoad: function(a) {
          if ("load" === a.type || readyRegExp.test((a.currentTarget || a.srcElement).readyState)) {
            interactiveScript = null;
            var b = q(a);
            u.completeLoad(b.id)
          }
        },
        onScriptError: function(a) {
          var b = q(a);
          if (!e(b.id)) {
            var c = [];
            return eachProp(y, function(a, d) {
              0 !== d.indexOf("_@r") && each(a.depMaps, function(a) {
                return a.id === b.id && c.push(d), !0
              })
            }), j(makeError("scripterror", 'Script error for "' + b.id + (c.length ? '", needed by: ' + c.join(", ") : '"'), a, [b.id]))
          }
        }
      }, u.require = u.makeRequire(), u
    }

    function getInteractiveScript() {
      return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(a) {
        return "interactive" === a.readyState ? interactiveScript = a : void 0
      }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.22",
      commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
      cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
      jsSuffixRegExp = /\.js$/,
      currDirRegExp = /^\.\//,
      op = Object.prototype,
      ostring = op.toString,
      hasOwn = op.hasOwnProperty,
      ap = Array.prototype,
      isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
      isWebWorker = !isBrowser && "undefined" != typeof importScripts,
      readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
      defContextName = "_",
      isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
      contexts = {},
      cfg = {},
      globalDefQueue = [],
      useInteractive = !1;
    if ("undefined" == typeof define) {
      if ("undefined" != typeof requirejs) {
        if (isFunction(requirejs)) return;
        cfg = requirejs, requirejs = void 0
      }
      "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(a, b, c, d) {
        var e, f, g = defContextName;
        return isArray(a) || "string" == typeof a || (f = a, isArray(b) ? (a = b, b = c, c = d) : a = []), f && f.context && (g = f.context), e = getOwn(contexts, g), e || (e = contexts[g] = req.s.newContext(g)), f && e.configure(f), e.require(a, b, c)
      }, req.config = function(a) {
        return req(a)
      }, req.nextTick = "undefined" != typeof setTimeout ? function(a) {
        setTimeout(a, 4)
      } : function(a) {
        a()
      }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
        contexts: contexts,
        newContext: newContext
      }, req({}), each(["toUrl", "undef", "defined", "specified"], function(a) {
        req[a] = function() {
          var b = contexts[defContextName];
          return b.require[a].apply(b, arguments)
        }
      }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(a, b, c) {
        var d = a.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
        return d.type = a.scriptType || "text/javascript", d.charset = "utf-8", d.async = !0, d
      }, req.load = function(a, b, c) {
        var d, e = a && a.config || {};
        if (isBrowser) return d = req.createNode(e, b, c), e.onNodeCreated && e.onNodeCreated(d, e, b, c), d.setAttribute("data-requirecontext", a.contextName), d.setAttribute("data-requiremodule", b), !d.attachEvent || d.attachEvent.toString && d.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (d.addEventListener("load", a.onScriptLoad, !1), d.addEventListener("error", a.onScriptError, !1)) : (useInteractive = !0, d.attachEvent("onreadystatechange", a.onScriptLoad)), d.src = c, currentlyAddingScript = d, baseElement ? head.insertBefore(d, baseElement) : head.appendChild(d), currentlyAddingScript = null, d;
        if (isWebWorker) try {
          importScripts(c), a.completeLoad(b)
        } catch (f) {
          a.onError(makeError("importscripts", "importScripts failed for " + b + " at " + c, f, [b]))
        }
      }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(a) {
        return head || (head = a.parentNode), dataMain = a.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
      }), define = function(a, b, c) {
        var d, e;
        "string" != typeof a && (c = b, b = a, a = null), isArray(b) || (c = b, b = null), !b && isFunction(c) && (b = [], c.length && (c.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(a, c) {
          b.push(c)
        }), b = (1 === c.length ? ["require"] : ["require", "exports", "module"]).concat(b))), useInteractive && (d = currentlyAddingScript || getInteractiveScript(), d && (a || (a = d.getAttribute("data-requiremodule")), e = contexts[d.getAttribute("data-requirecontext")])), e ? (e.defQueue.push([a, b, c]), e.defQueueMap[a] = !0) : globalDefQueue.push([a, b, c])
      }, define.amd = {
        jQuery: !0
      }, req.exec = function(text) {
        return eval(text)
      }, req(cfg)
    }
  }(this), define("almond", function() {}), define("jquery-private", ["jquery"], function(a) {
    return a.noConflict(!0)
  }), define("common/extensions/customScrollbar", ["jquery"], function(a) {
    ! function(b, c) {
      function d(a, c, d) {
        a._eventHandlers = a._eventHandlers || [{
          element: a.scroller,
          handler: function(b) {
            a.scroll(b)
          },
          type: "scroll"
        }, {
          element: a.scroller,
          handler: function() {
            a.update()
          },
          type: "keyup"
        }, {
          element: a.bar,
          handler: function(b) {
            b.preventDefault(), a.selection(), a.drag.now = 1
          },
          type: "touchstart mousedown"
        }, {
          element: document,
          handler: function() {
            a.selection(1), a.drag.now = 0
          },
          type: "mouseup blur touchend"
        }, {
          element: document,
          handler: function(b) {
            2 != b.button && a._pos0(b)
          },
          type: "touchstart mousedown"
        }, {
          element: document,
          handler: function(b) {
            a.drag.now && a.drag(b)
          },
          type: "mousemove touchmove"
        }, {
          element: b,
          handler: function() {
            a.update()
          },
          type: "resize"
        }, {
          element: a.root,
          handler: function() {
            a.update()
          },
          type: "sizeChange"
        }], m(a._eventHandlers, function(a) {
          a.element && c(a.element, a.type, a.handler, d)
        })
      }

      function e(a, b, c) {
        var d = "data-baron-" + b;
        if ("on" == c) a.setAttribute(d, "inited");
        else {
          if ("off" != c) return a.getAttribute(d);
          a.removeAttribute(d)
        }
      }

      function f(a) {
        if (e(a.root, a.direction)) throw new Error("Second baron initialization");
        var b = new o.prototype.constructor(a);
        return d(b, a.event, "on"), e(b.root, a.direction, "on"), b.update({
          initMode: !0
        }), b
      }

      function g(a) {
        var b = {};
        a = a || {};
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
      }

      function h(a) {
        var b = g(a);
        b.direction = b.direction || "v";
        var c = a.event || function(a, c, d, e) {
          b.$(a)[e || "on"](c, d)
        };
        return b.event = function(a, b, d, e) {
          m(a, function(a) {
            c(a, b, d, e)
          })
        }, b
      }

      function i(a) {
        if (this.events && this.events[a])
          for (var b = 0; b < this.events[a].length; b++) {
            var c = Array.prototype.slice.call(arguments, 1);
            this.events[a][b].apply(this, c)
          }
      }
      if (b) {
        var j = n,
          k = ["left", "top", "right", "bottom", "width", "height"],
          l = {
            v: {
              x: "Y",
              pos: k[1],
              oppos: k[3],
              crossPos: k[0],
              crossOpPos: k[2],
              size: k[5],
              crossSize: k[4],
              client: "clientHeight",
              crossClient: "clientWidth",
              crossScroll: "scrollWidth",
              offset: "offsetHeight",
              crossOffset: "offsetWidth",
              offsetPos: "offsetTop",
              scroll: "scrollTop",
              scrollSize: "scrollHeight"
            },
            h: {
              x: "X",
              pos: k[0],
              oppos: k[2],
              crossPos: k[1],
              crossOpPos: k[3],
              size: k[4],
              crossSize: k[5],
              client: "clientWidth",
              crossClient: "clientHeight",
              crossScroll: "scrollHeight",
              offset: "offsetWidth",
              crossOffset: "offsetHeight",
              offsetPos: "offsetLeft",
              scroll: "scrollLeft",
              scrollSize: "scrollWidth"
            }
          },
          m = function(a, d) {
            var e = 0;
            for ((a.length === c || a === b) && (a = [a]); a[e];) d.call(this, a[e], e), e++
          },
          n = function(a) {
            var c, d, e;
            return a = a || {}, e = a.$ || b.jQuery, c = this instanceof e, c ? a.root = d = this : d = e(a.root || a.scroller), new n.fn.constructor(d, a, e)
          };
        n.fn = {
          constructor: function(a, b, c) {
            var d = h(b);
            d.$ = c, m.call(this, a, function(a, b) {
              var c = g(d);
              d.root && d.scroller ? (c.scroller = d.$(d.scroller, a), c.scroller.length || (c.scroller = a)) : c.scroller = a, c.root = a, this[b] = f(c), this.length = b + 1
            }), this.params = d
          },
          dispose: function() {
            var a = this.params;
            m(this, function(b) {
              b.dispose(a)
            }), this.params = null
          },
          update: function() {
            for (var a = 0; this[a];) this[a].update.apply(this[a], arguments), a++
          },
          baron: function(a) {
            return a.root = [], a.scroller = this.params.scroller, m.call(this, this, function(b) {
              a.root.push(b.root)
            }), a.direction = "v" == this.params.direction ? "h" : "v", a._chain = !0, n(a)
          }
        };
        var o = {};
        o.prototype = {
          constructor: function(a) {
            function b(a, b) {
              return k(a, b)[0]
            }

            function d(a) {
              var b = this.barMinSize || 20;
              a > 0 && b > a && (a = b), this.bar && k(this.bar).css(this.origin.size, parseInt(a, 10) + "px")
            }

            function e(a) {
              this.bar && k(this.bar).css(this.origin.pos, +a + "px")
            }

            function f() {
              return o[this.origin.client] - this.barTopLimit - this.bar[this.origin.offset]
            }

            function g(a) {
              return a * f.call(this) + this.barTopLimit
            }

            function h(a) {
              return (a - this.barTopLimit) / f.call(this)
            }

            function j() {
              return !1
            }
            var k, m, n, o, p, q, r, s, t, u, v;
            return u = t = (new Date).getTime(), k = this.$ = a.$, this.event = a.event, this.events = {}, this.root = a.root, this.scroller = b(a.scroller), this.bar = b(a.bar, this.root), o = this.track = b(a.track, this.root), !this.track && this.bar && (o = this.bar.parentNode), this.clipper = this.scroller.parentNode, this.direction = a.direction, this.origin = l[this.direction], this.barOnCls = a.barOnCls, this.scrollingCls = a.scrollingCls, this.barTopLimit = 0, s = 1e3 * a.pause || 0, this.cursor = function(a) {
              return a["client" + this.origin.x] || (((a.originalEvent || a).touches || {})[0] || {})["page" + this.origin.x]
            }, this.pos = function(a) {
              var b = "page" + this.origin.x + "Offset",
                d = this.scroller[b] ? b : this.origin.scroll;
              return a !== c && (this.scroller[d] = a), this.scroller[d]
            }, this.rpos = function(a) {
              var b, c = this.scroller[this.origin.scrollSize] - this.scroller[this.origin.client];
              return b = a ? this.pos(a * c) : this.pos(), b / (c || 1)
            }, this.barOn = function(a) {
              this.barOnCls && (a || this.scroller[this.origin.client] >= this.scroller[this.origin.scrollSize] ? k(this.root).removeClass(this.barOnCls) : k(this.root).addClass(this.barOnCls))
            }, this._pos0 = function(a) {
              n = this.cursor(a) - m
            }, this.drag = function(a) {
              this.scroller[this.origin.scroll] = h.call(this, this.cursor(a) - n) * (this.scroller[this.origin.scrollSize] - this.scroller[this.origin.client])
            }, this.selection = function(a) {
              this.event(document, "selectpos selectstart", j, a ? "off" : "on")
            }, this.resize = function() {
              function b() {
                var b, d;
                c.barOn(), d = c.scroller[c.origin.crossClient], b = c.scroller[c.origin.crossOffset] - d, a.freeze && !c.clipper.style[c.origin.crossSize] && k(c.clipper).css(c.origin.crossSize, c.clipper[c.origin.crossClient] - b + "px"), k(c.scroller).css(c.origin.crossSize, c.clipper[c.origin.crossClient] + b + "px"), Array.prototype.unshift.call(arguments, "resize"), i.apply(c, arguments), u = (new Date).getTime()
              }
              var c = this,
                d = 0;
              (new Date).getTime() - u < s && (clearTimeout(p), d = s), d ? p = setTimeout(b, d) : b()
            }, this.updatePositions = function() {
              var a, b = this;
              b.bar && (a = (o[b.origin.client] - b.barTopLimit) * b.scroller[b.origin.client] / b.scroller[b.origin.scrollSize], parseInt(v, 10) != parseInt(a, 10) && (d.call(b, a), v = a), m = g.call(b, b.rpos()), e.call(b, m)), Array.prototype.unshift.call(arguments, "scroll"), i.apply(b, arguments), t = (new Date).getTime()
            }, this.scroll = function() {
              var a = 0,
                b = this;
              (new Date).getTime() - t < s && (clearTimeout(q), a = s), (new Date).getTime() - t < s && (clearTimeout(q), a = s), a ? q = setTimeout(function() {
                b.updatePositions()
              }, a) : b.updatePositions(), b.scrollingCls && (r || this.$(this.scroller).addClass(this.scrollingCls), clearTimeout(r), r = setTimeout(function() {
                b.$(b.scroller).removeClass(b.scrollingCls), r = c
              }, 300))
            }, this
          },
          update: function(a) {
            return i.call(this, "upd", a), this.resize(1), this.updatePositions(), this
          },
          dispose: function(b) {
            d(this, this.event, "off"), e(this.root, b.direction, "off"), a(this.scroller).css(this.origin.crossSize, ""), this.barOn(!0), i.call(this, "dispose")
          },
          on: function(a, b, c) {
            for (var d = a.split(" "), e = 0; e < d.length; e++) "init" == d[e] ? b.call(this, c) : (this.events[d[e]] = this.events[d[e]] || [], this.events[d[e]].push(function(a) {
              b.call(this, a || c)
            }))
          }
        }, n.fn.constructor.prototype = n.fn, o.prototype.constructor.prototype = o.prototype, n.noConflict = function() {
          return b.baron = j, n
        }, n.version = "0.7.7", a && a.fn && (a.fn.baron = n), b.baron = n, b.module && module.exports && (module.exports = n.noConflict())
      }
    }(window),
    function(a, b) {
      var c = function(a) {
        function c(a, c, d) {
          var e = 1 == d ? "pos" : "oppos";
          g < (h.minView || 0) && (c = b), this.$(f[a]).css(this.origin.pos, "").css(this.origin.oppos, "").removeClass(h.outside), c !== b && (c += "px", this.$(f[a]).css(this.origin[e], c).addClass(h.outside))
        }

        function d(a) {
          try {
            i = document.createEvent("WheelEvent"), i.initWebKitWheelEvent(a.originalEvent.wheelDeltaX, a.originalEvent.wheelDeltaY), m.dispatchEvent(i), a.preventDefault()
          } catch (a) {}
        }

        function e(a) {
          var b;
          for (var c in a) h[c] = a[c];
          if (f = this.$(h.elements, this.scroller)) {
            g = this.scroller[this.origin.client];
            for (var e = 0; e < f.length; e++) b = {}, b[this.origin.size] = f[e][this.origin.offset], f[e].parentNode !== this.scroller && this.$(f[e].parentNode).css(b), b = {}, b[this.origin.crossSize] = f[e].parentNode[this.origin.crossClient], this.$(f[e]).css(b), g -= f[e][this.origin.offset], l[e] = f[e].parentNode[this.origin.offsetPos], j[e] = j[e - 1] || 0, k[e] = k[e - 1] || Math.min(l[e], 0), f[e - 1] && (j[e] += f[e - 1][this.origin.offset], k[e] += f[e - 1][this.origin.offset]), (0 != e || 0 != l[e]) && (this.event(f[e], "mousewheel", d, "off"), this.event(f[e], "mousewheel", d));
            h.limiter && f[0] && (this.track && this.track != this.scroller ? (b = {}, b[this.origin.pos] = f[0].parentNode[this.origin.offset], this.$(this.track).css(b)) : this.barTopLimit = f[0].parentNode[this.origin.offset], this.scroll()), h.limiter === !1 && (this.barTopLimit = 0)
          }
          var i = {
            element: f,
            handler: function() {
              for (var a, b = o(this)[0].parentNode, c = b.offsetTop, d = 0; d < f.length; d++) f[d] === this && (a = d);
              var e = c - j[a];
              h.scroll ? h.scroll({
                x1: p.scroller.scrollTop,
                x2: e
              }) : p.scroller.scrollTop = e
            },
            type: "click"
          };
          h.clickable && (this._eventHandlers.push(i), n(i.element, i.type, i.handler, "on"))
        }
        var f, g, h = {
            outside: "",
            inside: "",
            before: "",
            after: "",
            past: "",
            future: "",
            radius: 0,
            minView: 0
          },
          j = [],
          k = [],
          l = [],
          m = this.scroller,
          n = this.event,
          o = this.$,
          p = this;
        this.on("init", e, a);
        var q = [],
          r = [];
        this.on("init scroll", function() {
          var a, d, e;
          if (f) {
            for (var i, m = 0; m < f.length; m++) a = 0, l[m] - this.pos() < k[m] + h.radius ? (a = 1, d = j[m]) : l[m] - this.pos() > k[m] + g - h.radius ? (a = 2, d = this.scroller[this.origin.client] - f[m][this.origin.offset] - j[m] - g) : (a = 3, d = b), e = !1, (l[m] - this.pos() < k[m] || l[m] - this.pos() > k[m] + g) && (e = !0), (a != q[m] || e != r[m]) && (c.call(this, m, d, a), q[m] = a, r[m] = e, i = !0);
            if (i)
              for (m = 0; m < f.length; m++) 1 == q[m] && h.past && this.$(f[m]).addClass(h.past).removeClass(h.future), 2 == q[m] && h.future && this.$(f[m]).addClass(h.future).removeClass(h.past), 3 == q[m] ? ((h.future || h.past) && this.$(f[m]).removeClass(h.past).removeClass(h.future), h.inside && this.$(f[m]).addClass(h.inside)) : h.inside && this.$(f[m]).removeClass(h.inside), q[m] != q[m + 1] && 1 == q[m] && h.before ? this.$(f[m]).addClass(h.before).removeClass(h.after) : q[m] != q[m - 1] && 2 == q[m] && h.after ? this.$(f[m]).addClass(h.after).removeClass(h.before) : this.$(f[m]).removeClass(h.before).removeClass(h.after), h.grad && (r[m] ? this.$(f[m]).addClass(h.grad) : this.$(f[m]).removeClass(h.grad))
          }
        }), this.on("resize upd", function(a) {
          e.call(this, a && a.fix)
        })
      };
      baron.fn.fix = function(a) {
        for (var b = 0; this[b];) c.call(this[b], a), b++;
        return this
      }
    }(window),
    function(a, b) {
      var c = function(a) {
        var b, c, d, e, f, g = this;
        e = a.screen || .9, a.forward && (b = this.$(a.forward, this.clipper), f = {
          element: b,
          handler: function() {
            var b = g.pos() - a.delta || 30;
            g.pos(b)
          },
          type: "click"
        }, this._eventHandlers.push(f), this.event(f.element, f.type, f.handler, "on")), a.backward && (c = this.$(a.backward, this.clipper), f = {
          element: c,
          handler: function() {
            var b = g.pos() + a.delta || 30;
            g.pos(b)
          },
          type: "click"
        }, this._eventHandlers.push(f), this.event(f.element, f.type, f.handler, "on")), a.track && (d = a.track === !0 ? this.track : this.$(a.track, this.clipper)[0], d && (f = {
          element: d,
          handler: function(a) {
            var b = a["offset" + g.origin.x],
              c = g.bar[g.origin.offsetPos],
              d = 0;
            c > b ? d = -1 : b > c + g.bar[g.origin.offset] && (d = 1);
            var f = g.pos() + d * e * g.scroller[g.origin.client];
            g.pos(f)
          },
          type: "mousedown"
        }, this._eventHandlers.push(f), this.event(f.element, f.type, f.handler, "on")))
      };
      baron.fn.controls = function(a) {
        for (var b = 0; this[b];) c.call(this[b], a), b++;
        return this
      }
    }(window),
    function(a, b) {
      var c = function(a) {
        function b() {
          return r.scroller[r.origin.scroll] + r.scroller[r.origin.offset]
        }

        function c() {
          return r.scroller[r.origin.scrollSize]
        }

        function d() {
          return r.scroller[r.origin.client]
        }

        function e(a, b) {
          var c = 5e-4 * a;
          return Math.floor(b - c * (a + 550))
        }

        function f(a) {
          k = a, a ? (g(), h = setInterval(g, 200)) : clearInterval(h)
        }

        function g() {
          var g, h, k = {},
            w = b(),
            x = c(),
            y = 1 == s;
          if (h = 0, s > 0 && (h = 40), g = e(u, h), w >= x - u && s > -1 ? y && (u += g) : u = 0, 0 > u && (u = 0), k[m] = u + "px", d() <= c()) {
            r.$(l).css(k);
            for (var z = 0; z < p.length; z++) r.$(p[z].self).css(p[z].property, Math.min(u / n * 100, 100) + "%")
          }
          q && u && r.$(r.root).addClass(q), 0 == u && a.onCollapse && a.onCollapse(), s = 0, i = setTimeout(function() {
            s = -1
          }, v), o && u > n && !j && (o(), j = !0), 0 == u ? t++ : t = 0, t > 1 && (f(!1), j = !1, q && r.$(r.root).removeClass(q))
        }
        var h, i, j, k, l = this.$(a.block),
          m = a.size || this.origin.size,
          n = a.limit || 80,
          o = a.onExpand,
          p = a.elements || [],
          q = a.inProgress || "",
          r = this,
          s = 0,
          t = 0,
          u = 0,
          v = a.waiting || 500;
        this.on("init", function() {
          f(!0)
        }), this.on("dispose", function() {
          f(!1)
        }), this.event(this.scroller, "mousewheel DOMMouseScroll", function(a) {
          var d = a.wheelDelta < 0 || a.originalEvent && a.originalEvent.wheelDelta < 0 || a.detail > 0;
          d && (s = 1, clearTimeout(i), !k && b() >= c() && f(!0))
        })
      };
      baron.fn.pull = function(a) {
        for (var b = 0; this[b];) c.call(this[b], a), b++;
        return this
      }
    }(window),
    function(a, b) {
      var c = a.MutationObserver || a.WebKitMutationObserver || a.MozMutationObserver || null,
        d = function() {
          var a = this;
          this._observer = new MutationObserver(function() {
            a.update()
          }), this.on("init", function() {
            a._observer.observe(a.root, {
              childList: !0,
              subtree: !0,
              characterData: !0
            })
          }), this.on("dispose", function() {
            a._observer.dissconect(), delete a._observer
          })
        };
      baron.fn.autoUpdate = function(a) {
        if (!c) return this;
        for (var b = 0; this[b];) d.call(this[b], a), b++;
        return this
      }
    }(window)
  }), define("common/extensions/browserDetect", [], function() {
    var a = {
      init: function() {
        this.browser = this.searchString(this.dataBrowser) || "-", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "", this.OS = this.searchString(this.dataOS) || "-", "Opera" === this.browser && (navigator.userAgent.split("Version/")[1] ? this.version = navigator.userAgent.split("Version/")[1] : this.version = parseFloat(navigator.userAgent.split("OPR/")[1]).toFixed(1)), this.isMobile = navigator.userAgent.indexOf("Mobile") > -1
      },
      searchString: function(a) {
        var b;
        for (b = 0; b < a.length; b++) {
          var c = a[b].string,
            d = a[b].prop;
          if (this.versionSearchString = a[b].versionSearch || a[b].identity, c) {
            if (-1 !== c.indexOf(a[b].subString)) return a[b].identity + (a[b].version ? " " + a[b].version() : "")
          } else if (d) return a[b].identity + (a[b].version ? " " + a[b].version() : "")
        }
      },
      searchVersion: function(a) {
        var b = a.indexOf(this.versionSearchString);
        if (-1 !== b) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
      },
      dataBrowser: [{
        string: navigator.userAgent,
        subString: "Android",
        identity: "Android"
      }, {
        string: navigator.userAgent,
        subString: "OPR/",
        identity: "Opera"
      }, {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
      }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      }, {
        string: navigator.userAgent,
        subString: "Safari",
        identity: "Safari",
        versionSearch: "Version"
      }, {
        prop: window.opera,
        identity: "Opera"
      }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
      }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone"
      }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
      }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
      }, {
        string: navigator.userAgent,
        subString: "Gecko/",
        identity: "Mozilla",
        versionSearch: "rv"
      }, {
        string: navigator.userAgent,
        subString: "Trident",
        identity: "Explorer",
        versionSearch: "rv"
      }],
      dataOS: [{
        string: navigator.userAgent,
        subString: "Android",
        identity: "android",
        version: function() {
          return navigator.userAgent.substr(navigator.userAgent.indexOf("Android ") + 8, 3)
        }
      }, {
        string: navigator.platform,
        subString: "Win",
        identity: "windows",
        version: function() {
          var a = navigator.userAgent.substr(navigator.userAgent.indexOf("NT ") + 3, 3);
          switch (a) {
            case "6.3":
              return "8.1";
            case "6.2":
              return "8";
            case "6.1":
              return "7";
            case "6.0":
              return "Vista";
            case "5.1":
              return "XP";
            case "5.0":
              return "2000";
            case "4.1":
              return "NT 4.1";
            default:
              return ""
          }
        }
      }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "mac"
      }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iOS"
      }, {
        string: navigator.userAgent,
        subString: "iPad",
        identity: "iOS"
      }, {
        string: navigator.userAgent,
        subString: "iPod",
        identity: "iOS"
      }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "linux"
      }],
      isMobile: !1
    };
    return a.init(), a
  }), define("common/extensions/jquery.disableSelection", ["jquery", "common/extensions/browserDetect"], function(a, b) {
    "Firefox" === b.browser ? (a.fn.disableTextSelect = function() {
      return this.each(function() {
        a(this).css("MozUserSelect", "none")
      })
    }, a.fn.enableTextSelect = function() {
      return this.each(function() {
        a(this).css("MozUserSelect", "")
      })
    }) : navigator && navigator.userAgent && navigator.userAgent.indexOf("WebKit") > -1 ? (a.fn.disableTextSelect = function() {
      return this.each(function() {
        a(this).css("-webkit-user-select", "none")
      })
    }, a.fn.enableTextSelect = function() {
      return this.each(function() {
        a(this).css("-webkit-user-select", "")
      })
    }) : "Explorer" === b.browser ? (a.fn.disableTextSelect = function() {
      return this.each(function() {
        a(this).bind("selectstart.disableTextSelect", function() {
          return !1
        })
      })
    }, a.fn.enableTextSelect = function() {
      return this.each(function() {
        a(this).unbind("selectstart.disableTextSelect")
      })
    }) : (a.fn.disableTextSelect = function() {
      return this.each(function() {
        a(this).bind("mousedown.disableTextSelect", function() {
          return !1
        })
      })
    }, a.fn.enableTextSelect = function() {
      return this.each(function() {
        a(this).unbind("mousedown.disableTextSelect")
      })
    })
  }), define("common/extensions/jquery.easing", ["jquery"], function(a) {
    a.easing.rh_expIn = function(a, b, c, d) {
      return 0 == b ? c : c + d * Math.pow(2, 10 * (a - 1))
    }, a.easing.rh_expOut = function(a, b, c, d) {
      return 1 == a ? c + d : c + d * (1 - Math.pow(2, -10 * a))
    }, a.easing.rh_in = function(a, b, c, d) {
      return c + d * a * a * (3 * a - 2)
    }, a.easing.rh_out = function(a, b, c, d) {
      return c + d * ((a - 1) * (a - 1) * (3 * (a - 1) + 2) + 1)
    }, a.easing.rh_bounce = function(a, b, c, d) {
      var e = 1 / 2.75;
      return e > a ? c + d * (7.5625 * a * a) : 2 * e > a ? c + d * (7.5625 * (a - 1.5 * e) * (a - 1.5 * e) + .75) : 2.5 * e > a ? c + d * (7.5625 * (a - 2.25 * e) * (a - 2.25 * e) + .9375) : c + d * (7.5625 * (a - 2.625 * e) * (a - 2.625 * e) + .984375)
    }
  }), define("common/extensions/jquery.fix", ["jquery"], function(a) {
    function b(a) {
      return "object" == typeof Node ? a instanceof Node : a && "object" == typeof a && "number" == typeof a.nodeType && "string" == typeof a.nodeName
    }
    a.fn.oldIs = a.fn.oldIs || a.fn.is, a.fn.is = function(a) {
      return ":visible" == a ? "none" != this.css("display") && this.oldIs(":visible") : this.oldIs(a)
    }, a.fn.oldFind = a.fn.oldFind || a.fn.find, a.fn.find = function(a) {
      var c = this.oldFind(a),
        d = c[0];
      return d && d[0] && !b(d) && (c = d), c
    }, a.fn.oldHeight = a.fn.oldHeight || a.fn.height, a.fn.height = function() {
      return this[0] === window ? window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight : this.oldHeight()
    }, a.acceptData = function(b) {
      if ("string" == typeof b.nodeName) {
        var c = a.noData[b.nodeName.toLowerCase()];
        if (c) return !(c === !0 || b.getAttribute("classid") !== c)
      }
      return !0
    }
  }), define("common/extensions/jquery.getpath", ["jquery"], function(a) {
    function b(a) {
      for (var b = [], c = [], d = a, e = Number(new Date); d.length;) {
        var f = d[0];
        if (void 0 !== f.path && e - f.pathTime < 1e3) {
          c.push(f.path);
          break
        }
        var g = f.localName || f.tagName || f.nodeName;
        if (!g || "#document" == g) break;
        g = g.toLowerCase();
        var h = d.parent(),
          i = h.children(g);
        i.length > 1 && (g += ":eq(" + i.index(d) + ")"), b.push(d[0]), c.push(g), d = h
      }
      var j = b.length,
        k = c.pop();
      c.length === b.length && c.length > 0 && (k = k + ">" + c.pop());
      for (var l = j - 1; l >= 0; l--) b[l].path = k, b[l].pathTime = e, l > 0 && (k += ">" + c[l - 1]);
      return k
    }
    a.fn.getPath = function() {
      if (0 == this.length) throw "Requires one element.";
      return b(this)
    }
  }), define("common/extensions/jquery.getvisible", ["jquery"], function(a) {
    return a.fn.getVisible = function() {
      if (this.length <= 1) return this;
      var b = function(b) {
          if (!a(b).is(":visible")) return {
            top: 0,
            left: 0,
            width: 0,
            height: 0
          };
          var c = {
            left: parseInt(a(b).css("padding-left")),
            right: parseInt(a(b).css("padding-right")),
            top: parseInt(a(b).css("padding-top")),
            bottom: parseInt(a(b).css("padding-bottom"))
          };
          for (var d in c) c[d] != c[d] && (c[d] = 0);
          var e = {
            left: parseInt(a(b).css("border-left-width")),
            right: parseInt(a(b).css("border-right-width")),
            top: parseInt(a(b).css("border-top-width")),
            bottom: parseInt(a(b).css("border-bottom-width"))
          };
          for (d in e) e[d] != e[d] && (e[d] = 0);
          var f = a(b).offset();
          return f.width = a(b).width() + c.left + c.right + e.left + e.right, f.height = a(b).height() + c.top + c.bottom + e.top + e.bottom, f
        },
        c = function(a, b) {
          return a.left + a.width > b.left && b.left + b.width > a.left && a.top + a.height > b.top && b.top + b.height > a.top
        },
        d = {
          left: a(window).scrollLeft(),
          top: a(window).scrollTop(),
          width: a(window).width(),
          height: a(window).height()
        },
        e = null;
      return a.each(this, function(a, f) {
        return c(d, b(f)) ? (e = f, !1) : void 0
      }), a(e)
    }, a
  }), define("common/extensions/jquery.maskedinput", ["jquery"], function(a) {
    return function(a) {
      function b() {
        var a = document.createElement("input"),
          b = "onpaste";
        return a.setAttribute(b, ""), "function" == typeof a[b] ? "paste" : "input"
      }
      var c, d = b() + ".mask",
        e = navigator.userAgent,
        f = /iphone/i.test(e),
        g = /android/i.test(e);
      a.mask = {
        definitions: {
          9: "[0-9]",
          a: "[A-Za-z]",
          "*": "[A-Za-z0-9]"
        },
        dataName: "rawMaskFn",
        placeholder: "_"
      }, a.fn.extend({
        caret: function(a, b) {
          var c;
          if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function() {
            this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select())
          })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
            begin: a,
            end: b
          })
        },
        unmask: function() {
          return this.trigger("unmask")
        },
        mask: function(b, e) {
          var h, i, j, k, l, m;
          return !b && this.length > 0 ? (h = a(this[0]), h.data(a.mask.dataName)()) : (e = a.extend({
            placeholder: a.mask.placeholder,
            completed: null
          }, e), i = a.mask.definitions, j = [], k = m = b.length, l = null, a.each(b.split(""), function(a, b) {
            "?" == b ? (m--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1)) : j.push(null)
          }), this.trigger("unmask").each(function() {
            function h(a) {
              for (; ++a < m && !j[a];);
              return a
            }

            function n(a) {
              for (; --a >= 0 && !j[a];);
              return a
            }

            function o(a, b) {
              var c, d;
              if (!(0 > a)) {
                for (c = a, d = h(b); m > c; c++)
                  if (j[c]) {
                    if (!(m > d && j[c].test(w[d]))) break;
                    w[c] = w[d], w[d] = e.placeholder, d = h(d)
                  }
                t(), v.caret(Math.max(l, a))
              }
            }

            function p(a) {
              var b, c, d, f;
              for (b = a, c = e.placeholder; m > b; b++)
                if (j[b]) {
                  if (d = h(b), f = w[b], w[b] = c, !(m > d && j[d].test(f))) break;
                  c = f
                }
            }

            function q(a) {
              var b, c, d, e = a.which;
              8 === e || 46 === e || f && 127 === e ? (b = v.caret(), c = b.begin, d = b.end, d - c === 0 && (c = 46 !== e ? n(c) : d = h(c - 1), d = 46 === e ? h(d) : d), s(c, d), o(c, d - 1), a.preventDefault()) : 27 == e && (v.val(x), v.caret(0, u()), a.preventDefault())
            }

            function r(b) {
              var c, d, f, i = b.which,
                k = v.caret();
              b.ctrlKey || b.altKey || b.metaKey || 32 > i || i && (k.end - k.begin !== 0 && (s(k.begin, k.end), o(k.begin, k.end - 1)), c = h(k.begin - 1), m > c && (d = String.fromCharCode(i), j[c].test(d) && (p(c), w[c] = d, t(), f = h(c), g ? setTimeout(a.proxy(a.fn.caret, v, f), 0) : v.caret(f), e.completed && f >= m && e.completed.call(v))), b.preventDefault())
            }

            function s(a, b) {
              var c;
              for (c = a; b > c && m > c; c++) j[c] && (w[c] = e.placeholder)
            }

            function t() {
              v.val(w.join(""))
            }

            function u(a) {
              var b, c, d = v.val(),
                f = -1;
              for (b = 0, pos = 0; m > b; b++)
                if (j[b]) {
                  for (w[b] = e.placeholder; pos++ < d.length;)
                    if (c = d.charAt(pos - 1), j[b].test(c)) {
                      w[b] = c, f = b;
                      break
                    }
                  if (pos > d.length) break
                } else w[b] === d.charAt(pos) && b !== k && (pos++, f = b);
              return a ? t() : k > f + 1 ? (v.val(""), s(0, m)) : (t(), v.val(v.val().substring(0, f + 1))), k ? b : l
            }
            var v = a(this),
              w = a.map(b.split(""), function(a, b) {
                return "?" != a ? i[a] ? e.placeholder : a : void 0
              }),
              x = v.val();
            v.data(a.mask.dataName, function() {
              return a.map(w, function(a, b) {
                return j[b] && a != e.placeholder ? a : null
              }).join("")
            }), v.attr("readonly") || v.one("unmask", function() {
              v.unbind(".mask").removeData(a.mask.dataName)
            }).bind("focus.mask", function() {
              v.removeClass("placeholder"), clearTimeout(c);
              var a;
              x = v.val(), a = u(), c = setTimeout(function() {
                t(), a == b.length ? v.caret(0, a) : v.caret(a)
              }, 10)
            }).bind("blur.mask", function() {
              u(), v.val() != x ? v.change() : v.addClass("placeholder")
            }).bind("keydown.mask", q).bind("keypress.mask", r).bind(d, function() {
              setTimeout(function() {
                var a = u(!0);
                v.caret(a), e.completed && a == v.val().length && e.completed.call(v)
              }, 0)
            }), u()
          }))
        }
      })
    }(a), a
  }), define("common/extensions/jquery.minbox", ["jquery"], function(a) {
    var b = function(a) {
        var b = {
          "font-family": a.css("font-family"),
          "font-size": a.css("font-size"),
          "font-weight": a.css("font-weight"),
          "line-height": a.css("line-height")
        };
        return b
      },
      c = function(c, d, e) {
        e = e || 4048;
        var f = 0,
          g = b(c),
          h = a("<div/>").css(g).html(c.html());
        h.css("float", "left"), h.css("height", d + "px"), h.appendTo("body"), f = h.width(), h.css("height", "auto"), h.css("float", "none"), h.css("width", e / 2);
        var i = 1,
          j = e,
          k = j;
        for (j /= 2; Math.abs(k - j) > i;) h.height() <= d ? (k = j, j /= 2) : j = (k + j) / 2, h.css("width", j);
        var l;
        return l = h.height() > d ? k : j, h.remove(), l > 1 ? l : f
      };
    a.fn.minBox = function(a) {
      return c(this, a)
    }
  }), define("common/extensions/jquery.placeholder", ["jquery"], function(a) {
    ! function(a, b, c) {
      function d(a) {
        var b = {},
          d = /^jQuery\d+$/;
        return c.each(a.attributes, function(a, c) {
          c.specified && !d.test(c.name) && (b[c.name] = c.value)
        }), b
      }

      function e(a, b) {
        var d = this,
          e = c(d);
        if (e.hasClass("placeholder"))
          if (e.data("placeholder-password")) {
            if (e = e.hide().next().show().attr("id", e.removeAttr("id").data("placeholder-id")), a === !0) return e[0].value = b;
            e.focus()
          } else d.value = "", e.removeClass("placeholder"), d == g() && d.select()
      }

      function f() {
        var a, b = this,
          f = c(b),
          g = this.id;
        if ("" == b.value) {
          if ("password" == b.type) {
            if (!f.data("placeholder-textinput")) {
              try {
                a = f.clone().attr({
                  type: "text"
                })
              } catch (h) {
                a = c("<input>").attr(c.extend(d(this), {
                  type: "text"
                }))
              }
              a.removeAttr("name").data({
                "placeholder-password": f,
                "placeholder-id": g
              }).bind("focus.placeholder", e), f.data({
                "placeholder-textinput": a,
                "placeholder-id": g
              }).before(a)
            }
            f = f.removeAttr("id").hide().prev().attr("id", g).show()
          }
          f.addClass("placeholder"), f[0].value = f.attr("placeholder")
        } else f.removeClass("placeholder")
      }

      function g() {
        try {
          return b.activeElement
        } catch (a) {}
      }
      var h, i, j = "placeholder" in b.createElement("input"),
        k = "placeholder" in b.createElement("textarea"),
        l = c.fn,
        m = c.valHooks,
        n = c.propHooks;
      j && k ? (i = l.placeholder = function() {
        return this
      }, i.input = i.textarea = !0) : (i = l.placeholder = function() {
        var a = this;
        return a.filter((j ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
          "focus.placeholder": e,
          "blur.placeholder": f
        }).data("placeholder-enabled", !0).trigger("blur.placeholder"), a
      }, i.input = j, i.textarea = k, h = {
        get: function(a) {
          var b = c(a),
            d = b.data("placeholder-password");
          return d ? d[0].value : b.data("placeholder-enabled") && b.hasClass("placeholder") ? "" : a.value
        },
        set: function(a, b) {
          var d = c(a),
            h = d.data("placeholder-password");
          return h ? h[0].value = b : d.data("placeholder-enabled") ? ("" == b ? (a.value = b, a != g() && f.call(a)) : d.hasClass("placeholder") ? e.call(a, !0, b) || (a.value = b) : a.value = b, d) : a.value = b
        }
      }, j || (m.input = h, n.value = h), k || (m.textarea = h, n.value = h), c(function() {
        c(b).delegate("form", "submit.placeholder", function() {
          var a = c(".placeholder", this).each(e);
          setTimeout(function() {
            a.each(f)
          }, 10)
        })
      }), c(a).bind("beforeunload.placeholder", function() {
        c(".placeholder").each(function() {
          this.value = ""
        })
      }))
    }(window, document, a)
  }), define("common/extensions/jquery.postMessage", ["jquery"], function(a) {
    window.postMessage && (a.postMessage = function(a, b) {
      a.postMessage(b, "*")
    }, a.receiveMessage = function(a) {
      window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent && window.attachEvent("onmessage", a)
    })
  }), define("common/extensions/jquery.pulse", ["jquery"], function(a) {
    a.fn.pulse = function(b) {
      var c = a(this).css("opacity");
      a(this).animate({
        opacity: 0
      }, {
        duration: 100,
        queue: !0
      }).animate({
        opacity: c
      }, {
        duration: 120,
        queue: !0
      }).animate({
        opacity: 0
      }, {
        duration: 150,
        queue: !0
      }).animate({
        opacity: c
      }, {
        duration: 170,
        queue: !0
      }).animate({
        opacity: 0
      }, {
        duration: 200,
        queue: !0
      }).animate({
        opacity: c
      }, {
        duration: 300,
        queue: !0
      }).animate({
        opacity: 0
      }, {
        duration: 600,
        queue: !0,
        complete: function() {
          a(this).hide().css("opacity", c), b()
        }
      })
    }
  }), define("common/extensions/jquery.plugins", ["jquery", "common/extensions/customScrollbar", "common/extensions/jquery.disableSelection", "common/extensions/jquery.easing", "common/extensions/jquery.fix", "common/extensions/jquery.getpath", "common/extensions/jquery.getvisible", "common/extensions/jquery.maskedinput", "common/extensions/jquery.minbox", "common/extensions/jquery.placeholder", "common/extensions/jquery.postMessage", "common/extensions/jquery.pulse"], function(a) {
    return a
  }), define("common/extensions/debug", [], function() {
    return {
      log: function(a) {},
      eventLog: function(a) {},
      sessionLog: function(a) {},
      info: function(a) {},
      clear: function() {},
      debug: function(a) {},
      time: function(a) {},
      timeEnd: function(a) {},
      profile: function() {},
      profileEnd: function() {},
      error: function(a) {},
      assert: function(a, b) {}
    }
  }), define("common/application/eventTarget", ["common/extensions/debug"], function(a) {
    function b(a, b) {
      this.message = b, this.name = "Custom Event Exception", this.target = a
    }
    var c = function(a) {
      this._listeners = {}, this.targetName = a
    };
    return c.prototype = {
      addEventListener: function(c, d) {
        var e = "dispatcher_" + c;
        if (void 0 === c || "" === c || "number" == typeof c && isNaN(c) || null === c) throw new b(this.targetName, "empty type");
        if ("function" != typeof d) throw new b(this.targetName, "provided listener for event type " + c + " is not a function");
        this._listeners[e] instanceof Array || (this._listeners[e] = []);
        for (var f in this._listeners[e])
          if (this._listeners[f] === d) return void a.eventLog("Listener already exists:\ntargetName=" + this.targetName + ", type=" + c);
        this._listeners[e].push(d);
        try {
          a.eventLog("New event listener added:\ntargetName=" + this.targetName + ", type=" + c)
        } catch (g) {}
      },
      addOneShotEventListener: function(a, b) {
        var c = function() {
          this.removeEventListener(a, c), b.apply(this, arguments)
        };
        this.addEventListener(a, c)
      },
      removeAllEventListeners: function(b) {
        var c = "dispatcher_" + b;
        if (this._listeners[c]) {
          this._listeners[c] = [];
          try {
            a.eventLog("All listeners were removed\ntargetName=" + this.targetName + ", type=" + b)
          } catch (d) {}
        }
      },
      removeEventListener: function(b, c) {
        var d = "dispatcher_" + b;
        if (this._listeners[d]) {
          var e = this._listeners[d].indexOf(c);
          if (-1 !== e) {
            this._listeners[d].splice(e, 1);
            try {
              a.eventLog("One listener was removed\ntargetName=" + this.targetName + ", type=" + b)
            } catch (f) {}
          }
        }
      },
      fire: function(c, d, e) {
        var f = c;
        if ("string" == typeof c && (c = {
            type: c
          }), c._target || (c._target = this), !c.type) throw new b(this.targetName, "Event missing 'type' property");
        if ("object" == typeof d)
          for (var g in d) "webkitStorageInfo" != g && "webkitIndexedDB" != g && (d.hasOwnProperty = d.hasOwnProperty || Object.prototype.hasOwnProperty, d.hasOwnProperty(g) && (c[g] = d[g]));
        else "function" == typeof d && (e = d, d = null);
        var h = 0,
          i = "dispatcher_" + ("string" == typeof f ? f : c.type);
        if (this._listeners[i])
          for (var j = this._listeners[i].slice(0), k = j.length; k > h; h++)
            if (j[h]) try {
              j[h].call(this, c)
            } catch (l) {
              a.error(l)
            }
            if ("*" !== c.type) {
              var m = "*";
              if (this._listeners[m])
                for (var j = this._listeners[m], k = j.length; k > h; h++) try {
                  j[h].call(this, c)
                } catch (l) {
                  a.error(l)
                }
            }
        if ("function" == typeof e) try {
          e()
        } catch (l) {
          a.error(l)
        }
        if (d && !d.isMessageTarget) try {
          a.eventLog("Event was fired, " + h + " listeners was called:\ntargetName=" + this.targetName + ", type=" + c.type)
        } catch (l) {}
      }
    }, c
  }), define("common/constants/type", {
    STRING: 0,
    BOOLEAN: 1,
    INTEGER: 2,
    OBJECT: 3
  }), define("common/extensions/base64", [], function() {
    var a = {
      CA: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      CAS: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      IA: new Array(256),
      IAS: new Array(256),
      isUtf8: function(a) {
        for (var b = !1, c = 0; c < a.length; c++)
          if (a.charCodeAt(c) > 255) {
            b = !0;
            break
          }
        return b
      },
      toByteArray: function(a, b) {
        var c, d, e = [];
        for (b = "undefined" != typeof b ? b : !0, c = 0; c < a.length; c++) d = a.charCodeAt(c), 127 >= d || !b ? e.push(d) : 2047 >= d ? (e.push(d >> 6 | 192), e.push(63 & d | 128)) : 65535 >= d ? (e.push(d >> 12 | 224), e.push(d >> 6 & 63 | 128), e.push(63 & d | 128)) : (e.push(d >> 18 | 240), e.push(d >> 12 & 63 | 128), e.push(d >> 6 & 63 | 128), e.push(63 & d | 128));
        return e
      },
      fromByteArray: function(a, b) {
        var c, d = "",
          e = 0;
        for (b = "undefined" != typeof b ? b : !0, e = 0; e < a.length; e++) c = a[e], 127 >= c || !b || (192 == (224 & c) ? (c = (31 & c) << 6, c += 63 & a[++e]) : 224 == (240 & c) ? (c = (15 & c) << 12, c += (63 & a[++e]) << 6, c += 63 & a[++e]) : (c = (7 & c) << 18, c += (63 & a[++e]) << 12, c += (63 & a[++e]) << 6, c += 63 & a[++e])), 0 !== c && (d += String.fromCharCode(c));
        return d
      },
      init: function() {
        var b;
        for (b = 0; 256 > b; b++) a.IA[b] = -1, a.IAS[b] = -1;
        for (b = 0, iS = a.CA.length; b < iS; b++) a.IA[a.CA.charCodeAt(b)] = b, a.IAS[a.CAS.charCodeAt(b)] = b;
        a.IA["="] = a.IAS["="] = 0
      },
      encode: function(b, c) {
        var d, e, f, g, h, i, j, k, l, m;
        for (d = c ? a.CAS : a.CA, f = b.constructor == Array ? b : a.toByteArray(b), g = f.length, h = g / 3 * 3, i = (g - 1) / 3 + 1 << 2, e = new Array(i), j = 0, k = 0; h > j;) m = (255 & f[j++]) << 16 | (255 & f[j++]) << 8 | 255 & f[j++], e[k++] = d.charAt(m >> 18 & 63), e[k++] = d.charAt(m >> 12 & 63), e[k++] = d.charAt(m >> 6 & 63), e[k++] = d.charAt(63 & m);
        l = g - h, l > 0 && (m = (255 & f[h]) << 10 | (2 == l ? (255 & f[g - 1]) << 2 : 0), e[i - 4] = d.charAt(m >> 12), e[i - 3] = d.charAt(m >> 6 & 63), e[i - 2] = 2 == l ? d.charAt(63 & m) : "=", e[i - 1] = "=");
        var n = e.join("");
        return n
      },
      decode: function(b, c) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
        for (d = c ? a.IAS : a.IA, b.constructor == Array ? (f = b, h = !0) : (f = a.toByteArray(b), h = !1), g = f.length, i = 0, j = g - 1; j > i && d[f[i]] < 0;) i++;
        for (; j > 0 && d[f[j]] < 0;) j--;
        for (k = "=" == f[j] ? "=" == f[j - 1] ? 2 : 1 : 0, l = j - i + 1, m = g > 76 ? ("\r" == f[76] ? l / 78 : 0) << 1 : 0, n = (6 * (l - m) >> 3) - k, e = new Array(n), o = 0, p = 0, eLen = n / 3 * 3; o < eLen;) q = d[f[i++]] << 18 | d[f[i++]] << 12 | d[f[i++]] << 6 | d[f[i++]], e[o++] = q >> 16 & 255, e[o++] = q >> 8 & 255, e[o++] = 255 & q, m > 0 && 19 == ++p && (i += 2, p = 0);
        if (n > o) {
          for (q = 0, r = 0; j - k >= i; r++) q |= d[f[i++]] << 18 - 6 * r;
          for (s = 16; n > o; s -= 8) e[o++] = q >> s & 255
        }
        return h ? e : a.fromByteArray(e)
      },
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encodeOld: function(b, c) {
        var d, e, f, g, h, i, j, k = "",
          l = 0;
        for (b = a._UTF8Encode(b, c); l < b.length;) d = b.charCodeAt(l++), e = b.charCodeAt(l++), f = b.charCodeAt(l++), g = d >> 2, h = (3 & d) << 4 | e >> 4, i = (15 & e) << 2 | f >> 6, j = 63 & f, isNaN(e) ? i = j = 64 : isNaN(f) && (j = 64), k = k + this._keyStr.charAt(g) + this._keyStr.charAt(h) + this._keyStr.charAt(i) + this._keyStr.charAt(j);
        return k
      },
      decodeOld: function(b, c) {
        var d, e, f, g, h, i, j, k = "",
          l = 0;
        for (b = b.replace(/[^A-Za-z0-9\+\/=]/g, ""); l < b.length;) g = this._keyStr.indexOf(b.charAt(l++)), h = this._keyStr.indexOf(b.charAt(l++)), i = this._keyStr.indexOf(b.charAt(l++)), j = this._keyStr.indexOf(b.charAt(l++)), d = g << 2 | h >> 4, e = (15 & h) << 4 | i >> 2, f = (3 & i) << 6 | j, k += String.fromCharCode(d), 64 !== i && (k += String.fromCharCode(e)), 64 !== j && (k += String.fromCharCode(f));
        return k = a._UTF8Decode(k, c)
      },
      _UTF8Encode: function(a, b) {
        return a = a.replace(/\r\n/g, "\n"), b ? encodeURIComponent(a) : unescape(encodeURIComponent(a))
      },
      _UTF8Decode: function(a, b) {
        return b ? decodeURIComponent(a) : decodeURIComponent(escape(a))
      }
    };
    return a.init(), a
  }), define("common/constants/scope", {
    LOCAL: 0,
    SESSION: 1,
    STORAGE: 2
  }), define("common/application/session", ["common/extensions/jquery.plugins", "common/application/eventTarget", "common/constants/type", "common/extensions/debug", "common/extensions/base64", "common/constants/scope"], function(a, b, c, d, e, f) {
    function g(a) {
      return a === f.STORAGE ? localStorage : a === f.LOCAL ? o : sessionStorage
    }

    function h(a, b, d) {
      var e;
      switch ("undefined" == typeof b && (b = c.STRING), !a && d && (a = p.get(d)), b) {
        case c.BOOLEAN:
          var f = a.toLowerCase();
          e = "true" === f || "yes" === f || "ok" === f || "1" === f;
          break;
        case c.INTEGER:
          e = +a, !e && d && (e = +p.get(d)), e !== e && (e = 0);
          break;
        case c.OBJECT:
          try {
            if (e = JSON.parse(a), "string" == typeof e) try {
              e = JSON.parse(e)
            } catch (g) {}
          } catch (g) {
            e = void 0
          }
          break;
        default:
          e = a
      }
      return e
    }
    if (!window.sessionStorage || !window.localStorage) return {};
    var i = null,
      j = function() {},
      k = null,
      l = "",
      m = !1,
      n = "",
      o = {
        setItem: function(a, b) {
          o[a + ""] = b + ""
        },
        getItem: function(a) {
          return o[a + ""] ? o[a + ""] : null
        }
      },
      p = a.extend(new Image, {
        dispatcher: new b("Session"),
        init: function(a, b) {
          n = "rhlp." + a + ".", i = b, p.fields = [];
          for (var e in i) i.hasOwnProperty(e) && ! function(a) {
            var b = function() {
                var b = p.get(a),
                  c = h(b, i[a].type, i[a].fallback);
                return i[a].value && "" === b ? i[a].value : c
              },
              d = function(b) {
                if (b === b && void 0 !== b && null !== b) {
                  var d = i[a].scope,
                    e = i[a].type;
                  e === c.OBJECT && (b = JSON.stringify(b)), void 0 === d && (d = f.SESSION), p.set(a, b, d)
                }
              };
            !Object.__defineGetter__ && Object.defineProperty ? Object.defineProperty(p, a, {
              get: b,
              set: d
            }) : p.__defineGetter__ && (p.__defineGetter__(a, b), p.__defineSetter__(a, d)), p.fields.push(a)
          }(e);
          var g = function(a) {
            if ((!a.storageArea || a.storageArea !== sessionStorage) && "key" in a && 0 === a.key.indexOf(n)) {
              var b = a.key.substr(n.length);
              p.dispatcher.fire("on" + b.charAt(0).toUpperCase() + b.substr(1) + "Changed", {
                inCurrentTab: !1
              })
            }
          };
          window.addEventListener ? (window.addEventListener("storage", g, !1), window.addEventListener("onstorage", g, !1)) : (window.attachEvent("onstorage", g), document.attachEvent("onstorage", g)), d.sessionLog(["INIT | ", n])
        },
        onLoad: function(a) {
          "function" == typeof a && (j = a), (!k || m) && j()
        },
        get: function(a) {
          if (!i[a]) return "";
          var b = a;
          a = n + a;
          var c = g(i[b].scope);
          return null !== c.getItem(a) ? c.getItem(a) : ""
        },
        set: function(a, b, c, e) {
          if (!e && k && k.send("updateSession", {
              name: a,
              value: b,
              scope: c
            }), p.get(a) !== "" + b) {
            var f = a;
            a = n + a;
            var h = g(c);
            h.setItem(a, b), p.dispatcher.fire("on" + f.charAt(0).toUpperCase() + f.substr(1) + "Changed", {
              inCurrentTab: !0
            }), d.sessionLog("STORAGE | " + a + " = " + b)
          }
        },
        attachTo: function(a, b, d) {
          k = a, l = d, k.addHandler("initSession", function(a) {
            a = JSON.parse(a.value);
            for (var d in a) a.hasOwnProperty(d) && (b[d].priority || (b[d].priority = "external"), b[d] && l !== b[d].priority && (b[d].type === c.OBJECT && (a[d] = JSON.stringify(a[d])), p.set(d, a[d], b[d].scope, !0)));
            m = !0, "function" == typeof j && j()
          }), k.addHandler("requestSession", function(a) {
            a = JSON.parse(a.value);
            var b = {};
            for (var c in a) a.hasOwnProperty(c) && "undefined" != typeof p[c] && (b[c] = p[c]);
            k.send("initSession", {
              value: JSON.stringify(b)
            })
          }), k.addHandler("updateSession", function(a) {
            b[a.name] && (b[a.name].type === c.OBJECT && (a.value = JSON.stringify(a.value)), p.set(a.name, a.value, a.scope, !0))
          })
        },
        clear: function(a) {
          for (var b in i)
            if (i.hasOwnProperty(b)) {
              if (!a && "vid" === b) continue;
              p[b] = i[b].value || ""
            }
        },
        sendRequest: function() {
          k.send("requestSession", {
            value: JSON.stringify(i)
          })
        }
      });
    return p
  }), define("common/constants/chatState", {
    MINIMIZED: 0,
    INVITATION: 1,
    MAXIMIZED: 2,
    WINDOW: 3
  }), define("common/extensions/punycode", [], function() {
    var a = {};
    return function(a) {
      function b(a) {
        throw RangeError(z[a])
      }

      function c(a, b) {
        for (var c = a.length; c--;) a[c] = b(a[c]);
        return a
      }

      function d(a, b) {
        var d = ".";
        return c(a.split(d), b).join(d)
      }

      function e(a) {
        for (var b, c, d = [], e = 0, f = a.length; f > e;) b = a.charCodeAt(e++), 55296 == (63488 & b) && f > e ? (c = a.charCodeAt(e++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : d.push(b, c)) : d.push(b);
        return d
      }

      function f(a) {
        return c(a, function(a) {
          var b = "";
          return a > 65535 && (a -= 65536, b += C(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), b += C(a)
        }).join("")
      }

      function g(a) {
        return 10 > a - 48 ? a - 22 : 26 > a - 65 ? a - 65 : 26 > a - 97 ? a - 97 : p
      }

      function h(a, b) {
        return a + 22 + 75 * (26 > a) - ((0 != b) << 5)
      }

      function i(a, b, c) {
        var d = 0;
        for (a = c ? B(a / t) : a >> 1, a += B(a / b); a > A * r >> 1; d += p) a = B(a / A);
        return B(d + (A + 1) * a / (a + s))
      }

      function j(a) {
        var c, d, e, h, j, k, l, m, n, s, t = [],
          x = a.length,
          y = 0,
          z = v,
          A = u;
        for (d = a.lastIndexOf(w), 0 > d && (d = 0), e = 0; d > e; ++e) a.charCodeAt(e) >= 128 && b("not-basic"), t.push(a.charCodeAt(e));
        for (h = d > 0 ? d + 1 : 0; x > h;) {
          for (j = y, k = 1, l = p; h >= x && b("invalid-input"), m = g(a.charCodeAt(h++)), (m >= p || m > B((o - y) / k)) && b("overflow"), y += m * k, n = A >= l ? q : l >= A + r ? r : l - A, !(n > m); l += p) s = p - n, k > B(o / s) && b("overflow"), k *= s;
          c = t.length + 1, A = i(y - j, c, 0 == j), B(y / c) > o - z && b("overflow"), z += B(y / c), y %= c, t.splice(y++, 0, z)
        }
        return f(t)
      }

      function k(a) {
        var c, d, f, g, j, k, l, m, n, s, t, x, y, z, A, D = [];
        for (a = e(a), x = a.length, c = v, d = 0, j = u, k = 0; x > k; ++k) t = a[k], 128 > t && D.push(C(t));
        for (f = g = D.length, g && D.push(w); x > f;) {
          for (l = o, k = 0; x > k; ++k) t = a[k], t >= c && l > t && (l = t);
          for (y = f + 1, l - c > B((o - d) / y) && b("overflow"), d += (l - c) * y, c = l, k = 0; x > k; ++k)
            if (t = a[k], c > t && ++d > o && b("overflow"), t == c) {
              for (m = d, n = p; s = j >= n ? q : n >= j + r ? r : n - j, !(s > m); n += p) A = m - s, z = p - s, D.push(C(h(s + A % z, 0))), m = B(A / z);
              D.push(C(h(m, 0))), j = i(d, y, f == g), d = 0, ++f
            }++d, ++c
        }
        return D.join("")
      }

      function l(a) {
        return d(a, function(a) {
          return y.test(a) ? j(a.slice(4).toLowerCase()) : a
        })
      }

      function m(a) {
        return d(a, function(a) {
          return x.test(a) ? "xn--" + k(a) : a
        })
      }
      var n, o = 2147483647,
        p = 36,
        q = 1,
        r = 26,
        s = 38,
        t = 700,
        u = 72,
        v = 128,
        w = "-",
        x = /[^ -~]/,
        y = /^xn--/,
        z = {
          overflow: "Overflow: input needs wider integers to process.",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input"
        },
        A = p - q,
        B = Math.floor,
        C = String.fromCharCode;
      n = {
        version: "1.1.1",
        ucs2: {
          decode: e,
          encode: f
        },
        decode: j,
        encode: k,
        toASCII: m,
        toUnicode: l,
        decodeUri: function(a) {
          var b = a.split("//").pop().split("/")[0],
            c = l(b);
          return a.replace(b, c)
        },
        encodeUri: function(a) {
          var b = a.split("//").pop().split("/")[0],
            c = m(b);
          return a.replace(b, c)
        }
      }, a.punycode = n
    }(a), a.punycode
  }), define("config/core", ["common/extensions/punycode"], function(a) {
    var b = {},
      c = document.getElementById("rhlpscrtg").src;
    if (b.__CLIENT_NAME = c.split("?c=")[1].split("&")[0].toLowerCase(), b.__PROTOCOL = c.split("//")[0], b.__TEST = c.indexOf("/test") > -1, b.__NX_URL = b.__PROTOCOL + (c.indexOf("://test.") > -1 ? "//test.web.redhelper.ru" : "//web.redhelper.ru"), ~c.indexOf(".com/") && (b.__NX_URL = b.__PROTOCOL + "//web.redhelper.com"), b.__NX_URL += "/nx/presence/" + b.__CLIENT_NAME, location.hostname && void 0 !== sessionStorage) {
      var d = a.decodeUri(location.hostname),
        e = "rh_" + b.__CLIENT_NAME + "_url_" + d;
      sessionStorage.getItem(e) || (sessionStorage.setItem(e, 1), b.__NX_URL += "?url=" + encodeURIComponent(d))
    }
    return b.__APP_URL = null, b
  }), define("common/extensions/compatibility", [], function() {
    "function" != typeof Date.now && (Date.now = function() {
      return (new Date).getTime()
    }), "bind" in Function.prototype || (Function.prototype.bind = function(a) {
      var b = this;
      if (arguments.length <= 1) return function() {
        return b.apply(a, arguments)
      };
      var c = Array.prototype.slice.call(arguments, 1);
      return function() {
        return b.apply(a, 0 === arguments.length ? c : c.concat(Array.prototype.slice.call(arguments)))
      }
    }), "trim" in String.prototype || (String.prototype.trim = function() {
      return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }), "indexOf" in Array.prototype && "function" == typeof Array.prototype.indexOf && -1 == [].indexOf(0) || (Array.prototype.indexOf = function(a, b) {
      void 0 === b && (b = 0), 0 > b && (b += this.length), 0 > b && (b = 0);
      for (var c = this.length; c > b; b++)
        if (this[b] === a) return b;
      return -1
    }), "lastIndexOf" in Array.prototype || (Array.prototype.lastIndexOf = function(a, b) {
      for (void 0 === b && (b = this.length - 1), 0 > b && (b += this.length), b > this.length - 1 && (b = this.length - 1), b++; b-- > 0;)
        if (b in this && this[b] === a) return b;
      return -1
    }), "forEach" in Array.prototype || (Array.prototype.forEach = function(a, b) {
      for (var c = 0, d = this.length; d > c; c++) c in this && a.call(b, this[c], c, this)
    }), "map" in Array.prototype || (Array.prototype.map = function(a, b) {
      for (var c = new Array(this.length), d = 0, e = this.length; e > d; d++) d in this && (c[d] = a.call(b, this[d], d, this));
      return c
    }), "filter" in Array.prototype || (Array.prototype.filter = function(a, b) {
      for (var c, d = [], e = 0, f = this.length; f > e; e++) e in this && a.call(b, c = this[e], e, this) && d.push(c);
      return d
    }), "every" in Array.prototype || (Array.prototype.every = function(a, b) {
      for (var c = 0, d = this.length; d > c; c++)
        if (c in this && !a.call(b, this[c], c, this)) return !1;
      return !0
    }), "some" in Array.prototype || (Array.prototype.some = function(a, b) {
      for (var c = 0, d = this.length; d > c; c++)
        if (c in this && a.call(b, this[c], c, this)) return !0;
      return !1
    }), "reduce" in Array.prototype || (Array.prototype.reduce = function(a, b) {
      if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
      if ("function" != typeof a) throw new TypeError(a + " is not a function");
      var c, d, e = this.length >>> 0,
        f = !1;
      for (1 < arguments.length && (d = b, f = !0), c = 0; e > c; ++c) this.hasOwnProperty(c) && (f ? d = a(d, this[c], c, this) : (d = this[c], f = !0));
      if (!f) throw new TypeError("Reduce of empty array with no initial value");
      return d
    }), JSON && "function" != typeof JSON.stringify && (JSON.stringify = JSON.encode), JSON && "function" != typeof JSON.parse && (JSON.parse = JSON.decode), window.rhlpSetInterval = function(a, b) {
      var c = function() {
        try {
          a()
        } catch (d) {}
        setTimeout(c, b)
      };
      c()
    }, window.rhlpSetRealInterval = function(a, b) {
      var c = Math.ceil(1e3 / b),
        d = function() {
          setTimeout(d, c * b);
          for (var e = 0; c > e; e++) setTimeout(function() {
            a()
          }, e * b)
        };
      d()
    }
  }), define("common/communication/encoder", ["common/extensions/base64"], function(a) {
    return {
      serialize: function(a) {
        return JSON.stringify(a)
      },
      parse: function(a) {
        return JSON.parse(a)
      },
      compress: function(b) {
        return a.encodeOld(JSON.stringify(b))
      },
      decompress: function(b) {
        return JSON.parse(a.decodeOld(b))
      }
    }
  }), define("config/setup", ["common/extensions/jquery.plugins", "config/core", "common/extensions/browserDetect", "common/extensions/compatibility", "common/communication/encoder"], function(a, b, c, d, e) {
    var f = {
      DEBUG: !1,
      SHOW_EVENTS: !1,
      SHOW_SESSION: !1,
      CLIENT_NAME: b.__CLIENT_NAME,
      APP_URL: b.__APP_URL,
      DATA_URL: b.__PROTOCOL + "//dh7xgsr9ech2h.cloudfront.net",
      TEST_MODE: a("#rhlpscrtg").attr("src").split("://").pop().indexOf("/test") > -1,
      BLOCK: !1,
      CODENAME: "BETA",
      IS_PHONE: c.isMobile || "iPhone" === c.OS || "Android" === c.OS || "iPhone" === c.browser,
      referrer: document.referrer
    };
    if (f.TEST_MODE) {
      var g = a("#rhlpscrtg").attr("src"),
        h = g.substr(g.indexOf("/test") + 1).split("/")[0];
      f.APP_URL += h + "/"
    }
    return void 0 === f.CLIENT_NAME && (f.BLOCK = !0), f.IFRAME_URL = f.APP_URL + "chat/?c=" + f.CLIENT_NAME + "&version=3.1.570.1459872528712#" + encodeURIComponent(e.compress({
      url: location.href
    })), f.SITE_URL = location.href.substr(location.href.indexOf("//") + 2, location.href.length - 1).split("/")[0], f.getImageUrl = function(a) {
      if (a && ~a.indexOf("://")) return a;
      var b = ["Ava_default.png", "Ava_man_1.jpg", "Ava_woman_1.jpg", "Ava_def_man.png", "Ava_man_2.jpg", "Ava_woman_2.jpg", "Ava_def_woman.png", "Ava_man_3.jpg", "Ava_woman_3.jpg"];
      return -1 !== b.indexOf(a) ? f.APP_URL + "container/images/common/avatar/" + a : f.DATA_URL + "/images/" + a
    }, f.empty = function(a) {
      return void 0 === a || "" === a || "number" == typeof a && isNaN(a) || null === a
    }, f.eachSubelement = function(b, c) {
      b.children().map(function() {
        var b = a(this);
        return c(b), b.children()[0] && f.eachSubelement(b, c), null
      })
    }, f
  }), define("common/communication/messageTarget", ["common/extensions/jquery.plugins", "common/application/eventTarget", "common/communication/encoder", "common/extensions/debug"], function(a, b, c, d) {
    function e() {
      this._dispatcher = new b("MessageTarget"), this._fireCounter = 1;
      var a = [],
        c = !1;
      this.queueMessage = function(b, c) {
        a.push({
          type: b,
          obj: c
        })
      }, this.startMessaging = function() {
        c = !0;
        for (var b = 0, d = a.length; d > b; b++) this.send(a[b].type, a[b].obj)
      }, this.isAllowed = function() {
        return c
      }, this.allow = function() {
        c = !0
      }
    }
    return e.prototype = {
      init: function(b, c, e, f) {
        this._targetUri = e, this._targetWindow = b, this._origin = c, f && this.allow();
        var g = this;
        try {
          a.receiveMessage(function(a) {
            g._handle(a)
          })
        } catch (h) {
          d.error(h)
        }
      },
      _handle: function(a) {
        try {
          if ("string" != typeof a.data || -1 === a.data.indexOf("__rh__")) return
        } catch (b) {
          return void d.log(b)
        }
        var e = c.parse(a.data.replace("__rh__", ""));
        if (e._messageType)
          if (e.isMessageTarget = !0, e._messageId) {
            var f = this;
            this._dispatcher.fire(e._messageType, {
              type: e._messageType,
              obj: e
            }, function() {
              f.send("msg-handlers-completed-" + e._messageId)
            })
          } else this._dispatcher.fire(e._messageType, {
            type: e._messageType,
            obj: e
          })
      },
      setOrigin: function(a) {
        this._origin = a
      },
      addHandler: function(a, b) {
        this._dispatcher.addEventListener(a, function(a) {
          b(a.obj)
        })
      },
      removeHandler: function(a, b) {
        this._dispatcher.removeEventListener(a, b)
      },
      removeHandlers: function(a) {
        this._dispatcher.removeAllEventListeners(a)
      },
      send: function(b, d, e) {
        if (!this.isAllowed()) return void this.queueMessage(b, d);
        if ("undefined" == typeof d ? d = {} : "function" == typeof d && "undefined" == typeof e ? (e = d, d = {}) : "object" != typeof d && (d = {
            value: d
          }), d._messageType = b, "function" == typeof e) {
          d._messageId = this._fireCounter++;
          var f = this,
            g = function() {
              f.removeHandlers("msg-handlers-completed-" + d._messageId), e()
            };
          this.addHandler("msg-handlers-completed-" + d._messageId, g)
        }
        var h = "__rh__" + c.serialize(d);
        a.postMessage(this._targetWindow, h, this._origin, this._targetUri);
      }
    }, e
  }), define("application/chatWindow", ["common/communication/messageTarget"], function(a) {
    var b = new a;
    return b
  }), define("config/nxSettings", [function() {
    function a() {
      var a, b, c = 0;
      for (a = 0; a < localStorage.length; a++) b = localStorage.key(a), 0 == b.indexOf("rhlp." + d) && b.indexOf(".vid") > 4 && 0 == c && (c = localStorage.getItem(b));
      if (!c)
        for (a = 0; a < localStorage.length; a++) b = localStorage.key(a), 0 == b.indexOf("rhlp." + d) && b.indexOf(".visIdFromNx") > 4 && 0 == c && (c = localStorage.getItem(b));
      return c
    }
    var b = function() {
        var a = {};
        return function(a) {
          function b(a) {
            throw RangeError(z[a])
          }

          function c(a, b) {
            for (var c = a.length; c--;) a[c] = b(a[c]);
            return a
          }

          function d(a, b) {
            var d = ".";
            return c(a.split(d), b).join(d)
          }

          function e(a) {
            for (var b, c, d = [], e = 0, f = a.length; f > e;) b = a.charCodeAt(e++), 55296 == (63488 & b) && f > e ? (c = a.charCodeAt(e++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : d.push(b, c)) : d.push(b);
            return d
          }

          function f(a) {
            return c(a, function(a) {
              var b = "";
              return a > 65535 && (a -= 65536, b += C(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), b += C(a)
            }).join("")
          }

          function g(a) {
            return 10 > a - 48 ? a - 22 : 26 > a - 65 ? a - 65 : 26 > a - 97 ? a - 97 : p
          }

          function h(a, b) {
            return a + 22 + 75 * (26 > a) - ((0 != b) << 5)
          }

          function i(a, b, c) {
            var d = 0;
            for (a = c ? B(a / t) : a >> 1, a += B(a / b); a > A * r >> 1; d += p) a = B(a / A);
            return B(d + (A + 1) * a / (a + s))
          }

          function j(a) {
            var c, d, e, h, j, k, l, m, n, s, t = [],
              x = a.length,
              y = 0,
              z = v,
              A = u;
            for (d = a.lastIndexOf(w), 0 > d && (d = 0), e = 0; d > e; ++e) a.charCodeAt(e) >= 128 && b("not-basic"), t.push(a.charCodeAt(e));
            for (h = d > 0 ? d + 1 : 0; x > h;) {
              for (j = y, k = 1, l = p; h >= x && b("invalid-input"), m = g(a.charCodeAt(h++)), (m >= p || m > B((o - y) / k)) && b("overflow"), y += m * k, n = A >= l ? q : l >= A + r ? r : l - A, !(n > m); l += p) s = p - n, k > B(o / s) && b("overflow"), k *= s;
              c = t.length + 1, A = i(y - j, c, 0 == j), B(y / c) > o - z && b("overflow"), z += B(y / c), y %= c, t.splice(y++, 0, z)
            }
            return f(t)
          }

          function k(a) {
            var c, d, f, g, j, k, l, m, n, s, t, x, y, z, A, D = [];
            for (a = e(a), x = a.length, c = v, d = 0, j = u, k = 0; x > k; ++k) t = a[k], 128 > t && D.push(C(t));
            for (f = g = D.length, g && D.push(w); x > f;) {
              for (l = o, k = 0; x > k; ++k) t = a[k], t >= c && l > t && (l = t);
              for (y = f + 1, l - c > B((o - d) / y) && b("overflow"), d += (l - c) * y, c = l, k = 0; x > k; ++k)
                if (t = a[k], c > t && ++d > o && b("overflow"), t == c) {
                  for (m = d, n = p; s = j >= n ? q : n >= j + r ? r : n - j, !(s > m); n += p) A = m - s, z = p - s, D.push(C(h(s + A % z, 0))), m = B(A / z);
                  D.push(C(h(m, 0))), j = i(d, y, f == g), d = 0, ++f
                }++d, ++c
            }
            return D.join("")
          }

          function l(a) {
            return d(a, function(a) {
              return y.test(a) ? j(a.slice(4).toLowerCase()) : a
            })
          }

          function m(a) {
            return d(a, function(a) {
              return x.test(a) ? "xn--" + k(a) : a
            })
          }
          var n, o = 2147483647,
            p = 36,
            q = 1,
            r = 26,
            s = 38,
            t = 700,
            u = 72,
            v = 128,
            w = "-",
            x = /[^ -~]/,
            y = /^xn--/,
            z = {
              overflow: "Overflow: input needs wider integers to process.",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input"
            },
            A = p - q,
            B = Math.floor,
            C = String.fromCharCode;
          n = {
            version: "1.1.1",
            ucs2: {
              decode: e,
              encode: f
            },
            decode: j,
            encode: k,
            toASCII: m,
            toUnicode: l,
            decodeUri: function(a) {
              var b = a.split("//").pop().split("/")[0],
                c = l(b);
              return a.replace(b, c)
            },
            encodeUri: function(a) {
              var b = a.split("//").pop().split("/")[0],
                c = m(b);
              return a.replace(b, c)
            }
          }, a.punycode = n
        }(a), a.punycode
      }(),
      c = document.getElementById("rhlpscrtg").src,
      d = c.split("?c=")[1].split("&")[0].toLowerCase(),
      e = c.indexOf("://test.") > -1 ? "//test.web.redhelper.ru" : "//web.redhelper.ru";
    if (c.indexOf("//development/") >= 0 && (e = "//development"), ~c.indexOf(".com/") && (e = "//web.redhelper.com"), e = (~c.indexOf("https://") ? "https:" : "http:") + e, e += "/nx/presence/" + d, location.hostname && void 0 !== sessionStorage) {
      var f = b.decodeUri(location.hostname),
        g = "rh_" + d + "_url_" + f;
      sessionStorage.getItem(g) || (sessionStorage.setItem(g, 1), e += "?url=" + encodeURIComponent(f))
    }
    var h;
    h = window.redhlpSettings && window.redhlpSettings.page ? window.redhlpSettings.page : location.href.substr(0, 256), h = h || "", h = h.split("!")[0];
    var i = e + (e.indexOf("?") > -1 ? "&" : "?") + "callback=" + ("undefined" != typeof rhLocalName ? rhLocalName + "." : "") + "define&_=" + (new Date).getTime();
    return i += "&page=" + encodeURIComponent(h), a() > 0 && (i += "&vid=" + encodeURIComponent(a())), i
  }()], function(a) {
    return "{}" === JSON.stringify(a) ? {
      companyId: -1
    } : a
  }), define("application/session.objects", ["common/application/session", "common/constants/scope", "common/constants/type", "common/constants/chatState", "config/setup", "common/extensions/jquery.plugins", "application/chatWindow", "config/nxSettings"], function(a, b, c, d, e, f, g, h) {
    var i, j = {
        activeSalesShown: {
          type: c.BOOLEAN,
          value: !1,
          scope: b.STORAGE,
          priority: "internal"
        },
        allowed: {
          type: c.BOOLEAN,
          scope: b.STORAGE,
          value: !0
        },
        animateBadge: {
          type: c.BOOLEAN
        },
        audioEnabled: {
          value: !0,
          type: c.BOOLEAN,
          scope: b.STORAGE,
          priority: "internal"
        },
        badge: {
          value: "badge1.png",
          scope: b.LOCAL
        },
        badgeColor: {},
        badgeFontSize: {
          type: c.INTEGER,
          value: 0
        },
        badgePadding: {
          type: c.INTEGER,
          value: 0
        },
        badgePosition: {
          value: "left",
          scope: b.LOCAL
        },
        badgeText: {},
        badgeVersion: {
          type: c.INTEGER
        },
        badgeX: {
          value: "70%"
        },
        badgeY: {
          value: "40%"
        },
        cachedEvent: {},
        chatColor: {},
        chatHeight: {
          type: c.INTEGER,
          fallback: "defaultChatHeight"
        },
        chatIntensity: {},
        chatStarted: {
          value: "",
          scope: b.STORAGE,
          priority: "internal"
        },
        chatState: {
          type: c.INTEGER,
          value: d.MINIMIZED
        },
        chatWidth: {
          type: c.INTEGER,
          fallback: "defaultChatWidth"
        },
        chatX: {
          type: c.INTEGER
        },
        chatY: {
          type: c.INTEGER
        },
        city: {
          scope: b.SESSION
        },
        city_ru: {
          scope: b.SESSION
        },
        cloneSession: {
          type: c.BOOLEAN
        },
        codename: {
          scope: b.STORAGE
        },
        companyId: {
          type: c.INTEGER,
          value: 0
        },
        country: {
          scope: b.SESSION
        },
        country_ru: {
          scope: b.SESSION
        },
        currentChatHeight: {
          type: c.INTEGER
        },
        currentChatWidth: {
          type: c.INTEGER
        },
        currentChatX: {
          type: c.INTEGER
        },
        currentChatY: {
          type: c.INTEGER
        },
        currentDepartment: {
          type: c.INTEGER,
          value: 0,
          scope: b.STORAGE,
          priority: "internal"
        },
        currentFirstMessage: {},
        currentHeader: {},
        currentInviteTime: {
          type: c.INTEGER,
          value: -1
        },
        currentOfflineHeader: {},
        currentOfflineText: {},
        currentOperator: {
          scope: b.STORAGE,
          priority: "internal"
        },
        currentOperAvatar: {
          scope: b.SESSION
        },
        currentInvitation: {
          scope: b.SESSION,
          type: c.INTEGER,
          value: 0
        },
        currentTopText: {},
        currentTypedText: {},
        currentWelcome: {},
        customFields: {
          scope: b.SESSION
        },
        defaultChatHeight: {
          type: c.INTEGER,
          value: 420
        },
        defaultChatWidth: {
          type: c.INTEGER,
          value: 300
        },
        defaultFace: {},
        defaultHeader: {},
        defaultText: {},
        defaultWelcome: {},
        departments: {
          type: c.OBJECT,
          value: [],
          scope: b.LOCAL
        },
        departmentsType: {},
        disableCobrowse: {
          type: c.BOOLEAN,
          value: !1
        },
        disableDOMObserver: {
          type: c.BOOLEAN
        },
        disableForms: {
          type: c.BOOLEAN,
          value: !1
        },
        extraAuth: {
          value: ""
        },
        firstMessage: {},
        free: {
          value: !1,
          type: c.BOOLEAN
        },
        hideRedHelper: {
          value: !1,
          type: c.BOOLEAN,
          scope: b.SESSION
        },
        invitationsShown: {
          value: 0,
          type: c.INTEGER,
          priority: "internal",
          scope: b.STORAGE
        },
        inviteState: {
          value: "none",
          priority: "internal"
        },
        inviteTime: {
          scope: b.STORAGE,
          type: c.INTEGER
        },
        ip: {
          scope: b.STORAGE
        },
        isOnline: {
          type: c.BOOLEAN
        },
        isPartiallyOnline: {
          type: c.BOOLEAN,
          value: !1
        },
        lastActivity: {
          type: c.INTEGER,
          scope: b.STORAGE
        },
        lastChat: {
          type: c.INTEGER,
          value: 0,
          scope: b.STORAGE,
          priority: "internal"
        },
        lastInvitation: {
          scope: b.STORAGE
        },
        lastInvitationTime: {
          scope: b.STORAGE,
          priority: "interval",
          type: c.INTEGER
        },
        lastMessageTime: {
          scope: b.STORAGE,
          priority: "internal"
        },
        lastShownInvitation: {
          scope: b.SESSION,
          type: c.INTEGER,
          value: 0
        },
        lastVisit: {
          value: "1/1/2000",
          scope: b.STORAGE
        },
        lastVisitTime: {
          type: c.INTEGER,
          value: 0,
          scope: b.STORAGE
        },
        locale: {
          scope: b.STORAGE
        },
        messageUnread: {
          scope: b.STORAGE,
          type: c.BOOLEAN,
          value: !1
        },
        offlineEnabled: {
          type: c.BOOLEAN,
          value: !0,
          scope: b.STORAGE
        },
        offlineFields: {
          value: ["name", "email", "message"],
          type: c.OBJECT
        },
        offlineHeader: {},
        offlineText: {},
        onlineOperators: {
          value: [],
          type: c.OBJECT
        },
        openApi: {
          type: c.BOOLEAN,
          value: !0
        },
        operAvatar: {
          scope: b.STORAGE
        },
        operDisplayName: {
          scope: b.STORAGE
        },
        preferredOperator: {
          value: ""
        },
        preferredOperatorError: {
          value: ""
        },
        previousDay: {
          value: "1/1/2000",
          scope: b.STORAGE
        },
        rateEnabled: {
          type: c.BOOLEAN
        },
        realDepartment: {
          type: c.INTEGER,
          value: 0,
          scope: b.STORAGE,
          priority: "internal"
        },
        reconnecting: {
          value: !1,
          type: c.BOOLEAN
        },
        reconnects: {
          type: c.INTEGER,
          value: 0
        },
        referrer: {
          scope: b.STORAGE,
          priority: "internal"
        },
        referrerStored: {
          scope: b.STORAGE,
          priority: "internal",
          type: c.BOOLEAN,
          value: !1
        },
        region: {
          scope: b.SESSION
        },
        requiredOperator: {
          value: ""
        },
        rid: {
          value: 0,
          type: c.INTEGER,
          priority: "internal"
        },
        sessionViewers: {
          type: c.OBJECT,
          value: []
        },
        sid: {
          value: "",
          priority: "internal"
        },
        siteVisitLastTime: {
          value: 0,
          type: c.INTEGER,
          priority: "internal",
          scope: b.STORAGE
        },
        skin: {
          scope: b.STORAGE
        },
        stringChatState: {
          scope: b.STORAGE,
          priority: "internal",
          value: "browse"
        },
        time: {
          type: c.INTEGER,
          value: 0
        },
        tracking: {},
        trigger: {
          scope: b.STORAGE,
          priority: "internal"
        },
        unreadMessages: {
          type: c.INTEGER,
          value: 0,
          scope: b.STORAGE
        },
        userLocale: {
          value: ""
        },
        vid: {
          scope: b.STORAGE,
          type: c.INTEGER,
          priority: "internal"
        },
        visIdFromNx: {
          scope: b.STORAGE,
          type: c.INTEGER
        },
        viewedPages: {
          type: c.INTEGER,
          value: 0,
          scope: b.STORAGE,
          noNaN: !0
        },
        visitorCode: {
          type: c.OBJECT,
          value: {}
        },
        visits: {
          type: c.INTEGER,
          value: 0,
          scope: b.STORAGE
        }
      },
      k = function(b) {
        a.dispatcher.addEventListener("on" + b.charAt(0).toUpperCase() + b.substr(1) + "Changed", function() {
          f("span.redhlp_" + b).html(a[b])
        })
      },
      l = e.CLIENT_NAME + (h.companyId ? "." + h.companyId : "");
    a.attachTo(g, j, "external"), a.init(l, j), a.codename || (a.codename = e.CODENAME), a.codename !== e.CODENAME && (a.clear(), a.codename = e.CODENAME);
    for (i in j) j.hasOwnProperty(i) && k(i);
    return a.dispatcher.addEventListener("onVidChanged", function() {
      f(".redhlp_code").text((a.vid + "").substr((a.vid + "").length - 4))
    }), f(".redhlp_code").text((a.vid + "").substr((a.vid + "").length - 4)), a
  }), define("config/default", ["application/session.objects"], function(a) {
    return {
      template: "modern" == a.skin ? "template-modern.html" : "template.html"
    }
  }), define("application/dispatcher", ["common/application/eventTarget"], function(a) {
    var b = new a("Container");
    return b
  }), define("view/badgeDimensions", [], function() {
    var a = 15.4,
      b = .08 * a,
      c = function() {},
      d = a,
      e = 6,
      f = 10,
      g = "bottom",
      h = b;
    return {
      setFontSize: function(e) {
        d = Math.round(a * (1 + parseFloat(e)));
        var f = h - b;
        b = Math.round(.08 * d), h = b + f, c()
      },
      setPadding: function(a) {
        h = Math.round(b * (1 + parseFloat(a))), c()
      },
      setPosition: function(a) {
        g = a, c()
      },
      addHandler: function(a) {
        c = a
      },
      setDefault: function() {
        this.setFontSize(0), this.setPadding(0)
      },
      getFontSize: function() {
        return d
      },
      getPadding: function() {
        return h
      },
      getShadow: function() {
        return f
      },
      getRadius: function() {
        return e
      },
      getPosition: function() {
        return g
      }
    }
  }), define("view/badgePNG", ["common/extensions/jquery.plugins", "application/session.objects", "config/setup"], function(a, b, c) {
    var d = "",
      e = document.createElement("div");
    e.setAttribute("class", "rh-inner"), e.style.display = "none", a(e).append("<div id='rh-badgeImage'></div>");
    var f = 0,
      g = 0,
      h = function() {},
      i = a("<img src='" + d + "' />")[0],
      j = function() {
        if (b.badgeVersion) {
          var c = Math.min(f, g),
            d = a(e);
          d.removeClass("rh-small rh-medium rh-large"), d.removeClass("rh-dark");
          var h = 0;
          b.badgeColor.indexOf("#") > -1 && (h = 1);
          var i = parseInt(b.badgeColor.substr(h, 2), 16),
            j = parseInt(b.badgeColor.substr(h + 2, 2), 16),
            k = parseInt(b.badgeColor.substr(h + 4, 2), 16);
          return Math.sqrt(i * i * .241 + j * j * .391 + k * k * .068) > 160 && d.addClass("rh-dark"), 42 > c ? void d.addClass("rh-small") : c > 47 ? void d.addClass("rh-large") : void d.addClass("rh-medium")
        }
      };
    d && a("<img src='" + d + "' />").css({
      visibility: "hidden",
      position: "absolute",
      top: 0,
      left: 0
    }).appendTo("#rh-snippet").load(function() {
      f = a(this)[0].width > 0 ? a(this)[0].width : f, g = a(this)[0].height > 0 ? a(this)[0].height : g, a(this).remove(), j(), h()
    }), i.src = d, i.title = b.badgeText || "", e.appendChild(i), b.hideBadge && (e.style.display = "none", i.style.display = "none");
    var k = {
      getBadge: function() {
        return e
      },
      updateBadge: function() {
        d = ~b.badge.indexOf("://") ? b.badge : b.badge.length < 20 ? c.DATA_URL + "/images/badge/default/" + b.locale + "/" + b.badgePosition + "/" + b.badge : c.DATA_URL + "/images/badge/custom/" + b.badge, "https://dh7xgsr9ech2h.cloudfront.net/images/badge/default/ru/left/badge13.png" == d ? d = c.APP_URL + "container/images/common/badges/badge13.png" : "http://dh7xgsr9ech2h.cloudfront.net/images/badge/default/ru/left/badge13.png" == d ? d = c.APP_URL + "container/images/common/badges/badge13.png" : "http://dh7xgsr9ech2h.cloudfront.net/images/badge/default/ru/left/badge1.png" == d ? d = c.APP_URL + "container/images/common/badges/badge1.png" : "http://dh7xgsr9ech2h.cloudfront.net/images/badge/default/ru/left/badge1.png" == d && (d = c.APP_URL + "container/images/common/badges/badge1.png"), a(i).attr("src", d), d && a("<img src='" + d + "' />").css({
          visibility: "hidden",
          position: "absolute",
          top: 0,
          left: 0
        }).appendTo("#rh-snippet").load(function() {
          f = a(this)[0].width > 0 ? a(this)[0].width : f, g = a(this)[0].height > 0 ? a(this)[0].height : g, a(this).remove(), j(), h()
        })
      },
      getBox: function() {
        return {
          width: f,
          height: g
        }
      },
      getVisibleBox: function() {
        return {
          width: b.badgePosition.indexOf("bottom") > -1 ? f : f * (b.badgeVersion ? .65 : .78),
          height: b.badgePosition.indexOf("bottom") > -1 ? g * (b.badgeVersion ? .65 : .78) : g
        }
      },
      setReset: function(a) {
        h = a
      }
    };
    return k
  }), define("common/application/viewUtils", ["common/extensions/jquery.plugins"], function(a) {
    function b(a, b) {
      return "number" == typeof a ? a : "string" == typeof a ? -1 === a.indexOf("%") ? +a.replace("px", "") : b * a.replace("%", "") / 100 : 0
    }
    var c = {
      parseX: function(c) {
        return b(c, a(window).width())
      },
      parseY: function(c) {
        return b(c, a(window).height())
      },
      getPosition: function(b) {
        var c = !1;
        a(b).is(":visible") || (c = !0, a(b).show());
        var d = a(b).position();
        return c && a(b).hide(), d
      },
      getOffset: function(b) {
        var c = !1;
        a(b).is(":visible") || (c = !0, a(b).show());
        var d = a(b).offset();
        return d.left -= a(window).scrollLeft(), d.top -= a(window).scrollTop(), c && a(b).hide(), d
      },
      getSize: function(b) {
        var c = !1;
        a(b).is(":visible") || (c = !0, a(b).show());
        var d = {
          width: a(b).width(),
          height: a(b).height()
        };
        return c && a(b).hide(), d
      },
      getMinSize: function(b) {
        return {
          "min-width": c.parseY(a(b).css("min-width")),
          "min-height": c.parseX(a(b).css("min-height"))
        }
      },
      getMaxSize: function(b) {
        return {
          "max-width": c.parseY(a(b).css("max-width")),
          "max-height": c.parseX(a(b).css("max-height"))
        }
      },
      getBox: function(b) {
        var c = !1;
        a(b).is(":visible") && "none" !== a(b).css("display") || (c = !0);
        var d = a(b).is(":hidden");
        c && a(b).show();
        var e = a(b).offset() || {
          left: 0,
          top: 0
        };
        return e.left -= a(window).scrollLeft(), e.top -= a(window).scrollTop(), e.width = a(b).width(), e.height = a(b).height(), d ? a(b).hide() : a(b).css("display", ""), e
      },
      getBoundingBox: function(b, c) {
        if (!a(b).is(":visible") && "block" !== a(b).css("display")) {
          if (!c) return {
            top: 0,
            left: 0,
            width: 0,
            height: 0
          };
          a(b).show()
        }
        var d = {
          left: parseInt(a(b).css("padding-left"), 10),
          right: parseInt(a(b).css("padding-right"), 10),
          top: parseInt(a(b).css("padding-top"), 10),
          bottom: parseInt(a(b).css("padding-bottom"), 10)
        };
        for (var e in d) d[e] !== d[e] && (d[e] = 0);
        var f = {
          left: parseInt(a(b).css("border-left-width"), 10),
          right: parseInt(a(b).css("border-right-width"), 10),
          top: parseInt(a(b).css("border-top-width"), 10),
          bottom: parseInt(a(b).css("border-bottom-width"), 10)
        };
        for (e in f) f[e] !== f[e] && (f[e] = 0);
        var g = a(b).offset();
        return g.width = a(b).width() + d.left + d.right + f.left + f.right, g.height = a(b).height() + d.top + d.bottom + f.top + f.bottom, g
      },
      getIndents: function(b) {
        return "string" == typeof b && (b = a(b)), {
          padding: {
            left: parseInt(b.css("padding-left"), 10) ? parseInt(b.css("padding-left"), 10) : 0,
            right: parseInt(b.css("padding-right"), 10) ? parseInt(b.css("padding-right"), 10) : 0,
            top: parseInt(b.css("padding-top"), 10) ? parseInt(b.css("padding-top"), 10) : 0,
            bottom: parseInt(b.css("padding-bottom"), 10) ? parseInt(b.css("padding-bottom"), 10) : 0
          },
          border: {
            left: parseInt(b.css("border-left-width"), 10) ? parseInt(b.css("border-left-width"), 10) : 0,
            right: parseInt(a(b).css("border-right-width"), 10) ? parseInt(a(b).css("border-right-width"), 10) : 0,
            top: parseInt(a(b).css("border-top-width"), 10) ? parseInt(a(b).css("border-top-width"), 10) : 0,
            bottom: parseInt(a(b).css("border-bottom-width"), 10) ? parseInt(a(b).css("border-bottom-width"), 10) : 0
          }
        }
      }
    };
    return c
  }), define("view/badgePosition", ["common/extensions/jquery.plugins", "view/badgeDimensions", "view/badgePNG", "common/application/viewUtils", "application/dispatcher", "application/session.objects"], function(a, b, c, d, e, f) {
    var g, h, i, j, k, l, m, n = {
      init: function() {
        g || (g = a("#rh-badge"), h = a(c.getBadge()), a(window).resize(function() {
          n.reset()
        }), c.setReset(function() {
          n.reset(), e.fire("badgeLoaded")
        }))
      },
      reset: function() {
        m && this.setPosition(m), k && this.setX(k), l && this.setY(l)
      },
      setX: function(b) {
        if (g || this.init(), -1 === m.indexOf("bottom")) return void(i = b);
        i = !1, k = b, g.css({
          left: "",
          right: ""
        }), h.css({
          left: "",
          right: ""
        });
        var c = "-" !== b[0] ? "left" : "right",
          d = "-" === b[0] ? "left" : "right";
        if (b.indexOf("%") > -1) {
          var e = Math.abs(parseInt(b, 10));
          g.css(c, a(window).width() * e / 100 - h.width() * e / 100 + "px"), g.css(d, "")
        } else g.css(c, Math.abs(parseInt(b, 10)) + "px"), g.css(d, "");
        this.setBox()
      },
      setY: function(b) {
        if (g || this.init(), m.indexOf("bottom") > -1) return void(j = b);
        j = !1, l = b;
        var c = "-" !== b[0] ? "top" : "bottom",
          d = "-" === b[0] ? "top" : "bottom";
        if (b.indexOf("%") > -1) {
          var e = Math.abs(parseInt(b, 10));
          g.css(c, a(window).height() * e / 100 - h.height() * e / 100 + "px"), g.css(d, "")
        } else g.css(c, Math.abs(parseInt(b, 10)) + "px"), g.css(d, "");
        this.setBox()
      },
      setPosition: function(a) {
        g || this.init(), m = a, b.setPosition(a), g.css(c.getBox()), h.css(c.getBox()), g.removeClass("rh-left rh-right rh-bottom").addClass("rh-" + a);
        var d = {};
        h.css(d), this.setBox()
      },
      setBox: function() {
        switch (m) {
          case "left":
            j && this.setY(j), g.css("left", -g.width() * (f.badgeVersion ? .22 : .35) + "px"), h.css("left", "");
            break;
          case "right":
            j && this.setY(j), g.css("right", -g.width() * (f.badgeVersion ? .22 : .35) + "px"), h.css("left", ""), g.css("left", "");
            break;
          case "bottom":
          case "bottom-left":
          case "bottom-right":
            i && this.setX(i), h.css("top", ""), g.css({
              bottom: -g.height() * (f.badgeVersion ? .22 : .35) + "px",
              top: ""
            })
        }
      },
      getBox: function() {
        var a = d.getBox(c.getBadge());
        switch (m) {
          case "left":
            a.left = 0;
            break;
          case "bottom":
          case "bottom-left":
          case "bottom-right":
            a.bottom = 0;
            break;
          case "right":
            a.right = 0
        }
        return a
      },
      getOffset: function() {
        var b = d.getOffset(a(c.getBadge()));
        return "left" === m && (b.left = 0), b
      }
    };
    return n
  }), define("text", ["module"], function(a) {
    var b, c, d, e, f, g = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
      h = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
      i = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
      j = "undefined" != typeof location && location.href,
      k = j && location.protocol && location.protocol.replace(/\:/, ""),
      l = j && location.hostname,
      m = j && (location.port || void 0),
      n = {},
      o = a.config && a.config() || {};
    return b = {
      version: "2.0.14",
      strip: function(a) {
        if (a) {
          a = a.replace(h, "");
          var b = a.match(i);
          b && (a = b[1])
        } else a = "";
        return a
      },
      jsEscape: function(a) {
        return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
      },
      createXhr: o.createXhr || function() {
        var a, b, c;
        if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
        if ("undefined" != typeof ActiveXObject)
          for (b = 0; 3 > b; b += 1) {
            c = g[b];
            try {
              a = new ActiveXObject(c)
            } catch (d) {}
            if (a) {
              g = [c];
              break
            }
          }
        return a
      },
      parseName: function(a) {
        var b, c, d, e = !1,
          f = a.lastIndexOf("."),
          g = 0 === a.indexOf("./") || 0 === a.indexOf("../");
        return -1 !== f && (!g || f > 1) ? (b = a.substring(0, f), c = a.substring(f + 1)) : b = a, d = c || b, f = d.indexOf("!"), -1 !== f && (e = "strip" === d.substring(f + 1), d = d.substring(0, f), c ? c = d : b = d), {
          moduleName: b,
          ext: c,
          strip: e
        }
      },
      xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
      useXhr: function(a, c, d, e) {
        var f, g, h, i = b.xdRegExp.exec(a);
        return i ? (f = i[2], g = i[3], g = g.split(":"), h = g[1], g = g[0], !(f && f !== c || g && g.toLowerCase() !== d.toLowerCase() || (h || g) && h !== e)) : !0
      },
      finishLoad: function(a, c, d, e) {
        d = c ? b.strip(d) : d, o.isBuild && (n[a] = d), e(d)
      },
      load: function(a, c, d, e) {
        if (e && e.isBuild && !e.inlineText) return void d();
        o.isBuild = e && e.isBuild;
        var f = b.parseName(a),
          g = f.moduleName + (f.ext ? "." + f.ext : ""),
          h = c.toUrl(g),
          i = o.useXhr || b.useXhr;
        return 0 === h.indexOf("empty:") ? void d() : void(!j || i(h, k, l, m) ? b.get(h, function(c) {
          b.finishLoad(a, f.strip, c, d)
        }, function(a) {
          d.error && d.error(a)
        }) : c([g], function(a) {
          b.finishLoad(f.moduleName + "." + f.ext, f.strip, a, d)
        }))
      },
      write: function(a, c, d, e) {
        if (n.hasOwnProperty(c)) {
          var f = b.jsEscape(n[c]);
          d.asModule(a + "!" + c, "define(function () { return '" + f + "';});\n")
        }
      },
      writeFile: function(a, c, d, e, f) {
        var g = b.parseName(c),
          h = g.ext ? "." + g.ext : "",
          i = g.moduleName + h,
          j = d.toUrl(g.moduleName + h) + ".js";
        b.load(i, d, function(c) {
          var d = function(a) {
            return e(j, a)
          };
          d.asModule = function(a, b) {
            return e.asModule(a, j, b)
          }, b.write(a, i, d, f)
        }, f)
      }
    }, "node" === o.env || !o.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"] ? (c = require.nodeRequire("fs"), b.get = function(a, b, d) {
      try {
        var e = c.readFileSync(a, "utf8");
        "\ufeff" === e[0] && (e = e.substring(1)), b(e)
      } catch (f) {
        d && d(f)
      }
    }) : "xhr" === o.env || !o.env && b.createXhr() ? b.get = function(a, c, d, e) {
      var f, g = b.createXhr();
      if (g.open("GET", a, !0), e)
        for (f in e) e.hasOwnProperty(f) && g.setRequestHeader(f.toLowerCase(), e[f]);
      o.onXhr && o.onXhr(g, a), g.onreadystatechange = function(b) {
        var e, f;
        4 === g.readyState && (e = g.status || 0, e > 399 && 600 > e ? (f = new Error(a + " HTTP status: " + e), f.xhr = g, d && d(f)) : c(g.responseText), o.onXhrComplete && o.onXhrComplete(g, a))
      }, g.send(null)
    } : "rhino" === o.env || !o.env && "undefined" != typeof Packages && "undefined" != typeof java ? b.get = function(a, b) {
      var c, d, e = "utf-8",
        f = new java.io.File(a),
        g = java.lang.System.getProperty("line.separator"),
        h = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f), e)),
        i = "";
      try {
        for (c = new java.lang.StringBuffer, d = h.readLine(), d && d.length() && 65279 === d.charAt(0) && (d = d.substring(1)), null !== d && c.append(d); null !== (d = h.readLine());) c.append(g), c.append(d);
        i = String(c.toString())
      } finally {
        h.close()
      }
      b(i)
    } : ("xpconnect" === o.env || !o.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (d = Components.classes, e = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), f = "@mozilla.org/windows-registry-key;1" in d, b.get = function(a, b) {
      var c, g, h, i = {};
      f && (a = a.replace(/\//g, "\\")), h = new FileUtils.File(a);
      try {
        c = d["@mozilla.org/network/file-input-stream;1"].createInstance(e.nsIFileInputStream), c.init(h, 1, 0, !1), g = d["@mozilla.org/intl/converter-input-stream;1"].createInstance(e.nsIConverterInputStream), g.init(c, "utf-8", c.available(), e.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), g.readString(c.available(), i), g.close(), c.close(), b(i.value)
      } catch (j) {
        throw new Error((h && h.path || "") + ": " + j)
      }
    }), b
  }), define("text!config/../../template.html", [], function() {
    return '<template>\n    <div id="chooseDepartment" style="display: none">\n        <div class="colorifier"></div>\n        <div class="topPanel">\n            <div class="topHeader"></div>\n            <div class="topText"></div>\n        </div>\n        <div class="chooseDepartmentTextWrapper">\n            <div class="chooseDepartmentText"></div>\n            <span class="hideDepartments"><span class="icon"><div class="colorifier"></div><span></span></span><span class="txt"></span></span>\n        </div>\n        <div id="departmentsWrapper">\n            <div id="departmentsContainer">\n                <ul id="departments"></ul>\n                <div class="scroller__track">\n                    <div class="scroller__bar" id="departments_bar"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div id="offline" style="display: none;">\n   <div class="colorifier"></div>\n    <div class="center">\n      <div class="topPanel">\n                <span class="showDepartments"><span class="icon"><div class="colorifier"></div><span></span></span><span class="txt"></span></span>\n       <div class="header"></div>\n        <div class="description"></div>\n     </div>\n      <div id="offlineError"></div>\n     <div id="mailSuccess"></div>\n      <div id="feedbackForm">\n       <div class="inputField name inputField_name">\n         <input id="name" type="text" name="name"/>\n        </div>\n        <div class="inputField email">\n          <input id="email" type="email" name="email"/>\n       </div>\n                <div class="inputField phone">\n                    <input id="phone" type="text" name="phone"/>\n                </div>\n        <div class="inputField message">\n          <textarea id="message" name="message"></textarea>\n       </div>\n        <div id="actionPanel">\n          <div id="sendButton"></div>\n         <div id="throbber" style="display: none;"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div id="offlineSuccess" style="display: none;">\n    <div></div>\n </div>\n  <div id="online" style="display: none;">\n    <div class="colorifier"></div>\n    <div id="onlinePanel">\n      <div class="center">\n        <div class="wrapper">\n         <div class="topPanel">\n            <div id="faceWrapper">\n              <div id="faceRate">\n                                <div id="faceImgWrapper"><img id="face" alt=""></div>\n                                <div id="rate">\n                                    <div class="colorifier"></div>\n                                    <a id="like">&nbsp;</a>\n                                    <a id="dislike">&nbsp;</a>\n                                </div>\n                            </div>\n              <div id="topDescription">\n               <div id="topHeader"></div>\n                <div id="topText"></div>\n                                <div style="clear: both;"></div>\n                                <a class="showDepartments"><span class="icon"><div class="colorifier"></div><span></span></span><span class="txt"></span></a>\n             </div>\n            </div>\n          </div>\n          <div id="scrollBarContainer">\n           <div id="scrollBar"></div>\n          </div>\n                    <div id="chatContainer">\n                        <div id="chatItself">\n                            <div id="invitation"></div>\n\n                            <div class="msg" id="typingLabel">\n                                <div class="textWrapper">\n                                    <div class="text">%text%</div>\n                                </div>\n                            </div>\n                            <div class="msg" id="chatLabel">\n                                <div class="textWrapper">\n                                    <div class="text">%text%</div>\n                                </div>\n                            </div>\n                            <div class="scroller__track">\n                                <div class="scroller__bar" id="chat_bar"></div>\n                            </div>\n                        </div>\n                    </div>\n          <div id="chatInput">\n            <div id="textAreaWrapper">\n              <textarea id="chatTextarea" spellcheck="false"></textarea>\n            </div>\n            <a id="chatSend"><div class="colorifier"></div></a>\n                        <a id="fileSend"><div class="colorifier"></div></a>\n          </div>\n                    <div id="fileUploadWrapper">\n                        <div class="text">\n                        </div>\n                        <input type="file" name="file" id="uploadedFile"/>\n                    </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n    <div id="fromOperatorHeader" class="msgHeader fromOperator">\n    <span class="sender">%displayName%</span>\n </div>\n\n  <div id="fromOperator" class="msg">\n   <span class="time" title="%date%">%time%</span>\n   <div class="textWrapper">\n     <div class="text">%text%</div>\n    </div>\n  </div>\n\n  <div id="fromVisitorHeader" class="msgHeader fromVisitor">\n    <span class="sender">%displayName%</span>\n </div>\n\n  <div id="fromVisitor" class="msg">\n    <span class="time" title="%date%"><span class="delivery"></span>%time%</span>\n   <div class="textWrapper">\n     <div class="text">%text%</div>\n    </div>\n  </div>\n  <div id="promptContainer" class="msg">\n    <span class="time" title="%date%">%promptTime%</span>\n   <div class="textWrapper">\n     <div class="text">%text%</div>\n    </div>\n  </div>\n</template>'
  }), define("text!config/../../template-modern.html", [], function() {
    return '<template>\n  <div id="chooseDepartment" style="display: none">\n   <div class="center">\n      <div class="topPanel">\n        <div class="topHeader colorText"></div>\n       <div class="topText colorText"></div>\n       <div style="clear:both;"></div>\n     </div>\n      <div class="chooseDepartmentTextWrapper">\n       <div class="chooseDepartmentText colorText"></div>\n        <span class="hideDepartments"><span class="icon"><div class="colorifier"></div><span></span></span><span class="txt colorText"></span></span>\n     </div>\n      <div id="departmentsWrapper">\n       <div id="departmentsContainer">\n         <ul id="departments"></ul>\n          <div class="scroller__track">\n           <div class="scroller__bar" id="departments_bar"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div id="offline" style="display: none;">\n   <div class="center">\n      <div class="topPanel">\n        <div class="topHeader header colorText"></div>\n        <div class="topText description colorText"></div>\n       <span class="showDepartments"><span class="icon"><div class="colorifier"></div><span></span></span><span class="txt colorText"></span></span>\n       <div style="clear: both;"></div>\n      </div>\n\n      <div id="offlineError"></div>\n     <div id="mailSuccess"></div>\n      <div id="feedbackForm">\n       <div class="inputField name inputField_name">\n         <input id="name" type="text" name="name"/>\n        </div>\n        <div class="inputField email">\n          <input id="email" type="email" name="email"/>\n       </div>\n        <div class="inputField phone">\n          <input id="phone" type="text" name="phone"/>\n        </div>\n        <div class="inputField message">\n          <textarea id="message" name="message"></textarea>\n       </div>\n        <div id="actionPanel">\n          <div id="sendButton"></div>\n         <div id="throbber" style="display: none;"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div id="offlineSuccess" style="display: none;">\n    <div></div>\n </div>\n  <div id="online" style="display: none;">\n    <div id="onlinePanel">\n      <div class="center">\n        <div class="wrapper">\n         <div class="topPanel">\n            <div id="faceWrapper">\n              <div id="faceRate">\n               <div id="faceImgWrapper"><img id="face" alt=""></div>\n               <div id="rate">\n                 <a id="like">&nbsp;</a>\n                 <a id="dislike">&nbsp;</a>\n                </div>\n              </div>\n              <div id="topDescription">\n               <div id="topHeader" class="topHeader colorText"></div>\n                <div id="topText" class="topText colorText"></div>\n              </div>\n              <div style="clear: both;"></div>\n            </div>\n            <div id="chatOperatorInfo">\n             <a class="showDepartments"><span class="icon"><div class="colorifier"></div><span></span></span><span class="txt colorText"></span></a>\n             <span id="operatorArrow" class="colorText">&raquo;</span>\n             <span id="operatorLabel" class="colorText"></span>\n              <span id="operatorName" class="colorText"></span>\n           </div>\n          </div>\n\n          <div id="scrollBarContainer">\n           <div id="scrollBar"></div>\n          </div>\n          <div id="chatContainer">\n            <div id="chatItself">\n             <div id="invitation"></div>\n\n             <div class="msg" id="typingLabel">\n                <div class="textWrapper">\n                 <div class="text">%text%</div>\n                </div>\n              </div>\n              <div class="msg" id="chatLabel">\n                <div class="textWrapper">\n                 <div class="text">%text%</div>\n                </div>\n              </div>\n              <div class="scroller__track">\n               <div class="scroller__bar" id="chat_bar"></div>\n             </div>\n            </div>\n          </div>\n          <div id="chatResize"></div>\n         <div id="chatInput">\n            <div id="textAreaWrapper">\n              <textarea id="chatTextarea" spellcheck="false"></textarea>\n            </div>\n            <a id="chatSend"></a>\n           <a id="fileSend"></a>\n         </div>\n          <div id="fileUploadWrapper">\n            <div class="text">\n            </div>\n            <input type="file" name="file" id="uploadedFile"/>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div id="fromOperatorHeader" class="msgHeader fromOperator">\n    <span class="time" title="%date%">%time%</span>\n   <div class="msgHeaderFace">\n     <div class="chatFace"><img class="face" width="21" alt=""/></div>\n     <div class="speak"></div>\n   </div>\n  </div>\n\n  <div id="fromOperator" class="msg">\n   <div class="textWrapper">\n     <div class="text">%text%</div>\n    </div>\n    <div style="clear: both;"></div>\n  </div>\n\n  <div id="fromVisitorHeader" class="msgHeader fromVisitor">\n    <span class="time" title="%date%">%time%</span>\n   <div class="msgHeaderFace">\n     <div class="chatFace"><img src="../container/images/modern/visitor_small.png?v=2" alt=""/></div>\n      <div class="speak"></div>\n   </div>\n  </div>\n\n  <div id="fromVisitor" class="msg">\n    <div class="textWrapper">\n     <div class="text">%text%</div>\n    </div>\n    <div style="clear: both;"></div>\n  </div>\n  \n  <div id="promptContainer" class="msg">\n    <span class="time" title="%date%">%promptTime%</span>\n   %text%\n  </div>  \n</template>'
  });
  var rhlpSettingsURL = function() {
    try {
      var a = document.getElementById("rhlpscrtg").dataset ? document.getElementById("rhlpscrtg").dataset.settings : document.getElementById("rhlpscrtg").getAttribute("data-settings");
      if (a) {
        if (a.indexOf("://") > -1) return a += a.indexOf("?") > -1 ? "&" : "?", a += "callback=redhelper.define";
        var b = location.protocol + "//" + location.host;
        return 0 != a.indexOf("/") && (b += "/"), "text!" + b + a
      }
      return "config/default"
    } catch (c) {
      return console && console.error, "config/default"
    }
  }();
  define("config/api", ["common/extensions/jquery.plugins", "application/dispatcher", rhlpSettingsURL || "config/default", "text!../../template.html", "text!../../template-modern.html", "application/session.objects"], function(a, b, c, d, e, f) {
    function g() {
      if ("config/default" === rhlpSettingsURL || f.free || !m.template) k = "modern" == f.skin ? e : d, l = !0;
      else {
        var c = "";
        c = m.template.indexOf("://") > -1 ? m.template : /^\//.test(m.template) ? /(.*?:\/\/.*?)\//.exec(rhlpSettingsURL)[1] + m.template : /(.*?:\/\/.*)\//.exec(rhlpSettingsURL)[0] + m.template, -1 !== rhlpSettingsURL.indexOf("text!") || m.template && m.template.indexOf("nojsonp") > -1 ? (a.support.cors = !0, a.ajax({
          url: m.template.indexOf("://") > -1 ? m.template : location.protocol + "//" + location.host + "/" + m.template,
          dataType: "html",
          success: function(a) {
            k = a, l = !1, b.fire("templateReceived", {
              template: k,
              isDefault: !1
            })
          }
        })) : a.ajax({
          url: c,
          dataType: "jsonp",
          success: function(a) {
            k = a, l = !1, b.fire("templateReceived", {
              template: k,
              isDefault: !1
            })
          }
        })
      }
      if (b.addEventListener("templateRequest", function() {
          k && b.fire("templateReceived", {
            template: k,
            isDefault: l
          })
        }), (!f.free || f.openApi) && (m.innerCSS && (m.innerCSS = j(m.innerCSS, i)), m.outerCSS && (m.outerCSS = j(m.outerCSS, location.protocol)), m.additionalJS))
        for ("string" == typeof m.additionalJS && (m.additionalJS = [m.additionalJS]), h = m.additionalJS.length - 1; h > -1; h--) m.additionalJS[h] = j(m.additionalJS[h], i)
    }
    var h, i = a("#rhlpscrtg").attr("src").indexOf("https://") > -1 ? "https:" : "http:",
      j = function(a, b) {
        return a.indexOf("://") > -1 ? a.replace(/.*?:/, b) : 0 === rhlpSettingsURL.indexOf("text!") ? b + "//" + location.hostname + "/" + a : rhlpSettingsURL.indexOf("://") > -1 ? /^\//.test(a) ? (/(.*?:\/\/.*?)\//.exec(rhlpSettingsURL)[1] + a).replace(/.*?:/, b) : (/(.*?:\/\/.*)\//.exec(rhlpSettingsURL)[0] + a).replace(/.*?:/, b) : void 0
      },
      k = "",
      l = !1,
      m = "string" == typeof c ? JSON.parse(c) : c;
    return f.skin ? g() : f.dispatcher.addEventListener("onSkinChanged", function() {
      g()
    }), m
  }), define("locales", {
    enabled: ["az", "bg", "cs", "de", "dk", "ee", "en", "es", "fa", "fi", "hu", "it", "kk", "lt", "lv", "md", "pl", "ru", "sk", "uk", "zh"],
    locales: {
      az: {
        YES_LABEL: "Bəli",
        NO_LABEL: "Xeyir",
        MINIMIZE_CHAT: "çatı aşağı çevir",
        MAXIMIZE_CHAT: "ayrı səhifədə açmaq",
        NEW_MESSAGE: "Operatordan yeni mesaj",
        BADGE_LABEL: "Sual soruşmaq",
        WEBSITE: "http://redhelper.ru",
        SOUND_ONOFF: "Səsi yandırmaq/söndürmək",
        COPYRIGHT: "online məsləhətçi",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Diqqət yetirin",
        HIGHLIGHT_LINK: "Keçmək",
        HINT_CLOSE: "Bağlamaq üçün tıklayın",
        DEFAULT_LABEL: "Sual soruşmaq",
        SOUND: "səs",
        CODE_HEADER: "Sizin müştəri kodunuz"
      },
      bg: {
        YES_LABEL: "Да",
        NO_LABEL: "Не",
        MINIMIZE_CHAT: "Минимизирайте чата",
        MAXIMIZE_CHAT: "Отворете чата в нов таб",
        NEW_MESSAGE: "Ново съобщение от оператор",
        BADGE_LABEL: "Пишете ни",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Звук вкл/изкл",
        COPYRIGHT: "powered by",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Моля, внимавай",
        HIGHLIGHT_LINK: "'Отиди на'",
        HINT_CLOSE: "Кликни, за да затвориш",
        DEFAULT_LABEL: "Пишете ни",
        SOUND: "Звук",
        CODE_HEADER: "Вашият клиентски код"
      },
      cs: {
        YES_LABEL: "Ano",
        NO_LABEL: "Ne",
        MINIMIZE_CHAT: "zavřít chat",
        MAXIMIZE_CHAT: "otevřít v novém okně",
        NEW_MESSAGE: "Nová zpráva od operátora",
        BADGE_LABEL: "Zeptat se operátora",
        WEBSITE: "http://redhelper.ru",
        SOUND_ONOFF: "Zapnout/vypnout zvuk",
        COPYRIGHT: "Konzultace online od",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Pozor",
        HIGHLIGHT_LINK: "Přejít",
        HINT_CLOSE: "Pro zavření stiskněte",
        DEFAULT_LABEL: "Zeptat se",
        SOUND: "Zvuk",
        CODE_HEADER: "Vaš personální kód"
      },
      de: {
        YES_LABEL: "Ja",
        NO_LABEL: "Nein",
        MINIMIZE_CHAT: "Fenster  verkleinern",
        MAXIMIZE_CHAT: "Chat in neuem Tab öffnen",
        NEW_MESSAGE: "Sie haben eine neue Nachricht von dem Berater",
        BADGE_LABEL: "Live Chat",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Ton ein/aus",
        COPYRIGHT: "Berater von",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Bitte beachten Sie",
        HIGHLIGHT_LINK: "weiter",
        HINT_CLOSE: "Klicken Sie hier, um zu schließen",
        DEFAULT_LABEL: "Live Chat",
        SOUND: "Ton"
      },
      dk: {
        YES_LABEL: "Ja",
        NO_LABEL: "Ingen",
        MINIMIZE_CHAT: "Collapse Chat",
        MAXIMIZE_CHAT: "åben i et separat faneblad",
        NEW_MESSAGE: "Ny besked fra operatøren",
        BADGE_LABEL: "Stil et spørgsmål",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Aktiver / deaktiver lyd",
        COPYRIGHT: "online konsulent fra",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Notice",
        HIGHLIGHT_LINK: "Go",
        HINT_CLOSE: "Klik for at lukke",
        DEFAULT_LABEL: "Stil et spørgsmål",
        SOUND: "Sound",
        CODE_HEADER: "Din klient kode"
      },
      ee: {
        YES_LABEL: "Jah",
        NO_LABEL: "Ei",
        MINIMIZE_CHAT: "minimeeri vestlus",
        MAXIMIZE_CHAT: "ava teisel vahelehel",
        NEW_MESSAGE: "Operaator saatis uue sõnumi",
        BADGE_LABEL: "Esita küsimus",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Lülita heli sisse/välja",
        COPYRIGHT: "online-konsultant firmalt",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Pöörake tähelepanu",
        HIGHLIGHT_LINK: "Mine üle",
        HINT_CLOSE: "Klikake sulgemiseks",
        DEFAULT_LABEL: "Esita küsimus",
        SOUND: "Heli"
      },
      en: {
        YES_LABEL: "Yes",
        NO_LABEL: "No",
        MINIMIZE_CHAT: "Minimize chat",
        MAXIMIZE_CHAT: "Open chat in a new tab",
        NEW_MESSAGE: "New message from operator",
        BADGE_LABEL: "Live Chat",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Sound on/off",
        COPYRIGHT: "powered by",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Please note",
        HIGHLIGHT_LINK: "Go to",
        HINT_CLOSE: "Click to close",
        DEFAULT_LABEL: "Live Chat",
        SOUND: "Sound",
        CODE_HEADER: "Your client code"
      },
      es: {
        YES_LABEL: "Si",
        NO_LABEL: "No",
        MINIMIZE_CHAT: "Minimizar",
        MAXIMIZE_CHAT: "abrir en nueva pestaña",
        NEW_MESSAGE: "Nuevo mensaje de operador",
        BADGE_LABEL: "Haz una pregunta",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Activar/desactivar sonido",
        COPYRIGHT: "consultor online de",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Tenga en cuenta",
        HIGHLIGHT_LINK: "Acceder",
        HINT_CLOSE: "Haga clic para cerrar",
        DEFAULT_LABEL: "Haz una pregunta",
        SOUND: "Sonido"
      },
      fa: {
        YES_LABEL: " بله",
        NO_LABEL: "خیر",
        MINIMIZE_CHAT: "پنهان کردن پنجره چت",
        MAXIMIZE_CHAT: "باز کردن چت در یک تب جدید",
        NEW_MESSAGE: " پیام جدید از اپراتور",
        BADGE_LABEL: "چت آنلاین",
        WEBSITE: " http://redhelper.com",
        SOUND_ONOFF: "قطع/وصل صدا",
        COPYRIGHT: "طراحی شده توسط ",
        COPYRIGHT_NAME: " <span>Red</span>Helper",
        HIGHLIGHT_LABEL: "لطفا توجه کنید",
        HIGHLIGHT_LINK: "'برو به'",
        HINT_CLOSE: "برای بستن کلیک کنید",
        DEFAULT_LABEL: "چت آنلاین",
        SOUND: "صدا",
        CODE_HEADER: "کد مشتری شما",
        RTL: "RTL"
      },
      fi: {
        YES_LABEL: "Kyllä",
        NO_LABEL: "Ei",
        MINIMIZE_CHAT: "sulje chat",
        MAXIMIZE_CHAT: "avata erillisessä välilehdessä",
        NEW_MESSAGE: "Uusi viesti operaattorit",
        BADGE_LABEL: "Kysy kysymys",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Päälle / pois päältä äänen",
        COPYRIGHT: "Online konsultti",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Huomio",
        HIGHLIGHT_LINK: "Siirry",
        HINT_CLOSE: "Sulje napsauttamalla",
        DEFAULT_LABEL: "Kysy kysymyksen",
        SOUND: "Ääni"
      },
      hu: {
        YES_LABEL: "Igen",
        NO_LABEL: "Nem",
        MINIMIZE_CHAT: "Csevegőablak kicsinyítése",
        MAXIMIZE_CHAT: "csevegőablak megnyitása új lapon",
        NEW_MESSAGE: "Új üzenet a munkatársunktól",
        BADGE_LABEL: "Élő csevegés",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Hang be/ki",
        COPYRIGHT: "fejlesztette:",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Kérjük jegyezze fel",
        HIGHLIGHT_LINK: "Ugrás ide",
        HINT_CLOSE: "Kattintson ide a bezáráshoz",
        DEFAULT_LABEL: "Élő csevegés",
        SOUND: "Hang",
        CODE_HEADER: "A látogató kódja"
      },
      it: {
        YES_LABEL: "Si",
        NO_LABEL: "No",
        MINIMIZE_CHAT: "Ridurre chat",
        MAXIMIZE_CHAT: "Aprire in una nuova finestra",
        NEW_MESSAGE: "Nuovo messaggio da parte dell'assistente",
        BADGE_LABEL: "Fare una domanda",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Attivare/disattivare audio",
        COPYRIGHT: "Assistente online di",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Fate attenzione",
        HIGHLIGHT_LINK: "Vai al",
        HINT_CLOSE: "Clicca per chiudere",
        DEFAULT_LABEL: "Fare una domanda",
        SOUND: "Audio",
        CODE_HEADER: "Suo codice cliente"
      },
      kk: {
        YES_LABEL: " Иә",
        NO_LABEL: " Жоқ",
        MINIMIZE_CHAT: " Чаттытасалау",
        MAXIMIZE_CHAT: " Косымшабеттеашу",
        NEW_MESSAGE: "Оператордан жаңа хабарлама",
        BADGE_LABEL: "Сұрақ қою",
        WEBSITE: "http://redhelper.ru",
        SOUND_ONOFF: "Дауысын қосу/сөндіру",
        COPYRIGHT: "онлайн кеңесші",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Назар аударыңыз",
        HIGHLIGHT_LINK: "Ету",
        HINT_CLOSE: "Жабу үшін, батырманы басыңыз",
        DEFAULT_LABEL: "Сұрақ қою",
        SOUND: "Дауыс",
        CODE_HEADER: "Сіздің клиент кодыңыз"
      },
      lt: {
        YES_LABEL: "Taip",
        NO_LABEL: "Ne",
        MINIMIZE_CHAT: "sumažinti pokalbį",
        MAXIMIZE_CHAT: "atidaryti pokalbį naujoje kortelėje",
        NEW_MESSAGE: "Nauja žinutė nuo operatoriaus",
        BADGE_LABEL: "Live Chat",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Garsas įjungtas/išjungtas",
        COPYRIGHT: "sukurta",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Prašome atkreipti dėmesį",
        HIGHLIGHT_LINK: "Eiti į",
        HINT_CLOSE: "Spausti uždarymui",
        DEFAULT_LABEL: "Live Chat",
        SOUND: "Garsas",
        CODE_HEADER: "Jūsų kliento kodas"
      },
      lv: {
        YES_LABEL: "Jā",
        NO_LABEL: "Nē",
        MINIMIZE_CHAT: "noslēpt čatu",
        MAXIMIZE_CHAT: "atvērt atsevišķā cilnē",
        NEW_MESSAGE: "Jauns ziņojums no operatora",
        BADGE_LABEL: "Uzdot jautājumu",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Ieslēgt / izslēgt skaņu",
        HIGHLIGHT_LABEL: "Pievērstet uzmanību",
        HIGHLIGHT_LINK: "Pāriet",
        HINT_CLOSE: "Spiediet, lai aizvērt",
        DEFAULT_LABEL: "Uzdot jautājumu",
        SOUND: "Garso"
      },
      md: {
        YES_LABEL: "Da",
        NO_LABEL: "Nu",
        MINIMIZE_CHAT: "minimizează chat-ul",
        MAXIMIZE_CHAT: "deschide în fereastra de alături",
        NEW_MESSAGE: "Mesaj nou de la operator",
        BADGE_LABEL: "Dă o întrebare",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Activează/Dezactivează sunetul",
        COPYRIGHT: "consultant online de la",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Atrageți atenția",
        HIGHLIGHT_LINK: "Trecere",
        HINT_CLOSE: "Faceți click pentru a închide",
        DEFAULT_LABEL: "Dă o întrebare",
        SOUND: "Sunet"
      },
      pl: {
        YES_LABEL: "Tak",
        NO_LABEL: "Nie",
        MINIMIZE_CHAT: "Zminimalizować okno",
        MAXIMIZE_CHAT: "Maksymalizować okno w nowej zakładce",
        NEW_MESSAGE: "Nowa wiadomość od operatora",
        BADGE_LABEL: "Konwersacja na żywo",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Dźwięk wł./wył.",
        COPYRIGHT: " Usługę udziela",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Zwróć uwagę",
        HIGHLIGHT_LINK: "Przejść",
        HINT_CLOSE: "Zamknąć",
        DEFAULT_LABEL: " Konwersacja na żywo",
        SOUND: "Dźwięk",
        CODE_HEADER: "Twój kod klienta"
      },
      ru: {
        YES_LABEL: "Да",
        NO_LABEL: "Нет",
        MINIMIZE_CHAT: "Свернуть чат",
        MAXIMIZE_CHAT: "Открыть в отдельной вкладке",
        NEW_MESSAGE: "Новое сообщение от оператора",
        BADGE_LABEL: "Задать вопрос",
        WEBSITE: "http://redhelper.ru",
        SOUND_ONOFF: "Включить/выключить звук",
        COPYRIGHT: "Сервис предоставлен",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Обратите внимание",
        HIGHLIGHT_LINK: "Перейти",
        HINT_CLOSE: "Кликните, чтобы закрыть",
        DEFAULT_LABEL: "Задать вопрос",
        SOUND: "Звук",
        CODE_HEADER: "Ваш код клиента"
      },
      sk: {
        YES_LABEL: "Áno",
        NO_LABEL: "Nie",
        MINIMIZE_CHAT: "Minimalizovať okno",
        MAXIMIZE_CHAT: "Otvoriť okno v novej záložke",
        NEW_MESSAGE: "Nová správa od operátora",
        BADGE_LABEL: "Živá konverzácia",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "Zvuk zap/vyp",
        COPYRIGHT: "poskytovateľ",
        COPYRIGHT_NAME: "<span>Red</span>Helper",
        HIGHLIGHT_LABEL: "Všimnite si",
        HIGHLIGHT_LINK: "‘Choď’",
        HINT_CLOSE: "Zavrite",
        DEFAULT_LABEL: "Živá konverzácia",
        SOUND: "Zvuk",
        CODE_HEADER: "Mód Vášho klienta"
      },
      uk: {
        YES_LABEL: "Так",
        NO_LABEL: "Ні",
        MINIMIZE_CHAT: "згорнути чат",
        MAXIMIZE_CHAT: "відкрити в окремій вкладці",
        NEW_MESSAGE: "Нове повідомлення від оператора",
        BADGE_LABEL: "Задати питання",
        SOUND_ONOFF: "Увімкнути/вимкнути звук",
        COPYRIGHT: "Онлайн консультант от",
        HIGHLIGHT_LABEL: "Зверніть увагу",
        HIGHLIGHT_LINK: "Перейти",
        HINT_CLOSE: "Клацніть, щоб закрити",
        DEFAULT_LABEL: "Задати питання",
        SOUND: "Звук",
        WEBSITE: "http://redhelper.ru"
      },
      zh: {
        YES_LABEL: "是的",
        NO_LABEL: "不是",
        MINIMIZE_CHAT: "最小化对话框",
        MAXIMIZE_CHAT: "在一个新标签里打开对话",
        NEW_MESSAGE: "顾问发来的新的信息",
        BADGE_LABEL: "在线聊天",
        WEBSITE: "http://redhelper.com",
        SOUND_ONOFF: "声音打开/关闭",
        COPYRIGHT: "技术支持由",
        COPYRIGHT_NAME: "<span>红色</span>助手",
        HIGHLIGHT_LABEL: "请留笔记",
        HIGHLIGHT_LINK: "'到'",
        HINT_CLOSE: "点击关闭",
        DEFAULT_LABEL: "在线聊天",
        SOUND: "声音",
        CODE_HEADER: "您的客户号码"
      }
    }
  }), define("config/lang", ["application/session.objects", "config/api", "common/extensions/jquery.plugins", "locales"], function(a, b, c, d) {
    var e = {
      YES_LABEL: "",
      NO_LABEL: "",
      MINIMIZE_CHAT: "",
      MAXIMIZE_CHAT: "",
      NEW_MESSAGE: "",
      BADGE_LABEL: "",
      WEBSITE: "",
      SOUND_ONOFF: "",
      COPYRIGHT: "",
      HIGHLIGHT_LABEL: "",
      HIGHLIGHT_LINK: "",
      HINT_CLOSE: "",
      DEFAULT_LABEL: "",
      COPYRIGHT_NAME: "<span>Red</span>Helper",
      SOUND: "",
      CODE_HEADER: "",
      RTL: ""
    };
    return e.setFields = function(a) {
      for (var b in a) a.hasOwnProperty(b) && (e[b] = a[b])
    }, e.initLanguage = function() {
      var f, g = d.enabled,
        h = function() {
          return window.redhlpSettings && window.redhlpSettings.lang && g.indexOf(window.redhlpSettings.lang) > -1 ? (a.userLocale = window.redhlpSettings.lang, window.redhlpSettings.lang) : a && a.locale && g.indexOf(a.locale) > -1 ? (a.userLocale = a.locale, a.locale) : "ru"
        }();
      if (h && "ru" !== h && c(".rh-copy").hide(), e.RTL && c("#rh-snippet").addClass("rh-rtl"), e.setFields(d.locales[h]), !a.free && b && b.Lang)
        for (f in e) e.hasOwnProperty(f) && b.Lang.hasOwnProperty(f) && (e[f] = b.Lang[f])
    }, e.initLanguage(), e
  }), define("config/settings", ["common/extensions/jquery.plugins", "config/api"], function(a, b) {
    var c = {};
    return c
  }), define("common/extensions/performance", [], function() {
    var a = {},
      b = 0,
      c = function() {
        var b = "";
        b = JSON.stringify(a);
        try {
          localStorage.setItem("rhlp.performance", b)
        } catch (c) {}
      };
    if (localStorage.getItem("rhlp.performance")) try {
      a = JSON.parse(localStorage.getItem("rhlp.performance"))
    } catch (d) {}
    setInterval(function() {
      b += 20
    }, 20);
    return {
      addPoint: function(d) {
        a[d] ? (a[d].times++, a[d].sum += b) : (a[d] = {}, a[d].times = 1, a[d].sum = b), c()
      },
      getStats: function() {
        return a
      },
      clearStats: function() {
        a = {}, c()
      }
    }
  }), define("view/badge", ["application/session.objects", "view/badgeDimensions", "view/badgePosition", "view/badgePNG", "common/extensions/jquery.plugins", "application/dispatcher", "common/constants/chatState", "config/setup", "config/lang", "config/settings", "common/extensions/performance", "common/extensions/browserDetect"], function(a, b, c, d, e, f, g, h, i, j, k, l) {
    return {
      _htmlContent: '<div id="rh-badge" style="overflow: visible; display: none; position: fixed;"><div id="rh-badgeContent" style="display: none">' + i.BADGE_LABEL + '</div><div id="rh-badgeExpander"></div></div>',
      _element: null,
      _wrapper: null,
      _apiElements: null,
      _dontShow: !1,
      _blinkingId: null,
      _isBlinking: !1,
      _docTitle: "",
      _style: null,
      _lockResize: !1,
      _activeElement: null,
      _addBlinkStyle: function() {
        var b = this;
        a.dispatcher.addEventListener("onBadgeChanged", function() {
          b._addBlinkStyle()
        })
      },
      append: function(f) {
        function g() {
          (j.button || j.buttonBadge) && (k._dontShow = !!j.button, k._apiElements = e(j.button || j.buttonBadge))
        }
        j.iframe || f.append(this._htmlContent), this._wrapper = e("#rh-badge"), this._element = e(d.getBadge()), this._element.hide(), this._wrapper.css({
          "z-index": 99990
        }), e("rh-inner", this._wrapper).css({
          position: "relative",
          margin: "1px",
          "font-family": '"Segoe UI", Tahoma, Arial, Verdana, sans-serif'
        });
        var h = this,
          i = function() {
            !h._lockResize && h._wrapper && h._wrapper.css(d.getBox())
          };
        b.addHandler(i), this._wrapper.append(d.getBadge()), c.init(), a.dispatcher.addEventListener("onBadgeChanged", function() {
          d.updateBadge()
        }), a.dispatcher.addEventListener("onBadgePaddingChanged", function() {
          b.setPadding(a.badgePadding)
        }), a.dispatcher.addEventListener("onBadgePositionChanged", function() {
          c.setPosition(a.badgePosition)
        }), a.dispatcher.addEventListener("onBadgeXChanged", function() {
          c.setX(a.badgeX)
        }), a.dispatcher.addEventListener("onBadgeYChanged", function() {
          c.setY(a.badgeY)
        });
        var k = this;
        setInterval(g, 1e3), g()
      },
      init: function() {
        function h() {
          l._apiElements && l._apiElements.not(".rh-initialized").addClass("rh-initialized").click(function(b) {
            b.preventDefault(), a.chatState !== g.WINDOW && (i._activeElement = e(this), f.fire("openChat"), f.fire("openChatButtonClicked"))
          })
        }
        var i = this;
        this._element.click(function() {
          i._activeElement = i._wrapper, f.fire("openChat"), f.fire("openChatButtonClicked")
        }).mousedown(function() {});
        var l = this;
        if (setInterval(h, 1e3), h(), a.skin && this._addBlinkStyle(), a.messageUnread && (j.button || this._element.addClass("active"), this._docTitle = document.title, document.title = "(" + a.unreadMessages + ") " + document.title), f.addEventListener("openChat", function() {
            j.button || i.hide()
          }), f.addEventListener("closeChat", function() {
            j.button || i.show()
          }), f.addEventListener("start", function() {
            if (f.fire("badgeInit"), a.chatState !== g.WINDOW) {
              a.badgePosition && c.setPosition(a.badgePosition), a.badgeX && c.setX(a.badgeX), a.badgeY && c.setY(a.badgeY), a.skin && i._addBlinkStyle(), d.updateBadge(), a.badgeFontSize && b.setFontSize(a.badgeFontSize), a.badgePadding && b.setPadding(a.badgePadding);
              var e = function() {
                a.animateBadge ? i.slideOut() : i.show(), f.removeEventListener("badgeLoaded", e)
              };
              f.addEventListener("badgeLoaded", e)
            }
          }), a.hideBadge && (this._dontShow = !0), a.badgePosition && ("bottom-left" === a.badgePosition && (a.badgeX = "0%"), "bottom-right" === a.badgePosition && (a.badgeX = "-0%"), c.setPosition(a.badgePosition)), a.badge && d.updateBadge(), a.badgeFontSize && b.setFontSize(a.badgeFontSize), a.badgePadding && b.setPadding(a.badgePadding), a.badgeX && c.setX(a.badgeX), a.badgeY && c.setY(a.badgeY), a.chatState !== g.WINDOW) {
          var m = function() {
            a.animateBadge ? i.slideOut() : i.show(), f.removeEventListener("badgeLoaded", m)
          };
          f.addEventListener("badgeLoaded", m)
        }
        f.fire("badgeInit"), k.addPoint("badge")
      },
      show: function() {
        this._dontShow || (this._wrapper.show(), this._element.show(), f.fire("badgeShown"))
      },
      slideOut: function() {
        if (!(this._wrapper.is(":visible") && this._element.is(":visible") || this._dontShow)) {
          var b, c = "Explorer" === l.browser && document.documentMode < 9;
          switch (a.badgePosition) {
            case "left":
              b = "right";
              break;
            case "right":
              b = "left";
              break;
            case "bottom":
            case "bottom-left":
            case "bottom-right":
              b = "top"
          }
          var d = {};
          this._wrapper.show(), this._element.show(), d[b] = this._element.height() + "px", d.position = "absolute", this._element.css(d);
          var e = {};
          e[b] = "0px";
          var g = this;
          try {
            var h = function() {
              g._element[0].style.display = "inline-block", g._element[0].offsetHeight, g._element[0].style.display = "block", setTimeout(function() {
                f.fire("badgeShown")
              }, 50)
            };
            c ? (this._element.css(e), h()) : this._element.animate(e, {
              duration: 500,
              complete: h
            })
          } catch (i) {
            d.position = "static", d[b] = "0%", this._element.css(d), this.show()
          }
        }
      },
      hide: function() {
        this._element.hide()
      },
      getActiveElement: function() {
        return j.button ? this._activeElement ? this._activeElement : this._apiElements ? j.buttonBadge ? this._element : e(this._apiElements.filter(":visible")[0]) : this._wrapper : this._wrapper
      }
    }
  }), define("view/chat.html", ["config/lang"], function(a) {
    var b = '<div id="rh-chatWrapper"><div id="rh-chat" style="display:none;"><div id="rh-chatBack" class=""></div><div id="rh-chatShadow"></div><div id="rh-chatInnerWrapper"><div class="rh-draggable rh-reset" id="rh-topPanel"><div id="rh-chatIcon"></div><div id="rh-chatTitle"></div></div><div id="rh-close" title="' + a.MINIMIZE_CHAT + '"><div></div></div><div id="rh-sound" title="' + a.SOUND_ONOFF + '"><div></div></div><div id="rh-chatWindow"><div id="rh-frameWrapper"><div id="rh-frameHelper"></div><div id="rh-frameLoading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; background: url(data:image/gif;base64,R0lGODlhWwAZAPAAAAAAAAAAACH5BAlGAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAWwAZAAACMISPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEopFYAAAh+QQJRgABACwAAAAAWwAZAID///8AAAACX4x/oAvoD6OctE6Gld28+5SFzUeWnoia6gqhLgur7hzX55zaOoXT+//ovYDEgNBX3B2HSd0y17Q9RVHnNFOVXjHZ2pbbjX01YfG47N2i09c1e+nWHuPWHv2HvOOxelgBACH5BAlGAAEALAAAAABbABkAgP///wAAAAKIjH+gC+gPEVux2nunxlZPDoaJ54kGWZrqg5Jim64r7HJ0LId33e1brvN9MkIGEFT8RZLDY4+peEKdUmgDYjVSsdkot7v9Zpfda1hSJoPP6DUrzR65HWVzvK4ex+XTynz/R6e3x1eEYUUoyHTYl1i4g5Tk+ObzIjQpBqNSiZmHs9nSydh09NlZAAAh+QQJRgABACwAAAAAWwAZAID///8AAAACnox/oAvoDxFbsdap7MNTa854Fkh9ZCdKZ5gmawm9aCqzdJ1tOGzujejLuYK/EbF4OaqIniMy4hwqk1Hq1CmMYY1RLG+51XrHT2lVR/ZCx+t0GP12uNXiOHgebNvN+J3+LMdG95dnxRQwWHdI6MOH0zTFVWgAyFgDuUg52eMHtOl40oLYefNoySGqKZM6usqJygr6lboiChsbOIPrWFEAADs=) 50% 50% no-repeat;"></div><div id="rh-copy"><a href="' + a.WEBSITE + '?copy" target="_blank"><span class="rh-textWrapper">' + a.COPYRIGHT + "</span> " + a.COPYRIGHT_NAME + '</a></div><iframe id="rh-chatFrame" frameBorder="0"></iframe></div></div><div id="rh-resizeBoth"></div></div></div></div><div id="rh-block"></div>';
    return b
  }), define("view/minbox", ["application/chatWindow", "common/extensions/jquery.plugins", "application/session.objects"], function(a, b, c) {
    var d = {
        width: 300,
        height: 420
      },
      e = {
        width: Math.ceil(4 * d.width / 3),
        height: Math.ceil(4 * d.height / 3)
      },
      f = d.width / d.height,
      g = .001;
    return a.addHandler("setMinSize", function(a) {
      var h = {
        width: 0,
        height: 0
      };
      a.width && (h.width = parseInt(a.width, 10)), a.height && (h.height = parseInt(a.height, 10)), (h.width > e.width || h.height > e.height) && (h = e), h.width * f - h.height > g && (h.height = h.width / f), h.height - h.width * f > g && (h.width = h.height * f), h.width < d.width && (h = d), c.defaultChatHeight === c.chatHeight && (c.chatHeight = 0), c.defaultChatWidth === c.chatWidth && (c.chatWidth = 0), c.defaultChatHeight = Math.ceil(h.height), c.defaultChatWidth = Math.ceil(h.width), d = h, b("#rh-chat").css({
        width: c.chatWidth + "px",
        height: c.chatHeight + "px"
      })
    }), !0
  }), define("common/extensions/color", {
    parseRGB: function(a) {
      var b = [];
      return b.push(parseInt(a.substr(1, 2), 16)), b.push(parseInt(a.substr(3, 2), 16)), b.push(parseInt(a.substr(5, 2), 16)), b
    },
    rgb2hsl: function(a) {
      var b = a[0] / 255,
        c = a[1] / 255,
        d = a[2] / 255,
        e = Math.max(b, c, d),
        f = Math.min(b, c, d),
        g = (e + f) / 2,
        h = 0,
        i = 0;
      e !== f && (h = .5 > g ? (e - f) / (e + f) : (e - f) / (2 - e - f), i = b === e ? (c - d) / (e - f) : c === e ? 2 + (d - b) / (e - f) : 4 + (b - c) / (e - f)), g = 100 * g, h = 100 * h, i = 60 * i, 0 > i && (i += 360);
      var j = [i, h, g];
      return j
    },
    hsl2rgb: function(a) {
      var b, c, d, e = a[0],
        f = a[1] / 100,
        g = a[2] / 100,
        h = (1 - Math.abs(2 * g - 1)) * f,
        i = e / 60,
        j = h * (1 - Math.abs(i % 2 - 1));
      void 0 === e || isNaN(e) || null === e ? b = c = d = 0 : i >= 0 && 1 > i ? (b = h, c = j, d = 0) : i >= 1 && 2 > i ? (b = j, c = h, d = 0) : i >= 2 && 3 > i ? (b = 0, c = h, d = j) : i >= 3 && 4 > i ? (b = 0, c = j, d = h) : i >= 4 && 5 > i ? (b = j, c = 0, d = h) : i >= 5 && 6 > i && (b = h, c = 0, d = j);
      var k, l, m, n = g - h / 2;
      return k = 255 * (b + n), l = 255 * (c + n), m = 255 * (d + n), k = Math.round(k), l = Math.round(l), m = Math.round(m), [k, l, m]
    },
    blend: function(a, b, c) {
      return a = this.parseRGB(a), b = this.parseRGB(b), [Math.floor(a[0] * c + b[0] * (1 - c)), Math.floor(a[1] * c + b[1] * (1 - c)), Math.floor(a[2] * c + b[2] * (1 - c))]
    },
    rgb2string: function(a) {
      return "#" + a[0].toString(16) + a[1].toString(16) + a[2].toString(16)
    },
    toRGB: function(a) {
      return a = a.replace("#", ""), 3 == a.length && (a = a.replace(/(.)/g, "$1$1")), a = parseInt(a, 16), [a >> 16, (65280 & a) >> 8, 255 & a]
    }
  }), define("application/command", ["application/chatWindow", "application/dispatcher"], function(a, b) {
    var c = {},
      d = {
        execute: function(b, c, d) {
          a.send("command.send", {
            command: b,
            arguments: c,
            ignoreAfter: d
          })
        },
        setHandler: function(a, b) {
          c[a] = b
        },
        clearHandler: function(a) {
          delete c[a]
        }
      };
    return a.addHandler("command.received", function(a) {
      if (a.command in c) try {
        c[a.command](a.args)
      } catch (b) {}
    }), d
  }), define("view/chat", ["common/extensions/jquery.plugins", "application/session.objects", "common/application/viewUtils", "application/dispatcher", "application/chatWindow", "view/chat.html", "config/settings", "config/setup", "config/lang", "common/constants/chatState", "view/badge", "common/extensions/browserDetect", "view/minbox", "common/extensions/color", "application/command"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    var p = {
        height: a(window).height(),
        width: a(window).width()
      },
      q = {
        _htmlContent: f,
        _separateChatWindow: null,
        _element: null,
        _isDragged: !1,
        _inProgress: !1,
        _attachedBottom: !1,
        _isResized: !1,
        _dragOffsetX: 0,
        _dragOffsetY: 0,
        _resizeX1: 0,
        _resizeY1: 0,
        _resizeX2: 0,
        _resizeY2: 0,
        _resizeOffsetX: 0,
        _resizeOffsetY: 0,
        _cursor: "default",
        _fixMobile: function() {
          l.isMobile || "iPhone" === l.OS || "Android" === l.OS || "iPhone" === l.browser
        },
        _fixBox: function() {
          var e = {
            height: a(window).height(),
            width: a(window).width()
          };
          if (l.isMobile && e.height === p.height != (e.width === p.width)) return void q._element.css({
            top: b.chatY + "px",
            left: b.chatX + "px",
            width: b.chatWidth + "px",
            height: b.chatHeight + "px"
          });
          p = e;
          var f = c.getBox(q._element);
          f.top < 0 && (q._element.css({
            top: "0px"
          }), f.top = 0), (f.top < 0 || f.top + f.height > e.height) && q._element.css({
            bottom: "0px"
          }), b.chatHeight && e.height > f.height && f.height !== b.chatHeight && (q._element.height(b.chatHeight), f.height = b.chatHeight), b.chatHeight && e.height > f.height + f.top && f.top !== b.chatY && b.chatY > 0 && (q._element.css({
            top: b.chatY + "px"
          }), f.top = b.chatY), b.chatWidth && e.width > f.width && f.width !== b.chatWidth && (q._element.width(b.chatWidth), f.width = b.chatWidth), b.chatWidth && e.width > f.width + f.left && b.chatX > 0 && f.left !== b.chatX && (q._element.css({
            left: b.chatX + "px"
          }), f.left = b.chatX), e.height < f.height ? (q._element.height(e.height), q._element.css({
            top: "0px"
          })) : e.height < f.height + f.top && q._element.css({
            top: e.height - f.height
          }), e.width < f.width ? (q._element.width(e.width), q._element.css({
            left: "0px"
          })) : e.width < f.width + f.left && q._element.css({
            left: e.width - f.width + "px"
          });
          var g = c.getBox(q._element);
          q._element && q._element.is(":visible") && b.chatState === j.WINDOW && (b.chatHeight || (b.chatHeight = g.height), b.chatWidth || (b.chatWidth = g.width), d.fire("chatBoxChanged", g))
        },
        fillTexts: function() {
          a("#rh-close").attr("title", i.MINIMIZE_CHAT), a("#rh-copy a").html('<span class="rh-textWrapper">' + i.COPYRIGHT + "</span> " + i.COPYRIGHT_NAME), a("#rh-maximize").val(i.MAXIMIZE_CHAT)
        },
        append: function(b) {
          g.iframe || b.append(this._htmlContent), this._element = a("#rh-chat")
        },
        init: function() {
          b.chatX && (parseInt(b.chatX, 10) >= 0 ? this._element.css("left", b.chatX) : this._element.css({
            right: -parseInt(b.chatX, 10) + "px",
            left: "auto"
          })), b.chatY && this._element.css("top", b.chatY > 0 ? b.chatY : 0);
          try {
            JSON.parse(b.offlineFields).length > 3 && !b.chatWidth && (b.chatWidth = 380), JSON.parse(b.offlineFields).length > 3 && !b.chatHeight && (b.chatHeight = 420)
          } catch (c) {
            b.offlineFields.length > 3 && !b.chatWidth && (b.chatWidth = 380), b.offlineFields.length > 3 && !b.chatHeight && (b.chatHeight = 420)
          }
          if (b.chatWidth && this._element.css("width", b.chatWidth), b.chatHeight && this._element.css("height", b.chatHeight), !b.free)
            if ("mac" == b.skin) b.chatColor && a(".rh-colorifier").css({
              background: "#" + b.chatColor,
              display: "block"
            }), b.dispatcher.addEventListener("onChatColorChanged", function() {
              b.chatColor ? a(".rh-colorifier").css("background", "#" + b.chatColor) : a(".rh-colorifier").css("background", "none")
            }), b.chatIntensity && a(".rh-colorifier").css({
              opacity: b.chatIntensity / 600
            }), b.dispatcher.addEventListener("onChatIntensityChanged", function() {
              b.chatColor ? a(".rh-colorifier").css({
                opacity: b.chatIntensity / 600
              }) : a(".rh-colorifier").css({
                opacity: .6
              })
            });
            else {
              if (b.badgeColor) {
                var f = n.toRGB(b.badgeColor),
                  g = .2126 * f[0] + .7152 * f[1] + .0722 * f[2];
                a("#rh-topPanel").css("background", b.badgeColor), a("#rh-arrow").css("border-color", b.badgeColor).find(".rh-arrow_itself").css("border-color", b.badgeColor), g > 170 ? a("#rh-chatInnerWrapper").addClass("rh-lightPanel") : a("#rh-chatInnerWrapper").removeClass("rh-lightPanel")
              }
              b.dispatcher.addEventListener("onBadgeColorChanged", function() {
                if (b.badgeColor) {
                  var c = n.toRGB(b.badgeColor),
                    d = .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
                  a("#rh-topPanel").css("background", b.badgeColor), a("#rh-arrow").css("border-color", b.badgeColor).find(".rh-arrow_itself").css("border-color", b.badgeColor), d > 170 ? a("#rh-chatInnerWrapper").addClass("rh-lightPanel") : a("#rh-chatInnerWrapper").removeClass("rh-lightPanel")
                } else a("#rh-topPanel").css("background", "none"), a("#rh-topPanel").removeClass("rh-lightPanel")
              })
            }
          q._fixMobile(), d.addEventListener("chatOpened", function() {
            q._fixBox()
          }), this.fillTexts(), a(window).resize(function() {
            q._fixBox()
          });
          var h = function(b) {
              var c = !!b.touches;
              if (b.touches && (b = b.touches[0]), !c && ("Explorer" === l.browser && !b.button && document.documentMode < 9 && 1 === b.which && (b.which = 0), !b.which && (q._isDragged || q._isResized))) return p(b), !1;
              if (q._isDragged) {
                var e = b.clientY - q._dragOffsetY,
                  f = q._element.height(),
                  g = a(window).height(),
                  h = b.clientX - q._dragOffsetX,
                  i = a(window).width(),
                  j = q._element.width();
                e + f > g - 20 && g + 70 > e + f ? (e = g - f, q._attachedBottom || (d.fire("attachedBottom"), q._attachedBottom = !0)) : q._attachedBottom && (d.fire("unattachedBottom"), q._attachedBottom = !1), 10 > e && (e = 0), e > g - 20 && (e = g - 20), 10 > h && (h = 0), h + j + 10 > i && (h = i - j), q._element.position().top - a(window).scrollTop() === g - f && e > g - f && q._attachedBottom && (d.fire("unattachedBottom"), q._attachedBottom = !1), q._element.css({
                  left: h,
                  top: e
                })
              } else q._isResized && (q._resizeX2 = b.clientX, q._resizeY2 = b.clientY, q._element.css({
                width: q._resizeX2 - q._resizeX1 + q._resizeOffsetX,
                height: q._resizeY2 - q._resizeY1 + q._resizeOffsetY
              }));
              return !1
            },
            i = function(b) {
              return q._inProgress = !0, a("#rh-block").show(), a("#rh-frameHelper").show(), b.touches && (b = b.touches[0]), q._isDragged = !0, q._dragOffsetX = b.clientX - q._element.position().left, q._dragOffsetY = b.clientY - q._element.position().top, a(document).bind("mousemove", h), !1
            };
          a(".rh-draggable").bind("mousedown touchstart", i);
          try {
            a(".rh-draggable")[0].addEventListener("touchstart", i)
          } catch (k) {}
          a("#rh-close").click(function() {
            d.fire("minifyChat")
          }), a("#rh-close, #rh-maximize").mousedown(function() {
            a(this).addClass("pressed").removeClass("hover")
          }).mouseleave(function() {
            a(this).hasClass("pressed") && a(this).removeClass("pressed")
          }).mouseenter(function() {
            a(this).hasClass("hover") && a(this).removeClass("hover").addClass("pressed")
          }), a(window).mouseup(function() {
            a("#rh-close, #rh-maximize").removeClass("pressed").removeClass("hover")
          });
          var m = function(b) {
            return b.touches && (b = b.touches[0]), q._inProgress = !0, a("#rh-block").css("cursor", "se-resize").show(), q._isResized = !0, q._resizeX1 = +q._element.css("left").replace("px", ""), q._resizeY1 = +q._element.css("top").replace("px", ""), q._resizeX2 = b.clientX, q._resizeY2 = b.clientY, q._resizeOffsetX = 5, q._resizeOffsetY = 5, q._element.css({
              left: q._resizeX1,
              top: q._resizeY1
            }), a(document).bind("mousemove", h), !1
          };
          a("#rh-resizeBoth").bind("mousedown touchstart", m);
          try {
            a("#rh-resizeBoth")[0].addEventListener("touchstart", m)
          } catch (o) {}
          var p = function(c) {
            q._inProgress && (q._inProgress = !1, a(document).unbind("mousemove", h), c.touches && (c = c.touches[0]), a("#rh-block").css("cursor", "default").hide(), q._isDragged ? (b.chatX = c.clientX - q._dragOffsetX, b.chatY = c.clientY - q._dragOffsetY) : q._isResized && (b.chatWidth = q._element.width(), b.chatHeight = q._element.height()), q._isDragged = !1, q._isResized = !1, a("#rh-frameHelper").hide(), a("#rh-block").hide(), q._fixBox())
          };
          a(document).bind("mouseup", p);
          try {
            a("#rh-block")[0].addEventListener("touchend", p), a("#rh-block")[0].addEventListener("touchmove", h)
          } catch (r) {}
          d.addEventListener("openChat", function(a) {
            a.first ? q.show() : q.open()
          }), d.addEventListener("minifyChat", function() {
            q.close(), q._fixBox()
          });
          var s = !1;
          if (q._element.is(":visible") || (s = !0, q._element.show()), !s && q._element.position().top - a(window).scrollTop() + q._element.height() + 20 >= a(window).height() && (q._attachedBottom || (d.fire("attachedBottom"), q._attachedBottom = !0), q._element.css({
              top: a(window).height() - q._element.height()
            })), s && q._element.hide(), b.chatState === j.WINDOW && d.fire("openChat", {
              first: !0
            }), b.audioEnabled || a("#rh-sound").addClass("rh-soundOff"), b.dispatcher.addEventListener("onAudioEnabledChanged", function() {
              a("#rh-sound").toggleClass("rh-soundOff", !b.audioEnabled)
            }), a("#rh-sound").click(function() {
              b.audioEnabled ? e.send("soundOff") : e.send("soundOn"), a("#rh-sound").toggleClass("rh-soundOff")
            }), !b.free && b.chatColor) {
            var t = b.chatColor;
            t.indexOf("#") < 0 && (t = "#" + t), "mac" == b.skin ? a("#rh-frameWrapper").css("background-color", n.rgb2string(n.blend(t, "#cccccc", (b.chatIntensity || 360) / 600))) : a("#rh-frameWrapper").css("background-color", t)
          }
        },
        show: function() {
          if (h.IS_PHONE) return void this.runChatInSeparateWindow();
          if (window.redhlpSettings && window.redhlpSettings.showInSeparateWindow) return void this.runChatInSeparateWindow(window.redhlpSettings.windowWidth || 350, window.redhlpSettings.windowHeight || 450);
          q.fillTexts(), q._element.show();
          var b = a(window).height() - q._element.position().top + a(window).scrollTop() - q._element.height();
          20 > b && b > -70 ? d.fire("attachedBottom") : d.fire("unattachedBottom"), d.fire("chatOpened")
        },
        hide: function() {
          q._element.hide(), d.fire("closeChat")
        },
        runChatInSeparateWindow: function(b, c) {
          var e = (b ? "width=" + b + "," : "") + (c ? "height=" + c + "," : ""),
            f = window.redhlpSettings && window.redhlpSettings.page ? window.redhlpSettings.page : page = location.href.substr(0, 256),
            g = "?page=" + encodeURIComponent(f) + (a("#rhlpscrtg").attr("src").split("://").pop().indexOf("test") > -1 ? "&test" : ""),
            i = this;
          if (!i._separateChatWindow) {
            i._separateChatWindow = window.open("http://rhlp.net/" + h.CLIENT_NAME + g, "RedHelper", e + "toolbar=no,status=no,location=no,directories=no,menubar=no");
            var j = setInterval(function() {
              return i._separateChatWindow ? void(i._separateChatWindow.closed && (i._separateChatWindow = null,
                d.fire("closeChat"), clearInterval(j))) : void clearInterval(j)
            }, 100)
          }
          i._separateChatWindow.focus()
        },
        open: function() {
          if (!this._separateChatWindow) {
            if (h.IS_PHONE) return void this.runChatInSeparateWindow();
            if (window.redhlpSettings && window.redhlpSettings.showInSeparateWindow) return void this.runChatInSeparateWindow(window.redhlpSettings.windowWidth || 350, window.redhlpSettings.windowHeight || 450);
            o.execute("ensureWeHaveOperator", {}, 1e4), q.fillTexts();
            var e = c.getBox(this._element);
            e.opacity = 1, b.chatWidth !== e.width && (b.chatWidth = e.width), b.chatHeight !== e.height && (b.chatHeight = e.height), b.chatX = e.left > 0 ? e.left : 0, b.chatY = e.top > 0 ? e.top : 0, this._element.find("iframe").attr("style", "display: none !important;");
            var f = c.getMinSize(this._element);
            q._element.css(c.getBox(k.getActiveElement())).show().css({
              opacity: 0,
              "min-width": 0,
              "min-height": 0
            });
            var g = !1;
            q._element.animate(e, {
              duration: 300,
              useCSS3: !1,
              complete: function() {
                a("#rh-chatFrame").animate({
                  opacity: "show"
                }, 200), g = !0, d.fire("chatOpened"), a(this).css(f), q._element.position().top - a(window).scrollTop() + q._element.height() >= a(window).height() && (q._attachedBottom || (d.fire("attachedBottom"), q._attachedBottom = !0))
              },
              step: function(a, b) {
                !g && b.pos > .95
              }
            })
          }
        },
        close: function() {
          var b = c.getBox(this._element),
            e = c.getMinSize(this._element),
            f = c.getBox(k.getActiveElement(), !0);
          f.opacity = 0, this._element.css({
            "min-width": 0,
            "min-height": 0
          });
          var g = !1,
            h = this;
          a("#rh-chatFrame").animate({
            opacity: "0"
          }, 100, function() {
            h._element.animate(f, {
              duration: 300,
              useCSS3: !1,
              complete: function() {
                a(this).css(b).css(e).hide(), d.fire("closeChat"), a("#rh-chatFrame").css({
                  opacity: "1"
                }), g = !0
              },
              step: function(a, b) {
                !g && b.pos > .2
              }
            })
          })
        }
      };
    return d.addEventListener("chatOpened", function() {
      e.send("chatOpened")
    }), q
  }), define("view/loader", ["common/extensions/jquery.plugins", "application/dispatcher"], function(a, b) {
    var c = 0,
      d = {
        _defaultCssLoadSelector: "rh-loadCss",
        _checkLoadInterval: 40,
        _uris: [],
        loadCss: function(b, c, d) {
          b && (this._uris.indexOf(b) > -1 || (this._uris.push(b), void 0 === c && (c = this._defaultCssLoadSelector), document.createStyleSheet ? document.createStyleSheet(b) : a("head").append('<link rel="stylesheet" type="text/css" href="' + b + '">'), a("#rh-snippet").length ? a("#rh-snippet").append('<div id="' + c + '"></div>') : a("#rh-snippet").append('<div id="' + c + '"></div>'), this._listenCssLoad(c, d)))
        },
        _listenCssLoad: function(e, f) {
          c += d._checkLoadInterval, "1" === a("#" + e).css("z-index") || c > 2e3 ? void 0 !== f ? b.fire(f) : b.fire("cssLoaded") : setTimeout(function() {
            d._listenCssLoad(e, f)
          }, d._checkLoadInterval)
        }
      };
    return d
  }), define("common/extensions/boxUtils", {
    isInside: function(a, b) {
      return a.top >= b.top && a.top + a.height <= b.top + b.height && a.left >= b.left && a.left + a.width <= b.left + b.width
    },
    hasXIntersection: function(a, b) {
      return a.left + a.width > b.left && b.left + b.width > a.left
    },
    hasYIntersection: function(a, b) {
      return a.top + a.height > b.top && b.top + b.height > a.top
    },
    hasIntersection: function(a, b) {
      return this.hasXIntersection(a, b) && this.hasYIntersection(a, b)
    },
    xIntersectionLength: function(a, b) {
      var c = Math.max(0, Math.min(b.left - a.left, a.width)),
        d = Math.max(0, Math.min(b.left + b.width - a.left, a.width));
      return Math.abs(c - d)
    },
    yIntersectionLength: function(a, b) {
      var c = Math.max(0, Math.min(b.top - a.top, a.height)),
        d = Math.max(0, Math.min(b.top + b.height - a.top, a.height));
      return Math.abs(c - d)
    },
    isAbove: function(a, b, c) {
      return c = c || 0, a.top + a.height - c <= b.top
    },
    isBelow: function(a, b, c) {
      return c = c || 0, a.top + c >= b.top + b.height
    },
    isLeft: function(a, b, c) {
      return c = c || 0, a.left + a.width - c <= b.left
    },
    isRight: function(a, b, c) {
      return c = c || 0, a.left + c >= b.left + b.width
    },
    placeableAbove: function(a, b, c) {
      var d = b.width,
        e = c - b.top;
      return d > a.width && e > a.height
    },
    placeableBelow: function(a, b, c) {
      var d = b.width,
        e = b.height - (c - b.top);
      return d > a.width && e > a.height
    },
    placeableLeft: function(a, b, c) {
      var d = c - b.left,
        e = b.height;
      return d > a.width && e > a.height
    },
    placeableRight: function(a, b, c) {
      var d = b.width - (c - b.left),
        e = b.height;
      return d > a.width && e > a.height
    },
    placeInRange: function(a, b, c, d) {
      var e = Math.max(c.first + d - a, 0),
        f = Math.max(0, Math.min(c.second - d, b - a));
      return e > f ? f : (e + f) / 2
    }
  }), require(["jquery", "application/dispatcher", "application/session.objects", "config/lang", "config/setup", "common/application/viewUtils", "common/extensions/boxUtils"], function(a, b, c, d, e, f, g) {
    function h() {
      var b = f.getBoundingBox(k),
        c = f.getIndents(l),
        d = 50,
        e = {
          height: l.height() + c.padding.top + c.padding.bottom + c.border.top + c.border.bottom,
          width: l.width() + c.padding.left + c.padding.right + c.border.left + c.border.right,
          bottom: "auto",
          right: "auto"
        },
        h = {
          left: a(window).scrollLeft(),
          top: a(window).scrollTop(),
          width: a(window).width(),
          height: a(window).height()
        },
        i = {
          first: b.left - h.left,
          second: b.left - h.left + b.width
        },
        j = {
          first: b.top - h.top,
          second: b.top - h.top + b.height
        },
        o = g.xIntersectionLength(b, h) >= Math.min(b.width, d),
        p = g.yIntersectionLength(b, h) >= Math.min(b.height, d);
      if (l.removeClass("rh-below rh-above rh-left rh-right"), n.left = !1, n.right = !1, n.below = !1, n.above = !1, l.find(".rh-arrow_itself").css({
          top: "",
          left: ""
        }), g.hasIntersection(b, h)) {
        if (l.removeClass("rh-outside"), m = !1, g.placeableAbove(e, h, b.top) && o ? (e.bottom = h.height - (b.top - h.top), e.top = "auto", e.left = g.placeInRange(e.width, h.width, i, 20), l.addClass("rh-above"), n.above = !0) : g.placeableBelow(e, h, b.top + b.height) && o ? (e.bottom = "auto", e.top = b.top + b.height - h.top, e.left = g.placeInRange(e.width, h.width, i, 20), l.addClass("rh-below"), n.below = !0) : g.placeableLeft(e, h, b.left) && p ? (e.right = h.width - (b.left - h.left), e.left = "auto", e.top = g.placeInRange(e.height, h.height, j, 20), l.addClass("rh-left"), n.left = !0) : g.placeableRight(e, h, b.left + b.width) && p ? (e.left = b.left + b.width - h.left, e.right = "auto", e.top = g.placeInRange(e.height, h.height, j, 20), l.addClass("rh-right"), n.right = !0) : g.placeableAbove(e, h, b.top) ? (e.bottom = h.height - (b.top - h.top), e.top = "auto", e.left = g.placeInRange(e.width, h.width, i, 20), l.addClass("rh-above"), n.above = !0) : g.placeableBelow(e, h, b.top + b.height) ? (e.bottom = "auto", e.top = b.top + b.height - h.top, e.left = g.placeInRange(e.width, h.width, i, 20), l.addClass("rh-below"), n.below = !0) : g.placeableLeft(e, h, b.left) ? (e.right = h.width - (b.left - h.left), e.left = "auto", e.top = g.placeInRange(e.height, h.height, j, 20), l.addClass("rh-left"), n.left = !0) : g.placeableRight(e, h, b.left) && (e.left = b.left + b.width - h.left, e.right = "auto", e.top = g.placeInRange(e.height, h.height, j, 20), l.addClass("rh-right"), n.right = !0), !n.left && !n.right) {
          var q = {
            first: Math.max(h.left + e.left, b.left) - h.left - e.left,
            second: Math.min(h.left + e.left + e.width, b.left + b.width) - h.left - e.left
          };
          l.find(".rh-arrow_itself").css({
            left: Math.max(5, Math.min(g.placeInRange(20, e.width, q, 10), e.width - 35))
          })
        }
        if (!n.below && !n.above) {
          var r = {
            first: Math.max(h.top + e.top, b.top) - h.top - e.top,
            second: Math.min(h.top + e.top + e.height, b.top + b.height) - h.left - e.height
          };
          l.find(".rh-arrow_itself").css({
            top: Math.max(5, Math.min(g.placeInRange(20, e.height, r, 10), e.height - 35))
          })
        }
      } else l.addClass("rh-outside"), m = !0, e.width += 90, g.isBelow(b, h) && (e.bottom = 0, e.top = "auto", e.left = g.placeInRange(e.width, h.width, i, 20), l.addClass("rh-above"), n.above = !0), g.isAbove(b, h) && (e.bottom = "auto", e.top = 0, e.left = g.placeInRange(e.width, h.width, i, 20), l.addClass("rh-below"), n.below = !0), g.isRight(b, h) && (e.right = 0, e.left = "auto", n.above || n.below || (e.top = g.placeInRange(e.height, h.height, j, 20)), l.addClass("rh-left"), n.left = !0), g.isLeft(b, h) && (e.left = 0, e.right = "auto", n.above || n.below || (e.top = g.placeInRange(e.height, h.height, j, 20)), l.addClass("rh-right"), n.right = !0);
      delete e.height, delete e.width, l.css(e), l.show()
    }

    function i() {
      var b = f.getBoundingBox(j);
      if (b.left -= parseInt(k.css("padding-left"), 10) + parseInt(k.css("border-left-width"), 10), b.left = b.left >= 0 ? b.left : 0, b.top -= parseInt(k.css("padding-top"), 10) + parseInt(k.css("border-top-width"), 10), b.top = b.top >= 0 ? b.top : 0, b.left + b.width + 10 > a(document).width() && (b.width = a(document).width() - b.left - 10), b.top + b.height + 10 > a(document).height() && (b.height = a(document).height() - b.top - 10), "static" !== a("body").css("position")) {
        var c = a("body").offset();
        b.top -= c.top, b.left -= c.left
      }
      k.css(b).show(), b.width += 10, b.height += 10, l.find("p").html(d.HIGHLIGHT_LABEL)
    }
    var j, k = a('<div id="rhHighlight" class="rh-reset"></div>').css({
        position: "absolute",
        background: "#E4F2FD",
        border: "1px dashed #ba2626",
        opacity: "0.4",
        display: "none",
        "z-index": "9999",
        padding: "3px",
        cursor: "pointer",
        "box-shadow": "0 0 7px black"
      }),
      l = a('<div id="rh-arrow" style="display: none" class="rh-arrow rh-reset"><div class="rh-arrowContainer"><img class="rh-reset rh-face" src=""><p class="rh-reset">' + d.HIGHLIGHT_LABEL + '</p><div style="clear: both"></div></div><a class="rh-close rh-reset"></a><div class="rh-reset rh-arrow_itself"><div class="rh-reset"></div></div></div>'),
      m = !1,
      n = {
        left: !1,
        right: !1,
        above: !1,
        below: !1
      },
      o = function() {
        (c.defaultFace || c.operAvatar) && l.find("img").attr("src", c.currentOperAvatar || e.getImageUrl(c.operAvatar || c.defaultFace))
      };
    c.dispatcher.addEventListener("onDefaultFaceChanged", o), c.dispatcher.addEventListener("onOperAvatarChanged", o), k.click(function() {
      b.fire("stopHighlight")
    }), l.click(function() {
      var b = k.offset();
      a("html, body").animate({
        scrollTop: b.top - (a(window).height() - k.height()) / 2,
        scrollLeft: b.left - (a(window).width() - k.width()) / 2
      }, "slow")
    }), l.children("a.rh-close").click(function(a) {
      return a.stopPropagation(), b.fire("stopHighlight"), !1
    });
    var p = location.href;
    setInterval(function() {
      p !== location.href && (p = location.href, b.fire("stopHighlight"))
    }, 100), a("#rh-snippet").length ? (k.appendTo("#rh-snippet"), l.appendTo("#rh-snippet")) : b.addEventListener("snippetAppended", function() {
      k.appendTo("#rh-snippet"), l.appendTo("#rh-snippet")
    });
    var q = 0,
      r = !1,
      s = function() {
        if (!m) return void(r = !1);
        r || (r = !0, q = 0);
        var a = .5 * Math.abs((q + 20) % 40 - 20),
          b = {
            top: 0,
            left: 0
          };
        n.above && (b.top = a + "px"), n.below && (b.top = -a + "px"), n.left && (b.left = a + "px"), n.right && (b.left = -a + "px"), l.find(".rh-arrow_itself div").css(b), q += 1
      };
    setInterval(s, 20), b.addEventListener("highlight", function(b) {
      try {
        if (!b.selector) return;
        j = b.selector, r = !1, i(), h(), l.css("opacity", 1), k.css("opacity", "0.4"), l.children(".rh-shadow").css("display", "block"), setTimeout(function() {
          l.children(".rh-shadow").fadeOut()
        }, 2e3), b.isCached && l.click(), a(window).bind("scroll resize", h), a(window).bind("resize", i)
      } catch (c) {}
    }), b.addEventListener("stopHighlight", function() {
      a(window).unbind("scroll resize", h), a(window).unbind("resize", i), k.fadeOut(), l.is(":visible") && l.fadeOut()
    }), b.addEventListener("redirect", function(a) {
      a.link && (location.href = a.link)
    })
  }), define("common/extensions/cobrowseHighlight", function() {}), define("view/sendFile", ["common/extensions/jquery.plugins", "application/chatWindow", "application/session.objects"], function(a, b, c) {
    function d(a) {
      if (a.dataTransfer.types)
        for (var b = 0; b < a.dataTransfer.types.length; b++)
          if ("Files" == a.dataTransfer.types[b]) return !0;
      return !1
    }
    if (!c.free) {
      var e = !1,
        f = null;
      a(document).on({
        dragover: function(a) {
          return d(a.originalEvent) ? (a.preventDefault(), clearInterval(f), f = setInterval(function() {
            e && b.send("endDrag"), e = !1
          }, 400), e || (e = !0, b.send("fileDragged")), !1) : !0
        }
      })
    }
  }), define("view/visitorCode", ["common/extensions/jquery.plugins", "application/session.objects", "application/dispatcher", "config/lang", "application/chatWindow"], function(a, b, c, d, e) {
    c.addEventListener("sessionLoaded", function() {
      if (b.visitorCode.enabled) {
        var c = b.visitorCode.height,
          d = b.visitorCode.width,
          f = b.visitorCode.headerFontSize,
          g = b.visitorCode.bodyFontSize,
          h = b.visitorCode.backgroundColor,
          i = Math.round(d / 10),
          j = Math.round(i / 12),
          k = parseInt(h.substr(1, 2), 16),
          l = parseInt(h.substr(3, 2), 16),
          m = parseInt(h.substr(5, 2), 16),
          n = Math.sqrt(k * k * .241 + l * l * .391 + m * m * .068) > 160 ? "#000000" : "#ffffff",
          o = "<div style='margin: 0 " + j + "px; float: left; width: " + i + "px; height: " + i + "px;'><div class='redhlp_round' style='display: none; background: " + h + "; border-radius: 50%; width: " + i + "px; height: " + i + "px;'></div></div>";
        if (o = o + o + o, o = "<div class='redhlp_visitor-code-rounds' style='margin: " + (c / 2 - i / 2) + "px auto; width: " + 3 * (i + 2 * j) + "px;'>" + o + "</div>", a(".redhlp_visitor-code").length) {
          a(".redhlp_visitor-code").css({
            width: d + "px",
            height: c + "px"
          }).show().html("<div class='redhlp_visitor-code-header' style='display: none; font-size:" + f + "px'>" + b.visitorCode.headerText + "</div><div class='redhlp_code' style='display: none; color: " + n + "; background: " + h + "; font-size: " + g + "px'>" + (b.vid ? (b.vid + "").substr((b.vid + "").length - 4) : "") + "</div>" + o);
          var p = 0;
          if (parseInt(b.vid || "0", 10)) a(".redhlp_visitor-code-header, .redhlp_visitor-code .redhlp_code").show(), a(".redhlp_visitor-code-rounds").hide();
          else {
            var q = 0,
              r = !1;
            p = setInterval(function() {
              r ? a(".redhlp_visitor-code .redhlp_round:eq(" + q + ")").fadeOut(300) : a(".redhlp_visitor-code .redhlp_round:eq(" + q + ")").fadeIn(300), 2 === q && (r = !r), q = (q + 1) % 3
            }, 300), b.dispatcher.addEventListener("onVidChanged", function() {
              parseInt(b.vid || "0", 10) && (clearInterval(p), a(".redhlp_visitor-code-header, .redhlp_visitor-code .redhlp_code").show(), a(".redhlp_visitor-code-rounds").hide())
            })
          }
          b.isPartiallyOnline || e.send("getOfflineVid")
        }
      }
    })
  }), define("view/viewManager", ["application/session.objects", "config/setup", "common/extensions/jquery.plugins", "view/badge", "view/chat", "application/dispatcher", "view/loader", "common/constants/chatState", "common/extensions/performance", "common/extensions/cobrowseHighlight", "config/api", "view/sendFile", "view/visitorCode", "common/extensions/browserDetect"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o = {
      _showVisualContent: function(g) {
        (a.defaultFace || a.operAvatar) && c("#rh-chatTop img, img.redhlp_face, img.rh-face").attr("src", b.getImageUrl(a.operAvatar || a.defaultFace)), a.dispatcher.addEventListener("onDefaultFaceChanged", function() {
          (a.operAvatar || a.defaultFace) && c("#rh-chatTop img, img.redhlp_face, img.rh-face").attr("src", b.getImageUrl(a.operAvatar || a.defaultFace))
        }), a.dispatcher.addEventListener("onOperAvatarChanged", function() {
          (a.operAvatar || a.defaultFace) && c("#rh-chatTop img, img.redhlp_face, img.rh-face").attr("src", b.getImageUrl(a.operAvatar || a.defaultFace))
        }), c("#rh-chatHeader").html(a.defaultHeader), "modern" == a.skin && c("#rh-chatTitle").html(a.defaultHeader), c("#rh-topPanel").removeClass(a.isOnline ? "rh-chatOff" : "").addClass(a.isOnline ? "" : "rh-chatOff"), a.dispatcher.addEventListener("onHeaderChanged", function() {
          c("#rh-chatHeader").html(a.defaultHeader), "modern" == a.skin && c("#rh-chatTitle").html(a.defaultHeader)
        }), c("#rh-chatText").html(a.defaultText), a.dispatcher.addEventListener("onTopTextChanged", function() {
          c("#rh-chatText").html(a.defaultText)
        }), c("#rh-chatName").html(a.operDisplayName), a.dispatcher.addEventListener("onOperDisplayNameChanged", function() {
          c("#rh-chatName, .redhlp_operDisplayName").html(a.operDisplayName)
        }), c("#rh-badge").addClass("rh-" + a.badgePosition), g.addClass("rh-" + a.badgePosition);
        var h = a.badgePosition;
        a.dispatcher.addEventListener("onBadgePositionChanged", function() {
          c("#rh-badge").removeClass("rh-" + h), c("#rh-badge").addClass("rh-" + a.badgePosition), g.removeClass("rh-" + h), g.addClass("rh-" + a.badgePosition)
        }), a.dispatcher.addEventListener("onActiveSalesShownChanged", function() {
          a.activeSalesShown && clearTimeout(o._activeSalesId)
        }), d.init(), e.init(), g.disableTextSelect(), g.mousedown(function() {}), g.addClass("rh-reset"), b.eachSubelement(g, function(a) {
          a.addClass("rh-reset")
        }), f.fire("viewLoaded")
      },
      init: function() {
        i.addPoint("viewInitStart"), "Explorer" === n.browser && parseInt(n.version, 10) < 9 && c("head").append("<link rel='stylesheet' href='" + b.APP_URL + "container/css/ie8.css'/>");
        try {
          c("embed").each(function() {
            var a = this;
            setTimeout(function() {
              void 0 === c(a).attr("wmode") && void 0 === c(a).attr("WMODE") && c(a).attr("wmode", "opaque")
            }, 2e3)
          }), c("object").each(function(a, b) {
            var d = this;
            setTimeout(function() {
              0 === c("param[name='wmode']", d).length && 0 === c("param[name='WMODE']", d).length && c(d).html('<param name="wmode" value="opaque">' + c(d).html())
            }, 2e3)
          })
        } catch (g) {}
        var j = c("body"),
          k = c('<div id="rh-snippet" style="display: none;"><div id="rh-settings" style="display: none;"></div></div>');
        k.css("position", "static"), j.prepend(k), c('<div id="rh-snippet-end" style="display: none !important;"></div>').insertAfter(k), f.fire("snippetAppended"), a.free && k.addClass("rh-free"), a.chatState !== h.MINIMIZED && (b.IS_PHONE || window.redhlpSettings && window.redhlpSettings.showInSeparateWindow) && (a.chatState = h.MINIMIZED), a.dispatcher.addEventListener("onIsOnlineChanged", function() {
          j.removeClass(a.isOnline ? "redhlp_offline" : "redhlp_online"), j.addClass(a.isOnline ? "redhlp_online" : "redhlp_offline")
        }), j.removeClass(a.isOnline ? "redhlp_offline" : "redhlp_online"), j.addClass(a.isOnline ? "redhlp_online" : "redhlp_offline"), f.addEventListener("start", function() {
          o.show()
        }), f.addEventListener("openChat", function() {
          a.chatState = h.WINDOW
        }), f.addEventListener("openChat", function() {
          j.removeClass("redhlp_closeChat").addClass("redhlp_openChat")
        }), f.addEventListener("closeChat", function() {
          a.chatState = h.MINIMIZED
        }), f.addEventListener("closeChat", function() {
          j.removeClass("redhlp_openChat").addClass("redhlp_closeChat")
        }), f.addEventListener("attachedBottom", function() {
          k.addClass("redhlp_attachedBottom")
        }), f.addEventListener("unattachedBottom", function() {
          k.removeClass("redhlp_attachedBottom")
        }), f.addEventListener("message.displayed", function() {
          a.chatState !== h.WINDOW && f.fire("openChat")
        }), d.append(k), e.append(k);
        if (a.skin ? k.show() : f.addEventListener("cssLoaded", function() {
            k.show()
          }), a.chatState === h.MINIMIZED && a.skin) try {
          o._showVisualContent(k)
        } catch (l) {} else f.addEventListener("cssLoaded", function() {
          o._showVisualContent(k)
        })
      },
      show: function() {
        return a.skin ? (c("#rh-snippet").addClass("redhlp_state" + (a.isOnline ? "Online" : "Offline") + " rh-state" + (a.isOnline ? "Online" : "Offline")), k.outerCSS ? g.loadCss(k.outerCSS) : g.loadCss(b.APP_URL + "container/css/skins/" + a.skin + ".css?version=3.1.570.1459872528712"), void i.addPoint("viewShow")) : void a.dispatcher.addEventListener("onSkinChanged", function() {
          o.show()
        })
      },
      hide: function() {},
      hideSound: function() {
        c("#rh-sound").hide()
      },
      setIframeUrl: function(a, b) {
        c("#redhlp_chatFrame, #rh-chatFrame").attr("src", a).load(function() {
          b()
        })
      },
      showChat: function() {
        e.open()
      },
      closeChat: function() {
        e.close()
      }
    };
    return o
  }), define("common/application/basicActivity", ["application/dispatcher"], function(a) {
    function b(a, b) {
      this._prefix = b || "", this._dispatcher = null, this._CHECK_INTERVAL = a, this._intervalId = null, this._isUserAway = !1, this._flag = !1, this._children = []
    }
    b.prototype = {
      check: function() {
        return this._flag || this._isUserAway ? void(this._flag = !1) : (this._dispatcher.fire(this._prefix + "userAway"), void(this._isUserAway = !0))
      },
      isActive: function() {
        return !this._isUserAway
      },
      update: function() {
        var a;
        for (this._flag = !0, this._isUserAway && (this._dispatcher.fire(this._prefix + "userBack"), this._isUserAway = !1), a = 0; a < this._children.length; a++) this._children[a].update()
      },
      start: function() {
        if (!this._intervalId) {
          var a = this;
          this._intervalId = setInterval(function() {
            a.check()
          }, this._CHECK_INTERVAL)
        }
      },
      stop: function() {
        this._intervalId && (clearInterval(this._intervalId), this._intervalId = null)
      },
      init: function(a, b) {
        b && (this._CHECK_INTERVAL = b), this._dispatcher = a
      },
      changeInterval: function(a) {
        this._CHECK_INTERVAL !== a && (this._CHECK_INTERVAL = a, this._intervalId && (this.stop(), this.start()))
      },
      getChild: function(a, c) {
        var d = new b(a, c);
        return d.init(this._dispatcher), this._children.push(d), d
      }
    };
    var c = window.redhlpSettings ? window.redhlpSettings.activityInterval || 3e5 : 3e5,
      d = new b(c);
    return d.init(a), d
  }), define("view/commonEvents", ["common/application/basicActivity", "application/session.objects"], function(a, b) {
    return {
      bind: function(c) {
        var d = function() {
          return a.update(), b.lastActivity = (new Date).getTime(), !0
        };
        window.addEventListener ? (window.addEventListener("click", d, !1), window.addEventListener("mousemove", d, !1), window.addEventListener("keydown", d, !1)) : window.attachEvent && (window.attachEvent("onclick", d), window.attachEvent("onmousemove", d), window.attachEvent("onkeydown", d));
        var e = this;
        c.addHandler("inactive", function() {
          e._userIsActive = !1
        }), c.addHandler("active", function() {
          e._userIsActive = !0
        })
      }
    }
  }), define("common/extensions/mouse", ["common/extensions/jquery.plugins"], function(a) {
    function b(a) {
      return {
        x: a.x || 0,
        y: a.y || 0,
        width: a.width,
        height: a.height,
        scrollX: a.scrollX,
        scrollY: a.scrollY,
        windowHeight: a.windowHeight,
        windowWidth: a.windowWidth
      }
    }

    function c() {
      if (t) {
        var a = 0;
        for (a = 0; a < k.length; a += 1) k[a].send("getMouse");
        for (a = 0; a < l.length; a += 1) l[a].send("getMouse");
        o()
      }
    }
    var d = "unknown",
      e = 50,
      f = {},
      g = {},
      h = !1,
      i = !1,
      j = 0,
      k = [],
      l = [],
      m = {},
      n = {},
      o = function() {},
      p = function(a) {},
      q = !1,
      r = !1,
      s = !1,
      t = !1,
      u = function() {
        return "innerHeight" in window ? window.innerHeight : a(window).height()
      };
    return {
      init: function() {
        return a("body").hover(function() {
          h = !0
        }, function() {
          h = !1
        }).mouseleave(function() {
          h = !1, i = !1, j = 0
        }).mouseenter(function() {
          h = !0, i = !0
        }), f.width = Math.max(a("html").width(), a(window).width()), f.height = Math.max(a("html").height(), a(window).height()), f.windowHeight = u(), f.windowWidth = a(window).width(), f.scrollX = a("body").scrollLeft(), f.scrollY = a("body").scrollTop(), f.x = 0, f.y = 0, a("body").bind("scroll", function() {
          f.scrollX = a("body").scrollLeft(), f.scrollY = a("body").scrollTop()
        }), a(window).mousemove(function(b) {
          j += 1, !i && 1 >= j || (h = !0, f = {
            x: b.pageX - a("body").scrollLeft(),
            y: b.pageY - a("body").scrollTop(),
            width: Math.max(a(document).width(), a(window).width()),
            height: Math.max(a(document).height(), a(window).height()),
            windowHeight: u(),
            windowWidth: a(window).width(),
            scrollX: a("body").scrollLeft(),
            scrollY: a("body").scrollTop()
          })
        }), a(window).bind("scroll", function() {
          f.scrollX = a("body").scrollLeft(), f.scrollY = a("body").scrollTop(), h = !0
        }), a("html").bind("click", function(b) {
          q = !0, r = !1, s = !1, h = !0, f = {
            x: b.pageX - a("body").scrollLeft(),
            y: b.pageY - a("body").scrollTop(),
            width: Math.max(a(document).width(), a(window).width()),
            height: Math.max(a(document).height(), a(window).height()),
            windowHeight: u(),
            windowWidth: a(window).width(),
            scrollX: a("body").scrollLeft(),
            scrollY: a("body").scrollTop()
          }
        }), a("html").bind("mouseup", function(b) {
          s = !0, r = !1, f = {
            x: b.pageX - a("body").scrollLeft(),
            y: b.pageY - a("body").scrollTop(),
            width: Math.max(a("html").width(), a(window).width()),
            height: Math.max(a(document).height(), a(window).height()),
            windowHeight: u(),
            windowWidth: a(window).width(),
            scrollX: a("body").scrollLeft(),
            scrollY: a("body").scrollTop()
          }
        }), a("html").bind("mousedown", function(b) {
          r = !0, s = !1, f = {
            x: b.pageX - a("body").scrollLeft(),
            y: b.pageY - a("body").scrollTop(),
            width: Math.max(a("html").width(), a(window).width()),
            height: Math.max(a(document).height(), a(document).height()),
            windowHeight: u(),
            windowWidth: a(window).width(),
            scrollX: a("body").scrollLeft(),
            scrollY: a("body").scrollTop()
          }
        }), this
      },
      enable: function() {
        t = !0
      },
      disable: function() {
        t = !1
      },
      setAsSlave: function(c) {
        d = "slave", c.addHandler("getMouse", function() {
          var a = b(f);
          a.isInside = h, a.clicked = q, a.mouseDown = r, a.mouseUp = s, q = !1, r = !1, s = !1, "function" == typeof p && p(a), c.send("mouseData", a)
        });
        var e = function() {
          c.send("forceLeave"), a("html").unbind("mousemove", e), setTimeout(function() {
            a("html").mousemove(e)
          }, 1500)
        };
        return a("html").mousemove(e), this
      },
      setAsMaster: function() {
        return d = "master", setInterval(c, e), this
      },
      addParentSlave: function(a) {
        return "function" == typeof a.send && (k.push(a), a.addHandler("mouseData", function(a) {
          m = a
        }), a.addHandler("forceLeave", function() {
          h = !1
        })), this
      },
      addChildSlave: function(a) {
        return "function" == typeof a.send && (l.push(a), a.addHandler("mouseData", function(a) {
          a.isInside && (n = a)
        })), this
      },
      setHandler: function(a) {
        return o = a, this
      },
      force: function() {
        return o(), this
      },
      setOffsetFunction: function(a) {
        return p = a, this
      },
      getMouseData: function() {
        var a = b(f);
        return a.isInside = h, a.clicked = q, a.mouseDown = r, a.mouseUp = s, q = !1, r = !1, s = !1, "function" == typeof p && p(a), n.isInside ? (n.mouseUp |= a.mouseUp, g = b(n), n) : (m.windowHeight && (a.scrollX = m.scrollX, a.scrollY = m.scrollY, a.width = m.width, a.height = m.height, a.windowHeight = m.windowHeight, a.windowWidth = m.windowWidth), !a.isInside && m.isInside ? (m.mouseUp |= a.mouseUp, g = b(m), m) : (m.x = a.x, m.y = a.y, g = b(a), a))
      },
      getParentMouseData: function() {
        return m
      },
      getChildMouseData: function() {
        return n
      }
    }
  }), define("application/redhelper", ["application/dispatcher", "application/chatWindow", "application/session.objects", "view/viewManager"], function(a, b, c, d) {
    var e, f, g = function(a) {
      window.RedHelper.session[a] = c[a], c.dispatcher.addEventListener("on" + a.charAt(0).toUpperCase() + a.substr(1) + "Changed", function() {
        window.RedHelper.session[a] = c[a]
      })
    };
    if (c.free && !c.openApi) return void(window.RedHelper = {
      started: !1
    });
    for (window.RedHelper = {
        onChanged: function(a, b) {
          c.dispatcher.addEventListener("on" + a.charAt(0).toUpperCase() + a.substr(1) + "Changed", function() {
            b()
          })
        },
        addEventListener: function(b, c) {
          a.addEventListener(b, c)
        },
        removeEventListener: function(b, c) {
          a.removeEventListener(b, c)
        },
        fireEvent: function(b, c) {
          a.fire(b, c)
        },
        sendEvent: function(a, c) {
          b.send(a, c)
        },
        openChat: function() {
          a.fire("openChat")
        },
        closeChat: function() {
          d.closeChat()
        },
        sendMessage: function(b, c) {
          a.fire("sendMessage", {
            text: b,
            show: !!c
          })
        },
        started: !1,
        execFunction: function(b, d) {
          (!c.free || c.openApi) && a.fire("sendExecFunction", {
            name: b,
            args: d
          })
        },
        clearUser: function() {
          b.send("clearUser", function() {
            c.clear(!0), location.reload()
          })
        },
        invite: function(b, c) {
          a.fire("invite", {
            msg: b,
            avatar: c
          })
        },
        disableInvitations: function(b) {
          a.fire("invitation:disable", {
            manualAlso: b
          })
        },
        refreshOperator: function() {
          c.currentOperator = "", b.send("refreshOperator")
        },
        clearOperator: function() {
          c.chatStarted = "", c.currentOperator = "", b.send("refreshOperator")
        },
        clearOperatorAndDepartment: function() {
          c.chatStarted = "", c.currentDepartment = "", c.realDepartment = "", c.currentOperator = "", b.send("refreshOperator")
        },
        hideOldMessages: function() {
          b.send("hideOldMessages")
        },
        setOperator: function(a, d) {
          d || (c.onlineOperators.forEach(function(b) {
            b.name === a && (d = b.departments[0])
          }), d || (d = 0)), c.lastChat = Date.now(), c.chatStarted = "", c.currentDepartment = d, c.realDepartment = d, c.currentOperator = a, b.send("refreshOperator")
        },
        setDepartment: function(a) {
          c.currentDepartment !== a && (c.lastChat = Date.now(), c.chatStarted = "", c.currentDepartment = a, c.realDepartment = a, c.currentOperator = "", b.send("refreshOperator"))
        }
      }, window.RedHelper.session = {}, e = 0, f = c.fields.length; f > e; e++) g(c.fields[e])
  }), define("common/extensions/balloon", ["common/extensions/jquery.plugins", "common/application/viewUtils", "common/extensions/boxUtils", "common/extensions/color"], function(a, b, c, d) {
    return function(e) {
      function f() {
        var d = b.getBoundingBox(a(e)),
          f = b.getIndents(q),
          g = 50,
          h = {
            height: q.height() + f.padding.top + f.padding.bottom + f.border.top + f.border.bottom,
            width: q.width() + f.padding.left + f.padding.right + f.border.left + f.border.right,
            bottom: "auto",
            right: "auto"
          },
          i = {
            left: a(window).scrollLeft(),
            top: a(window).scrollTop(),
            width: a(window).width(),
            height: a(window).height()
          },
          j = ({
            first: d.left - i.left,
            second: d.left - i.left + d.width
          }, {
            first: d.top - i.top,
            second: d.top - i.top + d.height
          }, c.xIntersectionLength(d, i) >= Math.min(d.width, g)),
          k = c.yIntersectionLength(d, i) >= Math.min(d.height, g);
        o.left = !1, o.right = !1, o.above = !1, o.below = !1;
        var l;
        return c.hasIntersection(d, i) ? c.placeableAbove(h, i, d.top - 10) && j ? l = "above" : c.placeableBelow(h, i, d.top + d.height + 10) && j ? l = "below" : c.placeableLeft(h, i, d.left - 10) && k ? l = "left" : c.placeableRight(h, i, d.left + d.width + 10) && k ? l = "right" : c.placeableAbove(h, i, d.top) ? l = "above" : c.placeableBelow(h, i, d.top + d.height) ? l = "below" : c.placeableLeft(h, i, d.left) ? l = "left" : c.placeableRight(h, i, d.left) && (l = "right") : (q.addClass("rh-outside"), h.width += 90, c.isBelow(d, i) && (l = "above"), c.isAbove(d, i) && (l = "below"), c.isRight(d, i) && (l = "left"), c.isLeft(d, i) && (l = "right")), l
      }

      function g(d) {
        try {
          k = 0;
          var f = b.getBoundingBox(a(e));
          if (!(f.top || f.left || f.width || f.height)) return k++, void(l > k ? setTimeout(function() {
            g(d)
          }, m) : k = 0);
          k = 0, d ? (q.is(":visible") || s(), q.fadeIn()) : q.show();
          var h = b.getIndents(q),
            i = 50,
            j = {
              height: q.height() + h.padding.top + h.padding.bottom + h.border.top + h.border.bottom,
              width: q.width() + h.padding.left + h.padding.right + h.border.left + h.border.right,
              bottom: "auto",
              right: "auto"
            },
            n = {
              left: a(window).scrollLeft(),
              top: a(window).scrollTop(),
              width: a(window).width(),
              height: a(window).height()
            },
            p = {
              first: f.left - n.left,
              second: f.left - n.left + f.width
            },
            r = {
              first: f.top - n.top,
              second: f.top - n.top + f.height
            },
            t = c.xIntersectionLength(f, n) >= Math.min(f.width, i),
            u = c.yIntersectionLength(f, n) >= Math.min(f.height, i);
          if (q.removeClass("rh-below rh-above rh-left rh-right"), o.left = !1, o.right = !1, o.above = !1, o.below = !1, q.find(".rh-arrow_itself").css({
              top: "",
              left: ""
            }), c.hasIntersection(f, n)) {
            if (q.removeClass("rh-outside"), c.placeableAbove(j, n, f.top - 10) && t ? (j.bottom = n.height - (f.top - n.top), j.top = "auto", j.left = c.placeInRange(j.width, n.width, p, 20), q.addClass("rh-above"), o.above = !0) : c.placeableBelow(j, n, f.top + f.height + 10) && t ? (j.bottom = "auto", j.top = f.top + f.height - n.top, j.left = c.placeInRange(j.width, n.width, p, 20), q.addClass("rh-below"), o.below = !0) : c.placeableLeft(j, n, f.left - 10) && u ? (j.right = n.width - (f.left - n.left), j.left = "auto", j.top = c.placeInRange(j.height, n.height, r, 20), q.addClass("rh-left"), o.left = !0) : c.placeableRight(j, n, f.left + f.width + 10) && u ? (j.left = f.left + f.width - n.left, j.right = "auto", j.top = c.placeInRange(j.height, n.height, r, 20), q.addClass("rh-right"), o.right = !0) : c.placeableAbove(j, n, f.top) ? (j.bottom = n.height - (f.top - n.top), j.top = "auto", j.left = c.placeInRange(j.width, n.width, p, 20), q.addClass("rh-above"), o.above = !0) : c.placeableBelow(j, n, f.top + f.height) ? (j.bottom = "auto", j.top = f.top + f.height - n.top, j.left = c.placeInRange(j.width, n.width, p, 20), q.addClass("rh-below"), o.below = !0) : c.placeableLeft(j, n, f.left) ? (j.right = n.width - (f.left - n.left), j.left = "auto", j.top = c.placeInRange(j.height, n.height, r, 20), q.addClass("rh-left"), o.left = !0) : c.placeableRight(j, n, f.left) && (j.left = f.left + f.width - n.left, j.right = "auto", j.top = c.placeInRange(j.height, n.height, r, 20), q.addClass("rh-right"), o.right = !0), !o.left && !o.right) {
              var v = {
                first: Math.max(n.left + j.left, f.left) - n.left - j.left,
                second: Math.min(n.left + j.left + j.width, f.left + f.width) - n.left - j.left
              };
              q.find(".rh-arrow_itself").css({
                left: Math.max(5, Math.min(c.placeInRange(20, j.width, v, 10), j.width - 35))
              })
            }
            if (!o.below && !o.above) {
              var w = {
                first: Math.max(n.top + j.top, f.top) - n.top - j.top,
                second: Math.min(n.top + j.top + j.height, f.top + f.height) - n.left - j.height
              };
              q.find(".rh-arrow_itself").css({
                top: Math.max(5, Math.min(c.placeInRange(20, j.height, w, 10), j.height - 35))
              })
            }
          } else q.addClass("rh-outside"), j.width += 90, c.isBelow(f, n) && (j.bottom = 0, j.top = "auto", j.left = c.placeInRange(j.width, n.width, p, 20), q.addClass("rh-above"), o.above = !0), c.isAbove(f, n) && (j.bottom = "auto", j.top = 0, j.left = c.placeInRange(j.width, n.width, p, 20), q.addClass("rh-below"), o.below = !0), c.isRight(f, n) && (j.right = 0, j.left = "auto", o.above || o.below || (j.top = c.placeInRange(j.height, n.height, r, 20)), q.addClass("rh-left"), o.left = !0), c.isLeft(f, n) && (j.left = 0, j.right = "auto", o.above || o.below || (j.top = c.placeInRange(j.height, n.height, r, 20)), q.addClass("rh-right"), o.right = !0);
          delete j.height, delete j.width, q.css(j), q.show()
        } catch (x) {
          setTimeout(function() {
            g(d)
          }, 200)
        }
      }
      var h = "",
        i = function() {},
        j = !1,
        k = 0,
        l = 5,
        m = 500,
        n = this,
        o = {
          left: !1,
          right: !1,
          below: !1,
          above: !1
        },
        p = a("<style type='text/css'></style>");
      p.appendTo("head");
      var q;
      q = a('<div id="rh-arrow" style="padding: 0;" class="rh-reset"><div class="placeholder rh-reset"></div><a class="rh-close rh-reset"></a><div class="rh-reset rh-arrow_itself"></div></div>');
      var r = q.find(".placeholder > *");
      q.appendTo("#rh-snippet"), q.children("a.rh-close").click(function(a) {
        return a.stopPropagation(), n.hide(), i(), !1
      });
      var s = function() {
          var b = q.children(),
            c = f(),
            d = a('<div id="rh-arrow" style="display: none; padding: 0;" class="rh-reset rh-' + c + '">');
          d.appendTo("#rh-snippet"), b.appendTo(d), q.remove(), q = d
        },
        t = 0,
        u = !1,
        v = !1,
        w = function() {
          if (!q.hasClass("rh-outside")) return void(u = !1);
          if (j) {
            u || (u = !0, t = 0);
            var a = .5 * Math.abs((t + 20) % 40 - 20),
              b = {
                top: 0,
                left: 0
              };
            o.above && (b.top = a + "px"), o.below && (b.top = -a + "px"), o.left && (b.left = a + "px"), o.right && (b.left = -a + "px"), q.find(".rh-arrow_itself div").css(b), t += 1
          }
        };
      setInterval(w, 20), this.appendTo = function(a) {
        e = a
      }, this.setHTML = function(b) {
        h = b, r = a(h), q.find(".placeholder").html(""), q.find(".placeholder").append(r), "absolute" === r.css("position") && q.css("padding", "0"), v && g()
      }, this.show = function(b) {
        if (b) {
          var c = d.rgb2hsl(d.parseRGB(b));
          c[2] *= 1.1;
          var e = d.hsl2rgb(c);
          try {
            p.html("#rh-arrow .rh-arrow_itself:after, #rh-arrow, #rh-arrow .rh-arrow_itself { border-color: rgba(" + e.join(",") + ", 0.2) !important; }")
          } catch (f) {}
        }
        v = !0, q.children(".rh-shadow").css("display", "block"), u = !1, g(!0), j = !0, a(window).bind("scroll resize", g)
      }, this.hide = function() {
        v = !1, a(window).unbind("scroll resize", g), q.is(":visible") && q.hide(), j = !1
      }, this.getElement = function() {
        return q
      }, this.resetPosition = function() {
        g()
      }, this.close = function(a) {
        i = a
      }
    }
  }), define("view/invitation.html", [], function() {
    return '    <div id="rh-invitation" class="rh-arrowContainer" style="display: none;">     <div class="rh-text">       <img alt="" class="rh-face" src=""/>        <div style="height: 8px;"></div><span id="rh-welcome"></span></div>       <div id="rh-choice">          <a id="rh-choiceYes" class="rh-btn"></a>          <a id="rh-choiceNo" class="rh-btn"></a>       </div>      <div style="clear: both"></div>   </div>  '
  }), define("view/invitation", ["common/extensions/jquery.plugins", "application/session.objects", "application/dispatcher", "view/badge", "common/extensions/balloon", "view/invitation.html", "config/lang", "config/setup"], function(a, b, c, d, e, f, g, h) {
    var i = a("body"),
      j = f,
      k = null,
      l = null,
      m = function(a) {
        return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br>")
      },
      n = [],
      o = {
        fillTexts: function() {
          a("#rh-choiceYes").html(g.YES_LABEL), a("#rh-choiceNo").html(g.NO_LABEL)
        },
        acceptedClicked: function(a) {
          l ? l.click(a) : n.push(a)
        },
        init: function() {
          k || (k = new e(d.getActiveElement())), k.setHTML(j), k.close(function() {
            a("#rh-choiceNo").trigger("click")
          }), l = a("#rh-invitation"), a("#rh-choiceNo").click(function() {
            return i.removeClass("rh-invitation"), k && k.hide(), i.addClass("rh-rejected"), c.fire("closeChat"), c.fire("rejected"), c.fire("invitationButtonNo"), !1
          }), l.click(function() {
            i.removeClass("rh-invitation"), i.addClass("rh-accepted"), c.fire("invitationButtonYes"), k && k.hide(), o.hide(function() {
              c.fire("openChat")
            }), c.fire("accepted")
          }), n.forEach(function(a) {
            l.click(a)
          }), n = [], h.eachSubelement(l, function(a) {
            a.addClass("rh-reset")
          }), o.updateAvatar(b.operAvatar || b.defaultFace), b.dispatcher.addEventListener("onDefaultFaceChanged", function() {
            (b.operAvatar || b.defaultFace) && o.updateAvatar(b.operAvatar || b.defaultFace)
          }), b.dispatcher.addEventListener("onOperAvatarChanged", function() {
            (b.operAvatar || b.defaultFace) && o.updateAvatar(b.operAvatar || b.defaultFace)
          })
        },
        show: function(a, d) {
          i.addClass("rh-invitation"), d && o.updateAvatar(d), a && o.updateText(a), o.fillTexts(), l.show(), k.show(b.badgeColor), k.resetPosition(), c.fire("invitation.shown", {
            text: a
          })
        },
        hide: function(a) {
          k && k.hide(), l.hide(), a && a()
        },
        updateAvatar: function(b) {
          a(".rh-face", k.getElement()).attr("src", h.getImageUrl(b))
        },
        updateText: function(b) {
          b = m(b), a("#rh-welcome").html(b)
        }
      };
    return window.InvitationView = o, o
  }), define("application/appStages", ["application/dispatcher"], function(a) {
    var b = !1,
      c = !1;
    return a.addOneShotEventListener("sessionLoaded", function() {
      b = !0
    }), a.addOneShotEventListener("viewLoaded", function() {
      c = !0
    }), {
      afterSessionLoaded: function(c) {
        b ? c() : a.addOneShotEventListener("sessionLoaded", c)
      },
      afterViewLoaded: function(b) {
        c ? b() : a.addOneShotEventListener("viewLoaded", b)
      }
    }
  }), define("application/tools", [], function() {
    return {
      reduce: function(a, b, c) {
        if (null === a || "undefined" == typeof a) throw new TypeError("Array.prototype.reduce called on null or undefined");
        if ("function" != typeof b) throw new TypeError(b + " is not a function");
        var d, e, f = a.length >>> 0,
          g = !1;
        for (2 < arguments.length && (e = c, g = !0), d = 0; f > d; ++d) a.hasOwnProperty(d) && (g ? e = b(e, a[d], d, a) : (e = a[d], g = !0));
        if (!g) throw new TypeError("Reduce of empty array with no initial value");
        return e
      }
    }
  }), define("model/invitation", ["application/session.objects", "application/appStages", "application/tools"], function(a, b, c) {
    function d(a, b) {
      if ("string" != typeof a) return !1;
      if ("" === b) return !1;
      if (-1 !== b.indexOf(",")) return b.split(",").some(function(b) {
        return d(a, b)
      });
      if (a = a.toLowerCase(), b = b.toLowerCase().trim(), !b) return !1;
      var e = [a].concat(b.split("*")),
        f = c.reduce(e, function(a, b) {
          return -1 == a ? -1 : -1 == a.indexOf(b) ? -1 : a.slice(a.indexOf(b) + b.length)
        });
      return -1 !== f
    }
    var e = !1,
      f = function() {};
    b.afterSessionLoaded(function() {
      (!a.siteVisitLastTime || a.siteVisitLastTime < Date.now() - 108e5) && (a.siteVisitLastTime = Date.now()), f(), e = !0
    });
    var g = {
      condition: function(a, b, c) {
        this.type = a, "undefined" != typeof c ? this.value = b * g.timeUnit[c] : this.value = b
      },
      scenario: function(a, b, c) {
        this.text = a, this.avatar = b, this.online = c, this.conditions = [], this.wasTriggered = !1
      }
    };
    return g.condition.type = {
      SITE_DELAY: "SITE_DELAY",
      FREQUENCY: "FREQUENCY",
      MAX_SHOWS: "MAX_SHOWS",
      OPERATOR_ONLINE: "OPERATOR_ONLINE",
      PAGE_DELAY: "PAGE_DELAY",
      PLACE_CONTAINS: "PLACE_CONTAINS",
      URL_CONTAINS: "URL_CONTAINS"
    }, g.timeUnit = {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400
    }, g.scenario.fromJson = function(a) {
      var b = new g.scenario(a.text, a.avatar, a.online);
      return b.conditions = a.conditions.map(function(a) {
        return new g.condition(a.type, a.value, a.timeUnit)
      }), b
    }, g.scenario.prototype = {
      isFulfilled: function() {
        if (a.lastMessageTime && Date.now() - +a.lastMessageTime < 864e5) return !1;
        var b = {};
        return this.conditions.forEach(function(a) {
          b[a.type] = b[a.type] || a.isFulfilled
        }), this.conditions.every(function(a) {
          return b[a.type]
        })
      },
      getWeight: function() {
        return c.reduce(this.conditions.map(function(a) {
          return a.getWeight()
        }), function(a, b) {
          return a + b
        })
      },
      moreSpecificThan: function(a) {
        return this.goes() ? a.goes() ? this.getWeight() > a.getWeight() : !0 : !1
      },
      goes: function() {
        var b = {};
        return a.isOnline != this.online && -1 != this.online ? !1 : (this.conditions.forEach(function(a) {
          b[a.type] = b[a.type] || g.condition.goes[a.type](a)
        }), this.conditions.every(function(a) {
          return b[a.type]
        }))
      },
      start: function() {
        var a = this.conditions,
          b = this;
        a.forEach(function(a) {
          a.onFulfilled(function() {
            b.isFulfilled() && b.trigger()
          })
        }), a.forEach(function(a) {
          a.start()
        })
      },
      clear: function() {
        this.conditions.forEach(function(a) {
          a.clear()
        }), this.conditions = []
      },
      trigger: function() {
        return this.wasTriggered || a.isOnline != this.online ? void 0 : (this.handler && (this.handler(this), this.wasTriggered = !0, a.invitationsShown = a.invitationsShown + 1, a.lastInvitationTime = Date.now()), this)
      },
      onTriggered: function(a) {
        return this.handler = a, this
      }
    }, g.condition.prototype = {
      start: function() {
        var a = this;
        e ? g.condition.behaviors[a.type](a) : f = function() {
          g.condition.behaviors[a.type](a)
        }
      },
      onFulfilled: function(a) {
        this.handler = a
      },
      clear: function() {
        this.handler = function() {}
      },
      getWeight: function() {
        return g.condition.weight[this.type](this)
      },
      isFulfilled: !1
    }, g.condition.weight = {
      NEW_VISITOR: function() {
        return 1e3
      },
      URL_CONTAINS: function(a) {
        return 1e6 * a.value.length
      },
      PLACE_CONTAINS: function(a) {
        return 1e9 * a.value.length
      },
      REFERRER_CONTAINS: function(a) {
        return 1e12 * a.value.length
      },
      DEPARTMENT_ONLINE: function() {
        return 1e15
      },
      OPERATOR_ONLINE: function() {
        return 1e18
      },
      FREQUENCY: function() {
        return 0
      },
      MAX_SHOWS: function() {
        return 0
      },
      SITE_DELAY: function(a) {
        return 100 - a.value
      },
      PAGE_DELAY: function(a) {
        return 100 - a.value
      }
    }, g.condition.goes = {
      NEW_VISITOR: function(b) {
        return a.visits > 1 ? !b.value : b.value
      },
      URL_CONTAINS: function(a) {
        return d(location.href, a.value)
      },
      FREQUENCY: function(b) {
        return !a.lastInvitationTime || a.lastInvitationTime + 1e3 * b.value <= Date.now()
      },
      MAX_SHOWS: function(b) {
        return a.invitationsShown <= b.value
      },
      OPERATOR_ONLINE: function(b) {
        return a.onlineOperators.some(function(a) {
          return a.name === b.value && a.status && "online" === a.status
        })
      },
      DEPARTMENT_ONLINE: function(b) {
        return a.onlineOperators.some(function(a) {
          return a.status && "online" === a.status && a.departments && -1 !== a.departments.indexOf(+b.value)
        })
      },
      PLACE_CONTAINS: function(b) {
        return a.city.toLowerCase().indexOf(b.value.toLowerCase()) > -1 || a.country.toLowerCase().indexOf(b.value.toLowerCase()) > -1 || a.city_ru.toLowerCase().indexOf(b.value.toLowerCase()) > -1 || a.country_ru.toLowerCase().indexOf(b.value.toLowerCase()) > -1
      },
      REFERRER_CONTAINS: function(b) {
        return d(a.referrer, b.value)
      },
      SITE_DELAY: function() {
        return !0
      },
      PAGE_DELAY: function() {
        return !0
      }
    }, g.condition.behaviors = {
      URL_CONTAINS: function(a) {
        d(location.href, a.value) && (a.isFulfilled = !0, a.handler())
      },
      NEW_VISITOR: function(b) {
        (a.visits > 1 ? !b.value : b.value) && (b.isFulfilled = !0, b.handler())
      },
      FREQUENCY: function(b) {
        function c() {
          e = 0, b.isFulfilled = !0, f || (b.handler(), f = !0)
        }

        function d() {
          e && clearTimeout(e), b.isFulfilled = !1, e = 0, !a.lastInvitationTime || a.lastInvitationTime + 1e3 * b.value <= Date.now() ? c() : e = setTimeout(function() {
            c()
          }, a.lastInvitationTime + 1e3 * b.value - Date.now())
        }
        var e = 0,
          f = !1;
        d(), a.dispatcher.addEventListener("onLastInvitationTimeChanged", function() {
          d()
        })
      },
      MAX_SHOWS: function(b) {
        a.invitationsShown <= b.value && (b.isFulfilled = !0, b.handler()), a.dispatcher.addEventListener("onInvitationsShownChanged", function() {
          b.isFulfilled = a.invitationsShown <= b.value
        })
      },
      OPERATOR_ONLINE: function(b) {
        function c() {
          return a.onlineOperators.some(function(a) {
            return a.name === b.value && a.status && "online" === a.status
          })
        }
        var d = c();
        d && (b.isFulfilled = !0, b.handler()), a.dispatcher.addEventListener("onOnlineOperatorsChanged", function() {
          var a = b.isFulfilled,
            d = c();
          b.isFulfilled = d, d && !a && b.handler()
        })
      },
      DEPARTMENT_ONLINE: function(a) {
        g.condition.goes.DEPARTMENT_ONLINE(a) && (a.isFulfilled = !0, a.handler())
      },
      REFERRER_CONTAINS: function(a) {
        g.condition.goes.REFERRER_CONTAINS(a) && (a.isFulfilled = !0, a.handler())
      },
      PAGE_DELAY: function(a) {
        setTimeout(function() {
          a.isFulfilled = !0, a.handler()
        }, 1e3 * a.value)
      },
      PLACE_CONTAINS: function(b) {
        (d(a.city, b.value) || d(a.country, b.value) || d(a.city_ru, b.value) || d(a.country_ru, b.value)) && (b.isFulfilled = !0, b.handler())
      },
      SITE_DELAY: function(b) {
        var c = Date.now() - a.siteVisitLastTime - 1e3 * b.value;
        c > 0 ? (b.isFulfilled = !0, b.handler()) : setTimeout(function() {
          b.isFulfilled = !0, b.handler()
        }, -c)
      }
    }, g
  }), define("common/constants/sender", {
    VISITOR: 0,
    OPERATOR: 1
  }), define("common/extensions/guid", [], function() {
    return {
      generate: function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
          var b = 16 * Math.random() | 0,
            c = "x" == a ? b : 3 & b | 8;
          return c.toString(16)
        })
      }
    }
  }), define("application/invitationController", ["application/session.objects", "application/dispatcher", "view/invitation", "view/chat", "model/invitation", "config/nxSettings", "config/settings", "config/setup", "common/constants/sender", "application/chatWindow", "common/constants/chatState", "application/appStages", "common/extensions/guid", "application/tools"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    var o, p = [],
      q = !1,
      r = !1,
      s = 0,
      t = {
        setupScenarios: function(b) {
          if ("undefined" != typeof a.currentInviteTime && +a.currentInviteTime > -1) p.push(e.scenario.fromJson({
            conditions: [{
              type: "MAX_SHOWS",
              value: 0
            }, {
              type: "SITE_DELAY",
              value: +a.currentInviteTime
            }],
            text: a.currentWelcome || a.defaultWelcome,
            avatar: a.defaultFace,
            online: !0
          }));
          else if (b.inviteScenarios) {
            b.inviteScenarios.forEach(function(a) {
              var b = e.scenario.fromJson(a);
              b.id = a.scenarioId, p.push(b)
            });
            var c = n.reduce(p, function(a, b) {
              return a.moreSpecificThan(b) ? a : b
            });
            p = [c], s = a.currentInvitation = c.id
          } else {
            var d = a.currentWelcome || a.defaultWelcome,
              f = a.defaultFace,
              g = a.inviteTime;
            if (!d || !f || !g) return;
            var h = new e.scenario(d, f, a.isOnline);
            h.conditions.push(new e.condition(e.condition.type.SITE_DELAY, g)), h.conditions.push(new e.condition(e.condition.type.MAX_SHOWS, 0)), p.push(h)
          }
        },
        triggerHandler: function(b) {
          q || a.chatState !== k.WINDOW && a.chatState !== k.INVITATION && (c.show(b.text, b.avatar), j.send("invitationSniff", {
            trigger: "time",
            msg: b.text
          }), j.send("state", {
            chatState: "browse",
            inviteState: "received",
            trigger: "time"
          }), o || (o = m.generate()), j.send("invitation-history.shown", {
            id: o,
            text: b.text,
            kind: "scenario",
            time: +new Date
          }), (!a.hideBadge || g.button || g.buttonBadge) && (a.chatState = k.INVITATION, a.lastShownInvitation = s))
        },
        eventListeners: {
          accepted: function() {
            o && (j.send("invitation-history.accepted", {
              id: o
            }), o = "")
          },
          rejected: function() {
            o && j.send("invitation-history.declined", {
              id: o
            })
          },
          invite: function(b) {
            if (!r) {
              var d = b.msg || a.currentWelcome || a.defaultWelcome,
                e = b.avatar || a.operAvatar || a.defaultFace;
              "manual" === b.trigger && o != b.id && (o = b.id, j.send("invitation-history.shown", {
                id: o,
                text: d,
                kind: "personal",
                time: +new Date
              })), a.chatState === k.WINDOW ? j.send("message.invitation", {
                type: "message",
                sender: i.OPERATOR,
                text: d,
                displayName: a.operDisplayName
              }) : (c.show(d, e), j.send("invitationSniff", {
                trigger: b.trigger,
                msg: b.msg
              }), b.trigger || j.send("state", {
                chatState: "browse",
                inviteState: "received",
                trigger: "time"
              }))
            }
          },
          closeChat: function() {
            c.hide()
          },
          openChat: function() {
            c.hide()
          },
          "invitation:disable": function(a) {
            q = !0, a.manualAlso && (r = !0)
          }
        },
        listenToEvents: function() {
          for (var a in t.eventListeners) t.eventListeners.hasOwnProperty(a) && b.addEventListener(a, t.eventListeners[a]);
          j.addHandler("invitation", function(a) {
            b.fire("invite", {
              msg: a.message,
              id: a.id,
              trigger: "manual"
            })
          })
        },
        clear: function() {
          p.forEach(function(a) {
            a.clear()
          }), p = []
        },
        init: function(b) {
          a.chatState === k.INVITATION && (a.chatState = k.MINIMIZED), ("undefined" == typeof b.enableActiveInvitations || b.enableActiveInvitations) && t.setupScenarios(b), t.listenToEvents(), p.forEach(function(a) {
            a.onTriggered(t.triggerHandler), a.start()
          })
        },
        start: function() {
          a.free || h.IS_PHONE || (window.redhlpSettings && window.redhlpSettings.showInSeparateWindow && c.acceptedClicked(function() {
            d.runChatInSeparateWindow(window.redhlpSettings.windowWidth || 350, window.redhlpSettings.windowHeight || 450)
          }), l.afterSessionLoaded(function() {
            c.init(), t.init(f), t.listenToEvents()
          }))
        }
      };
    return t
  }), define("config/customFields", ["application/dispatcher", "application/session.objects", "common/communication/encoder"], function(a, b, c) {
    window.redhlpSettings || (window.redhlpSettings = {}), window.redhlpSettings.keys || (window.redhlpSettings.keys = []), "[object Array]" !== Object.prototype.toString.call(window.redhlpSettings.keys) && (window.redhlpSettings.keys = [window.redhlpSettings.keys]), b.customFields = c.serialize(window.redhlpSettings.keys || {}), rhlpSetInterval(function() {
      if (b.customFields !== c.serialize(window.redhlpSettings.keys || {})) {
        var a = (c.parse(b.customFields), window.redhlpSettings.keys || {});
        b.customFields = c.serialize(a)
      }
    }, 5e3)
  }), define("application/eventTracking", ["application/dispatcher", "jquery", "application/session.objects"], function(a, b, c) {
    function d(a, b) {
      try {
        "object" == typeof _gaq && _gaq.push && _gaq.push(["_trackEvent", "RedHelper", a, a, b, !0]), "function" == typeof ga && ga("send", {
          hitType: "event",
          eventCategory: "RedHelper",
          eventAction: a,
          eventLabel: a,
          eventValue: b,
          nonInteraction: !0
        }), window.dataLayer && window.dataLayer.push && window.dataLayer.push({
          event: a
        }), "object" == typeof e && e.reachGoal("RedHelper." + a.replace(" ", "_")), window.redhlpSettings && "function" == typeof window.redhlpSettings.onEvent && window.redhlpSettings.onEvent(a)
      } catch (c) {}
    }
    if ("undefined" == typeof window.redhlpSettings || "undefined" == typeof window.redhlpSettings.tracking || window.redhlpSettings.tracking !== !1) {
      var e;
      for (var f in window) 0 == f.indexOf("yaCounter") && (e = window[f]);
      var g = {
        invitation: function() {
          d("Invitation shown", 1)
        },
        invitationAccepted: function() {
          d("Invitation accepted", 1)
        },
        invitationRejected: function() {
          d("Invitation rejected", 1)
        },
        chatOpen: function() {
          d("Chat opened", 1)
        },
        chatClose: function() {
          d("Chat closed", 1)
        },
        chatStarted: function() {
          d("Chat started", 1), c.dispatcher.removeEventListener("onChatStartedChanged", g.chatStarted)
        },
        badgeInit: function() {
          d("Badge shown", 1), a.removeEventListener("badgeInit", g.badgeInit)
        },
        highlight: function() {
          d("Highlight", 1)
        },
        messageSent: function() {
          d("Message sent", 1)
        },
        messageReceived: function() {
          d("Message received", 1)
        },
        like: function() {
          d("Like", 1)
        },
        dislike: function() {
          d("Dislike", 1)
        }
      };
      a.addEventListener("invitation.shown", g.invitation), a.addEventListener("invitationButtonYes", g.invitationAccepted), a.addEventListener("invitationButtonNo", g.invitationRejected), a.addEventListener("openChatButtonClicked", g.chatOpen), a.addEventListener("minifyChat", g.chatClose), a.addEventListener("highlight", g.highlight), a.addEventListener("chat.message.send", g.messageSent), a.addEventListener("chat.message.received", g.messageReceived), a.addEventListener("chat.rateOperator.like", g.like), a.addEventListener("chat.rateOperator.dislike", g.dislike), c.dispatcher.addEventListener("onChatStartedChanged", g.chatStarted), a.addEventListener("badgeInit", g.badgeInit)
    }
  }), define("common/extensions/historyAPI", ["application/dispatcher", "config/setup", "application/session.objects"], function(a, b, c) {
    if (history.pushState && "function" == typeof history.pushState) {
      var d = location.href;
      setInterval(function() {
        d !== location.href && (d = location.href, b.CURRENT_URL = d, b.CURRENT_TITLE = document.title, c.viewedPages += 1, a.fire("urlChanged"))
      }, 1e3)
    }
  }), define("application/cloneSession", ["application/chatWindow", "application/session.objects", "application/dispatcher"], function(a, b, c) {
    a.addHandler("stopSessionView", function(a) {
      var c = b.sessionViewers || []; - 1 !== c.indexOf(a.from) && c.splice(c.indexOf(a.from), 1), b.sessionViewers = c, b.isCloneSessionActive = !!c.length
    }), a.addHandler("startSessionView", function(a) {
      var d = b.sessionViewers || []; - 1 === d.indexOf(a.from) && d.push(a.from), b.sessionViewers = d, b.isCloneSessionActive = !0, c.fire("cloneSession")
    });
    var d = function() {
      var b, c, d = {
        localStorage: {},
        sessionStorage: {},
        cookie: {},
        currentUrl: ""
      };
      for (c = 0; c < window.localStorage.length; c++) b = window.localStorage.key(c), d.localStorage[b] = window.localStorage.getItem(b);
      for (c = 0; c < window.sessionStorage.length; c++) b = window.sessionStorage.key(c), d.sessionStorage[b] = window.sessionStorage.getItem(b);
      var e, f = document.cookie.split(";");
      for (b in f) f.hasOwnProperty(b) && (e = f[b].split("="), d.cookie[e[0]] = e[1]);
      d.currentUrl = location.href, a.send("sendSession", {
        data: d
      })
    };
    a.addHandler("cloneSession", d), c.addEventListener("cloneSession", d)
  }), require(["application/session.objects", "common/extensions/jquery.plugins", "application/DOMObserver", "application/dispatcher"], function(a, b, c, d) {
    a.currentHeader = "", a.currentTopText = "", a.currentWelcome = "", a.preferredOperator = "", a.requiredOperator = "", a.preferredOperatorError = "", a.currentOperAvatar = "", a.animateBadge = !0, a.disableDOMObserver = !1, a.cloneSession = !1, a.disableCobrowse = !1, a.disableForms = !1, a.currentInviteTime = -1, b(function() {
      try {
        d.addEventListener("onlineOperatorsReceived", function() {
          window.redhlpSettings.chooseOperator && "function" == typeof window.redhlpSettings.chooseOperator && (a.requiredOperator = (window.redhlpSettings.chooseOperator(a.operators) + "").toLowerCase() || "-", "-" === a.requiredOperator && (a.isOnline = !1), -1 === a.requiredOperator.indexOf(",") && (a.currentOperator = a.requiredOperator))
        }), window.redhlpSettings && (void 0 !== window.redhlpSettings.chatX && ((window.redhlpSettings.chatX + "").indexOf("%") > -1 && (window.redhlpSettings.chatX = parseFloat(window.redhlpSettings.chatX + "") * b(window).width() / 100), a.chatX = window.redhlpSettings.chatX, a.currentChatX = window.redhlpSettings.chatX), void 0 !== window.redhlpSettings.chatY && ((window.redhlpSettings.chatY + "").indexOf("%") > -1 && (window.redhlpSettings.chatY = parseFloat(window.redhlpSettings.chatY + "") * b(window).height() / 100), a.chatY = window.redhlpSettings.chatY, a.currentChatY = window.redhlpSettings.chatY), void 0 !== window.redhlpSettings.chatWidth && (a.chatWidth = parseInt(window.redhlpSettings.chatWidth, 10)), void 0 !== window.redhlpSettings.chatHeight && (a.chatHeight = parseInt(window.redhlpSettings.chatHeight, 10)), void 0 !== window.redhlpSettings.header && (a.currentHeader = window.redhlpSettings.header), void 0 !== window.redhlpSettings.topText && (a.currentTopText = window.redhlpSettings.topText), void 0 !== window.redhlpSettings.inviteTime && (a.currentInviteTime = parseInt(window.redhlpSettings.inviteTime, 10)), void 0 !== window.redhlpSettings.welcome && (a.currentWelcome = window.redhlpSettings.welcome), void 0 !== window.redhlpSettings.preferredOperator && (a.preferredOperator = window.redhlpSettings.preferredOperator.toLowerCase()), void 0 !== window.redhlpSettings.requiredOperator && (a.requiredOperator = (window.redhlpSettings.requiredOperator + "").toLowerCase()), void 0 !== window.redhlpSettings.preferredOperatorError && (a.preferredOperatorError = window.redhlpSettings.preferredOperatorError), void 0 !== window.redhlpSettings.badgeX && (a.badgeX = window.redhlpSettings.badgeX), void 0 !== window.redhlpSettings.badgeY && (a.badgeY = window.redhlpSettings.badgeY), void 0 !== window.redhlpSettings.avatar && (a.currentOperAvatar = window.redhlpSettings.avatar), void 0 !== window.redhlpSettings.badgePosition && (a.badgePosition = window.redhlpSettings.badgePosition), void 0 !== window.redhlpSettings.firstMessage && (a.currentFirstMessage = window.redhlpSettings.firstMessage), void 0 !== window.redhlpSettings.cloneSession && (a.cloneSession = window.redhlpSettings.cloneSession), void 0 !== window.redhlpSettings.offlineHeader && (a.currentOfflineHeader = window.redhlpSettings.offlineHeader), void 0 !== window.redhlpSettings.offlineText && (a.currentOfflineText = window.redhlpSettings.offlineText))
      } catch (c) {}
    });
    var e = {
      onstart: "function () { ... } - starts a function after RedHelper is loaded",
      onEvent: "function (name) {} - like GA and YM integration but with custom handler",
      page: "string that is passed to site definition patterns (from Control Panel preferences)",
      chooseOperator: "function (operators) { ... return oper; }",
      chatX: "x-position of the chat window",
      chatY: "y-position of the chat window",
      chatWidth: "width of the chat window",
      chatHeight: "height of the chat window",
      header: "header text in online chat (at the top of the window)",
      topText: "text below the header in online chat window",
      inviteTime: "(Deprecated)",
      welcome: "(Deprecated)",
      avatar: "(Deprecated)",
      badgeX: "if badgePosition==bottom, changes x-coodrinate of badge center, can be set in percent or in pixels",
      badgeY: "if badgePosition==left/right, changes y-coodrinate of badge center, can be set in percent or in pixels",
      badgePosition: "bottom/left/right",
      firstMessage: "automatic welcome message from operator",
      offlineHeader: "header in the offline form",
      offlineText: "text below header in offline form",
      preferredOperator: "if this operator is online, distributes visitor to him, if not then distributes visitor to another online operator (not dynamic, use RedHelper.setOperator instead)",
      requiredOperator: "if this operator is online, distributes visitor to him, if not then shows offline form (not dynamic, use RedHelper.setOperator instead)"
    };
    window.redhlpSettings ? window.redhlpSettings.help = e : window.redhlpSettings = {
      help: e
    }, void 0 !== window.redhlpSettings.chatX && (a.chatX = window.redhlpSettings.chatX, a.currentChatX = window.redhlpSettings.chatX), void 0 !== window.redhlpSettings.chatY && (a.chatY = window.redhlpSettings.chatY, a.currentChatY = window.redhlpSettings.chatY), void 0 !== window.redhlpSettings.chatWidth && (a.chatWidth = parseInt(window.redhlpSettings.chatWidth, 10)), void 0 !== window.redhlpSettings.chatHeight && (a.chatHeight = parseInt(window.redhlpSettings.chatHeight, 10)), void 0 !== window.redhlpSettings.header && (a.currentHeader = window.redhlpSettings.header), void 0 !== window.redhlpSettings.topText && (a.currentTopText = window.redhlpSettings.topText), window.redhlpSettings && void 0 !== window.redhlpSettings.inviteTime && (a.currentInviteTime = parseInt(window.redhlpSettings.inviteTime, 10)), window.redhlpSettings && window.redhlpSettings.disableCobrowse && (a.disableCobrowse = !0), window.redhlpSettings && window.redhlpSettings.disableForms && (a.disableForms = !0), void 0 !== window.redhlpSettings.hideBadge && (a.hideBadge = window.redhlpSettings.hideBadge), window.redhlpSettings.disableCobrowse && (a.disableCobrowse = !0), window.redhlpSettings.disableForms && (a.disableForms = !0), void 0 !== window.redhlpSettings.disableDOMObserver && (a.disableDOMObserver = !!window.redhlpSettings.disableDOMObserver), void 0 !== window.redhlpSettings.animateBadge && (a.animateBadge = !!window.redhlpSettings.animateBadge), d.addEventListener("sessionLoaded", function() {
      void 0 != window.redhlpSettings.disableCobrowse && (a.disableCobrowse = !!window.redhlpSettings.disableCobrowse), void 0 !== window.redhlpSettings.disableForms && (a.disableForms = !!window.redhlpSettings.disableForms), void 0 !== window.redhlpSettings.disableDOMObserver && (a.disableDOMObserver = !!window.redhlpSettings.disableDOMObserver), c.init()
    })
  }), define("application/redhlpSettings", function() {}), define("application/DOMObserver", ["common/extensions/jquery.plugins", "application/chatWindow", "application/session.objects", "application/redhlpSettings", "application/dispatcher"], function(a, b, c, d, e) {
    var f = !1;
    return window._lvl_ = 100, window._rhlp_thresholdSize = Math.round(4 * a("html").html().length / 3), "_rhlp_html_index_" in window || (window._rhlp_html_index_ = -1), {
      init: function() {
        function d() {
          k || (k = new MutationObserver(i), k.observe(a("body")[0], {
            attributes: !0,
            subtree: !0,
            characterData: !0,
            childList: !0
          }))
        }

        function g() {
          try {
            k && (k.disconnect(), k = null), o = !0, clearTimeout(l), l = setTimeout(function() {
              s = [], p = 0, r = {}, q = new Date, d(), e.fire("retrieveHTML", {})
            }, 1200)
          } catch (a) {}
        }

        function h(b) {
          if (!(window._lvl_ < 3)) {
            var c = a(b.target);
            if (!c.hasClass("rh-reset")) {
              var d;
              switch (b.type) {
                case "attributes":
                  var e = "class" === b.attributeName || "id" === b.attributeName;
                  d = {
                    type: "attr",
                    path: c.getPath(e),
                    attribute: b.attributeName,
                    value: c.attr(b.attributeName)
                  }, void 0 === d.value && (d.value = "");
                  break;
                case "characterData":
                  var f = c.parent();
                  d = {
                    type: "text",
                    path: f.getPath(),
                    value: f.html()
                  };
                  break;
                case "childList":
                  d = {
                    type: "tree",
                    path: c.getPath(),
                    value: c.html()
                  };
                  break;
                default:
                  return
              }
              t.push(d)
            }
          }
        }

        function i(a) {
          window._lvl_ < 1 || void 0 !== window._rhlp_html_index_ && -1 !== window._rhlp_html_index_ && (window._rhlp_html_index_ !== m && (m = window._rhlp_html_index_, n = 0, o = !1), o || (s.length + t.length + a.length > 1e4 ? g() : a.forEach(h)))
        }

        function j() {
          e.fire("DomObserver.start")
        }
        if (!window.MutationObserver || c.disableDOMObserver) return void(f = !0);
        var k, l, m = -1,
          n = 0,
          o = !1,
          p = 0,
          q = new Date,
          r = {},
          s = [],
          t = [];
        e.addEventListener("DomObserver.start", function() {
          d(), f = !0
        }), e.addEventListener("DomObserver.stop", function() {
          null != k && k.disconnect(), k = null
        }), b.addHandler("sniffMouse", function() {
          o || e.fire("DomObserver.start")
        }), b.addHandler("stopSniffMouse", function() {
          e.fire("DomObserver.stop")
        }), e.addEventListener("sniffFormData", function() {
          window._lvl_ < 10 || c.disableForms || (a("input, textarea").each(function(b, c) {
            var d = a(c);
            d.val() && (t.push({
              type: "input",
              path: d.getPath(),
              value: "password" === d.attr("type") ? d.val().replace(/\s\S/g, "*") : d.val()
            }), d[0].oldValue = d.val())
          }), a("input[type=checkbox],input[type=radio]").each(function(b, c) {
            a(c).val() && t.push({
              type: "checkbox",
              path: a(c).getPath(),
              value: a(c).prop("checked")
            })
          }))
        }), c.disableForms || (a("body").on("focus", "input, textarea", function(b) {
          t.push({
            type: "focus",
            path: a(b.target).getPath(),
            value: !0
          })
        }), a("body").on("blur", "input, textarea", function(b) {
          t.push({
            type: "focus",
            path: a(b.target).getPath(),
            value: !1
          })
        }), a("body").on("input", "input, textarea", function(b) {
          var c = a(b.target).val();
          t.push({
            type: "input",
            path: a(b.target).getPath(),
            value: "password" === a(b.target).attr("type") ? c.replace(/\s\S/g, "*") : c
          })
        }), a("input[type=checkbox],input[type=radio]").on("click", function() {
          a("input[type=checkbox],input[type=radio]").each(function(b, c) {
            t.push({
              type: "checkbox",
              path: a(c).getPath(),
              value: a(c).prop("checked")
            })
          })
        }), a("body").on("keyup", "input, textarea", function(b) {
          var c = a(b.target).val();
          t.push({
            type: "input",
            path: a(b.target).getPath(),
            value: "password" === a(b.target).attr("type") ? c.replace(/\s\S/g, "*") : c
          }), a(b.target)[0].oldValue = c
        }), setInterval(function() {
          a("input, textarea").each(function(b, c) {
            var d = a(c),
              e = d.val();
            e !== d[0].oldValue && t.push({
              type: "input",
              path: d.getPath(),
              value: "password" === d.attr("type") ? e.replace(/\s\S/g, "*") : e
            }), d[0].oldValue = e
          })
        }, 200)), a("*:not(body)").scroll(function(b) {
          t.push({
            type: "scroll",
            path: a(b.target).getPath(),
            value: {
              scrollTop: a(b.target).scrollTop(),
              scrollLeft: a(b.target).scrollLeft()
            }
          })
        });
        var u = function() {
          try {
            if (window._lvl_ < 5) return;
            if (o) return;
            if (t.length > 0) {
              var a = t;
              t = [];
              var c;
              a.reduce(function(a, b) {
                if (!o) {
                  var c = b.type + "://" + ("attr" === b.type ? b.attribute + "://" : "") + b.path;
                  if (void 0 !== r[c]) switch (b.type) {
                    case "attr":
                      if ("class" === b.attribute || "id" === b.attribute) return a.push(b), a;
                    case "tree":
                    case "focus":
                    case "scroll":
                    case "text":
                      return a[r[c]] = b, a
                  } else if (b.value && b.value.length && (p += b.value.length + 100, (b.value.indexOf("<input ") >= 0 || b.value.indexOf("<textarea ") >= 0) && e.fire("sniffFormData")), p > window._rhlp_thresholdSize) return void g();
                  return r[c] = a.push(b) - 1, a
                }
              }, s)
            } else {
              var d = new Date;
              if (d - q > 1200 && s.length > 0) {
                var f = s;
                for (var c in f) f[c].i = ++n;
                b.send("sendMutations", {
                  mutationsList: f
                }), s = [], r = {}, q = d, p = 0
              }
            }
          } catch (h) {}
        };
        setInterval(u, 10), j()
      },
      isStarted: function() {
        return f
      }
    }
  }), define("application/cobrowseContent", ["application/dispatcher", "application/chatWindow", "jquery", "application/session.objects", "application/redhlpSettings", "application/DOMObserver"], function(a, b, c, d, e, f) {
    function g(a) {
      if (!(d.disableCobrowse || window.redhlpSettings && window.redhlpSettings.disableCobrowse)) {
        if (!f.isStarted()) return void setTimeout(function() {
          g(a)
        }, 100);
        void 0 === window._rhlp_html_index_ && (window._rhlp_html_index_ = 0), window._rhlp_html_index_++;
        var e = document.documentElement.innerHTML,
          j = c("html"),
          k = j.attr("id") || "",
          l = j.attr("class");
        window._rhlp_thresholdSize = Math.round(4 * e.length / 3), b.send("sendHTML", {
          html: e,
          htmlId: k,
          htmlClass: l,
          url: location.href,
          to: a.to ? a.to : "",
          windowWidth: c(window).width(),
          windowHeight: i()
        }), h = location.href
      }
    }
    var h = location.href,
      i = function() {
        return "innerHeight" in window ? window.innerHeight : jQuery(window).height()
      };
    a.addEventListener("retrieveHTML", g), b.addHandler("retrieveHTML", g), b.addHandler("retrieveURL", function(a) {
      (h != location.href || a.force) && (h = location.href, b.send("sendURL", {
        url: location.href,
        to: a.to || ""
      }))
    }), b.addHandler("sniffFormData", function() {
      d.disableCobrowse || a.fire("sniffFormData")
    })
  }), define("application/pageVisibilityTracker", ["application/dispatcher", "jquery", "application/session.objects", "application/chatWindow"], function(a, b, c, d) {
    function e(a) {
      a = a || window.event, g(a.type in evtMap ? evtMap[a.type] : !this.hidden)
    }
    var f = !0;
    c.IsPageFocused = !0;
    var g = function(a) {
      f !== a && (f = a, c.IsPageFocused = f, d.send("page.focus", {
        focused: f
      }))
    };
    evtMap = {
      focus: !0,
      focusin: !0,
      pageshow: !0,
      blur: !1,
      focusout: !1,
      pagehide: !1
    }, "onfocusin" in document ? window.onfocusin = window.onfocusout = document.onfocusin = document.onfocusout = e : (b(window).blur(function() {
      g(!1)
    }), b(window).focus(function() {
      g(!0)
    })), b(window).click(function(a) {
      g(!0)
    }), b("html").click(function(a) {
      g(!0)
    })
  }), define("application/main", ["common/extensions/jquery.plugins", "application/session.objects", "view/viewManager", "application/chatWindow", "application/dispatcher", "common/application/basicActivity", "view/commonEvents", "common/extensions/mouse", "config/setup", "config/settings", "config/lang", "common/constants/chatState", "common/communication/messageTarget", "common/extensions/performance", "application/redhelper", "config/api", "application/invitationController", "config/customFields", "application/eventTracking", "common/extensions/historyAPI", "common/communication/encoder", "application/cloneSession", "application/DOMObserver", "application/cobrowseContent", "application/redhlpSettings", "application/pageVisibilityTracker", "application/command"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A) {
    return function(l) {
      ! function() {
        function m() {
          !a(".redhlp_button").length || b.free && !b.openApi || (j.button = ".redhlp_button"), !a(".redhlp_button.redhlp_withBadge").length || b.free && !b.openApi || (j.buttonBadge = ".redhlp_button", j.button = !1)
        }
        if (l.allowed !== !1 && b.allowed !== !1) {
          (!b.vid || 0 == b.vid && l.vid > 0) && (b.visIdFromNx = l.vid);
          var o;
          if (!(window.RedHelper && window.RedHelper.started || (l.hideRedHelper && a("head").append(a("<style>#rh-badge, #rh-chatWrapper { display: none !important; }</style>")), window.RedHelper.started = !0, n.addPoint("main"), i.BLOCK))) {
            setInterval(m, 1e3), m();
            for (o in l)
              if (l.hasOwnProperty(o)) {
                if ("extra" === o) continue;
                if ("operators" !== o) try {
                  var p = JSON.parse(JSON.parse(a("<div></div>").text(JSON.stringify(l[o])).html()));
                  null === p ? l[o] = JSON.parse(a("<div></div>").text(JSON.stringify(l[o])).html()) : l[o] = p
                } catch (r) {
                  l[o] = JSON.parse(a("<div></div>").text(JSON.stringify(l[o])).html())
                }
                if ("true" === l[o] && (l[o] = !0), "false" === l[o] && (l[o] = !1), "operators" !== o) "offlineMode" === o ? b.offlineEnabled = "yes" === l[o] || "limited" === l.clientType : "clientType" === o ? b.free = !("limited" !== l[o] || l.openApi && parseInt(l.openApi, 10) && "false" !== l.openApi) : "storeCookies" === o ? b.cloneSession = !!l[o] : "vid" === o || "status" !== o && (b[o] = l[o]);
                else if (b.isOnline = !1, b.isPartiallyOnline = !1, l.operators.length)
                  for (var s = l.operators.length, t = 0; s > t; t++)("online" === l.operators[t].status && (void 0 === l.operators[t].onPage || l.operators[t].onPage) || "offline" !== l.operators[t].status && l.operators[t].name.match(new RegExp("^" + b.currentOperator + "$", "i"))) && (!b.realDepartment || l.operators[t].departments && l.operators[t].departments.indexOf(b.realDepartment) > -1) && (b.isOnline = !0), "offline" === l.operators[t].status || void 0 !== l.operators[t].onPage && !l.operators[t].onPage || (b.isPartiallyOnline = !0)
              }
            if (l.extra) {
              var v;
              for (v in l.extra)
                if (l.extra.hasOwnProperty(v)) try {
                  l.extra[v] = a("<div></div>").text(l.extra[v]).html(), b[v] = l.extra[v]
                } catch (w) {}
                b.extraAuth = u.serialize(l.extra)
            }
            if ("string" == typeof l.operators) try {
              l.operators = u.parse(l.operators);
            } catch (r) {}
            b.onlineOperators = l.operators || [], e.fire("onlineOperatorsReceived"), a("#redhlp_chatFrame").length && !b.free && (j.iframe = !0), k.initLanguage(), e.addEventListener("chatOpened", function() {
              d.send("scrollMessages")
            }), q.start(), c.init(), b.isOnline || b.offlineEnabled || a("#redhlp_snippet, #rh-snippet").hide(), d.init(a("#redhlp_chatFrame, #rh-chatFrame")[0].contentWindow, i.APP_URL, i.IFRAME_URL.split("#")[0]), d.addHandler("hide", function() {
              a("#redhlp_snippet, #rh-snippet").hide()
            }), d.addHandler("show", function() {
              a("#redhlp_snippet, #rh-snippet").show()
            }), d.addHandler("message.send", function() {
              e.fire("chat.message.send")
            }), d.addHandler("message.received", function() {
              e.fire("chat.message.received")
            }), d.addHandler("rateOperator", function(a) {
              a.value ? e.fire("chat.rateOperator.like") : e.fire("chat.rateOperator.dislike")
            }), d.addHandler("displayChat", function() {
              a("#rh-chat").show(), d.send("displayedChat")
            }), d.addHandler("hideChat", function() {
              a("#rh-chat").hide()
            }), d.addHandler("ready", function() {
              n.addPoint("ready"), b.onLoad(function() {
                window.redhlpSettings && "function" == typeof window.redhlpSettings.onstart && setTimeout(function() {
                  window.redhlpSettings.onstart()
                }, 200), b.referrerStored || (b.referrer = i.referrer || "", b.referrerStored = !0), e.fire("sessionLoaded");
                var c = window.redhlpSettings && window.redhlpSettings.page ? window.redhlpSettings.page : c = location.href.substr(0, 256);
                d.send("start", {
                  url: location.href,
                  title: document.title,
                  page: c,
                  rhSettings: window.redhlpSettings || {}
                });
                var f = "_rhlp_oper=";
                if (location.href.indexOf(f) > -1) {
                  var g = location.href.substr(location.href.indexOf(f) + f.length).split("&")[0];
                  d.send("chOper", g)
                }
                a("body").addClass("redhlp_ready"), a("#rh-frameLoading").hide()
              }), b.sendRequest()
            }), d.addHandler("authenticated", function() {
              n.addPoint("authenticated"), k.initLanguage(), e.fire("start")
            }), d.addHandler("message.displayed", function(a) {
              e.fire("message.displayed", a)
            }), d.addHandler("templateRequest", function() {
              e.fire("templateRequest")
            }), e.addEventListener("templateReceived", function(a) {
              d.send("templateReceived", {
                template: a.template,
                isDefault: !!a.isDefault
              })
            }), d.addHandler("minimize", function() {
              e.fire("minifyChat")
            }), d.addHandler("redirect", function(a) {
              a.link.indexOf("http://") < 0 && a.link.indexOf("https://") < 0 && "/" !== a.link[0] && "." !== a.link[0] && "?" !== a.link[0] && "#" !== a.link[0] && (a.link = "http://" + a.link), location.href = a.link
            }), d.addHandler("disconnected", function() {
              a("#redhlp_chatFrame").hide(), d.addHandler("authenticated", function() {
                a("#redhlp_chatFrame").show()
              })
            }), d.send("init"), h.init().setAsSlave(d), e.addEventListener("chatBoxChanged", function(a) {
              b.currentChatX = a.left, b.currentChatY = a.top, b.currentChatHeight = a.height, b.currentChatWidth = a.width
            }), e.addEventListener("invitation.shown", function(a) {
              d.send("invitation.shown", {
                text: a.text
              })
            }), e.addEventListener("openChat", function() {
              e.fire("accepted")
            }), e.addEventListener("closeChat", function() {
              d.send("closeChat")
            }), e.addEventListener("accepted", function() {
              d.send("invitation.accepted"), d.send("state", {
                chatState: "chat",
                inviteState: "accepted"
              })
            }), e.addEventListener("rejected", function() {
              d.send("invitation.declined"), d.send("state", {
                chatState: "browse",
                inviteState: "rejected"
              })
            }), d.addHandler("openChat", function() {
              e.fire("openChat")
            }), f.start(), e.addEventListener("userAway", function() {
              d.send("inactive")
            }), e.addEventListener("userBack", function() {
              d.send("active")
            }), e.addEventListener("timer_userAway", function() {
              d.send("timer_inactive")
            }), e.addEventListener("timer_userBack", function() {
              d.send("timer_active")
            }), e.addEventListener("urlChanged", function() {
              d.send("urlChanged", {
                url: location.href,
                title: document.title
              })
            }), e.addEventListener("sendExecFunction", function(a) {
              d.send("execFunction", {
                name: a.name,
                args: a.args
              })
            }), e.addEventListener("sendMessage", function(a) {
              d.send("sendMessage", {
                text: a.text,
                show: !!a.show
              })
            }), d.addHandler("execFunction", function(a) {
              try {
                window[a.name].apply(null, a.args)
              } catch (b) {
                console
              }
            }), d.addHandler("hideSoundButton", function() {
              c.hideSound()
            }), d.addHandler("highlight", function(a) {
              e.fire(a)
            }), d.addHandler("redirect", function(a) {
              e.fire("redirect", {
                link: a.link
              })
            }), c.setIframeUrl(i.IFRAME_URL.replace("&version=", "&skin=" + b.skin + "&version="), function() {
              d.startMessaging()
            }), g.bind(d), c.show(), new Date - new Date(b.lastVisitTime) > 108e5 && b.visits++, b.lastVisitTime = (new Date).getTime(), b.viewedPages++, d.addHandler("operator", function() {
              e.fire("operator")
            }), a("html").bind("click", function(a) {
              b.IsPageFocused = !0, d.send("focus.force")
            })
          }
        }
      }()
    }
  }), require(["config/default", "common/extensions/jquery.plugins", "application/dispatcher", "application/main", "config/core", "config/setup", "common/extensions/compatibility", "config/api", "common/communication/encoder", "config/nxSettings", "common/extensions/browserDetect"], function(a, b, c, d, e, f, g, h, i, j, k) {
    function l(a) {
      try {
        f.COMPANY_ID = a.companyId || 0, f.IFRAME_URL = f.APP_URL + "chat/?c=" + f.CLIENT_NAME + "&version=3.1.570.1459872528712#" + i.compress({
          url: location.href,
          companyId: f.COMPANY_ID,
          settings: h
        }), d(a), window.$RedHelper = {
          fire: function(a, b) {
            c.fire(a, b)
          }
        }
      } catch (b) {}
    }
    if (!(void 0 !== navigator.userAgent && navigator.userAgent.indexOf("Awesomium") > -1) && document.getElementById("rhlpscrtg") && document.getElementById("rhlpscrtg").src && !("Explorer" === k.browser && k.version < 8)) {
      b.fx.interval = 11;
      var m = b("#rhlpscrtg").attr("src");
      if (~m.indexOf(".com/") ? e.__APP_URL = e.__PROTOCOL + "//web.redhelper.com/" : m.indexOf("//dev/") > -1 ? e.__APP_URL = e.__PROTOCOL + "//dev/" : m.indexOf("//development/") > -1 ? e.__APP_URL = e.__PROTOCOL + "//development/" : e.__APP_URL = e.__PROTOCOL + (m.indexOf("://test.") > -1 ? "//test.web.redhelper.ru/" : "//web.redhelper.ru/"), f.APP_URL = e.__APP_URL, f.TEST_MODE) {
        var n = b("#rhlpscrtg").attr("src");
        n = n.split("://").pop();
        var o = n.substr(n.indexOf("/test") + 1).split("/")[0];
        f.APP_URL += o + "/"
      }
      l(j)
    }
  }), define("namespace", function() {});
  var rhLocal = {
    define: define,
    require: require,
    requirejs: requirejs,
    protocol: rhGlobal.protocol || "http:",
    host: rhGlobal.host || "web.redhelper.ru",
    name: rhLocalName
  };
  try {
    var tag = document.getElementById("rhlpscrtg"),
      src = tag ? tag.src : location.href;
    rhLocal.protocol = src.split("//")[0] || "http:";
    var host;
    host = src.split("?")[0].indexOf("/development/") > -1 ? "development" : src.indexOf("/dev/") > -1 ? "dev" : src.indexOf("/test.web.redhelper.ru/") > -1 ? "test.web.redhelper.ru" : "web.redhelper.ru", rhLocal.host = host
  } catch (e) {
    rhLocal.host = "web.redhelper.ru", rhLocal.protocol = "https:"
  }
  window[rhLocal.name] = rhLocal, require.config({
    waitSeconds: 200,
    paths: {
      jquery: rhLocal.protocol + "//" + rhLocal.host + "/vendor/jquery-new.min"
    },
    map: {
      "*": {
        jquery: "jquery-private"
      },
      "jquery-private": {
        jquery: "jquery"
      }
    }
  }), define("../../../build/requirejs-production-config", function() {});
  for (var i = 0; i < rhGlobal.modules.length; i++) {
    var m = rhGlobal.modules[i];
    define(m.a, m.b, m.c)
  }
}();
