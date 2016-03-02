console.log('paginate loaded, config:', CASESTUDIES)
var paginate = {
  init: function(){
    this.linksUpdated = false
    // this is the array of case studies from config.js
    this.pages = CASESTUDIES
    this.formattedTitles = FORMATTEDTITLES
    console.log("paginate init, pages:", this.pages)
    // set default hash to first element of array when landing on "/projects/"
    if(window.location.hash == "" && window.location.href.split("/")[3] == "projects"){
      window.location.hash = this.pages[0]
    }
    this.currentHash = window.location.hash.split("#")[1]
    this.initNavigation()
    this.initEvents()
    this.initHashchangeEvent()
    

  },

  initNavigation: function(){
    this.currentHash = window.location.hash.split("#")[1]
    console.log("initNavigation called, this.currentHash:", window.location)
    this.currentIndex = _.indexOf(this.pages, this.currentHash)
    // render current hash by default
    $("*[data-paginate='"+this.pages[this.currentIndex]+"']").addClass("active-first")
    $(".current-page-title").text(this.formattedTitles[this.currentIndex])
    this.nextPage = this.pages[(this.currentIndex + 1)] ? this.pages[(this.currentIndex + 1)] : this.pages[this.currentIndex]
    this.prevPage = this.pages[(this.currentIndex - 1)] ? this.pages[(this.currentIndex - 1)] : this.pages[this.currentIndex]

    this.updateNavLinks()
  },

  initHashchangeEvent: function(){
    var that = this
    window.addEventListener("hashchange",function(event){
      that.navigate(that.direction)
      that.updateCaseStudyTitle(that.direction)
      
    } ,false)
  },

  navigate: function(bool){
    this.currentHash = window.location.hash.split("#")[1]
    // console.log("navigate called, this.currentHash:", this.currentHash)
    this.currentIndex = _.indexOf(this.pages, this.currentHash)
    // console.log("this.currentIndex:", this.currentIndex)
    this.nextPage = this.pages[(this.currentIndex + 1)] ? this.pages[(this.currentIndex + 1)] : this.pages[this.currentIndex]
    this.prevPage = this.pages[(this.currentIndex - 1)] ? this.pages[(this.currentIndex - 1)] : this.pages[this.currentIndex]
    // console.log("prev and next:", this.prevPage, " ",this.nextPage )

    $(".case-study").removeClass("active")
    $(".case-study").removeClass("active-first")
    $("*[data-paginate='"+this.currentHash+"']").addClass("active") 


  },

  updateHash: function(bool){
    bool ? window.location.hash = this.nextPage : window.location.hash = this.prevPage

  },
  updateCaseStudyTitle: function(bool){
    $(".current-page-title").text(this.formattedTitles[this.currentIndex])
  },

  updateNavLinks: function(){
    if(this.nextPage === this.currentHash){
      console.log("page is waterford")
      $(".next-page").addClass("disabled-nav")
      $(".prev-page").removeClass("disabled-nav")
    }else if (this.prevPage === this.currentHash){
      console.log("page is cowboy-ventures")
      $(".prev-page").addClass("disabled-nav")
      $(".next-page").removeClass("disabled-nav")
    }
  },

  initEvents: function(){
    var that = this
    // pass 1 if next-page is clicked, 0 if prev-page is clicked
    $(".prev-page").click(function(event){
      console.log("prev-page clicked, prevPage is", that.prevPage)
      that.updateHash(0)
      $(".prev-page").removeClass("disabled-nav")
      $(".next-page").removeClass("disabled-nav")
      if(that.prevPage === "cowboy-ventures"){
        $(".prev-page").addClass("disabled-nav")
        $(".next-page").removeClass("disabled-nav")
      }
    })
    $(".next-page").click(function(event){
      console.log("next-page clicked, nextPage is", that.nextPage)
      that.updateHash(1)
      $(".next-page").removeClass("disabled-nav")
      $(".prev-page").removeClass("disabled-nav")
      if(that.nextPage === "waterford"){
        $(".next-page").addClass("disabled-nav")
        $(".prev-page").removeClass("disabled-nav")
      }
    })
  }

}