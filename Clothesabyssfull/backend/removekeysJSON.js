






module.exports = (data,keyremover) => {

    console.log("data start")
    for (item in data) {
      try {
        data[item] = JSON.parse(data[item])
      } catch {
        console.log("could not parse 270")
      }
      if (keyremover.indexOf(item) !== -1) {
        delete data[item]
      } else {

        function looper(key, obj) {
          if (keyremover.indexOf(key) !== -1) {
            delete obj[key]
          }
          if (obj instanceof Object && typeof obj === "object") {
            Object.keys(obj).forEach(key => {
              if (keyremover.indexOf(key) !== -1) {
                delete obj[key]
              } else {
                looper(key, obj[key])
              }
            })
          }

          if (obj instanceof Array && !obj instanceof Object) {
            var nwobj = {}
            obj.forEach(it => {
              looper(null, it)
            })
          }
        }
        looper(item, data[item])
      }
    }
    //console.log("data")





    return data



}
