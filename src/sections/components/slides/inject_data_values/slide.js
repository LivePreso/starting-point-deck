new Slide({
  onRendered: function() {
    const customer = Bridge.Context.match('.customer', {});
    const preso_date = Bridge.Context.match('.preso_date', null);

    this.utils.injectDataValues(this.$pageContainer, {
      customer: customer.title || null,
      preso_date: preso_date ? moment(preso_date).format('DD/MM/YYYY') : null
    });
  },
  onReady: function() {},
  onSubslideChange: function(index) {}
});
