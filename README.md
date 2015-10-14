# Phuse Grunt Starter Kit

## A platform-agnostic launchpad for your projects

### 1. Contents

- [Grunt](http://gruntjs.com/)
- [Stylus](https://learnboost.github.io/stylus/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Babel](https://babeljs.io/)
- [Grunt SFTP Deploy](https://github.com/thrashr888/grunt-sftp-deploy)
- [Twig](http://twig.sensiolabs.org/)
- [Grunt Watch and Live Reload](https://github.com/gruntjs/grunt-contrib-watch)
- [Webpack](https://webpack.github.io/)
- [ESDoc](https://esdoc.org/)

All of the above tasks (aside from Grunt itself) are run via Grunt. They can be run individually, if so desired (see `gruntfile.js`), or they can be grouped in cumulative tasks listed in the Quick-Start Guide below.

In theory, Grunt can be hauled out and replaced with any node.js-based build system, but Grunt has proven to be stable and performant for the purposes of this Starter Kit, so it's the de facto choice for development.

We use modular, classical ES2015 for all front-end JavaScript development work unless we're not allowed to, for any reason. Please bear this in mind when using this Starter Kit. The Babel Loader has been include in the Webpack Grunt task. It is up to you to decide what level of bleeding edge features you wish to use, but a good rule of thumb is to try to keep it as close to the [ECMA-262](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf) standard as possible, to ensure forwards-compatibility.

### 2. Quick-Start Guide

- Download and install [node.js](http://nodejs.org) or [io.js](http://iojs.org)
- Pull this git repo
- Open a terminal window
- `npm install` - Installs all package dependencies
- `grunt` - Builds and watches
- `grunt dist` - Builds and minifies
- `grunt stage` - Builds, minified and deploys. See below for more information.

### 3. Folder Structure

Files and folders have been arranged so as to maintain clear separation of the front-end stack, composability, reasonability, and compatibility with multiple CMS (e.g. we use Twig, which is incredibly powerful, works in Wordpress with Timber, as well as Drupal 8, and can easily be retrofit into ExpressionEngine).

Please check out the repo and have a look at `twig/index.twig`, `js/app.js` and `styl/app.styl` respectively, as well as the subfolders contained within their directories, to gain a good and easy-to-grok overview of the file and folder structure.

### 4. Live Reload

To enable live reload, add the line:
```
<script src="http://localhost:8001/livereload.js"></script>
```
To your HTML files. This is best done using a single master Twig [layout](http://twig.sensiolabs.org/doc/tags/extends.html), so that it propagates to all the pages of your site. Using Live Reload is a lightweight, fully automated solution to your having to manually reload open pages in each of your open browsers, when a file is updated.

Use the `grunt` command once you've done so, to kickstart Live Reload after an initial build.

### 5. Configuration

The `src/config` folder should contain only JSON files that can be used as configuration variables, both in JavaScript (using `include` statements) and in the `grunt-twig-render` task (the file location can be specified under `twigRender.static.files.data` in `gruntfile.js`).

### 6. Documentation

Please write JavaScript documentation according to [ESDoc](https://esdoc.org/) standards, and generate it using `esdoc`. JavaScript should be fully documented in order to reduce technical debt and increase readability, and for that purpose, ESDoc provides a coverage report.

### Appendix A: Ignored Files

By default, the `.gitignore` in this repo ignores all NPM package dependency files and operating system shrapnel. It also ignores files in the `dist` directory, as `dist` files ought not to be committed.

### Appendix B: SFTP Deploy

A task named `grunt-sftp-deploy` has been included. It's for deploying work to servers that do not allow direct SSH access and/or prevent Git from being installed. Please refer to [this documentation](https://github.com/thrashr888/grunt-sftp-deploy) about creating an `.ftppass` file to store usernames and passwords.

### Appendix C: Testing

Testing and coverage frameworks have been deliberately excluded from the Starter Kit to promote developer eccentricity and adaptability. Pick a test framework that works for you and a coverage kit that plays nicely with ECMAScript 2015.
