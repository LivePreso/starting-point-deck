/**
 * Basic button, can be clicked and disabled.
 */
class Button {
  set disabled(disabled) {
    this._disabled = disabled;
    this.el.classList.toggle('is-disabled', this._disabled);
  }

  get disabled() {
    return this._disabled;
  }

  set hidden(hidden) {
    this._hidden = hidden;
    this.el.classList.toggle('is-hidden', this._hidden);
  }

  get hidden() {
    return this._hidden;
  }

  /**
   * @param  {DOM} [el] // If not supplied, basic div will be created
   * @param  {Function} [disabled=false]
   * @param  {Function} [hidden=false]
   * @param  {Function} [onClick=()=>{}]
   */
  constructor({ el, disabled, hidden, onClick } = {}) {
    this.el = el || DOMUtils.createDivElement();
    this.onClick = onClick || function() {};
    this.hidden = Boolean(hidden);
    this.disabled = Boolean(disabled);
  }

  init() {
    if (this.inited) return;
    this.inited = true;

    if (Deck.modes.is('client')) return;
    this.el.addEventListener('click', this.buttonClicked);
  }

  buttonClicked = () => {
    if (this.disabled || this.hidden) return;
    this.onClick(this);
  };

  render() {}

  destroy() {
    if (Deck.modes.isEditor) {
      this.el.removeEventListener('click', this.buttonClicked);
    }
  }
}
