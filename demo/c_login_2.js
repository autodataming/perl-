var navigator = {"appName": "Netscape"};
var window = {};
var $ = {};

var document = {};  document.cookie = "sdfdsfdsfsf";
var pt={};
function pluginBegin() {
    if (!$.sso_loadComplete)
        try {
            $.checkNPPlugin()
        } catch (t) {}
    $.sso_loadComplete = !0,
    $.report.setSpeedPoint($.plugin_isd_flag, 1, (new Date).getTime()),
    window.setTimeout(function() {
        $.report.isdSpeed($.plugin_isd_flag, .05)
    }, 2e3)
}
function ptui_qlogin_CB(t, e, i) {
    switch (window.clearTimeout(pt.qlogin.__getstClock),
    ptui_qlogin_CB.called = !0,
    t) {
    case "0":
        pt.plogin.redirect(pt.ptui.target, e);
        break;
    case "10006":
        pt.plogin.force_qrlogin(),
        pt.plogin.show_err(i, !0);
        break;
    default:
        pt.plogin.switchpage(1),
        pt.plogin.show_err(i, !0)
    }
}
function ptui_getuins_CB(t) {
    if (clearTimeout(pt.qlogin.__getuinsClock),
    t && !ptui_getuins_CB.called) {
        ptui_getuins_CB.called = !0,
        pt.plogin.hide_err();
        for (var e = [], i = 0; i < t.length; i++) {
            var n = t[i];
            e.push({
                uin: n.uin,
                name: n.account,
                uinString: n.uin,
                type: 0,
                face: n.face_index,
                nick: n.nickname,
                flag: n.uin_flag,
                loginType: pt.qlogin.PCSvrQlogin
            })
        }
        pt.plogin.initQlogin("", e),
        pt.qlogin.initFace(),
        $.report.monitor(508158, 1),
        __pt_ieZeroLogin && $.report.monitor(2129653, 1),
        __pt_webkitZeroLogin && $.report.monitor(2129655, 1),
        window.localStorage && localStorage.setItem("newQQ", !0)
    }
}
function ptui_getst_CB(t) {
    t && (ptui_getst_CB.called = !0,
    pt.plogin.hideLoading(),
    ptui_getst_CB.submitUrl && $.http.loadScript(ptui_getst_CB.submitUrl.replace("{{hash_clientkey}}", 2147483647 & $.str.time33($.cookie.get("clientkey")))),
    $.report.monitor(508159, 1))
}
function ptuiCB(t, e, i, n, o) {
    function r() {
        pt.plogin.is_mibao(i) && (i += "&style=" + pt.ptui.style + "&proxy_url=" + encodeURIComponent(pt.ptui.proxy_url),
        i += "#login_href=" + encodeURIComponent(pt.ptui.href)),
        pt.plogin.redirect(n, i)
    }
    var p = $("p")
      , a = pt.plogin.at_account && (p.value || pt.plogin.armSafeEdit.safepwd);
    clearTimeout(pt.plogin.loginClock),
    a && (pt.plogin.lastCheckAccount = ""),
    pt.plogin.hasSubmit = !0;
    var s = !1;
    switch (t) {
    case "0":
        a || pt.plogin.is_mibao(i) ? r() : (window.clearInterval(pt.plogin.qrlogin_clock),
        r());
        break;
    case "3":
        $("p").value = "",
        pt.plogin.domFocus($("p")),
        pt.plogin.passwordErrorNum++,
        ("101" == e || "102" == e || "103" == e) && pt.plogin.showVC(),
        pt.plogin.check();
        break;
    case "4":
        pt.plogin.check();
        break;
    case "12":
    case "51":
        s = !0;
        break;
    case "65":
        return void (0 != pt.plogin.onekeyVerifyClock ? pt.plogin.onekeyVerify("invalid") : pt.plogin.set_qrlogin_invalid());
    case "66":
        return;
    case "67":
        return void pt.plogin.go_qrlogin_step(2);
    case "22005":
    case "68":
        pt.plogin.onekeyVerify("hide");
        break;
    case "10005":
    case "10006":
        pt.plogin.force_qrlogin();
        break;
    case "10008":
        return void pt.plogin.onekeyVerify("normal", e, o);
    default:
        pt.plogin.needVc && !pt.plogin.needShowNewVc ? pt.plogin.changeVC() : pt.plogin.check()
    }
    if (0 != t && a && pt.plogin.show_err(o, s),
    !pt.plogin.hasCheck && a && (pt.plogin.needShowNewVc || pt.plogin.showVC(),
    $("verifycode").focus(),
    $("verifycode").select()),
    Math.random() < .2) {
        pt.plogin.isdTime["7808-7-2-1"] = (new Date).getTime();
        var l = 1;
        pt.ptui.isHttps && (l = 2);
        var c = "flag1=7808&flag2=7&flag3=2&" + l + "=" + (pt.plogin.isdTime["7808-7-2-1"] - pt.plogin.isdTime["7808-7-2-0"]);
        $.report.simpleIsdSpeed(c)
    }
}
function ptui_checkVC(t, e, i, n, o) {
    switch (clearTimeout(pt.plogin.checkClock),
    pt.plogin.isRandSalt = o,
    pt.plogin.salt = i,
    pt.plogin.checkRet = t,
    "2" == t ? pt.plogin.loginState == pt.LoginState.PLogin && pt.plogin.show_err(pt.str.inv_uin) : "3" == t || !pt.plogin.hasSubmit,
    t + "") {
    case "0":
    case "2":
    case "3":
        pt.plogin.hideVC(),
        "1" == pt.ptui.pt_vcode_v1 && (pt.plogin.needShowNewVc = !1),
        $("verifycode").value = e || "abcd",
        pt.plogin.needVc = !1,
        $.report.monitor("330321", .05),
        e || $.report.nlog("check no code return,ret=" + t + ",code=" + e + ",uin=" + $.str.bin2String(i));
        break;
    case "1":
        pt.plogin.cap_cd = e,
        "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.needShowNewVc = !0 : (pt.plogin.showVC(),
        $.css.show($("vc_tips"))),
        pt.plogin.needVc = !0,
        $.report.monitor("330320", .05)
    }
    pt.plogin.pt_verifysession = n,
    pt.plogin.domFocus($("p")),
    pt.plogin.hasCheck = !0,
    pt.plogin.checkTime = (new Date).getTime(),
    pt.plogin.check.cb && pt.plogin.check.cb()
}
function ptui_auth_CB(t, e) {
    switch (parseInt(t)) {
    case 0:
        pt.plogin.authUin = $.cookie.get("superuin").replace(/^o0*/, ""),
        pt.plogin.authSubmitUrl = e,
        pt.plogin.init(e);
        break;
    case 1:
        pt.plogin.init();
        break;
    case 2:
        var i = e + "&regmaster=" + pt.ptui.regmaster + "&aid=" + pt.ptui.appid + "&s_url=" + encodeURIComponent(pt.ptui.s_url);
        "1" == pt.ptui.pt_light && (i += "&pt_light=1"),
        pt.plogin.redirect(pt.ptui.target, i);
        break;
    default:
        pt.preload.init()
    }
}
!window.console && (window.console = {
    log: function() {},
    warn: function() {},
    error: function() {}
});


