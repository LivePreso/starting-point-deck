window.deckBaseURL = window.deckBaseURL ? window.deckBaseURL : 'deck/';

window.slideTimeouts = window.slideTimeouts || {};
window.slideIntervals = window.slideIntervals || {};
window.slideCharts = window.slideCharts || {};

// Clear setIntervals
var clearIntervals = function(slideId) {
  if (window.slideIntervals[slideId]) {
    while (window.slideIntervals[slideId].length > 0) {
      clearInterval(window.slideIntervals[slideId].pop());
    }
  }
};

// Clear setIntervals
var clearAllIntervals = function() {
  _.each(window.slideIntervals, function(interval) {
    while (interval.length > 0) {
      clearInterval(interval.pop());
    }
  });
};

// Clear setTimeouts
var clearTimeouts = function(slideId) {
  if (window.slideTimeouts[slideId]) {
    while (window.slideTimeouts[slideId].length > 0) {
      clearTimeout(window.slideTimeouts[slideId].pop());
    }
  }
};

// Clear setTimeouts
var clearAllTimeouts = function() {
  _.each(window.slideTimeouts, function(interval) {
    while (interval.length > 0) {
      clearTimeout(interval.pop());
    }
  });
};

var clearCharts = function(slideId) {
  if (window.slideCharts[slideId]) {
    while (window.slideCharts[slideId].length > 0) {
      window.slideCharts[slideId].pop().clear();
    }
  }
};
