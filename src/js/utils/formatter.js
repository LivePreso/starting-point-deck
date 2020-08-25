var Formatter = function(options) {
  this.options = options;
};

Formatter.prototype.fancyPercent = function() {
  return function(value) {
    if (value) {
      var sign = value >= 0 ? '+' : '';
      return sign + value + '%';
    } else {
      return '—';
    }
  };
};

Formatter.prototype.percentage = function() {
  return function(value) {
    return Number(value) + '%';
  };
};

Formatter.prototype.scale = function() {
  return function(val) {
    return `scale(${val})`;
  };
};

Formatter.prototype.pixels = function() {
  return function(value) {
    return Number(value) + 'px';
  };
};

Formatter.prototype.decimalPlaces = function(decimals) {
  return function(value) {
    return Number(value).toFixed(decimals || 1);
  };
};

Formatter.prototype.localeNumber = function(locale) {
  return function(value) {
    if (value % 1 != 0)
      return Number(value).toLocaleString(locale, { minimumFractionDigits: 2 });
    return Number(value).toLocaleString(locale);
  };
};

Formatter.prototype.shortYears = function() {
  return function(value) {
    return value + ' yrs';
  };
};

Formatter.prototype.bigMoney = function(locale, currency, options) {
  var localoptions = _.defaults(_.clone(options), { floor: true });
  var format = function(value) {
    if (localoptions.floor) value = Math.floor(value);
    var formattedNumber = this.localeNumber(locale)(value);
    if (value < 0) {
      return '- ' + (currency || '$') + (formattedNumber + '').substr(1);
    }
    return (currency || '$') + formattedNumber;
  };
  return format.bind(this);
};

Formatter.prototype.shortMoney = function(currency) {
  var format = function(value) {
    var val = Math.round(value / 1000);
    var fig = 'k';
    if (val >= 1000) {
      val = this.decimalPlaces(1)(val / 1000);
      fig = 'm';
    }
    return (currency || '$') + val + fig;
  };
  return format.bind(this);
};

Formatter.prototype.textToBullets = function(currency) {
  var format = function(value) {
    var html = '';
    var formattedContent = value;

    // trim whitespace from beginning and end
    formattedContent = formattedContent.trim();

    // split by <div> tags
    formattedContent = formattedContent.split(/<div>/);
    // using "contentEditable" element means all content is put into
    // new "div" elements, therefore we...
    // remove all opening and closing divs
    _.each(formattedContent, content =>
      content.replace(/((<div>)|(<\/div>))/gi, '')
    );
    // formattedContent = formattedContent.replace(/((<div>)|(<\/div>))/gi, '');

    // remove empty array values
    formattedContent = _.compact(formattedContent);

    // if there is content we loop over the array.
    if (!_.isEmpty(formattedContent)) {
      _.each(formattedContent, function(item) {
        // if we find asterisks
        if (item.indexOf('*') > -1) {
          html += '<ul class="list-formatted-content">';

          // split this item by the asterisks to generate our list...
          var itemList = item.split(/\* |\*/);
          // remove empty array values
          itemList = _.compact(itemList);

          _.each(itemList, function(listItem) {
            html += '<li>' + listItem + '</li>';
          });

          html += '</ul>';
        } else {
          html += '<div>' + item + '</div>';
        }
      });
    }

    return html;
  };
  return format.bind(this);
};

Formatter.prototype.kebabToCamel = function() {
  return function(value) {
    var str = value.toString();
    var arr = str.split('-');
    return _.reduce(
      arr,
      (camel, word, idx) => {
        if (idx > 0) {
          // Capitalise first letter
          word = word[0].toUpperCase() + word.slice(1);
        }

        return (camel += word);
      },
      ''
    );
  };
};

Formatter.prototype.snakeToKebab = function() {
  return function(value) {
    var str = value.toString();
    return str.replace(/_/g, '-');
  };
};

Formatter.prototype.slugify = function() {
  return function(value) {
    var str = value.toString();
    return str
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };
};

Formatter.prototype.keyToDisplay = function() {
  return function(value) {
    if (!value) return '';
    let str = value.toString();
    str = str.replace(/_/g, ' ');
    return str[0].toUpperCase() + str.slice(1);
  };
};

Formatter.prototype.translate = function(xyPlane) {
  return function(value) {
    var plane =
      xyPlane && typeof xyPlane === 'string' ? xyPlane.toUpperCase() : '';
    return `translate${plane}(${Number(value)}px)`;
  };
};

Formatter.prototype.scale = function() {
  return function(value) {
    return `scale(${Number(value)})`;
  };
};

var formatter = new Formatter();
