var gui = new dat.GUI();
var params = {
    Random_Seed: 0,
};
gui.add(params, "Random_Seed", 0, 100, 1);
var whiteShape;
var blackShape;
function defineOtherShape(shapeRef) {
    var invertedColorShape;
    if (shapeRef == whiteShape) {
        invertedColorShape = blackShape;
    }
    else {
        invertedColorShape = whiteShape;
    }
    return invertedColorShape;
}
function bigSquare(size, shapeRef, x, y) {
    var otherShape = defineOtherShape(shapeRef);
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            if (i == 0 && j == 0) {
                image(shapeRef, i * size + x, j * size + y, size, size);
            }
            else {
                push();
                imageMode(CENTER);
                translate(x + i * size + size / 2, y + j * size + size / 2);
                if (i == 1 && j == 0) {
                    rotate(PI);
                }
                else if (i == 0 && j == 1) {
                    scale(-1.0, 1.0);
                    rotate(PI);
                }
                else {
                    scale(-1.0, 1.0);
                    rotate(3 * PI / 2);
                }
                image(otherShape, 0, 0, size, size);
                pop();
            }
        }
    }
}
function rotateBigSquare(angle) {
    rotate(angle);
    bigSquare(width / 4, whiteShape, 0, 0);
}
function draw() {
    randomSeed(params.Random_Seed);
    background(200);
    push();
    translate(0, 0);
    rotate(0);
    bigSquare(width / 4, whiteShape, 0, 0);
    pop();
    push();
    translate(width, 0);
    rotate(PI / 2);
    bigSquare(width / 4, blackShape, 0, 0);
    pop();
    push();
    translate(0, height);
    rotate(3 * PI / 2);
    bigSquare(width / 4, blackShape, 0, 0);
    pop();
    push();
    translate(width, height);
    rotate(PI);
    bigSquare(width / 4, whiteShape, 0, 0);
    pop();
}
function preload() {
    whiteShape = loadImage("../src/oneWhiteShape.png");
    blackShape = loadImage("../src/oneBlackShape.png");
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map