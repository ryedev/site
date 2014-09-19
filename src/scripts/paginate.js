console.log('paginate loaded, config:', CASESTUDIES)
var paginate = {
  init: function(){
    // this is the array of case studies from config.js
    this.pages = CASESTUDIES
    console.log("paginate init, pages:", this.pages)
    // set default hash to first element of array when landing on "/projects/"
    if(window.location.hash == ""){
      window.location.hash = this.pages[0]
    }
    this.initNavigation()
    this.initEvents()
  },
  initNavigation: function(){
    this.currentHash = window.location.hash.split("#")[1]
    console.log("initNavigation called, this.currentHash:", this.currentHash)
    this.currentIndex = _.indexOf(this.pages, this.currentHash)
    // render current hash by default
    $("*[data-paginate='"+this.pages[this.currentIndex]+"']").removeClass("disabled")
    $(".current-page-title").text(this.pages[this.currentIndex])
  },
  navigate: function(bool){
    var currentHash = window.location.hash.split("#")[1]
    console.log("navigate called, currentHash:", currentHash)
    var currentIndex = _.indexOf(this.pages, currentHash)
    console.log("currentIndex:", currentIndex)
    this.nextPage = this.pages[(currentIndex + 1)] ? this.pages[(currentIndex + 1)] : this.pages[currentIndex]
    this.prevPage = this.pages[(currentIndex - 1)] ? this.pages[(currentIndex - 1)] : this.pages[currentIndex]
    console.log("prev and next:", this.prevPage, " ",this.nextPage )

    $(".case-study").addClass("disabled")
    bool ? $("*[data-paginate='"+this.nextPage+"']").removeClass("disabled") : $("*[data-paginate='"+this.prevPage+"']").removeClass("disabled")
  },
  updateHash: function(bool){
    console.log("updateHash called")
    bool ? window.location.hash = this.nextPage : window.location.hash = this.prevPage

  },
  updateCaseStudyTitle: function(bool){
    bool ? $(".current-page-title").text(this.nextPage) : $(".current-page-title").text(this.prevPage)

  },
  initEvents: function(){
    var that = this
    // pass 1 if next-page is clicked, 0 if prev-page is clicked
    $(".prev-page").click(function(){
      console.log("prev-page clicked, prevPage is", that.prevPage)
      that.navigate(0)
      that.updateHash(0)
      that.updateCaseStudyTitle(0)
    })
    $(".next-page").click(function(){
      console.log("next-page clicked, nextPage is", that.nextPage)
      that.navigate(1)
      that.updateHash(1)
      that.updateCaseStudyTitle(1)
    })
  }

}