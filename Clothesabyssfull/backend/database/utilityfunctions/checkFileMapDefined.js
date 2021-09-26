module.exports = function (map, data) {
  try {
    var arrayofbools = []
    Object.keys(map).forEach(k => {
      if (data[k]) {
        arrayofbools.push(true)
      } else {
        arrayofbools.push(false)
      }
    })
    if (arrayofbools.indexOf(true) != -1) {
      if (arrayofbools.indexOf(false) != -1) {
        // console.log("checkFileMap has true and false in array fix")
        return true
      } else {
        return true
      }
    } else {
      return false
    }
  } catch {
    // console.log('ERROR ')
    return false
  }

}
