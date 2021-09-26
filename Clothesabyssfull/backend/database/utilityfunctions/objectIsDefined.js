module.exports = function (obj,error){
try {
  var bool1 = (JSON.stringify(obj).length > 1);
  var bool2 = (obj !== null && obj !== undefined);
  var bool3 = (typeof obj == "object" || obj.hasOwnProperty(Object.keys(obj)[0]));
  if (bool1 && bool2 && bool3){
    return true
  }else{
    // console.log(error)
    return false
  }
}catch{
  console.log(error)
  return false
}

}
