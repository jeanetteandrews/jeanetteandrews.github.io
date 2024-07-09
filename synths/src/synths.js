let startStop;
let gain11, gain12, gain13, gain14;
let gain21, gain22;
let gain31, gain32, gain33;
let gain41, gain42;

var w = window.innerWidth;
var h = window.innerHeight;

const { createDevice } = RNBO;

// Create AudioContext
let WAContext = window.AudioContext || window.webkitAudioContext;
let context = new WAContext();

async function rnboSetup() { 

    let rawPatcher = await fetch("src/assets/synths.export.json");
    let patcher = await rawPatcher.json();

    let device = await createDevice({ context, patcher });
    
    startStop = device.parametersById.get("startStop");
    gain11 = device.parametersById.get("gain11");
    gain12 = device.parametersById.get("gain12");
    gain13 = device.parametersById.get("gain13");
    gain14 = device.parametersById.get("gain14");

    gain21 = device.parametersById.get("gain21");
    gain22 = device.parametersById.get("gain22");

    gain31 = device.parametersById.get("gain31");
    gain32 = device.parametersById.get("gain32");
    gain33 = device.parametersById.get("gain33");

    gain41 = device.parametersById.get("gain41");
    gain42 = device.parametersById.get("gain42");

    const outputNode = context.createGain();
    outputNode.connect(context.destination);

    device.node.connect(context.destination); 
};

rnboSetup();

function play(){
    if (startStop.value == 1){
        startStop.value = 0;
    } 
    else{
        startStop.value = 1;
    }
};

var x = null;
var y = null;
    
document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);
    
function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;

    if (x > w/2) {
        xnew1 = 0.5
    }
    else {
        xnew1 = (-5 / w) * x + 3;
    }
    if (x < w/2) {
        xnew2 = 0.5
    }
    else {
        xnew2 = (5 / w) * x - 2;
    }
    if (y > h/2) {
        ynew1 = 0.5
    }
    else {
        ynew1 = (-5 / h) * y + 3;
    }
    if (y < h/2) {
        ynew2 = 0.5
    }
    else {
        ynew2 = (5 / h) * y - 2;
    }

    gain11.value = xnew1;
    gain12.value = xnew1;
    gain13.value = xnew1;
    gain14.value = xnew1;

    gain21.value = xnew2;  
    gain22.value = xnew2;  

    gain31.value = ynew1;  
    gain32.value = ynew1;  
    gain33.value = ynew1;  

    gain41.value = ynew2;  
    gain42.value = ynew2;
}