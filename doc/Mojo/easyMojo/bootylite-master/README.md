Bootylite - a simple file system based blog
===========================================

> **No trackbacks, no comments (in core), no admin interface.  
> Just plain file based blogging with a feed and extra pages.**

After vti's great Bootylicious becoming unmaintained this is the next try
to build a simple file system based blog on Mojolicious.

And here's how it works:

* write articles as text files and store them in the `articles` directory.
* done.

Look at

1. the `articles` directory to see examples.
2. the `drafts` directory to see how to preview articles before publishing.
3. the `pages` directory to see examples for content pages.
4. the `bootylite.conf` file to change the Bootylite parameters.
5. the templates (`bootylite.pl inflate`) to customize Bootylite
6. the code.

The renderer for articles and pages is determined by the file name extension.
These renderers ship with Bootylite:

* .md -> Bootylite::Renderer::Markdown
* .html -> Bootylite::Renderer::HTML

It's easy to extend Bootylite to get more Renderers: just use
Bootylite::Renderer as a base class.

Plugins
-------

Plugin authors can inherit from Bootylite::Plugin to extend Bootylite's
functionality. Look at [Bootylite::Plugin::Comments][bpc] for an example.
You can find a simple (but useless) plugin in the test suite. Plugin
configuration lives in the `bootylite.conf` config file:

    plugins => {
        Comments => {
            comments_dir => app->home->rel_dir('comments'),
            encoding     => 'utf-8',
        },
    },

[bpc]: http://github.com/memowe/bootylite-plugin-comments

COPYRIGHT AND LICENCE
---------------------

Copyright (c) 2011-2013 Mirko Westermeier, mail@memowe.de

See the file `MIT-LICENSE` in this distribution for details.
