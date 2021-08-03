

var validation = require('./Validation.js')

var fakeobj={
"key":"value",
"box":{
  "width":40,
  "height":80,
  "cost":{
    "shipping":40,
    "tax":10
  }
},
"array":[{"box":30,"arraytwo":[{"face":"happy"}]},{"color":"red"}]
}
var fakeobjUP={
"KEY":"value",
"BOX":{
  "WIDTH":40,
  "HEIGHT":80,
  "COST":{
    "SHIPPING":40,
    "TAX":10
  }
},
"ARRAY":[{"BOX":30,"ARRAYTWO":[{"FACE":"happy"}]},{"COLOR":"red"}]
}



// validation.checkOBJDefined()

test('should equal all caps obj', ()=>{
  expect(validation.turnKeysToCAP(fakeobj,"ERROR TEST() UNITTEST ")).toEqual(fakeobjUP);
})


test('Object Should be true', ()=>{
  expect(validation.checkOBJDefined(fakeobj,"ERROR TEST() UNITTEST ")).toBe(true)
})
