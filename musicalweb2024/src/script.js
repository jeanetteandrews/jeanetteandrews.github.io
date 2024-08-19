Pts.namespace( window );

let start, speed, swing, sample, gain;
let context;
let patches;
let sound;
var bins = 256;

var space = new CanvasSpace("#pt");
space.setup({ bgcolor: "transparent" });
var form = space.getForm();

let noiseGrid = [];

// Pts.js background image
space.add({ 

  start: (bound) => {
    let ln = Create.distributeLinear( [new Pt(0, space.center.y), new Pt(space.width, space.center.y)], 30 );
    let gd = Create.gridPts( space.innerBound, 100, 50 );
    noiseGrid = Create.noisePts( gd, 0.05, 0.1, 100, 100 );
  },

  animate: (time, ftime) => {

    let speed = space.center.$subtract( space.center ).divide( space.center ).abs();

    noiseGrid.map( (p) => {
      p.step( 0.01*speed.x, 0.01*(1-speed.y) );
      form.fillOnly('rgba(164, 196, 85, 0.009)').point( p, Math.abs( p.noise2D() * space.size.x/18 ) );
    });
  }
});

async function setup(seq) {

    const WAContext = window.AudioContext || window.webkitAudioContext;
    context = new WAContext();
    
    // Create gain node and connect it to audio output
    const outputNode = context.createGain();
    outputNode.connect(context.destination);

    // Fetch the exported patchers
    let response = await fetch(seq);
    const samplePatcher = await response.json();

    // Create the devices
    const sampleDevice = await RNBO.createDevice({ context, patcher: samplePatcher });

    // Dependency stuff
    let dependencies = await fetch("dependencies.json");
    dependencies = await dependencies.json();

    // Load the dependencies into the device
    const results = await sampleDevice.loadDataBufferDependencies(dependencies);
    results.forEach(result => {
        if (result.type === "success") {
            console.log(`Successfully loaded buffer with id ${result.id}`);
        } else {
            console.log(`Failed to load buffer with id ${result.id}, ${result.error}`);
        }
    });

    // Fetch params
    start = sampleDevice.parametersById.get("start");
    speed = sampleDevice.parametersById.get("speed");
    swing = sampleDevice.parametersById.get("swing");
    sample = sampleDevice.parametersById.get("sample");
    gain = sampleDevice.parametersById.get("gain");

    // Connect the devices in series
    sampleDevice.node.connect(context.destination);  
    context.resume();

    sound = Sound.from(sampleDevice.node, context).analyze(bins);  

    // Return the needed values
    return { start, speed, swing, sample, gain, sound }
}

function getCircle(circle, coords, color, lengthPercent, stroke) {

    let tdata = circle.sound.timeDomainTo([Const.two_pi, 0.5]).map((t, i) => {
      let angle = (i / bins) * Const.two_pi +  Math.PI * 0.5;
      let lineLength = (space.size.y * lengthPercent) / 100;
      let ln = Line.fromAngle(space.center.add(coords), angle, lineLength);
      return [ln.p1, ln.interpolate(t.y)];
    });

    for (let i = 0; i < tdata.length; i++) {
        form.stroke(color, stroke).line(tdata[i]);
      }
    }

