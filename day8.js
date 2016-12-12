var fs = require("fs");
var input = fs.readFileSync("day8.data", { encoding: 'utf8' });
var instructions = input.split("\r\n");

var ROWS = 6;
var COLUMNS = 50;

var buffer = [];
for (var i=0; i < ROWS; ++i) {
    buffer.push([]);
}

function printBuffer(buffer) {
    var count = 0;
    for (var y=0; y < ROWS; ++y) {
        var line = "";
        for (var x=0; x < COLUMNS; ++x) {
            switch(buffer[y][x]) {
                case true:
                    count++;
                    line += "#";
                    break;

                default:
                    line += ".";
                    break;
            }
        }
        console.log(line);
    }
    console.log(count);
}

for (var i=0; i < instructions.length; ++i) {
    var instruction = instructions[i];
    var match = instruction.match(/(\S+)\s(.+)/);
    var command = match[1];
    var data = match[2];
    switch(command) {
        case "rect":
            var match = data.match(/(\d+)x(\d+)/);
            var width = match[1];
            var height = match[2];
            for (var y=0; y < height; ++y) {
            for (var x=0; x < width; ++x) {
                buffer[y][x] = true;
            }}
            break;

        case "rotate":
            var match = data.match(/(\S+)\s[x|y]=(\d+)\sby\s(\d+)/)
            var mode = match[1];
            switch (mode) {
                case "column":
                    var column = match[2];
                    var move = match[3] % ROWS;
                    var temp = [];
                    for (var r=0; r < ROWS; ++r) {
                        temp[r] = buffer[(ROWS + r - move) % ROWS][column];
                    }
                    for (var r=0; r < ROWS; ++r) {
                        buffer[r][column] = temp[r];
                    }
                    break;

                case "row":
                    var row = match[2];
                    var move = match[3] % COLUMNS;
                    var temp = [];
                    for (var c=0; c < COLUMNS; ++c) {
                        temp[c] = buffer[row][(COLUMNS + c - move) % COLUMNS];
                    }
                    buffer[row] = temp;
                    break;
            }
            break;
    }
}


printBuffer(buffer);