var replacePlugin = require('../');
var fs = require('fs');
var es = require('event-stream');
var path = require('path');
var should = require('should');
var gutil = require('gulp-util');
require('mocha');

describe('gulp-replace', function() {
  describe('replacePlugin()', function() {

    it('should replace string on a stream', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/sample.js',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.createReadStream('test/fixtures/sample.js')
      });

      var stream = replacePlugin('world', 'person');
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        newFile.contents.pipe(es.wait(function(err, data) {
          should.not.exist(err);
          data.should.equal(fs.readFileSync('test/expected/sample.js', 'utf8'));
          done();
        }));
      });

      stream.write(file);
      stream.end();
    });

    it('should replace string on a buffer', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/sample.js',
        cwd: 'test/',
        base: 'test/fixtures',
        contents: fs.readFileSync('test/fixtures/sample.js')
      });

      var stream = replacePlugin();
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        String(newFile.contents).should.equal(fs.readFileSync('test/expected/sample.js', 'utf8'));
        done();
      });

      stream.write(file);
      stream.end();
    });
  });
});