async function initializeAll() {
    document.getElementById('begin-text').style.display = 'none';
    document.getElementById('loading-text').style.display = 'block';
    document.getElementById('button-container').style.display = 'none';

    patches = [];

    for (let i = 1; i <= 11; i++) {
        let filename = `seq${i}.export.json`;
        const setupResult = await setup(filename);
        patches.push(setupResult);
    }

    document.getElementById('loading-text').style.display = 'none';
    document.getElementById('button-container').style.display = 'block';

    space.add({

        animate: (time, ftime) => {
            getCircle(patches[0], [50, -50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[1], [-50, -50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[2], [150, -50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[3], [-150, -50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[4], [250, -50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[5], [-250, -50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[6], [100, 50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[10], [-100, 50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[7], [0, 50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[8], [200, 50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            getCircle(patches[9], [-200, 50], 'rgba(164, 196, 85, 0.07)',  20, 10);
            }
      });

    return patches;
}

let randomSequenceList;
function getSequence() {

    randomSequenceList = [];

    for (let i = 0; i < 6; i++) {
        randomSequenceList.push(Math.floor(Math.random() * 11))
    }
    return randomSequenceList;
}

let randomSampleList = [];
function getSamples() {

    randomSampleList = [];

    for (let i = 0; i < 6; i++) {
        randomSampleList.push(Math.floor(Math.random() * 33))
    }
    return randomSampleList;
}

let randomSwingList = [];
function getSwing() {

    randomSwingList = [];

    for (let i = 0; i < 6; i++) {
        const validNumbers = [];
        for (let i = 0; i <= 240; i++) {
            if ((i < 21 || i > 99) && (i < 141 || i > 219)) {
                validNumbers.push(i);
            }
        }
        const randomIndex = Math.floor(Math.random() * validNumbers.length);
        randomSwingList.push(validNumbers[randomIndex]);
    }
    return randomSwingList;
}

let randomSpeedList = [];
function getSpeed(){
    
    randomSpeedList = [];
    speedList = [120, 120, 120, 240, 480];

    for (let i = 0; i < 6; i++) {
        let randomSpeed = Math.floor(Math.random() * 5)
        randomSpeedList.push(speedList[randomSpeed]);
    }
    return randomSpeedList
};

let patch, sequences, samples, swings, speeds;
let activePatches = [];
let text;

function playPatches(sequences, samples, swings, speeds) {
    pause()

    console.log(sequences)
    for (let i = 0; i < 6; i++) {

        console.log(sequences[i])
        patch = patches[sequences[i]];
        console.log(patch)
        activePatches.push(patch)

        patch.start.value = 1;
        patch.speed.value = speeds[i];
        patch.swing.value = swings[i];
        patch.sample.value = samples[i];
        patch.gain.value = 1;

        console.log(`Sequence: ${sequences[i]} Speed: ${patch.speed.value} Swing: ${patch.swing.value} Sample: ${patch.sample.value}`);
    }

    text = getText();
}

function getRandomPatches() {

    sequences = getSequence();
    samples = getSamples();
    swings = getSwing();
    speeds = getSpeed();

    playPatches(sequences, samples, swings, speeds);
}

function downloadTextFile() {
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'drumsouvenir.txt';
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;

            let sequences2 = [];
            let samples2 = [];
            let speeds2 = [];
            let swings2 = [];

            const pattern = /Sequence: (\d+) Sample: (\d+) Speed: (\d+) Swing: (\d+)/g;

            let match;
            while ((match = pattern.exec(text)) !== null) {
                sequences2.push(parseInt(match[1], 10));
                samples2.push(parseInt(match[2], 10));
                speeds2.push(parseInt(match[3], 10));
                swings2.push(parseInt(match[4], 10));
            }

            console.log('Sequences:', sequences2);
            console.log('Samples:', samples2);
            console.log('Speeds:', speeds2);
            console.log('Swings:', swings2);

            playPatches(sequences2, samples2, swings2, speeds2);
        };
        reader.readAsText(file);
    }
});

function pause(){
    for (let i = 0; i < 11; i++){
        patches[i].start.value = 0;
    }
}

let sequence_text = ['|  * . . ✰ . . * . . . * . . * . * * . . ✰ . . * . . . * . . * * .   |',
                     '|  * . . . . . . . . ✰ . . . * . . * . . . . . . . . * . . . ✰ . .   |',
                     '|  * . . ✰ . . . . * . . ✰ . . . . * . . ✰ . . . . * . . ✰ . . . .   |',
                     '|  . . . . . . . * ✰ . . . . . . . . . . . . . . * ✰ . . . . . . .   |',
                     '|  * . . . . . . . . . . . * . . . . . . . * . . . . . * * . . . .   |',
                     '|  . . . . . . . . * . . . . . * . . . * . . . . . * . . . . . * .   |',
                     '|  * . * . . . . . . . * . . . . * * . * . . . . . . . * . . . . .   |',
                     '|  . . . ✰ . . . * . . . ✰ . . . . . . . ✰ . . . * . . . ✰ . . . .   |',
                     '|  . ✰ . . . ✰ . . ✰ . . ✰ . . . ✰ . ✰ . . . ✰ . . . . . ✰ . . . ✰   |',
                     '|  * . * . . . . * . . * . . . . . . . * . . . . * . . * . . . . .   |',
                     '|  . . . . * . . . . . . . * . . . . . . . * . . . . . . . . * * .   |']

function getText() {
    let text = '♡--------------------------------------------------------------------♡\n' +
        '|	            ✰ ༻¨*:· a drum souvenir ·:*¨༺ ✰ 	             |\n' +
        '|                                                                    |\n' +
        '|                                                                    |\n' +
        `|           Sequence: ${sequences[0].toString().padStart(2, '0')} Sample: ${samples[0].toString().padStart(2, '0')} Speed: ${speeds[0]} Swing: ${swings[0].toString().padStart(3, '0')}            |\n` +
        `${sequence_text[sequences[0]]}\n` +
        `|                                                                    |\n` +
        `|           Sequence: ${sequences[1].toString().padStart(2, '0')} Sample: ${samples[1].toString().padStart(2, '0')} Speed: ${speeds[1]} Swing: ${swings[1].toString().padStart(3, '0')}            |\n` +
        `${sequence_text[sequences[1]]}\n` +
        `|                                                                    |\n` +
        `|           Sequence: ${sequences[2].toString().padStart(2, '0')} Sample: ${samples[2].toString().padStart(2, '0')} Speed: ${speeds[2]} Swing: ${swings[2].toString().padStart(3, '0')}            |\n` +
        `${sequence_text[sequences[2]]}\n` +
        `|                                                                    |\n` +
        `|           Sequence: ${sequences[3].toString().padStart(2, '0')} Sample: ${samples[3].toString().padStart(2, '0')} Speed: ${speeds[3]} Swing: ${swings[3].toString().padStart(3, '0')}            |\n` +
        `${sequence_text[sequences[3]]}\n` +
        `|                                                                    |\n` +
        `|           Sequence: ${sequences[4].toString().padStart(2, '0')} Sample: ${samples[4].toString().padStart(2, '0')} Speed: ${speeds[4]} Swing: ${swings[4].toString().padStart(3, '0')}            |\n` +
        `${sequence_text[sequences[4]]}\n` +
        `|                                                                    |\n` +
        `|           Sequence: ${sequences[5].toString().padStart(2, '0')} Sample: ${samples[5].toString().padStart(2, '0')} Speed: ${speeds[5]} Swing: ${swings[5].toString().padStart(3, '0')}            |\n` +
        `${sequence_text[sequences[5]]}\n` +
        '|                                                                    |\n' +
        '|               * = regular beat    ✰ = beat w/ swing                |\n' +
        '|                                                                    |\n' +    
        '♡--------------------------------------------------------------------♡'
    return text
}

// Pts.js
space.bindMouse().bindTouch().play();