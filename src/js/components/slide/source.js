class Source {
  /**
   *
   * @param {Slide} slide
   * @param {String} key
   * @param {DOMElement} container - where to inject the source
   * @param {Object[]} textMap - Array of sources/notes to add
   * @param {String} textMap[].key - Source label (button to display source)
   * @param {String} textMap[].text - Source text content
   */
  constructor(slide, { key, container, textMap } = {}) {
    this.container = container;
    this.slide = slide;
    this.textMap = textMap;
    this.open = false;
    this.state = new BridgeState(
      this,
      this.slide.id + (key || '') + '-sourceState',
      {
        source: {
          value: this.open,
          onUpdate: this.toggleSource
        }
      }
    );
    this.addSources();
    this.addEventListeners();
  }

  /** Adds the source to the specified container */
  addSources() {
    this.$toggle = $(
      `<span class="c-source__toggle">${this.toggleText}</span>`
    );
    this.$text = $(
      '<span class="c-source__text">' +
        _.reduce(
          this.textMap,
          (acc, curr) => {
            return `${acc}<strong>${curr.key}: </strong>${curr.text} `;
          },
          ''
        ) +
        '</span>'
    );
    this.container.appendChild(this.$text[0]);
    this.container.appendChild(this.$toggle[0]);
  }

  /** toggles the source in the DOM */
  toggleSource(toggle) {
    this.open = toggle;
    this.container.classList.toggle('c-source--open', toggle);
  }

  /** Adds event listeners which will update the state of the source */
  addEventListeners() {
    if (this.state.isMaster) {
      this.$toggle.on('click', e => {
        this.state.update({
          source: !this.open
        });
      });
    }
  }

  get toggleText() {
    if (!this.textMap) return '';
    if (this.textMap.length == 1) return this.textMap[0].key;
    let head = _.chain(this.textMap)
      .first(this.textMap.length - 1)
      .pluck('key')
      .value();
    let tail = _.last(this.textMap).key;
    return `${head.join(', ')} & ${tail}`;
  }
}
