let pixelStrength = 0.00001;
let coloramaStrength = 0;

// Auto-start audio when user first interacts with a slider
let audioStarted = false;
function ensureAudioStarted() {
  if (!audioStarted) {
    Tone.start().then(() => {
      startSequence();
      logMasterVolume();
      audioStarted = true;
      console.log("audio is ready");
    });
  }
}

// 32 in each 8 count, 256 in total
//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const kickSequence   = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, // 1
                        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, // 2
                        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, // 3
                        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, // 5
                        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, // 6
                        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, // 7
                        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const snareSequence  = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 1
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 2
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 3
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, // 4
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 5
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 6
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 7
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0] // 8

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const snarePatternA  = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 1
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 2
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 3
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, // 4
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 5
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 6
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 7
                        0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0] // 8

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const snarePatternB = [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 1
                        0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 2
                        0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 3
                        0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, // 4
                        0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 5
                        0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 6
                        0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, // 7
                        0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0] // 8

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const snarePatternC =  [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, // 1
                        0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, // 2
                        0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, // 3
                        0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, // 4
                        0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, // 5
                        0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, // 6
                        0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, // 7
                        0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0] // 8                        

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const cymbalSequence = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const fxSequence     = [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const fxPatternA    =  [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8      

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const fxPatternB    =  [0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8   

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const fx1Sequence    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const fx1PatternA    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8       
                        
//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const fx1PatternB    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8                               

// HA                        
//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const fx2Sequence    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8  

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const tiwtiwSequence = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8  

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const tiwtiwPatternA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8  

 //                     1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
 const tiwtiwPatternC= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8                                                  

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const tiwtiwPatternE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, // 5
                        1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, // 7
                        1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8                          

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const sweepSequence  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8  

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const sweepPatternA  = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8                               

//                      1  e  +  a  2  e  +  a  3  e  +  a  4  e  +  a  5  e  +  a  6  e  +  a  7  e  +  a  8  e  +  a 
const sweepPatternB  = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 2
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 3
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 4
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 5
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 6
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 7
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // 8                          

//                      1     e     +     a     2     e     +     a     3     e     +     a     4     e     +     a     5     e     +     a     6     e     +     a     7     e     +     a     8     e     +     a 
const fx3Sequence    = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 1
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 2
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 3
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 4
                        "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "B0", null, "C1", "C1", "C1", null, "C1", null, // 5
                        "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "B0", null, "C1", "C1", "C1", null, "C1", null, // 6
                        "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "B0", null, "C1", "C1", "C1", null, "C1", null, // 7
                        "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] // 8

//                      1     e     +     a     2     e     +     a     3     e     +     a     4     e     +     a     5     e     +     a     6     e     +     a     7     e     +     a     8     e     +     a 
const bassSequence   = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 1
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 2
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 3
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 4
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 5
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 6
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 7
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] // 8

const bassPatternA   = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 1
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 2
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 3
                        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 4
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 5
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 6
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 7
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] // 8

// //                   1     e     +     a     2     e     +     a     3     e     +     a     4     e     +     a     5     e     +     a     6     e     +     a     7     e     +     a     8     e     +     a 
const bassPatternB  = [ null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 5
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 6
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 7
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, // 8
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 5
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 6
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null,"D#1", null, // 7
                        null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, "C1", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] // 8

const sequences = [
  kickSequence,
  snareSequence,
  cymbalSequence,
  fxSequence,
  fx1Sequence,
  fx2Sequence,
  fx3Sequence,
  tiwtiwSequence,
  sweepSequence,
  bassSequence
];

const groupMap = [
  [0],
  [1],
  [3, 4, 5, 6, 7],   // fx, fx1, fx2, fx3, tiwtiw
  [2, 8],            // cymbals, sweep
  [9]
];

const effects = [
  new Tone.Distortion(10).toDestination(), // bomb
  new Tone.FeedbackDelay("16n", 0).toDestination(), // pak
  new Tone.Distortion(10).toDestination(), // cymbals
  new Tone.PingPongDelay("16n", 0.1).toDestination(), //fx
  new Tone.Phaser().toDestination(), // fx1
  new Tone.Phaser().toDestination(), // fx2
  new Tone.Phaser().toDestination(), // fx2
  new Tone.Phaser().toDestination(), // tiwtiw
  new Tone.PingPongDelay("8n", 0.9).toDestination(), // sweep
  new Tone.PingPongDelay("16n", 0.7).toDestination(), // bass
]

effects.forEach(effect => {
  if ('wet' in effect) effect.wet.value = 0;
});

seqLen = sequences.length
// one Tone.Volume for each track - start all muted
const volumes = Array.from({ length: seqLen }, () => {
  const vol = new Tone.Volume(0).toDestination();
  vol.mute = true; // Start all muted
  return vol;
});

const samples = [
  new Tone.Player("../webbudots/src/samples/bomb.wav").connect(volumes[0]).connect(effects[0]),
  new Tone.Player("../webbudots/src/samples/pak.wav").connect(volumes[1]).connect(effects[1]),
  new Tone.Player("../webbudots/src/samples/cymbals.wav").connect(volumes[2]).connect(effects[2]),
  new Tone.Player("../webbudots/src/samples/fx.wav").connect(volumes[3]).connect(effects[3]),
  new Tone.Player("../webbudots/src/samples/fx1.wav").connect(volumes[4]).connect(effects[4]),
  new Tone.Player("../webbudots/src/samples/fx2.wav").connect(volumes[5]).connect(effects[5]),
  new Tone.Sampler({"C1":"../webbudots/src/samples/fx3.wav"}).connect(volumes[6]).connect(effects[6]),
  new Tone.Player("../webbudots/src/samples/tiwtiw.wav").connect(volumes[7]).connect(effects[7]),
  new Tone.Player("../webbudots/src/samples/sweep.wav").connect(volumes[8]).connect(effects[8]),
  new Tone.Sampler({"C1":"../webbudots/src/samples/bass.wav"}).connect(volumes[9]).connect(effects[9])
];

// Disconnect all samples from effects initially
samples.forEach((sample, index) => {
  sample.disconnect(effects[index]);
});

const effectEnabled = Array(groupMap.length).fill(false); // tracks if effect is connected - start all off

function toggleTrack(groupIndex, buttonElement) {
  const indices = groupMap[groupIndex];
  effectEnabled[groupIndex] = !effectEnabled[groupIndex];

  const sliderElement = buttonElement.nextElementSibling;

  if (!effectEnabled[groupIndex]) {
    buttonElement.classList.add("grayscale");
    sliderElement.classList.add("grayscale");
    indices.forEach(index => {
      volumes[index].mute = true;
      samples[index].disconnect(effects[index]);
    });
  } else {
    buttonElement.classList.remove("grayscale");
    sliderElement.classList.remove("grayscale");
    const sliderValue = sliderValues[groupIndex];
    if (sliderValue > 0) {
      indices.forEach(index => {
        volumes[index].mute = false;
        samples[index].connect(effects[index]);
      });
    }
  }

  updateModulatePixelate();
}

let sliderValues = [0, 0, 0, 0, 0]; // All start at 0
let sliderSum = 0; 

function setGroupWet(groupIndex, value) {
  ensureAudioStarted(); 

  const wetValue = parseFloat(value); // 0–100
  sliderValues[groupIndex] = wetValue;
  sliderSum = sliderValues.reduce((a, b) => a + b, 0); // update global sum

  const normalizedWet = wetValue / 100;
  const indices = groupMap[groupIndex];
  
  // If slider is at 0, track is off
  if (wetValue === 0) {
    effectEnabled[groupIndex] = false;
    indices.forEach(index => {
      volumes[index].mute = true;
      samples[index].disconnect(effects[index]);
    });
  } else {
    effectEnabled[groupIndex] = true;
    indices.forEach(index => {
      volumes[index].mute = false;
      samples[index].connect(effects[index]);
      if ('wet' in effects[index]) {
        effects[index].wet.value = normalizedWet;
      }
    });
  }

  if (groupIndex === 1) {//snare
    updateSnarePattern(wetValue);
  }
  if (groupIndex === 2) { //tiwtiw
    updateTiwTiwPattern(wetValue);
  }
  if (groupIndex === 3) { //sweep
    updateSweepPattern(wetValue);
  }
  if (groupIndex === 4) { //bass
    updateBassPattern(wetValue);
  }
  
  updateModulatePixelate();
}

function updateSnarePattern(value) {
  const val = parseFloat(value);

  if (val < 20) {
    newPattern = snarePatternA;
  } else if (val < 60) {
    newPattern = snarePatternB;
  } else {
    newPattern = snarePatternC;
  }
  for (let i = 0; i < snareSequence.length; i++) {
    snareSequence[i] = newPattern[i];
  }
}

function updateTiwTiwPattern(value) {
  const val = parseFloat(value);
  let tiwtiwNew, fxNew, fx1New;

  if (val < 20) {
    tiwtiwNew = tiwtiwPatternA;
    fxNew = fxPatternA;
    fx1New = fx1PatternA;
  } else if (val < 60) {
    tiwtiwNew = tiwtiwPatternC;
    fxNew = fxPatternB;
    fx1New = fx1PatternA;
  } else {
    tiwtiwNew = tiwtiwPatternE;
    fxNew = fxPatternB;
    fx1New = fx1PatternB;
  }

  // Update tiwtiw sequence
  for (let i = 0; i < tiwtiwSequence.length; i++) {
    tiwtiwSequence[i] = tiwtiwNew[i];
  }

  // Update fx sequence
  for (let i = 0; i < fxSequence.length; i++) {
    fxSequence[i] = fxNew[i];
  }

  // Update fx sequence
  for (let i = 0; i < fx1Sequence.length; i++) {
    fx1Sequence[i] = fx1New[i];
  }
}

function updateSweepPattern(value) {
  const val = parseFloat(value);

  const newPattern = val < 20 ? sweepPatternA : sweepPatternB;
  for (let i = 0; i < sweepSequence.length; i++) {
    sweepSequence[i] = newPattern[i];
  }
}

function updateBassPattern(value) {
  const val = parseFloat(value);

  const newPattern = val < 20 ? bassPatternA : bassPatternB;
  for (let i = 0; i < bassSequence.length; i++) {
    bassSequence[i] = newPattern[i];
  }
}


const beatCount = sequences[0].length; // 256

// play all tracks at once
const sequence = new Tone.Sequence((time, index) => {
  for (let i = 0; i < samples.length; i++) {
    const beat = sequences[i][index];

    // for Tone.Player
    if (samples[i] instanceof Tone.Player && beat === 1) {
      samples[i].start(time);
    }

    // for Tone.Sampler
    if (i == 9){
      samples[i].triggerAttackRelease(beat, "16n", time);
    }
    else if (samples[i] instanceof Tone.Sampler && typeof beat === "string") {
      samples[i].triggerAttackRelease(beat, "1n", time);
    }
  }
}, [...Array(beatCount).keys()], "16n");

function startSequence() {
    sequence.start(1);
    Tone.Transport.bpm.value = 140; 
    Tone.Transport.start();
}

const meter = new Tone.Meter({ channels: 1 });
Tone.Destination.connect(meter);

function logMasterVolume() {
  const level = meter.getValue(); // typically between -100 and 0 dB
  const norm = Tone.gainToDb(1); // 0 dB

  // Convert level to a usable 0-1 scale (clip at -60dB to 0)
  const scaled = Math.max(-60, level); // Prevent very low values from distorting
  pixelStrength = (scaled + 60) / 60; // Maps [-60, 0] → [0, 1]

  requestAnimationFrame(logMasterVolume);
}

function updateColoramaStrength() {
  // Assuming 5 sliders, max value = 500
  coloramaStrength = sliderSum / 500; // normalize to [0, 1]
  requestAnimationFrame(updateColoramaStrength);
}
updateColoramaStrength();


let myCanvas = document.getElementById("my-canvas");
    
var hydra = new Hydra({
        canvas: myCanvas,
        detectAudio: false,
        enableStreamCapture: false,
        pb: undefined
      });

const philData = [0.01, 0.01, 1, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 1, 1, 2, 1, 3, 4, 4, 4, 6, 7, 10, 12, 10, 11, 10, 12, 11, 15, 16, 19, 18, 19, 24, 19, 19, 18, 17, 18, 18, 20, 24, 22, 23, 23, 27, 23, 21, 22, 23, 23, 25, 29, 29, 28, 38, 34, 47, 66, 84, 82, 62, 47, 39, 34, 30, 31, 30, 30, 37, 33, 32, 32, 33, 27, 31, 32, 35, 32, 32, 35, 50, 42, 38, 36, 34, 33, 34, 32, 31, 31, 31, 31, 36, 32, 32, 33, 45, 50, 39, 33, 31, 33, 37, 34, 42, 34, 31, 31, 32, 34, 36, 31, 19, 19, 20, 51, 100, 75, 56, 53, 51, 48, 39, 33, 35, 34, 39, 39, 71, 45, 41, 39, 40, 87, 61, 51, 60, 60, 56, 55, 75, 51, 41, 38, 31, 31, 36, 32, 33, 32, 29, 32, 60, 39, 27, 26, 23, 24, 22, 26, 28, 25, 26, 30, 67, 46, 38, 29, 32, 32, 28, 28, 27, 29, 30, 33, 69, 34, 25, 26, 28, 28, 30, 28, 28, 28, 31, 30, 67, 41, 35, 41, 65, 75, 62, 50, 50, 51, 46, 45, 82, 45, 39, 48, 50, 50, 48 ];

const usData = [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 4, 4, 5, 5, 4, 0.01, 4, 4, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 7, 0.01, 6, 10, 7, 9, 7, 4, 6, 7, 5, 4, 5, 4, 6, 8, 7, 0.01, 0.01, 4, 0.01, 0.01, 0.01, 6, 0.01, 6, 8, 7, 6, 0.01, 0.01, 8, 0.01, 0.01, 0.01, 0.01, 0.01, 6, 6, 9, 9, 0.01, 0.01, 7, 0.01, 0.01, 0.01, 0.01, 9, 9, 7, 0.01, 0.01, 0.01, 0.01, 7, 0.01, 9, 5, 4, 4, 14, 16, 16, 12, 13, 13, 14, 11, 8, 8, 9, 8, 8, 11, 10, 10, 9, 9, 21, 11, 13, 17, 16, 16, 14, 26, 18, 14, 13, 12, 12, 10, 10, 11, 10, 11, 12, 13, 14, 11, 10, 13, 12, 11, 10, 11, 12, 10, 12, 12, 13, 10, 12, 10, 7, 7, 7, 7, 8, 7, 7, 8, 9, 7, 24, 81, 100, 28, 9, 9, 8, 8, 9, 12, 11, 10, 11, 14, 14, 17, 41, 51, 45, 27, 24, 15, 15, 15, 16, 14, 13, 12 ];

const date = ["January 2008","February 2008","March 2008","April 2008","May 2008","June 2008","July 2008","August 2008","September 2008","October 2008","November 2008","December 2008",
"January 2009","February 2009","March 2009","April 2009","May 2009","June 2009","July 2009","August 2009","September 2009","October 2009","November 2009","December 2009",
"January 2010","February 2010","March 2010","April 2010","May 2010","June 2010","July 2010","August 2010","September 2010","October 2010","November 2010","December 2010",
"January 2011","February 2011","March 2011","April 2011","May 2011","June 2011","July 2011","August 2011","September 2011","October 2011","November 2011","December 2011",
"January 2012","February 2012","March 2012","April 2012","May 2012","June 2012","July 2012","August 2012","September 2012","October 2012","November 2012","December 2012",
"January 2013","February 2013","March 2013","April 2013","May 2013","June 2013","July 2013","August 2013","September 2013","October 2013","November 2013","December 2013",
"January 2014","February 2014","March 2014","April 2014","May 2014","June 2014","July 2014","August 2014","September 2014","October 2014","November 2014","December 2014",
"January 2015","February 2015","March 2015","April 2015","May 2015","June 2015","July 2015","August 2015","September 2015","October 2015","November 2015","December 2015",
"January 2016","February 2016","March 2016","April 2016","May 2016","June 2016","July 2016","August 2016","September 2016","October 2016","November 2016","December 2016",
"January 2017","February 2017","March 2017","April 2017","May 2017","June 2017","July 2017","August 2017","September 2017","October 2017","November 2017","December 2017",
"January 2018","February 2018","March 2018","April 2018","May 2018","June 2018","July 2018","August 2018","September 2018","October 2018","November 2018","December 2018",
"January 2019","February 2019","March 2019","April 2019","May 2019","June 2019","July 2019","August 2019","September 2019","October 2019","November 2019","December 2019",
"January 2020","February 2020","March 2020","April 2020","May 2020","June 2020","July 2020","August 2020","September 2020","October 2020","November 2020","December 2020",
"January 2021","February 2021","March 2021","April 2021","May 2021","June 2021","July 2021","August 2021","September 2021","October 2021","November 2021","December 2021",
"January 2022","February 2022","March 2022","April 2022","May 2022","June 2022","July 2022","August 2022","September 2022","October 2022","November 2022","December 2022",
"January 2023","February 2023","March 2023","April 2023","May 2023","June 2023","July 2023","August 2023","September 2023","October 2023","November 2023","December 2023",
"January 2024","February 2024","March 2024","April 2024","May 2024","June 2024","July 2024","August 2024","September 2024","October 2024","November 2024","December 2024",
"January 2025","February 2025","March 2025","April 2025","May 2025","June 2025"]

bpm = 140

shape(12, 0.01, 0.001)
  .luma()
  .scale(philData.smooth())
  .color(1, 10, 30)
  .colorama(() => coloramaStrength)
  .layer(
    shape(12, 0.01, 0.001)
      .luma()
      .scale(usData.smooth())
      .color(1, 10, 1)
      .colorama(() => coloramaStrength)
  )
  .out(o1)

  function updateModulatePixelate() {
    const activeCount = effectEnabled.filter(v => v).length;
    let srcPatch = src(o1);
  
    if (activeCount >= 2) {
      const scaleValue = {
        2: 10000,
        3: 1100,
        4: 350,
        5: 100
      }[activeCount] || 10000;
  
      srcPatch = srcPatch.modulatePixelate(noise(25, 0.5), scaleValue);
    }
  
    if (activeCount >= 1) {
      srcPatch = srcPatch.modulatePixelate(noise(3).pixelate(8, 8), 1024, 8);
    }
  
    srcPatch.out();
  }
  
updateModulatePixelate();


function displaySyncedDate() {
  const bpm = 140;
  const beatsPerSecond = bpm / 60;
  const totalFrames = date.length;

  // Use Hydra's global `time` to calculate index
  const index = Math.floor(time * beatsPerSecond) % totalFrames;

  // Display the current date in an HTML element
  document.getElementById("date-display").innerText = date[index];

  requestAnimationFrame(displaySyncedDate);
}

displaySyncedDate();

document.getElementById("about-button").onclick = () => {
  const aboutBox = document.getElementById("about-box");
  aboutBox.classList.toggle("hidden"); // toggle open/close
};

document.getElementById("close-about").onclick = () => {
  document.getElementById("about-box").classList.add("hidden");
};

// function openFullscreen() {
//   const elem = document.documentElement; // this is the whole page

//   if (elem.requestFullscreen) {
//     elem.requestFullscreen();
//   } else if (elem.webkitRequestFullscreen) { // Safari
//     elem.webkitRequestFullscreen();
//   } else if (elem.msRequestFullscreen) { // IE11
//     elem.msRequestFullscreen();
//   }
// }

document.querySelectorAll('input[type="range"]').forEach(slider => {
  function updateBackground(el) {
    const val = (el.value - el.min) / (el.max - el.min) * 100;
    el.style.background = `linear-gradient(to right, #2196f3 ${val}%, #ccc ${val}%)`;
  }

  updateBackground(slider); // initialize on load

  slider.addEventListener('input', () => {
    updateBackground(slider);
  });
});

// Initialize all buttons and sliders - set defaults for snare and bass
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[onclick^="toggleTrack"]');
  buttons.forEach((button, index) => {
    const slider = button.nextElementSibling;
    const defaultValue = sliderValues[index];
    
    if (defaultValue === 0) {
      button.classList.add("grayscale");
      if (slider) slider.classList.add("grayscale");
    } else {
      // Set slider value and update visual state only (no audio yet)
      if (slider) {
        slider.value = defaultValue;
        // Manually update slider background for default values
        const min = parseFloat(slider.min) || 0;
        const max = parseFloat(slider.max) || 100;
        const val = parseFloat(slider.value) || 0;
        const percentage = ((val - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #2196f3 ${percentage}%, #ccc ${percentage}%)`;
        // Don't call setGroupWet here - wait until audio starts
      }
    }
  });
});