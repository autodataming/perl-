var args=process.argv.splice(2);
var s="\x00\x00\x00\x00\x3c\x9e\xde\x18";
console.log(s);
s="\x00\x00\x00\x00\x2c\x66\x23\x9a";
console.log(s);
var s=args[0];
console.log(eval('"' + s.replace(/x/g, '\\x') + '"'));
console.log(eval('"' + s + '"'));
console.log(s);


