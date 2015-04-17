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

$('.first-level.parent').on('click',function() {
	$('.parent').removeClass('nav-selected');
	$('.second-level.menu, .third-level.menu').addClass('nav-hide');

	$(this).addClass('nav-selected');
	
	parentId = $(this).attr('data-id');
	$('[data-parent="'+parentId+'"]').removeClass('nav-hide');

	animateAutoHeight();
});

$('.second-level.parent').on('click',function() {
	$('.second-level.parent').removeClass('nav-selected');
	$('.third-level.menu').addClass('nav-hide');

	$(this).addClass('nav-selected');
	
	parentId = $(this).attr('data-id');
	$('[data-parent="'+parentId+'"]').removeClass('nav-hide');

	animateAutoHeight();
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