$( document ).ready(function(){ 
	
function flickity_size(){


          $(".carousel-cell").fadeIn(1000, function(){ $(this).css("display" , "inline-block") });

  var screen_width = $(window).width();
    var car_width = $(".main-carousel").width();
      

   
        console.log(car_width + " carwidth")
        if ( $(".container-XY").hasClass("slider_center") === true ){
    if (car_width <= 400){ $(".container-XY .carousel-cell").css({ "width" : `${(car_width/1)/ (car_width)*( 100)}%`}); }
    if (car_width > 400 && car_width <= 700){ $(".container-XY .carousel-cell").css({ "width" : ` ${(car_width/3)/ (car_width)*( 90) }%`, "margin-right": `${(10/2)}%` }) }
    if (car_width > 700 && car_width <= 1000){ $(".container-XY .carousel-cell").css({ "width" : ` ${(car_width/4)/ (car_width)*( 90)}%`, "margin-right": `${(10/3)}%` })  }
    if (car_width > 1000 && car_width <= 1300){ $(".container-XY .carousel-cell").css({ "width" : ` ${(car_width/4)/ (car_width)*( 90)}%`, "margin-right": `${(10/3)}%` }) }
    if (car_width > 1300 ){ $(".container-XY .carousel-cell").css({ "width" : ` ${(car_width/6)/ (car_width)*( 90)}%`, "margin-right": `${(10/5)}%` }) }

    }

              if ( $(".container-XZ").hasClass("center_cells") === true ){
/*
      var cells_value = $( ".container-slide").find(".main-carousel").eq(0).find(".carousel-cell").size()
      var new_value = cells_value
	  new_value = parseInt(new_value)
         
      console.log(new_value + " cell value")
        
	  	if (new_value > 0){
      	if (car_width <= 500){ $(".container-XZ  .carousel-cell").css({ "width" : `${(car_width/1)/ (car_width)*( 100)}%`});  }
      	
          if (car_width > 500 && car_width <=800){
            $(".container-XZ  .carousel-cell").css({ "width" : ` ${(car_width/3)/ (car_width)*( 90) }%`, "margin-right": `${(10/0)}%` }) }
		
      
       if (car_width > 800){ 
            $(".container-XZ  .carousel-cell").css({ "width" : ` ${(car_width/3)/ (car_width)*( 90) }%`, "margin-right": `${(10/0)}%` }) }
		
        }
              }
      
      */
                
function count_cells() {
  var position = 0;
  let item = $(".container-XZ")
  var cell_parent_position = [];

$(item).each(function(index ){
  console.log(index)
    console.log($(item))

      let object = $(this).find(".carousel-cell")
      var size_of_cells = $(this).find(".carousel-cell").length
      console.log(size_of_cells)
      size_of_cells = parseInt(size_of_cells)
      cell_parent_position.push(size_of_cells)
      console.log(size_of_cells)

      if (size_of_cells === 3) {
        switch (true) {
          
          case  (car_width <= 500):
            $(object).css({
              "width": `${(car_width/1)/ (car_width)*( 100)}%`            });
            console.log("width 500 full width center_cells")
            break;
            
          default:
            $(object).css({
              "width": `${(car_width/size_of_cells)/ (car_width)*( 94) }%`
              
            })
            console.log("width 500 3 column center_cells def")
            //end of switch
        }
      }

      if (size_of_cells === 2) {
        switch (true) {
          
          case  (car_width <= 400):
            $(object).css({
              "width": `${(car_width/1)/ (car_width)*( 100)}%`
            });
            console.log("width 500 full width center_cells 2column")
            break;
            
          default:
            $(object).css({
              "width": `${(car_width/size_of_cells)/ (car_width)*( 98) }%`
            })
            console.log("width 500 2 column center_cells def")
            //end of switch
        }
      }
  


    })
} 
          count_cells()
             
    }
    }
//end

 flickity_size();
  $(window).resize( function(){ flickity_size() });
  
})