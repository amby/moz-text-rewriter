Text Rewriter
=============

A small Firefox plugin to rewrite customizable patterns in a page as something else.
Created mostly for personal amusement, inspired by [XKCD #1288](http://xkcd.com/1288/).
By default this provides a "mispell" -> "misspell" replacement.

The plugin supports any Javascript regular expressions, including using
backrefs and captures. We just visit the visible text nodes on the page and use
nodeValue.replace for each provided pattern. This means if there is an
overlapping pair of patterns A -> B and B -> C, then A - > C is shown.

[Install the latest release](https://github.com/pelmers/moz-text-rewriter/releases)
