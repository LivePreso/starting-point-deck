class Removable {
  constructor($el, state, parent) {
    this.parent = parent;
    this.$el = $el;
    this.key = this.$el.attr('key');
    this.visible = state;
    if (!this.visible) {
      this.$el.addClass('c-removable--hidden');
    } else {
      this.$el.addClass('c-removable--visible');
    }
    this.init();
  }

  toggle(toggle) {
    if (toggle) {
      this.$el.removeClass('c-removable--hidden');
      this.$el.addClass('c-removable--visible');
      this.visible = true;
    } else {
      this.$el.addClass('c-removable--hidden');
      this.$el.removeClass('c-removable--visible');
      this.visible = false;
    }
  }

  init() {
    if (this.parent.state.isPrep) {
      var $button = $('<div class="c-removable--button" />');
      $button.on('click', e => {
        e.stopPropagation();
        var state = this.parent.state.getBridgeState();
        state.removables[this.key] = false;
        this.parent.state.update(state);
      });
      this.$el.append($button);
    }
  }
}

class Removables {
  /**
   * A component which handles all removable elements in a slide,
   * it will make any element on the slide with the class `.c-removable` a removable element
   *
   * @param {Object} options
   * @param {Object} options.$pageContainer - The slide container
   * @param {Object} options.$resetContainer - The DOM element to inject the reset button into
   */
  constructor(options) {
    this.$pageContainer = options.$pageContainer;
    this.removables = {};
    this.$resetContainer = options.$resetContainer;
    this.state = new BridgeState(
      this,
      this.$pageContainer.attr('id') + '-removableState',
      {
        removables: {
          value: false,
          persistent: true,
          onUpdate: function(removables) {
            _.each(removables, (val, key) => {
              this.removables[key].toggle(val);
            });
          }
        }
      }
    );
    this.init();
  }

  /** Resets all removables to their initial state (visible) */
  reset() {
    this.state.update({
      removables: _.mapObject(this.removables, (val, key) => {
        return true;
      })
    });
  }

  init() {
    var _this = this;
    var state = this.state.getValue('removables');
    this.$pageContainer.find('.c-removable').each(function() {
      var key = $(this).attr('key');
      var value = state[key] !== undefined ? state[key] : true;
      _this.removables[key] = new Removable($(this), value, _this);
    });
    if (!state) {
      var initialState = {};
      var _this = this;
      this.$pageContainer.find('.c-removable').each(function() {
        initialState[$(this).attr('key')] = true;
      });
      this.state.update({
        removables: initialState
      });
    }
    if (this.state.isPrep) {
      var $reset = $('<div class="c-removable--reset" />');
      $reset.on('click', () => {
        this.reset();
      });
      this.$resetContainer.append($reset);
    }
  }
}
