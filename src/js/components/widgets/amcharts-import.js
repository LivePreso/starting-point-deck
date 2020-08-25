// set up chart library
var chartSetup = function(callback) {
  try {
    if (!am4chartsLoaded || !am4charts) {
      importAmCharts(callback);
    } else {
      if (typeof callback === 'function') callback();
    }
  } catch (e) {
    // something went wrong, try importing AmCharts again
    importAmCharts(callback);
  }
};

var importAmCharts = function(callback) {
  var baseChartsPath = window.deckBaseURL + 'js/external/amcharts4/';
  System.import(baseChartsPath + 'core.js')
    .then(function() {
      return System.import(baseChartsPath + 'charts.js');
    })
    .then(function() {
      return System.import(baseChartsPath + 'themes/animated.js');
    })
    .then(function() {
      amchartsLoaded = true;
      am4core.options.commercialLicense = true;
      am4core.options.autoSetClassName = true;
      // am4core.options.queue = true;
      if (typeof callback === 'function') callback();
    });
};
var amchartsLoaded = false;
chartSetup();
