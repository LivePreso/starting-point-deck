new Slide({
  onRendered: function() {
    // TODO: Develop modal example
    this.components.modal = new Modal(this, {
      canCloseShroud: true,
      content: [
        new ModalContent(
          `modal-content-1`,
          this.utils.findEl('.js-modal-content-1')
        )
      ]
    });

    // Source with compiled toggle title
    this.components.source = new Source(
      `${this.id}-source`,
      this.utils.findEl('.js-source-container'),
      {
        textMap: [
          {
            key: 'Source',
            text: 'Lots of words'
          }
        ]
      }
    );
  },
  onReady: function() {
    this.components.modal.state.initialize();

    this.modalButton = this.utils.findEl('.js-open-modal');
    this.modalButton.addEventListener('click', e => {
      this.components.modal.open();
      this.components.modal.activeContent = 'modal-content-1';
    });
  },
  onSubslideChange: function(index) {}
});
