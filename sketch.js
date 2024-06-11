let img;
let t = 0;
let fontSizeMax = 20;
let fontSizeMin = 8;
let spacing = 16;
let kerning = 1;
let Text = "I never dreamed about success, I worked for it.; Do not try to be original, just try to be good.; Do not be afraid to give up the good to go for the great.; If you cannot fly then run. If you cannot run, then walk. And, if you cannot walk, then crawl, but whatever you do, you have to keep moving forward.";

function preload() {
  img = loadImage("images/3sekai.png"); 
}

function setup() {
  createCanvas(900, 900, WEBGL);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  img.resize(900, 900);
}

function draw() {
  background(255);  //refresh
  lights();
  let x = 0;
  let y = spacing;
  let counter = 0;
  let cameraY = map(mouseY, 0, height, 400, -200);
  let theta = map(mouseX, 0, width, 0, TWO_PI);
  camera(3 * 300 * cos(theta), 3 * cameraY, 3 * 300 * sin(theta), 0, 0, 0, 0, 1, 0);
  push();
  translate(-width / 2, -height / 2);

  while (y < height) {
    img.loadPixels();

    let imgX = round(map(x, 0, width, 0, img.width));
    let imgY = round(map(y, 0, height, 0, img.height));
    let c = img.get(imgX, imgY);  //pixel color
    let grayscale = round(red(c) * 0.2 + green(c) * 0.7 + blue(c) * 0.07);

    push();

    translate(x, y);
    let fontSize = map(grayscale, 0, 255, fontSizeMax, fontSizeMin);
    fontSize = max(fontSize, 1);
    textSize(fontSize);
    fill(c);  //color
    let letter = Text.charAt(counter);

    let sizeScale = map(fontSize, fontSizeMin, fontSizeMax, 1, 0);
    let z = map(sizeScale, 0, 1, -100, 100);

    push();
    translate(0, 0, z);
    text(letter, 0, 0);
    pop();

    let letterWidth = textWidth(letter) + kerning;
    x += letterWidth;
    pop();

    if (x + letterWidth >= width) {  //over width reset
      x = 0;
      y += spacing;
    }

    counter++;
    if (counter >= Text.length) {  //first
      counter = 0;
    }
  }
  pop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas("afterFace", "jpg");
}

function keyPressed() {
  if (keyCode === UP_ARROW) fontSizeMax += 2;
  if (keyCode === DOWN_ARROW) fontSizeMax -= 2;
  if (keyCode === RIGHT_ARROW) fontSizeMin += 2;
  if (keyCode === LEFT_ARROW) fontSizeMin -= 2;
}
