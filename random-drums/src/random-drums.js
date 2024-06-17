let randomBtn = document.getElementById("randomize");
const instrumentList = [kick, snare, hihat, hihat2, rim, shaker]

const kickLoad = new Promise(resolve => {
  kick.addEventListener("canplaythrough", resolve, { once: true })
})
const snareLoad = new Promise(resolve => {
  snare.addEventListener("canplaythrough", resolve, { once: true })
})
const hihatLoad = new Promise(resolve => {
  hihat.addEventListener("canplaythrough", resolve, { once: true })
})
const hihat2Load = new Promise(resolve => {
  hihat2.addEventListener("canplaythrough", resolve, { once: true })
})
const rimLoad = new Promise(resolve => {
  rim.addEventListener("canplaythrough", resolve, { once: true })
})
const shakerLoad = new Promise(resolve => {
  shaker.addEventListener("canplaythrough", resolve, { once: true })
})

randomBtn.textContent = "loading..."
Promise.all([kickLoad, snareLoad, hihatLoad, hihat2Load, rimLoad, shakerLoad]).then(() => {
  randomBtn.textContent = "randomize"
  playMusic()
})

function playMusic() {
  randomBtn.addEventListener("click", () => {
    for (let i=0; i < instrumentList.length; i++) {
      let randomSpeed = Math.floor(Math.random() * 17) //17)
      let randomPitch = Math.floor(Math.random() * 2)
      playInstrument(randomSpeed, randomPitch, instrumentList[i])
    }
  });
  
  randomBtn.addEventListener("mouseover", () => {
    anime({
      targets: '.star',
      scale: 1.25
    })
  });
  
  randomBtn.addEventListener("mouseleave", () => {
    anime({
      targets: '.star',
      scale: 1
    })
  });
}

function playInstrument(speed, pitch, instrument) {
  instrument.currentTime = 0;
  instrument.play();
  if (pitch==0) {
    instrument.preservesPitch = true;
  } else if (pitch==1){
  instrument.preservesPitch = false;
  };
  if (speed>=0 && speed<3) {
    var rate = 0.5
  }
  else if (speed>=3 && speed<6) {
    var rate = 1
  }
  else if (speed>=6 && speed<9) {
    var rate = 2
  }
  else if (speed>=9 && speed<11) {
    var rate = 4
  }
  else if (speed>=11 && speed<13) {
    var rate = .25
  }
  else if (speed>=13 && speed<15) {
    var rate = 0
  }
  else if (speed==15) {
    var rate = 8
  }
  else if (speed==16) {
    var rate = 0.125
  }
  instrument.playbackRate = rate
  if (rate!=0) {
    if (instrument==kick) {
      kickAnimation(rate);
    } else if (instrument==snare){
      snareAnimation(rate, '#snare-circle');
    } else if (instrument==hihat){
        hihatAnimation(rate);
    } else if (instrument==hihat2){
      hihat2Animation(rate, '#hihat2-circle', [1041, 2596], 1544);
    } else if (instrument==rim){
      snareAnimation(rate, '#rim-circle');
    } else if (instrument==shaker){
      hihat2Animation(rate, '#shaker-circle', [1379, 2612], 1190);
    }
  }
}

function kickAnimation(speed) {
  let rate = 1/speed
  let timeArray = [0, 384, 548, 188, 38, 714].map(x => x * rate).map(x => '+=' + x);
  let tl = anime.timeline({
    easing: 'linear',
    duration: 150 * rate,
    loop: true,
    autoplay: false
  });
  tl
  .add({
    targets: '#kick-circle',
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ],
  }, timeArray[0])
  .add({
    targets: '#kick-circle',
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ],
  },timeArray[1])
  .add({
    targets: '#kick-circle',
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ],
  },timeArray[2])
  .add({
    targets: '#kick-circle',
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ],
  },timeArray[3])
  .add({
    targets: '#kick-circle',
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ],
  },timeArray[4])
  .add({
    targets: '#kick-circle',
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ],
    endDelay: 19 * rate
  },timeArray[5])
  tl.play()
  randomBtn.addEventListener("click", () => {tl.pause()})
}

function snareAnimation(speed, target) {
  let rate = 1/speed
  let timeArray = [498, 1190, 1200, 1190, 149].map(x => x * rate).map(x => '+=' + x);
  let tl = anime.timeline({
    easing: 'linear',
    duration: 200 * rate,
    loop: true,
    autoplay: false
  });
  tl
  .add({
    targets: target,
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ]
  },timeArray[0])
  .add({
    targets: target,
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ]
  },timeArray[1])
  .add({
    targets: target,
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ]
  },timeArray[2])
  .add({
    targets: target,
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ]
  },timeArray[3])
  .add({
    targets: target,
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ],
    endDelay: 354 * rate
  },timeArray[4]);
  tl.play()
  randomBtn.addEventListener("click", () => {tl.pause()})
}

function hihatAnimation(speed) {
  let rate = 1/speed
  let time = 248.8125*rate
  let tl = anime.timeline({
    easing: 'linear',
    duration: 100 * rate,
    loop: true,
    autoplay: false
  });
  tl
  .add({
    targets: '#hihat-circle',
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ]
  },'+='+time)
  tl.play()
  randomBtn.addEventListener("click", () => {tl.pause()})
}

function hihat2Animation(speed, target, array, delay) {
  let rate = 1/speed
  console.log(array)
  let timeArray = array.map(x => x * rate).map(x => '+=' + x);
  let tl = anime.timeline({
    easing: 'linear',
    duration: 200 * rate,
    loop: true,
    autoplay: false
  });
  tl
  .add({
    targets: target,
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ]
  },timeArray[0])
  .add({
    targets: target,
    keyframes: [
      {scale: 1.2},
      {scale: 1}
    ],
    endDelay: delay * rate
  },timeArray[1])
  tl.play()
  randomBtn.addEventListener("click", () => {tl.pause()})
}