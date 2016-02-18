var hexcase = 1
      , b64pad = ""
      , chrsz = 8
      , mode = 32;
function foo(a)
{
    return a+100
}
function uin2hex(str) 
{
            var maxLength = 16;
            str = parseInt(str);
            for (var hex = str.toString(16), len = hex.length, i = len; maxLength > i; i++)
                hex = "0" + hex;
            for (var arr = [], j = 0; maxLength > j; j += 2)
                arr.push("\\x" + hex.substr(j, 2));
            var result = arr.join("");
            return eval('result="' + result + '"'),
            result
}


