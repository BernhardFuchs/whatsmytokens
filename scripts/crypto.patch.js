/**
 * This patch is needed to manipulate webpack-config which currently not possible with ng-cli
 * Another solution would be a cli-wrapper:
 * https://github.com/Angular-RU/angular-cli-webpack
 * https://github.com/nfriend/angular-cli-customizer
 */


const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(`Patching webpack config in: ${f}`);
  var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

  fs.writeFile(f, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
