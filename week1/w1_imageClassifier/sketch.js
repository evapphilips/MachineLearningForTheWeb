// Eva Philips
// March 27, 2019
// Machine Learning for the Web Week 1: Image Classifier

// classifier variables
let video;
let classifier;

// DOM variables
let toothbrushLabel;
let toothPasteLabel;
let waterLabel;


function setup(){
    //create list on right side of the screen
    toothbrushLabel = createDiv("Toothbrush")
    toothbrushLabel.class('object')
    toothpasteLabel = createDiv("Toothpaste")
    toothpasteLabel.class('object')
    waterLabel = createDiv("Drink Water")
    waterLabel.class('object')

    // canvas setup
    // createCanvas(600, 400);
    // background(0);
     noCanvas();

    // Create a camera input
    video = createCapture(VIDEO);
    video.hide();

    // // setup classifier
    classifier = ml5.imageClassifier('MobileNet', video, modelReady)  // have the mobile next model act continuously on the video

    

}

function draw(){
    // draw the video to the canvas
    image(video, 0, 0);
}

// when the model is loaded complete these tasks
function modelReady(){
    console.log('our model is ready')
    classifier.predict(gotResult);
}

// when you get a reult complete these tasks
function gotResult(err, results){
    if(results){
        // print results
        //console.log('results: ', results);
        //console.log(results[0].className)
        // set object to the result
        let object = results[0].className
        // check again getting ready for bed chacklist
        if(object === "paintbrush"){
            toothbrushLabel.class('objectCheck')
        }else if(object === "pill bottle"){
            toothpasteLabel.class('objectCheck')
        }else if(object === "measuring cup"){
            waterLabel.class('objectCheck')
        }
        // continue to predict
        classifier.predict(gotResult);
    }else{
        // print error
        console.log(err);
    }
}