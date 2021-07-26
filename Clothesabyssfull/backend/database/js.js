var currentInventory = [{
    name: 'Brunello Cucinelli',
    shoes: [{
        name: 'tasselled black low-top lace-up',
        price: 1000
      },
      {
        name: 'tasselled green low-top lace-up',
        price: 1100
      },
      {
        name: 'plain beige suede moccasin',
        price: 950
      },
      {
        name: 'plain olive suede moccasin',
        price: 1050
      }
    ]
  },
  {
    name: 'Gucci',
    shoes: [{
        name: 'red leather laced sneakers',
        price: 800
      },
      {
        name: 'black leather laced sneakers',
        price: 900
      }
    ]
  }
];

//Brunello Cucinelli, tasselled black low-top lace-up, 1000






function renderInventory(inventory, productcatagory) {
  var flatlist = "";

  console.log(inventory)
  inventory.forEach((item, index) => {
    console.log('INVENTORYLEN')
    console.log(inventory.length - 1)
    console.log("INDEX")
    console.log(index)
    var INVENTORYLEN = inventory.length - 1
    var inventoryIndex = index
    var temporaryName = ""

    temporaryName = item['name']


    if (item[productcatagory]) {
      if (item[productcatagory] instanceof Array) {
        console.log("IS ARRAY");
        item[productcatagory].forEach((arrayitem, sindex) => {
          var tempArrayItemName = arrayitem['name']
          var tempArrayItemPrice = arrayitem['price']
          console.log("IS EQUAL")
          console.log(INVENTORYLEN == inventoryIndex)
          if (INVENTORYLEN == inventoryIndex && sindex === item[productcatagory].length - 1) {
            console.log("IS LAST item")
            flatlist += temporaryName + ", " + tempArrayItemName + ", " + tempArrayItemPrice;
          } else {
            console.log("HAVE NO CLUE")
            flatlist += temporaryName + ", " + tempArrayItemName + ", " + tempArrayItemPrice + "\n";
          }

        })
      }

    }

  })
  console.log(flatlist)

  //Brunello Cucinelli, tasselled black low-top lace-up, 1000
  /*
  var flatList = "First line\nSecond Line\nThird Line\n";
  console.log(flatList);
  // {designer name} - {shoe name} - {price}{designer name} - {shoe name} - {price}

  */
}
renderInventory(currentInventory, 'shoes')
//Create helper functions if needed
