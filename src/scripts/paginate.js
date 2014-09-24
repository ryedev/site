console.log('paginate loaded, config:', CASESTUDIES)
var paginate = {
  init: function(){
    // this is the array of case studies from config.js
    this.pages = CASESTUDIES
    console.log("paginate init, pages:", this.pages)
    // set default hash to first element of array when landing on "/projects/"
    if(window.location.hash == "" && window.location.href.split("/")[3] == "projects"){
      window.location.hash = this.pages[0]
    }
    this.currentHash = window.location.hash.split("#")[1]
    this.initNavigation()
    this.initEvents()
    this.initNavPolyfill()
    
  },
  initNavigation: function(){
    this.currentHash = window.location.hash.split("#")[1]
    console.log("initNavigation called, this.currentHash:", window.location)
    this.currentIndex = _.indexOf(this.pages, this.currentHash)
    // render current hash by default
    $("*[data-paginate='"+this.pages[this.currentIndex]+"']").removeClass("disabled")
    $(".current-page-title").text(this.pages[this.currentIndex])

  },
  initNavPolyfill: function(){
    var that = this
    window.addEventListener("hashchange",function(event){
      that.navigate(that.direction)
      that.updateCaseStudyTitle(that.direction)
      
    } ,false)
  },
  navigate: function(bool){
    this.writeCurrentHash()
    this.currentHash = window.location.hash.split("#")[1]
    console.log("navigate called, this.currentHash:", this.currentHash)
    this.currentIndex = _.indexOf(this.pages, this.currentHash)
    console.log("this.currentIndex:", this.currentIndex)
    this.nextPage = this.pages[(this.currentIndex + 1)] ? this.pages[(this.currentIndex + 1)] : this.pages[this.currentIndex]
    this.prevPage = this.pages[(this.currentIndex - 1)] ? this.pages[(this.currentIndex - 1)] : this.pages[this.currentIndex]
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
      that.updateHash(0)
      that.direction = 0
    })
    $(".next-page").click(function(){
      console.log("next-page clicked, nextPage is", that.nextPage)
      that.direction = 1
      that.updateHash(1)
    })
  }

}