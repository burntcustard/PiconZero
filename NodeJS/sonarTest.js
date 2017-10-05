#!/usr/bin/env node

// GNU GPL V3

// Basic test of HC-SR04 ultrasonic sensor on Picon Zero

var hcsr04 = require('./hcsr04');
//setInterval(function() {
  console.log("Distance:", hcsr04.getDistance());
//}, 1000);

/*
var util = require('util'),
    spawn = require('child_process').spawn,
    getDistance = spawn('python', ['hcsr04.py']);

getDistance.stdout.on('data', function(data) {
  console.log(Math.round(data.toString()));
});
*/

/*
var PythonShell = require('python-shell');
var pyshell = new PythonShell('hcsr04.py', { mode: 'json '});

// sends a message to the Python script via stdin
pyshell.send({ command: "getDistance()", args: [] });

pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
  if (err) throw err;
  console.log('finished2');
});
*/

/*
var PythonShell = require('python-shell');

PythonShell.run('hcsr04.py', function (err) {
  if (err) throw err;
  console.log('finished');
});
*/
