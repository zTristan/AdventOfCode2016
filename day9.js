let fs = require("fs");
let input = fs.readFileSync("day9.data", { encoding: 'utf8' });

function decompress(string, index) {
    let regex = new RegExp(/([^\(\d+x\d+\)]*)\((\d+)x(\d+)\)/);
    let match = regex.exec(string.substr(index));
    if (match) {
        let offset = parseInt(match.index + match[0].length + index);
        let length = parseInt(match[2]);
        let repeat = parseInt(match[3]);
        return match[1] + decompress(string.substr(offset, length).repeat(repeat), 0) + decompress(string, offset + length);
    }
    else {
        return string;
    }
}

function decompress2(string) {
    let count = 0;
    let regex = new RegExp(/\((\d+)x(\d+)\)([^\)]*)$/);
    let match = regex.exec(string);
    while (match) {
        let length = parseInt(match[1]);
        let repeat = parseInt(match[2]);
        let substr = match[3];
        let diff = substr.length - length;
        count += length * repeat + diff;
        string = string.replace(regex, "");
        match = regex.exec(string);
    }
    return count;
}

function decompress3(string) {
    let match;
    while (match = string.match(/([^\(\d+x\d+\)]*)\((\d+)x(\d+)\)/)) {
        fs.appendFileSync("day9.out", match[1]);
        let offset = match.index + match[0].length;
        let length = parseInt(match[2]);
        let repeat = parseInt(match[3]);
        let repeated = string.substr(offset, length).repeat(repeat-1);
        string = string.replace(/([^\(\d+x\d+\)]*)\((\d+)x(\d+)\)/, repeated);
    }
    fs.appendFileSync("day9.out", string);
}

decompress3(input);
let outfile = fs.readFileSync("day9.out");
console.log(outfile.length);
