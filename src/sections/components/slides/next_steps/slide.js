new Slide({
  onRendered() {
    this.slideApp = new NextStepsSlide(this.id, {
      slide: this,
      persistent: true,
      maxHeight: '500px'
    });
    ComponentUtils.render(this.slideApp, this.utils.findEl('#next_steps_root'));
  },
  onReady(e, done) {
    if (!$('body').hasClass('edit-mode')) {
      this.slideApp.initialize();
      this.slideApp.setState(Bridge.Context.match('.next_steps', {}));
    }
    done();
  },
  onClose() {
    this.slideApp.dragList.destroy();
    this.slideApp.destroy();
  }
});
