#!/usr/bin/env node

// GNU GPL V3
// Test code for 4tronix Picon Zero

// Ramp up speed until max then slow down and reverse

var pz = require('./piconzero');
var step = 5;
var value = 0;

console.log("Motor test");

pz.stop();

setInterval(function () {
        value = value + step;
        if (value <= -128 || value >= 127) {
            step = -step;
        } else {
            pz.setMotor(0,value);
            console.log(value);
        }
    } , 250);

process.on('SIGINT', function () {
    console.log("Stopping");
    pz.stop();
    pz.cleanup();
    process.exit();
});

