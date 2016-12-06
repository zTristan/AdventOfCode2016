var fs = require("fs");
var input = fs.readFileSync("day4.data", { encoding: 'utf8' });
var rooms = input.split("\n");
var total = 0;
var aCharCode = 'a'.charCodeAt();

function getChecksum(name) {
	let count = {};
	for (let i=0; i < name.length; ++i) {
		let letter = name[i];
		if (letter != "-") {
			let value = count[letter] || 0;
			count[letter] = value + 1;
		}
	}

	let keys = Object.keys(count);
	keys.sort(function(a,b) {
		let aCount = count[a];
		let bCount = count[b];
		if (aCount == bCount) {
			return a > b ? 1 : -1;
		}
		return count[b] - count[a];
	});
	return keys.splice(0,5).join("");
}

function decryptName(name, increment) {
	let decrypted = "";

	for (let i=0; i < name.length; ++i) {
		let letter = name[i];
		if (letter == "-") {
			decrypted += " ";
		}
		else {
			let value = (letter.charCodeAt() - aCharCode + increment) % 26;
			decrypted += String.fromCharCode(value + aCharCode);
		}
	}

	return decrypted;
}

for (let i=0; i < rooms.length; ++i) {
	let room = rooms[i];
	let match = room.match(/(\S+)-(\d\d\d)\[(\S+)\]/);
	let name = match[1];
	let sectorId = parseInt(match[2]);
	let checksum = match[3];

	let decrypted = decryptName(name, sectorId % 26);

	if (decrypted.search("north") != -1) {
		console.log(decrypted + " " + sectorId);
	}

	if (getChecksum(name) == checksum) {
		total += sectorId;
	}
}

console.log(total);
