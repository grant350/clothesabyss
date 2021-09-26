var makepath = require('./makepath');
var fs = require('fs');
// counts how many folders with name and appends it to dir;

module.exports = function (thepath, foldername) {


  var newcontainerpath;
  var newcontainerfolder;
  var value = foldername.match(/[1-9]/i)
  newcontainerfolder = foldername.replace(value, "")
  var files = fs.readdirSync(thepath)
  if (files.length >= 1) {
    var filesarray = files.filter(file => file.includes(newcontainerfolder));
    var length = filesarray.length;
    newcontainerpath = thepath + "/" + (newcontainerfolder + length);
    var madepath = makepath( newcontainerpath,"countfiles Error making path(newcontainerpath) countfiles FUNCTION  countfiles COULD not makepath.");
    if (madepath){
      return newcontainerpath
    }else{
      return new Error("cannot make path in countfiles. line 349")
    }
  } else {
    newcontainerpath = thepath + "/" + (newcontainerfolder + '0');
    var madepath = makepath( newcontainerpath,"countfiles Error making path(newcontainerpath) countfiles FUNCTION  countfiles COULD not makepath.");
    if (madepath){
      return newcontainerpath

    }else{
      return new Error("cannot make path in countfiles. line 359 end statment")
    }
  };


}
