new Slide({
  onRendered: function() {
    let cFormat = new CodeFormatter(this);
    this.clicker = this.pageContainer.querySelector('.js-button');
    this.clicker.addEventListener('click', ev =>
      this.state.update({ clicker: !this.state.getValue('clicker') })
    );
  },
  onReady: function() {},
  state: {
    clicker: {
      value: false,
      persistent: true,
      onUpdate: function(val) {
        this.clicker.classList.toggle('c-button--active', val);
      }
    }
  },
  onSubslideChange: function(index) {}
});
