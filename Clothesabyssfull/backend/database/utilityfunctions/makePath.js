var fs = require('fs');

module.exports = function (astartpath) {
  // console.log(astartpath)
  if (fs.existsSync(astartpath)) {
    // console.log(fs.existsSync(astartpath))
    return true

  } else {
    fs.mkdirSync(astartpath, {
      recursive: true
    }, function(err) {
       // console.log(err)
    });
    return true;

  }
}
