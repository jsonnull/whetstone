var path = require('path')
var gutil = require('gulp-util')
var through = require('through2')
var whetstone = require('whetstone-transform')

module.exports = function (opts) {
  opts = Object.assign({}, opts)

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-whetstone', 'Streaming not supported'))
      return
    }

    try {
      var map = whetstone.transform(file.contents.toString())

      var json = '{ "references": ' + JSON.stringify(map, null, '  ') + '}'

      file.path = file.path.replace(/\.js$/, '.json')

      file.contents = Buffer.from(json, 'utf8')

      this.push(file)
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-whetstone', err, {
        fileName: file.path,
        showProperties: false
      }))
    }
  })
}
