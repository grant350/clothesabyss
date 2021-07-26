var bcrypt = require('bcrypt');
var saltRounds = 10;

//maketoken
module.exports =  function hash(password) {
// hashSync(saltRounds,password)
return  bcrypt.hashSync(password, saltRounds);

}