var $ = window.Simple = function(t) {
    return "string" == typeof t ? document.getElementById(t) : t
}
;
$.cookie = {
    get: function(t) {
        var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return e ? decodeURIComponent(e[2]) : ""
    },
    getOrigin: function(t) {
        var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return e ? e[2] : ""
    },
    set: function(t, e, i, n, o) {
        var r = new Date;
        o ? (r.setTime(r.getTime() + 36e5 * o),
        document.cookie = t + "=" + e + "; expires=" + r.toGMTString() + "; path=" + (n ? n : "/") + "; " + (i ? "domain=" + i + ";" : "")) : document.cookie = t + "=" + e + "; path=" + (n ? n : "/") + "; " + (i ? "domain=" + i + ";" : "")
    },
    del: function(t, e, i) {
        document.cookie = t + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (i ? i : "/") + "; " + (e ? "domain=" + e + ";" : "")
    },
    uin: function() {
        var t = $.cookie.get("uin");
        return t ? parseInt(t.substring(1, t.length), 10) : null 
    }
},
$.http = {
    getXHR: function() {
        return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest
    },
    ajax: function(url, para, cb, method, type) {
        var xhr = $.http.getXHR();
        return xhr.open(method, url),
        xhr.onreadystatechange = function() {
            4 == xhr.readyState && (xhr.status >= 200 && xhr.status < 300 || 304 === xhr.status || 1223 === xhr.status || 0 === xhr.status ? "undefined" == typeof type && xhr.responseText ? cb(eval("(" + xhr.responseText + ")")) : (cb(xhr.responseText),
            !xhr.responseText && $.badjs._smid && $.badjs("HTTP Empty[xhr.status]:" + xhr.status, url, 0, $.badjs._smid)) : $.badjs._smid && $.badjs("HTTP Error[xhr.status]:" + xhr.status, url, 0, $.badjs._smid),
            xhr = null )
        }
        ,
        xhr.send(para),
        xhr
    },
    post: function(t, e, i, n) {
        var o = "";
        for (var r in e)
            o += "&" + r + "=" + e[r];
        return $.http.ajax(t, o, i, "POST", n)
    },
    get: function(t, e, i, n) {
        var o = [];
        for (var r in e)
            o.push(r + "=" + e[r]);
        return -1 == t.indexOf("?") && (t += "?"),
        t += o.join("&"),
        $.http.ajax(t, null , i, "GET", n)
    },
    jsonp: function(t) {
        var e = document.createElement("script");
        e.src = t,
        document.getElementsByTagName("head")[0].appendChild(e)
    },
    loadScript: function(t, e) {
        var i = document.createElement("script");
        i.onload = i.onreadystatechange = function() {
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || ("function" == typeof e && e(),
            i.onload = i.onreadystatechange = null ,
            i.parentNode && i.parentNode.removeChild(i))
        }
        ,
        i.src = t,
        document.getElementsByTagName("head")[0].appendChild(i)
    },
    preload: function(t) {
        var e = document.createElement("img");
        e.src = t,
        e = null 
    }
},
$.get = $.http.get,
$.post = $.http.post,
$.jsonp = $.http.jsonp,
$.browser = function(t) {
    if ("undefined" == typeof $.browser.info) {
        var e = {
            type: ""
        }
          , i = navigator.userAgent.toLowerCase();
        /webkit/.test(i) ? e = {
            type: "webkit",
            version: /webkit[\/ ]([\w.]+)/
        } : /opera/.test(i) ? e = {
            type: "opera",
            version: /version/.test(i) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/
        } : /msie/.test(i) ? e = {
            type: "msie",
            version: /msie ([\w.]+)/
        } : /mozilla/.test(i) && !/compatible/.test(i) && (e = {
            type: "ff",
            version: /rv:([\w.]+)/
        }),
        e.version = (e.version && e.version.exec(i) || [0, "0"])[1],
        $.browser.info = e
    }
    return $.browser.info[t]
}
,
$.e = {
    _counter: 0,
    _uid: function() {
        return "h" + $.e._counter++
    },
    add: function(t, e, i) {
        if ("object" != typeof t && (t = $(t)),
        document.addEventListener)
            t.addEventListener(e, i, !1);
        else if (document.attachEvent) {
            if (-1 != $.e._find(t, e, i))
                return;
            var n = function(e) {
                e || (e = window.event);
                var n = {
                    _event: e,
                    type: e.type,
                    target: e.srcElement,
                    currentTarget: t,
                    relatedTarget: e.fromElement ? e.fromElement : e.toElement,
                    eventPhase: e.srcElement == t ? 2 : 3,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    altKey: e.altKey,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    keyCode: e.keyCode,
                    data: e.data,
                    origin: e.origin,
                    stopPropagation: function() {
                        this._event.cancelBubble = !0
                    },
                    preventDefault: function() {
                        this._event.returnValue = !1
                    }
                };
                Function.prototype.call ? i.call(t, n) : (t._currentHandler = i,
                t._currentHandler(n),
                t._currentHandler = null )
            }
            ;
            t.attachEvent("on" + e, n);
            var o = {
                element: t,
                eventType: e,
                handler: i,
                wrappedHandler: n
            }
              , r = t.document || t
              , p = r.parentWindow
              , a = $.e._uid();
            p._allHandlers || (p._allHandlers = {}),
            p._allHandlers[a] = o,
            t._handlers || (t._handlers = []),
            t._handlers.push(a),
            p._onunloadHandlerRegistered || (p._onunloadHandlerRegistered = !0,
            p.attachEvent("onunload", $.e._removeAllHandlers))
        }
    },
    remove: function(t, e, i) {
        if (document.addEventListener)
            t.removeEventListener(e, i, !1);
        else if (document.attachEvent) {
            var n = $.e._find(t, e, i);
            if (-1 == n)
                return;
            var o = t.document || t
              , r = o.parentWindow
              , p = t._handlers[n]
              , a = r._allHandlers[p];
            t.detachEvent("on" + e, a.wrappedHandler),
            t._handlers.splice(n, 1),
            delete r._allHandlers[p]
        }
    },
    _find: function(t, e, i) {
        var n = t._handlers;
        if (!n)
            return -1;
        for (var o = t.document || t, r = o.parentWindow, p = n.length - 1; p >= 0; p--) {
            var a = n[p]
              , s = r._allHandlers[a];
            if (s.eventType == e && s.handler == i)
                return p
        }
        return -1
    },
    _removeAllHandlers: function() {
        var t = this;
        for (id in t._allHandlers) {
            var e = t._allHandlers[id];
            e.element.detachEvent("on" + e.eventType, e.wrappedHandler),
            delete t._allHandlers[id]
        }
    },
    src: function(t) {
        return t ? t.target : event.srcElement
    },
    stopPropagation: function(t) {
        t ? t.stopPropagation() : event.cancelBubble = !0
    },
    trigger: function(t, e) {
        var i = {
            HTMLEvents: "abort,blur,change,error,focus,load,reset,resize,scroll,select,submit,unload",
            UIEevents: "keydown,keypress,keyup",
            MouseEvents: "click,mousedown,mousemove,mouseout,mouseover,mouseup"
        };
        if (document.createEvent) {
            var n = "";
            "mouseleave" == e && (e = "mouseout"),
            "mouseenter" == e && (e = "mouseover");
            for (var o in i)
                if (i[o].indexOf(e)) {
                    n = o;
                    break
                }
            var r = document.createEvent(n);
            r.initEvent(e, !0, !1),
            t.dispatchEvent(r)
        } else
            document.createEventObject && t.fireEvent("on" + e)
    }
},
$.bom = {
    query: function(t) {
        var e = window.location.search.match(new RegExp("(\\?|&)" + t + "=([^&]*)(&|$)"));
        return e ? decodeURIComponent(e[2]) : ""
    },
    getHash: function(t) {
        var e = window.location.hash.match(new RegExp("(#|&)" + t + "=([^&]*)(&|$)"));
        return e ? decodeURIComponent(e[2]) : ""
    }
},
$.winName = {
    set: function(t, e) {
        var i = window.name || "";
        window.name = i.match(new RegExp(";" + t + "=([^;]*)(;|$)")) ? i.replace(new RegExp(";" + t + "=([^;]*)"), ";" + t + "=" + e) : i + ";" + t + "=" + e
    },
    get: function(t) {
        var e = window.name || ""
          , i = e.match(new RegExp(";" + t + "=([^;]*)(;|$)"));
        return i ? i[1] : ""
    },
    clear: function(t) {
        var e = window.name || "";
        window.name = e.replace(new RegExp(";" + t + "=([^;]*)"), "")
    }
},
$.localData = function() {
    function t() {
        var t = document.createElement("link");
        return t.style.display = "none",
        t.id = o,
        document.getElementsByTagName("head")[0].appendChild(t),
        t.addBehavior("#default#userdata"),
        t
    }
    function e() {
        if ("undefined" == typeof n)
            if (window.localStorage)
                n = localStorage;
            else
                try {
                    n = t(),
                    n.load(o)
                } catch (e) {
                    return n = !1,
                    !1
                }
        return !0
    }
    function i(t) {
        return "string" != typeof t ? !1 : r.test(t)
    }
    var n, o = "ptlogin2.qq.com", r = /^[0-9A-Za-z_-]*$/;
    return {
        set: function(t, r) {
            var p = !1;
            if (i(t) && e())
                try {
                    r += "",
                    window.localStorage ? (n.setItem(t, r),
                    p = !0) : (n.setAttribute(t, r),
                    n.save(o),
                    p = n.getAttribute(t) === r)
                } catch (a) {}
            return p
        },
        get: function(t) {
            if (i(t) && e())
                try {
                    return window.localStorage ? n.getItem(t) : n.getAttribute(t)
                } catch (o) {}
            return null 
        },
        remove: function(t) {
            if (i(t) && e())
                try {
                    return window.localStorage ? n.removeItem(t) : n.removeAttribute(t),
                    !0
                } catch (o) {}
            return !1
        }
    }
}(),
$.str = function() {
    var htmlDecodeDict = {
        quot: '"',
        lt: "<",
        gt: ">",
        amp: "&",
        nbsp: " ",
        "#34": '"',
        "#60": "<",
        "#62": ">",
        "#38": "&",
        "#160": " "
    }
      , htmlEncodeDict = {
        '"': "#34",
        "<": "#60",
        ">": "#62",
        "&": "#38",
        " ": "#160"
    };
    return {
        decodeHtml: function(t) {
            return t += "",
            t.replace(/&(quot|lt|gt|amp|nbsp);/gi, function(t, e) {
                return htmlDecodeDict[e]
            }).replace(/&#u([a-f\d]{4});/gi, function(t, e) {
                return String.fromCharCode(parseInt("0x" + e))
            }).replace(/&#(\d+);/gi, function(t, e) {
                return String.fromCharCode(+e)
            })
        },
        encodeHtml: function(t) {
            return t += "",
            t.replace(/["<>& ]/g, function(t) {
                return "&" + htmlEncodeDict[t] + ";"
            })
        },
        trim: function(t) {
            t += "";
            for (var t = t.replace(/^\s+/, ""), e = /\s/, i = t.length; e.test(t.charAt(--i)); )
                ;
            return t.slice(0, i + 1)
        },
        uin2hex: function(str) {
            var maxLength = 16;
            str = parseInt(str);
            for (var hex = str.toString(16), len = hex.length, i = len; maxLength > i; i++)
                hex = "0" + hex;
            for (var arr = [], j = 0; maxLength > j; j += 2)
                arr.push("\\x" + hex.substr(j, 2));
            var result = arr.join("");
            return eval('result="' + result + '"'),
            result
        },
        bin2String: function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t.charCodeAt(i).toString(16);
                1 == o.length && (o = "0" + o),
                e.push(o)
            }
            return e = "0x" + e.join(""),
            e = parseInt(e, 16)
        },
        str2bin: function(str) {
            for (var arr = [], i = 0; i < str.length; i += 2)
                arr.push(eval("'\\x" + str.charAt(i) + str.charAt(i + 1) + "'"));
            return arr.join("")
        },
        utf8ToUincode: function(t) {
            var e = "";
            try {
                var n = t.length
                  , o = [];
                for (i = 0; i < n; i += 2)
                    o.push("%" + t.substr(i, 2));
                e = decodeURIComponent(o.join("")),
                e = $.str.decodeHtml(e)
            } catch (r) {
                e = ""
            }
            return e
        },
        json2str: function(t) {
            var e = "";
            if ("undefined" != typeof JSON)
                e = JSON.stringify(t);
            else {
                var i = [];
                for (var n in t)
                    i.push('"' + n + '":"' + t[n] + '"');
                e = "{" + i.join(",") + "}"
            }
            return e
        },
        time33: function(t) {
            for (var e = 0, i = 0, n = t.length; n > i; i++)
                e = (33 * e + t.charCodeAt(i)) % 4294967296;
            return e
        }
    }
}(),
$.css = function() {
    var t = document.documentElement;
    return {
        getPageScrollTop: function() {
            return window.pageYOffset || t.scrollTop || document.body.scrollTop || 0
        },
        getPageScrollLeft: function() {
            return window.pageXOffset || t.scrollLeft || document.body.scrollLeft || 0
        },
        getOffsetPosition: function(e) {
            e = $(e);
            var i = 0
              , n = 0;
            if (t.getBoundingClientRect && e.getBoundingClientRect) {
                var o = e.getBoundingClientRect()
                  , r = t.clientTop || document.body.clientTop || 0
                  , p = t.clientLeft || document.body.clientLeft || 0;
                i = o.top + this.getPageScrollTop() - r,
                n = o.left + this.getPageScrollLeft() - p
            } else
                do
                    i += e.offsetTop || 0,
                    n += e.offsetLeft || 0,
                    e = e.offsetParent;
                while (e);return {
                left: n,
                top: i
            }
        },
        getWidth: function(t) {
            return $(t).offsetWidth
        },
        getHeight: function(t) {
            return $(t).offsetHeight
        },
        show: function(t) {
            t.style.display = "block"
        },
        hide: function(t) {
            t.style.display = "none"
        },
        hasClass: function(t, e) {
            if (!t.className)
                return !1;
            for (var i = t.className.split(" "), n = 0, o = i.length; o > n; n++)
                if (e == i[n])
                    return !0;
            return !1
        },
        addClass: function(t, e) {
            $.css.updateClass(t, e, !1)
        },
        removeClass: function(t, e) {
            $.css.updateClass(t, !1, e)
        },
        updateClass: function(t, e, i) {
            for (var n = t.className.split(" "), o = {}, r = 0, p = n.length; p > r; r++)
                n[r] && (o[n[r]] = !0);
            if (e) {
                var a = e.split(" ");
                for (r = 0,
                p = a.length; p > r; r++)
                    a[r] && (o[a[r]] = !0)
            }
            if (i) {
                var s = i.split(" ");
                for (r = 0,
                p = s.length; p > r; r++)
                    s[r] && delete o[s[r]]
            }
            var l = [];
            for (var c in o)
                l.push(c);
            t.className = l.join(" ")
        },
        setClass: function(t, e) {
            t.className = e
        }
    }
}(),
$.animate = {
    fade: function(t, e, i, n, o) {
        if (t = $(t)) {
            t.effect || (t.effect = {});
            var r = Object.prototype.toString.call(e)
              , p = 100;
            isNaN(e) ? "[object Object]" == r && e && e.to && (isNaN(e.to) || (p = e.to),
            isNaN(e.from) || (t.style.opacity = e.from / 100,
            t.style.filter = "alpha(opacity=" + e.from + ")")) : p = e,
            "undefined" == typeof t.effect.fade && (t.effect.fade = 0),
            window.clearInterval(t.effect.fade);
            var i = i || 1
              , n = n || 20
              , a = window.navigator.userAgent.toLowerCase()
              , s = function(t) {
                var e;
                if (-1 != a.indexOf("msie")) {
                    var i = (t.currentStyle || {}).filter || "";
                    e = i.indexOf("opacity") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) + "" : "100"
                } else {
                    var n = t.ownerDocument.defaultView;
                    n = n && n.getComputedStyle,
                    e = 100 * (n && n(t, null ).opacity || 1)
                }
                return parseFloat(e)
            }
              , l = s(t)
              , c = p > l ? 1 : -1;
            -1 != a.indexOf("msie") && 15 > n && (i = Math.floor(15 * i / n),
            n = 15);
            var u = function() {
                l += i * c,
                (Math.round(l) - p) * c >= 0 ? (t.style.opacity = p / 100,
                t.style.filter = "alpha(opacity=" + p + ")",
                window.clearInterval(t.effect.fade),
                "function" == typeof o && o(t)) : (t.style.opacity = l / 100,
                t.style.filter = "alpha(opacity=" + l + ")")
            }
            ;
            t.effect.fade = window.setInterval(u, n)
        }
    },
    animate: function(t, e, i, n, o) {
        if (t = $(t)) {
            t.effect || (t.effect = {}),
            "undefined" == typeof t.effect.animate && (t.effect.animate = 0);
            for (var r in e)
                e[r] = parseInt(e[r]) || 0;
            window.clearInterval(t.effect.animate);
            var i = i || 10
              , n = n || 20
              , p = function(t) {
                var e = {
                    left: t.offsetLeft,
                    top: t.offsetTop
                };
                return e
            }
              , a = p(t)
              , s = {
                width: t.clientWidth,
                height: t.clientHeight,
                left: a.left,
                top: a.top
            }
              , l = []
              , c = window.navigator.userAgent.toLowerCase();
            if (-1 == c.indexOf("msie") || "BackCompat" != document.compatMode) {
                var u = document.defaultView ? document.defaultView.getComputedStyle(t, null ) : t.currentStyle
                  , g = e.width || 0 == e.width ? parseInt(e.width) : null 
                  , d = e.height || 0 == e.height ? parseInt(e.height) : null ;
                "number" == typeof g && (l.push("width"),
                e.width = g - u.paddingLeft.replace(/\D/g, "") - u.paddingRight.replace(/\D/g, "")),
                "number" == typeof d && (l.push("height"),
                e.height = d - u.paddingTop.replace(/\D/g, "") - u.paddingBottom.replace(/\D/g, "")),
                15 > n && (i = Math.floor(15 * i / n),
                n = 15)
            }
            var h = e.left || 0 == e.left ? parseInt(e.left) : null 
              , f = e.top || 0 == e.top ? parseInt(e.top) : null ;
            "number" == typeof h && (l.push("left"),
            t.style.position = "absolute"),
            "number" == typeof f && (l.push("top"),
            t.style.position = "absolute");
            for (var m = [], _ = l.length, r = 0; _ > r; r++)
                m[l[r]] = s[l[r]] < e[l[r]] ? 1 : -1;
            var v = t.style
              , w = function() {
                for (var n = !0, r = 0; _ > r; r++)
                    s[l[r]] = s[l[r]] + m[l[r]] * Math.abs(e[l[r]] - s[l[r]]) * i / 100,
                    (Math.round(s[l[r]]) - e[l[r]]) * m[l[r]] >= 0 ? (n = n && !0,
                    v[l[r]] = e[l[r]] + "px") : (n = n && !1,
                    v[l[r]] = s[l[r]] + "px");
                n && (window.clearInterval(t.effect.animate),
                "function" == typeof o && o(t))
            }
            ;
            t.effect.animate = window.setInterval(w, n)
        }
    }
},
$.check = {
    isHttps: function() {
        return "https:" == document.location.protocol
    },
    isSsl: function() {
        var t = document.location.host;
        return /^ssl./i.test(t)
    },
    isIpad: function() {
        var t = navigator.userAgent.toLowerCase();
        return /ipad/i.test(t)
    },
    isQQ: function(t) {
        return /^[1-9]{1}\d{4,9}$/.test(t)
    },
    isQQMail: function(t) {
        return /^[1-9]{1}\d{4,9}@qq\.com$/.test(t)
    },
    isNullQQ: function(t) {
        return /^\d{1,4}$/.test(t)
    },
    isNick: function(t) {
        return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(t)
    },
    isName: function(t) {
        return "<请输入帐号>" == t ? !1 : /[\u4E00-\u9FA5]{1,8}/.test(t)
    },
    isPhone: function(t) {
        return /^(?:86|886|)1\d{10}\s*$/.test(t)
    },
    isDXPhone: function(t) {
        return /^(?:86|886|)1(?:33|53|80|81|89)\d{8}$/.test(t)
    },
    isSeaPhone: function(t) {
        return /^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(t)
    },
    isMail: function(t) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t)
    },
    isQiyeQQ800: function(t) {
        return /^(800)\d{7}$/.test(t)
    },
    isPassword: function(t) {
        return t && t.length >= 16
    },
    isForeignPhone: function(t) {
        return /^00\d{7,}/.test(t)
    },
    needVip: function(t) {
        for (var e = ["21001601", "21000110", "21000121", "46000101", "716027609", "716027610", "549000912", "637009801"], i = !0, n = 0, o = e.length; o > n; n++)
            if (e[n] == t) {
                i = !1;
                break
            }
        return i
    },
    isPaipai: function() {
        return /paipai.com$/.test(window.location.hostname)
    },
    is_weibo_appid: function(t) {
        return 46000101 == t || 607000101 == t || 558032501 == t ? !0 : !1
    }
},
$.report = {
    monitor: function(t, e) {
        if (!(Math.random() > (e || 1)))
            try {
                var i = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t;
                $.http.preload(i)
            } catch (n) {}
    },
    nlog: function(t, e, i, n) {
        if (!(Math.random() >= (i || 1)))
            try {
                var o = "https:" == location.protocol ? "https://ssl.qq.com/ptlogin/cgi-bin/ptlogin_report?" : "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?"
                  , r = encodeURIComponent(t + "|_|" + location.href + "|_|" + window.navigator.userAgent);
                e = e ? e : 0,
                n && (o += "u=" + n + "&"),
                o += "id=" + e + "&msg=" + r + "&v=" + Math.random(),
                $.http.preload(o)
            } catch (p) {}
    },
    simpleIsdSpeed: function(t, e) {
        if (Math.random() < (e || 1)) {
            var i = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
            $.check.isHttps() && (i = "https://login.qq.com/cgi-bin/r.cgi?"),
            i += t,
            $.http.preload(i)
        }
    },
    isdSpeed: function(t, e) {
        var i = !1
          , n = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
        if ($.check.isHttps() && (n = "https://login.qq.com/cgi-bin/r.cgi?"),
        n += t,
        Math.random() < (e || 1)) {
            var o = $.report.getSpeedPoints(t);
            for (var r in o)
                o[r] && o[r] < 3e4 && (n += "&" + r + "=" + o[r],
                i = !0);
            n += "&v=" + Math.random(),
            i && $.http.preload(n)
        }
        $.report.setSpeedPoint(t)
    },
    speedPoints: {},
    basePoint: {},
    setBasePoint: function(t, e) {
        $.report.basePoint[t] = e
    },
    setSpeedPoint: function(t, e, i) {
        e ? ($.report.speedPoints[t] || ($.report.speedPoints[t] = {}),
        $.report.speedPoints[t][e] = i - $.report.basePoint[t]) : $.report.speedPoints[t] = {}
    },
    setSpeedPoints: function(t, e) {
        $.report.speedPoints[t] = e
    },
    getSpeedPoints: function(t) {
        return $.report.speedPoints[t]
    }
},
$.sso_ver = 0,
$.sso_state = 0,
$.plugin_isd_flag = "",
$.nptxsso = null ,
$.activetxsso = null ,
$.sso_loadComplete = !0,
$.np_clock = 0,
$.loginQQnum = 0,
$.suportActive = function() {
    var t = !0;
    try {
        window.ActiveXObject || window.ActiveXObject.prototype ? (t = !0,
        window.ActiveXObject.prototype && !window.ActiveXObject && $.report.nlog("activeobject 判断有问题")) : t = !1
    } catch (e) {
        t = !1
    }
    return t
}
,
$.getLoginQQNum = function() {
    try {
        var t = 0;
        if ($.suportActive()) {
            $.plugin_isd_flag = "flag1=7808&flag2=1&flag3=20",
            $.report.setBasePoint($.plugin_isd_flag, new Date);
            var e = new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2");
            $.activetxsso = e;
            var i = e.CreateTXSSOData();
            e.InitSSOFPTCtrl(0, i);
            var n = e.DoOperation(2, i)
              , o = n.GetArray("PTALIST");
            t = o.GetSize();
            try {
                var r = e.QuerySSOInfo(1);
                $.sso_ver = r.GetInt("nSSOVersion")
            } catch (p) {
                $.sso_ver = 0
            }
        } else if (navigator.mimeTypes["application/nptxsso"])
            if ($.plugin_isd_flag = "flag1=7808&flag2=1&flag3=21",
            $.report.setBasePoint($.plugin_isd_flag, (new Date).getTime()),
            $.nptxsso || ($.nptxsso = document.createElement("embed"),
            $.nptxsso.type = "application/nptxsso",
            $.nptxsso.style.width = "0px",
            $.nptxsso.style.height = "0px",
            document.body.appendChild($.nptxsso)),
            "function" != typeof $.nptxsso.InitPVANoST)
                $.sso_loadComplete = !1,
                $.report.nlog("没有找到插件的InitPVANoST方法", 269929);
            else {
                var a = $.nptxsso.InitPVANoST();
                a && (t = $.nptxsso.GetPVACount(),
                $.sso_loadComplete = !0);
                try {
                    $.sso_ver = $.nptxsso.GetSSOVersion()
                } catch (p) {
                    $.sso_ver = 0
                }
            }
        else
            $.report.nlog("插件没有注册成功", 263744),
            $.sso_state = 2
    } catch (p) {
        var s = null ;
        try {
            s = $.http.getXHR()
        } catch (p) {
            return 0
        }
        var l = p.message || p;
        return /^pt_windows_sso/.test(l) ? (/^pt_windows_sso_\d+_3/.test(l) ? $.report.nlog("QQ插件不支持该url" + p.message, 326044) : $.report.nlog("QQ插件抛出内部错误" + p.message, 325361),
        $.sso_state = 1) : s && "msie" == $.browser("type") ? "Win64" != window.navigator.platform ? ($.report.nlog("可能没有安装QQ" + p.message, 322340),
        $.sso_state = 2) : $.report.nlog("使用64位IE" + p.message, 343958) : ($.report.nlog("获取登录QQ号码出错" + p.message, 263745),
        window.ActiveXObject && "Win32" == window.navigator.platform && ($.sso_state = 1)),
        0
    }
    return $.loginQQnum = t,
    t
}
,
$.checkNPPlugin = function() {
    var t = 10;
    window.clearInterval($.np_clock),
    $.np_clock = window.setInterval(function() {
        "function" == typeof $.nptxsso.InitPVANoST || 0 == t ? (window.clearInterval($.np_clock),
        "function" == typeof $.nptxsso.InitPVANoST && pt.plogin.auth()) : t--
    }, 200)
}
,
$.guanjiaPlugin = null ,
$.initGuanjiaPlugin = function() {
    try {
        window.ActiveXObject ? $.guanjiaPlugin = new ActiveXObject("npQMExtensionsIE.Basic") : navigator.mimeTypes["application/qqpcmgr-extensions-mozilla"] && ($.guanjiaPlugin = document.createElement("embed"),
        $.guanjiaPlugin.type = "application/qqpcmgr-extensions-mozilla",
        $.guanjiaPlugin.style.width = "0px",
        $.guanjiaPlugin.style.height = "0px",
        document.body.appendChild($.guanjiaPlugin));
        var t = $.guanjiaPlugin.QMGetVersion().split(".");
        4 == t.length && t[2] >= 9319 || ($.guanjiaPlugin = null )
    } catch (e) {
        $.guanjiaPlugin = null 
    }
}
,
function() {
    var t = "nohost_guid"
      , e = "/nohost_htdocs/js/SwitchHost.js";
    "" != $.cookie.get(t) && $.http.loadScript(e, function() {
        var t = window.SwitchHost && window.SwitchHost.init;
        t && t()
    })
}(),
setTimeout(function() {
    var t = "flag1=7808&flag2=1&flag3=9";
    $.report.setBasePoint(t, 0),
    "undefined" != typeof window.postMessage ? $.report.setSpeedPoint(t, 1, 2e3) : $.report.setSpeedPoint(t, 1, 1e3),
    $.report.isdSpeed(t, .01)
}, 500),
$ = window.$ || {},
$pt = window.$pt || {},
$.RSA = $pt.RSA = function()
 {
	
    function t(t, e) {
        return new p(t,e)
    }
    function e(t, e) {
        if (e < t.length + 11)
            return uv_alert("Message too long for RSA"),
            null ;
        for (var i = new Array, n = t.length - 1; n >= 0 && e > 0; ) {
            var o = t.charCodeAt(n--);
            i[--e] = o
        }
        i[--e] = 0;
        for (var r = new Y, a = new Array; e > 2; ) {
            for (a[0] = 0; 0 == a[0]; )
                r.nextBytes(a);
            i[--e] = a[0]
        }
        return i[--e] = 2,
        i[--e] = 0,
        new p(i)
    }
    function i() {
        this.n = null ,
        this.e = 0,
        this.d = null ,
        this.p = null ,
        this.q = null ,
        this.dmp1 = null ,
        this.dmq1 = null ,
        this.coeff = null 
    }
    function n(e, i) {
        null  != e && null  != i && e.length > 0 && i.length > 0 ? (this.n = t(e, 16),
        this.e = parseInt(i, 16)) : uv_alert("Invalid RSA public key")
    }
    function o(t) {
        return t.modPowInt(this.e, this.n)
    }
    function r(t) {
        var i = e(t, this.n.bitLength() + 7 >> 3);
        if (null  == i)
            return null ;
        var n = this.doPublic(i);
        if (null  == n)
            return null ;
        var o = n.toString(16);
        return 0 == (1 & o.length) ? o : "0" + o
    }
    function p(t, e, i) {
        null  != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null  == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }
    function a() {
        return new p(null )
    }
    function s(t, e, i, n, o, r) {
        for (; --r >= 0; ) {
            var p = e * this[t++] + i[n] + o;
            o = Math.floor(p / 67108864),
            i[n++] = 67108863 & p
        }
        return o
    }
    function l(t, e, i, n, o, r) {
        for (var p = 32767 & e, a = e >> 15; --r >= 0; ) {
            var s = 32767 & this[t]
              , l = this[t++] >> 15
              , c = a * s + l * p;
            s = p * s + ((32767 & c) << 15) + i[n] + (1073741823 & o),
            o = (s >>> 30) + (c >>> 15) + a * l + (o >>> 30),
            i[n++] = 1073741823 & s
        }
        return o
    }
    function c(t, e, i, n, o, r) {
        for (var p = 16383 & e, a = e >> 14; --r >= 0; ) {
            var s = 16383 & this[t]
              , l = this[t++] >> 14
              , c = a * s + l * p;
            s = p * s + ((16383 & c) << 14) + i[n] + o,
            o = (s >> 28) + (c >> 14) + a * l,
            i[n++] = 268435455 & s
        }
        return o
    }
    function u(t) {
        return ut.charAt(t)
    }
    function g(t, e) {
        var i = gt[t.charCodeAt(e)];
        return null  == i ? -1 : i
    }
    function d(t) {
        for (var e = this.t - 1; e >= 0; --e)
            t[e] = this[e];
        t.t = this.t,
        t.s = this.s
    }
    function h(t) {
        this.t = 1,
        this.s = 0 > t ? -1 : 0,
        t > 0 ? this[0] = t : -1 > t ? this[0] = t + DV : this.t = 0
    }
    function f(t) {
        var e = a();
        return e.fromInt(t),
        e
    }
    function m(t, e) {
        var i;
        if (16 == e)
            i = 4;
        else if (8 == e)
            i = 3;
        else if (256 == e)
            i = 8;
        else if (2 == e)
            i = 1;
        else if (32 == e)
            i = 5;
        else {
            if (4 != e)
                return void this.fromRadix(t, e);
            i = 2
        }
        this.t = 0,
        this.s = 0;
        for (var n = t.length, o = !1, r = 0; --n >= 0; ) {
            var a = 8 == i ? 255 & t[n] : g(t, n);
            0 > a ? "-" == t.charAt(n) && (o = !0) : (o = !1,
            0 == r ? this[this.t++] = a : r + i > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - r) - 1) << r,
            this[this.t++] = a >> this.DB - r) : this[this.t - 1] |= a << r,
            r += i,
            r >= this.DB && (r -= this.DB))
        }
        8 == i && 0 != (128 & t[0]) && (this.s = -1,
        r > 0 && (this[this.t - 1] |= (1 << this.DB - r) - 1 << r)),
        this.clamp(),
        o && p.ZERO.subTo(this, this)
    }
    function _() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
            --this.t
    }
    function v(t) {
        if (this.s < 0)
            return "-" + this.negate().toString(t);
        var e;
        if (16 == t)
            e = 4;
        else if (8 == t)
            e = 3;
        else if (2 == t)
            e = 1;
        else if (32 == t)
            e = 5;
        else {
            if (4 != t)
                return this.toRadix(t);
            e = 2
        }
        var i, n = (1 << e) - 1, o = !1, r = "", p = this.t, a = this.DB - p * this.DB % e;
        if (p-- > 0)
            for (a < this.DB && (i = this[p] >> a) > 0 && (o = !0,
            r = u(i)); p >= 0; )
                e > a ? (i = (this[p] & (1 << a) - 1) << e - a,
                i |= this[--p] >> (a += this.DB - e)) : (i = this[p] >> (a -= e) & n,
                0 >= a && (a += this.DB,
                --p)),
                i > 0 && (o = !0),
                o && (r += u(i));
        return o ? r : "0"
    }
    function $() {
        var t = a();
        return p.ZERO.subTo(this, t),
        t
    }
    function w() {
        return this.s < 0 ? this.negate() : this
    }
    function y(t) {
        var e = this.s - t.s;
        if (0 != e)
            return e;
        var i = this.t;
        if (e = i - t.t,
        0 != e)
            return e;
        for (; --i >= 0; )
            if (0 != (e = this[i] - t[i]))
                return e;
        return 0
    }
    function k(t) {
        var e, i = 1;
        return 0 != (e = t >>> 16) && (t = e,
        i += 16),
        0 != (e = t >> 8) && (t = e,
        i += 8),
        0 != (e = t >> 4) && (t = e,
        i += 4),
        0 != (e = t >> 2) && (t = e,
        i += 2),
        0 != (e = t >> 1) && (t = e,
        i += 1),
        i
    }
    function b() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + k(this[this.t - 1] ^ this.s & this.DM)
    }
    function q(t, e) {
        var i;
        for (i = this.t - 1; i >= 0; --i)
            e[i + t] = this[i];
        for (i = t - 1; i >= 0; --i)
            e[i] = 0;
        e.t = this.t + t,
        e.s = this.s
    }
    function S(t, e) {
        for (var i = t; i < this.t; ++i)
            e[i - t] = this[i];
        e.t = Math.max(this.t - t, 0),
        e.s = this.s
    }
    function C(t, e) {
        var i, n = t % this.DB, o = this.DB - n, r = (1 << o) - 1, p = Math.floor(t / this.DB), a = this.s << n & this.DM;
        for (i = this.t - 1; i >= 0; --i)
            e[i + p + 1] = this[i] >> o | a,
            a = (this[i] & r) << n;
        for (i = p - 1; i >= 0; --i)
            e[i] = 0;
        e[p] = a,
        e.t = this.t + p + 1,
        e.s = this.s,
        e.clamp()
    }
    function T(t, e) {
        e.s = this.s;
        var i = Math.floor(t / this.DB);
        if (i >= this.t)
            return void (e.t = 0);
        var n = t % this.DB
          , o = this.DB - n
          , r = (1 << n) - 1;
        e[0] = this[i] >> n;
        for (var p = i + 1; p < this.t; ++p)
            e[p - i - 1] |= (this[p] & r) << o,
            e[p - i] = this[p] >> n;
        n > 0 && (e[this.t - i - 1] |= (this.s & r) << o),
        e.t = this.t - i,
        e.clamp()
    }
    function x(t, e) {
        for (var i = 0, n = 0, o = Math.min(t.t, this.t); o > i; )
            n += this[i] - t[i],
            e[i++] = n & this.DM,
            n >>= this.DB;
        if (t.t < this.t) {
            for (n -= t.s; i < this.t; )
                n += this[i],
                e[i++] = n & this.DM,
                n >>= this.DB;
            n += this.s
        } else {
            for (n += this.s; i < t.t; )
                n -= t[i],
                e[i++] = n & this.DM,
                n >>= this.DB;
            n -= t.s
        }
        e.s = 0 > n ? -1 : 0,
        -1 > n ? e[i++] = this.DV + n : n > 0 && (e[i++] = n),
        e.t = i,
        e.clamp()
    }
    function A(t, e) {
        var i = this.abs()
          , n = t.abs()
          , o = i.t;
        for (e.t = o + n.t; --o >= 0; )
            e[o] = 0;
        for (o = 0; o < n.t; ++o)
            e[o + i.t] = i.am(0, n[o], e, o, 0, i.t);
        e.s = 0,
        e.clamp(),
        this.s != t.s && p.ZERO.subTo(e, e)
    }
    function E(t) {
        for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0; )
            t[i] = 0;
        for (i = 0; i < e.t - 1; ++i) {
            var n = e.am(i, e[i], t, 2 * i, 0, 1);
            (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, n, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV,
            t[i + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)),
        t.s = 0,
        t.clamp()
    }
    function N(t, e, i) {
        var n = t.abs();
        if (!(n.t <= 0)) {
            var o = this.abs();
            if (o.t < n.t)
                return null  != e && e.fromInt(0),
                void (null  != i && this.copyTo(i));
            null  == i && (i = a());
            var r = a()
              , s = this.s
              , l = t.s
              , c = this.DB - k(n[n.t - 1]);
            c > 0 ? (n.lShiftTo(c, r),
            o.lShiftTo(c, i)) : (n.copyTo(r),
            o.copyTo(i));
            var u = r.t
              , g = r[u - 1];
            if (0 != g) {
                var d = g * (1 << this.F1) + (u > 1 ? r[u - 2] >> this.F2 : 0)
                  , h = this.FV / d
                  , f = (1 << this.F1) / d
                  , m = 1 << this.F2
                  , _ = i.t
                  , v = _ - u
                  , $ = null  == e ? a() : e;
                for (r.dlShiftTo(v, $),
                i.compareTo($) >= 0 && (i[i.t++] = 1,
                i.subTo($, i)),
                p.ONE.dlShiftTo(u, $),
                $.subTo(r, r); r.t < u; )
                    r[r.t++] = 0;
                for (; --v >= 0; ) {
                    var w = i[--_] == g ? this.DM : Math.floor(i[_] * h + (i[_ - 1] + m) * f);
                    if ((i[_] += r.am(0, w, i, v, 0, u)) < w)
                        for (r.dlShiftTo(v, $),
                        i.subTo($, i); i[_] < --w; )
                            i.subTo($, i)
                }
                null  != e && (i.drShiftTo(u, e),
                s != l && p.ZERO.subTo(e, e)),
                i.t = u,
                i.clamp(),
                c > 0 && i.rShiftTo(c, i),
                0 > s && p.ZERO.subTo(i, i)
            }
        }
    }
    function L(t) {
        var e = a();
        return this.abs().divRemTo(t, null , e),
        this.s < 0 && e.compareTo(p.ZERO) > 0 && t.subTo(e, e),
        e
    }
    function P(t) {
        this.m = t
    }
    function B(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }
    function Q(t) {
        return t
    }
    function D(t) {
        t.divRemTo(this.m, null , t)
    }
    function I(t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
    }
    function H(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    function M() {
        if (this.t < 1)
            return 0;
        var t = this[0];
        if (0 == (1 & t))
            return 0;
        var e = 3 & t;
        return e = e * (2 - (15 & t) * e) & 15,
        e = e * (2 - (255 & t) * e) & 255,
        e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
        e = e * (2 - t * e % this.DV) % this.DV,
        e > 0 ? this.DV - e : -e
    }
    function V(t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
    }
    function U(t) {
        var e = a();
        return t.abs().dlShiftTo(this.m.t, e),
        e.divRemTo(this.m, null , e),
        t.s < 0 && e.compareTo(p.ZERO) > 0 && this.m.subTo(e, e),
        e
    }
    function O(t) {
        var e = a();
        return t.copyTo(e),
        this.reduce(e),
        e
    }
    function j(t) {
        for (; t.t <= this.mt2; )
            t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
            var i = 32767 & t[e]
              , n = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (i = e + this.m.t,
            t[i] += this.m.am(0, n, t, e, 0, this.m.t); t[i] >= t.DV; )
                t[i] -= t.DV,
                t[++i]++
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }
    function R(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    function F(t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
    }
    function z() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    function G(t, e) {
        if (t > 4294967295 || 1 > t)
            return p.ONE;
        var i = a()
          , n = a()
          , o = e.convert(this)
          , r = k(t) - 1;
        for (o.copyTo(i); --r >= 0; )
            if (e.sqrTo(i, n),
            (t & 1 << r) > 0)
                e.mulTo(n, o, i);
            else {
                var s = i;
                i = n,
                n = s
            }
        return e.revert(i)
    }
    function W(t, e) {
        var i;
        return i = 256 > t || e.isEven() ? new P(e) : new V(e),
        this.exp(t, i)
    }
    function X(t) {
        ht[ft++] ^= 255 & t,
        ht[ft++] ^= t >> 8 & 255,
        ht[ft++] ^= t >> 16 & 255,
        ht[ft++] ^= t >> 24 & 255,
        ft >= vt && (ft -= vt)
    }
    function Z() {
        X((new Date).getTime())
    }
    function K() {
        if (null  == dt) {
            for (Z(),
            dt = nt(),
            dt.init(ht),
            ft = 0; ft < ht.length; ++ft)
                ht[ft] = 0;
            ft = 0
        }
        return dt.next()
    }
    function J(t) {
        var e;
        for (e = 0; e < t.length; ++e)
            t[e] = K()
    }
    function Y() {}
    function tt() {
        this.i = 0,
        this.j = 0,
        this.S = new Array
    }
    function et(t) {
        var e, i, n;
        for (e = 0; 256 > e; ++e)
            this.S[e] = e;
        for (i = 0,
        e = 0; 256 > e; ++e)
            i = i + this.S[e] + t[e % t.length] & 255,
            n = this.S[e],
            this.S[e] = this.S[i],
            this.S[i] = n;
        this.i = 0,
        this.j = 0
    }
    function it() {
        var t;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
    }
    function nt() {
        return new tt
    }
    function ot(t, e, n) {
        e = "F20CE00BAE5361F8FA3AE9CEFA495362FF7DA1BA628F64A347F0A8C012BF0B254A30CD92ABFFE7A6EE0DC424CB6166F8819EFA5BCCB20EDFB4AD02E412CCF579B1CA711D55B8B0B3AEB60153D5E0693A2A86F3167D7847A0CB8B00004716A9095D9BADC977CBB804DBDCBA6029A9710869A453F27DFDDF83C016D928B3CBF4C7",
        n = "3";
        var o = new i;
        return o.setPublic(e, n),
        o.encrypt(t)
    }
    i.prototype.doPublic = o,
    i.prototype.setPublic = n,
    i.prototype.encrypt = r;
    var rt, pt = 0xdeadbeefcafe, at = 15715070 == (16777215 & pt);
    at && "Microsoft Internet Explorer" == navigator.appName ? (p.prototype.am = l,
    rt = 30) : at && "Netscape" != navigator.appName ? (p.prototype.am = s,
    rt = 26) : (p.prototype.am = c,
    rt = 28),
    p.prototype.DB = rt,
    p.prototype.DM = (1 << rt) - 1,
    p.prototype.DV = 1 << rt;
    var st = 52;
    p.prototype.FV = Math.pow(2, st),
    p.prototype.F1 = st - rt,
    p.prototype.F2 = 2 * rt - st;
    var lt, ct, ut = "0123456789abcdefghijklmnopqrstuvwxyz", gt = new Array;
    for (lt = "0".charCodeAt(0),
    ct = 0; 9 >= ct; ++ct)
        gt[lt++] = ct;
    for (lt = "a".charCodeAt(0),
    ct = 10; 36 > ct; ++ct)
        gt[lt++] = ct;
    for (lt = "A".charCodeAt(0),
    ct = 10; 36 > ct; ++ct)
        gt[lt++] = ct;
    P.prototype.convert = B,
    P.prototype.revert = Q,
    P.prototype.reduce = D,
    P.prototype.mulTo = I,
    P.prototype.sqrTo = H,
    V.prototype.convert = U,
    V.prototype.revert = O,
    V.prototype.reduce = j,
    V.prototype.mulTo = F,
    V.prototype.sqrTo = R,
    p.prototype.copyTo = d,
    p.prototype.fromInt = h,
    p.prototype.fromString = m,
    p.prototype.clamp = _,
    p.prototype.dlShiftTo = q,
    p.prototype.drShiftTo = S,
    p.prototype.lShiftTo = C,
    p.prototype.rShiftTo = T,
    p.prototype.subTo = x,
    p.prototype.multiplyTo = A,
    p.prototype.squareTo = E,
    p.prototype.divRemTo = N,
    p.prototype.invDigit = M,
    p.prototype.isEven = z,
    p.prototype.exp = G,
    p.prototype.toString = v,
    p.prototype.negate = $,
    p.prototype.abs = w,
    p.prototype.compareTo = y,
    p.prototype.bitLength = b,
    p.prototype.mod = L,
    p.prototype.modPowInt = W,
    p.ZERO = f(0),
    p.ONE = f(1);
    var dt, ht, ft;
    if (null  == ht) {
        ht = new Array,
        ft = 0;
        var mt;
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
            var _t = window.crypto.random(32);
            for (mt = 0; mt < _t.length; ++mt)
                ht[ft++] = 255 & _t.charCodeAt(mt)
        }
        for (; vt > ft; )
            mt = Math.floor(65536 * Math.random()),
            ht[ft++] = mt >>> 8,
            ht[ft++] = 255 & mt;
        ft = 0,
        Z()
    }
    Y.prototype.nextBytes = J,
    tt.prototype.init = et,
    tt.prototype.next = it;
    var vt = 256;
    return {
        rsa_encrypt: ot
    }
}(),





