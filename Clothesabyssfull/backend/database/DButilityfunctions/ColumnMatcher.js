module.exports = function(dataobj,columns, ignorePatternMap,inheritIgnore){
var bool=true;
// console.log(ignorePatternMap)
if (inheritIgnore){
  ignorePatternMap=ignorePatternMap.concat(inheritIgnore);
}
Object.keys(dataobj).forEach((key,index)=>{
// console.log(key)
  if (columns.indexOf(key) !== -1 || ignorePatternMap.indexOf(key) !== -1){
    console.log('property exist', index)
  } else {
    bool = false
    console.log('error at property index: ' + index + ' '+ key)
  }
})
// console.log('column match result',bool)
return bool

}
