/* global width, height, pixels, pixelDensity, createCanvas, loadPixels, updatePixels, map */
/* eslint no-unused-vars: 0 */

const scaleX1 = -2
const scaleX2 = 1

const scaleY1 = -1.5
const scaleY2 = 1.5

const maxIterations = 100

function setup () {
  createCanvas(360, 360)
  pixelDensity(1)
}

function draw () {
  loadPixels()

  for (let px = 0; px < width; px++) {
    for (let py = 0; py < width; py++) {
      const x0 = map(px, 0, width, scaleX1, scaleX2)
      const y0 = map(py, 0, height, scaleY1, scaleY2)

      let x = 0
      let y = 0

      let iteration = 0

      while (x * x + y * y <= 4 && iteration < maxIterations) {
        const xtemp = x * x - y * y + x0
        y = 2 * x * y + y0
        x = xtemp

        iteration++
      }

      const thisPixel = (px + py * width) * 4

      const brightness = map(iteration, 0, maxIterations, 0, 255)

      pixels[thisPixel + 0] = brightness
      pixels[thisPixel + 1] = brightness
      pixels[thisPixel + 2] = brightness
      pixels[thisPixel + 3] = 255
    }
  }

  updatePixels()
}
