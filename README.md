WordPress Grunt Starter Theme
=============================

A simple blank [WordPress](http://wordpress.org/) starter theme intended to use with [Grunt](http://gruntjs.com/). It is a solid flexible base, and gives you an efficient workflow since all the necessary stylesheets and scripts are compiled automatically by just one command in the console.

Features
--------

* blank WordPress theme with 1 nav menu and 1 sidebar predefined
* sticks to current WordPress guidelines
* preconfigured Gruntfile for efficient development (creates production CSS, JavaScript and POT file for translation)
* comes with a lightweight version of [Bootstrap](http://getbootstrap.com/) (not much more than reset and grid system), however it can be replaced or removed if necessary
* by default uses [LESS](http://lesscss.org/) syntax for stylesheet development, but can easily be switched to [SASS](http://sass-lang.com/) (by uncommenting a few lines and commenting out a few others)
* refreshes the theme's `style.css` header automatically

Getting Started
---------------

To enjoy the full advantages of this starter theme, you should know how to use the console.
You don't necessarily need to know how to use [Grunt](http://gruntjs.com/), but it will be easier if you already do.

The very first thing you should do is to open `package.json` and change all the field values in there to those of your choice. For example, put your theme slug as `name` and your theme name as `themeName`. The other fields should be as self-explanatory as these two are. It is important that you fill out every field except those under `engine` and `devDependencies` (which should not be changed). When you're done, save the file.

To get started with Grunt, you need to have [Node.js](http://nodejs.org/) installed on your system. Then, in Terminal, `cd` into the directory where the WordPress starter theme is located. Type `npm install` - if you successfully installed Node.js, some files should be downloaded, and a new folder named `node_modules` should appear. It contains the tools Grunt uses, and it also contains Grunt itself. Now you have everything installed. Still in Terminal, type `grunt theme-init`. This will run the tasks to initialize your theme correctly - which means all files are generated for the first time, and the slugs, class names, constant names and such in all the files (which are called something like 'mywptheme' by default) will be automatically changed to those you specified in the `package.json`. The theme header in `style.css` is refreshed too.

Now let's get into business: The stylesheets and scripts you should edit yourself are `assets/dev/style.less` and `assets/dev/scripts.js`. The files located in `assets/dist/` will be regenerated everytime you run grunt, so DO NOT EDIT THESE. The theme's `style.css` is only used for the theme header (since WordPress requires it), but you should not use it as an actual stylesheet.

The default procedure you will be using over and over is the following: Everytime you would like to preview your changes (whether it is stylesheets or scripts), simply type `grunt` into Terminal (again, of course, inside your theme folder). This compiles and regenerates the required files.

* A tiny hint: * If you want to regenerate the new translation file (a .pot file located in `languages/`), you should type `grunt theme-refresh` into Terminal.

How To Use SASS instead of LESS
-------------------------------

To use [SASS](http://sass-lang.com/) instead of [LESS](http://lesscss.org/), first create a new file called `style.scss` in `assets/dev/`. Then open and edit `Gruntfile.js`. You need to uncomment the three bits of code concerning SASS, and then comment out the same three bits of code concerning LESS (they are always located directly above the SASS code). Save, and that's it!

Of course you won't be able to use Bootstrap like before with SASS since it's written with LESS (however you can still get a [SASS version](http://getbootstrap.com/getting-started/#download), but I bet you already know some other great frameworks that work with SASS.

Contributions
-------------

If you have ideas on how the WordPress Grunt Starter Theme could be improved, feel free to [raise an issue](https://github.com/felixarntz/wordpress-grunt-starter-theme/issues) or [send a pull request](https://github.com/felixarntz/wordpress-grunt-starter-theme/pulls). But please remember that this is supposed to be a simple starter theme, so let's not bloat it up with cool functionality which some people will not need. But, especially regarding Grunt, I'm excited for your ideas.
