module.exports = {
  "serve": function(config, port, directory) {
    var express = require('express'),
        colors = require('colors'),
        path = require('path'),
        faker = require('faker'),
        app = express(),
        dir = process.cwd(),
        _ = require('underscore');

    var timestamp = function() {
      var d = new Date();
      return "["+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+":"+ d.getMilliseconds()+"]";
    }
    if (directory) {
      dir = path.join(process.cwd(), directory);
    }

    app.get('*', function(req, res) {
      var file = req.params[0];
      var conf = _.where(config.routes, { "route": file });
      if (conf.length > 0) {
        conf = conf[0];
        console.log(timestamp(), colors.green("\t[200]"), file);
        var fakedArr = [];
        var reps = conf.repeat || 1;
        for (var i = 0;i < reps;i++)
          fakedArr.push(JSON.parse(faker.fake(JSON.stringify(conf.data))));

        res.json(fakedArr);
      } else {
        res.sendFile(path.join(dir, file), {}, function(err, data) {
          if (err) {
            res.status(404).send("File not found.");
            console.log(timestamp(), colors.red("\t[404]"), "File not found " + path.join(dir, file));
          } else {
            console.log(timestamp(), colors.green("\t[200]"), file);
          }
        });
      }

    });
    app.listen(port);
  }
}
