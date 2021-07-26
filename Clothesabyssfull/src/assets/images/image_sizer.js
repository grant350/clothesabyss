$( document ).ready(function(){ 
  
function changedImages(){
    var screen_width = $(window).width();

  
  
  function other(){
	
    function Vehicle(make, model, color, year) {
        this.make = make,
        this.model = model,
        this.color = color,
        this.year = year,
        this.getName = function () {
            return this.make + " " + this.model;
        }
    }
    
    
        
      
  
  
  }
      
  
  function change_image(){
  
                           var image_change = $(".image-changed"); 
                           if ( $(".image-changed").hasClass("switch_image") == true || $(".container-slide").hasClass("switch_image") == true)  {
                             
                             if (screen_width < 600){
                               $(".image-changed").each(function(index) {
                               var bi = $(this).css("background-image"); if ( bi.includes("_square.jpg") == true){
                                 bi = bi.replace("_square.jpg", ".jpg");} bi = bi.replace(".jpg", "_square.jpg");
                               $( this ).css({"background-image":`${bi}`});});
                             
                             }
                             else{$(".image-changed").each(function(index) {
                               var bi = $(this).css("background-image"); bi = bi.replace("_square.jpg", ".jpg");
                               bi = bi.replace(".jpg", ".jpg"); $( this ).css({"background-image":`${bi}`});})} 
                           
                           
                     
                             
                             
                           }
  }change_image()
  
                          }



changedImages(); 

  $(window).resize(function(){changedImages()});
    
})