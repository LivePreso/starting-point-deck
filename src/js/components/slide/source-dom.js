class SourceDOM {
  set disabled(disabled) {
    this._disabled = Boolean(disabled);
    this.toggleEl.classList.toggle('is-disabled', this._disabled);
  }

  get disabled() {
    return this._disabled;
  }

  set active(active) {
    this.textEl.classList.toggle('is-active', active);
  }

  get active() {
    return this.state.getValue('open');
  }

  /**
   *
   * @param {DOMElement} toggleEl
   * @param {DOMElement} textEl
   * @param {String} key - optional key for storing to the Context
   * @param {Boolean} disabled - source cannot be toggled
   * @param {Boolean} active - hide/show source text
   */
  constructor(key, toggleEL, textEl, { disabled, active } = {}) {
    this.key = key;
    this.toggleEl = toggleEL;
    this.textEl = textEl;

    this.state = new BridgeState(this, this.key, {
      open: {
        value: Boolean(active),
        onUpdate: this.toggleSource
      }
    });

    this.disabled = disabled;

    this.addEventListeners();
  }

  /** toggles the source in the DOM */
  toggleSource(toggle) {
    this.active = toggle;
  }

  /** Adds event listeners which will update the state of the source */
  addEventListeners() {
    if (!Deck.modes.is('client')) {
      _.each([this.toggleEl, this.textEl], el => {
        el.addEventListener('click', e => {
          this.state.update({
            open: !this.active
          });
        });
      });
    }
  }
}
