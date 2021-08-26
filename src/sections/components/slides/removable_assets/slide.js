new Slide({
  onRendered: function() {
    // TODO: In present mode, remove any .js-list-items
    // that are empty (no text content), before they can
    // be registered as removable assets
    this.components.removableList = new Removables('removable-list', {
      removableEls: this.utils.findAll('.js-list-item'),
      restoreEl: this.utils.findEl('.js-reset')
    });

    this.components.source = new SourceDOM(
      `${this.id}-source`,
      this.utils.findEl('.js-source-toggle'),
      this.utils.findEl('.js-source-text')
    );
  },
  onReady: function() {},
  onSubslideChange: function(index) {}
});
