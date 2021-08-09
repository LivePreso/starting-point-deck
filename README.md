<!-- @format -->

# {{ Deck name }}

This is a LivePreso deck for {{ Client name }}

This is based off of the default starting point deck 🃏, utilising ES6 & class-based Javascript.

Docs: https://developers.salespreso.com/

##### Build tools

1. [Installation and build](#installation-and-build)
2. [deck-gulp-tasks](#deck-gulp-tasks)
3. [Default library inclusions](#default-library-inclusions)
4. [Lodash vs. Underscore](#lodash-vs-underscore)
5. [ES6 compilation](#es6-compilation)
6. [Editor config](#editor-config)

##### Getting started

1. [Deck fundamentals](#deck-fundamentals)

##### Uploading deck versions:

1. [Git tags](#git-tags)

##### Testing

1. [Acceptance criteria](#acceptance-criteria)

---

# Build tools

## installation and build

1. Install the Developer CDK
   https://developers.salespreso.com/docs/cdk/sections/installation.html

2. Ensure node version >= 10

3. Install gulp globally: `npm install gulp -g`

4. Install yarn globally: `npm install yarn -g`
5. Build the node_modules: `yarn`
6. Run `gulp` to compile the dist directories and set up a watcher for both the deck and docs

7. Now boot up the Developer CDK, browse to your deck's project.yaml file and select it. You should be able to see the slides.
8. Check the `test_data` directory for test data context you can use!

**You're now ready to go! :partying_face:**

### Build for upload

```
gulp build --target=production
```

---

## deck-gulp-tasks

This project allows you to compile your LivePreso deck projects.

Features include:

- ES6 compilation of hooks and deck.js
- Sass compilation
- Nunjucks compilation
- HTML inject
- Watcher etc.

See the deck-gulp-tasks NPM package page for more information on the available features:
https://www.npmjs.com/package/@salespreso/deck-gulp-tasks

## Default library inclusions

The following libraries are available to the deck by default - deck.js and individual slide.js files. You do not need to import or add these libraries to your deck, any libraries outside of this list will need to be added to `src > js` for compilation into the common deck.js file by gulp.

- jQuery
- underscore.js
- moment.js

The following libraries can be imported into hooks files:

- lodash.js
- moment.js

The following libraries are passed to fieldsets as options:

- moment
- superagent

## Lodash vs. Underscore

Lodash and underscore are both available to the deck, however, due to versioning limitations each library is restricted to particular components of the deck.

Lodash.js:

- Hooks - fieldsets, selections etc.
  (https://developers.salespreso.com/docs/cdk/sections/guides/hooks/index.html)

Underscore.js:

- deck.js
- Individual slide.js files

## ES6 compilation

ES6 compilation is run on hooks files (fieldsets, selections etc.) and deck.js, but not slides' slide.js files. For the majority of functionality this isn't a problem as modern browsers support a lot of the functionality we like to use, however, there are a couple that can trip you up.

The app shell provided to Carsales uses Chromium 83.0.4103.116, use this version number when checking the compatibility of ES6 features.

If you are unsure, make sure to break components out into js files that will be compiled into deck.js, and keep the bare minimum in your individual slide.js files.

## Editor Config

We recommend using the following plugins:

- EditorConfig
- ESLint
- Prettier
  These will ensure code consistency between collaborators.

---

# Getting started

## Deck fundamentals

### CSS

The deck utlilises the [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) SCSS naming scheme, to clearly distinguish between unique component classes, layout (mostly variations on flexbox) and utility ones that are used throughout the deck.

### JavaScript

#### Slide class

Rather than defining and attaching `onRendered` and `onReady` events to the current slide's DOM element, the deck makes use of a Slide class that wraps much of this functionality in a cleaner structure. This can optionally define event listeners for the above events (and others, such as `onSubslideChange` and `onClosed`).

#### BridgeState class

Rather than manually adding unique client / master Bridge listeners to handle interactions in the context of a RemotePreso, the deck uses a class (BridgeState) to seamlessly handle state changes, either at a whole-slide level (ie. each Slide class has a BridgeState) or within individual components (Forms, Accordians, Disclaimers). By utilising update handlers, it provides a simple, consistent means to maintain visual state across both master and client, transparently, greatly reducing the amount of boilerplate code that needs to be written.

---

# Uploading deck versions

## Git tags

When it comes to troubleshooting and testing, we have found tagging the relevant git commit with the server and deck version of each upload to be invaluable. This has allowed us to very quickly ascertain which commit relates to which deck version.

We recommend following the pattern `<server>-v<dv>`. For example, the commit uploaded as deck version 23 on production would be tagged `production-v23`.

---

# Testing

## Acceptance criteria

- Create a preso in the LivePreso app and follow the supplied [Testing Checklist](https://developers.salespreso.com/docs/cdk/sections/reference/testing_checklist.html), ensure all features and modes behave as expected
