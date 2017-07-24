var pz = require('./piconzero');

console.log("Setup Outputs");

pz.init();
pz.setOutputConfig(0, pz.OutMode.Digital);   
pz.setOutputConfig(1, pz.OutMode.Digital);  
pz.setOutputConfig(2, pz.OutMode.Digital); 

var output = 0;

console.log("Running, press Ctrl + C to exit");

var R = 1;
var G = 1;
var B = 1;

pz.setOutput(0,R);
pz.setOutput(1,G);
pz.setOutput(2,B);

setInterval(function(){ 
    pz.setOutput(0,R);
    R = ++R % 2;
 }, 500);

setInterval(function(){ 
    pz.setOutput(1,G);
    G = ++G % 2;
 }, 700);

 setInterval(function(){ 
    pz.setOutput(2,B);
    B = ++B % 2;
 }, 1300);

process.on('SIGINT', function () {
    console.log("Shutting down SIGINT (Ctrl-C)");
    pz.cleanup();
    process.exit();
})
