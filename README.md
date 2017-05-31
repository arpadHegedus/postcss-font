A [PostCSS] plugin to add font related properties in one line.

[PostCSS]: https://github.com/postcss/postcss
[Gulp]: https://github.com/gulpjs/gulp

## Installation

```js
npm install postcss-font
```

## Example

```css
body {
    // font: {font-size}
    font: 13px, 1.5, bold, italic, center, red
}
```

will produce

```css
body {
    font-size: 13px;
    line-height: 1.5;
    font-weight: bold;
    font-style: italic;
    text-align: center;
    color: red;
}
```

Note: still allows you to use the font shorthand normally, a valid shorthand won't be converted (eg: font: 14px/1.5 Arial will stay that)

## Usage

Using [Gulp].

```js
var gulp            = require('gulp'),
    postcss         = require('gulp-postcss'),
    font            = require('postcss-font');

gulp.task('css', function() {
    gulp.src('path/to/dev/css').
        .pipe(postcss({
            // use it after nesting plugins
            font
        }))
        .pipe(gulp.dest('path/to/build/css'));
});

// rest of the gulp file
```

