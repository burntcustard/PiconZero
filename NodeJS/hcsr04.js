#!/usr/bin/env node

// GNU GPL V3
// Test code for 4tronix Picon Zero

// Unfortunately I couldn't get this fast enough (on a Pi Zero) to function
// correctly, so instead of this, hcsr04.py is run from sonarTest.js
//
// Node Module to handle an HC-SR04 Ultrasonic Module on a single Pin
// Aimed at use on Picon Zero
//
// Originally created by Gareth Davies, Mar 2016.
// Ported to node.js by John Evans, Sep 2017.

var rpio = require('rpio');
var microseconds = require('microseconds');


/***
 * Returns the distance in cm to the nearest reflecting object.
 * Returns false if no object is detected in range.
 */
function getDistance() {

  // Define Sonar Pin (Uses same pin for both Ping and Echo)
  var sonar = 38;
  var distance = 0.0;
  var start = 0.0;
  var elapsed = 0.0;
  var elapsedArray = [];
  var loopCount = 0;
  var end = 0.0;
  var tmp = 0.0;
  var echoStartIndex = 0;
  var echoEndIndex = 0;
  //var pinged = false;
  //var sonarReading;

  // Setup pin in output mode
  rpio.open(sonar, rpio.OUTPUT, rpio.LOW);

  // See if reading here makes reading later faster:
  //sonarReading = rpio.read(sonar);

  var buf = new Buffer(10000);

  // Start timing
  start = microseconds.now();

  // Send 10us pulse to trigger
  rpio.write(sonar, rpio.HIGH);
  rpio.usleep(10);
  rpio.write(sonar, rpio.LOW);

  // Switch sonar pin to input (faster than calling .open again)
  rpio.mode(sonar, rpio.INPUT);

  /* Read the value of sonar pin 10,000 times, storing the values in buf */
  rpio.readbuf(sonar, buf);

  // See how long the buffer read took
  elapsed = microseconds.since(start);

  for (i = 0; i < buf.length; i++) {
    if (!tmp && buf[i]) {
	     //console.log("Found 1 then 0, at index", i + "ish");
       echoStartIndex = i;
    }
    if (tmp && !buf[i]) {
	     //console.log("Found 1 then 0, at index", i + "ish");
       echoEndIndex = i;
    }
    tmp = buf[i];
    //console.log(buf[i])
  }

  console.log("Time taken to read buffer    :", Math.round(elapsed) + "μs");
  console.log("Start of echo in buffer at i :", echoStartIndex);
  console.log("End of echo in buffer at i   :", echoEndIndex);
  // Figure out approx how long it took for the pulse to return
  elapsed = (elapsed / buf.length) * echoEndIndex;
  console.log("Time taken for ping to return:", Math.round(elapsed) + "μs");

  // Convert elapsed time from μs to seconds
  //elapsed /= 1000000;
  // Distance pulse travelled in that time is time
  // multiplied by the speed of sound (cm/s)
  distance = elapsed * 0.034029;
  // That was the distance there and back so halve the value
  distance = distance / 2;
  return distance;

  /*

  // Check input over and over for 999 loops.
  //for (var i = 0; i < 999; i++) {

  // Check for input over and over for 3ms
  while (elapsed < 3000.0) {

    if (rpio.read(sonar)) {
      //elapsed = microseconds.since(start);
      //console.log(rpio.read(sonar));
      console.log("Ping returned after", Math.round(elapsed) + "μs");
      // Convert elapsed time from μs to seconds
      elapsed /= 1000000;
      // Distance pulse travelled in that time is time
      // multiplied by the speed of sound (cm/s)
      distance = elapsed * 34000;
      // That was the distance there and back so halve the value
      distance = distance / 2;
      return distance;
    }

    // Check if sonar pin is high
    //sonarReading = rpio.read(sonar);

    // If first run of loop.
    // This is done inside the super-tight-loop so
    // there's less delay when first entering it.
    //if (i === 0) {
    if (start === 0.0) {
      //pinged = true;
      // Send 10us pulse to trigger
      rpio.write(sonar, rpio.HIGH);
      rpio.usleep(10);
      rpio.write(sonar, rpio.LOW);
      // Start timing
      start = microseconds.now();
      // Switch sonar pin to input (faster than calling .open again)
      //rpio.mode(sonar, rpio.INPUT);
    }

    elapsed = microseconds.since(start);
    //elapsedArray.push(elapsed);
    loopCount++;

  }

  elapsedArray.forEach(function(value){
    console.log(Math.round(value) + "μs");
  });

  //console.log("Loops ran in 3ms:", elapsedArray.length);
  console.log("Loops ran in 3ms:", loopCount);

  */

  return false;

};

module.exports.getDistance = getDistance;
