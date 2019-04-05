// Eva Philips
// April 4, 2019
// Machine Learning for the Web Week 2: Teachable Machine

// variables
let video;
let showVideo = false;
let features;
let knn;
let labelP;
let ready = false;

// word variables
let wordArray = [];
let addLetter = false;

function setup(){
    // setup canvas
    createCanvas(600, 400);
    // setup video
    video = createCapture(VIDEO);
    video.hide();
    // setup machine learning method
    features = ml5.featureExtractor('MobileNet', modelReady);
    knn = ml5.KNNClassifier();
    // setup label
    labelP = createP('need training data');
    labelP.style('font-size', '32pt');

}

function draw(){
    // show and hide video
    if(showVideo){
        image(video, 0, 0, 600, 400);
    }else{
        video.hide();
        background(0);
    }

    // is the model ready
    if(!ready && knn.getNumClasses()>0){
        goClassify();
        ready = true;
    }

    // write word on the screen
    fill(255);
    textSize(60);
    let pos = 10;
    for(let i=0; i<wordArray.length; i++){
        text(wordArray[i], pos, height/2);
        pos += 50;
    }
    

}


function keyPressed(){
    // video show toggle
    if(keyCode === UP_ARROW){
        showVideo = true;
    }else if(keyCode === DOWN_ARROW){
        showVideo = false;
    }

    // add a letter to the word when space is pressed
    if(keyCode === ENTER){
        addLetter = true;
    }
}

// add image to the model under proper category
function keyTyped(){
    
    const logits = features.infer(video);
    if(key == 'h'){
        knn.addExample(logits, "H");
    }else if(key == 'e'){
        knn.addExample(logits, "E");
    }else if(key == 'l'){
        knn.addExample(logits, "L");
    }else if(key == 'o'){
        knn.addExample(logits, "O");
    }
}



// the model is ready
function modelReady(){
    console.log('The model is ready')
}

// got results
function gotResult(err, result){
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
    
}

// start classifying
function goClassify(){
    const logits = features.infer(video);
    knn.classify(logits, function(err, result){
        if(err){
            console.log(err);
        }else{
            label = result.label;
            labelP.html(result.label);
            if(addLetter){
                wordArray.push(result.label);
                addLetter = false;
            }
            
            goClassify();
        }
    });
}