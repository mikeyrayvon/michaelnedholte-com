/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document */

function l(data) {
  'use strict';
  console.log(data);
}

var 
	$header = $('#header'),
	$mainContent = $('#main-content'),
	parentId,
	href,
	posts,
	crumb,
	animateSpeed = 400,
	headHeight = $('#header h1').outerHeight(),
	margin = 20,
	initHeight = headHeight+margin;


// HEADER
var animateAutoHeight = function() {
	$header.animateAuto(animateSpeed, function() {
		//set new auto height to static height
		headHeight = $header.outerHeight();
		$header.css('height',headHeight);
	});
};

$header.css('height', initHeight+'px')
.hover(
	function() {
		animateAutoHeight();
	},
	function() {
		$header.stop().animate({height: initHeight}, animateSpeed);
	}
);

$mainContent.css('margin-top', initHeight);


// NAV
$('.first-level.parent').on('click', function() {
	$('.parent').removeClass('nav-selected');
	$('.second-level.menu, .third-level.menu').addClass('nav-hide');

	$('#breadcrumbs').addClass('hide');

	$(this).addClass('nav-selected');

	crumb = $(this).text();
	$('#breadcrumbs').html('<span class="first-crumb crumb">'+crumb+'</span>');
	
	parentId = $(this).attr('data-id');
	$('[data-parent="'+parentId+'"]').removeClass('nav-hide');

	animateAutoHeight();
});

$('.second-level.parent').on('click', function() {
	$('.second-level.parent, .second-level.all').removeClass('nav-selected');
	$('.third-level.menu').addClass('nav-hide');

	$(this).addClass('nav-selected');

	$('#breadcrumbs').addClass('hide');

	$('.second-crumb, .third-crumb').remove();
	crumb = $(this).text();
	$('#breadcrumbs').append('<span class="second-crumb crumb">&rarr;'+crumb+'</span>');
	
	parentId = $(this).attr('data-id');
	$('[data-parent="'+parentId+'"]').removeClass('nav-hide');

	animateAutoHeight();
});

$('.third-level .menu-item .crumb').on('click', function() {
	$('.third-crumb').remove();
	crumb = $(this).text();
	$('#breadcrumbs').append('<span class="third-crumb crumb">&rarr;'+crumb+'</span>');
});



//AJAX
$('body').on('click', '.js-ajax-item', function(e) {
	href = $(this).attr('href');

	if ($(this).hasClass('js-menu-item')) {
		$('.js-ajax-item').removeClass('nav-selected');
		$(this).addClass('nav-selected');
		$header.stop().animate({height: initHeight}, animateSpeed);
		$('#breadcrumbs').removeClass('hide');
	}

	if ($(this).hasClass('all')) {
		$('.second-level.parent').removeClass('nav-selected');
		$('.third-level.menu').addClass('nav-hide');
		$(this).addClass('nav-selected');
		$('.second-crumb, .third-crumb').remove();
		crumb = $(this).text();
		$('#breadcrumbs').append('<span class="second-crumb crumb">&rarr;'+crumb+'</span>');
	}
	
	$('#main-container').addClass('loading');
 
	history.pushState(null,blogName,href);

	$mainContent.animate({'opacity':0}, animateSpeed, function(data) {
		$('html, body').animate({ scrollTop: '0px' }, animateSpeed/2);

		$.ajax({
			url: href,
			success: function(data) {
				posts = $(data).find('#posts');
				console.log(posts);
				$mainContent.html(posts);
			}
		}).done(function() {
			$mainContent.animate({'opacity':1}, animateSpeed, function() {
				$('#main-container').removeClass('loading');
			});
		});
	});
	return false;
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