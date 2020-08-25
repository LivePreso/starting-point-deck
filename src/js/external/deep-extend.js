var deepExtend = function(out) {
  out = out || {};

  for (var i = 1, len = arguments.length; i < len; ++i) {
    var obj = arguments[i];

    if (!obj) {
      continue;
    }

    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      // based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        out[key] = deepExtend(out[key], obj[key]);
        continue;
      }

      out[key] = obj[key];
    }
  }

  return out;
};

_.mixin({ deepExtend: deepExtend });

/*
 * "My" Mocha tests (from https://gist.github.com/anvk/cf5630fab5cde626d42a)
describe('deepExtend()', function() {
  it('main tests', function() {
    var testCases = [
      {
        input: [{}],
        expected: {}
      },
      {
        input: [{}, { key1: 'value1' }],
        expected: { key1: 'value1' }
      },
      {
        input: [{}, null, { key1: 'value1' }],
        expected: { key1: 'value1' }
      },
      {
        input: [{}, undefined, { key1: 'value1' }],
        expected: { key1: 'value1' }
      },
      {
        input: [{ key1: 'INIT' }, { key1: 'value1' }],
        expected: { key1: 'value1' }
      },
      {
        input: [{ key1: 'INIT', key2: 'value2' }, { key1: 'value1' }],
        expected: { key1: 'value1', key2: 'value2' }
      },
      {
        input: [{ key2: 'value2' }, { key1: 'value1' }],
        expected: { key1: 'value1', key2: 'value2' }
      },
      {
        input: [{ key2: 'value2', key3: {} }, { key1: 'value1' }],
        expected: { key1: 'value1', key2: 'value2', key3: {} }
      },
      {
        input: [{ key2: 'value2', key3: { keyA: 'valueA' } }, { key1: 'value1', key3: { keyB: 'valueB' } }],
        expected: { key1: 'value1', key2: 'value2', key3: { keyA: 'valueA', keyB: 'valueB' } }
      },
      {
        input: [{ key2: 'value2', key3: { keyA: 'valueA', keyB: 'INIT' } }, { key1: 'value1', key3: { keyB: 'valueB' } }],
        expected: { key1: 'value1', key2: 'value2', key3: { keyA: 'valueA', keyB: 'valueB' } }
      },
      {
        input: [{ key2: 'value2', key3: [1, 2, 3] }, { key1: 'value1', key3: [4, 5, 6] }],
        expected: { key1: 'value1', key2: 'value2', key3: [4, 5, 6] } // array values will be overwritten
      }
    ];
    _.each(testCases, function(testCase) {
      expect(deepExtend.apply(undefined, testCase.input)).to.deep.equal(testCase.expected);
      expect(testCase.input[0]).to.deep.equal(testCase.expected);
    });
  });
  it('extend with Array', function() {
    var testCases = [
      {
        input: [{}, { key:[] }, {}, { key: [1, 2, 3] }],
        expected: { key: [1, 2, 3] }
      }
    ];
    _.each(testCases, function(testCase) {
      var result = deepExtend.apply(undefined, testCase.input)
      expect(result).to.deep.equal(testCase.expected);
      expect(result.key.length).to.exist;
    });
  });
});
 *
**/
