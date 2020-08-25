class ColourMap {
  constructor(initial) {
    this.colourMap = initial;
  }

  match(selector) {
    if (!this.colourMap[selector]) {
      console.warn(`No colour ${selector} in colour map.`);
      return null;
    } else {
      return this.colourMap[selector];
    }
  }

  pickFromGradient(start, end, weight) {
    let colour1 = this.matchAsRgb(end);
    let colour2 = this.matchAsRgb(start);
    if (!colour1 || !colour2) return null;

    let p = weight;
    let w = p * 2 - 1;
    let w1 = (w / 1 + 1) / 2;
    let w2 = 1 - w1;
    let rgb = [
      Math.round(colour1.r * w1 + colour2.r * w2),
      Math.round(colour1.g * w1 + colour2.g * w2),
      Math.round(colour1.b * w1 + colour2.b * w2)
    ];

    return this.rgbToHex(...rgb);
  }

  // rbg -> hex and hex -> rgb functions from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  matchAsRgb(selector) {
    let hex = this.match(selector);
    if (!hex) return null;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
