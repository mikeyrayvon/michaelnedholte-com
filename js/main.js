/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, jQuery, document */

function l(data) {
  'use strict';
  console.log(data);
}

var 
	$header = $('#header'),
	$mainContent = $('#main-content'),
	$categoryItem = $('.menu-item-object-category'),
	$pageItem = $('.menu-item-object-page'),
	parentId,
	animateSpeed = 400,
	headHeight = $('#header h1').outerHeight(),
	margin = 20,
	initHeight = headHeight+margin;

$categoryItem.find('a').removeAttr('href');

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


$('.first-level-parent').on('click',function() {
	
	//$('.first-level-parent').removeClass('nav-selected');
	
	$(this).addClass('nav-selected');
	
	parentId = $(this).attr('data-id');
	
	$('[data-parent="'+parentId+'"]').removeClass('nav-hide');

	animateAutoHeight();
})

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