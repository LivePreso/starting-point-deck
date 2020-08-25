// found and modified from https://chanind.github.io/javascript/svg/2019/01/13/manipulating-and-animating-svg-with-raw-javascript.html
var SvgTween = function(options) {
  options = options || {};
  this.node = options.node;
  this.attrName = options.attrName;
  this.attrStartVal = options.attrStartVal;
  this.attrEndVal = options.attrEndVal;
  this.duration = options.duration;
  this.delay = options.delay;
  this.isDone = false;
  this.easing = options.easing;
};

SvgTween.prototype.end = function() {
  this.isStarted = true;
  this.isDone = true;
  this.node.setAttributeNS(null, this.attrName, this.attrEndVal);
};

SvgTween.prototype.reset = function() {
  this.isDone = false;
  this.node.setAttributeNS(null, this.attrName, this.attrStartVal);
};

SvgTween.prototype.executeStep = function(progress) {
  var currentVal =
    (this.attrEndVal - this.attrStartVal) * this.easing(progress) +
    this.attrStartVal;
  this.node.setAttributeNS(null, this.attrName, currentVal);
};
