// -------------- //
// Draggable Utils //
// -------------- //

/*
 * Gets pixel measurement irregardless of current presenter scaling
 * Allows for LivePreso rescaling
 *
 * @param {Object} values - values keyed by property - eg. { top: 124, width: 500 }
 */

var generateMeasurementFunction = function(
  $pageContainer,
  slideWidth,
  slideHeight
) {
  return function(values) {
    // Apply modifier to top and left values
    // Allows for LivePreso rescaling
    var pageContainer =
      $pageContainer[0] && $pageContainer[0].getBoundingClientRect()
        ? $pageContainer[0].getBoundingClientRect()
        : { width: slideWidth, height: slideHeight };

    var modifier = pageContainer.width / slideWidth;

    return _.reduce(
      values,
      function(modifiedValues, value, key) {
        modifiedValues[key] = value / modifier;

        return modifiedValues;
      },
      {}
    );
  };
};
