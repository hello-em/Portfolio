var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    
    // Null check to prevent errors if no sibling element exists
    if (!content) {
      console.warn('No content element found for collapsible');
      return;
    }
    
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      // this.innerHTML = "Don't click this!"
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      // this.innerHTML = "Now close it, please!"
    } 
  });
}