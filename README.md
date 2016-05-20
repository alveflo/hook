<p align="center">
<img src="http://i.imgur.com/oz5mpCu.png?1"><br/>
<h1 align="center">Captain Hook</h1>
</p>
<p align="center">
<a href="https://travis-ci.org/victorzki/hook.svg?branch=master"><img src="https://travis-ci.org/victorzki/hook.svg?branch=master"></a>
<a href="https://badge.fury.io/js/cpthook"><img src="https://badge.fury.io/js/cpthook.svg"></a>
</p>

Portable api faker and random data generator built upon [Faker](https://www.npmjs.com/package/Faker). It serves both as a static file server from either the execution path or given directory.
## Install
```
$ (sudo) npm install cpthook
```
## Usage
```
hook().on(<path>, <json file path>, (opt: data repetitions))
hook().serve(<port>, (opt: static file directory))
```

## Example
#### Javascript
```javascript
var hook = require('cpthook');
// Example below feeds users.json on /users with 1 (standard) repetition,
// and documents on /documents with 25 repetitions. It also serves static files
// from /www directory.
hook().on('/users', '/<relative path>/users.json')
      .on('/documents', '/<relative path>/documents.json', 25)
      .serve(3000, '/www');
```
#### JSON file
The faked data is inserted to the JSON file as [Mustache](https://mustache.github.io/) formatted template strings. For complete list of faked data, [see the documentation for Faker](http://marak.github.io/faker.js/#toc8__anchor).
```json
{
  "firstname": "{{name.firstName}}",
  "lastname": " {{name.lastName}}",
  "email": "{{internet.email}}"
}
```
## License
MIT