function(t) {
    function e() {
        return Math.round(4294967295 * Math.random())
    }
    function i(t, e, i) {
        (!i || i > 4) && (i = 4);
        for (var n = 0, o = e; e + i > o; o++)
            n <<= 8,
            n |= t[o];
        return (4294967295 & n) >>> 0
    }
    function n(t, e, i) {
        t[e + 3] = i >> 0 & 255,
        t[e + 2] = i >> 8 & 255,
        t[e + 1] = i >> 16 & 255,
        t[e + 0] = i >> 24 & 255
    }
    function o(t) {
        if (!t)
            return "";
        for (var e = "", i = 0; i < t.length; i++) {
            var n = Number(t[i]).toString(16);
            1 == n.length && (n = "0" + n),
            e += n
        }
        return e
    }
    function r(t) {
        for (var e = "", i = 0; i < t.length; i += 2)
            e += String.fromCharCode(parseInt(t.substr(i, 2), 16));
        return e
    }
    function p(t, e) {
        if (!t)
            return "";
        e && (t = a(t));
        for (var i = [], n = 0; n < t.length; n++)
            i[n] = t.charCodeAt(n);
        return o(i)
    }
    function a(t) {
        var e, i, n = [], o = t.length;
        for (e = 0; o > e; e++)
            i = t.charCodeAt(e),
            i > 0 && 127 >= i ? n.push(t.charAt(e)) : i >= 128 && 2047 >= i ? n.push(String.fromCharCode(192 | i >> 6 & 31), String.fromCharCode(128 | 63 & i)) : i >= 2048 && 65535 >= i && n.push(String.fromCharCode(224 | i >> 12 & 15), String.fromCharCode(128 | i >> 6 & 63), String.fromCharCode(128 | 63 & i));
        return n.join("")
    }
    function s(t) {
        _ = new Array(8),
        v = new Array(8),
        $ = w = 0,
        b = !0,
        m = 0;
        var i = t.length
          , n = 0;
        m = (i + 10) % 8,
        0 != m && (m = 8 - m),
        y = new Array(i + m + 10),
        _[0] = 255 & (248 & e() | m);
        for (var o = 1; m >= o; o++)
            _[o] = 255 & e();
        m++;
        for (var o = 0; 8 > o; o++)
            v[o] = 0;
        for (n = 1; 2 >= n; )
            8 > m && (_[m++] = 255 & e(),
            n++),
            8 == m && c();
        for (var o = 0; i > 0; )
            8 > m && (_[m++] = t[o++],
            i--),
            8 == m && c();
        for (n = 1; 7 >= n; )
            8 > m && (_[m++] = 0,
            n++),
            8 == m && c();
        return y
    }
    function l(t) {
        var e = 0
          , i = new Array(8)
          , n = t.length;
        if (k = t,
        n % 8 != 0 || 16 > n)
            return null ;
        if (v = g(t),
        m = 7 & v[0],
        e = n - m - 10,
        0 > e)
            return null ;
        for (var o = 0; o < i.length; o++)
            i[o] = 0;
        y = new Array(e),
        w = 0,
        $ = 8,
        m++;
        for (var r = 1; 2 >= r; )
            if (8 > m && (m++,
            r++),
            8 == m && (i = t,
            !d()))
                return null ;
        for (var o = 0; 0 != e; )
            if (8 > m && (y[o] = 255 & (i[w + m] ^ v[m]),
            o++,
            e--,
            m++),
            8 == m && (i = t,
            w = $ - 8,
            !d()))
                return null ;
        for (r = 1; 8 > r; r++) {
            if (8 > m) {
                if (0 != (i[w + m] ^ v[m]))
                    return null ;
                m++
            }
            if (8 == m && (i = t,
            w = $,
            !d()))
                return null 
        }
        return y
    }
    function c() {
        for (var t = 0; 8 > t; t++)
            _[t] ^= b ? v[t] : y[w + t];
        for (var e = u(_), t = 0; 8 > t; t++)
            y[$ + t] = e[t] ^ v[t],
            v[t] = _[t];
        w = $,
        $ += 8,
        m = 0,
        b = !1
    }
    function u(t) {
        for (var e = 16, o = i(t, 0, 4), r = i(t, 4, 4), p = i(f, 0, 4), a = i(f, 4, 4), s = i(f, 8, 4), l = i(f, 12, 4), c = 0, u = 2654435769; e-- > 0; )
            c += u,
            c = (4294967295 & c) >>> 0,
            o += (r << 4) + p ^ r + c ^ (r >>> 5) + a,
            o = (4294967295 & o) >>> 0,
            r += (o << 4) + s ^ o + c ^ (o >>> 5) + l,
            r = (4294967295 & r) >>> 0;
        var g = new Array(8);
        return n(g, 0, o),
        n(g, 4, r),
        g
    }
    function g(t) {
        for (var e = 16, o = i(t, 0, 4), r = i(t, 4, 4), p = i(f, 0, 4), a = i(f, 4, 4), s = i(f, 8, 4), l = i(f, 12, 4), c = 3816266640, u = 2654435769; e-- > 0; )
            r -= (o << 4) + s ^ o + c ^ (o >>> 5) + l,
            r = (4294967295 & r) >>> 0,
            o -= (r << 4) + p ^ r + c ^ (r >>> 5) + a,
            o = (4294967295 & o) >>> 0,
            c -= u,
            c = (4294967295 & c) >>> 0;
        var g = new Array(8);
        return n(g, 0, o),
        n(g, 4, r),
        g
    }
    function d() {
        for (var t = (k.length,
        0); 8 > t; t++)
            v[t] ^= k[$ + t];
        return v = g(v),
        $ += 8,
        m = 0,
        !0
    }
    function h(t, e) {
        var i = [];
        if (e)
            for (var n = 0; n < t.length; n++)
                i[n] = 255 & t.charCodeAt(n);
        else
            for (var o = 0, n = 0; n < t.length; n += 2)
                i[o++] = parseInt(t.substr(n, 2), 16);
        return i
    }
    var f = ""
      , m = 0
      , _ = []
      , v = []
      , $ = 0
      , w = 0
      , y = []
      , k = []
      , b = !0;
    t.TEA = {
        encrypt: function(t, e) {
            var i = h(t, e)
              , n = s(i);
            return o(n)
        },
        enAsBase64: function(t, e) {
            for (var i = h(t, e), n = s(i), o = "", r = 0; r < n.length; r++)
                o += String.fromCharCode(n[r]);
            return btoa(o)
        },
        decrypt: function(t) {
            var e = h(t, !1)
              , i = l(e);
            return o(i)
        },
        initkey: function(t, e) {
            f = h(t, e)
        },
        bytesToStr: r,
        strToBytes: p,
        bytesInStr: o,
        dataFromStr: h
    };
    var q = {};
    q.PADCHAR = "=",
    q.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    q.getbyte = function(t, e) {
        var i = t.charCodeAt(e);
        if (i > 255)
            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return i
    }
    ,
    q.encode = function(t) {
        if (1 != arguments.length)
            throw "SyntaxError: Not enough arguments";
        var e, i, n = q.PADCHAR, o = q.ALPHA, r = q.getbyte, p = [];
        t = "" + t;
        var a = t.length - t.length % 3;
        if (0 == t.length)
            return t;
        for (e = 0; a > e; e += 3)
            i = r(t, e) << 16 | r(t, e + 1) << 8 | r(t, e + 2),
            p.push(o.charAt(i >> 18)),
            p.push(o.charAt(i >> 12 & 63)),
            p.push(o.charAt(i >> 6 & 63)),
            p.push(o.charAt(63 & i));
        switch (t.length - a) {
        case 1:
            i = r(t, e) << 16,
            p.push(o.charAt(i >> 18) + o.charAt(i >> 12 & 63) + n + n);
            break;
        case 2:
            i = r(t, e) << 16 | r(t, e + 1) << 8,
            p.push(o.charAt(i >> 18) + o.charAt(i >> 12 & 63) + o.charAt(i >> 6 & 63) + n)
        }
        return p.join("")
    }
    ,
    window.btoa || (window.btoa = q.encode)
}(window),



