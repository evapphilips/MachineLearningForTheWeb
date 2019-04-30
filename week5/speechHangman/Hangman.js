// defining the class Hangman

class Hangman {
    constructor(width, height){
        this.width = width; // width of hangman canvas
        this.height = height; // height of hangman canvas
        this.r = 40; // size of head
    }

    displayCanvas(){
        // draw hangman background
        noStroke();
        fill(0);
        rect(0, 0, this.width, this.height);

        stroke(255);
        strokeWeight(4);
        noFill();
        // link 1
        line(this.width/5, 4*this.height/5, 4*this.width/5, 4*this.height/5);
        // link 2
        line(4*this.width/6, 4*this.height/5, 4*this.width/6, this.height/5);
        // link 3
        line(4*this.width/6, this.height/5, 2*this.width/6, this.height/5);
        // link 4
        line(2*this.width/6, this.height/5, 2*this.width/6, 2*this.height/8);
    }

    displayHead(){
        stroke(255);
        strokeWeight(4);
        noFill();
        // head
        ellipse(2*this.width/6, 2*this.height/8 + this.r/2, this.r);
    }

    displayCore(){
        stroke(255);
        strokeWeight(4);
        noFill();
        // core
        line(2*this.width/6, 2*this.height/8 + this.r, 2*this.width/6, this.height/2);
    }

    displayRightArm(){
        stroke(255);
        strokeWeight(4);
        noFill();
        // right arm
        line(2*this.width/6, 7*this.height/16, 5*this.width/12, 3*this.height/8);
    }

    displayLeftArm(){
        stroke(255);
        strokeWeight(4);
        noFill();
        // left arm
        line(2*this.width/6, 7*this.height/16, 3*this.width/12, 3*this.height/8);
    }

    displayRightLeg(){
        stroke(255);
        strokeWeight(4);
        noFill();
        // right leg
        line(2*this.width/6, this.height/2, 5*this.width/12, 5*this.height/8);
    }

    displayLeftLeg(){
        stroke(255);
        strokeWeight(4);
        noFill();
        // left leg
        line(2*this.width/6, this.height/2, 3*this.width/12, 5*this.height/8);
    }
    

}