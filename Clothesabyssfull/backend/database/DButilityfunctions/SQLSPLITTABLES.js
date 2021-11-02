// var reclooper = require('./reclooper');

module.exports = function (MAINOBJ,tablemap) {
// //tablemap {
//   MAIN: {'Products':'columns' },
//   VARIENTS: { 'VARIENTS': 'dataobj' ]
// }

//
               Object.keys(MAINOBJ).forEach((key)=>{
                 var obj = MAINOBJ[key]
                 if (tablemap[key]){
                   tablemap[key]['data']=MAINOBJ[key]
                   console.log('datamap',tablemap[key]['data'])
                 } else {
                   if (tablemap['MAIN']['data']){
                     tablemap['MAIN']['data'][key]=MAINOBJ[key]
                   }else {
                     tablemap['MAIN']['data']={}
                     tablemap['MAIN']['data'][key]=MAINOBJ[key]
                   }
                 }
               })
               return tablemap;
            // var newdata = reclooper(MAINOBJ,loopFolderscallback)

};
