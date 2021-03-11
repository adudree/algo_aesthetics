// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Random_Seed: 0,
}
gui.add(params, "Random_Seed", 0, 100, 1)
// -------------------
//       Drawing
// -------------------
let whiteShape : p5.Image;
let blackShape : p5.Image; 

function defineOtherShape(shapeRef) {
    let invertedColorShape;
    if (shapeRef == whiteShape) {
        invertedColorShape = blackShape;
     }
     else {
        invertedColorShape = whiteShape; 
     }

    return invertedColorShape;
}

function bigSquare(size, shapeRef, x, y)
{
    let otherShape = defineOtherShape(shapeRef);
    
    for (let i=0; i<2 ; i++) {
        for (let j = 0; j < 2; j++) {

            if( i == 0 && j == 0) {
                image(shapeRef, i*size + x, j*size + y, size, size);
            }
            
            else {
                push();
                    imageMode(CENTER);
                    translate(x + i*size + size/2, y + j*size + size/2);

                    if(i == 1 && j == 0) {
                        rotate(PI);
                    }
                    else if(i == 0 && j == 1) {
                        scale(-1.0, 1.0);
                        rotate(PI);
                    }
                    else {
                        scale(-1.0, 1.0);
                        rotate(3*PI/2);
                    }
                    image(otherShape, 0, 0, size, size);
                pop();
            
            }
        }
    }
}

function rotateBigSquare(angle) {
    rotate(angle);
    bigSquare(width/4, whiteShape, 0, 0);
}

function draw() {
    randomSeed(params.Random_Seed);
    background(200);

    push();
        translate(0, 0);
        rotate(0);
        bigSquare(width/4, whiteShape, 0, 0);
    pop();

    push();
        translate(width, 0);
        rotate(PI/2);
        bigSquare(width/4, blackShape, 0, 0);
    pop();

    push();
        translate(0, height);
        rotate(3*PI/2);
        bigSquare(width/4, blackShape, 0, 0);
    pop();

    push();
        translate(width, height);
        rotate(PI);
        bigSquare(width/4, whiteShape, 0, 0);
    pop();

}
// -------------------
//    Initialization
// -------------------

function preload() {
    whiteShape = loadImage("../src/oneWhiteShape.png");
    blackShape = loadImage("../src/oneBlackShape.png");
}

function setup() {
    p6_CreateCanvas();
}

function windowResized() {
    p6_ResizeCanvas()
}