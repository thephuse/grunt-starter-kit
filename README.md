Front-end Starter Kit
=====================

The Front-end Starter Kit is a skinny collection of GruntJS modules that:

- Compile SCSS & SASS build using [Compass](http://compass-style.org), to plain CSS.
- Compile CoffeeScript & JavaScript built using [Browserify](http://browserify.org), to plain JavaScript.
- Optionally minify the compiled CSS and JavaScript, *OR*
- Watch for changes to the source files, re-compile the unminified versions and update the browser on-the-fly.

---

## 1. What platform is this for?

This repo is keyed towards Wordpress developers, and contains some PHP functions & features and Gruntfile directory specifications that won't be relevant to other platforms.

However, the Gruntfile.js can easily be edited to adapt it to any system of your choice.

---

## 2. Setup instructions

### 1. Prerequisites

- [Node.js](http://nodejs.org)
- [Ruby](http://ruby-lang.org)

Install the above dependencies using the binaries of your choice. Latest versions recommended, but Ruby 1.9+ and Node.js 1.10+ should work just fine.

### 2. Installation

- Open a terminal or command prompt window
- `npm install -g grunt-cli`
- `gem install compass`
- `npm install`

---

## 3. Running the script

- From the same folder as your Gruntfile.js, run:
   - `grunt build` to build once & minify JavaScript.
   - `grunt` to initiate a continuous build without minifying JavaScript. This will watch for changes and automatically update the browser without the need to refresh.

---

## 4. Changing theme path variables and live reload port numbers

You'll find the `path` and `port` variables at the beginning of the Gruntfile.

- Change `path` to reflect the absolute or relative path to the theme's directory.
- Change the `port` number if running multiple instances of the build script, or if you chance upon a port conflict.

---

## 5. Browserify and Compass

- Separate your JavaScript and CoffeeScript files into modules using Browserify.
   - Use the `require('foo')` function or the `var foo = require('foo')` declaration to include a dependency. You need not include the file extension for JavaScript, however you'll need it should you add a `.coffee` (or similar) extension to your CoffeeScript files.
- Chunk your SASS and SCSS into modules using the `@import` directive in `app.{sass,scss}`.

---

## 6. Compiled theme file hierarchy

```
theme
|
├── dist
|   └── css
|       └── app.css
|   └── js
|       └── app.js
|       └── app.min.js
|
├── src
|   └── sass
|       └── *
|           └── _*.{scss,sass}
|       └── app.{scss,sass}
|   └── js
|       └── *
|           └── *.{coffee,js}
|       └── app.{coffee,js}
|
└── functions.php
```

Please note that all SCSS/SASS module file names should begin with an underscore (`_`). This prevents them from compiling to separate files in the `theme/dist` folder, and allows Compass and custom mixins to be used globally.

app.{coffee,js} and app.{scss,sass} should be as uncluttered as possible. Ideally, these will simply include other files, using `@import` for SCSS and `require()` for JS, by way of example.

Please see the section on routing below for details on using page.js to clean up your app.js file.

---

## 7. JavaScript switchboard for Wordpress and other CMS

Switchboard (AKA synchronous routing) logic for CMS front-ends can be built using `page.coffee`, included in the `theme/src/js/helpers` folder.

The Page function can be required as a CommonJS/Browserify module, or used standalone as `Page()`. It expects at least one argument: an object detailing page classes to check for, and an array of functions to invoke on each page.

It accepts a DOM node as a second argument, lest the `<body>` element not receive the class name required by the router.

#### Example usage:

``` javascript
// Page.js
var page = require('helpers/page');

// Module dependencies
var foo  = require('modules/foo');
var bar  = require('modules/bar');
var bat  = require('modules/bat');
var all  = require('modules/all');

page({
  'foo' : [foo],
  'bar' : [foo, ['bar', 'arg0', 'arg1']], // Note arguments
  'bat' : [[bat, 1, foo]],
  '*'   : [all]
});
```

- Pass a single-dimensional array to define a function or a list of functions.
	- In this example, `body.foo` invokes `foo()`.
- Pass a multi-dimensional array to define a function or a list of functions with arguments.
	- In the above example, `body.bar` invokes `foo()` and `bar('arg0', 'arg1')`.
	- `body.bat` invokes `bat(1, foo)` (passing function foo to bat).
- Use the `'*'` route to define functions to invoke on all pages.
	- In the example, all pages will invoke the `all()` function.

---

## 8. Wordpress functions.php

Included with this build script is a Wordpress functions.php file with some basic hooks in place to detect whether the site is in debug mode and load the livereload script and uncompressed JavaScript conditionally.

Set `define('WP_DEBUG', true)` in the site's `wp-config.php` and refresh the site once, to invoke the live reload script on all pages.

Set `define('WP_DEBUG', false)` after invoking a `grunt build` to set the site to read the minified versions of the scripts and remove the live reload behaviour from the site.

**N.B. Never release a Wordpress site with WP_DEBUG set to true.**