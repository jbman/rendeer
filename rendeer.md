# Rendeer

Rendeer is a content rendering engine.

Rendeer is "No CMS" - it doesn't manage content. 

Content is placed in [markdown](http://daringfireball.net/projects/markdown/) text files. A markdown file is rendered to HTML inside the browser using javascript.

## Rendeer uses this libraries to pull the sleigh
* [jQuery](http://jquery.com/) acceses the DOM and reads the markdown files with AJAX calls.
* [Showdown](http://attacklab.net/showdown/) renders markdown. Library is maintained on [github.com/coreyti/showdown](https://github.com/coreyti/showdown).
* [Skeleton](htt://getskeleton.com) provides the CSS for this HTML page

## Why Reender?
* Cou can write markdown instead of HTML.
* No manual conversion needed. A file is ready to be viewed as soon as it is written.
* Only a file server is needed to serve your content. The browser does the hard work (javscript execution).

## Why not?
* Probably not very SEO friendly to have unlinked markdown files lying around
* When javascript is turned off the site won't be very usable. Links will open the pure markdown files.





