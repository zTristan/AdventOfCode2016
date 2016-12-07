var fs = require("fs");
var input = fs.readFileSync("day6.data", { encoding: 'utf8' });
var words = input.split("\n");
var aCharCode = 'a'.charCodeAt();
var message = "";

for (let l=0; l < 8; ++l) {
	let counts = {};
	for (let w=0; w < words.length; ++w) {
		let letter = words[w][l];
		counts[letter] = (counts[letter] || 0) + 1;
	}

	let keys = Object.keys(counts);
	keys.sort(function(a,b) {
		return counts[a] - counts[b];
	});

	console.log(JSON.stringify(keys));

	message += keys[0];
	console.log(message);
}
