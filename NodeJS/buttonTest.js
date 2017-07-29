#!/usr/bin/env node

// GNU GPL V3
// Test code for 4tronix Picon Zero

var pz = require('./piconzero');

pz.init();

vsn = pz.getRevision()
if (vsn[1] == 2) {
    console.log("Board Type:", "Picon Zero")
} else {
    console.log("Board Type:", vsn[1])
}
console.log("Firmware version:", vsn[0])
console.log();

pz.setInputConfig(0, 0, true);   // request pullup on input

console.log("Running");

var t = setInterval(function(){ 
    var i = pz.readInput(0);
    switch (i) {
        case 0:
            console.log("Switch Pressed ", i);
            break;
        default:
            console.log("Switch Released ", i)
            break;
        }
 }, 2000);

process.on('SIGINT', function () {
    console.log("");
    clearInterval(t);
    pz.cleanup();
    process.exit();
})