$ = window.$ || {},
$pt = window.$pt || {},
$.Encryption = $pt.Encryption = function() {
    function md5(t) {
        return hex_md5(t)
    }
    function hex_md5(t) {
        return binl2hex(core_md5(str2binl(t), t.length * chrsz))
    }
    function str_md5(t) {
        return binl2str(core_md5(str2binl(t), t.length * chrsz))
    }
    function hex_hmac_md5(t, e) {
        return binl2hex(core_hmac_md5(t, e))
    }
    function b64_hmac_md5(t, e) {
        return binl2b64(core_hmac_md5(t, e))
    }
    function str_hmac_md5(t, e) {
        return binl2str(core_hmac_md5(t, e))
    }
    function core_md5(t, e) {
        t[e >> 5] |= 128 << e % 32,
        t[(e + 64 >>> 9 << 4) + 14] = e;
        for (var i = 1732584193, n = -271733879, o = -1732584194, r = 271733878, p = 0; p < t.length; p += 16) {
            var a = i
              , s = n
              , l = o
              , c = r;
            i = md5_ff(i, n, o, r, t[p + 0], 7, -680876936),
            r = md5_ff(r, i, n, o, t[p + 1], 12, -389564586),
            o = md5_ff(o, r, i, n, t[p + 2], 17, 606105819),
            n = md5_ff(n, o, r, i, t[p + 3], 22, -1044525330),
            i = md5_ff(i, n, o, r, t[p + 4], 7, -176418897),
            r = md5_ff(r, i, n, o, t[p + 5], 12, 1200080426),
            o = md5_ff(o, r, i, n, t[p + 6], 17, -1473231341),
            n = md5_ff(n, o, r, i, t[p + 7], 22, -45705983),
            i = md5_ff(i, n, o, r, t[p + 8], 7, 1770035416),
            r = md5_ff(r, i, n, o, t[p + 9], 12, -1958414417),
            o = md5_ff(o, r, i, n, t[p + 10], 17, -42063),
            n = md5_ff(n, o, r, i, t[p + 11], 22, -1990404162),
            i = md5_ff(i, n, o, r, t[p + 12], 7, 1804603682),
            r = md5_ff(r, i, n, o, t[p + 13], 12, -40341101),
            o = md5_ff(o, r, i, n, t[p + 14], 17, -1502002290),
            n = md5_ff(n, o, r, i, t[p + 15], 22, 1236535329),
            i = md5_gg(i, n, o, r, t[p + 1], 5, -165796510),
            r = md5_gg(r, i, n, o, t[p + 6], 9, -1069501632),
            o = md5_gg(o, r, i, n, t[p + 11], 14, 643717713),
            n = md5_gg(n, o, r, i, t[p + 0], 20, -373897302),
            i = md5_gg(i, n, o, r, t[p + 5], 5, -701558691),
            r = md5_gg(r, i, n, o, t[p + 10], 9, 38016083),
            o = md5_gg(o, r, i, n, t[p + 15], 14, -660478335),
            n = md5_gg(n, o, r, i, t[p + 4], 20, -405537848),
            i = md5_gg(i, n, o, r, t[p + 9], 5, 568446438),
            r = md5_gg(r, i, n, o, t[p + 14], 9, -1019803690),
            o = md5_gg(o, r, i, n, t[p + 3], 14, -187363961),
            n = md5_gg(n, o, r, i, t[p + 8], 20, 1163531501),
            i = md5_gg(i, n, o, r, t[p + 13], 5, -1444681467),
            r = md5_gg(r, i, n, o, t[p + 2], 9, -51403784),
            o = md5_gg(o, r, i, n, t[p + 7], 14, 1735328473),
            n = md5_gg(n, o, r, i, t[p + 12], 20, -1926607734),
            i = md5_hh(i, n, o, r, t[p + 5], 4, -378558),
            r = md5_hh(r, i, n, o, t[p + 8], 11, -2022574463),
            o = md5_hh(o, r, i, n, t[p + 11], 16, 1839030562),
            n = md5_hh(n, o, r, i, t[p + 14], 23, -35309556),
            i = md5_hh(i, n, o, r, t[p + 1], 4, -1530992060),
            r = md5_hh(r, i, n, o, t[p + 4], 11, 1272893353),
            o = md5_hh(o, r, i, n, t[p + 7], 16, -155497632),
            n = md5_hh(n, o, r, i, t[p + 10], 23, -1094730640),
            i = md5_hh(i, n, o, r, t[p + 13], 4, 681279174),
            r = md5_hh(r, i, n, o, t[p + 0], 11, -358537222),
            o = md5_hh(o, r, i, n, t[p + 3], 16, -722521979),
            n = md5_hh(n, o, r, i, t[p + 6], 23, 76029189),
            i = md5_hh(i, n, o, r, t[p + 9], 4, -640364487),
            r = md5_hh(r, i, n, o, t[p + 12], 11, -421815835),
            o = md5_hh(o, r, i, n, t[p + 15], 16, 530742520),
            n = md5_hh(n, o, r, i, t[p + 2], 23, -995338651),
            i = md5_ii(i, n, o, r, t[p + 0], 6, -198630844),
            r = md5_ii(r, i, n, o, t[p + 7], 10, 1126891415),
            o = md5_ii(o, r, i, n, t[p + 14], 15, -1416354905),
            n = md5_ii(n, o, r, i, t[p + 5], 21, -57434055),
            i = md5_ii(i, n, o, r, t[p + 12], 6, 1700485571),
            r = md5_ii(r, i, n, o, t[p + 3], 10, -1894986606),
            o = md5_ii(o, r, i, n, t[p + 10], 15, -1051523),
            n = md5_ii(n, o, r, i, t[p + 1], 21, -2054922799),
            i = md5_ii(i, n, o, r, t[p + 8], 6, 1873313359),
            r = md5_ii(r, i, n, o, t[p + 15], 10, -30611744),
            o = md5_ii(o, r, i, n, t[p + 6], 15, -1560198380),
            n = md5_ii(n, o, r, i, t[p + 13], 21, 1309151649),
            i = md5_ii(i, n, o, r, t[p + 4], 6, -145523070),
            r = md5_ii(r, i, n, o, t[p + 11], 10, -1120210379),
            o = md5_ii(o, r, i, n, t[p + 2], 15, 718787259),
            n = md5_ii(n, o, r, i, t[p + 9], 21, -343485551),
            i = safe_add(i, a),
            n = safe_add(n, s),
            o = safe_add(o, l),
            r = safe_add(r, c)
        }
        return 16 == mode ? Array(n, o) : Array(i, n, o, r)
    }
    function md5_cmn(t, e, i, n, o, r) {
        return safe_add(bit_rol(safe_add(safe_add(e, t), safe_add(n, r)), o), i)
    }
    function md5_ff(t, e, i, n, o, r, p) {
        return md5_cmn(e & i | ~e & n, t, e, o, r, p)
    }
    function md5_gg(t, e, i, n, o, r, p) {
        return md5_cmn(e & n | i & ~n, t, e, o, r, p)
    }
    function md5_hh(t, e, i, n, o, r, p) {
        return md5_cmn(e ^ i ^ n, t, e, o, r, p)
    }
    function md5_ii(t, e, i, n, o, r, p) {
        return md5_cmn(i ^ (e | ~n), t, e, o, r, p)
    }
    function core_hmac_md5(t, e) {
        var i = str2binl(t);
        i.length > 16 && (i = core_md5(i, t.length * chrsz));
        for (var n = Array(16), o = Array(16), r = 0; 16 > r; r++)
            n[r] = 909522486 ^ i[r],
            o[r] = 1549556828 ^ i[r];
        var p = core_md5(n.concat(str2binl(e)), 512 + e.length * chrsz);
        return core_md5(o.concat(p), 640)
    }
    function safe_add(t, e) {
        var i = (65535 & t) + (65535 & e)
          , n = (t >> 16) + (e >> 16) + (i >> 16);
        return n << 16 | 65535 & i
    }
    function bit_rol(t, e) {
        return t << e | t >>> 32 - e
    }
    function str2binl(t) {
        for (var e = Array(), i = (1 << chrsz) - 1, n = 0; n < t.length * chrsz; n += chrsz)
            e[n >> 5] |= (t.charCodeAt(n / chrsz) & i) << n % 32;
        return e
    }
    function binl2str(t) {
        for (var e = "", i = (1 << chrsz) - 1, n = 0; n < 32 * t.length; n += chrsz)
            e += String.fromCharCode(t[n >> 5] >>> n % 32 & i);
        return e
    }
    function binl2hex(t) {
        for (var e = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", i = "", n = 0; n < 4 * t.length; n++)
            i += e.charAt(t[n >> 2] >> n % 4 * 8 + 4 & 15) + e.charAt(t[n >> 2] >> n % 4 * 8 & 15);
        return i
    }
    function binl2b64(t) {
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = "", n = 0; n < 4 * t.length; n += 3)
            for (var o = (t[n >> 2] >> 8 * (n % 4) & 255) << 16 | (t[n + 1 >> 2] >> 8 * ((n + 1) % 4) & 255) << 8 | t[n + 2 >> 2] >> 8 * ((n + 2) % 4) & 255, r = 0; 4 > r; r++)
                i += 8 * n + 6 * r > 32 * t.length ? b64pad : e.charAt(o >> 6 * (3 - r) & 63);
        return i
    }
    function hexchar2bin(str) {
        for (var arr = [], i = 0; i < str.length; i += 2)
            arr.push("\\x" + str.substr(i, 2));
        return arr = arr.join(""),
        eval("var temp = '" + arr + "'"),
        temp
    }
    function __monitor(t, e) {
        if (!(Math.random() > (e || 1)))
            try {
                var i = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t
                  , n = document.createElement("img");
                n.src = i
            } catch (o) {}
    }
    function getEncryption(t, e, i, n) {
        i = i || "",
        t = t || "";
        for (var o = n ? t : md5(t), r = hexchar2bin(o), p = md5(r + e), a = $pt.RSA.rsa_encrypt(r), s = (a.length / 2).toString(16), l = TEA.strToBytes(i.toUpperCase(), !0), c = Number(l.length / 2).toString(16); c.length < 4; )
            c = "0" + c;
        for (; s.length < 4; )
            s = "0" + s;
        TEA.initkey(p);
        var u = TEA.enAsBase64(s + a + TEA.strToBytes(e) + c + l);
        return TEA.initkey(""),
        setTimeout(function() {
            __monitor(488358, 1)
        }, 0),
        u.replace(/[\/\+=]/g, function(t) {
            return {
                "/": "-",
                "+": "*",
                "=": "_"
            }[t]
        })
    }
    function getRSAEncryption(t, e, i) {
        var n = i ? t : md5(t)
          , o = n + e.toUpperCase()
          , r = $.RSA.rsa_encrypt(o);
        return r
    }
    var hexcase = 1
      , b64pad = ""
      , chrsz = 8
      , mode = 32;
    return {
        getEncryption: getEncryption,
        getRSAEncryption: getRSAEncryption,
        md5: md5
    }
}(),
pt.setHeader = function(t) {
    for (var e in t)
        if ("" != e) {
            var i = $("img_" + e);
            i ? i.src = t[e] && t[e].indexOf("sys.getface.qq.com") > -1 ? pt.plogin.dftImg : t[e] || pt.plogin.dftImg : $("auth_face").src = t[e] && t[e].indexOf("sys.getface.qq.com") > -1 ? pt.plogin.dftImg : t[e] || pt.plogin.dftImg
        }
}
;
var __pt_ieZeroLogin = !1
  , __pt_webkitZeroLogin = !1;
