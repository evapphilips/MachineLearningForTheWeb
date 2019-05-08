// Eva Philips
// May 3, 2019
// Machine Learning for the Web Final Project: Speech Hangman
// References: This code uses the Google Creative Labs Teachable Machine audio classifier.


// voice training setup
const modelJson = 'https://storage.googleapis.com/tm-speech-commands/EvaP_SH_5/model.json';
const metadataJson = 'https://storage.googleapis.com/tm-speech-commands/EvaP_SH_5/metadata.json';

const recognizer = speechCommands.create(
    'BROWSER_FFT',
    undefined,
    modelJson,
    metadataJson
  );
  
  loadMyModel();
  let spokenLetter = "";


// DOM variables
let cvs; 
let resetButton;
let waitLabel;

// drawing hangman variables
let hangman; 
let numWrong = 0;


// alphabet and word variables
let alph = [];
let currentWord;
let wordArray = [];
let guessed = [];
let playing = true;

let listWords;
let indexWords;


function setup(){
    // reset array variables
    alph = [];
    wordArray = [];
    guessed = [];
    numWrong = 0;
    playing = true;


    // setup canvas
    cvs = createCanvas(400, 550);
    cvs.center('horizontal');
    //background(220);

    // create new hangman instance
    hangman = new Hangman(400, 400);
    
    // create alphabet array
    for(let i=65; i<91; i++){
        alph.push(char(i));
    }

    // setup word array
    let listWords = ["hey", "wow", "wednesday", "yes", "crazy", "fun"];
    currentWord = listWords[floor(random(0, listWords.length))];
    //currentWord = "hey"
    for(let j=0; j<currentWord.length; j++){
        wordArray.push("_")
    }

    // setup guess array
    for(let m=0; m<26; m++){
        guessed.push(false)
    }

    // setup reset button
    resetButton = createButton("RESET");
    resetButton.position(windowWidth/2 - resetButton.width/2,100)
    resetButton.mousePressed(resetButtonPressed)

    // setup wait label
    waitLabel = createP("please wait for the model to load")
    waitLabel.style("background-color", "rgb(255,114,92)")
    waitLabel.style("padding", "50px")
    waitLabel.style("font-size", "30pt")
    waitLabel.center();

}

function draw(){
    // draw the hangman canvas
    hangman.displayCanvas();

    if(playing){
        let guessCorrect = false;
        for(let k=0; k<currentWord.length; k++){
            if(spokenLetter === currentWord[k]){
                guessCorrect = true;
                break
            }else{
                guessCorrect = false;
            }
        }

        if(guessCorrect){
            for(let k=0; k<currentWord.length; k++){
                if(spokenLetter === currentWord[k]){
                    console.log(spokenLetter)
                    wordArray[k] = currentWord[k];
                    //spokenLetter = ""
                }
            }
        } else if(!guessCorrect){
            for(let m=0; m<alph.length; m++){
                if(spokenLetter.toUpperCase() === alph[m]){
                    guessed[m] = true;
                    //spokenLetter = ""
                }
            }
        }
    }

    // when key is pressed 
    if(keyIsPressed){
        if(playing){
            let guessCorrect = false;

        for(let k=0; k<currentWord.length; k++){
            if(key === currentWord[k]){
                guessCorrect = true;
                break
            }else{
                guessCorrect = false;
            }
        }

        if(guessCorrect){
            for(let k=0; k<currentWord.length; k++){
                if(key === currentWord[k]){
                    console.log(key)
                    wordArray[k] = currentWord[k];
                    keyIsPressed = false
                }
            }
        } else if(!guessCorrect){
            for(let m=0; m<alph.length; m++){
                if(key.toUpperCase() === alph[m]){
                    guessed[m] = true;
                    keyIsPressed = false
                }
            }
        }
        }
    }


    // draw the word section
    noStroke()
    rect(0, 350, 400, 100);
    let word = join(wordArray, " ")
    noStroke();
    fill(0)
    let tsize;
    if(wordArray.length<8){
        tsize = 50;
    }else{
        tsize = 25;
    }
    textSize(tsize);
    let posX = (width-((wordArray.length*(tsize/1.15)) + (wordArray.length-1 * (2))))/2
    text(word, posX, 410);
    
    // draw the alphabet
    let gap = (width-20)/13 ;
    let counter = 0;
    for (let y = 500; y < 580 - gap; y += gap) {
        for (let x = 12; x < width - gap; x += gap) {
            noStroke();
            textSize(20)
            if(guessed[counter]){
            fill(255,114,92);
        }else{
            fill(0);
        }
        text(alph[counter], x, y);
        counter ++
        }
    }

    // count how many wrong and draw man
    numWrong = 0;
    for(s=0; s<guessed.length; s++){
        if(guessed[s]){
            numWrong += 1;
        }
    }

   if(numWrong == 1){
        hangman.displayHead()
    }else if(numWrong == 2){
        hangman.displayHead();
        hangman.displayCore();
    }else if(numWrong == 3){
        hangman.displayHead();
        hangman.displayCore();
        hangman.displayRightArm();
    }else if(numWrong == 4){
        hangman.displayHead();
        hangman.displayCore();
        hangman.displayRightArm();
        hangman.displayLeftArm();
    }else if(numWrong == 5){
        hangman.displayHead();
        hangman.displayCore();
        hangman.displayRightArm();
        hangman.displayLeftArm();
        hangman.displayRightLeg();
    }else if(numWrong == 6){
        hangman.displayHead();
        hangman.displayCore();
        hangman.displayRightArm();
        hangman.displayLeftArm();
        hangman.displayRightLeg();
        hangman.displayLeftLeg();
        //console.log("GAME OVER")

        // game over
        playing = false;
        fill(255,114,92);
        noStroke();
        rect(0, 350, width, 200);
        fill(0);
        textSize(50);
        text("GAME OVER", 50, 400);
    }

}

// if reset button is pressed, start over
function resetButtonPressed(){
    setup();
    waitLabel.hide();
}

async function loadMyModel() {
    // Make sure that the underlying model and metadata are loaded via HTTPS
    // requests.
    await recognizer.ensureModelLoaded();
  
    // See the array of words that the recognizer is trained to recognize.
    console.log(recognizer.wordLabels());

    // hide wait label
    waitLabel.hide();
  
    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields such a
    //    - includeSpectrogram
    //    - probabilityThreshold
    //    - includeEmbedding
    recognizer.listen(result => {
      showResult(result);
      // - result.scores contains the probability scores that correspond to
      //   recognizer.wordLabels().
      // - result.spectrogram contains the spectrogram of the recognized word.
    }, {
      includeSpectrogram: true,
      probabilityThreshold: 0.55
    });
  
    // Stop the recognition in 10 seconds.
    // setTimeout(() => recognizer.stopListening(), 10e3);
  }
  
  function showResult(result) {
  // console.log('result: ', result);
  //   console.log('result.scores[0]', result.scores[0])
  //   console.log('result.scores[1]', result.scores[1])
  //   console.log('result.scores[2]', result.scores[2])
  // change the mood variable is the word happy is deteccted
//   if(result.scores[0]> 0.60){  // "Happy"
//       mood = 0;
//       console.log('happy')
//   }

for(let i=0; i<result.scores.length; i++){
    if(result.scores[i] > 0.60){
        console.log(recognizer.wordLabels()[i])
        spokenLetter = recognizer.wordLabels()[i]
    }
}
}