#target "illustrator"
var dotSpacing;
var dotSize;

if (app.documents.length > 0) {
    dotSizePrompt();
    dotSpacingPrompt();
    createRegDots(dotSpacing, dotSize);
} else alert("Please open a document before running this script.");

function dotSizePrompt() {
    dotSize = +prompt("Enter the size you want your registration dots to be in mm", 0);
    if (isNaN(dotSize)) {
        alert("Please enter a valid number");
        dotSizePrompt();
    }
}

function dotSpacingPrompt() {
    dotSpacing = +prompt("Enter the spacing from the corners you wish to have in mm", 0);
    if (isNaN(dotSpacing)) {
        alert("Please enter a valid number");
        dotSpacingPrompt();
    }
}

function createRegDots(spacing, size) {

    var doc = app.activeDocument;
    var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var artboardRect = artboard.artboardRect;
    var left = artboardRect[0];
    var top = artboardRect[1];
    var right = artboardRect[2];
    var bottom = artboardRect[3];

    spacingPoint = convertToPt(spacing);
    sizePoint = convertToPt(size);

    createEllipse(top - spacingPoint, left + spacingPoint, sizePoint);
    createEllipse(top - spacingPoint, (right - sizePoint) - spacingPoint, sizePoint);
    createEllipse((bottom + sizePoint) + spacingPoint, (right / 3), sizePoint);
    createEllipse((bottom + sizePoint) + spacingPoint, (right - sizePoint) - spacingPoint, sizePoint);
}

function convertToPt(number) {
    const result = number * 2.83464566929134;
    return result;
}

function createCMYK(c, m, y, k) {
    var newCMYK = new CMYKColor();
    newCMYK.cyan = c;
    newCMYK.magenta = m;
    newCMYK.yellow = y;
    newCMYK.black = k;
    return newCMYK;
}

function createEllipse(top, left, size) {
    var doc = app.activeDocument;
    var black = createCMYK(0, 0, 0, 100);
    var circle = doc.pathItems.ellipse(top, left, size, size);
    circle.filled = true;
    circle.fillColor = black;
}