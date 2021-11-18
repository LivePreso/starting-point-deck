var gulp = require('gulp');
var deck_gulp = require('@salespreso/deck-gulp-tasks');

deck_gulp(gulp, {
  src: 'src/',
  dist: 'dist/',
  docs: true,
  excludes: ['sections/**/*.js', 'slide.js', 'templates/**/*.js'],
  htmlExcludes: ['partials/**.*', '**/partials/**/*.*'],
  babelIgnore: [
    'src/js/components/00-1-core.js',
    'src/js/components/00-2-charts.js',
    'src/js/components/00-3-animated.js'
  ],
  autoprefixCss: true,
  autoprefixerOptions: { grid: true },
  logInjections: false,
  nunjucks: true,
  notifications: {
    error: true,
    success: true,
    sounds: true
  }
});
