let patchData = {
    '50': { playing: false, patch: null, context: null, device: null },
    '150': { playing: false, patch: null, context: null, device: null }
  };
  
  async function setup(id, jsonFile, canvasId) {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const outputNode = context.createGain();
    outputNode.connect(context.destination);
  
    const response = await fetch(jsonFile);
    const patcher = await response.json();
    const device = await RNBO.createDevice({ context, patcher });
    device.node.connect(context.destination);
  
    const depResponse = await fetch("dependencies.json");
    const dependencies = await depResponse.json();
    await device.loadDataBufferDependencies(dependencies);
  
    patchData[id].context = context;
    patchData[id].device = device;
    patchData[id].patch = {
      start: device.parametersById.get("start"),
      kgain: device.parametersById.get("kgain"),
      sgain: device.parametersById.get("sgain"),
      hgain: device.parametersById.get("hgain"),
      kht: device.parametersById.get("kht"),
      sht: device.parametersById.get("sht"),
      hht: device.parametersById.get("hht")
    };
  
    context.resume();
    connectVisualizer(context, device.node, document.getElementById(canvasId));
    setupSliders(id);
  }
  
  function togglePlayback(id) {
    const patch = patchData[id].patch;
    const button = document.getElementById(`playButton${id}`);
  
    if (patchData[id].playing) {
      patch.start.value = 0;
      patch.kgain.value = 0;
      patch.sgain.value = 0;
      patch.hgain.value = 0;
      patchData[id].playing = false;
      button.textContent = "Play";
    } else {
      patch.start.value = 1;
      patch.kgain.value = 1;
      patch.sgain.value = 1;
      patch.hgain.value = 1;
      patchData[id].playing = true;
      button.textContent = "Pause";
    }
  }
  
  function setupSliders(id) {
    const patch = patchData[id].patch;
    const suffix = id === '150' ? '150' : '';
  
    const kickSlider = document.getElementById(`kickGate${suffix}`);
    const snareSlider = document.getElementById(`snareGate${suffix}`);
    const hhSlider = document.getElementById(`hhGate${suffix}`);

    // Initialize patch parameter values from slider defaults
    patch.kht.value = parseFloat(kickSlider.value);
    patch.sht.value = parseFloat(snareSlider.value);
    patch.hht.value = parseFloat(hhSlider.value);
  
    kickSlider.addEventListener("input", () => {
      const val = parseFloat(kickSlider.value);
      patch.kht.value = val;
      console.log(`Kick Gate (${id}):`, val);
    });
    snareSlider.addEventListener("input", () => {
      const val = parseFloat(snareSlider.value);
      patch.sht.value = val;
      console.log(`Snare Gate (${id}):`, val);
    });
    hhSlider.addEventListener("input", () => {
      const val = parseFloat(hhSlider.value);
      patch.hht.value = val;
      console.log(`HH Gate (${id}):`, val);
    });
  }

  function randomizeGates(id) {
    const suffix = id === '150' ? '150' : '';
    const patch = patchData[id].patch;
  
    // Get sliders
    const kickSlider = document.getElementById(`kickGate${suffix}`);
    const snareSlider = document.getElementById(`snareGate${suffix}`);
    const hhSlider = document.getElementById(`hhGate${suffix}`);
  
    // Helper to generate random float in [min, max]
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    // Randomize each slider within its min/max
    const kickVal = randomInRange(parseFloat(kickSlider.min), parseFloat(kickSlider.max));
    const snareVal = randomInRange(parseFloat(snareSlider.min), parseFloat(snareSlider.max));
    const hhVal = randomInRange(parseFloat(hhSlider.min), parseFloat(hhSlider.max));
  
    // Update sliders
    kickSlider.value = kickVal.toFixed(3);
    snareSlider.value = snareVal.toFixed(3);
    hhSlider.value = hhVal.toFixed(3);
  
    // Update patch parameters
    patch.kht.value = kickVal;
    patch.sht.value = snareVal;
    patch.hht.value = hhVal;
  
    console.log(`Randomized gates (${id}): Kick=${kickVal.toFixed(3)}, Snare=${snareVal.toFixed(3)}, HH=${hhVal.toFixed(3)}`);
  }
  
  
  
  function connectVisualizer(audioCtx, sourceNode, canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    sourceNode.connect(analyser);
  
    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
  
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      ctx.lineWidth = 2;
      ctx.strokeStyle = "hotpink";
      ctx.beginPath();
  
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    }
    draw();
  }

  async function initializeAll() {
    document.getElementById('begin-text').style.display = 'none';
    document.getElementById('loading-overlay').style.display = 'flex';

    await setup('50', 'techno50.export.json', 'visualizerCanvas');
    await setup('150', 'techno150.export.json', 'visualizerCanvas150');
    document.getElementById('loading-overlay').style.display = 'none';
  };
  
  window.togglePlayback = togglePlayback;

  const scrollIndicator = document.getElementById("scrollIndicator");
  window.addEventListener("scroll", () => {
    const fadeOut = window.scrollY > 30;
    scrollIndicator.classList.toggle("fade", fadeOut);
  });