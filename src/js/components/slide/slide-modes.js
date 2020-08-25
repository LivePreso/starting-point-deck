/**
 *  Contains a list of classes appended to the <body>
 */
class SlideModes {
  /**
   * @constructor
   */
  constructor() {
    let body = document.querySelector('body');
    this.classList = _.map(body.classList, val => val);
  }

  /**
   * Check supplied class name against class list
   * @param  {String}  className Name of class to check
   * @return {Boolean}           Return value
   */
  is(className) {
    return _.contains(this.classList, className);
  }
}
