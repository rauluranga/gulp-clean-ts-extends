
var gutil = require('gulp-util');
var through = require('through2');
var rs = require('replacestream');

module.exports = function () {
  return through.obj(function (file, enc, cb) {

    var extendsCodeSnippet = 
      'var __extends = this.__extends || function (d, b) {\n' +
      '    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n' +
      '    function __() { this.constructor = d; }\n' +
      '    __.prototype = b.prototype;\n' +
      '    d.prototype = new __();\n' +
      '};';

    var counts = 0;
    var doReplace = function(match) {
      return ++counts > 1 ? "\n\n\n\n\n" : match;  //dumb fix to support sourcemaps
    }

    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(rs(extendsCodeSnippet, doReplace));
      cb(null, file);
      return;
    }

    try {
      file.contents = new Buffer(String(file.contents).replace(/var __extends =(.+\n)*};/g, doReplace));
      this.push(file);

    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-clean-ts-extends', err, {fileName: file.path}));
    }
    cb();
  });
};