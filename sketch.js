const yellow = '#EA0';
const orange = '#E62';
const purple = '#636';
const pink = '#C25';
const TAU = Zdog.TAU;

let isSpinning = true;

let illo = new Zdog.Illustration({
  element: '.zdog-svg',
  dragRotate: true,
  resize: 'fullscreen',
  zoom: 6,
  translate: { y: -11 },
  rotate: { z: -TAU/50 },
  onDragStart: function() {
    isSpinning = false;
  },
});

// body
new Zdog.Hemisphere({
  addTo: illo,
  diameter: 40,
  stroke: 50,
  rotate: { x: TAU/4 },
  translate: { y: 40 },
  color: yellow,
});

//left wing
let wing = new Zdog.Shape({
  addTo: illo,
  path: [
    { x: 0, y: 0 },
    { arc: [
      { x: 0, y: -20 , z: -10 },
      { x: 0, y:  0 , z: -20 },
    ]}
  ],
  rotate: { z: TAU/8 },
  translate: { x: -45, y: 35 },
  fill: true,
  color: yellow,
  stroke: 16,
  scale: 1.2,
})

//right wing
wing.copy({
  translate: { x: 45, y: 35 },
  rotate: { z: -TAU/8 },
});

// head
var head = new Zdog.Shape({
  addTo: illo,
  translate: { y: -13 , z: 10 },
  color: yellow,
  stroke: 60,
});

// beak
new Zdog.Shape({
  addTo: head,
  path: [
    { x: 0, y: 0 },
    { x: 8, y: 10, z: 10 },
    { x: -8, y: 10, z: 10 },
    { x: 0, y: 0 },
    { x: 10, y: 10 },
    { x: 8, y: 10, z: 10 },
    { x: 0, y: 0 },
    { x: -10, y: 10 },
    { x: -8, y: 10, z: 10 },
    { x: 8, y: 10, z: 10 },
    { x: 10, y: 10 },
    { x: -10, y: 10 }
  ],
  translate: { z: 25 },
  color: orange,
  stroke: 10,
  fill: true,
});

// left eye
let eye = new Zdog.Ellipse({
  addTo: head,
  diameter: 5,
  quarters: 2,
  translate: { x: -14, y: -3, z: 20 },
  rotate: { z: -TAU/4 },
  color: purple,
  stroke: 2,
  backface: false,
});

// right eye
eye.copy({
  translate: { x: 14, y: -3, z: 20 },
});

// left eyebrow
let eyebrow = new Zdog.Shape({
  addTo: head,
  path: [
    { x: 0, y: 0 },
    { x: 5, y: 1.7},
  ],
  translate: { x: -16.5, y: -9, z: 20 },
  color: pink,
  stroke: 2,
  backface: false,
});

// right eyebrow
eyebrow.copy({
  path: [
    { x: 5, y: 0 },
    { x: 0, y: 1.7},
  ],
  translate: { x: 11.5, y: -9, z: 20 },
});

function animate() {
  if ( isSpinning ) {
    illo.rotate.y += 0.03;
  }
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();
