var fs = require("fs");
var input = fs.readFileSync("day7.data", { encoding: 'utf8' });
var lines = input.split("\n");
var count = 0;

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

    var left = [];
    var right = [];
    var index = 0;
    do {
        var lIndex = line.indexOf("[", index);
        if (lIndex != -1) {
            var rIndex = line.indexOf("]", lIndex);
            left.push(line.substr(index, lIndex - index));
            right.push(line.substr(lIndex + 1, rIndex-lIndex));
            index = rIndex + 1;
        }
        else {
            left.push(line.substr(index));
            break;
        }
    } while(1);
    //
    // console.log(line);
    // console.log(left);
    // console.log(right);

    for (var l=0; l < left.length; ++l) {
        var leftLine = left[l];
        for (var start=0; start < leftLine.length - 2; ++start) {
            var end = start + 3;
            if (isPalUniq(leftLine, start, end)) {
                var pal = leftLine.substr(start, 3);
                var rev = pal[1] + pal[0] + pal[1];
                console.log(pal);
                console.log(rev);
                for (r=0; r < right.length; ++r) {
                    var rightLine = right[r];
                    if (rightLine.indexOf(rev) != -1) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

for (var i=0; i < lines.length; ++i) {
    var line = lines[i];
    if (isValid(line)) {
        count++;
    }
    // break;
}

console.log(count);
