var BridgeState = function(context, key, initial, global, listener) {
  this.context = context;
  this.key = key;
  this.isMaster = !$('body').hasClass('client');
  this.isPrep = $('body').hasClass('preview');
  this.isGlobal = global;
  this.isListener = listener;
  this.state = _.mapObject(
    initial,
    function(val, key) {
      if (val.persistent && this.isMaster) {
        val.value = Bridge.Context.match(
          '.' + (val.global ? 'global-' + this.key : this.key) + '-' + key,
          val.value
        );
      }
      return val;
    },
    this
  );
  this.bridgeState = this.getBridgeState();
  this.initialize();
};

BridgeState.prototype.getBridgeState = function() {
  return _.mapObject(this.state, function(val, key) {
    return val.value;
  });
};

BridgeState.prototype.updateFromBridgeState = function(bridgeState) {
  this.bridgeState = _.deepExtend(this.bridgeState, bridgeState);

  _.each(
    bridgeState,
    function(val, key) {
      if (this.state[key]) {
        var value =
          this.bridgeState[key] &&
          Object.prototype.toString.call(this.bridgeState[key]) ===
            '[object Object]'
            ? _.deepExtend({}, this.bridgeState[key])
            : this.bridgeState[key];
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
    },
    this
  );
};

BridgeState.prototype.getValue = function(key) {
  return this.state[key].value;
};

BridgeState.prototype.update = function(updatedState) {
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
};

BridgeState.prototype.initClient = function() {
  if (!this.isMaster) {
    Bridge.Event.trigger('client:' + this.key + '-fetchState');
  }
};

BridgeState.prototype.initClientEvent = function() {
  Bridge.Event.on(
    'master:' + this.key + '-masterDone',
    function() {
      if (!this.isMaster) {
        Bridge.Event.trigger('client:' + this.key + '-fetchState');
      }
    }.bind(this)
  );
};

BridgeState.prototype.initMaster = function() {
  Bridge.Event.on(
    'client:' + this.key + '-fetchState',
    function() {
      if (this.context instanceof Slide) {
        // Client has been registered
        this.context.pageContainer.classList.add('has-clients');
      }
      Bridge.Event.trigger(
        'master:' + this.key + '-updateState',
        this.getBridgeState(),
        true
      );
    }.bind(this)
  );
};

BridgeState.prototype.masterDone = function() {
  if (this.isMaster) {
    _.each(this.bridgeState, (val, key) => {
      if (typeof this.state[key].onUpdate === 'function')
        this.state[key].onUpdate.call(this.context, val);
    });
    Bridge.Event.trigger('master:' + this.key + '-masterDone');
  }
};

BridgeState.prototype.initialize = function() {
  if (this.isMaster) {
    this.initMaster();
  }
  this.initClientEvent();
  Bridge.Event.on(
    'master:' + this.key + '-updateState',
    function(bridgeState, isClient) {
      console.log('master:' + this.key + '-updateState', bridgeState);
      if (_.isEmpty(bridgeState) || (isClient && this.isMaster)) {
        return null;
      }
      this.updateFromBridgeState(bridgeState);
    }.bind(this)
  );
  if (this.isListener) {
    Bridge.Event.on(
      'master:' + this.key + '-updateState-listener',
      function(bridgeState, isClient) {
        if (_.isEmpty(bridgeState) || (isClient && this.isMaster)) {
          return null;
        }
        this.updateFromBridgeState(bridgeState);
      }.bind(this),
      'deck'
    );
  }
};
