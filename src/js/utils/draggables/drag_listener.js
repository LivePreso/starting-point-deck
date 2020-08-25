/**
 * Drag Listener Class
 *
 * @constructor
 * @param {*} parent - The parent instance
 */
function DragListener($pageContainer, options, listeners) {
  listeners = !listeners ? {} : listeners;

  this.$pageContainer = $pageContainer;
  this.disabled = options.disabled || false;
  this.$pageContainer.toggleClass('drag-disabled', this.disabled);

  this.constraint = options.constraint;

  this.dragging = false;
  this.dragObj;

  this.hideOriginal = options.hideOriginal;

  this.dragX;
  this.dragY;

  this.startX;
  this.startY;

  this.minDragDistance = 20;

  this.elementStartDrag = listeners.elementStartDrag || function(e, dragObj) {};
  this.elementDragging =
    listeners.elementDragging || function(e, dragObj, dragPosition) {};
  this.elementDropped =
    listeners.elementDropped ||
    function(dragObj, mousePosition, objectPosition) {};
  this.clearDraggingElement =
    listeners.clearDraggingElement || function(dragObj) {};

  this.$dragContainer = $('<div/>').addClass(
    'o-draggable-container interactive'
  );
  this.$pageContainer.append(this.$dragContainer);

  this.dragFunc;
  this.stopDragFunc;
  this.measurementFunction = generateMeasurementFunction(
    this.$pageContainer,
    1920,
    1080
  );
}

DragListener.prototype.startDrag = function(e, draggable) {
  if (!this.disabled) {
    this.dragging = true;
    this.dragObj = draggable;
    var $dragEl = draggable.$el;

    var dragElemOffset = $dragEl.offset() || { top: 0, left: 0 };
    var pageContainerOffset = this.$pageContainer.offset() || {
      top: 0,
      left: 0
    };

    var dragPosition = {
      top: dragElemOffset.top - pageContainerOffset.top,
      left: dragElemOffset.left - pageContainerOffset.left
    };

    // Set initial drag position for reference
    this.dragStartX = dragPosition.left;
    this.dragStartY = dragPosition.top;

    // Set starting drag values for session
    this.dragX = dragPosition.left;
    this.dragY = dragPosition.top;

    // Set initial mouse position for drag reference
    var mousePosition = this.getMousePosition(e);
    this.mouseStartX = mousePosition.left;
    this.mouseStartY = mousePosition.top;

    if (this.dragObj.canDrag) {
      // Copy drag elem into the drag container, scale and position
      var $draggingElement = $dragEl.clone();
      $draggingElement.width($dragEl.outerWidth());
      $draggingElement.height($dragEl.outerHeight());
      this.$dragContainer.append($draggingElement);
      this.updateDragDOM(
        this.measurementFunction({ top: this.dragY, left: this.dragX })
      );
      if (this.hideOriginal) {
        this.dragObj.$el.css('visibility', 'hidden');
      }
    }

    // Add listeners
    this.dragFunc = this.drag.bind(this);
    this.stopDragFunc = this.stopDrag.bind(this);

    this.$pageContainer.on('mousemove touchmove', this.dragFunc);
    this.$pageContainer.on('mouseup touchend', this.stopDragFunc);
  }
};

DragListener.prototype.drag = function(e) {
  if (this.dragging && this.dragObj) {
    // Get mouse position
    var mousePosition = this.getMousePosition(e);

    var mouseX = mousePosition.left;
    var mouseY = mousePosition.top;

    var mouseDiffX = mouseX - this.mouseStartX;
    var mouseDiffY = mouseY - this.mouseStartY;

    // Move the drag container
    this.dragX =
      this.constraint == 'vertical'
        ? this.dragStartX
        : this.dragStartX + mouseDiffX;
    this.dragY =
      this.constraint == 'horizontal'
        ? this.dragStartY
        : this.dragStartY + mouseDiffY;

    var newPosition = this.measurementFunction({
      top: this.dragY,
      left: this.dragX
    });

    // Test if click or drag
    if (!this.isDrag) {
      this.isDrag = this.wasDrag();
    } else if (this.dragObj && !this.dragObj.canDrag) {
      // Notify user that the selected element cannot be dragged
      this.dragObj.$el.addClass('cannot-drag');
    }

    if (this.dragObj.canDrag) {
      // Redraw drag element
      window.requestAnimationFrame(
        function(timestamp) {
          this.updateDragDOM(newPosition);
        }.bind(this)
      );
    }

    // Callback with current mouse position
    var dragPosition = this.measurementFunction(mousePosition);
    this.dragCallback(e, newPosition);
  }
};

