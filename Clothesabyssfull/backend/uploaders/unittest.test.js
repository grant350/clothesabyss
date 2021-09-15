

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


var fakeurl="src/assets/productCatagories/productImages/makeup"
var fakeurlFail="src/assets/productCatagories/productImages/gondi"

test('sshould return true with false path, path succefuly made', ()=>{
  expect(validation.makepath(fakeurlFail,"ERROR TEST() UNITTEST ")).toEqual(true);
})

test('sshould return true, path already made succefuly made', ()=>{
  expect(validation.makepath(fakeurl,"ERROR TEST() UNITTEST ")).toEqual(true);
})


// validation.checkOBJDefined()

test('should equal all caps obj', ()=>{
  expect(validation.turnKeysToCAP(fakeobj,"ERROR TEST() UNITTEST ")).toEqual(fakeobjUP);
})


test('Object Should be true', ()=>{
  expect(validation.checkOBJDefined(fakeobj,"ERROR TEST() UNITTEST ")).toBe(true)
})
