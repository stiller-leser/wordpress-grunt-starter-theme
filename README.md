WordPress Grunt Starter Theme
=============================

A simple blank [WordPress](http://wordpress.org/) starter theme intended to use with [YeoPress](https://github.com/wesleytodd/YeoPress), [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/). It is a solid flexible base, and gives you an efficient workflow since all the necessary stylesheets and scripts are compiled automatically whenever you change the source files. Of course you can also build them manually with one simple task.

Features
--------

* blank WordPress theme with 1 nav menu and 1 sidebar predefined
* sticks to current WordPress guidelines
* preconfigured Gruntfile for efficient development (creates production CSS, JavaScript and POT file for translation)
* by default uses [LESS](http://lesscss.org/)
* refreshes the theme's `style.css` header automatically
* comes with [Bootstrap](http://getbootstrap.com/)
* comes with [jQuery](http://jquery.com/)
* automatically makes embeds appear responsive in 16:9 aspect ratio; this behavior can easily be disabled
* ready to be used with YeoPress (automatic slug, text-domain and prefixing based on theme directory name)

Getting Started
---------------

To enjoy the full advantages of this starter theme, you should know how to use the console.
You don't necessarily need to know how to use [Grunt](http://gruntjs.com/), but it will be easier if you already do.

**If you are using YeoPress...**

...simply use this theme as the default theme when executing `yo wordpress`. The theme's slug, name and all prefixes inside the code will be automatically created based on what you entered as `themeDir` during the YeoPress configuration. Make sure that whatever you enter there is lowercase and without any whitespace.

That's it already! This theme is prepared for YeoPress so that grunt and bower are automatically setup. You don't need to do anything here.

Automatic File Processing
-------------------------

Now let's get into business: First, go into your theme's directory. The stylesheets and scripts you should edit yourself are `assets/dev/style.less` and `assets/dev/scripts.js`. The files located in `assets/dist/` will be regenerated everytime you run grunt, so DO NOT EDIT THESE. The theme's `style.css` is only used for the theme header (since WordPress requires it), but you should not use it as an actual stylesheet.

The default procedure you will be using over and over is the following: By simply typing `grunt` into Terminal, you enable `watch` mode. This means that whenever you save a modified file, it is automatically processed so that you instantly see your changes.

To build the files manually, enter `grunt build` into terminal. This will also refresh the theme header in `style.css` so that possible changes in your `package.json` are properly reflected. You can also build scripts and stylesheets independently from each other, by using `grunt scripts` or `grunt stylesheets`.

I know this theme...
--------------------

You are right. This work, like most of the README, is based on the great wp-starter-theme of Felix Arntz, that can be found @ https://github.com/felixarntz/wordpress-grunt-starter-theme . I modified this setup to match my needs, especially integrating git and environments to the Gruntfile.
