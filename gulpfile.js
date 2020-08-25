var gulp = require('gulp');
var deck_gulp = require('@salespreso/deck-gulp-tasks');

deck_gulp(gulp, {
    src: "src/",
    dist: "dist/",
    docs: true,
    excludes: [
      "js/external/amcharts4/*.js",
      "js/external/amcharts4/**/*.js",
      "sections/**/*.js",
      "slide.js",
      "templates/**/*.js"
    ],
    htmlExcludes: [
      "partials/**.*",
      "**/partials/**/*.*"
    ],
    autoprefixCss: true,
    autoprefixerOptions: { grid: true },
    logInjections: false,
    nunjucks: true,
    notifications: {
      "error": true,
      "success": true,
      "sounds": true
    }
});
