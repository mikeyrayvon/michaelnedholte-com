<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();

  $category = get_the_category(); 
  $category_slug = $category[0]->slug;
  $category_name = $category[0]->name;

  if ($category_slug === 'news') { 
?>
    <script type="text/javascript">
      var parents = '<?php echo $category_name ?>';
    </script>
<?php } ?>

    <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

      <h1><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h1>

      <span class="date"><?php echo get_the_date('F Y'); ?></span>

      <?php the_content(); ?>

    </article>

<?php
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