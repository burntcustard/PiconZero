#!/usr/bin/env node

// GNU GPL V3
// Test code for 4tronix Picon Zero

// Picon Zero Motor Test
// Moves: Forward, Reverse, turn Right, turn Left, Stop

// To check wiring is correct ensure the order of movement as above is correct

var pz = require('./piconzero');
var keypress = require('keypress');
var speed = 60;

function move(key) {

  if (key === 'w' || key === "up") {
    pz.forward(speed)
    console.log("Forward", speed);
  }
  else if (key === 'z' || key === "down") {
    pz.reverse(speed)
    console.log("Reverse", speed);
  }
  else if (key === 's' || key === "left") {
    pz.spinRight(speed)
    console.log("Spin Right", speed);
  }
  else if (key === 'a' || key === "right") {
    pz.spinLeft(speed)
    console.log("Spin Left", speed);
  }
  else if (key === '.' || key === '>') {
    if (speed < 100) speed += 10;
    console.log("Speed+", speed);
  }
  else if (key === ',' || key === '<') {
    if (speed > 0) speed -= 10;
    console.log("Speed-", speed);
  }
  else if (key === "space") {
    pz.stop()
    console.log("Stop");
  }

}

//======================================================================
// Reading single key input with node module 'keypress' and call move()

keypress(process.stdin);

if (process.stdin.setRawMode)
  process.stdin.setRawMode(true);
else
  require('tty').setRawMode(true);

process.stdin.on('keypress', function (c, key) {
  //console.log(0, c, key);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
    console.log("Ending");
    pz.cleanup();
    process.exit();
  } else {
    if (key && key.name) {
      move(key.name);
    } else {
      move(c);
    }
  }
})

process.stdin.resume();

// End of input reading
//======================================================================


console.log("Tests the motors by using the arrow keys or WASZ to control");
console.log("Use , or < to slow down");
console.log("Use . or > to speed up");
console.log("Use spacebar to stop");
console.log("Speed changes take effect when the next arrow key is pressed");
console.log("Press Ctrl-C to end");
console.log();

pz.init();
