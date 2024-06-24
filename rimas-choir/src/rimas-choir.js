let sf1, sf2, sf3, sf4, sf5, sf6, sf7, sf8, sf9, sf10, sf11, sf12, sf13, sf14, sf15;
let btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn10, btn11, btn12, btn13, btn14, btn15;

let reverb = new p5.Reverb();
let delay = new p5.Delay();

delay.delayTime(0.1);
delay.filter(90); // low pass filter
reverb.set(3, 1.5);
reverb.chain(delay);

let panValue = [-1, -.5, 0, .5, 1];
let timeFromNow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let pathList = []

for (let i = 1; i < 16; i++) {
    pathList.push("../rimas-choir/src/assets/ubicaritas" + i + ".mp3")
}

function preload() {
    sf1 = loadSound(pathList[0]);
    sf2 = loadSound(pathList[1]);
    sf3 = loadSound(pathList[2]);
    sf4 = loadSound(pathList[3]);
    sf5 = loadSound(pathList[4]);
    sf6 = loadSound(pathList[5]);
    sf7 = loadSound(pathList[6]);
    sf8 = loadSound(pathList[7]);
    sf9 = loadSound(pathList[8]);
    sf10 = loadSound(pathList[9]);
    sf11 = loadSound(pathList[10]);
    sf12 = loadSound(pathList[11]);
    sf13 = loadSound(pathList[12]);
    sf14 = loadSound(pathList[13]);
    sf15 = loadSound(pathList[14]);
}

function setup() {
    noCanvas();

    btn1 = createButton('✧.*𖦹°‧★');
    btn2 = createButton('⋆·˚ ༘ *');
    btn3 = createButton('*ೃ༄༘');
    btn4 = createButton('𐦍༘⋆');
    btn5 = createButton('‧ ˚⋅*⋆𓆩');
    btn6 = createButton('༉‧₊˚.');
    btn7 = createButton('*‧₊');
    btn8 = createButton('*ੈ✩‧₊˚');
    btn9 = createButton('˚. ✦˳✶ ⋆');
    btn10 = createButton('●∘◦❀');
    btn11 = createButton('☄. *. ⋆');
    btn12 = createButton('☆⋆｡𖦹°‧★');
    btn13 = createButton('⋆˚✿˖°');
    btn14 = createButton('⋆｡°✩');
    btn15 = createButton('⋆.ೃ࿔*');

    btn1.mousePressed(function(){playSound(sf1)})
    btn2.mousePressed(function(){playSound(sf2)})
    btn3.mousePressed(function(){playSound(sf3)})
    btn4.mousePressed(function(){playSound(sf4)})
    btn5.mousePressed(function(){playSound(sf5)})
    btn6.mousePressed(function(){playSound(sf6)})
    btn7.mousePressed(function(){playSound(sf7)})
    btn8.mousePressed(function(){playSound(sf8)})
    btn9.mousePressed(function(){playSound(sf9)})
    btn10.mousePressed(function(){playSound(sf10)})
    btn11.mousePressed(function(){playSound(sf11)})
    btn12.mousePressed(function(){playSound(sf12)})
    btn13.mousePressed(function(){playSound(sf13)})
    btn14.mousePressed(function(){playSound(sf14)})
    btn15.mousePressed(function(){playSound(sf15)})
}
    
function playSound(sound) {
    let timeFromNow1 = random(timeFromNow);
    sound.pan(random(panValue), 0);
    sound.pan(random(panValue), timeFromNow1);
    sound.pan(random(panValue), timeFromNow1 + random(timeFromNow));
    sound.rate(-.75);
    sound.disconnect();
    sound.connect(reverb);
    sound.play();
}
