class DOMUtils {
  /**
   * Returns a DOM element generated from a string
   *
   * @param {String} htmlString Underscore template string
   * @return {DOM}
   */
  static createDOMFromString(htmlString, fallback) {
    let temp = document.createElement('template');
    temp.innerHTML = htmlString.trim();
    if (temp.content.childNodes.length > 1) {
      console.warn(
        'Slide Utils - createDOMFromString results in a single element.\nUse createDOMArrayFromString for multiple.'
      );
    }
    return temp.content.firstChild || DOMUtils.createElement(fallback || 'div');
  }

  /**
   * Returns an array of DOM elements generated from a string
   *
   * @param {String} htmlString Underscore template string
   * @return {Array<DOM>}
   */
  static createDOMArrayFromString(htmlString) {
    let temp = document.createElement('template');
    temp.innerHTML = htmlString.trim();
    return temp.content.childNodes;
  }

  /**
   * creates an element with supplied classes
   *
   * @param {String} tag
   * @param {Object} [options]
   * @param {Array<String>} [options.classes=[]]
   * @return {DOM}
   */
  static createElement(tag, options) {
    options = _.defaults(options, {
      classes: []
    });

    let el = document.createElement(tag);
    el.classList = options.classes.join(' ');
    return el;
  }

  /**
   * creates a div element with supplied classes
   *
   * @param {Object} [classes=[]]
   * @return {DOM}
   */
  static createDivElement(classes = []) {
    return DOMUtils.createElement('div', { classes });
  }
}
