// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    N: 4,
    Download_Image: () => save(),
}

gui.add(params, "N", 4, 40, 4)
gui.add(params, "Download_Image")
// -------------------
//       Drawing
// -------------------
let whiteShape : p5.Image;
let blackShape : p5.Image; 
let shapeA, shapeB;

const nbMiniSquare = params.N;

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

function bigSquare(size, shapeRef)
{
    let otherShape = defineOtherShape(shapeRef);
    
    for (let i=0; i<2 ; i++) {
        for (let j = 0; j < 2; j++) {

            if( i == 0 && j == 0) {
                image(shapeRef, i*size, j*size, size, size);
            }
            
            else {
                push();
                    imageMode(CENTER);
                    translate(i*size + size/2, j*size + size/2);

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

function drawBigSquare(translateX, translateY, angle, colorShape, posX, posY) {
    const size = 2*width/params.N;
    const newWidth = 2*size;

    push();
        translate((posX + translateX)*newWidth, (posY + translateY)*newWidth);
        rotate(angle);
        bigSquare(width/params.N, colorShape);
    pop();
}

function drawMegaSquare(posX, posY) { 
    drawBigSquare(0, 0, 0, shapeA, posX, posY);
    drawBigSquare(1, 0, PI/2, shapeB, posX, posY);
    drawBigSquare(0, 1, 3*PI/2, shapeB, posX, posY);
    drawBigSquare(1, 1, PI, shapeA, posX, posY);
}

function draw() {
    background(200);
    const n = params.N/4;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            drawMegaSquare(i, j);
        }
    }
}

// -------------------
//    Initialization
// -------------------

function preload() {
    whiteShape = loadImage('./oneWhiteShape.png');
    blackShape = loadImage('./oneBlackShape.png');
}

function mousePressed() {
    shapeA = defineOtherShape(shapeA);
    shapeB = defineOtherShape(shapeB);
}  

function setup() {
    p6_CreateCanvas();
    shapeA = whiteShape;
    shapeB = blackShape;
}

function windowResized() {
    p6_ResizeCanvas()
}