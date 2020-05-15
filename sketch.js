const scaleX1 = -2.5;
const scaleX2 = 1;

const scaleY1 = -1;
const scaleY2 = 1;

const maxIterations = 100;

function setup() {
  createCanvas(360, 360);
  pixelDensity(1);

  loadPixels();

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < width; py++) {
      let x0 = map(px, 0, width, scaleX1, scaleX2);
      let y0 = map(py, 0, height, scaleY1, scaleY2);

      let x = 0;
      let y = 0;

      let iteration = 0;

      while (x*x + y*y <= 4 && iteration < maxIterations) {
        let xtemp = x*x - y*y + x0;
        y = 2*x*y + y0;
        x = xtemp;

        iteration++;
      }

      let thisPixel = (px + py * width) * 4;

      let brightness = map(iteration, 0, maxIterations, 0, 255);

      pixels[thisPixel + 0] = brightness;
      pixels[thisPixel + 1] = brightness;
      pixels[thisPixel + 2] = brightness;
      pixels[thisPixel + 3] = 255;
    }
  }

  updatePixels();
}
