let pixelStrength = 0.00001;
let coloramaStrength = 0;

const buttonStart = document.getElementById("start-button");

function startTone() {
    buttonStart.disabled = "true";
	Tone.start().then(() => { 
        console.log("audio is ready"); 
        buttonStart.style.display = "none";
        startSequence();
        logMasterVolume();
    }).catch((error) => { 
        console.log("audio not ready"); 
        buttonStart.disabled = "false"; 
    });
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
// one Tone.Volume for each track
const volumes = Array.from({ length: seqLen }, () => new Tone.Volume(0).toDestination());

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

const effectEnabled = Array(groupMap.length).fill(true); // tracks if effect is connected

function toggleTrack(groupIndex, buttonElement) {
  const indices = groupMap[groupIndex];
  effectEnabled[groupIndex] = !effectEnabled[groupIndex];

  // Find the slider next to the button
  const sliderElement = buttonElement.nextElementSibling;

  // Apply or remove the grayscale class
  if (!effectEnabled[groupIndex]) {
    buttonElement.classList.add("grayscale");
    sliderElement.classList.add("grayscale");
  } else {
    buttonElement.classList.remove("grayscale");
    sliderElement.classList.remove("grayscale");
  }

  // Mute/unmute and connect/disconnect effects
  indices.forEach(index => {
    const volume = volumes[index];
    const sample = samples[index];
    const effect = effects[index];

    volume.mute = !volume.mute;

    if (effectEnabled[groupIndex]) {
      sample.connect(effect);
    } else {
      sample.disconnect(effect);
    }
  });

  updateModulatePixelate();
}

let sliderValues = Array(groupMap.length).fill(0); // Store each group's wet value (0–100)
let sliderSum = 0; // The total sum of slider values

function setGroupWet(groupIndex, value) {
  const wetValue = parseFloat(value); // 0–100
  sliderValues[groupIndex] = wetValue;
  sliderSum = sliderValues.reduce((a, b) => a + b, 0); // update global sum

  const normalizedWet = wetValue / 100;
  groupMap[groupIndex].forEach(index => {
    if ('wet' in effects[index]) {
      effects[index].wet.value = normalizedWet;
    }
  });

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

const date = ["01/2008","02/2008","03/2008","04/2008","05/2008","06/2008","07/2008","08/2008","09/2008","10/2008","11/2008","12/2008", "01/2009","02/2009","03/2009","04/2009","05/2009","06/2009","07/2009","08/2009","09/2009","10/2009","11/2009","12/2009","01/2010","02/2010","03/2010","04/2010","05/2010","06/2010","07/2010","08/2010","09/2010","10/2010","11/2010","12/2010","01/2011","02/2011","03/2011","04/2011","05/2011","06/2011","07/2011","08/2011","09/2011","10/2011","11/2011","12/2011","01/2012","02/2012","03/2012","04/2012","05/2012","06/2012","07/2012","08/2012","09/2012","10/2012","11/2012","12/2012","01/2013","02/2013","03/2013","04/2013","05/2013","06/2013","07/2013","08/2013","09/2013","10/2013","11/2013","12/2013","01/2014","02/2014","03/2014","04/2014","05/2014","06/2014","07/2014","08/2014","09/2014","10/2014","11/2014","12/2014","01/2015","02/2015","03/2015","04/2015","05/2015","06/2015","07/2015","08/2015","09/2015","10/2015","11/2015","12/2015","01/2016","02/2016","03/2016","04/2016","05/2016","06/2016","07/2016","08/2016","09/2016","10/2016","11/2016","12/2016","01/2017","02/2017","03/2017","04/2017","05/2017","06/2017","07/2017","08/2017","09/2017","10/2017","11/2017","12/2017","01/2018","02/2018","03/2018","04/2018","05/2018","06/2018","07/2018","08/2018","09/2018","10/2018","11/2018","12/2018","01/2019","02/2019","03/2019","04/2019","05/2019","06/2019","07/2019","08/2019","09/2019","10/2019","11/2019","12/2019","01/2020","02/2020","03/2020","04/2020","05/2020","06/2020","07/2020","08/2020","09/2020","10/2020","11/2020","12/2020","01/2021","02/2021","03/2021","04/2021","05/2021","06/2021","07/2021","08/2021","09/2021","10/2021","11/2021","12/2021","01/2022","02/2022","03/2022","04/2022","05/2022","06/2022","07/2022","08/2022","09/2022","10/2022","11/2022","12/2022","01/2023","02/2023","03/2023","04/2023","05/2023","06/2023","07/2023","08/2023","09/2023","10/2023","11/2023","12/2023","01/2024","02/2024","03/2024","04/2024","05/2024","06/2024","07/2024","08/2024","09/2024","10/2024","11/2024","12/2024","01/2025","02/2025","03/2025","04/2025","05/2025","06/2025"]

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

document.getElementById("start-screen").addEventListener("click", () => {
  // Request fullscreen mode
  // openFullscreen();

  // Hide start screen
  document.getElementById("start-screen").style.display = "none";

  // Show the Hydra canvas
  document.getElementById("my-canvas").style.display = "block";

  // Start audio + visuals
  startTone();
});

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
