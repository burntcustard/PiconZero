#!/usr/bin/env node
var pz = require('./piconzero');

pz.init();
var vsn = pz.getRevision();

if  (vsn[1] == 2) {
    console.log("Board Type:", "Picon Zero")
}
else { 
    console.log("Board Type:", vsn[1])
    }
console.log("Firmware version:", vsn[0])
console.log();
pz.cleanup();

