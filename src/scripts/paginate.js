console.log('paginate loaded, config:', CASESTUDIES)
var paginate = {
  init: function(){
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
    $("*[data-paginate='"+this.pages[this.currentIndex]+"']").removeClass("disabled")
    $(".current-page-title").text(this.formattedTitles[this.currentIndex])
    this.nextPage = this.pages[(this.currentIndex + 1)] ? this.pages[(this.currentIndex + 1)] : this.pages[this.currentIndex]
    this.prevPage = this.pages[(this.currentIndex - 1)] ? this.pages[(this.currentIndex - 1)] : this.pages[this.currentIndex]

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
    console.log("navigate called, this.currentHash:", this.currentHash)
    this.currentIndex = _.indexOf(this.pages, this.currentHash)
    console.log("this.currentIndex:", this.currentIndex)
    this.nextPage = this.pages[(this.currentIndex + 1)] ? this.pages[(this.currentIndex + 1)] : this.pages[this.currentIndex]
    this.prevPage = this.pages[(this.currentIndex - 1)] ? this.pages[(this.currentIndex - 1)] : this.pages[this.currentIndex]
    console.log("prev and next:", this.prevPage, " ",this.nextPage )

    $(".case-study").removeClass("active")
    $("*[data-paginate='"+this.currentHash+"']").addClass("active") 
  },
  updateHash: function(bool){
    bool ? window.location.hash = this.nextPage : window.location.hash = this.prevPage

  },
  updateCaseStudyTitle: function(bool){
    $(".current-page-title").text(this.formattedTitles[this.currentIndex])

  },
  initEvents: function(){
    var that = this
    // pass 1 if next-page is clicked, 0 if prev-page is clicked
    $(".prev-page").click(function(){
      console.log("prev-page clicked, prevPage is")
      that.updateHash(0)
    })
    $(".next-page").click(function(){
      console.log("next-page clicked, nextPage is")
      that.updateHash(1)
    })
  }

}