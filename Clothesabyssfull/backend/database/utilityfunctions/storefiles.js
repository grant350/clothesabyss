
var fs = require('fs');


module.exports = function (fullpath, filedata) {
  var absoluteFilePath;
  if (fullpath) {
    var filedatabuf;
    var bufferfile;
    try {
      filedatabuf = filedata["64bit"].replace(/^data:image\/\w+;base64,/, "");
      bufferfile = Buffer.from(filedatabuf, 'base64')
    } catch {
      // console.log("ERROR FILE CANNOT BE MADE FROM base64 LINE266")
    }
    var mimeValidator = {
      "image/png": ".png",
      "image/jpg": ".jpg",
      "image/jpeg": ".jpeg"
    };
    if (bufferfile) {
      if (mimeValidator[filedata.image_structure.filetype]) {
        var extension = mimeValidator[filedata.image_structure.filetype]
        var filename = filedata.image_structure.filename
        if (filename.includes(extension)) {
          filename = filename.replace(extension, "")
        }
        let dateTime = Date.now();
        dateTime = dateTime.toString()
        if (extension) {
          absoluteFilePath = (fullpath + "/" + filename + dateTime + extension)
        } else {
          absoluteFilePath = (fullpath + "/" + filename + dateTime + extension)
        }
        fs.writeFile(absoluteFilePath, bufferfile, function(err) {
          // console.log(err)
        });
        absoluteFilePath = absoluteFilePath.replace("src", "")
      }
    } else {
      // console.log("line189: No bufferfile")
    }
    filedata = null
    return absoluteFilePath
  }
};
