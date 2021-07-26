
 module.exports = function randomtoken(){
var numberlist =[];
var str = "";

for (let i=0; i <12; i++){
  var randomnum = Math.floor(Math.random()*10)
    capturepoints=["\A","\B","\C","\D","\E","\*","\F","\G","\H","\I","\*","\*","\J","\K","\L","\M","\*","\N","\%","\O","\P","\Q","\$","\#","\R","\S","\T","\U","\¥","\V","\W","\X","\π","\Z","1","2","3","4","5","6","\ª","7","8","9"]

  if (i % 2 === 1){
	var randompoint= capturepoints[Math.floor(Math.random() * capturepoints.length)]
  numberlist.push(randompoint)

  }
  else{

    	numberlist.push(`${randomnum}`)
  }
}
for (let i in numberlist){
  str = str.concat(numberlist[i])
}

//return str
return {"token":str}

}
