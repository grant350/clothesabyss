module.exports = function (JSONDATA,call) {
  Object.keys(JSONDATA).forEach((keyo, index) => {
    var selectedkeyobj = JSONDATA[keyo]
    call(selectedkeyobj,keyo)
    function superlooper(obj, getkey) {
      call(obj,keyo)
      if (obj instanceof Array && !obj instanceof Object) {
        obj.forEach((item, sindex) => {
          superlooper(item)
        })
      }
      if (obj instanceof Object) {
        Object.keys(obj).forEach((key) => {
          superlooper(obj[key], key)
        })
      }
    }
    superlooper(selectedkeyobj, keyo)
  });
  return JSONDATA
}
