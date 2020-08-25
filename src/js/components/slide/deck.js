/**
 * Deck class, primarily to hold Slide objects and access to some useful utilities
 * @class Deck
 */
class Deck {
  /**
   * Gives access to SlideModes to check the current 'mode' of the Deck.
   * @readonly
   * @static
   * @memberof Deck
   */
  static get modes() {
    return new SlideModes();
  }

  /**
   * Static method to retrieve the deck's ColourMap
   * @readonly
   * @static
   * @memberof Deck
   */
  static get colourMap() {
    return new ColourMap({
      white: '#ffffff',
      black: '#000000',
      // place deck specific colours here
      charcoal: '#333333',
      blue: '#487ff7'
    });
  }
}
