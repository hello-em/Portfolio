window.addEventListener('load', function() {
  const toggle = document.getElementById('toggle');
  const slideBlock = document.getElementsByClassName('slide-block')[0];

  // Null checks to prevent errors if elements don't exist
  if (!toggle || !slideBlock) {
    console.warn('Dark mode toggle or slide block element not found');
    return;
  }
  
  toggle.addEventListener('change', function(e) {
    if(e.target.checked) {
      slideBlock.className = slideBlock.className.replace('slide-out', 'slide-in');
     document.documentElement.setAttribute("color-mode", "dark");
     localStorage.setItem("color-mode", "dark");

    } else {
      slideBlock.className = slideBlock.className.replace('slide-in', 'slide-out');
      document.documentElement.setAttribute("color-mode", "light");
     localStorage.setItem("color-mode", "light");
    }
  });


//chooses the colour default based on user OS system
// assuming a light mode default
	if(
		// This condition checks if the user has set preference for dark mode
		// or OS dark mode
		localStorage.getItem('color-mode') === 'dark' ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('color-mode'))
		){
		document.documentElement.setAttribute('color-mode', 'dark');
		toggle.checked = true;
	}

});