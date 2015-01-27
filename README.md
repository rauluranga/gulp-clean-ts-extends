gulp-clean-ts-extends
=====================

[![npm version](https://badge.fury.io/js/gulp-clean-ts-extends.svg)](http://badge.fury.io/js/gulp-clean-ts-extends)

[grunt-clean-ts-extends](https://github.com/mihhail-lapushkin/grunt-clean-ts-extends) ported to gulp!.

If you first compile all your TypeScript sources and then concatenate them into one file you might get quite a lot of __extends declarations. This plugin leaves the first one and removes all following.

Works only with non-minified JavaScript!

## Installation
```
  npm install gulp-clean-ts-extends --save
```
## Usage

```javascript
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleants = require('gulp-clean-ts-extends');

gulp.task('scripts', function() {
    var tsResult = gulp.src('lib/*.ts')
                       .pipe(sourcemaps.init())
                       .pipe(ts({
                           sortOutput: true,
                           // ...
                       }));

    return tsResult.js
                .pipe(concat('output.js'))
                .pipe(cleants()) // remove all __extends declarations except the first one
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('release/js'));
});
```
## Tests
```
  npm test
```

