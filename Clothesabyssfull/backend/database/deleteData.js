var db = require('../database');
const url = require('url');
var fs = require('fs')

module.exports = (req, res, next) => {

  if (req.permissions === "admin") {

    try {
      console.log("DELETE line:10")
      const queryObject = url.parse(req.url, true).query;
      var tablename = queryObject.tablename
      var index = queryObject.index

      //find id name
      // var startname = queryObject.startname
       var idname = queryObject.idname

      var sline = `SELECT * FROM ${tablename} WHERE ${idname} = ${index};`
      console.log(sline)
      db.execute(sline).then(([rows, fields]) => {
        var ob = rows[0]['MANIPULATIONINFO']
        ob = JSON.parse(ob)

        console.log(ob.path.startpath)
        /////////////////****
        try {
          if (fs.existsSync(`${ob.path.startpath}/${ob.path.containerfolder}${index}`)) {
            console.log("file exist")
            fs.rmdirSync(`${ob.path.startpath}/${ob.path.containerfolder}${index}`, {
              recursive: true
            })
          } else {
            console.log("MAJOR ERROR DELETE FILEREMOVAL")
          }

        } catch {
          console.log("eerroror 39834")
        }

        try {
          if (fs.existsSync(ob.JSONFILEURL)) {

            fs.readFile(ob.JSONFILEURL, function readFileCallback(err, rawjsondata) {
              if (rawjsondata) {
                rawjsondata = JSON.parse(rawjsondata);
                if (rawjsondata[ob.jsonFileStartKey]) {
                  var SL = rawjsondata[ob.jsonFileStartKey].length
                  rawjsondata[ob.jsonFileStartKey] = rawjsondata[ob.jsonFileStartKey].filter(x => (x[`${ob['TABLEID']}`]).toString() != (index).toString());
                  console.log("JSON DATA LENGTH TEST")
                  console.log(`ORIGINALLENGTH: ${SL}`)
                  console.log(`ORIGINALLENGTH: ${rawjsondata[ob.jsonFileStartKey].length}`)
                  var equal = (SL === rawjsondata[ob.jsonFileStartKey].length)
                  console.log(`EQUAL ${equal}`)

                  fs.writeFile(ob.JSONFILEURL, JSON.stringify(rawjsondata), 'utf8', function(err) {
                    console.log(err)
                  });
                }
              }
            })
          } else {
            console.log("MAJOR ERROR DELETE JSONFILEURL")
          }
        } catch {
          console.log("JSON FILE ob REMOVAL")
        }

        ///////////****
        try {
          var sline2= `DELETE FROM ${tablename} WHERE ${ob.TABLEID} = ${index};`
          db.execute(sline2).then(([rows, fields]) => {}).catch((err) => {
            console.log("error  Delete() sql")
          })
        } catch {
          console.log("sql error catch")
        }




        //end

      }).catch((err) => {
        console.log("error in delete sql manipinfo not up to par  ")
      })



    } catch {
      console.log("NO QUERY INFO OR DISRUPTED line 21")
    }


  } else {
    res.json({
      "someerror": true
    })
  }




}
