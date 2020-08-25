var CssTween = function(options) {
  options = options || {};
  this.node = options.node;
  this.attrName = options.attrName;
  this.attrStartVal =
    typeof options.attrStartVal === 'function'
      ? options.attrStartVal()
      : options.attrStartVal;
  this.attrEndVal = options.attrEndVal;
  this.duration = options.duration;
  this.delay = options.delay;
  this.formatter =
    options.formatter ||
    function(val) {
      return val;
    };
  this.isDone = false;
  this.easing = options.easing;
};

CssTween.prototype.end = function() {
  this.isStarted = true;
  this.isDone = true;
  this.node.style[this.attrName] = this.formatter(this.attrEndVal);
};

CssTween.prototype.reset = function() {
  this.isDone = false;
  this.node.style[this.attrName] = this.formatter(this.attrStartVal);
};

CssTween.prototype.executeStep = function(progress) {
  var currentVal =
    (this.attrEndVal - this.attrStartVal) * this.easing(progress) +
    this.attrStartVal;
  this.node.style[this.attrName] = this.formatter(currentVal);
};
