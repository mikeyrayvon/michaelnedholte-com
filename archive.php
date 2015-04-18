<?php
get_header();

?>

<!-- main content -->

<main id="main-content">
  
  <!-- main posts loop -->
  <section id="posts" class="<?php if (is_category('news')) {echo 'news';} else {echo 'archive';} ?>">
<?php
  if (is_archive()) { 
  $cat_id = get_query_var('cat');
  $parents = get_category_parents($cat_id, false, '&rarr;');
  $parents_trim = trim($parents, '&rarr;'); 
?>
    <script type="text/javascript">
      var parents = '<?php echo $parents_trim; ?>';
    </script>
<?php } 

if( have_posts() ) {
  while( have_posts() ) {
    the_post();

    if (is_category('news')) {

?> 

    <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
      <h2><a href="<?php the_permalink() ?>" class="js-ajax-item news-item"><?php the_title(); ?></a></h2>
      <span class="date"><?php echo get_the_date('d F Y'); ?></span>
      <?php the_content(); ?>
    </article>

<?php } else { ?>

    <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
      <a href="<?php the_permalink() ?>" class="js-ajax-item">
        <h2><?php the_title(); ?></h2>
        <span><?php echo get_the_date('F Y'); ?></span>
      </a>
    </article>

<?php
    }
  }
} else {
?>
    <article class="u-alert"><?php _e('Sorry, no posts matched your criteria :{'); ?></article>
<?php
} ?>

  <!-- end posts -->
  </section>

  <?php get_template_part('partials/pagination'); ?>

<!-- end main-content -->

</main>

<?php
get_footer();
?>