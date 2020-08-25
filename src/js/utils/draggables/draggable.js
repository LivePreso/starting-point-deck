/**
 * Draggable Class
 *
 * @constructor
 * @param {*} parent - The parent instance
 * @param {Object} dragListener - Drag Listener instance
 */
function Draggable($el, canDrag, dragListener, childSelector) {
  this.$el = $el;
  this.$el.toggleClass('draggable', canDrag);
  this.canDrag = canDrag;
  this.childSelector = childSelector;

  if (!(dragListener instanceof DragListener)) {
    throw new Error('Invalid DragListener instance passed to Draggable');
  }

  var startDragFunc = function(e) {
    dragListener.startDrag(e, this);
  }.bind(this);

  if (this.childSelector) {
    $el.find(this.childSelector).on('mousedown touchstart', startDragFunc);
  } else {
    $el.on('mousedown touchstart', startDragFunc);
  }
}
