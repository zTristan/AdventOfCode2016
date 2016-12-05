var fs = require("fs");
var input = fs.readFileSync("day3.data", { encoding: 'utf8' });
var triangles = input.split("\n");
var counts = {
	valid: 0,
	invalid: 0,
	total: 0
};

function isValid(dim) {
	for (let t=0; t < 3; ++t) {
		let a = parseInt(dim[t]);
		let b = parseInt(dim[(t+1) % 3]);
		let c = parseInt(dim[(t+2) % 3]);
		if (a >= (b + c)) {
			return false;
		}
	}
	return true;
}

for (let i=0; i < triangles.length; i+=3) {
	let dims = [];
	for (let t=0; t < 3; ++ t) {
		let match = triangles[i+t].match(/(\d+)\s+(\d+)\s+(\d+)/);
		dims = dims.concat([match[1], match[2], match[3]]);
	}

	for (let t=0; t < 3; ++t) {
		let dim = [dims[t], dims[t+3], dims[t+6]];
		if (isValid(dim)) {
			counts.valid++;
		}
		else {
			counts.invalid++;
		}
		counts.total++;
	}
}

console.log(JSON.stringify(counts,null,2));
