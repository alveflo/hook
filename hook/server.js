module.exports = {
  "serve": function(config, port, directory) {
    var express = require('express'),
        colors = require('colors'),
        fs = require('fs');
        path = require('path'),
        faker = require('faker'),
        app = express(),
        dir = process.cwd(),
        watcher = require("./watcher.js");
        _ = require('underscore'),
        cheerio = require('cheerio');

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
        for (var i = 0;i < reps;i++) {
          fakedArr.push(JSON.parse(faker.fake(JSON.stringify(conf.data))));
        }

        res.json(fakedArr);
      } else {
        if (file.endsWith("/")) {
          file = fs.existsSync(path.join(dir, file + "/index.html")) ? file + "/index.html" : file + "/index.htm";
        }
        try {
          var html = fs.readFileSync(path.join(dir, file), 'utf8');
          var $ = cheerio.load(html);
          var scriptNode = "<script type=\"text/javascript\">var client = new WebSocket('ws://localhost:81');client.onmessage = function(msg) {if (msg.data == 'exit')location.reload(true);}</script>"
          $('body').append(scriptNode);
          console.log(timestamp(), colors.green("\t[200]"), file);
          res.send($.html());
        } catch (ex) {
          res.status(404).send("File not found.");
          console.log(timestamp(), colors.red("\t[404]"), "File not found " + path.join(dir, file));
        }
      }
    });
    app.listen(port);
    watcher(directory);
  }
}
