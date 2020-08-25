var TextTween = function(options) {
  options = options || {};
  this.node = options.node;
  this.startVal = options.startVal;
  this.endVal = options.endVal;
  this.duration = options.duration;
  this.delay = options.delay;
  this.easing = options.easing || linear;

  this.formatter =
    options.formatter ||
    function(val) {
      return val;
    };
  this.onComplete = options.onComplete.bind(this) || function(val, thisObj) {};
  this.isStarted = false;
  this.isDone = false;
  this.startTime = null;
};

TextTween.prototype.end = function() {
  this.isStarted = true;
  this.isDone = true;
  if (this.node) this.node.innerHTML = this.formatter(this.endVal);
  this.onComplete(this.endVal);
};

TextTween.prototype.reset = function() {
  this.isDone = false;
  if (this.node) this.node.innerHTML = this.formatter(this.startVal);
};

TextTween.prototype.executeStep = function(progress) {
  var currentVal =
    (this.endVal - this.startVal) * this.easing(progress) + this.startVal;
  if (this.node) this.node.innerHTML = this.formatter(currentVal);
};
