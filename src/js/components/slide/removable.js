class Removable {
  set disabled(disabled) {
    this._disabled = Boolean(disabled);
    this.el.classList.toggle('is-disabled', this._disabled);
  }

  get disabled() {
    return this._disabled;
  }

  set hidden(hidden) {
    this._hidden = Boolean(hidden);
    this.el.classList.toggle('is-hidden', this._hidden);
  }

  get hidden() {
    return this._hidden;
  }

  constructor(parent, el, { disabled, hidden } = {}) {
    if (!(parent instanceof Removables)) {
      throw new Error(
        `${this.constructor.name} - parent must be of class Removables.`
      );
    }

    if (!el.dataset.key) {
      throw new Error(
        `${this.constructor.name} - removable el must have a data-key attribute.`
      );
    }

    this.parent = parent;
    this.el = el;
    this.el.classList.add('c-removable');
    this.key = this.el.dataset.key;
    this.disabled = disabled;
    this.hidden = hidden;

    this.removeButton = document.createElement('div');
    this.removeButton.classList = 'c-removable__button';
    this.el.append(this.removeButton);

    this.init();
  }

  init() {
    this.removeButton.addEventListener('click', e => {
      if (!this.parent.editable || this.disabled) return;
      e.stopPropagation();
      this.parent.removeItem(this.key);
    });
  }
}

/**
 * A component which handles all removable elements within
 * a supplied DOM element, it will make any element on the parent
 * with the class `.js-removable` a removable element
 */
class Removables {
  set disabled(disabled) {
    this._disabled = disabled;

    _.each(this.removables, removable => {
      removable.disabled = disabled;
    });

    this.restoreButton.classList.toggle('is-disabled', disabled);
  }

  get disabled() {
    return this._disabled;
  }

  /**
   * @param {Object} key
   * @param {Boolean} disabled
   * @param {DOMElement[]} [removableEls] - Collection of removable assets
   * @param {DOMElement} [restoreEl] - Restore button
   * @param {Function} [onUpdate]
   */
  constructor(key, { disabled, removableEls, restoreEl, onUpdate } = {}) {
    this.key = key;
    this.removables = _.map(removableEls || [], removableEl => {
      return new Removable(this, removableEl, {
        disabled
      });
    });
    this.restoreButton = restoreEl || document.createElement('div');
    this.restoreButton.classList.add('c-removable__restore');

    this.editable = Deck.modes.is('preview');
    this.disabled = disabled;

    this.onUpdate = onUpdate || _.noop;

    this.state = new BridgeState(this, this.key, {
      removables: {
        value: false,
        persistent: true,
        onUpdate: function(removableState) {
          _.each(this.removables, removable => {
            removable.hidden = !removableState[removable.key] || false;
          });
          this.onUpdate();
        }
      }
    });

    if (!this.editable) {
      this.restoreButton.classList.add('is-hidden');
    }

    this.init();
  }

  removeItem(itemKey) {
    const state = this.state.getValue('removables');
    state[itemKey] = false;
    this.state.update({
      removables: state
    });
  }

  /** Resets all removables to their initial state (visible) */
  reset() {
    this.state.update({
      removables: _.reduce(
        this.removables,
        (state, removable) => {
          state[removable.key] = true;
          return state;
        },
        {}
      )
    });
  }

  init() {
    const state = this.state.getValue('removables');

    if (!state) {
      const initialState = _.reduce(
        this.removables,
        (removableState, removable) => {
          removableState[removable.key] = true;
          return removableState;
        },
        {}
      );

      this.state.update({
        removables: initialState
      });
    }

    this.restoreButton.addEventListener('click', () => {
      if (!this.editable || this.disabled) return;
      this.reset();
    });
  }
}
