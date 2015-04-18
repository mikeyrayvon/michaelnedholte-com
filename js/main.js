/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document */

function l(data) {
  'use strict';
  console.log(data);
}

var 
	$header = $('#header'),
	$mainContent = $('#main-content'),
	$thisParent,
	$closestMenu,
	$crumb = $('.crumb'),
	openToggle = '&#9776;',
	closeToggle = '&#x2715;',
	anchorHref,
	anchorId,
	anchorOffset,
	anchorTop,
	anchorPos,
	parentId,
	href,
	posts,
	crumbs,
	newHref,
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

		headHeight = $header.outerHeight();
		$header.css('height',headHeight).addClass('js-nav-open');

		$('#toggle').html(closeToggle);
	});
};

var closeNav = function() {
	$('#breadcrumbs').removeClass('hide');

	$header.stop().animate({height: initHeight}, animateSpeed, function() {

		$crumb.removeClass('nav-selected');

		$('.current').addClass('nav-selected');

		// open parent ul elements
		$closestMenu = $('.current').closest('ul');
		$('.second-level.menu, .third-level.menu').not($closestMenu).addClass('nav-hide');
		$closestMenu.removeClass('nav-hide');

		$header.removeClass('js-nav-open');

		$('#toggle').html(openToggle);
	});
};

$header.css('height', initHeight+'px');

$header.hoverIntent(
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



// ROUTER
var Router = {
  init: function() {
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


// NAV
$('.first-level.crumb').on('click', function(data) {

	$('.first-level.crumb, .second-level.crumb, .third-level.crumb').removeClass('nav-selected');
	$(this).addClass('nav-selected');

	$('.second-level.menu, .third-level.menu').addClass('nav-hide');

	parentId = $(this).attr('data-id');
	$('[data-parent="'+parentId+'"]').removeClass('nav-hide');

	openNav();
});


$('.second-level.crumb').on('click', function(data) {

	$('.second-level.crumb').removeClass('nav-selected');
	$(this).addClass('nav-selected');

	$('.third-level.menu').addClass('nav-hide');

	parentId = $(this).attr('data-id');
	$('[data-parent="'+parentId+'"]').removeClass('nav-hide');

	openNav();
});


$('.third-level.crumb').on('click', function(data) {

	$('.third-level.crumb').removeClass('nav-selected');
	$(this).addClass('nav-selected');

});


//ANCHORS
$('body').on('click', 'a[href*=#]', function() {

  anchorHref = $(this).attr('href');
  anchorId = anchorHref.substring(1);
  console.log(anchorId);
  anchorOffset = $('[name="'+anchorId+'"]').offset();
  anchorTop = anchorOffset.top;
  anchorPos = anchorTop-initHeight-20;

  $('html, body').animate({ scrollTop: anchorPos }, animateSpeed);

  return false;
});


//TRIGGER
$('body').on('click', '.js-ajax-item', function(data) {

	href = $(this).attr('href');
	$thisParent = $(this).parent();

	closeNav();

	$crumb.removeClass('current');
	$('.nav-selected').addClass('current');
	$(this).addClass('current');
	$(this).addClass('nav-selected');

	if ($(this).hasClass('second-level')) {
		$('.third-level.crumb').removeClass('nav-selected').removeClass('current');
	}


//BREADCRUMBS
	if ($(this).hasClass('first-level')) {
		if ($thisParent.hasClass('menu-item-object-page')) {
			$('#breadcrumbs').html(' ');
		} else {
			$('#breadcrumbs').html( $(this).text() );
		}
	} else {
		crumbs = $('.first-level.current').text() + '&rarr;' + $('.second-level.current').text();
		if ($('.third-level.current').length) {
			crumbs += '&rarr;' + $('.third-level.current').text();
		}
		$('#breadcrumbs').html(crumbs);

	}

	crumbs = null;

	if ($(this).hasClass('news-item')) {
		$('#breadcrumbs').html(parents);
	}

	if (jQuery.browser.mobile === false) {
		Router.loadHref(href);
		return false;
	} 

});

if (jQuery.browser.mobile === false) {
	Router.init();
} else {
	$('#toggle').css('display','block');
}



//RESIZE
$(window).on('resize', function() {
	headHeight = $('#header h1').outerHeight();
	initHeight = headHeight+margin;
	$header.css('height', initHeight+'px');
});



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