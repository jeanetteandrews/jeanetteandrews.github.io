let osc, osc2, osc3, osc4;
let reverb1, reverb2, reverb3, reverb4;
let playing;

let midiNotes = [60, 62, 64, 65, 67, 69, 71, 72];

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight, canvas1)
  cnv.mousePressed(playOscillator);
  background(0);

  // Oscillators
  osc = new p5.Oscillator( 'sine');
  osc2 = new p5.Oscillator('triangle');
  osc3 = new p5.Oscillator('sine');
  osc4 = new p5.Oscillator('sawtooth');

  // Disconnect dry signal from speakers
  // osc.disconnect();
  osc2.disconnect();
  // osc3.disconnect();
  osc4.disconnect();

  reverb1 = new p5.Reverb();
  reverb2 = new p5.Reverb();
  reverb3 = new p5.Reverb();
  reverb4 = new p5.Reverb();

  reverb1.process(osc, 3, 0.7);
  reverb2.process(osc2, 3, 0.7);
  reverb3.process(osc3, 3, 0.7);
  reverb4.process(osc4, 3, 0.7);
}

function draw() {
  // background(255);

  // Horizontal control
  let index = floor(map(mouseX, 0, width, 0, midiNotes.length));
  index = constrain(index, 0, midiNotes.length - 1); 
  let midi = midiNotes[index];

  // Vertical control
  let index2 = floor(map(mouseY, 0, height, 0, midiNotes.length));
  index2 = constrain(index2, 0, midiNotes.length - 1); 
  let midi2 = midiNotes[index2];

  // Diagonal \
  let diagPos = (mouseX + mouseY) / 2;
  let diagIndex = floor(map(diagPos, 0, (width + height) / 2, 0, midiNotes.length));
  diagIndex = constrain(diagIndex, 0, midiNotes.length - 1);
  let midi3 = midiNotes[diagIndex];

  // Diagonal /
  let diag2Pos = (width - mouseX + mouseY) / 2;
  let diag2Index = floor(map(diag2Pos, 0, (width + height) / 2, 0, midiNotes.length));
  diag2Index = constrain(diag2Index, 0, midiNotes.length - 1);
  let midi4 = midiNotes[diag2Index];

  // fill(255, 128, 196);
  // text(`MIDI Note —:  ${midi}`, 20, 40);
  // text(`MIDI Note |: ${midi2+12}`, 20, 60);
  // text(`MIDI Note \\ : ${midi3-12}`, 20, 80);
  // text(`MIDI Note / : ${midi4-24}`, 20, 100);

  if (playing) {
    osc.freq(midiToFreq(midi), 0.1);
    osc2.freq(midiToFreq(midi2+12), 0.1);
    osc3.freq(midiToFreq(midi3-12), 0.1);
    osc4.freq(midiToFreq(midi4-24), 0.1);
    
    osc.amp(0.15, 0.1);
    osc2.amp(0.2, 0.1);
    osc3.amp(0.2, 0.1);
    osc4.amp(0.1, 0.1);
  }

  if (mouseIsPressed === true) {
    noStroke();
    c1 = map(midi, 60, 72, 0, 255)
    c2 = map(midi2, 60, 72, 0, 255)
    c3 = map(midi3, 60, 72, 0, 255)
    c4 = map(midi4, 60, 72, 20, 255)
    fill(c1, c2, c3, 80)
    ellipse(mouseX, mouseY, 20);
  }
}

function playOscillator() {
  // Enable audio and start oscillators
  osc.start();
  osc2.start();
  osc3.start();
  osc4.start();
  playing = true;
}

function mouseReleased() {
  osc.amp(0, 0.13);
  osc2.amp(0, 0.11);
  osc3.amp(0, 0.9);
  osc4.amp(0, 0.7);
  playing = false;
}