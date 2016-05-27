module.exports = function() {
  var jsonfile = require('jsonfile');

  var config = {
    "routes": [
      {
        "route": "/users",
        "repeat": 10,
        "data": {
          "name": "{{name.firstName}}",
          "lastname": "{{name.lastName}}",
          "email": "{{internet.email}}"
        }
      },
      {
        "route": "/companies",
        "repeat": 3,
        "data": {
          "companyName": "{{company.companyName}} {{company.companySuffix}}",
          "catchPhrase": "{{company.catchPhrase}}"
        }
      }
    ]
  };
  jsonfile.writeFile('.cpthook.config', config, { spaces:2 }, function(err) {
    if (err) console.log(err);
  });
}
