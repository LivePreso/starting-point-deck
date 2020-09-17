class BridgeState {
  constructor(context, key, initial, global, listener) {
    this.context = context;
    this.key = key;
    this.isMaster = !Deck.modes.is('client');
    this.isGlobal = global;
    this.isListener = listener;
    this.state = _.mapObject(
      initial,
      function(val, key) {
        if (val.persistent && this.isMaster) {
          val.value = Bridge.Context.match(
            `.${val.global ? 'global-' + this.key : this.key}-${key}`,
            val.value
          );
        }
        return val;
      },
      this
    );

    this.setupEvents();
  }

  updateFromBridgeState(bridgeState) {
    _.each(bridgeState, (val, key) => {
      if (this.state[key]) {
        var value =
          bridgeState[key] &&
          Object.prototype.toString.call(bridgeState[key]) === '[object Object]'
            ? _.deepExtend({}, bridgeState[key])
            : bridgeState[key];
        this.state[key].value = value;
        if (this.state[key].persistent && this.isMaster) {
          Bridge.Context.set(
            (this.state[key].global ? 'global-' + this.key : this.key) +
              '-' +
              key,
            value
          );
        }
        if (typeof this.state[key].onUpdate === 'function')
          this.state[key].onUpdate.call(this.context, value);
      }
    });
  }

  getValue(key) {
    return this.state[key] && this.state[key].value;
  }

  update(updatedState) {
    Bridge.Event.trigger(
      'master:' + this.key + '-updateState',
      updatedState,
      false // isClient
    );
    if (this.isGlobal) {
      Bridge.Event.triggerDeckEvent(
        'master:' + this.key + '-updateState-listener',
        updatedState,
        false // isClient
      );
    }
  }

  initMasterEvents() {
    console.log("I'm a master!", this.key);
    Bridge.Event.on('client:' + this.key + '-fetchState', () => {
      console.log('client:fetchState recieved: ', this.key);
      if (this.context instanceof Slide) {
        // Client has been registered
        this.context.pageContainer.classList.add('has-clients');
      }
      Bridge.Event.trigger(
        'master:' + this.key + '-updateState',
        this.bridgeState,
        true
      );
    });

    _.each(this.bridgeState, (val, key) => {
      if (typeof this.state[key].onUpdate === 'function')
        this.state[key].onUpdate.call(this.context, val);
    });
    Bridge.Event.trigger('master:' + this.key + '-masterDone');
  }

  initClientEvents() {
    console.log("I'm a client!", this.key);
    Bridge.Event.on('master:' + this.key + '-masterDone', () => {
      console.log('master:masterDone recieved: ', this.key);
      Bridge.Event.trigger('client:' + this.key + '-fetchState');
    });

    Bridge.Event.trigger('client:' + this.key + '-fetchState');
  }

  setupEvents() {
    Bridge.Event.on(
      'master:' + this.key + '-updateState',
      (bridgeState, isClient) => {
        if (_.isEmpty(bridgeState) || (isClient && this.isMaster)) {
          return null;
        }
        console.log('master:updateState', this.key, bridgeState);
        this.updateFromBridgeState(bridgeState);
      }
    );
    if (this.isListener) {
      Bridge.Event.on(
        'master:' + this.key + '-updateState-listener',
        (bridgeState, isClient) => {
          if (_.isEmpty(bridgeState) || (isClient && this.isMaster)) {
            return null;
          }
          console.log('master:updateState-listener', this.key, bridgeState);
          this.updateFromBridgeState(bridgeState);
        },
        'deck'
      );
    }
  }

  initialize() {
    if (this.isMaster) {
      this.initMasterEvents();
    } else {
      this.initClientEvents();
    }
  }

  get bridgeState() {
    return _.mapObject(this.state, function(val, key) {
      return val.value;
    });
  }
}
