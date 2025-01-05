let f = 10;
let scaleFactor = 25;

let lights = [];

function setup() {
  fetchCSV('tree.csv');
  let canvas = createCanvas(400, 400); 
  canvas.parent('tree')
  background(0);
  console.log(lights.length)
}

function draw() {
  lights.forEach(drawLight);
}

/* -- NON P5JS FUNCTIONS -- */

function drawLight(item) {
  let lightPosition = item.getPosition();
  // console.log(lightPosition)

  stroke(255);
  point(lightPosition[0] + 100, lightPosition[1] + 100);
}

/* -- CLASSES -- */

class TreeLight {
  constructor (x, y, z) {
    this.x = Math.round(x*10); // The X position of the light
    this.y = Math.round(y*10); // The Y position of the light
    this.z = Math.round(z*10); // The Z position of the light

    this.color = [255, 255, 255] // The color of the light
  }

  getColor() {
    return this.color;
  }

  getPosition() {
    return this.project();
  }

  setColor(r = this.color[0], g = this.color[1], b = this.color[2]) {
    this.color = [r, g, b];
  }

  /**
  * Converts a 3D coordinate into a 2D one.
  * @author Owen Plimer
  * 
  * @param {number} x The 3D X coordinate
  * @param {number} y The 3D Y coordinate
  * @param {number} z The 3D Z coordinate
  * @param {number} f The FOV of the "camera"
  * @returns {Array} Array of the X and Y coordinate of the light
  */
  project() {
    let xProjected = Math.round(float(f * (this.x + 1)) / (f * (this.z + 1)) * scaleFactor);
    let yProjected = Math.round(float(f * (this.y + 1)) / (f * (this.z + 1)) * scaleFactor);
  
    console.log(this.x, this.y, this.z)
    return [xProjected, yProjected];
  }
}

/**
 * Fetch a CSV file from the given URL and load it as the tree array to be used.
 * @param {string} url 
 */
async function fetchCSV(url) {
  try {
      const response = await fetch(url);
      const data = await response.text();
      let linesArray = data.split('\n')
      let xyzArray;

      linesArray.forEach((item) => {
        xyzArray = (item.split(','));
        lights.push(new TreeLight(xyzArray[0], xyzArray[1], xyzArray[2]));
      });

      console.log(lights.length)
  } catch (error) {
      console.error('Error fetching CSV:', error);
  }
}