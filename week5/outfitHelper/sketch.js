// Eva Philips 
// April 26, 2019
// Machine Learing for the Web Final Project:  This project allows the user to say what they are wearing.  The project will consider what the user is wearing and the weather and recommend any necessary changes to their outfit.
// References:

// API variables
let lat;
let long;
let url;
let temp;
let percip;

// DOM variables
let tempP;
let rainP;

// record button variables
let buttonR = 80;
let buttonCol = [255, 0, 0];
let buttonSymbol;
let recording = false;

// instructions variables
let instructions;

// load API information before starting sketch
function preload(){
    //get the geolocation of the user and set lat and long to that location
    getLocation();
    // console.log("lat: ", lat)
    // console.log("long: ", long)

    if(lat != undefined && long != undefined){
        // get url
        let apiKey = "be0c387113f6abafa53de22a568688df"
        url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
        // load json
        loadJSON(url, checkData);
    }else{
        setTimeout(()=>{preload()}, 5000);
        
    }

    // get record button symbol
    buttonSymbol = loadImage("record.svg")
}

function setup(){
    // setup canvas
    let cvs = createCanvas(500, 500);
    background(0);
    cvs.center('horizontal');

    // setup instructions
    instructions = createP("click on the mic<br>and say what you are wearing...")
    instructions.style('color', '#ffffff')
    instructions.style('font-size', '20px')
    instructions.style('text-align', 'center')
    instructions.center('horizontal')

}

function draw(){
    background(0)
    // draw record button
    if(!recording){
        fill(255);
        ellipse(width/2, height/2, buttonR);
        imageMode(CENTER);
        image(buttonSymbol, width/2, height/2, buttonR/2, buttonR/2);
    }else if(recording){
        fill(buttonCol[0], buttonCol[1], buttonCol[2])
        ellipse(width/2, height/2, buttonR);
        image(buttonSymbol, width/2, height/2, buttonR/2, buttonR/2);
    }
    
}

// when record button is pressed
function mousePressed(){
    let d = dist(width/2, height/2, mouseX, mouseY)
    if(d< buttonR){
        buttonR = buttonR - 10
    }
}

function mouseReleased(){
    buttonR = 80;
    recording = true;
    
}



// load json callback
function checkData(rawData){
    console.log(rawData)
    temp = rawData.main.temp // in K
    temp = (temp - 273.15) * (9/5) + 32 // in F
    temp = int(temp)
    percip = rawData.weather[0].main
    // console.log(temp)
    // console.log(percip)
    // set the temp and rain paragraphs
    tempP = createP("It is currently " + temp + " degrees fahrenheit outside")
    if(percip == "Rain"){
        rainP = createP("and raining")
    }
}

// get geolocation of the user
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.")
    }
}
function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    // console.log(lat,long)
}