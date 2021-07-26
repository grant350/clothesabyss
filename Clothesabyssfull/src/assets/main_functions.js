 $(".center-login").on("click", function() {$(".imageOne").css({"filter": "blur(8px)"});})
 $(".imageOne").on("click", function() {$(".imageOne").css({"filter": "blur(0px)"});});
});


var clicks=0
var clicks_a =0
$(".login-i").click(function (){clicks_a +=1; if (clicks_a ==1){$(".drop-down-account").css("display","block")}; if (clicks_a ==2){$(".drop-down-account").css("display","none"); clicks_a =0;}  })
$(".but-1").click(function (){clicks+=1; if (clicks==1){$("#CustomerPassword, .bt").attr("type","text"); $(".but-1").text("UNSHOW");}; if (clicks==2){$("#CustomerPassword, .bt").attr("type","password"); $(".but-1").text("Show Password"); clicks=0;}})


$( window ).resize(function(){console.log("window resize"); var x = $(window).width(), y = $(window).height(); console.log(x + " this is width"); console.log(y + " this is height"); $( ".collection-hero__image,.hero-about-image").css({"width":` ${x}` }); console.log($( ".collection-hero__image,.hero-about-image" ).width()); });



var ax =100,ay=10, az=120,timer=0; function time(){setInterval( function(){ $(".js-animation").css("color",`rgb(0,${ay},${az})`); timer+=1; if ( timer <= 50 ){ay+=2; az+=5;}; if (timer >50){ay-=2; az-=5;}; if(timer == 100){timer=0;}; }, 300)};
time()

var testv = parseInt($(".js-qt").val()); $(".change-qt-down").click(function(){ if( testv >1){ parseInt($(".js-qt").val(testv -=1)); console.log(testv) }}); $(".change-qt-up").click(function(){ if (testv <=15){ parseInt($(".js-qt").val(testv +=1)); console.log(testv) }})
var listItemCount = 0; $('.product-thumbnails-li:nth-child(1)').addClass('border'); $('.product-thumbnails-li').click(function(event){window.addEventListener('scroll', function noscroll() {window.removeEventListener('scroll', noscroll);}); event.preventDefault(); $('.product-thumbnails-li').removeClass('border'); $(this).toggleClass('border'); listItemCount +=1;});

/*
****************************
section 2
****************************
*/

let mobileNavClose = $(".mobile-nav--close")
let mobileNavOpen = $(".mobile-nav--open")
let siteHeaderIcon = $(".site-header__icon")
let mobileNavWrapper = $(".mobile-nav-wrapper")
let  jsToggleSubmenu = $(".js-toggle-submenu")
let siteNavHasDrpdwn = $(".site-nav--has-dropdown")
let DrpDwn = $(".nav__dropdown")
let siteHeaderSearchToggle = $(".searchnav-ct")
let searchBarClose = $(".search-bar__close")
let pageContainer = $(".page-container")

pageContainer.click(function(){


$(".drawer").css({"display":"none"})
$(".site-nav__dropdown").css({"display":"none"})
      $(siteHeaderIcon).addClass("mobile-nav--open")
      $(siteHeaderIcon).removeClass("mobile-nav--close")
          $(mobileNavWrapper).css({"transform":"translateY(-40px)","display":"none"})
       $(jsToggleSubmenu).siblings(".mobile-nav__dropdown").removeClass("js-toggle_submenu-active")



})

function searchOption(){
  $(siteHeaderSearchToggle).click(function(){
  $(".drawer").toggle()


  $(searchBarClose).click(function(){
    $(".drawer").css({"display":"none"})

  })

  })



}
searchOption()


function DesktopDrpDwm(){
  $(siteNavHasDrpdwn).find($(siteNavLinkBtn)).click(function(){
    $(this).siblings($(DrpDwn)).toggle()

    $(this).siblings($(DrpDwn)).css({"top":"38px"})


  })


}
  DesktopDrpDwm()




function mobileNavClicked(){
  var clicks =0;

  siteHeaderIcon.on("click", function(){
    clicks +=1
    siteHeaderIcon.toggleClass( "mobile-nav--open")

        if ( $(this).hasClass("mobile-nav--open") ) {

      $(this).removeClass("mobile-nav--close")

          $(mobileNavWrapper).css({"transform":"translateY(-40px)","display":"none"})
       $(jsToggleSubmenu).siblings(".mobile-nav__dropdown").removeClass("js-toggle_submenu-active")



  }
    else{
      $(this).addClass("mobile-nav--close")
      $(mobileNavWrapper).css({"transform":"translateY(40px)","display":"block"})

                $(jsToggleSubmenu).on("click", function(){
   					 console.log("elle")

                     $(this).siblings(".mobile-nav__dropdown").addClass("js-toggle_submenu-active")

                     if ($(this).hasClass("mobile-nav__return-btn")  ){
                    	$(jsToggleSubmenu).siblings(".mobile-nav__dropdown").removeClass("js-toggle_submenu-active")

                     }



   				 });

}







  })


      }
  mobileNavClicked()
