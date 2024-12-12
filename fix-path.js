/**
 * Fixes an issue with the react-native-navigation's rnn-link command.
 * Reference: https://github.com/wix/react-native-navigation/issues/7821#issuecomment-1865390682
 */
const fs = require('fs');
const path = require('path');

// Path to the path.js file
const filePath = path.join(__dirname,  'node_modules', 'react-native-navigation', 'autolink', 'postlink', 'path.js');
console.log(filePath)

// Replaces the code to support .kt files
fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) {
    return console.log('err',err);
  }
  const result = data.replace(
    'var mainApplicationJava = glob.sync(\'**/MainApplication.java\', ignoreFolders)[0];',
    'var mainApplicationJava = glob.sync(\'**/MainApplication.{java,kt}\', ignoreFolders)[0];'
  );

  fs.writeFile(filePath, result, 'utf8', function (err) {
    if (err) {return console.log("errr",err);}
    console.log('Fix applied to path.js for Kotlin support.');
  });
});