






module.exports = (data,keyremover) => {
var newdata = {...data}
if (keyremover){
  try{
    // console.log("data start")
    // console.log(keyremover)
    for (item in newdata) {
      // console.log(item)
      try {
        newdata[item] = JSON.parse(newdata[item])
      } catch {
        console.log("could not parse 270")
      }
      if (keyremover.indexOf(item) !== -1) {
        delete newdata[item]
      } else {

        function looper(key, obj) {
          if (keyremover.indexOf(key) !== -1) {
            delete newdata[key]
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
        looper(item, newdata[item])
      }
    }
  }catch{
    console.log("error in removekeysJSON.js")
  }
}


    return newdata



}