pt.qlogin = function() {
    var t = {
        17: 2,
        19: 3,
        20: 2,
        21: 3,
        22: 3,
        23: 3,
        25: 3,
        32: 3,
        33: 3,
        34: 3
    }
      , e = {
        17: 240,
        19: 300,
        20: 240,
        21: 360,
        22: 360,
        23: 300,
        25: 300,
        32: 360,
        33: 300,
        34: 300
    }
      , i = 1
      , n = 2
      , o = 3
      , r = 4
      , p = []
      , a = []
      , s = 9
      , l = '<a hidefocus=true draggable=false href="javascript:void(0);" tabindex="#tabindex#" uin="#uin#" type="#type#" onclick="pt.qlogin.imgClick(this);return false;" onfocus="pt.qlogin.imgFocus(this);" onblur="pt.qlogin.imgBlur(this);" onmouseover="pt.qlogin.imgMouseover(this);" onmousedown="pt.qlogin.imgMouseDowm(this)" onmouseup="pt.qlogin.imgMouseUp(this)" onmouseout="pt.qlogin.imgMouseUp(this)" class="face"  >\r\n          <img  id="img_#uin#" uin="#uin#" type="#type#" src="#src#"    onerror="pt.qlogin.imgErr(this);" /> \r\n          <span id="mengban_#uin#"></span>\r\n          <span class="uin_menban"></span>\r\n          <span class="uin">#uin#</span>\r\n          <span id="img_out_#uin#" uin="#uin#" type="#type#"  class="img_out"  ></span>\r\n          <span id="nick_#uin#" class="#nick_class#">#nick#</span>\r\n          <span  class="#vip_logo#"></span>\r\n      </a>'
      , c = !1
      , u = 1
      , g = t[pt.ptui.style]
      , d = e[pt.ptui.style]
      , h = 1
      , f = 5
      , m = null 
      , _ = !0
      , v = 0
      , w = 0
      , y = [4300, 4302, 4304, 4306, 4308]
      , k = [4301, 4303, 4305, 4307, 4309]
      , b = 0
      , q = function(t) {
        function e() {
            $("qlogin_list").style.left = 1 == t ? a * r - h * o + "px" : (2 - h) * o - a * r + "px",
            a++,
            a > p && window.clearInterval(i)
        }
        if (!(1 == t && 1 >= h || 2 == t && h >= u)) {
            var i = 0
              , n = 1
              , o = $("qlogin_show").offsetWidth || d
              , r = 10
              , p = Math.ceil(o / r)
              , a = 0;
            1 == t ? (h--,
            1 >= h ? ($.css.hide($("prePage")),
            $.css.show($("nextPage"))) : ($.css.show($("nextPage")),
            $.css.show($("prePage")))) : (h++,
            h >= u ? ($.css.hide($("nextPage")),
            $.css.show($("prePage"))) : ($.css.show($("nextPage")),
            $.css.show($("prePage")))),
            i = window.setInterval(e, n)
        }
    }
      , S = function() {
        if (a.length = 0,
        $.suportActive())
            try {
                var t = $.activetxsso
                  , e = t.CreateTXSSOData();
                t.InitSSOFPTCtrl(0, e);
                var i = t.DoOperation(1, e);
                if (null  == i)
                    return;
                for (var o = i.GetArray("PTALIST"), r = o.GetSize(), p = 0; r > p; p++) {
                    var l = o.GetData(p)
                      , c = l.GetDWord("dwSSO_Account_dwAccountUin")
                      , u = l.GetDWord("dwSSO_Account_dwAccountUin")
                      , g = ""
                      , d = l.GetByte("cSSO_Account_cAccountType")
                      , h = c;
                    if (1 == d)
                        try {
                            g = l.GetArray("SSO_Account_AccountValueList"),
                            h = g.GetStr(0)
                        } catch (f) {}
                    var m = 0;
                    try {
                        m = l.GetWord("wSSO_Account_wFaceIndex")
                    } catch (f) {
                        m = 0
                    }
                    var _ = "";
                    try {
                        _ = l.GetStr("strSSO_Account_strNickName")
                    } catch (f) {
                        _ = ""
                    }
                    for (var v = l.GetBuf("bufST_PTLOGIN"), w = "", y = v.GetSize(), k = 0; y > k; k++) {
                        var b = v.GetAt(k).toString("16");
                        1 == b.length && (b = "0" + b),
                        w += b
                    }
                    var q = l.GetDWord("dwSSO_Account_dwUinFlag")
                      , S = {
                        uin: c,
                        name: h,
                        uinString: u,
                        type: d,
                        face: m,
                        nick: _,
                        flag: q,
                        key: w,
                        loginType: n
                    };
                    a.push(S)
                }
                0 == r && (__pt_ieZeroLogin = !0,
                T(),
                $.report.monitor(2129652, 1))
            } catch (f) {
                T(),
                $.report.nlog("IE获取快速登录信息失败：" + f.message, "391626", .05)
            }
        else
            try {
                var C = $.nptxsso
                  , x = C.InitPVA()
                  , A = 0;
                if (0 != x) {
                    A = C.GetPVACount();
                    for (var k = 0; A > k; k++) {
                        var S = {
                            uin: C.GetUin(k),
                            name: C.GetAccountName(k),
                            uinString: C.GetUinString(k),
                            type: 0,
                            face: C.GetFaceIndex(k),
                            nick: C.GetNickname(k) || C.GetUinString(k),
                            flag: C.GetUinFlag(k),
                            key: C.GetST(k),
                            loginType: n
                        };
                        a.push(S)
                    }
                    "function" == typeof C.GetKeyIndex && (s = C.GetKeyIndex())
                }
                x && 0 != A || (__pt_webkitZeroLogin = !0,
                T(),
                $.report.monitor(2129654, 1))
            } catch (f) {
                navigator.userAgent.match(/mac.*?safari/i) ? !window.chrome && pt.plogin.showAssistant(4) : T(),
                $.report.nlog("非IE获取快速登录信息失败：" + (f.message || f), "391627", .05)
            }
    }
      , C = function(t) {
        for (var e = 0, i = a.length; i > e; e++) {
            var n = a[e];
            if (n.uinString == t)
                return n
        }
        return null 
    }
      , T = function() {
        if (0 != pt.ptui.enable_qlogin && !(navigator.userAgent.indexOf("Linux") > -1) && ($.cookie.get("pt_local_token") || ($.cookie.set("pt_local_token", Math.random(), "ptlogin2." + pt.ptui.domain),
        $.cookie.get("pt_local_token")))) {
            var t = pt.ptui.isHttps ? k : y
              , e = pt.ptui.isHttps ? 80 : 50
              , i = "http" + (pt.ptui.isHttps ? "s" : "") + "://localhost.ptlogin2." + pt.ptui.domain + ":[port]/pt_get_uins?callback=ptui_getuins_CB&r=" + Math.random() + "&pt_local_tk=" + $.cookie.get("pt_local_token")
              , n = 0;
            pt.qlogin.__getuinsClock = setTimeout(function() {
                return
            }, 20 * e),
            $.http.loadScript(i.replace("[port]", t[n++])),
            b = setInterval(function() {
                window.ptui_getuins_CB && ptui_getuins_CB.called && clearTimeout(pt.qlogin.__getuinsClock),
                n >= t.length || window.ptui_getuins_CB && ptui_getuins_CB.called ? clearInterval(b) : $.http.loadScript(i.replace("[port]", t[n++]))
            }, e)
        }
    }
      , x = function(t) {
        if (t) {
            pt.plogin.showLoading();
            var e = $.cookie.get("pt_local_token")
              , i = "http" + (pt.ptui.isHttps ? "s" : "") + "://localhost.ptlogin2." + pt.ptui.domain + ":[port]/pt_get_st?clientuin=" + t + "&callback=ptui_getst_CB&r=" + Math.random() + "&pt_local_tk=" + e
              , n = pt.ptui.isHttps ? k : y
              , o = pt.ptui.isHttps ? 80 : 50
              , r = 0;
            ptui_getst_CB.submitUrl = B({
                uin: t,
                pt_local_tk: "{{hash_clientkey}}"
            }),
            $.http.loadScript(i.replace("[port]", n[r++])),
            b = setInterval(function() {
                r >= n.length || window.ptui_getst_CB && ptui_getst_CB.called ? clearInterval(b) : $.http.loadScript(i.replace("[port]", n[r++])),
                r >= n.length && (pt.qlogin.__getstClock = setTimeout(function() {
                    pt.plogin.hideLoading(),
                    ptui_qlogin_CB("-1234", "", "快速登录失败，请检查QQ客户端是否打开")
                }, 3e3))
            }, o)
        }
    }
      , A = function(t) {
        t ? a = [].concat(t) : S();
        var e = []
          , n = a.length;
        if (pt.plogin.isNewQr) {
            var r = {};
            r.loginType = o,
            e.push(r)
        }
        if (pt.plogin.authUin && "0" == pt.ptui.auth_mode) {
            var r = {};
            r.name = pt.plogin.authUin,
            r.uinString = pt.plogin.authUin,
            r.nick = $.str.utf8ToUincode($.cookie.get("ptnick_" + pt.plogin.authUin)) || pt.plogin.authUin,
            r.loginType = i,
            e.push(r)
        }
        for (var s = 0; n > s; s++) {
            var l = a[s];
            if ((!pt.plogin.authUin || pt.plogin.authUin != l.name && pt.plogin.authUin != l.uinString) && (e.push(l),
            5 == e.length))
                break
        }
        return p = e,
        e
    }
      , E = function(t) {
        var e = ""
          , p = A(t)
          , a = $("qlogin_list");
        if (null  != a) {
            if (t) {
                var s = $("qr_area");
                s && a.removeChild(s),
                a.innerHTML = "",
                s && a.appendChild(s)
            }
            var c = p.length > f ? f : p.length;
            if (0 == c)
                return void pt.plogin.switchpage(1, !0);
            for (var h = 0; h < p.length; h++)
                (p[h].loginType == r || p[h].loginType == n) && (pt.qlogin.hasBuildQlogin = !0);
            pt.plogin.isNewQr && (1 == c && pt.plogin.isNewQr ? ($("qlogin_tips") && $.css.hide($("qlogin_tips")),
            $("qlogin_show").style.top = "25px") : ($("qlogin_tips") && $.css.show($("qlogin_tips")),
            $("qlogin_show").style.top = "")),
            u = Math.ceil(c / g),
            u >= 2 && $.css.show($("nextPage"));
            for (var m = 0; c > m; m++) {
                var _ = p[m]
                  , v = $.str.encodeHtml(_.uinString + "")
                  , w = $.str.encodeHtml(_.nick);
                "" == $.str.trim(_.nick) && (w = v);
                var y = _.flag
                  , k = 4 == (4 & y)
                  , b = pt.plogin.dftImg;
                if (_.loginType == o) {
                    var s = $("qr_area");
                    1 == c ? (s && ($("qr_area").className = "qr_0"),
                    "1033" == pt.ptui.lang && ($("qlogin_show").style.height = $("qlogin_show").offsetHeight + 10 + "px")) : s && ($("qr_area").className = "qr_1")
                } else
                    e += l.replace(/#uin#/g, v).replace(/#nick#/g, function() {
                        return w
                    }).replace(/#nick_class#/, k ? "nick red" : "nick").replace(/#vip_logo#/, k ? "vip_logo" : "").replace(/#type#/g, _.loginType).replace(/#src#/g, b).replace(/#tabindex#/, m + 1).replace(/#class#/g, _.loginType == i ? "auth" : "hide")
            }
            e = a.innerHTML + e,
            a.innerHTML = e;
            var q = $("qlogin_show").offsetWidth || d
              , S = 1 == u ? q : q / g * c;
            a.style.width = S + "px",
            pt.plogin.isNewQr && (a.style.width = S + 4 + "px"),
            R(),
            F()
        }
    }
      , N = function(t) {
        if (t) {
            S();
            var e = C(t);
            if (null  == e)
                pt.plogin.show_err(pt.str.qlogin_expire),
                $.report.monitor(231544, 1);
            else {
                var i = B(e);
                _ ? $.http.loadScript(i) : pt.plogin.redirect(pt.ptui.target, i),
                pt.plogin.showLoading(),
                window.clearTimeout(pt.qlogin.__getstClock),
                pt.qlogin.__getstClock = window.setTimeout("pt.plogin.hideLoading();pt.plogin.showAssistant(0);", 1e4)
            }
        }
    }
      , L = function(t, e, i) {
        var n = t.split("#")
          , o = n[0].indexOf("?") > 0 ? "&" : "?";
        return "?" == n[0].substr(n[0].length - 1, 1) && (o = ""),
        n[1] = n[1] ? "#" + n[1] : "",
        n[0] + o + e + "=" + i + n[1]
    }
      , P = function(t) {
        var e = pt.ptui.s_url;
        return 1 == pt.ptui.low_login && pt.plogin.low_login_enable && pt.plogin.isMailLogin && (e = L(e, "ss", 1)),
        pt.plogin.isMailLogin && t && (e = L(e, "account", encodeURIComponent(t))),
        e
    }
      , B = function(t) {
        var e = pt.ptui.isHttps ? "https://ssl.ptlogin2." : "http://ptlogin2."
          , i = e + pt.ptui.domain + "/" + (pt.ptui.jumpname || "jump") + "?";
        return 2 == pt.ptui.regmaster ? i = "http://ptlogin2.function.qq.com/jump?regmaster=2&" : 3 == pt.ptui.regmaster ? i = "http://ptlogin2.crm2.qq.com/jump?regmaster=3&" : 4 == pt.ptui.regmaster ? i = "https://ssl.ptlogin2.mail.qq.com/jump?regmaster=4&" : 5 == pt.ptui.regmaster && (i = e + "mp.qq.com/jump?regmaster=5&"),
        i += "clientuin=" + t.uin + "&keyindex=" + s + "&pt_aid=" + pt.ptui.appid + (pt.ptui.daid ? "&daid=" + pt.ptui.daid : "") + "&u1=" + encodeURIComponent(P()),
        i += "undefined" != typeof t.key ? "&clientkey=" + t.key : "&pt_local_tk=" + t.pt_local_tk,
        1 == pt.ptui.low_login && pt.plogin.low_login_enable && !pt.plogin.isMailLogin && (i += "&low_login_enable=1&low_login_hour=" + pt.plogin.low_login_hour),
        "0" != pt.ptui.csimc && pt.ptui.csimc && (i += "&csimc=" + pt.ptui.csimc + "&csnum=" + pt.ptui.csnum + "&authid=" + pt.ptui.authid),
        "1" == pt.ptui.pt_qzone_sig && (i += "&pt_qzone_sig=1"),
        "1" == pt.ptui.pt_light && (i += "&pt_light=1"),
        pt.ptui.pt_3rd_aid && (i += "&pt_3rd_aid=" + pt.ptui.pt_3rd_aid),
        _ && (i += "&ptopt=1"),
        i += "&style=" + pt.ptui.style
    }
      , Q = function() {
        var t = D();
        pt.plogin.redirect(pt.ptui.target, t),
        pt.plogin.showLoading()
    }
      , D = function() {
        var t = pt.plogin.authSubmitUrl;
        return t += "&regmaster=" + pt.ptui.regmaster + "&aid=" + pt.ptui.appid + "&s_url=" + encodeURIComponent(P()),
        1 == pt.ptui.low_login && pt.plogin.low_login_enable && (t += "&low_login_enable=1&low_login_hour=" + pt.plogin.low_login_hour),
        "1" == pt.ptui.pt_light && (t += "&pt_light=1"),
        t
    }
      , I = function(t) {
        return t.onerror = null ,
        t.src != pt.plogin.dftImg && (t.src = pt.plogin.dftImg),
        !1
    }
      , H = function(t) {
        var e = parseInt(t.getAttribute("type"))
          , o = t.getAttribute("uin");
        switch (e) {
        case i:
            Q();
            break;
        case n:
            N(o);
            break;
        case r:
            x(o)
        }
    }
      , M = function(t) {
        if (t) {
            var e = t.getAttribute("uin");
            e && ($("img_out_" + e).className = "img_out_focus")
        }
    }
      , V = function(t) {
        if (t) {
            var e = t.getAttribute("uin");
            e && ($("img_out_" + e).className = "img_out")
        }
    }
      , U = function(t) {
        t && (m != t && (V(m),
        m = t),
        M(t))
    }
      , O = function(t) {
        if (t) {
            var e = t.getAttribute("uin")
              , i = $("mengban_" + e);
            i && (i.className = "face_mengban")
        }
    }
      , j = function(t) {
        if (t) {
            var e = t.getAttribute("uin")
              , i = $("mengban_" + e);
            i && (i.className = "")
        }
    }
      , R = function() {
        var t = $("qlogin_list")
          , e = t.getElementsByTagName("a");
        e.length > 0 && (m = e[0])
    }
      , F = function() {
        try {
            m.focus()
        } catch (t) {}
    }
      , z = function() {
        var t = $("prePage")
          , e = $("nextPage");
        t && $.e.add(t, "click", function() {
            q(1)
        }),
        e && $.e.add(e, "click", function() {
            q(2)
        })
    }
      , G = function() {
        for (var t = p.length, e = 0; t > e; e++)
            p[e].uinString && $.http.loadScript((pt.ptui.isHttps ? "https://ssl.ptlogin2." : "http://ptlogin2.") + pt.ptui.domain + "/getface?appid=" + pt.ptui.appid + "&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin=" + p[e].uinString + "&r=" + Math.random())
    }
      , W = function() {
        z(),
        setTimeout(function() {
            $.report.monitor(492804, .05)
        }, 0)
    }
    ;
    return W(),
    {
        qloginInit: W,
        hasBuildQlogin: c,
        buildQloginList: E,
        imgClick: H,
        imgFocus: M,
        imgBlur: V,
        imgMouseover: U,
        imgMouseDowm: O,
        imgMouseUp: j,
        imgErr: I,
        focusHeader: F,
        initFace: G,
        authLoginSubmit: Q,
        __getstClock: v,
        __getuinsClock: w,
        getSurl: P,
        PCSvrQlogin: r
    }
}(),
pt.LoginState = {
    PLogin: 1,
    QLogin: 2
},
pt.plogin = {
    account: "",
    at_account: "",
    uin: "",
    salt: "",
    hasCheck: !1,
    lastCheckAccount: "",
    needVc: !1,
    vcFlag: !1,
    ckNum: {},
    action: [0, 0],
    passwordErrorNum: 1,
    isIpad: !1,
    t_appid: 46000101,
    seller_id: 703010802,
    checkUrl: "",
    loginUrl: "",
    verifycodeUrl: "",
    newVerifycodeUrl: "",
    needShowNewVc: !1,
    pt_verifysession: "",
    checkClock: 0,
    isCheckTimeout: !1,
    cntCheckTimeout: 0,
    checkTime: 0,
    submitTime: 0,
    errclock: 0,
    loginClock: 0,
    login_param: pt.ptui.href.substring(pt.ptui.href.indexOf("?") + 1),
    err_m: $("err_m"),
    low_login_enable: !0,
    low_login_hour: 720,
    low_login_isshow: !1,
    list_index: [-1, 2],
    keyCode: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13,
        TAB: 9,
        BACK: 8,
        DEL: 46,
        F5: 116
    },
    knownEmail: 25 == pt.ptui.style ? ["qq.com", "vip.qq.com", "foxmail.com"] : ["qq.com", "foxmail.com", "gmail.com", "hotmail.com", "yahoo.com", "sina.com", "163.com", "126.com", "vip.qq.com", "vip.sina.com", "sina.cn", "sohu.com", "yahoo.cn", "yahoo.com.cn", "139.com", "wo.com.cn", "189.cn", "live.com", "msn.com", "live.hk", "live.cn", "hotmail.com.cn", "hinet.net", "msa.hinet.net", "cm1.hinet.net", "umail.hinet.net", "xuite.net", "yam.com", "pchome.com.tw", "netvigator.com", "seed.net.tw", "anet.net.tw"],
    qrlogin_clock: 0,
    qrlogin_timeout: 0,
    qrlogin_timeout_time: 1e5,
    qrlogin_invalid: !1,
    isQrLogin: !1,
    qr_uin: "",
    qr_nick: "",
    onekey_verify_timeout: 36e5,
    onekeyVerifyClock: 0,
    dftImg: "",
    need_hide_operate_tips: !0,
    js_type: 1,
    xuiState: 1,
    delayTime: 5e3,
    delayMonitorId: "294059",
    hasSubmit: !1,
    isdTime: {},
    authUin: "",
    authSubmitUrl: "",
    loginState: pt.LoginState.PLogin,
    aqScanLink: "<a href='javascript:void(0)'; onclick='pt.plogin.switch_qrlogin()'>" + ("2052" == pt.ptui.lang ? "立即扫描" : "1028" == pt.ptui.lang ? "立即掃描" : "Scan now") + "</a>",
    isNewQr: !1,
    hasNoQlogin: !1,
    checkRet: -1,
    cap_cd: 0,
    authTimes: 0,
    checkErr: {
        2052: "网络繁忙，请稍后重试。",
        1028: "網絡繁忙，請稍後重試。",
        1033: "The network is busy, please try again later."
    },
    isTenpay: 34 == pt.ptui.style,
    isMailLogin: 25 == pt.ptui.style || 30 == pt.ptui.style,
    switchpageCount: 0,
    domFocus: function(t) {
        try {
            window.setTimeout(function() {
                t.focus()
            }, 0)
        } catch (e) {}
    },
    formFocus: function() {
        var t = document.loginform;
        try {
            var e = t.u
              , i = t.p
              , n = t.verifycode;
            if ("" == e.value)
                return void e.focus();
            if ("" == i.value)
                return void i.focus();
            "" == n.value && n.focus()
        } catch (o) {}
    },
    getAuthUrl: function() {
        var t = (pt.ptui.isHttps ? "https://ssl." : "http://") + "ptlogin2." + pt.ptui.domain + "/pt4_auth?daid=" + pt.ptui.daid + "&appid=" + pt.ptui.appid + "&auth_token=" + $.str.time33($.cookie.get("supertoken"))
          , e = pt.ptui.s_url;
        return /^https/.test(e) && (t += "&pt4_shttps=1"),
        "1" == pt.ptui.pt_qzone_sig && (t += "&pt_qzone_sig=1"),
        t
    },
    auth: function() {
        pt.plogin.authTimes++,
        pt.ptui.isHttps = $.check.isHttps();
        var t = pt.plogin.getAuthUrl()
          , e = $.cookie.get("superuin");
        pt.ptui.daid && "1" != pt.ptui.noAuth && "" != e && 4 != pt.ptui.regmaster && 5 != pt.ptui.regmaster ? $.http.loadScript(t) : pt.plogin.init()
    },
    initAuthInfo: function(t) {
        var e = $.cookie.get("uin").replace(/^o0*/, "")
          , i = $.str.utf8ToUincode($.cookie.get("ptnick_" + e)) || e;
        $("auth_uin").innerHTML = $.str.encodeHtml(e),
        $("auth_nick").innerHTML = $.str.encodeHtml(i),
        $("auth_area").setAttribute("authUrl", $.str.encodeHtml(t)),
        $.http.loadScript((pt.ptui.isHttps ? "https://ssl.ptlogin2." : "http://ptlogin2.") + pt.ptui.domain + "/getface?appid=" + pt.ptui.appid + "&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin=" + e + "&r=" + Math.random())
    },
    showAuth: function(t, e) {
        2 == t && $.css.hide($("cancleAuthOuter")),
        pt.plogin.initAuthInfo(e);
        var i = pt.ptui.style;
        (22 == i || 23 == i) && ($.css.hide($("header")),
        $.css.hide($("authHeader"))),
        $("authLogin").style.height = $("login").offsetHeight - (11 == i ? 2 : 4) + "px",
        $.css.show($("authLogin")),
        pt.plogin.ptui_notifySize("login")
    },
    cancleAuth: function() {
        var t = pt.ptui.style;
        (22 == t || 23 == t) && ($.css.show($("header")),
        $.css.show($("authHeader"))),
        $.css.hide($("authLogin")),
        pt.plogin.ptui_notifySize("login")
    },
    authLogin: function() {
        pt.qlogin.authLoginSubmit()
    },
    authMouseDowm: function() {
        var t = $("auth_mengban");
        t && (t.className = "face_mengban")
    },
    authMouseUp: function() {
        var t = $("auth_mengban");
        t && (t.className = "")
    },
    onQloginSwitch: function(t) {
        t.preventDefault(),
        pt.plogin.switchpage(pt.LoginState.QLogin),
        $.report.monitor("331284", .05)
    },
    initQlogin: function(t, e) {
        t = t || pt.plogin.initQlogin.url,
        pt.plogin.initQlogin.url = t;
        var i = 0
          , n = !1;
        if (t && 0 == pt.ptui.auth_mode && (n = !0),
        e || 0 == pt.ptui.enable_qlogin || 5 == $.cookie.get("pt_qlogincode") || (i = $.getLoginQQNum()),
        i += n ? 1 : 0,
        i += e ? e.length : 0,
        pt.plogin.hasNoQlogin = 0 == i ? !0 : !1,
        $("switcher_plogin").innerHTML = pt.plogin.isTenpay ? pt.str.otherqq_login : pt.str.h_pt_login,
        i > 0 || pt.plogin.isNewQr ? ($("login").className = "login",
        pt.plogin.switchpage(0 == i && (pt.plogin.isMailLogin || pt.plogin.isTenpay) ? pt.LoginState.PLogin : pt.LoginState.QLogin)) : (pt.plogin.switchpage(pt.LoginState.PLogin),
        $("login").className = "login_no_qlogin",
        $("u").value && 0 == pt.ptui.auth_mode && pt.plogin.check()),
        pt.qlogin.hasBuildQlogin || pt.qlogin.buildQloginList(e),
        0 != pt.ptui.auth_mode && t && pt.plogin.showAuth(pt.ptui.auth_mode, t),
        0 == pt.ptui.enable_qlogin && 0 == $.sso_ver)
            try {
                if ($.suportActive()) {
                    var o = new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2").QuerySSOInfo(1);
                    $.sso_ver = o.GetInt("nSSOVersion")
                } else
                    $.nptxsso || ($.nptxsso = document.createElement("embed"),
                    $.nptxsso.type = "application/nptxsso",
                    $.nptxsso.style.width = "0px",
                    $.nptxsso.style.height = "0px",
                    document.body.appendChild($.nptxsso)),
                    $.sso_ver = $.nptxsso.GetSSOVersion(),
                    document.body.removeChild($.nptxsso),
                    $.nptxsso = null 
            } catch (r) {
                $.sso_ver = 0
            }
    },
    switchpage: function(t, e) {
        pt.plogin.switchpageCount++;
        var i, n;
        switch (pt.plogin.loginState = t,
        e || pt.plogin.hide_err(),
        t) {
        case 1:
            $.css.hide($("bottom_qlogin")),
            $.css.hide($("qlogin")),
            $.css.show($("web_qr_login")),
            $("qrswitch") && $.css.show($("qrswitch")),
            $("switcher_plogin").className = "switch_btn_focus",
            $("switcher_qlogin").className = "switch_btn",
            n = $("switcher_plogin").offsetWidth,
            i = $("switcher_plogin").parentNode.offsetWidth - n,
            "ff" != $.browser("type") && window.setTimeout(function() {
                pt.plogin.formFocus()
            }, 0),
            pt.plogin.isNewQr && pt.plogin.cancle_qrlogin(),
            pt.plogin.armSafeEdit && pt.plogin.armSafeEdit.everSafe && (pt.plogin.armSafeEdit.lockToggle(),
            pt.plogin.armSafeEdit.everSafe = !1),
            0 != pt.plogin.onekeyVerifyClock && pt.plogin.onekeyVerify("normal"),
            pt.plogin.hasCheck = !1;
            break;
        case 2:
            $.css.hide($("web_qr_login")),
            $.css.show($("qlogin")),
            $("switcher_plogin").className = "switch_btn",
            $("switcher_qlogin").className = "switch_btn_focus",
            $("qrswitch") && $.css.hide($("qrswitch")),
            $.css.show($("bottom_qlogin")),
            pt.qlogin.focusHeader(),
            i = 0,
            n = $("switcher_qlogin").offsetWidth,
            pt.plogin.isNewQr && pt.plogin.begin_qrlogin(),
            pt.plogin.armSafeEdit.isSafe && (pt.plogin.armSafeEdit.lockToggle(),
            pt.plogin.armSafeEdit.everSafe = !0)
        }
        window.setTimeout(function() {
            try {
                1 == pt.plogin.switchpageCount ? ($("switch_bottom").style.left = i + "px",
                $("switch_bottom").style.width = n + "px") : $.animate.animate("switch_bottom", {
                    left: i,
                    width: n
                }, 80, 20)
            } catch (t) {
                $("switch_bottom").style.left = i + "px",
                $("switch_bottom").style.width = n + "px"
            }
        }, 100),
        pt.plogin.ptui_notifySize("login")
    },
    detectCapsLock: function(t) {
        var e = t.keyCode || t.which
          , i = t.shiftKey || 16 == e || !1;
        return e >= 65 && 90 >= e && !i || e >= 97 && 122 >= e && i ? !0 : !1
    },
    generateEmailTips: function(t) {
        var e = t.indexOf("@")
          , i = "";
        i = -1 == e ? t : t.substring(0, e);
        for (var n = [], o = 0, r = pt.plogin.knownEmail.length; r > o; o++)
            n.push(i + "@" + pt.plogin.knownEmail[o]);
        for (var p = [], a = 0, r = n.length; r > a; a++)
            n[a].indexOf(t) > -1 && p.push($.str.encodeHtml(n[a]));
        return 19 == pt.ptui.style && (p = []),
        p
    },
    createEmailTips: function(t) {
        var e = pt.plogin.generateEmailTips(t)
          , i = e.length
          , n = []
          , o = ""
          , r = 4;
        if (i = Math.min(i, r),
        0 == i)
            return pt.plogin.list_index[0] = -1,
            void pt.plogin.hideEmailTips();
        for (var p = 0; i > p; p++) {
            if (t == e[p])
                return void pt.plogin.hideEmailTips();
            o = "emailTips_" + p,
            n.push(0 == p ? "<li id=" + o + " class='hover' >" + e[p] + "</li>" : "<li id=" + o + ">" + e[p] + "</li>")
        }
        $("email_list").innerHTML = n.join(" "),
        pt.plogin.list_index[0] = 0
    },
    showEmailTips: function() {
        $.css.show($("email_list")),
        pt.plogin.__isShowEmailTips = !0
    },
    hideEmailTips: function() {
        $.css.hide($("email_list")),
        pt.plogin.__isShowEmailTips = !1
    },
    setUrl: function() {
        var t = pt.ptui.domain
          , e = $.check.isHttps() && $.check.isSsl();
        pt.plogin.checkUrl = (pt.ptui.isHttps ? "https://ssl." : "http://check.") + "ptlogin2." + t + "/check",
        pt.plogin.loginUrl = (pt.ptui.isHttps ? "https://ssl." : "http://") + "ptlogin2." + t + "/",
        pt.plogin.verifycodeUrl = (pt.ptui.isHttps ? "https://ssl." : "http://") + "captcha." + t + "/getimage",
        pt.plogin.newVerifycodeUrl = (pt.ptui.isHttps ? "https://ssl." : "http://") + "captcha.qq.com/cap_union_show?clientype=2",
        e && "qq.com" != t && "tenpay.com" != t && (pt.plogin.verifycodeUrl = "https://ssl.ptlogin2." + t + "/ptgetimage");
        var i = pt.ptui.isHttps ? "https://ssl." : "http://"
          , n = pt.ptui.isHttps ? "https://ssl." : "http://check.";
        2 == pt.ptui.regmaster ? (pt.plogin.checkUrl = "http://check.ptlogin2.function.qq.com/check",
        pt.plogin.loginUrl = "http://ptlogin2.function.qq.com/") : 3 == pt.ptui.regmaster ? (pt.plogin.checkUrl = n + "ptlogin2.crm2.qq.com/check",
        pt.plogin.loginUrl = i + "ptlogin2.crm2.qq.com/") : 4 == pt.ptui.regmaster ? (pt.plogin.checkUrl = "https://ssl.ptlogin2.mail.qq.com/check",
        pt.plogin.loginUrl = "https://ssl.ptlogin2.mail.qq.com/") : 5 == pt.ptui.regmaster && (pt.plogin.checkUrl = n + "ptlogin2.mp.qq.com/check",
        pt.plogin.loginUrl = i + "ptlogin2.mp.qq.com/"),
        pt.plogin.dftImg = pt.ptui.isHttps ? "https://ui.ptlogin2.qq.com/style/0/images/1.gif" : "http://imgcache.qq.com/ptlogin/v4/style/0/images/1.gif"
    },
    init: function(t) {
        pt.ptui.login_sig = pt.ptui.login_sig || $.cookie.get("pt_login_sig"),
        pt.plogin.setLowloginCheckbox(),
        pt.plogin.isNewQr = 25 == pt.ptui.style || 32 == pt.ptui.style || 33 == pt.ptui.style || pt.plogin.isTenpay ? !0 : !1,
        pt.ptui.isHttps = $.check.isHttps(),
        pt.plogin.setUrl(),
        pt.plogin.bindEvent(),
        $("login_button") && ($("login_button").disabled = !1),
        pt.plogin.set_default_uin(pt.ptui.defaultUin),
        pt.plogin.isTenpay && pt.ptui.defaultUin && (pt.ptui.lockuin = 1),
        $.check.is_weibo_appid(pt.ptui.appid) && $("u") && ($("u").style.imeMode = "auto"),
        pt.ptui.isHttps && (pt.plogin.delayTime = 7e3,
        pt.plogin.delayMonitorId = "294060"),
        pt.plogin.hideVipLink(),
        pt.ptui.lockuin ? pt.plogin.doLockuin() : pt.plogin.initQlogin(t),
        !(pt.plogin.isTenpay && $.sso_ver >= 1093) || pt.plogin.isWin8() && $.suportActive() || pt.plogin.armSafeEdit(),
        window.setTimeout(function() {
            pt.plogin.domLoad()
        }, 100)
    },
    isWin8: function() {
        var t = navigator.userAgent.toLowerCase();
        return t.indexOf("windows nt 6.2") > -1 || t.indexOf("windows nt 6.3") > -1 ? !0 : !1
    },
    aq_patch: function() {
        Math.random() < .05 && !pt.ptui.isHttps && $.http.loadScript("http://mat1.gtimg.com/www/js/common_v2.js", function() {
            if ("function" == typeof checkNonTxDomain)
                try {
                    checkNonTxDomain(1, 5)
                } catch (t) {}
        })
    },
    hideVipLink: function() {
        var t = $("vip_link2")
          , e = $("vip_dot");
        !t || !e || $.check.needVip(pt.ptui.appid) && "2052" == pt.ptui.lang || ($.css.addClass(t, "hide"),
        $.css.addClass(e, "hide"))
    },
    set_default_uin: function(t) {
        "0" != t && (t || (t = unescape($.cookie.getOrigin("ptui_loginuin")),
        pt.ptui.appid != pt.plogin.t_appid && ($.check.isNick(t) || $.check.isName(t)) && (t = $.cookie.get("pt2gguin").replace(/^o/, "") - 0,
        t = 0 == t ? "" : t)),
        $("u").value = t,
        t && ($.css.hide($("uin_tips")),
        $("uin_del") && $.css.show($("uin_del")),
        pt.plogin.set_account()))
    },
    doLockuin: function() {
        pt.plogin.switchpage(pt.LoginState.PLogin, !0),
        $("u").readOnly = !0;
        var t = $("uinArea");
        $.css.hasClass(t, "default") || $.css.addClass(t, "default");
        var e = $("uin_del");
        e && e.parentNode.removeChild(e),
        $.e.remove($("switcher_qlogin"), "click", pt.plogin.onQloginSwitch),
        $("switcher_qlogin").className = "switch_btn_disabled",
        $("p").focus()
    },
    set_account: function() {
        var t = $.str.trim($("u").value)
          , e = pt.ptui.appid;
        if (pt.plogin.account = t,
        pt.plogin.at_account = t,
        $.check.isQiyeQQ800(t))
            return pt.plogin.at_account = "@" + t,
            !0;
        if ($.check.is_weibo_appid(e)) {
            if ($.check.isQQ(t) || $.check.isMail(t))
                return !0;
            if ($.check.isNick(t) || $.check.isName(t))
                return pt.plogin.at_account = "@" + t,
                !0;
            if ($.check.isPhone(t))
                return pt.plogin.at_account = "@" + t.replace(/^(86|886)/, ""),
                !0;
            if ($.check.isSeaPhone(t))
                return pt.plogin.at_account = "@00" + t.replace(/^(00)/, ""),
                /^(@0088609)/.test(pt.plogin.at_account) && (pt.plogin.at_account = pt.plogin.at_account.replace(/^(@0088609)/, "@008869")),
                !0
        } else {
            if ($.check.isQQ(t) || $.check.isMail(t))
                return !0;
            if ($.check.isPhone(t))
                return pt.plogin.at_account = "@" + t.replace(/^(86|886)/, ""),
                !0;
            if ($.check.isNick(t))
                return $("u").value = t + "@qq.com",
                pt.plogin.account = t + "@qq.com",
                pt.plogin.at_account = t + "@qq.com",
                !0
        }
        return $.check.isForeignPhone(t) && (pt.plogin.at_account = "@" + t),
        !0
    },
    show_err: function(t, e) {
        pt.plogin.hideLoading(),
        $.css.show($("error_tips")),
        pt.plogin.err_m.innerHTML = t,
        clearTimeout(pt.plogin.errclock),
        e || (pt.plogin.errclock = setTimeout("pt.plogin.hide_err()", 5e3))
    },
    hide_err: function() {
        $.css.hide($("error_tips")),
        pt.plogin.err_m.innerHTML = ""
    },
    showAssistant: function(t) {
        if ("2052" == pt.ptui.lang) {
            pt.plogin.hideLoading(),
            $.css.show($("error_tips"));
            var e = "";
            switch (t) {
            case 0:
                e = "快速登录异常，试试 {/assistant/troubleshooter.html,登录助手,} 修复",
                $.report.monitor("315785");
                break;
            case 1:
                e = "快速登录异常，试试 {/assistant/troubleshooter.html,登录助手,} 修复",
                $.report.monitor("315786");
                break;
            case 2:
                e = "登录异常，试试 {/assistant/troubleshooter.html,登录助手,} 修复",
                $.report.monitor("315787");
                break;
            case 3:
                e = "快速登录异常，试试 {http://im.qq.com/qq/2013/,升级QQ,onclick='$.report.monitor(326049);'} 修复",
                $.report.monitor("326046");
                break;
            case 4:
                e = "快速登录异常，试试 {http://im.qq.com/macqq/index.shtml#im.qqformac.plusdown,安装插件,} 并重启浏览器"
            }
            pt.plogin.err_m.innerHTML = e.replace(/{([^,]+?),([^,]+?),(.*?)}/, "<a class='tips_link' style='color: #29B1F1' href='$1' target='_blank' $3>$2</a>")
        }
    },
    showGuanjiaTips: function() {
        $.initGuanjiaPlugin(),
        $.guanjiaPlugin ? ($.guanjiaPlugin.QMStartUp(16, '/traytip=3 /tipProblemid=1401 /tipSource=18 /tipType=0 /tipIdParam=0 /tipIconUrl="http://dldir2.qq.com/invc/xfspeed/qqpcmgr/clinic/image/tipsicon_qq.png" /tipTitle="QQ快速登录异常?" /tipDesc="不能用已登录的QQ号快速登录，只能手动输入账号密码，建议用电脑诊所一键修复。"'),
        $.report.monitor("316548")) : $.report.monitor("316549")
    },
    showLoading: function(t) {
        t = pt.plogin.loginState == pt.LoginState.QLogin ? 10 : 20,
        pt.plogin.hide_err(),
        $("loading_tips").style.top = t + "px",
        $.css.show($("loading_tips"))
    },
    hideLoading: function() {
        $.css.hide($("loading_tips"))
    },
    showLowList: function() {
        var t = $("combox_list");
        t && ($.css.show(t),
        pt.plogin.low_login_isshow = !0)
    },
    hideLowList: function() {
        var t = $("combox_list");
        t && ($.css.hide(t),
        pt.plogin.low_login_isshow = !1)
    },
    u_focus: function() {
        "" == $("u").value && ($.css.show($("uin_tips")),
        $("uin_tips").className = "input_tips_focus"),
        $("u").parentNode.className = "inputOuter_focus"
    },
    u_blur: function() {
        if (!pt.plogin.__isShowEmailTips) {
            /^\+/.test(this.value) && (this.value = this.value.replace(/^\+/, ""),
            /^00/.test(this.value) || (this.value = "00" + this.value));
            var t = $("u");
            if ("" == t.value) {
                var e = $("uin_tips");
                $.css.show(e),
                e.className = "input_tips"
            } else
                pt.plogin.set_account(),
                pt.plogin.check();
            t.parentNode.className = "inputOuter"
        }
    },
    u_mouseover: function() {
        var t = $("u").parentNode;
        "inputOuter_focus" == t.className || ($("u").parentNode.className = "inputOuter_hover")
    },
    u_mouseout: function() {
        var t = $("u").parentNode;
        "inputOuter_focus" == t.className || ($("u").parentNode.className = "inputOuter")
    },
    window_blur: function() {
        pt.plogin.lastCheckAccount = ""
    },
    u_change: function() {
        pt.plogin.set_account(),
        pt.plogin.passwordErrorNum = 1,
        pt.plogin.hasCheck = !1,
        pt.plogin.hasSubmit = !1
    },
    list_keydown: function(t, e) {
        var i = $("email_list")
          , n = $("u");
        1 == e && (i = $("combox_list"));
        var o = i.getElementsByTagName("li")
          , r = o.length
          , p = t.keyCode;
        switch (p) {
        case pt.plogin.keyCode.UP:
            o[pt.plogin.list_index[e]].className = "",
            pt.plogin.list_index[e] = (pt.plogin.list_index[e] - 1 + r) % r,
            o[pt.plogin.list_index[e]].className = "hover";
            break;
        case pt.plogin.keyCode.DOWN:
            o[pt.plogin.list_index[e]].className = "",
            pt.plogin.list_index[e] = (pt.plogin.list_index[e] + 1) % r,
            o[pt.plogin.list_index[e]].className = "hover";
            break;
        case pt.plogin.keyCode.ENTER:
            var a = o[pt.plogin.list_index[e]].innerHTML;
            0 == e && (n.value = $.str.decodeHtml(a)),
            pt.plogin.hideEmailTips(),
            pt.plogin.hideLowList(),
            t.preventDefault();
            break;
        case pt.plogin.keyCode.TAB:
            pt.plogin.hideEmailTips(),
            pt.plogin.hideLowList()
        }
        1 == e && ($("combox_box").innerHTML = o[pt.plogin.list_index[e]].innerHTML,
        $("low_login_hour").value = o[pt.plogin.list_index[e]].getAttribute("value"))
    },
    u_keydown: function(t) {
        $.css.hide($("uin_tips")),
        -1 != pt.plogin.list_index[0] && pt.plogin.list_keydown(t, 0)
    },
    u_keyup: function(t) {
        var e = this.value;
        "" == e ? ($.css.show($("uin_tips")),
        $("uin_tips").className = "input_tips_focus",
        $("uin_del") && $.css.hide($("uin_del"))) : $("uin_del") && $.css.show($("uin_del"));
        var i = t.keyCode;
        i != pt.plogin.keyCode.UP && i != pt.plogin.keyCode.DOWN && i != pt.plogin.keyCode.ENTER && i != pt.plogin.keyCode.TAB && i != pt.plogin.keyCode.F5 && ($("u").value.indexOf("@") > -1 ? (pt.plogin.showEmailTips(),
        pt.plogin.createEmailTips($("u").value)) : pt.plogin.hideEmailTips())
    },
    email_mousemove: function(t) {
        var e = t.target;
        if ("li" == e.tagName.toLowerCase()) {
            var i = $("emailTips_" + pt.plogin.list_index[0]);
            i && (i.className = ""),
            e.className = "hover",
            pt.plogin.list_index[0] = parseInt(e.getAttribute("id").substring(10)),
            t.stopPropagation()
        }
    },
    email_click: function(t) {
        var e = t.target;
        if ("li" == e.tagName.toLowerCase()) {
            var i = $("emailTips_" + pt.plogin.list_index[0]);
            i && ($("u").value = $.str.decodeHtml(i.innerHTML),
            pt.plogin.set_account(),
            pt.plogin.check()),
            pt.plogin.hideEmailTips(),
            t.stopPropagation()
        }
    },
    p_focus: function() {
        "" == this.value && ($.css.show($("pwd_tips")),
        $("pwd_tips").className = "input_tips_focus"),
        this.parentNode.className = "inputOuter_focus",
        pt.plogin.check()
    },
    p_blur: function() {
        "" == this.value && ($.css.show($("pwd_tips")),
        $("pwd_tips").className = "input_tips"),
        $.css.hide($("caps_lock_tips")),
        this.parentNode.className = "inputOuter"
    },
    p_mouseover: function() {
        var t = $("p").parentNode;
        "inputOuter_focus" == t.className || ($("p").parentNode.className = "inputOuter_hover")
    },
    p_mouseout: function() {
        var t = $("p").parentNode;
        "inputOuter_focus" == t.className || ($("p").parentNode.className = "inputOuter")
    },
    p_keydown: function() {
        $.css.hide($("pwd_tips"))
    },
    p_keyup: function() {
        "" == this.value && $.css.show($("pwd_tips"))
    },
    p_keypress: function(t) {
        pt.plogin.detectCapsLock(t) ? $.css.show($("caps_lock_tips")) : $.css.hide($("caps_lock_tips"))
    },
    vc_focus: function() {
        "" == this.value && ($.css.show($("vc_tips")),
        $("vc_tips").className = "input_tips_focus"),
        this.parentNode.className = "inputOuter_focus"
    },
    vc_blur: function() {
        "" == this.value && ($.css.show($("vc_tips")),
        $("vc_tips").className = "input_tips"),
        this.parentNode.className = "inputOuter"
    },
    vc_keydown: function() {
        $.css.hide($("vc_tips"))
    },
    vc_keyup: function() {
        "" == this.value && $.css.show($("vc_tips"))
    },
    document_click: function() {
        pt.plogin.action[0]++,
        pt.plogin.hideEmailTips(),
        pt.plogin.hideLowList()
    },
    document_keydown: function() {
        pt.plogin.action[1]++
    },
    setLowloginCheckbox: function() {
        pt.plogin.isMailLogin && (pt.plogin.low_login_enable = !1),
        1 == pt.ptui.low_login && (pt.plogin.low_login_enable ? ($("q_low_login_enable").className = "checked",
        $("p_low_login_enable").className = "checked",
        $("auth_low_login_enable").className = "checked") : ($("q_low_login_enable").className = "uncheck",
        $("p_low_login_enable").className = "uncheck",
        $("auth_low_login_enable").className = "uncheck"))
    },
    checkbox_click: function() {
        pt.plogin.low_login_enable ? ($("q_low_login_enable").className = "uncheck",
        $("p_low_login_enable").className = "uncheck",
        $("auth_low_login_enable").className = "uncheck") : ($("q_low_login_enable").className = "checked",
        $("p_low_login_enable").className = "checked",
        $("auth_low_login_enable").className = "checked"),
        pt.plogin.low_login_enable = !pt.plogin.low_login_enable
    },
    feedback: function(t) {
        var e = t ? t.target : null 
          , i = e ? e.id + "-" : ""
          , n = "http://support.qq.com/write.shtml?guest=1&fid=713&SSTAG=hailunna-" + i + $.str.encodeHtml(pt.plogin.account);
        window.open(n)
    },
    bind_account: function() {
        $.css.hide($("operate_tips")),
        pt.plogin.need_hide_operate_tips = !0,
        window.open("http://id.qq.com/index.html#account"),
        $.report.monitor("234964")
    },
    combox_click: function(t) {
        pt.plogin.low_login_isshow ? pt.plogin.hideLowList() : pt.plogin.showLowList(),
        t.stopPropagation()
    },
    delUin: function(t) {
        t && $.css.hide(t.target),
        $("u").value = "",
        pt.plogin.domFocus($("u")),
        pt.plogin.hasCheck = !1
    },
    check_cdn_img: function() {
        if (window.g_cdn_js_fail && !pt.ptui.isHttps) {
            var t = new Image;
            t.onload = function() {
                t.onload = t.onerror = null 
            }
            ,
            t.onerror = function() {
                t.onload = t.onerror = null ;
                var e = $("main_css").innerHTML
                  , i = "http://imgcache.qq.com/ptlogin/v4/style/"
                  , n = "http://ui.ptlogin2.qq.com/style/";
                e = e.replace(new RegExp(i,"g"), n),
                pt.plogin.insertInlineCss(e),
                $.report.monitor(312520)
            }
            ,
            t.src = "http://imgcache.qq.com/ptlogin/v4/style/20/images/c_icon_1.png"
        }
    },
    insertInlineCss: function(t) {
        if (document.createStyleSheet) {
            var e = document.createStyleSheet("");
            e.cssText = t
        } else {
            var i = document.createElement("style");
            i.type = "text/css",
            i.textContent = t,
            document.getElementsByTagName("head")[0].appendChild(i)
        }
    },
    createLink: function(t) {
        var e = document.createElement("link");
        e.setAttribute("type", "text/css"),
        e.setAttribute("rel", "stylesheet"),
        e.setAttribute("href", t),
        document.getElementsByTagName("head")[0].appendChild(e)
    },
    checkInputLable: function() {
        try {
            $("u").value && $.css.hide($("uin_tips")),
            window.setTimeout(function() {
                $("p").value && $.css.hide($("pwd_tips"))
            }, 1e3)
        } catch (t) {}
    },
    domLoad: function(t) {
        if (!pt.plogin.hasDomLoad) {
            pt.plogin.hasDomLoad = !0,
            pt.plogin.isNewQr && pt.plogin.loginState == pt.LoginState.QLogin && (t ? pt.plogin.begin_qrlogin() : window.setTimeout(function() {
                pt.plogin.begin_qrlogin()
            }, 0)),
            pt.plogin.checkInputLable(),
            pt.plogin.checkNPLoad(),
            pt.qlogin.initFace(),
            pt.plogin.loadQrTipsPic();
            var e = $("loading_img");
            e && e.setAttribute("src", e.getAttribute("place_src")),
            pt.plogin.check_cdn_img(),
            pt.plogin.ptui_notifySize("login"),
            $.report.monitor("373507&union=256042", .05),
            navigator.cookieEnabled || ($.report.monitor(408084),
            $.cookie.get("ptcz") && $.report.monitor(408085)),
            pt.plogin.isTenpay && $.report.monitor($.sso_ver >= 1093 ? "451205" : "451206"),
            pt.plogin.dottedShow(),
            pt.plogin.webLoginReport(),
            pt.plogin.monitorQQNum(),
            pt.plogin.aq_patch(),
            pt.plogin.gzipReport()
        }
    },
    dottedShow: function() {
        try {
            var t = $("bottom_qlogin");
            if (!t)
                return;
            var e = t.getElementsByTagName("span");
            if (!e || 0 == e.length)
                return;
            for (var i = e[e.length - 1], n = i, o = !1; n; ) {
                var r = n.tagName && n.tagName.toLowerCase();
                if ("a" == r) {
                    o = !0;
                    break
                }
                n = n.nextSibling
            }
            o || (i.style.display = "none")
        } catch (p) {
            $.report.nlog("dotted show " + p.message)
        }
    },
    checkNPLoad: function() {
        navigator.mimeTypes["application/nptxsso"] && !$.sso_loadComplete && $.checkNPPlugin()
    },
    gzipReport: function() {
        if ("1" == pt.ptui.gzipEnable || pt.ptui.isHttps)
            ;
        else {
            $.report.monitor("455847");
            var t = $.http.getXHR();
            if (t) {
                var e = "get"
                  , i = "/cgi-bin/xver?t=" + Math.random();
                t.open(e, i),
                t.onreadystatechange = function() {
                    if (4 == t.readyState)
                        if (t.status >= 200 && t.status < 300 || 304 === t.status || 1223 === t.status || 0 === t.status) {
                            var e = document.createElement("script");
                            e.innerHTML = t.responseText,
                            document.getElementsByTagName("head")[0].appendChild(e),
                            window._gz || $.report.nlog("gzip探测异常，返回内容：" + t.responseText + "返回码：" + t.status + "uin=" + $.cookie.get("pt2gguin"), "462348")
                        } else
                            $.report.nlog("gzip探测异常，返回内容：" + t.responseText + "返回码：" + t.status + "uin=" + $.cookie.get("pt2gguin"), "462348")
                }
                ,
                t.send()
            }
        }
    },
    monitorQQNum: function() {
        var t = $.loginQQnum;
        switch (t) {
        case 0:
            $.report.monitor("330314", .05);
            break;
        case 1:
            $.report.monitor("330315", .05);
            break;
        case 2:
            $.report.monitor("330316", .05);
            break;
        case 3:
            $.report.monitor("330317", .05);
            break;
        case 4:
            $.report.monitor("330318", .05);
            break;
        default:
            $.report.monitor("330319", .05)
        }
    },
    noscript_err: function() {
        $.report.nlog("noscript_err", 316648),
        $("noscript_area").style.display = "none"
    },
    bindEvent: function() {
        function msgCB(t) {
            var e = t.type;
            switch (e + "") {
            case "1":
                pt.plogin.vcodeMessage(t);
                break;
            case "2":
                pt.plogin.hideVC()
            }
        }
        var domU = $("u")
          , domP = $("p")
          , domVerifycode = $("verifycode")
          , domVC = $("verifyimgArea")
          , domBtn = $("login_button")
          , domCheckBox_p = $("p_low_login_box")
          , domCheckBox_q = $("q_low_login_box")
          , domCheckBox_auth = $("auth_low_login_box")
          , domEmailList = $("email_list")
          , domFeedback_web = $("feedback_web")
          , domFeedback_qr = $("feedback_qr")
          , domFeedback_qlogin = $("feedback_qlogin")
          , domClose = $("close")
          , domQloginSwitch = $("switcher_qlogin")
          , domLoginSwitch = $("switcher_plogin")
          , domDelUin = $("uin_del")
          , domBindAccount = $("bind_account")
          , domCancleAuth = $("cancleAuth")
          , domAuthClose = $("authClose")
          , domAuthArea = $("auth_area")
          , domAuthCheckBox = $("auth_low_login_enable")
          , domQr_invalid = $("qr_invalid")
          , domGoback = $("goBack")
          , domQr_img_box = $("qr_img_box")
          , domQr_img = $("qrlogin_img")
          , domQr_info_link = $("qr_info_link")
          , domQrswitch = $("qrswitch_logo");
        domQrswitch && $.e.add(domQrswitch, "click", pt.plogin.switch_qrlogin),
        domQr_info_link && $.e.add(domQr_img, "click", function() {
            $.report.monitor("331287", .05)
        }),
        domQr_img_box && ($.e.add(domQr_img_box, "mouseover", pt.plogin.showQrTips),
        $.e.add(domQr_img_box, "mouseout", pt.plogin.hideQrTips)),
        domGoback && $.e.add(domGoback, "click", function(t) {
            t.preventDefault(),
            pt.plogin.go_qrlogin_step(1),
            $.report.monitor("331288", .05)
        }),
        domAuthArea && ($.e.add(domAuthArea, "click", pt.plogin.authLogin),
        $.e.add(domAuthArea, "mousedown", pt.plogin.authMouseDowm),
        $.e.add(domAuthArea, "mouseup", pt.plogin.authMouseUp)),
        domCancleAuth && $.e.add(domCancleAuth, "click", pt.plogin.cancleAuth),
        domAuthClose && $.e.add(domAuthClose, "click", pt.plogin.ptui_notifyClose),
        domQloginSwitch && $.e.add(domQloginSwitch, "click", pt.plogin.onQloginSwitch),
        domLoginSwitch && $.e.add(domLoginSwitch, "click", function(t) {
            t.preventDefault(),
            pt.plogin.switchpage(pt.LoginState.PLogin),
            $.report.monitor("331285", .05)
        }),
        domBindAccount && ($.e.add(domBindAccount, "click", pt.plogin.bind_account),
        $.e.add(domBindAccount, "mouseover", function() {
            pt.plogin.need_hide_operate_tips = !1
        }),
        $.e.add(domBindAccount, "mouseout", function() {
            pt.plogin.need_hide_operate_tips = !0
        })),
        domClose && $.e.add(domClose, "click", pt.plogin.ptui_notifyClose),
        1 == pt.ptui.low_login && domCheckBox_p && domCheckBox_q && ($.e.add(domCheckBox_p, "click", pt.plogin.checkbox_click),
        $.e.add(domCheckBox_q, "click", pt.plogin.checkbox_click)),
        1 == pt.ptui.low_login && domCheckBox_auth && $.e.add(domCheckBox_auth, "click", pt.plogin.checkbox_click),
        $.e.add(domU, "focus", pt.plogin.u_focus),
        $.e.add(domU, "blur", pt.plogin.u_blur),
        $.e.add(domU, "change", pt.plogin.u_change),
        $.e.add(domU, "keydown", pt.plogin.u_keydown),
        $.e.add(domU, "keyup", pt.plogin.u_keyup),
        $.e.add(domDelUin, "click", pt.plogin.delUin),
        $.e.add(domP, "focus", pt.plogin.p_focus),
        $.e.add(domP, "blur", pt.plogin.p_blur),
        $.e.add(domP, "keydown", pt.plogin.p_keydown),
        $.e.add(domP, "keyup", pt.plogin.p_keyup),
        $.e.add(domP, "keypress", pt.plogin.p_keypress),
        $.e.add(domBtn, "click", function(t) {
            t && t.preventDefault(),
            1 == pt.plogin.needShowNewVc ? pt.plogin.showVC() : pt.plogin.submit(t)
        }),
        $.e.add(domVC, "click", pt.plogin.changeVC),
        $.e.add(domEmailList, "mousemove", pt.plogin.email_mousemove),
        $.e.add(domEmailList, "click", pt.plogin.email_click),
        $.e.add(document, "click", pt.plogin.document_click),
        $.e.add(document, "keydown", pt.plogin.document_keydown),
        $.e.add(domVerifycode, "focus", pt.plogin.vc_focus),
        $.e.add(domVerifycode, "blur", pt.plogin.vc_blur),
        $.e.add(domVerifycode, "keydown", pt.plogin.vc_keydown),
        $.e.add(domVerifycode, "keyup", pt.plogin.vc_keyup),
        $.e.add(window, "load", pt.plogin.domLoad),
        $.e.add(window, "message", function(e) {
            var origin = e.origin;
            if (origin == (pt.ptui.isHttps ? "https://ssl." : "http://") + "captcha.qq.com") {
                var data = e.data;
                data = window.JSON ? JSON.parse(data) : eval("(" + data + ")"),
                msgCB(data)
            }
        }),
        navigator.captcha_callback = msgCB;
        var noscript_img = $("noscript_img");
        noscript_img && ($.e.add(noscript_img, "load", pt.plogin.noscript_err),
        $.e.add(noscript_img, "error", pt.plogin.noscript_err));
        var domVip2 = $("vip_link2");
        domVip2 && $.e.add(domVip2, "click", function(t) {
            window.open("http://pay.qq.com/qqvip/index.shtml?aid=vip.gongneng.other.red.dengluweb_wording2_open"),
            t.preventDefault(),
            $.report.monitor("263482")
        }),
        pt.plogin.isNewQr && $.e.add(document, "visibilitychange", function() {
            var t = document.visibilityState;
            switch (t) {
            case "hidden":
                pt.plogin.cancle_qrlogin();
                break;
            case "visible":
                pt.plogin.loginState == pt.LoginState.QLogin && pt.plogin.qrlogin_invalid && pt.plogin.begin_qrlogin()
            }
        })
    },
    vcodeMessage: function(t) {
        t.randstr && t.sig || $.report.nlog("vcode postMessage error：" + e.data),
        $("verifycode").value = t.randstr,
        pt.plogin.pt_verifysession = t.sig,
        pt.plogin.hideVC(),
        pt.plogin.submit()
    },
    showNewVC: function() {
        var t = pt.plogin.getNewVCUrl()
          , e = $("newVcodeArea");
        e.style.cssText = "background: none #FFFFFF; position: absolute; top: 0; width: 100%; z-index:9999;",
        25 == pt.ptui.style && (e.style.width = "370px"),
        e.style.height = $("login").offsetHeight - (21 == pt.ptui.style ? 2 : 4) + "px",
        e.innerHTML = '<iframe name="vcode" allowtransparency="true" scrolling="no" frameborder="0" width="100%" height="100%" src="' + t + '">',
        $.css.show(e)
    },
    hideNewVC: function() {
        $("newVcodeArea") && $.css.hide($("newVcodeArea"))
    },
    changeNewVC: function() {
        pt.plogin.showNewVC()
    },
    showVC: function() {
        pt.plogin.vcFlag = !0,
        "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.showNewVC() : ($.css.show($("verifyArea")),
        $("verifycode").value = "",
        $("verifyimg").src = pt.plogin.getVCUrl()),
        pt.plogin.ptui_notifySize("login")
    },
    hideVC: function() {
        pt.plogin.vcFlag = !1,
        "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.hideNewVC() : $.css.hide($("verifyArea")),
        pt.plogin.ptui_notifySize("login")
    },
    changeVC: function(t) {
        t && t.preventDefault(),
        "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.changeNewVC() : $("verifyimg").src = pt.plogin.getVCUrl(),
        t && $.report.monitor("330322", .05)
    },
    getVCUrl: function() {
        var t = pt.plogin.at_account
          , e = (pt.ptui.domain,
        pt.ptui.appid)
          , i = pt.plogin.verifycodeUrl + "?uin=" + t + "&aid=" + e + "&cap_cd=" + pt.plogin.cap_cd + "&" + Math.random();
        return i
    },
    getNewVCUrl: function() {
        var t = pt.plogin.at_account
          , e = (pt.ptui.domain,
        pt.ptui.appid)
          , i = pt.plogin.newVerifycodeUrl + "&uin=" + t + "&aid=" + e + "&cap_cd=" + pt.plogin.cap_cd + "&pt_style=" + pt.ptui.style + "&" + Math.random();
        return i
    },
    checkValidate: function(t) {
        try {
            var e = t.u
              , i = t.p
              , n = t.verifycode
              , o = $("safe_edit");
            if ("" == $.str.trim(e.value))
                return pt.plogin.show_err(pt.str.no_uin),
                pt.plogin.domFocus(e),
                !1;
            if ($.check.isNullQQ(e.value))
                return pt.plogin.show_err(pt.str.inv_uin),
                pt.plogin.domFocus(e),
                !1;
            var r = i.value;
            if (pt.plogin.armSafeEdit.isSafe && o && (r = o.GetPwdHash(),
            "D41D8CD98F00B204E9800998ECF8427E" == r && (r = ""),
            pt.plogin.armSafeEdit.safepwd = r),
            !r)
                return pt.plogin.show_err(pt.str.no_pwd),
                pt.plogin.domFocus(i),
                !1;
            if ("" == n.value)
                return pt.plogin.needVc || pt.plogin.vcFlag ? (pt.plogin.show_err(pt.str.no_vcode),
                pt.plogin.domFocus(n)) : (pt.plogin.checkResultReport(14),
                clearTimeout(pt.plogin.checkClock),
                pt.plogin.showVC()),
                !1;
            if (n.value.length < 4)
                return pt.plogin.show_err(pt.str.inv_vcode),
                pt.plogin.domFocus(n),
                n.select(),
                !1
        } catch (p) {}
        return !0
    },
    checkTimeout: function() {
        var t = $.str.trim($("u").value);
        ($.check.isQQ(t) || $.check.isQQMail(t)) && (pt.plogin.cap_cd = 0,
        pt.plogin.salt = $.str.uin2hex(t.replace("@qq.com", "")),
        pt.plogin.needVc = !0,
        "1" == pt.ptui.pt_vcode_v1 ? pt.plogin.needShowNewVc = !0 : pt.plogin.showVC(),
        pt.plogin.isCheckTimeout = !0,
        pt.plogin.checkRet = 1,
        pt.plogin.cntCheckTimeout++),
        $.report.monitor(216082)
    },
    loginTimeout: function() {
        pt.plogin.showAssistant(2);
        var t = "flag1=7808&flag2=7&flag3=1&1=1000";
        $.report.simpleIsdSpeed(t)
    },
    check: function(t) {
        if (pt.plogin.account || pt.plogin.set_account(),
        $.check.isNullQQ(pt.plogin.account))
            return pt.plogin.show_err(pt.str.inv_uin),
            !1;
        if (pt.plogin.account != pt.plogin.lastCheckAccount && "" != pt.plogin.account) {
            pt.plogin.lastCheckAccount = pt.plogin.account;
            var e = pt.ptui.appid
              , i = pt.plogin.getCheckUrl(pt.plogin.at_account, e);
            pt.plogin.isCheckTimeout = !1,
            clearTimeout(pt.plogin.checkClock),
            pt.plogin.checkClock = setTimeout("pt.plogin.checkTimeout();", 5e3),
            $.http.loadScript(i),
            pt.plogin.check.cb = t
        }
    },
    getCheckUrl: function(t, e) {
        var i = pt.plogin.checkUrl + "?regmaster=" + pt.ptui.regmaster + "&pt_tea=1&pt_vcode=" + pt.ptui.pt_vcode_v1 + "&";
        return i += "uin=" + t + "&appid=" + e + "&js_ver=" + pt.ptui.ptui_version + "&js_type=" + pt.plogin.js_type + "&login_sig=" + pt.ptui.login_sig + "&u1=" + encodeURIComponent(pt.ptui.s_url) + "&r=" + Math.random()
    },
    getSubmitUrl: function(t) {
        var e = pt.plogin.loginUrl + t + "?"
          , i = {};
        if ("pt_susp_repush" == t)
            return e += "appid=" + pt.ptui.appid + "&daid=" + pt.ptui.daid;
        if ("login" == t) {
            i.u = encodeURIComponent(pt.plogin.at_account),
            i.verifycode = $("verifycode").value,
            i.pt_vcode_v1 = pt.plogin.needShowNewVc ? 1 : 0,
            i.pt_verifysession_v1 = pt.plogin.pt_verifysession || $.cookie.get("verifysession");
            var n = $("p").value;
            pt.plogin.armSafeEdit.isSafe && (n = pt.plogin.armSafeEdit.safepwd),
            i.p = $.Encryption.getEncryption(n, pt.plogin.salt, i.verifycode, pt.plogin.armSafeEdit.isSafe),
            i.pt_randsalt = pt.plogin.isRandSalt || 0
        }
        i.u1 = encodeURIComponent("login" == t ? pt.qlogin.getSurl($("u").value) : pt.qlogin.getSurl()),
        i.ptredirect = pt.ptui.target,
        i.h = 1,
        i.t = 1,
        i.g = 1,
        i.from_ui = 1,
        i.ptlang = pt.ptui.lang,
        i.action = pt.plogin.action.join("-") + "-" + (new Date - 0),
        i.js_ver = pt.ptui.ptui_version,
        i.js_type = pt.plogin.js_type,
        i.login_sig = pt.ptui.login_sig,
        i.pt_uistyle = pt.ptui.style,
        1 == pt.ptui.low_login && pt.plogin.low_login_enable && !pt.plogin.isMailLogin && (i.low_login_enable = 1,
        i.low_login_hour = pt.plogin.low_login_hour),
        "0" != pt.ptui.csimc && (i.csimc = pt.ptui.csimc,
        i.csnum = pt.ptui.csnum,
        i.authid = pt.ptui.authid),
        i.aid = pt.ptui.appid,
        pt.ptui.daid && (i.daid = pt.ptui.daid),
        "0" != pt.ptui.pt_3rd_aid && (i.pt_3rd_aid = pt.ptui.pt_3rd_aid),
        pt.ptui.regmaster && (i.regmaster = pt.ptui.regmaster),
        pt.ptui.mibao_css && (i.mibao_css = pt.ptui.mibao_css),
        "1" == pt.ptui.pt_qzone_sig && (i.pt_qzone_sig = 1),
        "1" == pt.ptui.pt_light && (i.pt_light = 1);
        for (var o in i)
            e += o + "=" + i[o] + "&";
        return e
    },
    submit: function(t) {
        if (pt.plogin.cntCheckTimeout >= 2)
            return pt.plogin.show_err(pt.plogin.checkErr[pt.ptui.lang]),
            pt.plogin.needVc = !1,
            void (pt.plogin.needShowNewVc = !1);
        if (pt.plogin.submitTime = (new Date).getTime(),
        t && t.preventDefault(),
        pt.plogin.lastCheckAccount != pt.plogin.account && !pt.plogin.hasCheck)
            return void pt.plogin.check(arguments.callee);
        if (!pt.plogin.ptui_onLogin(document.loginform))
            return !1;
        if ($.cookie.set("ptui_loginuin", escape(document.loginform.u.value), pt.ptui.domain, "/", 720),
        -1 == pt.plogin.checkRet || 3 == pt.plogin.checkRet)
            return pt.plogin.show_err(pt.plogin.checkErr[pt.ptui.lang]),
            pt.plogin.lastCheckAccount = "",
            pt.plogin.domFocus($("p")),
            void pt.plogin.check();
        clearTimeout(pt.plogin.loginClock),
        pt.plogin.loginClock = setTimeout("pt.plogin.loginTimeout();", 5e3);
        var e = pt.plogin.getSubmitUrl("login");
        return $.winName.set("login_href", encodeURIComponent(pt.ptui.href)),
        pt.plogin.showLoading(),
        pt.plogin.isVCSessionTimeOut() && !pt.plogin.needVc ? (pt.plogin.lastCheckAccount = "",
        pt.plogin.check(),
        window.setTimeout(function() {
            pt.plogin.submit()
        }, 1e3)) : ($.http.loadScript(e),
        pt.plogin.isdTime["7808-7-2-0"] = (new Date).getTime()),
        !1
    },
    isVCSessionTimeOut: function() {
        return pt.plogin.checkTime = pt.plogin.checkTime || (new Date).getTime(),
        pt.plogin.submitTime - pt.plogin.checkTime > 12e5 ? ($.report.monitor(330323, .05),
        !0) : !1
    },
    webLoginReport: function() {
        window.setTimeout(function() {
            try {
                var t = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"]
                  , e = {}
                  , i = window.performance ? window.performance.timing : null ;
                if (i) {
                    for (var n = i[t[0]], o = 1, r = t.length; r > o; o++)
                        i[t[o]] && (e[o] = i[t[o]] - n);
                    loadJs && loadJs.onloadTime && (e[o++] = loadJs.onloadTime - n),
                    i.domContentLoadedEventEnd - i.navigationStart > pt.plogin.delayTime && i.navigationStart > 0 && $.report.nlog("访问ui延时超过" + pt.plogin.delayTime / 1e3 + "s:delay=" + (i.domContentLoadedEventEnd - i.navigationStart) + ";domContentLoadedEventEnd=" + i.domContentLoadedEventEnd + ";navigationStart=" + i.navigationStart + ";clientip=" + pt.ptui.clientip + ";serverip=" + pt.ptui.serverip, pt.plogin.delayMonitorId, 1),
                    i.connectStart <= i.connectEnd && i.responseStart <= i.responseEnd && pt.plogin.ptui_speedReport(e)
                }
            } catch (p) {}
        }, 1e3)
    },
    ptui_speedReport: function(t) {
        if ("msie" == $.browser("type") || "webkit" == $.browser("type")) {
            var e = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=1";
            if (pt.ptui.isHttps) {
                if (Math.random() > 1)
                    return;
                e = "msie" == $.browser("type") ? $.check.isSsl() ? "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=3" : "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=2" : $.check.isSsl() ? "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=6" : "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=5"
            } else {
                if (Math.random() > .2)
                    return;
                e = "msie" == $.browser("type") ? "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=1" : "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=5&flag3=4"
            }
            for (var i in t)
                t[i] > 15e3 || t[i] < 0 || (e += "&" + i + "=" + t[i] || 1);
            var n = new Image;
            n.src = e
        }
    },
    resultReport: function(t, e, i) {
        var n = "http://isdspeed.qq.com/cgi-bin/v.cgi?flag1=" + t + "&flag2=" + e + "&flag3=" + i
          , o = new Image;
        o.src = n
    },
    crossMessage: function(t) {
        if ("undefined" != typeof window.postMessage)
            window.parent.postMessage($.str.json2str(t), "*");
        else if (pt.ptui.proxy_url) {
            var e = pt.ptui.proxy_url + "#";
            for (var i in t)
                e += i + "=" + t[i] + "&";
            $("proxy") && ($("proxy").innerHTML = '<iframe src="' + encodeURI(e) + '"></iframe>')
        } else
            try {
                navigator.ptlogin_callback && navigator.ptlogin_callback($.str.json2str(t))
            } catch (n) {
                $.report.nlog("ptlogin_callback " + n.message)
            }
    },
    ptui_notifyClose: function(t) {
        t && t.preventDefault();
        var e = {};
        e.action = "close",
        pt.plogin.crossMessage(e),
        pt.plogin.cancle_qrlogin()
    },
    ptui_notifySize: function(t) {
        pt.plogin.loginState == pt.LoginState.PLogin && ($("bottom_web") && $.css.hide($("bottom_web")),
        pt.plogin.adjustLoginsize(),
        $("bottom_web") && $.css.show($("bottom_web")));
        var e = $(t)
          , i = {};
        i.action = "resize",
        i.width = e.offsetWidth || 1,
        i.height = e.offsetHeight || 1,
        pt.plogin.crossMessage(i)
    },
    ptui_onLogin: function(t) {
        var e = !0;
        return e = pt.plogin.checkValidate(t)
    },
    ptui_uin: function() {},
    is_mibao: function(t) {
        return /^http(s)?:\/\/(ssl\.)?ui.ptlogin2.(\S)+\/cgi-bin\/mibao_vry/.test(t)
    },
    __get_polling_url: function(t) {
        var e = pt.ptui.isHttps ? "https://ssl." : "http://"
          , i = e + "ptlogin2." + pt.ptui.domain + "/" + t + "?";
        return 2 == pt.ptui.regmaster ? i = "http://ptlogin2.function.qq.com/" + t + "?regmaster=2&" : 3 == pt.ptui.regmaster ? i = "http://ptlogin2.crm2.qq.com/" + t + "?regmaster=3&" : 4 == pt.ptui.regmaster ? i = "https://ssl.ptlogin2.mail.qq.com/" + t + "?regmaster=4&" : 5 == pt.ptui.regmaster && (i = e + "ptlogin2.mp.qq.com/" + t + "?regmaster=5&"),
        i += "appid=" + pt.ptui.appid + "&e=2&l=M&s=3&d=72&v=4&t=" + Math.random(),
        pt.ptui.daid && (i += "&daid=" + pt.ptui.daid),
        i
    },
    get_qrlogin_pic: function() {
        return pt.plogin.__get_polling_url("ptqrshow")
    },
    go_qrlogin_step: function(t) {
        switch (t) {
        case 1:
            pt.plogin.begin_qrlogin(),
            pt.plogin.isNewQr ? (pt.plogin.begin_qrlogin(),
            $.css.hide($("qrlogin_step2"))) : ($.css.show($("qrlogin_step1")),
            $.css.hide($("qrlogin_step2")));
            break;
        case 2:
            pt.plogin.isNewQr ? ($("qrlogin_step2").style.height = $("login").offsetHeight - 8 + "px",
            $.css.show($("qrlogin_step2"))) : ($.css.show($("qrlogin_step2")),
            $.css.hide($("qrlogin_step1")))
        }
    },
    begin_qrlogin: function() {
        if (!pt.ptui.lockuin) {
            var t = $("qr_invalid")
              , e = $("qrlogin_img");
            t && $.css.hide(t),
            e && (e.onload = function() {
                e.onload = e.onerror = null ,
                pt.plogin.cancle_qrlogin(),
                pt.plogin.qrlogin_clock = window.setInterval("pt.plogin.qrlogin_submit();", 3e3),
                pt.plogin.qrlogin_timeout = window.setTimeout(function() {
                    pt.plogin.set_qrlogin_invalid()
                }, pt.plogin.qrlogin_timeout_time)
            }
            ,
            e.onerror = function() {
                e.onload = e.onerror = null ,
                pt.plogin.set_qrlogin_invalid()
            }
            ,
            pt.plogin.qrlogin_invalid = !1,
            e.src = pt.plogin.get_qrlogin_pic())
        }
    },
    cancle_qrlogin: function() {
        window.clearInterval(pt.plogin.qrlogin_clock),
        window.clearTimeout(pt.plogin.qrlogin_timeout),
        pt.plogin.qrlogin_invalid = !0
    },
    set_qrlogin_invalid: function() {
        pt.plogin.cancle_qrlogin(),
        pt.plogin.switch_qrlogin(),
        $("qr_invalid") && $.css.show($("qr_invalid")),
        pt.plogin.hideQrTips()
    },
    createLink: function(t) {
        var e = document.createElement("link");
        e.setAttribute("type", "text/css"),
        e.setAttribute("rel", "stylesheet"),
        e.setAttribute("href", t),
        document.getElementsByTagName("head")[0].appendChild(e)
    },
    loadQrTipsPic: function() {
        if (pt.plogin.isNewQr) {
            var t = $("qr_tips_pic")
              , e = "chs";
            switch (pt.ptui.lang + "") {
            case "2052":
                e = "chs";
                break;
            case "1033":
                e = "en";
                break;
            case "1028":
                e = "cht"
            }
            $.css.addClass(t, "qr_tips_pic_" + e)
        } else {
            var i = pt.ptui.cssPath + "/c_qr_login.css";
            $("qrswitch_logo") && pt.plogin.createLink(i)
        }
    },
    showQrTips: function() {
        var t, e, i = {};
        if (e = $.css.getOffsetPosition("qrlogin_img"),
        t = $.css.getOffsetPosition("login"),
        i.left = e.left - t.left,
        i.right = $("login").offsetWidth - $("qrlogin_img").offsetWidth - i.left,
        pt.plogin.hasNoQlogin || (i.left = i.left + $.css.getWidth("qrlogin_img") + 10,
        $("qr_tips").style.left = i.left + "px"),
        $.css.show($("qr_tips")),
        $("qr_tips_pic").style.opacity = 0,
        $("qr_tips_pic").style.filter = "alpha(opacity=0)",
        $("qr_tips_menban").className = "qr_tips_menban",
        pt.plogin.hasNoQlogin)
            if ($.animate.fade("qr_tips_pic", 100, 2, 20, function() {}),
            pt.plogin.isMailLogin) {
                var n = i.right - 160 + 12;
                $.animate.animate("qrlogin_img", {
                    left: n
                }, 10, 10)
            } else
                $.animate.animate("qrlogin_img", {
                    left: -30
                }, 10, 10);
        else
            $.animate.fade("qr_tips_pic", 100, 2, 20);
        pt.plogin.hideQrTipsClock = window.setTimeout("pt.plogin.hideQrTips()", 5e3),
        $.report.monitor("331286", .05)
    },
    hideQrTips: function() {
        pt.plogin.isNewQr && (window.clearTimeout(pt.plogin.hideQrTipsClock),
        $("qr_tips_menban").className = "",
        $.animate.fade("qr_tips_pic", 0, 5, 20, function() {
            pt.plogin.hasNoQlogin && $.animate.animate("qrlogin_img", {
                left: 12
            }, 10, 10),
            $.css.hide($("qr_tips"))
        }))
    },
    qr_load: function() {},
    qr_error: function() {},
    switch_qrlogin_animate: function() {
        var t = pt.plogin.isQrLogin
          , e = $("web_qr_login_show")
          , i = 0;
        t ? (i = -$("web_login").offsetHeight,
        $("web_qr_login").style.height = ($("qrlogin").offsetHeight || 265) + "px",
        $("qrlogin").style.visibility = "visible",
        $("web_login").style.visibility = "hidden") : (i = 0,
        $("web_qr_login").style.height = $("web_login").offsetHeight + "px",
        $("web_login").style.visibility = "visible",
        $("qrlogin").style.visibility = "hidden"),
        $.animate.animate(e, {
            top: i
        }, 30, 20)
    },
    switch_qrlogin: function(t) {
        pt.plogin.isNewQr || (t && t.preventDefault(),
        pt.plogin.hide_err(),
        pt.plogin.isQrLogin ? ($("qrlogin").style.visibility = "hidden",
        pt.plogin.cancle_qrlogin(),
        $("qrswitch_logo").title = "二维码登录",
        $("qrswitch_logo").className = "qrswitch_logo",
        $.report.monitor("273368", .05)) : ($("qrlogin").style.visibility = "visible",
        pt.plogin.go_qrlogin_step(1),
        $("qrswitch_logo").title = "返回",
        $("qrswitch_logo").className = "qrswitch_logo_qr",
        pt.plogin.begin_qrlogin(),
        $.report.monitor("273367", .05)),
        pt.plogin.isQrLogin = !pt.plogin.isQrLogin,
        pt.plogin.switch_qrlogin_animate(),
        pt.plogin.ptui_notifySize("login"))
    },
    adjustLoginsize: function() {
        var t = pt.plogin.isQrLogin;
        $("web_qr_login").style.height = t ? ($("qrlogin").offsetHeight || 265) + "px" : $("web_login").offsetHeight + "px"
    },
    qrlogin_submit: function() {
        var t = pt.plogin.getSubmitUrl("ptqrlogin");
        $.winName.set("login_href", encodeURIComponent(pt.ptui.href)),
        $.http.loadScript(t)
    },
    force_qrlogin: function() {
        pt.plogin.switchpage(pt.LoginState.QLogin)
    },
    redirect: function(t, e) {
        switch (t + "") {
        case "0":
            location.href = e;
            break;
        case "1":
            top.location.href = e;
            break;
        case "2":
            parent.location.href = e;
            break;
        default:
            top.location.href = e
        }
    },
    armSafeEdit: function() {
        function t() {
            if (pt.plogin.armSafeEdit.isSafe)
                i.style.display = "block",
                i.value = "",
                setTimeout(function() {
                    try {
                        i.focus()
                    } catch (t) {}
                }, 0),
                e.removeChild(l),
                p.style.backgroundPosition = "-130px -130px",
                pt.plogin.armSafeEdit.isSafe = !1;
            else {
                var t = $("safe_edit");
                t ? l.style.display = "block" : (l.innerHTML = ($.suportActive() ? c : u) + g,
                e.appendChild(l),
                t = $("safe_edit"),
                $.e.add(t, "focus", pt.plogin.check));
                try {
                    t.CreateSafeEdit(),
                    t.ClearAllInput(),
                    setTimeout(function() {
                        t.focus()
                    }, 200),
                    i.style.display = "none",
                    p.style.backgroundPosition = "-117px -130px",
                    pt.plogin.armSafeEdit.isSafe = !0
                } catch (o) {
                    pt.plogin.show_err("安全控件加载失败"),
                    i.focus(),
                    pt.plogin.armSafeEdit.isSafe = !1,
                    l.style.display = "none",
                    e.removeChild(l),
                    $.report.monitor("456099")
                }
                $.report.monitor("456098");
            
            }
            return e.style.height = pt.plogin.armSafeEdit.isSafe ? "74px" : n,
            pt.plogin.ptui_notifySize("login"),
            !1
        }
        var e = $("pwdArea")
          , i = $("p")
          , n = e.style.height
          , o = 208
          , r = 38;
        i.style.width = o + "px";
        var p = document.createElement("a");
        p.tabIndex = 1,
        p.id = "safe_lock",
        p.title = "安全控件登录开关";
        var a = {
            background: "url(https://ui.ptlogin2.qq.com/style/34/images/icon_5.png) no-repeat -130px -130px",
            width: "13px",
            height: "20px",
            display: "block",
            margin: "-29px 20px 0 0",
            cursor: "pointer",
            webkitUserSelect: "none",
            outline: "none",
            marginLeft: o + 12 + "px"
        };
        "6.0" == $.browser("version") && (a.background = a.background.replace("icon_5.png", "icon_5_8.png"));
        for (var s in a)
            p.style[s] = a[s];
        p.style.style = "right",
        pt.plogin.armSafeEdit.isSafe = !1,
        e.appendChild(p);
        var l = document.createElement("div");
        a = {
            position: "absolute",
            top: "2px",
            left: "1px"
        };
        for (var s in a)
            l.style[s] = a[s];
        var c = '<object id="safe_edit" classid="CLSID:EAAED308-7322-4b9b-965E-171933ADD473" width="' + o + '" height="' + r + '">\r\n                    <param name="bkColor" value="16777215"/>\r\n                    <param name="fontColor" value="0"/>\r\n                    <param name="fontHeight" value="0.25" />\r\n                    <param name="caretHeight" value="0.2" />\r\n                    <param name="borderType" value="2" />\r\n                    <param name="borderColor" value="16777215" />\r\n                </object>'
          , u = '<embed id="safe_edit" type="application/nptxsso" \r\n    width="' + o + '" height="' + r + '" bkcolor="16777215" fontcolor="0" \r\n    fontheight="0.25" caretheight="0.8" bordertype="2" bordercolor="16777215" />'
          , g = '<div class="safe-edit-tips" \r\n    style="color: #2C9E62; height: 28px; line-height: 34px; width: ' + o + 'px;">\r\n    当前为安全登录模式，使用密码控件</div>';
        $.e.add(p, "click", t),
        pt.plogin.armSafeEdit.lockToggle = t
    },
    onekeyVerify: function(t, e, i) {
        function n() {
            pt.plogin.onekeyVerifyClock = 0,
            pt.plogin.hide_err(),
            $.css.hide(p),
            $.css.show(u),
            setTimeout(function() {
                c.value = "",
                pt.plogin.domFocus(c)
            }, 0)
        }
        function o() {
            pt.plogin.onekeyVerifyClock = 0,
            $.css.addClass(p, "invalid"),
            pt.plogin.hide_err(),
            $.e.add(l, "click", function() {
                pt.plogin.onekeyVerify("hide")
            })
        }
        function r() {
            $.css.setClass(p, "ov-" + e),
            d[e] && d[e].appendChild(a),
            i = i || pt.plogin.onekeyVerify.__tips || "您的帐号千金难求。为确保安全，请务必对手机收到的登录请求进行确认。",
            pt.plogin.onekeyVerify.__tips = i,
            pt.plogin.show_err(i, !0),
            pt.plogin.onekeyVerifyClock = setInterval(function() {
                $.http.loadScript(pt.plogin.getSubmitUrl("pt_susp_poll"))
            }, 3e3),
            setTimeout(function() {
                clearInterval(pt.plogin.onekeyVerifyClock),
                pt.plogin.onekeyVerify("invalid")
            }, pt.plogin.onekey_verify_timeout)
        }
        var p = $("onekey_verify")
          , a = $("ov_retry_wrap")
          , s = $("ov_retry")
          , l = $("ov_back")
          , c = $("p")
          , u = document.loginform;
        if (p) {
            clearInterval(pt.plogin.onekeyVerifyClock),
            e = parseInt(e) || pt.plogin.onekeyVerify.__style || 1,
            pt.plogin.onekeyVerify.__style = e;
            for (var g = p.getElementsByTagName("span"), d = ["占位"], h = 0; h < g.length; h++)
                g[h].className.indexOf("ov-tips") > -1 && d.push(g[h]);
            s.onclick = function() {
                $.http.loadScript(pt.plogin.getSubmitUrl("pt_susp_repush"))
            }
            ,
            "hide" == t ? n() : ("invalid" == t ? o() : r(),
            $.css.show(p),
            $.css.hide(u))
        }
    }
},
pt.plogin.auth();


var result=$.Encryption.getEncryption( "2954c637de599a43c8584205923f68b1","\x00\x00\x00\x00\xb7\x23\xc2\x72","netx",1) ;
return(result);