DragListener.prototype.stopDrag = function(e) {
  e.preventDefault();

  // Remove event listeners
  this.$pageContainer.off('mousemove touchmove', this.dragFunc);
  this.$pageContainer.off('mouseup touchend', this.stopDragFunc);

  // Clear drag container
  this.$dragContainer.empty();

  if (this.isDrag) {
    // Callback with current mouse position
    var mousePosition = this.measurementFunction(this.getMousePosition(e));
    var newPosition = this.measurementFunction({
      top: this.dragY,
      left: this.dragX
    });
    this.elementDropped(this.dragObj, mousePosition, newPosition);
  } else {
    // Tell drag element that it was clicked
    if (this.dragObj && this.dragObj.clicked) {
      this.dragObj.clicked();
    }

    this.clearDraggingElement(this.dragObj);
  }
  if (this.hideOriginal) {
    this.dragObj.$el.css('visibility', 'visible');
  }

  // Clear drag status
  this.clearDrag();
};

DragListener.prototype.clearDrag = function() {
  this.dragObj.$el.removeClass('cannot-drag');

  // Reset variables
  this.dragging = false;
  this.dragObj = null;
  this.dragX = null;
  this.dragY = null;

  this.dragFunc = null;
  this.stopDragFunc = null;

  this.isDrag = false;
};

DragListener.prototype.wasDrag = function() {
  return (
    Math.abs(this.dragStartX - this.dragX) > this.minDragDistance ||
    Math.abs(this.dragStartY - this.dragY) > this.minDragDistance
  );
};

/**
 * Notifies parent of dragging event
 *
 * @param {Object} position
 * @param {number} position.top
 * @param {number} position.left
 */
DragListener.prototype.dragCallback = _.throttle(function(e, dragPosition) {
  if (this.dragging && this.dragObj.canDrag) {
    // Send drag information back to the parent
    this.elementDragging(e, this.dragObj, dragPosition);
  }
}, 100);

/**
 * Update dragging instance
 *
 * @param {Object} position
 * @param {number} position.top
 * @param {number} position.left
 */
DragListener.prototype.updateDragDOM = function(position) {
  this.$dragContainer.css({
    top: position.top || 0 + 'px',
    left: position.left || 0 + 'px'
  });
};

/**
 * Get current mouse position (click or touch)
 * Relative to the $pageContainer
 *
 * @param {Event} e - click/touch event
 * @returns {Object} top and left position
 */
DragListener.prototype.getMousePosition = function(e) {
  var clickEvent = e.originalEvent || e;

  // Unwrap touch event if required
  if (
    !clickEvent.pageX &&
    !clickEvent.pageY &&
    clickEvent.touches &&
    clickEvent.touches.length
  ) {
    clickEvent = clickEvent.touches[0];
  }

  var mouseX = clickEvent.pageX;
  var mouseY = clickEvent.pageY;

  // Offset mouse position by $pageContainer
  var pageContainerOffset = this.$pageContainer.offset() || { top: 0, left: 0 };

  return {
    top: mouseY - pageContainerOffset.top,
    left: mouseX - pageContainerOffset.left
  };
};

DragListener.prototype.disable = function() {
  this.disabled = true;
};

DragListener.prototype.enable = function() {
  this.disabled = false;
};
