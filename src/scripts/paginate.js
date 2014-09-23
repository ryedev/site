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
    console.log("initNavigation called, this.currentHash:", this.currentHash)
    this.currentIndex = _.indexOf(this.pages, this.currentHash)
    // render current hash by default
    $("*[data-paginate='"+this.pages[this.currentIndex]+"']").removeClass("disabled")
    $(".current-page-title").text(this.pages[this.currentIndex])

  },
  initNavPolyfill: function(){
    $(window).on("beforeunload", function(event){
      console.log("beforeunload fired, event:", event)
    })
    var that = this
    window.addEventListener("hashchange",function(event){
      setTimeout(function(){
        console.log("setTimeout fired")
        // console.log("hashchange",event )
        console.log("old url:", event.oldURL.split("#")[1])
        console.log("currentHash:", window.location.hash.split("#")[1] )
        if(event.oldURL.split("#")[1] == that.previousHash){
          console.log(that.previousHash)
          console.log("diff hash", event.oldURL.split("#")[1], window.location.hash.split("#")[1])
          that.initNavigation()
        }

      }, 500)
    } ,false)
  },
  navigate: function(bool){
    this.previousHash = this.currentHash
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