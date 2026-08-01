// Check if jQuery is loaded before using it
if (typeof jQuery === 'undefined') {
	console.warn('jQuery not loaded - nav.js requires jQuery');
} else {
	$(document).ready(function() {


      

	$.fn.menumaker = function(options) {

      

    var cssmenu = $(this), settings = $.extend({

        title: "Menu",

        format: "dropdown",

        sticky: false

      }, options);



      return this.each(function() {

		

		cssmenu.prepend('<div id="menu-button"><span></span><span></span><span></span>' + settings.title + '</div>');

		$(this).find("#menu-button").on('click', function(){

		  $(this).toggleClass('menu-opened');

		  var mainmenu = $(this).next('ul');

		  if (mainmenu.hasClass('open')) { 

			mainmenu.slideUp().removeClass('open');

		  }

		  else {

			mainmenu.slideDown().addClass('open');

			if (settings.format === "dropdown") {

			  mainmenu.find('ul').slideDown();

			}

		  }

		});

		

		cssmenu.find('li ul').parent().addClass('has-sub');



		var multiTg = function() {

		  cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');

		  cssmenu.find('.submenu-button').on('click', function() {

			$(this).toggleClass('submenu-opened');

			if ($(this).siblings('ul').hasClass('open')) {

			  $(this).siblings('ul').removeClass('open').slideUp();

			}

			else {

			  $(this).siblings('ul').addClass('open').slideDown();

			}

		  });

		};



		if (settings.format === 'multitoggle') multiTg();

		else cssmenu.addClass('dropdown');

		

		

      });

	};

	

	$(".navy").menumaker({

		title: "Navigation",

		format: "multitoggle"

	});

	

	

		$('#menu-button').click(function(){

		$(this).toggleClass('open');

	});

	

	

	// Check if AnimOnScroll is available before using
	var gridElement = document.getElementById( 'grid' );
	if (gridElement && typeof AnimOnScroll !== 'undefined') {
		new AnimOnScroll( gridElement, {
			minDuration : 0.4,
			maxDuration : 0.7,
			viewportFactor : 0.2
		} );
	}

	});
}

