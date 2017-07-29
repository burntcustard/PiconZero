var pz = require('./piconzero');

pz.setInputConfig(0, 1)     // set input 0 to Analog
pz.setOutputConfig(0, 1)    // set output 0 to PWM
pz.setOutputConfig(2, 2)    // set output 2 to Servo
pz.setOutputConfig(5, 3)    // set output 5 to WS2812

setInterval(function(){ 
    ana0 = pz.readInput(0);
    pz.setOutput(0, ana0/10);
    pz.setPixel(0,0,0,ana0/4);
    pz.setOutput(2, ana0/7.0);
 }, 100);


