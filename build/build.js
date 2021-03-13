var gui = new dat.GUI();
var params = {
    N: 8,
    Download_Image: function () { return save(); },
};
gui.add(params, "N", 4, 40, 4);
gui.add(params, "Download_Image");
var whiteShape;
var blackShape;
var shapeA, shapeB;
var nbMiniSquare = params.N;
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
function bigSquare(size, shapeRef) {
    var otherShape = defineOtherShape(shapeRef);
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            if (i == 0 && j == 0) {
                image(shapeRef, i * size, j * size, size, size);
            }
            else {
                push();
                imageMode(CENTER);
                translate(i * size + size / 2, j * size + size / 2);
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
function drawBigSquare(translateX, translateY, angle, colorShape, posX, posY) {
    var size = 2 * width / params.N;
    var newWidth = 2 * size;
    push();
    translate((posX + translateX) * newWidth, (posY + translateY) * newWidth);
    rotate(angle);
    bigSquare(width / params.N, colorShape);
    pop();
}
function drawMegaSquare(posX, posY) {
    drawBigSquare(0, 0, 0, shapeA, posX, posY);
    drawBigSquare(1, 0, PI / 2, shapeB, posX, posY);
    drawBigSquare(0, 1, 3 * PI / 2, shapeB, posX, posY);
    drawBigSquare(1, 1, PI, shapeA, posX, posY);
}
function draw() {
    background(200);
    var n = params.N / 4;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            drawMegaSquare(i, j);
        }
    }
}
function preload() {
    whiteShape = loadImage('./iraina.jpg');
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