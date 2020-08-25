var insertAfter = function(parentNode, newNode, refNode) {
  parentNode.insertBefore(newNode, refNode.nextSibling);
};

_.mixin({ insertAfter: insertAfter });
