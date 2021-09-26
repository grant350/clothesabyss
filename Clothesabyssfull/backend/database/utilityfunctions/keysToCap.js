module.exports = function (zobj,err) {
if (zobj !== undefined){
var mobj = {...zobj}
    Object.keys(mobj).forEach((keyo, index) => {
      function superlooper(obj, getkey) {
        if (Array.isArray(obj) ) {
          obj.forEach((item, sindex) => {
            superlooper(item,null)
          })
        }
        if (obj instanceof Object && !(Array.isArray(obj)) ) {
          Object.keys(obj).forEach((key) => {
            if (key == key.toUpperCase()){
            }else{
              obj[key.toUpperCase()]=obj[key]
              obj[key]=null
              delete obj[key]
            }
            superlooper(obj[key], key.toUpperCase())
          })
        }
      }
      superlooper(mobj, keyo)
    });
    return mobj
  }else{
    // console.log(err)
    return false
  }
}
