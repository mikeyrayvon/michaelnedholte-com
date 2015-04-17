<?php
/////////////////////////////
// Jamie Connor
// jamieconnor@gmail.com
// 
// & 
// 
// Michael Ray-Von
// michaelrayvon@gmail.com
/////////////////////////////
function get_custom_nav(){
	
	$options = array(
		'menu'		=> 'pages', 
		'echo'		=> false,
		'container' => false,
		'items_wrap' => '%3$s',
	);
	$pages = wp_nav_menu($options);
	$pages = preg_replace('/<a/', '<a class="js-ajax-item first-level crumb"', $pages);


	$newsCatObj = get_category_by_slug( 'news' );
	$newsCatId = $newsCatObj->term_id;

	$first_level_categories = get_terms( 'category', array(
		'orderby'    => 'id',
		'hide_empty' => 0,
		'parent' => 0,
		'exclude' => array(1,$newsCatId), //hide uncategorised and news
	) );
	if ( count($first_level_categories) ){
		$first_level_div = "<ul class='first-level menu'>";
		foreach ( $first_level_categories as $first_level_category ) {
			$first_level_div .= "<li class='menu-item'><a class='first-level crumb parent' data-id='" . $first_level_category->term_id . "'>" . $first_level_category->name . "</a></li>";
			$second_level_categories = get_terms( 'category', array(
				'orderby'    => 'id',
				'hide_empty' => 0,
				'parent' => $first_level_category->term_id,
			) );
			if(count($second_level_categories)){
				$second_level_div[$first_level_category->term_id] = "<ul class='second-level menu nav-hide' data-parent='" . $first_level_category->term_id . "'>";
				foreach ( $second_level_categories as $second_level_category ) {
					$second_level_div[$first_level_category->term_id] .= "<li class='menu-item'><a class='second-level crumb parent' data-id='" . $second_level_category->term_id . "'>" . $second_level_category->name . "</a></li>";
					$third_level_categories = get_terms( 'category', array(
						'orderby'    => 'id',
						'hide_empty' => 0,
						'parent' => $second_level_category->term_id,
					) );
					if(count($third_level_categories)){
						$third_level_div[$second_level_category->term_id]  = "<ul class='third-level menu nav-hide' data-parent='" . $second_level_category->term_id . "'>";
						foreach ( $third_level_categories as $third_level_category ) {
							$third_level_div[$second_level_category->term_id] .= '<li class="menu-item"><a href="' . get_term_link( $third_level_category->slug, $third_level_category->taxonomy ) . '" class="js-ajax-item third-level crumb" data-id="' . $third_level_category->term_id . '">' . $third_level_category->name . '</a></li>';
						}
					//	$third_level_div[$second_level_category->term_id] = trim($third_level_div[$second_level_category->term_id], ' ~'); //trims ' ~ ' from last category listing
						$third_level_div[$second_level_category->term_id] .= "</ul>";
					}
					
				}
				$second_level_div[$first_level_category->term_id] .= '<li class="menu-item"><a href="' . get_term_link( $first_level_category->slug, $first_level_category->taxonomy ) . '" class="js-ajax-item second-level crumb" data-id="' . $first_level_category->term_id . '">All</a></li>';
				$second_level_div[$first_level_category->term_id] .= "</ul>";
			}
		}
		$first_level_div .= $pages;
	//	$first_level_div = trim($first_level_div, ', '); //trims ' , ' from last category listing
		$first_level_div .= "</ul>";
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