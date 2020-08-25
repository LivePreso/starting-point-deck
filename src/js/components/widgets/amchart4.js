/**
 * Parent AMCharts class. Charts must extend this class
 */
class AMCharts4 {
  constructor(slide, { chartContainer, data }) {
    this.slide = slide;
    this.chartContainer = chartContainer;
    this.data = data;
    this.chart = null;
    this.inited = false;

    window.slideCharts[this.slide.id] = window.slideCharts[this.slide.id] || [];
    window.slideCharts[this.slide.id].push(this);
  }

  init(callback) {
    if (!this.inited) {
      this.inited = true;
      chartSetup(this.chartSuccess(callback));
    }
  }

  chartSuccess(callback) {
    throw new Error('AMCharts4.chartSuccess requires implementation.');
  }

  clear() {
    if (this.chart) {
      console.log('chart disposed');
      this.chart.dispose();
      this.chart = null;
    }
  }

  set disabled(toggle) {
    if (this.chart) {
      this.chart.disabled = true;
    }
  }

  set options(newOptions) {
    this._options = newOptions || {};
  }

  get options() {
    return this._options;
  }
}
