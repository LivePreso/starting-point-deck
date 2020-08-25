class Source {
  /**
   *
   * @param {Slide} slide
   * @param {Object} options
   * @param {Object} options.container - where to inject the source
   * @param {String} options.sourceText - The text to show when the source is visible
   */
  constructor(slide, options) {
    this.container = options.container;
    this.slide = slide;
    this.textMap = options.textMap;
    this.open = false;
    this.state = new BridgeState(
      this,
      this.slide.id + (options.key || '') + '-sourceState',
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
