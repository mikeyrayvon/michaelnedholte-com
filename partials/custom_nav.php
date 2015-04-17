<?php
/////////////////////////////
// Functions added by Jamie
// jamieconnor@gmail.com
/////////////////////////////
function get_custom_nav(){
	
	$options = array(
	'menu' => 'news', 
	  'echo' => false,
	 'container' => false,
	 'before' => '<span class="navclose">',
	 'after'      => '</span> , '
	);
	$pages = wp_nav_menu($options);
	
	$pages = preg_replace( array( '#^<ul[^>]*>#', '#</ul>$#','#<li[^>]*>#', '#</li>$#' ), '', $pages );
	$pages = substr($pages, 0); //remove trailing ' , '
	$pages = preg_replace('/<a/', '<a data-fancybox-type="iframe" class="fancybox" id="news"', $pages);

	$optionsB = array(
	'menu'  => 'contact', 
	  'echo' => false,
	 'container' => false,
	 'before' => '<span class="navclose">',
	 'after'      => '</span> , '
	);
	$pagesB = wp_nav_menu($optionsB);
	
	$pagesB = preg_replace( array( '#^<ul[^>]*>#', '#</ul>$#','#<li[^>]*>#', '#</li>$#' ), '', $pagesB );
	$pagesB = substr($pagesB, 0); //remove trailing ' , '
	$pagesB = preg_replace('/<a/', '<a data-fancybox-type="iframe" class="fancycontact" id="contact"', $pagesB);


	$first_level_categories = get_terms( 'category', array(
		'orderby'    => 'id',
		'hide_empty' => 0,
		'parent' => 0,
		'exclude' => "1,13" //hide uncategorised and news
	) );
	if ( count($first_level_categories) ){
		$first_level_div = "<div class='first_level'>";
		foreach ( $first_level_categories as $first_level_category ) {
			$first_level_div .= "<span><a href=''  class='first_level_parent' id='first_level_" . $first_level_category->term_id . "'>" . $first_level_category->name . "</a></span> , ";
			$second_level_categories = get_terms( 'category', array(
				'orderby'    => 'id',
				'hide_empty' => 0,
				'parent' => $first_level_category->term_id,
			) );
			if(count($second_level_categories)){
				$second_level_div[$first_level_category->term_id] = "<div class='second_level' id='second_level_" . $first_level_category->term_id . "'>";
				foreach ( $second_level_categories as $second_level_category ) {
					$second_level_div[$first_level_category->term_id] .= "<span><a href='' id='second_level_" . $second_level_category->term_id . "'>" . $second_level_category->name . "</a></span> / ";
					$third_level_categories = get_terms( 'category', array(
						'orderby'    => 'id',
						'hide_empty' => 0,
						'parent' => $second_level_category->term_id,
					) );
					if(count($third_level_categories)){
						$third_level_div[$second_level_category->term_id]  = "<div class='third_level' id='third_level_" . $second_level_category->term_id . "'>";
						foreach ( $third_level_categories as $third_level_category ) {
							$third_level_div[$second_level_category->term_id] .= '<span><a href="' . get_term_link( $third_level_category->slug, $third_level_category->taxonomy ) . '" id="third_level_' . $third_level_category->term_id . '" class="navclose">' . $third_level_category->name . '</a></span> ~ ';
						}
					//	$third_level_div[$second_level_category->term_id] = trim($third_level_div[$second_level_category->term_id], ' ~'); //trims ' ~ ' from last category listing
						$third_level_div[$second_level_category->term_id] .= "</div>";
					}
					
				}
				$second_level_div[$first_level_category->term_id] .= '<span><a href="" class="all navclose" id="second_level_' . $first_level_category->term_id . '">All</a></span> /';
				$second_level_div[$first_level_category->term_id] .= "</div>";
			}
		}
		$first_level_div .= $pages;
		$first_level_div .= $pagesB;
	//	$first_level_div = trim($first_level_div, ', '); //trims ' , ' from last category listing
		$first_level_div .= "</div>";
	}
	
	print $first_level_div;
	foreach($second_level_div as $s_l_d){
		print $s_l_d;
	}
	foreach($third_level_div as $t_l_d){
		print $t_l_d;
	}
}
?>