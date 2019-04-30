// Eva Philips
// April 13, 2019
// Machine Learning for the Web Week 3: Speech hangman with teachable machine

// variables defning hangman section
let hangmanWidth = 400;
let hangmanHeight = 400;
let hangman;

// variables defining game parameters
let amountWrong = 0; // keeps track of how many wrong guesses were made

// variables defining word section
let spacing = 5;
let wordHeight = 100;
let word = ['c', 'a', 't'];


function setup(){
    // setup the canvas
    createCanvas(400, 600);

    // create a new hangman instance
    hangman = new Hangman(hangmanWidth, hangmanHeight);
}

function draw(){
    // setupcanvas
    background(220);
    hangman.displayCanvas(); // draw hangman backgrond

    // draw spaces for the word
    drawWordLines();

    // if there was an incorrect guess, draw more of the hangman
    drawHangman();
}



// if the down key is pressed, pretend there was an incorrect guess
function keyPressed(){
    if(keyCode == RIGHT_ARROW){
        amountWrong += 1;
    }
}

// if a letter was guessed, check if it was correct, if correct draw letters, else add to hangman
function keyTyped(){
    if(key == 'a'){
        for(let i=0; i<word.length; i++){
            if(word[i] == 'a'){
                console.log('a');
            }else{
                amountWrong += 1;
            }
        }
    }
}









// draw the hangman based on the number of incorrect guesses
function drawHangman(){
    if(amountWrong == 1){
        hangman.displayHead();
    }else if(amountWrong == 2){
        hangman.displayHead();
        hangman.displayCore();
    }else if(amountWrong == 3){
        hangman.displayHead();
        hangman.displayCore();
        hangman.displayRightArm();
    }else if(amountWrong == 4){
        hangman.displayHead();
        hangman.displayCore();
        hangman.displayRightArm();
        hangman.displayLeftArm();
    }else if(amountWrong == 5){
        hangman.displayHead();
        hangman.displayCore();
        hangman.displayRightArm();
        hangman.displayLeftArm();
        hangman.displayRightLeg();
    }else if(amountWrong == 6){
        hangman.displayHead();
        hangman.displayCore();
        hangman.displayRightArm();
        hangman.displayLeftArm();
        hangman.displayRightLeg();
        hangman.displayLeftLeg();
    }
}

function drawWordLines(){
    fill(0);
    rect(0, hangmanHeight + spacing, hangmanWidth, wordHeight); // draw word background
    for(let i=1; i<word.length+1; i++){
        stroke(255);
        strokeWeight(4);
        // draw lines for letters
        line(i*hangmanWidth/(word.length*2-1), hangmanHeight + spacing + 3*wordHeight/4, (i+1)*hangmanWidth/(word.length*2-1) - spacing, hangmanHeight + spacing + 3*wordHeight/4);
    }
}