let isInitialized = false;

async function handlePlayClick(id) {
  const button = document.getElementById(`playButton`);
  
  const patchExists = patchData[id] && patchData[id].patch !== null;
  
  if (!isInitialized || !patchExists) {
    button.textContent = "Loading...";
    button.style.pointerEvents = "none";
    
    try {
      console.log('Initializing...');
      await initializeAll(id);
      console.log('Initialization complete');
      
      button.style.pointerEvents = "auto";
      isInitialized = true;
      
      togglePlayback(id);
    } catch (error) {
      console.error('Initialization failed:', error);
      button.textContent = "Error";
      button.style.pointerEvents = "auto";
    }
  } else {
    console.log('Already initialized, toggling playback');
    togglePlayback(id);
  }
}

async function initializeAll(id) {
  // Map genre IDs to their file names
  const genreConfig = {
    'budots': { jsonFile: 'budots.json', canvasId: 'visualizer' },
    'techno': { jsonFile: 'techno.json', canvasId: 'visualizer' },
    'amapiano': { jsonFile: 'amapiano.json', canvasId: 'visualizer' },
    'boombap': { jsonFile: 'boombap.json', canvasId: 'visualizer' }
  };
  
  const config = genreConfig[id];
  if (!config) {
    throw new Error(`Unknown genre: ${id}`);
  }
  
  await setup(id, config.jsonFile, config.canvasId);
  sessionStorage.setItem(`audioInitialized_${id}`, 'true');
}

let patchData = {
  'budots': { playing: false, patch: null, context: null, device: null },
  'techno': { playing: false, patch: null, context: null, device: null },
  'amapiano': { playing: false, patch: null, context: null, device: null },
  'boombap': { playing: false, patch: null, context: null, device: null }
};

async function setup(id, jsonFile, canvasId) {
  console.log('setup() started');
  
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const outputNode = context.createGain();
  outputNode.connect(context.destination);

  console.log('Fetching patcher JSON...');
  const response = await fetch(jsonFile);
  const patcher = await response.json();
  
  console.log('Creating RNBO device...');
  const device = await RNBO.createDevice({ context, patcher });
  device.node.connect(context.destination);

  console.log('Loading dependencies...');
  const depResponse = await fetch("dependencies.json");
  const dependencies = await depResponse.json();
  await device.loadDataBufferDependencies(dependencies);

  console.log('Getting parameters...');
  patchData[id].context = context;
  patchData[id].device = device;
  
  // Build patch object with required parameters
  patchData[id].patch = {
    start: device.parametersById.get("start"),
    kgain: device.parametersById.get("kgain"),
    sgain: device.parametersById.get("sgain"),
    hgain: device.parametersById.get("hgain")
  };
  
  // Add optional gain and gate parameters only if they exist
  const optionalParams = ['bgain', 'ogain', 'kht', 'sht', 'hht', 'bht', 'oht'];
  
  optionalParams.forEach(paramKey => {
    const param = device.parametersById.get(paramKey);
    if (param) {
      patchData[id].patch[paramKey] = param;
    }
  });

  console.log('Parameters retrieved:', patchData[id].patch);

  context.resume();
  
  console.log('Connecting visualizer...');
  connectVisualizer(context, device.node, document.getElementById(canvasId));
  
  console.log('Setting up sliders...');
  setupSliders(id);
  
  console.log('setup() complete!');
}

function togglePlayback(id) {
  console.log('togglePlayback called for id:', id);
  
  const patch = patchData[id].patch;
  
  if (!patch) {
    console.error('ERROR: patch is null!');
    return;
  }
  
  const button = document.getElementById(`playButton`);

  if (patchData[id].playing) {
    patch.start.value = 0;
    patch.kgain.value = 0;
    patch.sgain.value = 0;
    patch.hgain.value = 0;
    
    // Only set if they exist
    if (patch.bgain) patch.bgain.value = 0;
    if (patch.ogain) patch.ogain.value = 0;
    
    patchData[id].playing = false;
    button.textContent = "Play";
  } else {
    patch.start.value = 1;
    patch.kgain.value = 1;
    patch.sgain.value = 1;
    patch.hgain.value = 1;
    
    // Only set if they exist
    if (patch.bgain) patch.bgain.value = 1;
    if (patch.ogain) patch.ogain.value = 1;
    
    patchData[id].playing = true;
    button.textContent = "Pause";
  }
}

function setupSliders(id) {
  const patch = patchData[id].patch;

  // Define all possible sliders and their corresponding patch parameters
  const sliderMap = {
    'kickGate': 'kht',
    'snareGate': 'sht',
    'hhGate': 'hht',
    'bassGate': 'bht',
    'otherGate': 'oht'
  };

  // Loop through and set up only the sliders that exist on this page
  Object.keys(sliderMap).forEach(sliderId => {
    const slider = document.getElementById(sliderId);
    const paramName = sliderMap[sliderId];
    
    // Only set up if slider exists on page AND parameter exists in patch
    if (slider && patch[paramName]) {
      // Initialize patch parameter from slider default
      patch[paramName].value = parseFloat(slider.value);
      
      // Add event listener
      slider.addEventListener("input", () => {
        const val = parseFloat(slider.value);
        patch[paramName].value = val;
        console.log(`${sliderId} (${id}):`, val);
      });
    }
  });
}

function randomizeGates(id) {
  const patch = patchData[id].patch;

  // Define all possible sliders and their corresponding patch parameters
  const sliderMap = {
    'kickGate': 'kht',
    'snareGate': 'sht',
    'hhGate': 'hht',
    'bassGate': 'bht',
    'otherGate': 'oht'
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Randomize only the sliders that exist on this page
  Object.keys(sliderMap).forEach(sliderId => {
    const slider = document.getElementById(sliderId);
    const paramName = sliderMap[sliderId];
    
    if (slider && patch[paramName]) {
      const randomVal = randomInRange(parseFloat(slider.min), parseFloat(slider.max));
      slider.value = randomVal.toFixed(3);
      patch[paramName].value = randomVal;
      console.log(`Randomized ${sliderId} (${id}):`, randomVal.toFixed(3));
    }
  });
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
    ctx.strokeStyle = "white";
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

// Expose functions globally
window.handlePlayClick = handlePlayClick;
window.togglePlayback = togglePlayback;
window.randomizeGates = randomizeGates;