var forge = require("node-forge");
var input = "reyedfim";
var code = [];
var count = 0;
var target = "00000";
var found = 0;


while (found < 8) {
	var password = input + (count++);
	var md = forge.md.md5.create();
	md.update(password);
	var hex = md.digest().toHex();

	if (hex.substring(0, target.length) == target) {
		var index = parseInt(hex[5]);
		if (index < 8 && code[index] == undefined) {
			code[index] = hex[6];
			found++;
			console.log(JSON.stringify(code));
		}
	}
}

console.log(code.join(""));
