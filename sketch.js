/* global width, height, pixels, pixelDensity, createCanvas, loadPixels, updatePixels, map, translate */
/* eslint no-unused-vars: 0 */

const scale = [-2, 1, -1.5, 1.5]
const maxIterations = 100

function setup () {
  createCanvas(700, 700)
  pixelDensity(1)
  drawMandelbrot()
}

function drawMandelbrot () {
  loadPixels()

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < width; py++) {
      const x0 = map(px, 0, width, scale[0], scale[1])
      const y0 = map(py, 0, height, scale[2], scale[3])

      let x = 0
      let y = 0

      let iterations = 0

      while (x * x + y * y <= 4 && iterations < maxIterations) {
        const xtemp = x * x - y * y + x0
        y = 2 * x * y + y0
        x = xtemp

        iterations++
      }

      const thisPixel = (px + py * width) * 4
      let brightness = map(iterations, 0, maxIterations, 0, 255)

      if (iterations === maxIterations) brightness = 0

      pixels[thisPixel + 0] = brightness
      pixels[thisPixel + 1] = brightness
      pixels[thisPixel + 2] = brightness
      pixels[thisPixel + 3] = 255
    }
  }

  updatePixels()
}
