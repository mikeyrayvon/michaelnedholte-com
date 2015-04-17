/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document */

function l(data) {
  'use strict';
  console.log(data);
}

var 
	$header = $('#header'),
	$mainContent = $('#main-content'),
	openToggle = '&#9776;',
	closeToggle = '&#x2715;',
	parentId,
	href,
	posts,
	crumbs,
	newHref,
	winInitWidth = $(window).width(),
	animateSpeed = 400,
	headHeight = $('#header h1').outerHeight(),
	margin = 20,
	initHeight = headHeight+margin;

if (typeof parents !== 'undefined') {
	$('#breadcrumbs').html(parents);
}



// HEADER
var openNav = function() {
	$('#breadcrumbs').addClass('hide');
	$header.animateAuto(animateSpeed, function() {
		//set new auto height to static height
		headHeight = $header.outerHeight();
		$header.css('height',headHeight).addClass('js-nav-open');
		$('#toggle').html(closeToggle);
	});
};

var closeNav = function() {
	$('#breadcrumbs').removeClass('hide');
	$header.stop().animate({height: initHeight}, animateSpeed, function() {
		$('.crumb').removeClass('nav-selected');
		$('.current').addClass('nav-selected');
		$('.second-level.menu, .third-level.menu').addClass('nav-hide');
		$('.current').closest('ul').removeClass('nav-hide');
		$header.removeClass('js-nav-open');
		$('#toggle').html(openToggle);
	});
};

$header.css('height', initHeight+'px');

$header.hover(
	function() {
		openNav();
	},
	function() {
		closeNav();
	}
);

$('#toggle').on('click', function() {
	if ($header.hasClass('js-nav-open')) {
		closeNav();
	} else {
		openNav();
	}
});

$mainContent.css('margin-top', initHeight);



// NAV
$('.first-level.parent').on('click', function() {
	$('.parent').removeClass('nav-selected');
	$('.second-level.menu, .third-level.menu').addClass('nav-hide');

	$(this).addClass('nav-selected');

	parentId = $(this).attr('data-id');
	$('[data-parent="'+parentId+'"]').removeClass('nav-hide');

	openNav();
});

$('.second-level.parent').on('click', function() {
	$('.second-level.parent, .second-level.all').removeClass('nav-selected');
	$('.third-level.menu').addClass('nav-hide');

	$(this).addClass('nav-selected');

	parentId = $(this).attr('data-id');
	$('[data-parent="'+parentId+'"]').removeClass('nav-hide');

	openNav();
});


// ROUTER
var Router = {
  init: function() {
    var _this = this;
    window.onstatechange = function() {
      newHref = window.location.href;

			$('#main-container').addClass('loading');

			$mainContent.animate({'opacity':0}, animateSpeed, function(data) {
				$('html, body').animate({ scrollTop: '0px' }, animateSpeed/2);

				$.ajax({
					url: newHref,
					success: function(data) {
						posts = $(data).find('#posts');
						$mainContent.html(posts);
					}
				}).done(function() {
					$mainContent.animate({'opacity':1}, animateSpeed, function() {
						$('#main-container').removeClass('loading');
					});
				});
			});
    };
  },
  loadHref: function(href) {
    History.pushState(null, WP.blogName, href);
  },
};



//TRIGGER
if (jQuery.browser.mobile === false) {
	$('body').on('click', '.js-ajax-item', function(e, data) {
		href = $(this).attr('href');
		var $thisParent = $(this).parent();

		if ($(this).hasClass('all')) {
			$('.second-level.parent').removeClass('nav-selected');
			$('.third-level.menu').addClass('nav-hide');
			$(this).addClass('nav-selected');
		}

		if ($(this).hasClass('js-menu-item')) {
			$('.js-ajax-item').removeClass('nav-selected');
			$(this).addClass('nav-selected');
			$header.stop().animate({height: initHeight}, animateSpeed);
			$('.crumb').removeClass('current');
		}

		if ($(this).hasClass('first-level')) {
			if ($thisParent.hasClass('menu-item-object-page')) {
				$('#breadcrumbs').html(' ');
			} else {
				$('#breadcrumbs').html( $(this).text() );
			}
		} else {

			$('.nav-selected').addClass('current');

			crumbs = $('.first-level.current').text() + '&rarr;' + $('.second-level.current').text();

			if ($('.third-level.current').length) {
				crumbs += '&rarr;' + $('.third-level.current').text();
			}

			$('#breadcrumbs').html(crumbs);
		}

		crumbs = '';
	 
		Router.loadHref(href);

		return false;
	});

	//ROUTER INIT
	Router.init();
} else {
	$('#toggle').css('display','block');
}



jQuery(document).ready(function () {
  'use strict';
  l('Hola Globie');
});


//auto height animate
jQuery.fn.animateAuto = function(speed, callback){
	var elem, height;
	return this.each(function(i, el){
		el = jQuery(el), elem = el.clone().css({"height":"auto"}).appendTo("body");
		height = elem.css("height"),
		elem.remove();
		el.stop().animate({"height":height}, speed, callback);
	});  
};