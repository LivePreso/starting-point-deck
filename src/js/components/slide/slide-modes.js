/**
 *  Contains a list of classes appended to the <body>
 */
class SlideModes {
  get classList() {
    return _.map(this.body.classList, val => val);
  }

  /**
   * @constructor
   */
  constructor() {
    this.body = document.querySelector('body');
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
