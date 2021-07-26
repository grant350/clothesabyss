$("document").ready(function(){
console.log("ready")

  function footerClick(){

  var clicks =0;
  let drp = $(".drpdown")
  let drp2 = $(".drpdown2")
  let footerDrp = $(".footer-drp")
  let footerDrp2 = $(".footer-drp-2")
  let linklist = $(".footer_linklist_mobile")
  let maindrp = $(".drpdown-main")
  let maindrpcss = "drpdown-main"
  let drp2css = "drpdown2"





function animation(){


}

  $(drp).click( function(){
  console.log("drp1 clicked")

  console.log($(this))
    console.log($(this).hasClass(maindrpcss))
    console.log($(this).hasClass($(maindrp)))


    if ( $(this).hasClass(maindrpcss) == false && $(this).hasClass(drp2css) == false  ){
      console.log("path 0")

    var path = $(this).closest($(footerDrp)).find($(linklist))
    path.toggle()

    }


   else if ( $(this).hasClass(maindrpcss) == true  ){
      console.log("path 1")
  var path1 = $(this).closest($(footerDrp)).find($(footerDrp2))
  path1.toggle()


  }

    if ( $(this).hasClass(drp2css) == true  ){
      var path2 = $(this).closest($(footerDrp2)).find($(linklist))
  path2.toggle()


    }




})



//end of function
}
	footerClick();




  //done
  var aDrpBtn = $(".drpdwn-ct-btn")
  let mobileNavOpen = $(".mobile-nav--open")
  let mobileNavClose = $(".mobile-nav--close")
  var siteHeaderIcon = $(".site-header__ham")
  var aDrpCt = $(".dropdown-ct")
  let  jsToggleSubmenu = $(".js-toggle-submenu")
  //let siteNavHasDrpdwn = $(".site-nav--has-dropdown")
  let  mobileNavWrapper = $(".mobile-nav-wrapper")

  var aSubmenu = $(".submenu")
  //let siteNavLinkBtn = $(".site-nav__link--button")
  //let siteHeaderSearchToggle = $(".site-header__search-toggle")
  //let searchBarClose = $(".search-bar__close")
  var aPageContainer = $(".page-ct")
  //need


    $(aPageContainer).on("click",function() {
console.log("APAGE CLICK")
    //$(".drawer").css({"display":"none"})
    $(aSubmenu).css({ "display": "none" })
    $(siteHeaderIcon).addClass("MobileNavOpen")
    $(siteHeaderIcon).removeClass("MobileNavClose")
    $(mobileNavWrapper).css({"transform":"translateY(0px)","display":"none"})
    $(jsToggleSubmenu).siblings(".mobile-nav__dropdown").removeClass("js-toggle_submenu-active")


  })


  /*
  function searchOption(){
    $(siteHeaderSearchToggle).click(function(){
    $(".drawer").toggle()


    $(searchBarClose).click(function(){
      $(".drawer").css({"display":"none"})

    })

    })



  }
  searchOption()
 */

  function DesktopDrpDwm() {
    $(aDrpCt).find($(aDrpBtn)).click(function() {
      $(this).siblings($(aSubmenu)).toggle()
      $(this).siblings($(aSubmenu)).css({ "top": "40px" })


    })


  }

  DesktopDrpDwm()




  function mobileNavClicked(){
    var clicks =0;
    siteHeaderIcon.on("click", function(){
      clicks +=1
      siteHeaderIcon.toggleClass( "MobileNavOpen")

          if ( $(this).hasClass("MobileNavOpen") ) {
            $(this).removeClass("MobileNavClose")
            $(mobileNavWrapper).css({"transform":"translateY(0px)","display":"none"})
            $(jsToggleSubmenu).siblings(".mobile-nav__dropdown").removeClass("js-toggle_submenu-active")
    }
          else{
              $(this).addClass("MobileNavClose")
              $(mobileNavWrapper).css({"transform":"translateY(0px)","display":"block"})
              $(jsToggleSubmenu).on("click", function(){
              $(this).siblings(".mobile-nav__dropdown").addClass("js-toggle_submenu-active")
              if ($(this).hasClass("mobile-nav__return-btn")  ){
                 $(jsToggleSubmenu).siblings(".mobile-nav__dropdown").removeClass("js-toggle_submenu-active")
               }

               });

             }

    })


        }
    mobileNavClicked()


})
