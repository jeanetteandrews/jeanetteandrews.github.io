Pts.namespace( window );

var space = new CanvasSpace("#pt");
space.setup({ bgcolor: "#fff", resize: true, width: 90, height: 90});
var form = space.getForm();

var bins = 512;

// load audio file
let synth = new Tone.Synth().toDestination();
let sound = Sound.from( synth, synth.context ).analyze(bins);

// define variable for our location
let locationField;
let audioCtx;
let freq = 0;

// wait until html document is loaded so that we can access the keyboard input field
document.addEventListener('DOMContentLoaded', function(event) { 
  locationField = document.getElementById("location"); 
})

let WAContext = window.AudioContext || window.webkitAudioContext;
let context = new WAContext();

function sonify(){
  console.log(locationField.value);
  const options = {
	method: 'GET',
	headers: {
		// 'X-RapidAPI-Key': '35614621f7msh11c5e8f93c0fe3fp173188jsn1c741d3c40e6',
    'X-RapidAPI-Key': '2b61133c54msh50d974b8b489d8bp116c6bjsn1f0ec10c5494',
		'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
	}
};

const today = new Date();
today.setDate(today.getDate() - 1);
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(today.getDate() - 6);

console.log(today)
console.log(sevenDaysAgo)

// Format the dates as YYYY-MM-DD
const endDate = today.toISOString().split('T')[0];
const startDate = sevenDaysAgo.toISOString().split('T')[0];

console.log(endDate)
console.log(startDate)

const url = `https://visual-crossing-weather.p.rapidapi.com/history?aggregateHours=24&location=${locationField.value}&startDateTime=${startDate}T12:00:00&endDateTime=${endDate}T12:00:00&contentType=json&unitGroup=us&shortColumnNames=0`;

fetch(url, options)
	.then(response => response.json())
	.then(response => {
    console.log(response);
    
    const locationIndex = locationField.value;
    const values = response.locations[locationIndex].values;

    const midiNotes = values.map((value, index) => {
        const note = Tone.Frequency(value.temp, "midi").toNote();
        const timing = index * 0.25; 
        return { note: note, duration: "8n", timing: timing };
    });

    const conditionsArray = values.map((value, index) => {
      return [ value.conditions ] ;
    });

    condition = getMostFrequentCondition(conditionsArray)
    
    console.log(condition)

    triggerNotes(midiNotes);
    console.log(midiNotes);

    document.getElementById("response").innerHTML = condition + ' in ' + locationField.value + "</p>"
  })
	.catch(err => console.error(err));
}

function triggerNotes(midiNotes) {
  midiNotes.forEach(noteData => {
      const now = Tone.now();
      const duration = noteData.duration;
      const timing = now + noteData.timing;

      // Trigger the note using synth.triggerAttackRelease()
      synth.triggerAttackRelease(noteData.note, duration, timing);
  });
}

function getMostFrequentCondition(conditionsArray) {
  // Step 1: Create a frequency counter object
  const frequencyCounter = {};

  // Step 2: Count occurrences of each string
  conditionsArray.forEach(item => {
    const condition = item[0]; // Since each item is an array with one element
    if (frequencyCounter[condition]) {
        frequencyCounter[condition]++;
    } else {
        frequencyCounter[condition] = 1;
    }
  });

  // Step 3: Find the string with the maximum count
  let maxCount = 0;
  let mostFrequentCondition = '';

  Object.keys(frequencyCounter).forEach(condition => {
    if (frequencyCounter[condition] > maxCount) {
        maxCount = frequencyCounter[condition];
        mostFrequentCondition = condition;
    }
  });

return mostFrequentCondition.toLowerCase();
}

function clearInput(){
  locationField.value = '';
}
//////////////////////// pts.js ////////////////////////

space.add({
  animate: (time, ftime) => {
    if (sound) {
      getFlower(1.7, 'black', .5);
      getFlower(2.2, 'black', .5);
      getFlower(3.2, 'black', .5);
    }
  }
});

function getFlower(size, color, rotation){
  let tdata = sound.timeDomainTo([Const.two_pi, 1]).map((t, i) => {
    let angle = (i / bins) * Const.two_pi +  Math.PI * rotation;
    let ln = Line.fromAngle(space.center, angle, space.size.y / size); // Create a line with the rotated angle
    return [ln.p1, ln.interpolate(t.y)];
  });
  
  for (let i = 0, len = tdata.length; i < len; i++) {
    form.stroke(color, 0.1).line(tdata[i]);
  }
}
  
space.bindMouse().bindTouch().play();