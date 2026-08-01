//Modal https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img
// Get the modal
var modal = document.getElementById("modal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
function modalFunction(clicked_id){
	// Null checks to prevent errors
	if (!modal) {
		console.warn('Modal element not found');
		return;
	}

	var img = document.getElementById(clicked_id);
	var replaceImg = document.getElementById("image");
	var captionText = document.getElementById("caption");

	if (!img || !replaceImg || !captionText) {
		console.warn('Required modal elements not found');
		return;
	}

	modal.style.display = "block";
	replaceImg.src = img.src;
	captionText.innerHTML = img.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
if (span && modal) {
	span.onclick = function() { 
		modal.style.display = "none";
	}
}

// When the user clicks anywhere outside of the modal image, close it
if (modal) {
	window.addEventListener('click', function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	});
}
