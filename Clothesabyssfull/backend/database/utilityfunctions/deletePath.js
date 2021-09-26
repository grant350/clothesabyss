var fs = require('fs');

module.exports = function (astartpath) {
  if (fs.existsSync(astartpath)){
    fs.rmdirSync(astartpath, {
      recursive: true
    })
    return true
  }else{
    return false;
  }
}
