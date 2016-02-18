use strict;
use JE;
use Encode qw (decode encode);
my  $je = JE->new;

my $password='carine34844504';



$je->eval(<<'___');  

 var hexcase = 1
      , b64pad = ""
      , chrsz = 8
      , mode = 32;
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



___


my  $o = $je->{md5}->($password);
print $o,"   o\n";

my $r=$je->{hexchar2bin}->($o);
print decode("Ascii",$r),"   r\n";
my $e= "<Þ";
$e=decode("utf8",$e);
my $p =$je->{md5}->($r + $e); 
 
print $p,  " p\n";


