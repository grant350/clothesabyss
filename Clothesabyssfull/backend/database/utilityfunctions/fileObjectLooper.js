var makepath = require('./makepath');

var reclooper = require('./reclooper');
var countfiles = require('./countfiles');
var storefiles = require('./storefiles');


module.exports = function (MAINOBJ,fileMap,path, foldername,ID) {
  var filenamepath = path + "/" + foldername + ID;

              var madepath = makepath(filenamepath);

               var path = filenamepath;
               function loopFolderscallback(obj,keyo){
                 if (fileMap[keyo] && foldername !== fileMap[keyo] ) {
                   foldername = fileMap[keyo]
                      path = countfiles(path, foldername);
                 }

                 if (obj.hasOwnProperty("64bit") ) {
                   if (obj['64bit'] !== null){
                     var fullfilepath = storefiles(path, obj);
                     if (fullfilepath !== null || fullfilepath !== undefined){
                       obj.path = fullfilepath
                       obj["64bit"]=null
                       delete obj["64bit"]
                     }
                   }
                 };
               }


            var newdata = reclooper(MAINOBJ,loopFolderscallback)
            return newdata

};
