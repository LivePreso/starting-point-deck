module.exports = {
  rules: {
    'camelcase': 'off',
    'func-names': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'spaced-comment': 'off',
    'vars-on-top': 'off',
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'max-lines': ['warn', 350]
  },
  globals: {
    Bridge: true,
    $: true,
    _: true,
    moment: true,
    Promise: true,
    System: true,
    jQuery: true,
    AmCharts: true,
    deckBaseURL: true
  }
};
