setInterval(myTimer, 1000);

function myTimer() {
    const d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString(navigator.language, {hour: 'numeric', minute:'2-digit'}).replace("AM", "am").replace("PM","pm");
}

function setup() {
    createCanvas(1284, 2778, WEBGL);
    noStroke();
  }
  
function draw() {

  let locX = mouseX - 650;
  let locY = mouseY - 1425;
      
  pointLight(255, 255, 255, locX, locY, 100);
  directionalLight(255, 255, 255, -1, 1, -1);
  ambientLight(100);
  ambientMaterial('#2548d2');
  specularMaterial(255);
  shininess(150);
  fill('#ff0000');
  translate(locX, locY);
  rotateX(mouseY * 0.01);
  rotateY(mouseX * 0.01);
  torus(120, 80, 40, 30);
}
  
