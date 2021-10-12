var fs = require('fs')
module.exports =  function (path, startkey, tableidname, index, obj) {

if (index && typeof index === "number"){



  if (fs.existsSync(path)) {
    console.log('json path exist')
    var x = fs.readFileSync(path, 'utf-8', function(err, rawjsondata) {
      if (err) {
        return err
      }
      return rawjsondata
    })
    if (typeof x === "string") {
      var rawjsondata = JSON.parse(x)
      if (rawjsondata[startkey]) {
        if (rawjsondata[startkey][0][tableidname]){
          var filterdata = rawjsondata[startkey].filter(item => item[tableidname] !== index);
          if (obj){
            filterdata.push(obj)
          }
          rawjsondata[startkey] = filterdata
          rawjsondata = JSON.stringify(rawjsondata);
           fs.writeFile(path, rawjsondata, 'utf-8', function(err) {
            if (err) throw err;
            return true
          });
          return true
        } else {
          throw new Error('tableidname not in dataset')
        }

      }else {
        throw new Error('startkey does not exist')
        return false
      }
    } else {
      return false
    }
  } else {
    throw new Error('Path does not exist.')


  }
} else {
  throw new Error('index Must be defined and a number')
}
}
