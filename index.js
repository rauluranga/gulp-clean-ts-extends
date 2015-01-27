
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


    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      var counts = 0;
      file.contents = file.contents.pipe(rs(extendsCodeSnippet, 
        function(match) {
          return ++counts > 1 ? "" : match;
        }
      ));
      cb(null, file);
      return;
    }

    try {

      var fileContents = file.contents.toString();

      var firstOccurrence = fileContents.indexOf(extendsCodeSnippet) + 1;
      var i;
      
      while ((i = fileContents.indexOf(extendsCodeSnippet, firstOccurrence)) >= 0) {
        fileContents = fileContents.substring(0, i) + fileContents.substring(i + extendsCodeSnippet.length, fileContents.length);
      }
      file.contents = new Buffer(fileContents);
      this.push(file);

    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-clean-ts-extends', err, {fileName: file.path}));
    }
    cb();
  });
};