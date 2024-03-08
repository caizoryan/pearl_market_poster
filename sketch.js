let imgs;

let index_1 = 0;
let index_2 = 1;
let index_3 = 2;

let offset1 = { x: 100, y: -150 };
let offset2 = { x: 0, y: 0 };
let offset3 = { x: 0, y: 0 };

let offsets = [];

let width = 1100 * 2;
let height = 1700 * 2;

let t = 2;
let template, off_1_x, off_1_y, off_2_x, off_2_y, off_3_x, off_3_y, n;

let o = 255;

if (localStorage.getItem("n")) {
  n = parseInt(localStorage.getItem("n"));
  console.log(n);
} else {
  n = 1;
  localStorage.setItem("n", n);
}

function preload() {
  template = loadImage("t" + t + ".jpg");
  imgs = Array(22)
    .fill(0)
    .map((_, i) => loadImage(`./pngs/set_${i + 1}.png`));
}

let index_next;
let index_prev;
let mode = "view";

const mode_view = () => (mode = "view");
const mode_edit = () => (mode = "edit");
let cur_index = 0;

const next_index = () =>
  (cur_index = offsets.length - 1 === cur_index ? 0 : cur_index + 1);
const prev_index = () =>
  (cur_index = cur_index === 0 ? offsets.length - 1 : cur_index - 1);

function set_n_next() {
  n++;
  localStorage.setItem("n", n);
}

function set_n_prev() {
  n--;
  localStorage.setItem("n", n);
}

function shuffl() {
  console.log("shuffl");
  let len = imgs.length;
  for (let f = 0; f < offsets.length; f++) {
    let i = Math.floor(Math.random() * len);
    let x = Math.random() * width;
    let y = Math.random() * height;
    offsets[f] = { x, y, i };
  }
}

function create_offsets(num) {
  for (let i = 0; i < num; i++) {
    let x = {
      x: Math.random(),
      y: Math.random() * 500,
      i: Math.floor(Math.random() * imgs.length),
    };
    offsets.push(x);
  }
}

function setup() {
  createCanvas(width, height).parent("p5");
  create_offsets(11);
  pixelDensity(1);
}

function draw_images() {
  for (let i = 0; i < offsets.length; i++) {
    let cur = offsets[i];
    let img = imgs[cur.i];
    let w = img.width;
    let h = img.height;
    image(img, 0 + cur.x, 0 + cur.y, w, h);
  }

  if (mode === "edit") {
    noFill();
    stroke(255, 0, 0);
    let cur_img = imgs[offsets[cur_index].i];

    rect(
      0 + offsets[cur_index].x,
      0 + offsets[cur_index].y,
      cur_img.width,
      cur_img.height,
    );
  }
}

function draw() {
  blendMode(NORMAL);
  background(255);

  tint(255, o);

  draw_images();

  tint(255, 255);

  blendMode(MULTIPLY);

  // image(template, 0, 0, width, height);

  // blendMode(NORMAL);

  textSize(30);
  fill(0, 200);
  text("_" + n, width - 150, height - 150);
}

function keyPressed() {
  if (keyCode === 83) {
    saveImage();
  }

  if (keyCode === 69) {
    mode_edit();
  }

  if (keyCode === 86) {
    mode_view();
  }

  let inc = 100;

  //H
  if (keyCode === 72) {
    offsets[cur_index].x -= inc;
  }

  //J
  if (keyCode === 74) {
    offsets[cur_index].y += inc;
  }

  //K
  if (keyCode === 75) {
    offsets[cur_index].y -= inc;
  }

  //L
  if (keyCode === 76) {
    offsets[cur_index].x += inc;
  }

  // Z
  if (keyCode === 90) {
    offsets[cur_index].i = Math.floor(Math.random() * imgs.length);
  }

  // p
  if (keyCode === 80) {
    shuffl();
  }

  if (keyCode === 82) {
    offsets[cur_index].x = Math.random() * width;
    offsets[cur_index].y = Math.random() * height;
  }
  // w
  if (keyCode === 87) {
    next_index();
  }

  // b
  if (keyCode === 66) {
    prev_index();
  }
}

function saveImage() {
  saveCanvas("template" + t + "_n" + n, "jpg");
  n++;
  localStorage.setItem("n", n);
}