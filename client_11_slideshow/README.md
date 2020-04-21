# Slideshow

Here you have the basic "engine" to set up a web based slide show.
You have to provide the images.
Once you throw your collection of images into the same directory
with these files, you type "make" (or ./gen_html >index.html)
and you get the file index.html and away you go.

The gen_html program is a small ruby program that generates the
html, embedding the css and javascript in that file.
Once again, I avoid external css and javascript because
browser caching makes development impossible.
