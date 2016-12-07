var fs = require("fs");
var input = fs.readFileSync("day7.data", { encoding: 'utf8' });
var lines = input.split("\n");
var count = 0;
var pal

function isPalUniq(string, start, end) {
    var loops = Math.floor((end - start) / 2);
    for (var i=0; i < loops; ++i) {
        if (string[start+i] != string[end-i-1]) {
            return false;
        }
        if (string[start] == string[start+1]) {
            return false;
        }
    }
    return true;
}

function isValid(line) {
    var valid = false;
    var mode = 0;
    for (var start=0; start < line.length - 3; ++start) {
        var end = start + 4;
        switch(mode) {
            case 0:
                if (line[end-1] == "[") {
                    mode = 1;
                    start += 3
                }
                else if (isPalUniq(line, start, end)) {
                    valid = true;
                }
                break;
                
            case 1:
                if (line[end-1] == "]") {
                    mode = 0;
                    start += 3;
                }
                else if (isPalUniq(line, start, end)) {
                    return false;
                }
                break;
        }
    }
    return valid;
}

for (var i=0; i < lines.length; ++i) {
    var line = lines[i];
    if (isValid(line)) {
        count++;
    }
}

console.log(count);
