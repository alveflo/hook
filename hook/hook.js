'use strict';

function hook() {
}

hook.prototype = {
  paths: {}
}

hook.prototype.on = function(path, file, repetition) {
  var fs = require('fs');
  var ref = this;
  if (ref.paths.hasOwnProperty(path)) {
    console.log("Path " + path + " already defined!");
    return ref;
  }
  var reps = 1;
  if (repetition) {
    reps = repetition;
  }
  ref.paths[path] = {
    "file": file,
    "repetition": reps
  };
  return ref;
};

hook.prototype.serve = function(port, directory) {
  function init(paths) {
    var fs = require('fs');
    var express = require('express');
    var colors = require('colors');
    var path = require('path');
    var faker = require('faker');
    var app = express();
    var dir = process.cwd();
    var timestamp = function() {
      var d = new Date();
      return "["+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+":"+ d.getMilliseconds()+"]";
    }
    if (directory) {
      dir = path.join(process.cwd(), directory);
    }

    app.get('*', function(req, res) {
      var file = req.params[0];
      if (paths.hasOwnProperty(file)) {
        var repetition = paths[file].repetition;
        var file = paths[file].file;
        fs.readFile(path.join(dir, file), 'utf8', function(err, data) {
          if (err) {
            res.status(404).send("File not found.");
            console.log(timestamp(), colors.red("[404]"), "File not found " + path.join(dir, file));
          } else {
            var fakedData = "";
            for (var i = 0;i < repetition; i++) {
              if (i > 0) fakedData += ", "
              fakedData += faker.fake(data);
            }
            fakedData = "[" + fakedData + "]";
            res.send(fakedData);
            console.log(timestamp(), colors.green("[200] "), file);
          }
        });
      } else {
        res.sendFile(path.join(dir, file), {}, function(err, data) {
          if (err) {
            res.status(404).send("File not found.");
            console.log(timestamp(), colors.red("[404]"), "File not found " + path.join(dir, file));
          } else {
            console.log(timestamp(), colors.green("[200] "), file);
          }
        });
      }
    });
    app.listen(3000);
  }

  init(this.paths);
}

module.exports = function() {
  return new hook();
}
