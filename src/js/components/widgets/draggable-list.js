// Assumes that items are already absolute-positioned
class DraggableList {
  constructor(options) {
    this.selector = options.selector;
    this.parentElem = options.parentElem;
    this.key = options.key;
    this.rawVal = options.initialValue;
    this.disabled = options.disabled;
    this.slide = options.slide;

    this.onChange = options.onChange || function(key, newOrder) {};

    this.$elements = $(this.parentElem).find(this.selector);
    this.positions = _.map(this.$elements, el =>
      options.orientation == 'vertical' ? $(el).css('top') : $(el).css('left')
    );
    this.draggableElements = $.makeArray(this.$elements);

    this.orientation = options.orientation;
    /*
    this.minMax = {};
    var firstObject = this.$elements[0];
    var lastObject = this.$elements[this.$elements.length - 1];
    if (this.orientation == 'horizontal') {
      this.min = firstObject.offsetLeft;
      this.max = lastObject.offsetLeft;
    } else {
      this.min = firstObject.offsetTop;
      this.max = lastObject.offsetTop;
    }
 */

    var defaultUids = _.map(this.draggableElements, el => $(el).data('uid'));
    this.state = new BridgeState(this, this.key, {
      currentOrder: {
        value: options.initialValue || defaultUids,
        persistent: true,
        onUpdate: function(val) {
          this.update(val);
          this.onChange(this.key, val);
        }
      },
      hover: {
        value: { index: null, active: false },
        persistent: false,
        onUpdate: function(val) {
          if ((val.index || val.index === 0) && this.$elements[val.index]) {
            this.$elements[val.index].classList.toggle('is-active', val.active);
          }
        }
      }
    });

    //this.init();
  }
  calcIndex(dragPosition) {
    var closest = _.findIndex(
      this.objectPositions,
      (position, index) => {
        var adjustedTop = this.dragListener.measurementFunction(position);
        var prevAdjustedTop =
          index > 0
            ? this.dragListener.measurementFunction(
                this.objectPositions[index - 1]
              )
            : this.dragListener.measurementFunction(
                this.objectPositions[index + 1]
              );

        var halfwayPoint =
          index > 0
            ? adjustedTop.top + (adjustedTop.top - prevAdjustedTop.top) / 2
            : adjustedTop.top + (prevAdjustedTop.top - adjustedTop.top) / 2;
        return dragPosition.top < halfwayPoint;
      },
      this
    );
    // in new other
    if (closest == -1) closest = this.objectPositions.length;
    return closest;
  }

  init() {
    if (!this.disabled) {
      this.$elements.addClass('interactive');
      // replace formatted val with rawVal on focus
      this.$elements.on('mouseDown', e => {
        this.startDrag.bind(this)(e.currentTarget);
      });
      _.each(this.$elements, (node, i) => {
        node.addEventListener('mouseenter', e => {
          this.state.update({ hover: { index: i, active: true } });
        });
        node.addEventListener('mouseleave', e => {
          this.state.update({ hover: { index: i, active: false } });
        });
      });
    }
    this.dragListener = new DragListener(
      this.slide.$pageContainer,
      { constraint: 'vertical', hideOriginal: true, disabled: this.disabled },
      {
        // listeners here
        elementDragging: function(e, draggable, dragPosition) {
          var closest = this.calcIndex(dragPosition);
          var draggedNode = draggable.$el[0];
          var oldIndex = this.draggableElements.indexOf(draggedNode);
          if (closest != oldIndex) {
            this.draggableElements.splice(oldIndex, 1);
            this.draggableElements.splice(closest, 0, draggedNode);
          }
          _.each(
            this.draggableElements,
            (el, index) => {
              // $(el).parent().append($(el));
              $(el).css('top', this.positions[index]);
            },
            this
          );
        }.bind(this),
        elementDropped: function(draggable, mousePosition, objectPosition) {
          var closest = this.calcIndex(objectPosition);

          // in new other
          if (closest == -1) closest = this.objectPositions.length;
          var draggedNode = draggable.$el[0];
          var oldIndex = this.draggableElements.indexOf(draggedNode);
          if (closest != oldIndex) {
            this.draggableElements.splice(oldIndex, 1);
            this.draggableElements.splice(closest, 0, draggedNode);
          }

          var newOrder = _.map(this.draggableElements, el => $(el).data('uid'));
          this.state.update({ currentOrder: newOrder });
        }.bind(this)
      }
    );

    this.draggables = [];
    this.objectPositions = [];
    var container = this.slide.$pageContainer.offset();
    this.$elements.each((index, el) => {
      var draggable = new Draggable($(el), true, this.dragListener);
      this.draggables.push(draggable);
      this.objectPositions.push({
        top: $(el).offset().top - container.top,
        left: $(el).offset().left - container.left
      });
    });
  }

  onReady() {
    // needed for to get state to client?
    if (this.slide.isMaster)
      this.state.update({ currentOrder: this.state.getValue('currentOrder') });
  }

  getValue() {
    return this.state.getValue('currentOrder');
  }

  update(order) {
    var newElements = Array(this.draggableElements.length);
    _.each(this.draggableElements, e => {
      var uid = $(e).data('uid');
      var newPos = order.indexOf(uid);
      newElements[newPos] = e;
    });

    this.draggableElements = newElements;

    _.each(
      this.draggableElements,
      (el, index) => {
        // $(el).parent().append($(el));
        $(el).css('top', this.positions[index]);
      },
      this
    );
  }

  set disabled(status) {
    this._disabled = status;
  }

  get disabled() {
    return this._disabled;
  }
}
