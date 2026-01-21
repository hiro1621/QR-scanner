var ZXingBundle = (() => {
  // node_modules/zxing-wasm/dist/es/share.js
  var m = [
    ["Aztec", "M"],
    ["Codabar", "L"],
    ["Code39", "L"],
    ["Code93", "L"],
    ["Code128", "L"],
    ["DataBar", "L"],
    ["DataBarExpanded", "L"],
    ["DataMatrix", "M"],
    ["EAN-8", "L"],
    ["EAN-13", "L"],
    ["ITF", "L"],
    ["MaxiCode", "M"],
    ["PDF417", "M"],
    ["QRCode", "M"],
    ["UPC-A", "L"],
    ["UPC-E", "L"],
    ["MicroQRCode", "M"],
    ["rMQRCode", "M"],
    ["DXFilmEdge", "L"],
    ["DataBarLimited", "L"]
  ];
  var O = m.map(([e]) => e);
  var b = O.filter(
    (e, t) => m[t][1] === "L"
  );
  var L = O.filter(
    (e, t) => m[t][1] === "M"
  );
  function l(e) {
    switch (e) {
      case "Linear-Codes":
        return b.reduce((t, r) => t | l(r), 0);
      case "Matrix-Codes":
        return L.reduce((t, r) => t | l(r), 0);
      case "Any":
        return (1 << m.length) - 1;
      case "None":
        return 0;
      default:
        return 1 << O.indexOf(e);
    }
  }
  function w(e) {
    if (e === 0)
      return "None";
    const t = 31 - Math.clz32(e);
    return O[t];
  }
  function E(e) {
    return e.reduce((t, r) => t | l(r), 0);
  }
  var M = [
    "LocalAverage",
    "GlobalHistogram",
    "FixedThreshold",
    "BoolCast"
  ];
  function x(e) {
    return M.indexOf(e);
  }
  var y = [
    "Unknown",
    "ASCII",
    "ISO8859_1",
    "ISO8859_2",
    "ISO8859_3",
    "ISO8859_4",
    "ISO8859_5",
    "ISO8859_6",
    "ISO8859_7",
    "ISO8859_8",
    "ISO8859_9",
    "ISO8859_10",
    "ISO8859_11",
    "ISO8859_13",
    "ISO8859_14",
    "ISO8859_15",
    "ISO8859_16",
    "Cp437",
    "Cp1250",
    "Cp1251",
    "Cp1252",
    "Cp1256",
    "Shift_JIS",
    "Big5",
    "GB2312",
    "GB18030",
    "EUC_JP",
    "EUC_KR",
    "UTF16BE",
    /**
     * UnicodeBig [[deprecated]]
     */
    "UTF16BE",
    "UTF8",
    "UTF16LE",
    "UTF32BE",
    "UTF32LE",
    "BINARY"
  ];
  function B(e) {
    return e === "UnicodeBig" ? y.indexOf("UTF16BE") : y.indexOf(e);
  }
  var F = [
    "Text",
    "Binary",
    "Mixed",
    "GS1",
    "ISO15434",
    "UnknownECI"
  ];
  function T(e) {
    return F[e];
  }
  var A = ["Ignore", "Read", "Require"];
  function U(e) {
    return A.indexOf(e);
  }
  var R = ["Plain", "ECI", "HRI", "Hex", "Escaped"];
  function p(e) {
    return R.indexOf(e);
  }
  var u = {
    formats: [],
    tryHarder: true,
    tryRotate: true,
    tryInvert: true,
    tryDownscale: true,
    tryDenoise: false,
    binarizer: "LocalAverage",
    isPure: false,
    downscaleFactor: 3,
    downscaleThreshold: 500,
    minLineCount: 2,
    maxNumberOfSymbols: 255,
    tryCode39ExtendedMode: true,
    returnErrors: false,
    eanAddOnSymbol: "Ignore",
    textMode: "HRI",
    characterSet: "Unknown"
  };
  function I(e) {
    return {
      ...e,
      formats: E(e.formats),
      binarizer: x(e.binarizer),
      eanAddOnSymbol: U(e.eanAddOnSymbol),
      textMode: p(e.textMode),
      characterSet: B(e.characterSet)
    };
  }
  function P(e) {
    return {
      ...e,
      format: w(e.format),
      contentType: T(e.contentType),
      eccLevel: e.ecLevel
    };
  }
  var h = {
    format: "QRCode",
    readerInit: false,
    forceSquareDataMatrix: false,
    ecLevel: "",
    scale: 0,
    sizeHint: 0,
    rotate: 0,
    withHRT: false,
    withQuietZones: true,
    options: ""
  };
  var W = {
    locateFile: (e, t) => {
      const r = e.match(/_(.+?)\.wasm$/);
      return r ? `https://fastly.jsdelivr.net/npm/zxing-wasm@2.2.4/dist/${r[1]}/${e}` : t + e;
    }
  };
  var f = /* @__PURE__ */ new WeakMap();
  function D(e, t) {
    return Object.is(e, t) || Object.keys(e).length === Object.keys(t).length && Object.keys(e).every(
      (r) => Object.hasOwn(t, r) && e[r] === t[r]
    );
  }
  function S(e, {
    overrides: t,
    equalityFn: r = D,
    fireImmediately: d = false
  } = {}) {
    var a;
    const [o, s] = (a = f.get(e)) != null ? a : [W], n = t != null ? t : o;
    let i;
    if (d) {
      if (s && (i = r(o, n)))
        return s;
      const c = e({
        ...n
      });
      return f.set(e, [n, c]), c;
    }
    (i != null ? i : r(o, n)) || f.set(e, [n]);
  }
  async function Z(e, t, r = u) {
    const d = {
      ...u,
      ...r
    }, o = await S(e, {
      fireImmediately: true
    });
    let s, n;
    if ("width" in t && "height" in t && "data" in t) {
      const {
        data: a,
        data: { byteLength: c },
        width: g,
        height: C
      } = t;
      n = o._malloc(c), o.HEAPU8.set(a, n), s = o.readBarcodesFromPixmap(
        n,
        g,
        C,
        I(d)
      );
    } else {
      let a, c;
      if ("buffer" in t)
        [a, c] = [t.byteLength, t];
      else if ("byteLength" in t)
        [a, c] = [t.byteLength, new Uint8Array(t)];
      else if ("size" in t)
        [a, c] = [t.size, new Uint8Array(await t.arrayBuffer())];
      else
        throw new TypeError("Invalid input type");
      n = o._malloc(a), o.HEAPU8.set(c, n), s = o.readBarcodesFromImage(
        n,
        a,
        I(d)
      );
    }
    o._free(n);
    const i = [];
    for (let a = 0; a < s.size(); ++a)
      i.push(
        P(s.get(a))
      );
    return i;
  }
  var j = {
    ...u,
    formats: [...u.formats]
  };
  var G = { ...h };

  // node_modules/zxing-wasm/dist/es/full/index.js
  async function _r(C = {}) {
    var A2, N2, gr, c = C, ke = !!globalThis.window, Oe = typeof Bun < "u", Dr = !!globalThis.WorkerGlobalScope;
    !((N2 = globalThis.process) === null || N2 === void 0 || (N2 = N2.versions) === null || N2 === void 0) && N2.node && ((gr = globalThis.process) === null || gr === void 0 ? void 0 : gr.type) != "renderer";
    var Mr = "./this.program", We, yr = "";
    function je(r) {
      return c.locateFile ? c.locateFile(r, yr) : yr + r;
    }
    var Ur, mr;
    if (ke || Dr || Oe) {
      try {
        yr = new URL(".", We).href;
      } catch {
      }
      Dr && (mr = (r) => {
        var e = new XMLHttpRequest();
        return e.open("GET", r, false), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
      }), Ur = async (r) => {
        var e = await fetch(r, {
          credentials: "same-origin"
        });
        if (e.ok)
          return e.arrayBuffer();
        throw new Error(e.status + " : " + e.url);
      };
    }
    var Ir = console.log.bind(console), x2 = console.error.bind(console), X2, Vr = false, Hr, Br, U2, W2, tr, G2, q, m2, Nr, xr, zr = false;
    function Zr() {
      var r = dr.buffer;
      U2 = new Int8Array(r), tr = new Int16Array(r), c.HEAPU8 = W2 = new Uint8Array(r), G2 = new Uint16Array(r), q = new Int32Array(r), m2 = new Uint32Array(r), Nr = new Float32Array(r), xr = new Float64Array(r);
    }
    function Ee() {
      if (c.preRun)
        for (typeof c.preRun == "function" && (c.preRun = [c.preRun]); c.preRun.length; )
          Ze(c.preRun.shift());
      Lr(Gr);
    }
    function De() {
      zr = true, rr.Da();
    }
    function Me() {
      if (c.postRun)
        for (typeof c.postRun == "function" && (c.postRun = [c.postRun]); c.postRun.length; )
          ze(c.postRun.shift());
      Lr(Xr);
    }
    function br(r) {
      var e, t;
      (e = c.onAbort) === null || e === void 0 || e.call(c, r), r = "Aborted(" + r + ")", x2(r), Vr = true, r += ". Build with -sASSERTIONS for more info.";
      var n = new WebAssembly.RuntimeError(r);
      throw (t = Br) === null || t === void 0 || t(n), n;
    }
    var z;
    function Ue() {
      return je("zxing_full.wasm");
    }
    function Ie(r) {
      if (r == z && X2)
        return new Uint8Array(X2);
      if (mr)
        return mr(r);
      throw "both async and sync fetching of the wasm failed";
    }
    async function Ve(r) {
      if (!X2)
        try {
          var e = await Ur(r);
          return new Uint8Array(e);
        } catch {
        }
      return Ie(r);
    }
    async function He(r, e) {
      try {
        var t = await Ve(r), n = await WebAssembly.instantiate(t, e);
        return n;
      } catch (i) {
        x2(`failed to asynchronously prepare wasm: ${i}`), br(i);
      }
    }
    async function Be(r, e, t) {
      if (!r && WebAssembly.instantiateStreaming)
        try {
          var n = fetch(e, {
            credentials: "same-origin"
          }), i = await WebAssembly.instantiateStreaming(n, t);
          return i;
        } catch (a) {
          x2(`wasm streaming compile failed: ${a}`), x2("falling back to ArrayBuffer instantiation");
        }
      return He(e, t);
    }
    function Ne() {
      var r = {
        a: kn
      };
      return r;
    }
    async function xe() {
      function r(a, s) {
        return rr = a.exports, Sn(rr), Zr(), rr;
      }
      function e(a) {
        return r(a.instance);
      }
      var t = Ne();
      if (c.instantiateWasm)
        return new Promise((a, s) => {
          c.instantiateWasm(t, (o, u2) => {
            a(r(o));
          });
        });
      z != null || (z = Ue());
      var n = await Be(X2, z, t), i = e(n);
      return i;
    }
    var Lr = (r) => {
      for (; r.length > 0; )
        r.shift()(c);
    }, Xr = [], ze = (r) => Xr.push(r), Gr = [], Ze = (r) => Gr.push(r), p2 = (r) => _e(r), h2 = () => ge(), nr = [], ir = 0, Le = (r) => {
      var e = new wr(r);
      return e.get_caught() || (e.set_caught(true), ir--), e.set_rethrown(false), nr.push(e), me(r), pe(r);
    }, j2 = 0, Xe = () => {
      d(0, 0);
      var r = nr.pop();
      ye(r.excPtr), j2 = 0;
    };
    class wr {
      constructor(e) {
        this.excPtr = e, this.ptr = e - 24;
      }
      set_type(e) {
        m2[this.ptr + 4 >> 2] = e;
      }
      get_type() {
        return m2[this.ptr + 4 >> 2];
      }
      set_destructor(e) {
        m2[this.ptr + 8 >> 2] = e;
      }
      get_destructor() {
        return m2[this.ptr + 8 >> 2];
      }
      set_caught(e) {
        e = e ? 1 : 0, U2[this.ptr + 12] = e;
      }
      get_caught() {
        return U2[this.ptr + 12] != 0;
      }
      set_rethrown(e) {
        e = e ? 1 : 0, U2[this.ptr + 13] = e;
      }
      get_rethrown() {
        return U2[this.ptr + 13] != 0;
      }
      init(e, t) {
        this.set_adjusted_ptr(0), this.set_type(e), this.set_destructor(t);
      }
      set_adjusted_ptr(e) {
        m2[this.ptr + 16 >> 2] = e;
      }
      get_adjusted_ptr() {
        return m2[this.ptr + 16 >> 2];
      }
    }
    var ar = (r) => he(r), $r = (r) => {
      var e = j2;
      if (!e)
        return ar(0), 0;
      var t = new wr(e);
      t.set_adjusted_ptr(e);
      var n = t.get_type();
      if (!n)
        return ar(0), e;
      for (var i of r) {
        if (i === 0 || i === n)
          break;
        var a = t.ptr + 16;
        if (be(i, n, a))
          return ar(i), e;
      }
      return ar(n), e;
    }, Ge = () => $r([]), qe = (r) => $r([r]), Ye = (r, e) => $r([r, e]), Ke = () => {
      var r = nr.pop();
      r || br("no exception to throw");
      var e = r.excPtr;
      throw r.get_rethrown() || (nr.push(r), r.set_rethrown(true), r.set_caught(false), ir++), j2 = e, j2;
    }, Je = (r, e, t) => {
      var n = new wr(r);
      throw n.init(e, t), j2 = r, ir++, j2;
    }, Qe = () => ir, rt = (r) => {
      throw j2 || (j2 = r), j2;
    }, qr = globalThis.TextDecoder && new TextDecoder(), Yr = (r, e, t, n) => {
      var i = e + t;
      if (n) return i;
      for (; r[e] && !(e >= i); ) ++e;
      return e;
    }, Kr = function(r) {
      let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, t = arguments.length > 2 ? arguments[2] : void 0, n = arguments.length > 3 ? arguments[3] : void 0;
      var i = Yr(r, e, t, n);
      if (i - e > 16 && r.buffer && qr)
        return qr.decode(r.subarray(e, i));
      for (var a = ""; e < i; ) {
        var s = r[e++];
        if (!(s & 128)) {
          a += String.fromCharCode(s);
          continue;
        }
        var o = r[e++] & 63;
        if ((s & 224) == 192) {
          a += String.fromCharCode((s & 31) << 6 | o);
          continue;
        }
        var u2 = r[e++] & 63;
        if ((s & 240) == 224 ? s = (s & 15) << 12 | o << 6 | u2 : s = (s & 7) << 18 | o << 12 | u2 << 6 | r[e++] & 63, s < 65536)
          a += String.fromCharCode(s);
        else {
          var f2 = s - 65536;
          a += String.fromCharCode(55296 | f2 >> 10, 56320 | f2 & 1023);
        }
      }
      return a;
    }, et = (r, e, t) => r ? Kr(W2, r, e, t) : "";
    function tt(r, e, t) {
      return 0;
    }
    function nt(r, e, t) {
      return 0;
    }
    var it = (r, e, t) => {
    };
    function at(r, e, t, n) {
    }
    var st = (r, e) => {
    }, ot = () => br(""), sr = {}, Tr = (r) => {
      for (; r.length; ) {
        var e = r.pop(), t = r.pop();
        t(e);
      }
    };
    function Y(r) {
      return this.fromWireType(m2[r >> 2]);
    }
    var Z2 = {}, I2 = {}, or = {}, ut = class extends Error {
      constructor(e) {
        super(e), this.name = "InternalError";
      }
    }, ur = (r) => {
      throw new ut(r);
    }, V = (r, e, t) => {
      r.forEach((o) => or[o] = e);
      function n(o) {
        var u2 = t(o);
        u2.length !== r.length && ur("Mismatched type converter count");
        for (var f2 = 0; f2 < r.length; ++f2)
          k(r[f2], u2[f2]);
      }
      var i = new Array(e.length), a = [], s = 0;
      {
        const o = e;
        for (let u2 = 0; u2 < o.length; ++u2) {
          const f2 = o[u2];
          I2.hasOwnProperty(f2) ? i[u2] = I2[f2] : (a.push(f2), Z2.hasOwnProperty(f2) || (Z2[f2] = []), Z2[f2].push(() => {
            i[u2] = I2[f2], ++s, s === a.length && n(i);
          }));
        }
      }
      a.length === 0 && n(i);
    }, ft = (r) => {
      var e = sr[r];
      delete sr[r];
      var t = e.rawConstructor, n = e.rawDestructor, i = e.fields, a = i.map((s) => s.getterReturnType).concat(i.map((s) => s.setterArgumentType));
      V([r], a, (s) => {
        var o = {};
        {
          const u2 = i;
          for (let f2 = 0; f2 < u2.length; ++f2) {
            const l2 = u2[f2], v2 = s[f2], y2 = l2.getter, w2 = l2.getterContext, P2 = s[f2 + i.length], T2 = l2.setter, $ = l2.setterContext;
            o[l2.fieldName] = {
              read: (b2) => v2.fromWireType(y2(w2, b2)),
              write: (b2, B2) => {
                var F2 = [];
                T2($, b2, P2.toWireType(F2, B2)), Tr(F2);
              },
              optional: v2.optional
            };
          }
        }
        return [{
          name: e.name,
          fromWireType: (u2) => {
            var f2 = {};
            for (var l2 in o)
              f2[l2] = o[l2].read(u2);
            return n(u2), f2;
          },
          toWireType: (u2, f2) => {
            for (var l2 in o)
              if (!(l2 in f2) && !o[l2].optional)
                throw new TypeError(`Missing field: "${l2}"`);
            var v2 = t();
            for (l2 in o)
              o[l2].write(v2, f2[l2]);
            return u2 !== null && u2.push(n, v2), v2;
          },
          readValueFromPointer: Y,
          destructorFunction: n
        }];
      });
    }, ct = (r, e, t, n, i) => {
    }, R2 = (r) => {
      for (var e = ""; ; ) {
        var t = W2[r++];
        if (!t) return e;
        e += String.fromCharCode(t);
      }
    }, K = class extends Error {
      constructor(e) {
        super(e), this.name = "BindingError";
      }
    }, g = (r) => {
      throw new K(r);
    };
    function lt(r, e) {
      let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var n = e.name;
      if (r || g(`type "${n}" must have a positive integer typeid pointer`), I2.hasOwnProperty(r)) {
        if (t.ignoreDuplicateRegistrations)
          return;
        g(`Cannot register type '${n}' twice`);
      }
      if (I2[r] = e, delete or[r], Z2.hasOwnProperty(r)) {
        var i = Z2[r];
        delete Z2[r], i.forEach((a) => a());
      }
    }
    function k(r, e) {
      let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return lt(r, e, t);
    }
    var vt = (r, e, t, n) => {
      e = R2(e), k(r, {
        name: e,
        fromWireType: function(i) {
          return !!i;
        },
        toWireType: function(i, a) {
          return a ? t : n;
        },
        readValueFromPointer: function(i) {
          return this.fromWireType(W2[i]);
        },
        destructorFunction: null
      });
    }, dt = (r) => ({
      count: r.count,
      deleteScheduled: r.deleteScheduled,
      preservePointerOnDelete: r.preservePointerOnDelete,
      ptr: r.ptr,
      ptrType: r.ptrType,
      smartPtr: r.smartPtr,
      smartPtrType: r.smartPtrType
    }), Pr = (r) => {
      function e(t) {
        return t.$$.ptrType.registeredClass.name;
      }
      g(e(r) + " instance already deleted");
    }, Cr = false, Jr = (r) => {
    }, pt = (r) => {
      r.smartPtr ? r.smartPtrType.rawDestructor(r.smartPtr) : r.ptrType.registeredClass.rawDestructor(r.ptr);
    }, Qr = (r) => {
      r.count.value -= 1;
      var e = r.count.value === 0;
      e && pt(r);
    }, J = (r) => globalThis.FinalizationRegistry ? (Cr = new FinalizationRegistry((e) => {
      Qr(e.$$);
    }), J = (e) => {
      var t = e.$$, n = !!t.smartPtr;
      if (n) {
        var i = {
          $$: t
        };
        Cr.register(e, i, e);
      }
      return e;
    }, Jr = (e) => Cr.unregister(e), J(r)) : (J = (e) => e, r), ht = () => {
      let r = fr.prototype;
      Object.assign(r, {
        isAliasOf(t) {
          if (!(this instanceof fr) || !(t instanceof fr))
            return false;
          var n = this.$$.ptrType.registeredClass, i = this.$$.ptr;
          t.$$ = t.$$;
          for (var a = t.$$.ptrType.registeredClass, s = t.$$.ptr; n.baseClass; )
            i = n.upcast(i), n = n.baseClass;
          for (; a.baseClass; )
            s = a.upcast(s), a = a.baseClass;
          return n === a && i === s;
        },
        clone() {
          if (this.$$.ptr || Pr(this), this.$$.preservePointerOnDelete)
            return this.$$.count.value += 1, this;
          var t = J(Object.create(Object.getPrototypeOf(this), {
            $$: {
              value: dt(this.$$)
            }
          }));
          return t.$$.count.value += 1, t.$$.deleteScheduled = false, t;
        },
        delete() {
          this.$$.ptr || Pr(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && g("Object already scheduled for deletion"), Jr(this), Qr(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
        },
        isDeleted() {
          return !this.$$.ptr;
        },
        deleteLater() {
          return this.$$.ptr || Pr(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && g("Object already scheduled for deletion"), this.$$.deleteScheduled = true, this;
        }
      });
      const e = Symbol.dispose;
      e && (r[e] = r.delete);
    };
    function fr() {
    }
    var Rr = (r, e) => Object.defineProperty(e, "name", {
      value: r
    }), re = {}, ee = (r, e, t) => {
      if (r[e].overloadTable === void 0) {
        var n = r[e];
        r[e] = function() {
          for (var i = arguments.length, a = new Array(i), s = 0; s < i; s++)
            a[s] = arguments[s];
          return r[e].overloadTable.hasOwnProperty(a.length) || g(`Function '${t}' called with an invalid number of arguments (${a.length}) - expects one of (${r[e].overloadTable})!`), r[e].overloadTable[a.length].apply(this, a);
        }, r[e].overloadTable = [], r[e].overloadTable[n.argCount] = n;
      }
    }, te = (r, e, t) => {
      c.hasOwnProperty(r) ? ((t === void 0 || c[r].overloadTable !== void 0 && c[r].overloadTable[t] !== void 0) && g(`Cannot register public name '${r}' twice`), ee(c, r, r), c[r].overloadTable.hasOwnProperty(t) && g(`Cannot register multiple overloads of a function with the same number of arguments (${t})!`), c[r].overloadTable[t] = e) : (c[r] = e, c[r].argCount = t);
    }, _t = 48, gt = 57, yt = (r) => {
      r = r.replace(/[^a-zA-Z0-9_]/g, "$");
      var e = r.charCodeAt(0);
      return e >= _t && e <= gt ? `_${r}` : r;
    };
    function mt(r, e, t, n, i, a, s, o) {
      this.name = r, this.constructor = e, this.instancePrototype = t, this.rawDestructor = n, this.baseClass = i, this.getActualType = a, this.upcast = s, this.downcast = o, this.pureVirtualFunctions = [];
    }
    var Fr = (r, e, t) => {
      for (; e !== t; )
        e.upcast || g(`Expected null or instance of ${t.name}, got an instance of ${e.name}`), r = e.upcast(r), e = e.baseClass;
      return r;
    }, Ar = (r) => {
      if (r === null)
        return "null";
      var e = typeof r;
      return e === "object" || e === "array" || e === "function" ? r.toString() : "" + r;
    };
    function bt(r, e) {
      if (e === null)
        return this.isReference && g(`null is not a valid ${this.name}`), 0;
      e.$$ || g(`Cannot pass "${Ar(e)}" as a ${this.name}`), e.$$.ptr || g(`Cannot pass deleted object as a pointer of type ${this.name}`);
      var t = e.$$.ptrType.registeredClass, n = Fr(e.$$.ptr, t, this.registeredClass);
      return n;
    }
    function wt(r, e) {
      var t;
      if (e === null)
        return this.isReference && g(`null is not a valid ${this.name}`), this.isSmartPointer ? (t = this.rawConstructor(), r !== null && r.push(this.rawDestructor, t), t) : 0;
      (!e || !e.$$) && g(`Cannot pass "${Ar(e)}" as a ${this.name}`), e.$$.ptr || g(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && e.$$.ptrType.isConst && g(`Cannot convert argument of type ${e.$$.smartPtrType ? e.$$.smartPtrType.name : e.$$.ptrType.name} to parameter type ${this.name}`);
      var n = e.$$.ptrType.registeredClass;
      if (t = Fr(e.$$.ptr, n, this.registeredClass), this.isSmartPointer)
        switch (e.$$.smartPtr === void 0 && g("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
          case 0:
            e.$$.smartPtrType === this ? t = e.$$.smartPtr : g(`Cannot convert argument of type ${e.$$.smartPtrType ? e.$$.smartPtrType.name : e.$$.ptrType.name} to parameter type ${this.name}`);
            break;
          case 1:
            t = e.$$.smartPtr;
            break;
          case 2:
            if (e.$$.smartPtrType === this)
              t = e.$$.smartPtr;
            else {
              var i = e.clone();
              t = this.rawShare(t, O2.toHandle(() => i.delete())), r !== null && r.push(this.rawDestructor, t);
            }
            break;
          default:
            g("Unsupporting sharing policy");
        }
      return t;
    }
    function $t(r, e) {
      if (e === null)
        return this.isReference && g(`null is not a valid ${this.name}`), 0;
      e.$$ || g(`Cannot pass "${Ar(e)}" as a ${this.name}`), e.$$.ptr || g(`Cannot pass deleted object as a pointer of type ${this.name}`), e.$$.ptrType.isConst && g(`Cannot convert argument of type ${e.$$.ptrType.name} to parameter type ${this.name}`);
      var t = e.$$.ptrType.registeredClass, n = Fr(e.$$.ptr, t, this.registeredClass);
      return n;
    }
    var ne = (r, e, t) => {
      if (e === t)
        return r;
      if (t.baseClass === void 0)
        return null;
      var n = ne(r, e, t.baseClass);
      return n === null ? null : t.downcast(n);
    }, Tt = {}, Pt = (r, e) => {
      for (e === void 0 && g("ptr should not be undefined"); r.baseClass; )
        e = r.upcast(e), r = r.baseClass;
      return e;
    }, Ct = (r, e) => (e = Pt(r, e), Tt[e]), cr = (r, e) => {
      (!e.ptrType || !e.ptr) && ur("makeClassHandle requires ptr and ptrType");
      var t = !!e.smartPtrType, n = !!e.smartPtr;
      return t !== n && ur("Both smartPtrType and smartPtr must be specified"), e.count = {
        value: 1
      }, J(Object.create(r, {
        $$: {
          value: e,
          writable: true
        }
      }));
    };
    function Rt(r) {
      var e = this.getPointee(r);
      if (!e)
        return this.destructor(r), null;
      var t = Ct(this.registeredClass, e);
      if (t !== void 0) {
        if (t.$$.count.value === 0)
          return t.$$.ptr = e, t.$$.smartPtr = r, t.clone();
        var n = t.clone();
        return this.destructor(r), n;
      }
      function i() {
        return this.isSmartPointer ? cr(this.registeredClass.instancePrototype, {
          ptrType: this.pointeeType,
          ptr: e,
          smartPtrType: this,
          smartPtr: r
        }) : cr(this.registeredClass.instancePrototype, {
          ptrType: this,
          ptr: r
        });
      }
      var a = this.registeredClass.getActualType(e), s = re[a];
      if (!s)
        return i.call(this);
      var o;
      this.isConst ? o = s.constPointerType : o = s.pointerType;
      var u2 = ne(e, this.registeredClass, o.registeredClass);
      return u2 === null ? i.call(this) : this.isSmartPointer ? cr(o.registeredClass.instancePrototype, {
        ptrType: o,
        ptr: u2,
        smartPtrType: this,
        smartPtr: r
      }) : cr(o.registeredClass.instancePrototype, {
        ptrType: o,
        ptr: u2
      });
    }
    var Ft = () => {
      Object.assign(lr.prototype, {
        getPointee(r) {
          return this.rawGetPointee && (r = this.rawGetPointee(r)), r;
        },
        destructor(r) {
          var e;
          (e = this.rawDestructor) === null || e === void 0 || e.call(this, r);
        },
        readValueFromPointer: Y,
        fromWireType: Rt
      });
    };
    function lr(r, e, t, n, i, a, s, o, u2, f2, l2) {
      this.name = r, this.registeredClass = e, this.isReference = t, this.isConst = n, this.isSmartPointer = i, this.pointeeType = a, this.sharingPolicy = s, this.rawGetPointee = o, this.rawConstructor = u2, this.rawShare = f2, this.rawDestructor = l2, !i && e.baseClass === void 0 ? n ? (this.toWireType = bt, this.destructorFunction = null) : (this.toWireType = $t, this.destructorFunction = null) : this.toWireType = wt;
    }
    var ie = (r, e, t) => {
      c.hasOwnProperty(r) || ur("Replacing nonexistent public symbol"), c[r].overloadTable !== void 0 && t !== void 0 ? c[r].overloadTable[t] = e : (c[r] = e, c[r].argCount = t);
    }, D2 = {}, At = (r, e, t) => {
      r = r.replace(/p/g, "i");
      var n = D2[r];
      return n(e, ...t);
    }, ae = [], _ = (r) => {
      var e = ae[r];
      return e || (ae[r] = e = Te.get(r)), e;
    }, St = function(r, e) {
      let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (r.includes("j"))
        return At(r, e, t);
      var n = _(e), i = n(...t);
      function a(s) {
        return s;
      }
      return i;
    }, kt = function(r, e) {
      let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      return function() {
        for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
          i[a] = arguments[a];
        return St(r, e, i, t);
      };
    }, S2 = function(r, e) {
      r = R2(r);
      function t() {
        if (r.includes("j"))
          return kt(r, e);
        var i = _(e);
        return i;
      }
      var n = t();
      return typeof n != "function" && g(`unknown function pointer with signature ${r}: ${e}`), n;
    };
    class Ot extends Error {
    }
    var se = (r) => {
      var e = de(r), t = R2(e);
      return M2(e), t;
    }, vr = (r, e) => {
      var t = [], n = {};
      function i(a) {
        if (!n[a] && !I2[a]) {
          if (or[a]) {
            or[a].forEach(i);
            return;
          }
          t.push(a), n[a] = true;
        }
      }
      throw e.forEach(i), new Ot(`${r}: ` + t.map(se).join([", "]));
    }, Wt = (r, e, t, n, i, a, s, o, u2, f2, l2, v2, y2) => {
      l2 = R2(l2), a = S2(i, a), o && (o = S2(s, o)), f2 && (f2 = S2(u2, f2)), y2 = S2(v2, y2);
      var w2 = yt(l2);
      te(w2, function() {
        vr(`Cannot construct ${l2} due to unbound types`, [n]);
      }), V([r, e, t], n ? [n] : [], (P2) => {
        P2 = P2[0];
        var T2, $;
        n ? (T2 = P2.registeredClass, $ = T2.instancePrototype) : $ = fr.prototype;
        var b2 = Rr(l2, function() {
          if (Object.getPrototypeOf(this) !== B2)
            throw new K(`Use 'new' to construct ${l2}`);
          if (F2.constructor_body === void 0)
            throw new K(`${l2} has no accessible constructor`);
          for (var Re = arguments.length, pr = new Array(Re), hr = 0; hr < Re; hr++)
            pr[hr] = arguments[hr];
          var Fe = F2.constructor_body[pr.length];
          if (Fe === void 0)
            throw new K(`Tried to invoke ctor of ${l2} with invalid number of parameters (${pr.length}) - expected (${Object.keys(F2.constructor_body).toString()}) parameters instead!`);
          return Fe.apply(this, pr);
        }), B2 = Object.create($, {
          constructor: {
            value: b2
          }
        });
        b2.prototype = B2;
        var F2 = new mt(l2, b2, B2, y2, T2, a, o, f2);
        if (F2.baseClass) {
          var E2, er;
          (er = (E2 = F2.baseClass).__derivedClasses) !== null && er !== void 0 || (E2.__derivedClasses = []), F2.baseClass.__derivedClasses.push(F2);
        }
        var di = new lr(l2, F2, true, false, false), Pe = new lr(l2 + "*", F2, false, false, false), Ce = new lr(l2 + " const*", F2, false, true, false);
        return re[r] = {
          pointerType: Pe,
          constPointerType: Ce
        }, ie(w2, b2), [di, Pe, Ce];
      });
    }, Sr = (r, e) => {
      for (var t = [], n = 0; n < r; n++)
        t.push(m2[e + n * 4 >> 2]);
      return t;
    };
    function jt(r) {
      for (var e = 1; e < r.length; ++e)
        if (r[e] !== null && r[e].destructorFunction === void 0)
          return true;
      return false;
    }
    function kr(r, e, t, n, i, a) {
      var s = e.length;
      s < 2 && g("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var o = e[1] !== null && t !== null, u2 = jt(e), f2 = !e[0].isVoid, l2 = s - 2, v2 = new Array(l2), y2 = [], w2 = [], P2 = function() {
        w2.length = 0;
        var T2;
        y2.length = o ? 2 : 1, y2[0] = i, o && (T2 = e[1].toWireType(w2, this), y2[1] = T2);
        for (var $ = 0; $ < l2; ++$)
          v2[$] = e[$ + 2].toWireType(w2, $ < 0 || arguments.length <= $ ? void 0 : arguments[$]), y2.push(v2[$]);
        var b2 = n(...y2);
        function B2(F2) {
          if (u2)
            Tr(w2);
          else
            for (var E2 = o ? 1 : 2; E2 < e.length; E2++) {
              var er = E2 === 1 ? T2 : v2[E2 - 2];
              e[E2].destructorFunction !== null && e[E2].destructorFunction(er);
            }
          if (f2)
            return e[0].fromWireType(F2);
        }
        return B2(b2);
      };
      return Rr(r, P2);
    }
    var Et = (r, e, t, n, i, a) => {
      var s = Sr(e, t);
      i = S2(n, i), V([], [r], (o) => {
        o = o[0];
        var u2 = `constructor ${o.name}`;
        if (o.registeredClass.constructor_body === void 0 && (o.registeredClass.constructor_body = []), o.registeredClass.constructor_body[e - 1] !== void 0)
          throw new K(`Cannot register multiple constructors with identical number of parameters (${e - 1}) for class '${o.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
        return o.registeredClass.constructor_body[e - 1] = () => {
          vr(`Cannot construct ${o.name} due to unbound types`, s);
        }, V([], s, (f2) => (f2.splice(1, 0, null), o.registeredClass.constructor_body[e - 1] = kr(u2, f2, null, i, a), [])), [];
      });
    }, oe = (r) => {
      r = r.trim();
      const e = r.indexOf("(");
      return e === -1 ? r : r.slice(0, e);
    }, Dt = (r, e, t, n, i, a, s, o, u2, f2) => {
      var l2 = Sr(t, n);
      e = R2(e), e = oe(e), a = S2(i, a), V([], [r], (v2) => {
        v2 = v2[0];
        var y2 = `${v2.name}.${e}`;
        e.startsWith("@@") && (e = Symbol[e.substring(2)]), o && v2.registeredClass.pureVirtualFunctions.push(e);
        function w2() {
          vr(`Cannot call ${y2} due to unbound types`, l2);
        }
        var P2 = v2.registeredClass.instancePrototype, T2 = P2[e];
        return T2 === void 0 || T2.overloadTable === void 0 && T2.className !== v2.name && T2.argCount === t - 2 ? (w2.argCount = t - 2, w2.className = v2.name, P2[e] = w2) : (ee(P2, e, y2), P2[e].overloadTable[t - 2] = w2), V([], l2, ($) => {
          var b2 = kr(y2, $, v2, a, s);
          return P2[e].overloadTable === void 0 ? (b2.argCount = t - 2, P2[e] = b2) : P2[e].overloadTable[t - 2] = b2, [];
        }), [];
      });
    }, ue = [], H2 = [0, 1, , 1, null, 1, true, 1, false, 1], Or = (r) => {
      r > 9 && --H2[r + 1] === 0 && (H2[r] = void 0, ue.push(r));
    }, O2 = {
      toValue: (r) => (r || g(`Cannot use deleted val. handle = ${r}`), H2[r]),
      toHandle: (r) => {
        switch (r) {
          case void 0:
            return 2;
          case null:
            return 4;
          case true:
            return 6;
          case false:
            return 8;
          default: {
            const e = ue.pop() || H2.length;
            return H2[e] = r, H2[e + 1] = 1, e;
          }
        }
      }
    }, fe = {
      name: "emscripten::val",
      fromWireType: (r) => {
        var e = O2.toValue(r);
        return Or(r), e;
      },
      toWireType: (r, e) => O2.toHandle(e),
      readValueFromPointer: Y,
      destructorFunction: null
    }, Mt = (r) => k(r, fe), Ut = (r, e) => {
      switch (e) {
        case 4:
          return function(t) {
            return this.fromWireType(Nr[t >> 2]);
          };
        case 8:
          return function(t) {
            return this.fromWireType(xr[t >> 3]);
          };
        default:
          throw new TypeError(`invalid float width (${e}): ${r}`);
      }
    }, It = (r, e, t) => {
      e = R2(e), k(r, {
        name: e,
        fromWireType: (n) => n,
        toWireType: (n, i) => i,
        readValueFromPointer: Ut(e, t),
        destructorFunction: null
      });
    }, Vt = (r, e, t, n, i, a, s, o) => {
      var u2 = Sr(e, t);
      r = R2(r), r = oe(r), i = S2(n, i), te(r, function() {
        vr(`Cannot call ${r} due to unbound types`, u2);
      }, e - 1), V([], u2, (f2) => {
        var l2 = [f2[0], null].concat(f2.slice(1));
        return ie(r, kr(r, l2, null, i, a), e - 1), [];
      });
    }, Ht = (r, e, t) => {
      switch (e) {
        case 1:
          return t ? (n) => U2[n] : (n) => W2[n];
        case 2:
          return t ? (n) => tr[n >> 1] : (n) => G2[n >> 1];
        case 4:
          return t ? (n) => q[n >> 2] : (n) => m2[n >> 2];
        default:
          throw new TypeError(`invalid integer width (${e}): ${r}`);
      }
    }, Bt = (r, e, t, n, i) => {
      e = R2(e);
      const a = n === 0;
      let s = (u2) => u2;
      if (a) {
        var o = 32 - 8 * t;
        s = (u2) => u2 << o >>> o, i = s(i);
      }
      k(r, {
        name: e,
        fromWireType: s,
        toWireType: (u2, f2) => f2,
        readValueFromPointer: Ht(e, t, n !== 0),
        destructorFunction: null
      });
    }, Nt = (r, e, t) => {
      var n = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array], i = n[e];
      function a(s) {
        var o = m2[s >> 2], u2 = m2[s + 4 >> 2];
        return new i(U2.buffer, u2, o);
      }
      t = R2(t), k(r, {
        name: t,
        fromWireType: a,
        readValueFromPointer: a
      }, {
        ignoreDuplicateRegistrations: true
      });
    }, xt = Object.assign({
      optional: true
    }, fe), zt = (r, e) => {
      k(r, xt);
    }, Zt = (r, e, t, n) => {
      if (!(n > 0)) return 0;
      for (var i = t, a = t + n - 1, s = 0; s < r.length; ++s) {
        var o = r.codePointAt(s);
        if (o <= 127) {
          if (t >= a) break;
          e[t++] = o;
        } else if (o <= 2047) {
          if (t + 1 >= a) break;
          e[t++] = 192 | o >> 6, e[t++] = 128 | o & 63;
        } else if (o <= 65535) {
          if (t + 2 >= a) break;
          e[t++] = 224 | o >> 12, e[t++] = 128 | o >> 6 & 63, e[t++] = 128 | o & 63;
        } else {
          if (t + 3 >= a) break;
          e[t++] = 240 | o >> 18, e[t++] = 128 | o >> 12 & 63, e[t++] = 128 | o >> 6 & 63, e[t++] = 128 | o & 63, s++;
        }
      }
      return e[t] = 0, t - i;
    }, L2 = (r, e, t) => Zt(r, W2, e, t), ce = (r) => {
      for (var e = 0, t = 0; t < r.length; ++t) {
        var n = r.charCodeAt(t);
        n <= 127 ? e++ : n <= 2047 ? e += 2 : n >= 55296 && n <= 57343 ? (e += 4, ++t) : e += 3;
      }
      return e;
    }, Lt = (r, e) => {
      e = R2(e), k(r, {
        name: e,
        fromWireType(t) {
          var n = m2[t >> 2], i = t + 4, a;
          return a = et(i, n, true), M2(t), a;
        },
        toWireType(t, n) {
          n instanceof ArrayBuffer && (n = new Uint8Array(n));
          var i, a = typeof n == "string";
          a || ArrayBuffer.isView(n) && n.BYTES_PER_ELEMENT == 1 || g("Cannot pass non-string to std::string"), a ? i = ce(n) : i = n.length;
          var s = Er(4 + i + 1), o = s + 4;
          return m2[s >> 2] = i, a ? L2(n, o, i + 1) : W2.set(n, o), t !== null && t.push(M2, s), s;
        },
        readValueFromPointer: Y,
        destructorFunction(t) {
          M2(t);
        }
      });
    }, le = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, Xt = (r, e, t) => {
      var n = r >> 1, i = Yr(G2, n, e / 2, t);
      if (i - n > 16 && le) return le.decode(G2.subarray(n, i));
      for (var a = "", s = n; s < i; ++s) {
        var o = G2[s];
        a += String.fromCharCode(o);
      }
      return a;
    }, Gt = (r, e, t) => {
      if (t != null || (t = 2147483647), t < 2) return 0;
      t -= 2;
      for (var n = e, i = t < r.length * 2 ? t / 2 : r.length, a = 0; a < i; ++a) {
        var s = r.charCodeAt(a);
        tr[e >> 1] = s, e += 2;
      }
      return tr[e >> 1] = 0, e - n;
    }, qt = (r) => r.length * 2, Yt = (r, e, t) => {
      for (var n = "", i = r >> 2, a = 0; !(a >= e / 4); a++) {
        var s = m2[i + a];
        if (!s && !t) break;
        n += String.fromCodePoint(s);
      }
      return n;
    }, Kt = (r, e, t) => {
      if (t != null || (t = 2147483647), t < 4) return 0;
      for (var n = e, i = n + t - 4, a = 0; a < r.length; ++a) {
        var s = r.codePointAt(a);
        if (s > 65535 && a++, q[e >> 2] = s, e += 4, e + 4 > i) break;
      }
      return q[e >> 2] = 0, e - n;
    }, Jt = (r) => {
      for (var e = 0, t = 0; t < r.length; ++t) {
        var n = r.codePointAt(t);
        n > 65535 && t++, e += 4;
      }
      return e;
    }, Qt = (r, e, t) => {
      t = R2(t);
      var n, i, a;
      e === 2 ? (n = Xt, i = Gt, a = qt) : (n = Yt, i = Kt, a = Jt), k(r, {
        name: t,
        fromWireType: (s) => {
          var o = m2[s >> 2], u2 = n(s + 4, o * e, true);
          return M2(s), u2;
        },
        toWireType: (s, o) => {
          typeof o != "string" && g(`Cannot pass non-string to C++ string type ${t}`);
          var u2 = a(o), f2 = Er(4 + u2 + e);
          return m2[f2 >> 2] = u2 / e, i(o, f2 + 4, u2 + e), s !== null && s.push(M2, f2), f2;
        },
        readValueFromPointer: Y,
        destructorFunction(s) {
          M2(s);
        }
      });
    }, rn = (r, e, t, n, i, a) => {
      sr[r] = {
        name: R2(e),
        rawConstructor: S2(t, n),
        rawDestructor: S2(i, a),
        fields: []
      };
    }, en = (r, e, t, n, i, a, s, o, u2, f2) => {
      sr[r].fields.push({
        fieldName: R2(e),
        getterReturnType: t,
        getter: S2(n, i),
        getterContext: a,
        setterArgumentType: s,
        setter: S2(o, u2),
        setterContext: f2
      });
    }, tn = (r, e) => {
      e = R2(e), k(r, {
        isVoid: true,
        name: e,
        fromWireType: () => {
        },
        toWireType: (t, n) => {
        }
      });
    }, Wr = [], nn = (r) => {
      var e = Wr.length;
      return Wr.push(r), e;
    }, an = (r, e) => {
      var t = I2[r];
      return t === void 0 && g(`${e} has unknown type ${se(r)}`), t;
    }, sn = (r, e) => {
      for (var t = new Array(r), n = 0; n < r; ++n)
        t[n] = an(m2[e + n * 4 >> 2], `parameter ${n}`);
      return t;
    }, on = (r, e, t) => {
      var n = [], i = r(n, t);
      return n.length && (m2[e >> 2] = O2.toHandle(n)), i;
    }, un = {}, ve = (r) => {
      var e = un[r];
      return e === void 0 ? R2(r) : e;
    }, fn = (r, e, t) => {
      var n = 8, [i, ...a] = sn(r, e), s = i.toWireType.bind(i), o = a.map((v2) => v2.readValueFromPointer.bind(v2));
      r--;
      var u2 = new Array(r), f2 = (v2, y2, w2, P2) => {
        for (var T2 = 0, $ = 0; $ < r; ++$)
          u2[$] = o[$](P2 + T2), T2 += n;
        var b2;
        switch (t) {
          case 0:
            b2 = O2.toValue(v2).apply(null, u2);
            break;
          case 2:
            b2 = Reflect.construct(O2.toValue(v2), u2);
            break;
          case 3:
            b2 = u2[0];
            break;
          case 1:
            b2 = O2.toValue(v2)[ve(y2)](...u2);
            break;
        }
        return on(s, w2, b2);
      }, l2 = `methodCaller<(${a.map((v2) => v2.name)}) => ${i.name}>`;
      return nn(Rr(l2, f2));
    }, cn = (r) => r ? (r = ve(r), O2.toHandle(globalThis[r])) : O2.toHandle(globalThis), ln = (r) => {
      r > 9 && (H2[r + 1] += 1);
    }, vn = (r, e, t, n, i) => Wr[r](e, t, n, i), dn = (r) => {
      var e = O2.toValue(r);
      Tr(e), Or(r);
    }, pn = (r, e, t, n) => {
      var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1), s = new Date(i, 6, 1), o = a.getTimezoneOffset(), u2 = s.getTimezoneOffset(), f2 = Math.max(o, u2);
      m2[r >> 2] = f2 * 60, q[e >> 2] = +(o != u2);
      var l2 = (w2) => {
        var P2 = w2 >= 0 ? "-" : "+", T2 = Math.abs(w2), $ = String(Math.floor(T2 / 60)).padStart(2, "0"), b2 = String(T2 % 60).padStart(2, "0");
        return `UTC${P2}${$}${b2}`;
      }, v2 = l2(o), y2 = l2(u2);
      u2 < o ? (L2(v2, t, 17), L2(y2, n, 17)) : (L2(v2, n, 17), L2(y2, t, 17));
    }, hn = () => 2147483648, _n = (r, e) => Math.ceil(r / e) * e, gn = (r) => {
      var e = dr.buffer.byteLength, t = (r - e + 65535) / 65536 | 0;
      try {
        return dr.grow(t), Zr(), 1;
      } catch {
      }
    }, yn = (r) => {
      var e = W2.length;
      r >>>= 0;
      var t = hn();
      if (r > t)
        return false;
      for (var n = 1; n <= 4; n *= 2) {
        var i = e * (1 + 0.2 / n);
        i = Math.min(i, r + 100663296);
        var a = Math.min(t, _n(Math.max(r, i), 65536)), s = gn(a);
        if (s)
          return true;
      }
      return false;
    }, jr = {}, mn = () => Mr || "./this.program", Q = () => {
      if (!Q.strings) {
        var r = (typeof navigator == "object" && navigator.language || "C").replace("-", "_") + ".UTF-8", e = {
          USER: "web_user",
          LOGNAME: "web_user",
          PATH: "/",
          PWD: "/",
          HOME: "/home/web_user",
          LANG: r,
          _: mn()
        };
        for (var t in jr)
          jr[t] === void 0 ? delete e[t] : e[t] = jr[t];
        var n = [];
        for (var t in e)
          n.push(`${t}=${e[t]}`);
        Q.strings = n;
      }
      return Q.strings;
    }, bn = (r, e) => {
      var t = 0, n = 0;
      for (var i of Q()) {
        var a = e + t;
        m2[r + n >> 2] = a, t += L2(i, a, 1 / 0) + 1, n += 4;
      }
      return 0;
    }, wn = (r, e) => {
      var t = Q();
      m2[r >> 2] = t.length;
      var n = 0;
      for (var i of t)
        n += ce(i) + 1;
      return m2[e >> 2] = n, 0;
    }, $n = (r) => 52, Tn = (r, e, t, n) => 52;
    function Pn(r, e, t, n, i) {
      return 70;
    }
    var Cn = [null, [], []], Rn = (r, e) => {
      var t = Cn[r];
      e === 0 || e === 10 ? ((r === 1 ? Ir : x2)(Kr(t)), t.length = 0) : t.push(e);
    }, Fn = (r, e, t, n) => {
      for (var i = 0, a = 0; a < t; a++) {
        var s = m2[e >> 2], o = m2[e + 4 >> 2];
        e += 8;
        for (var u2 = 0; u2 < o; u2++)
          Rn(r, W2[s + u2]);
        i += o;
      }
      return m2[n >> 2] = i, 0;
    }, An = (r) => r;
    if (ht(), Ft(), c.noExitRuntime && c.noExitRuntime, c.print && (Ir = c.print), c.printErr && (x2 = c.printErr), c.wasmBinary && (X2 = c.wasmBinary), c.arguments && c.arguments, c.thisProgram && (Mr = c.thisProgram), c.preInit)
      for (typeof c.preInit == "function" && (c.preInit = [c.preInit]); c.preInit.length > 0; )
        c.preInit.shift()();
    var de, M2, Er, pe, d, he, _e, ge, ye, me, be, we, $e, dr, Te;
    function Sn(r) {
      de = r.Ea, M2 = c._free = r.Fa, Er = c._malloc = r.Ha, pe = r.Ia, d = r.Ja, he = r.Ka, _e = r.La, ge = r.Ma, ye = r.Na, me = r.Oa, be = r.Pa, D2.viijii = r.Qa, we = D2.iiijj = r.Ra, D2.jiji = r.Sa, $e = D2.jiiii = r.Ta, D2.iiiiij = r.Ua, D2.iiiiijj = r.Va, D2.iiiiiijj = r.Wa, dr = r.Ca, Te = r.Ga;
    }
    var kn = {
      s: Le,
      v: Xe,
      a: Ge,
      j: qe,
      m: Ye,
      S: Ke,
      q: Je,
      W: Qe,
      d: rt,
      Z: tt,
      ma: nt,
      ka: it,
      na: at,
      ja: st,
      ea: ot,
      za: ft,
      da: ct,
      ua: vt,
      xa: Wt,
      wa: Et,
      I: Dt,
      sa: Mt,
      $: It,
      O: Vt,
      y: Bt,
      t: Nt,
      ya: zt,
      ta: Lt,
      T: Qt,
      C: rn,
      Aa: en,
      va: tn,
      N: fn,
      Ba: Or,
      F: cn,
      U: ln,
      M: vn,
      oa: dn,
      fa: pn,
      ia: yn,
      ga: bn,
      ha: wn,
      X: $n,
      la: Tn,
      ba: Pn,
      Y: Fn,
      K: Qn,
      D: ti,
      P: Un,
      V: ui,
      r: qn,
      b: Dn,
      G: Jn,
      qa: ii,
      c: In,
      pa: ai,
      h: Mn,
      i: Bn,
      p: Zn,
      R: Kn,
      w: Xn,
      E: Gn,
      L: Yn,
      z: ni,
      J: fi,
      ca: ci,
      aa: li,
      g: Vn,
      k: On,
      e: En,
      f: jn,
      Q: oi,
      l: Wn,
      ra: ri,
      o: Ln,
      A: Nn,
      u: ei,
      _: zn,
      B: si,
      n: Hn,
      H: xn,
      x: An
    };
    function On(r, e) {
      var t = h2();
      try {
        _(r)(e);
      } catch (n) {
        if (p2(t), n !== n + 0) throw n;
        d(1, 0);
      }
    }
    function Wn(r, e, t, n, i) {
      var a = h2();
      try {
        _(r)(e, t, n, i);
      } catch (s) {
        if (p2(a), s !== s + 0) throw s;
        d(1, 0);
      }
    }
    function jn(r, e, t, n) {
      var i = h2();
      try {
        _(r)(e, t, n);
      } catch (a) {
        if (p2(i), a !== a + 0) throw a;
        d(1, 0);
      }
    }
    function En(r, e, t) {
      var n = h2();
      try {
        _(r)(e, t);
      } catch (i) {
        if (p2(n), i !== i + 0) throw i;
        d(1, 0);
      }
    }
    function Dn(r, e) {
      var t = h2();
      try {
        return _(r)(e);
      } catch (n) {
        if (p2(t), n !== n + 0) throw n;
        d(1, 0);
      }
    }
    function Mn(r, e, t, n) {
      var i = h2();
      try {
        return _(r)(e, t, n);
      } catch (a) {
        if (p2(i), a !== a + 0) throw a;
        d(1, 0);
      }
    }
    function Un(r, e, t, n, i, a) {
      var s = h2();
      try {
        return _(r)(e, t, n, i, a);
      } catch (o) {
        if (p2(s), o !== o + 0) throw o;
        d(1, 0);
      }
    }
    function In(r, e, t) {
      var n = h2();
      try {
        return _(r)(e, t);
      } catch (i) {
        if (p2(n), i !== i + 0) throw i;
        d(1, 0);
      }
    }
    function Vn(r) {
      var e = h2();
      try {
        _(r)();
      } catch (t) {
        if (p2(e), t !== t + 0) throw t;
        d(1, 0);
      }
    }
    function Hn(r, e, t, n, i, a, s, o, u2, f2, l2) {
      var v2 = h2();
      try {
        _(r)(e, t, n, i, a, s, o, u2, f2, l2);
      } catch (y2) {
        if (p2(v2), y2 !== y2 + 0) throw y2;
        d(1, 0);
      }
    }
    function Bn(r, e, t, n, i) {
      var a = h2();
      try {
        return _(r)(e, t, n, i);
      } catch (s) {
        if (p2(a), s !== s + 0) throw s;
        d(1, 0);
      }
    }
    function Nn(r, e, t, n, i, a, s) {
      var o = h2();
      try {
        _(r)(e, t, n, i, a, s);
      } catch (u2) {
        if (p2(o), u2 !== u2 + 0) throw u2;
        d(1, 0);
      }
    }
    function xn(r, e, t, n, i, a, s, o, u2, f2, l2, v2, y2, w2, P2, T2) {
      var $ = h2();
      try {
        _(r)(e, t, n, i, a, s, o, u2, f2, l2, v2, y2, w2, P2, T2);
      } catch (b2) {
        if (p2($), b2 !== b2 + 0) throw b2;
        d(1, 0);
      }
    }
    function zn(r, e, t, n, i, a, s, o, u2) {
      var f2 = h2();
      try {
        _(r)(e, t, n, i, a, s, o, u2);
      } catch (l2) {
        if (p2(f2), l2 !== l2 + 0) throw l2;
        d(1, 0);
      }
    }
    function Zn(r, e, t, n, i, a) {
      var s = h2();
      try {
        return _(r)(e, t, n, i, a);
      } catch (o) {
        if (p2(s), o !== o + 0) throw o;
        d(1, 0);
      }
    }
    function Ln(r, e, t, n, i, a) {
      var s = h2();
      try {
        _(r)(e, t, n, i, a);
      } catch (o) {
        if (p2(s), o !== o + 0) throw o;
        d(1, 0);
      }
    }
    function Xn(r, e, t, n, i, a, s) {
      var o = h2();
      try {
        return _(r)(e, t, n, i, a, s);
      } catch (u2) {
        if (p2(o), u2 !== u2 + 0) throw u2;
        d(1, 0);
      }
    }
    function Gn(r, e, t, n, i, a, s, o) {
      var u2 = h2();
      try {
        return _(r)(e, t, n, i, a, s, o);
      } catch (f2) {
        if (p2(u2), f2 !== f2 + 0) throw f2;
        d(1, 0);
      }
    }
    function qn(r) {
      var e = h2();
      try {
        return _(r)();
      } catch (t) {
        if (p2(e), t !== t + 0) throw t;
        d(1, 0);
      }
    }
    function Yn(r, e, t, n, i, a, s, o, u2) {
      var f2 = h2();
      try {
        return _(r)(e, t, n, i, a, s, o, u2);
      } catch (l2) {
        if (p2(f2), l2 !== l2 + 0) throw l2;
        d(1, 0);
      }
    }
    function Kn(r, e, t, n, i, a, s) {
      var o = h2();
      try {
        return _(r)(e, t, n, i, a, s);
      } catch (u2) {
        if (p2(o), u2 !== u2 + 0) throw u2;
        d(1, 0);
      }
    }
    function Jn(r, e, t, n) {
      var i = h2();
      try {
        return _(r)(e, t, n);
      } catch (a) {
        if (p2(i), a !== a + 0) throw a;
        d(1, 0);
      }
    }
    function Qn(r, e, t, n) {
      var i = h2();
      try {
        return _(r)(e, t, n);
      } catch (a) {
        if (p2(i), a !== a + 0) throw a;
        d(1, 0);
      }
    }
    function ri(r, e, t, n, i, a, s, o) {
      var u2 = h2();
      try {
        _(r)(e, t, n, i, a, s, o);
      } catch (f2) {
        if (p2(u2), f2 !== f2 + 0) throw f2;
        d(1, 0);
      }
    }
    function ei(r, e, t, n, i, a, s, o) {
      var u2 = h2();
      try {
        _(r)(e, t, n, i, a, s, o);
      } catch (f2) {
        if (p2(u2), f2 !== f2 + 0) throw f2;
        d(1, 0);
      }
    }
    function ti(r, e, t, n, i, a) {
      var s = h2();
      try {
        return _(r)(e, t, n, i, a);
      } catch (o) {
        if (p2(s), o !== o + 0) throw o;
        d(1, 0);
      }
    }
    function ni(r, e, t, n, i, a, s, o, u2, f2) {
      var l2 = h2();
      try {
        return _(r)(e, t, n, i, a, s, o, u2, f2);
      } catch (v2) {
        if (p2(l2), v2 !== v2 + 0) throw v2;
        d(1, 0);
      }
    }
    function ii(r, e, t) {
      var n = h2();
      try {
        return _(r)(e, t);
      } catch (i) {
        if (p2(n), i !== i + 0) throw i;
        d(1, 0);
      }
    }
    function ai(r, e, t, n, i) {
      var a = h2();
      try {
        return _(r)(e, t, n, i);
      } catch (s) {
        if (p2(a), s !== s + 0) throw s;
        d(1, 0);
      }
    }
    function si(r, e, t, n, i, a, s, o, u2, f2) {
      var l2 = h2();
      try {
        _(r)(e, t, n, i, a, s, o, u2, f2);
      } catch (v2) {
        if (p2(l2), v2 !== v2 + 0) throw v2;
        d(1, 0);
      }
    }
    function oi(r, e, t, n, i, a, s) {
      var o = h2();
      try {
        _(r)(e, t, n, i, a, s);
      } catch (u2) {
        if (p2(o), u2 !== u2 + 0) throw u2;
        d(1, 0);
      }
    }
    function ui(r, e, t, n) {
      var i = h2();
      try {
        return _(r)(e, t, n);
      } catch (a) {
        if (p2(i), a !== a + 0) throw a;
        d(1, 0);
      }
    }
    function fi(r, e, t, n, i, a, s, o, u2, f2, l2, v2) {
      var y2 = h2();
      try {
        return _(r)(e, t, n, i, a, s, o, u2, f2, l2, v2);
      } catch (w2) {
        if (p2(y2), w2 !== w2 + 0) throw w2;
        d(1, 0);
      }
    }
    function ci(r, e, t, n, i, a, s) {
      var o = h2();
      try {
        return we(r, e, t, n, i, a, s);
      } catch (u2) {
        if (p2(o), u2 !== u2 + 0) throw u2;
        d(1, 0);
      }
    }
    function li(r, e, t, n, i) {
      var a = h2();
      try {
        return $e(r, e, t, n, i);
      } catch (s) {
        if (p2(a), s !== s + 0) throw s;
        d(1, 0);
      }
    }
    function vi() {
      Ee();
      function r() {
        var e, t;
        c.calledRun = true, !Vr && (De(), (e = Hr) === null || e === void 0 || e(c), (t = c.onRuntimeInitialized) === null || t === void 0 || t.call(c), Me());
      }
      c.setStatus ? (c.setStatus("Running..."), setTimeout(() => {
        setTimeout(() => c.setStatus(""), 1), r();
      }, 1)) : r();
    }
    var rr;
    return rr = await xe(), vi(), zr ? A2 = c : A2 = new Promise((r, e) => {
      Hr = r, Br = e;
    }), A2;
  }
  function Ae(C) {
    return S(_r, C);
  }
  function Ti(C) {
    Ae({
      overrides: C,
      equalityFn: Object.is,
      fireImmediately: false
    });
  }
  async function Se(C, A2) {
    return Z(_r, C, A2);
  }

  // bundle-entry.js
  Ti({
    locateFile: (path, prefix) => {
      if (path.endsWith(".wasm")) {
        return `https://cdn.jsdelivr.net/npm/zxing-wasm@1.2.15/dist/${path}`;
      }
      return prefix + path;
    }
  });
  window.ZXingScanner = {
    readBarcodes: Se
  };
})();
