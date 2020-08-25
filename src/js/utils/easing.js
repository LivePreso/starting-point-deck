// easing functions
// more can be found at https://gist.github.com/gre/1650294
var linear = function(t) {
  return t;
};

var inQuad = function(t) {
  return t * t;
};

var outQuad = function(t) {
  return t * t;
};

var inOutQuad = function(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

var inOutCubic = function(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

var inCubic = function(t) {
  return t * t * t;
};

var outCubic = function(t) {
  return --t * t * t + 1;
};

var outQuart = function(t) {
  return 1 - --t * t * t * t;
};

var outElastic = function(t) {
  var p = 0.3;
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
};

var outElasticSoft = function(t) {
  var p = 0.7;
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
};

var easeOutBounce = function(t) {
  var scaledTime = t / 1;

  if (scaledTime < 1 / 2.75) {
    return 7.5625 * scaledTime * scaledTime;
  } else if (scaledTime < 2 / 2.75) {
    var scaledTime2 = scaledTime - 1.5 / 2.75;
    return 7.5625 * scaledTime2 * scaledTime2 + 0.75;
  } else if (scaledTime < 2.5 / 2.75) {
    var scaledTime2 = scaledTime - 2.25 / 2.75;
    return 7.5625 * scaledTime2 * scaledTime2 + 0.9375;
  } else {
    var scaledTime2 = scaledTime - 2.625 / 2.75;
    return 7.5625 * scaledTime2 * scaledTime2 + 0.984375;
  }
};
