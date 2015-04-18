    <footer id="footer">
    </footer>

  </section>

  <?php get_template_part('partials/scripts'); ?>

  <script type="text/javascript">
  <?php 
  $newsCatObj = get_category_by_slug( 'news' );
  $newsCatId = $newsCatObj->term_id;
  $newsCatCount = $newsCatObj->count;
  if ($newsCatCount < 1) { ?>
    $('.menu-category-<?php echo $newsCatId; ?>').remove();
  <?php } ?>
  </script>

  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Person",
      "url": "http://michaelnedholte.com/",
      "image": "<?php bloginfo('stylesheet_directory'); ?>/img/photo.jpg",
      "givenName": "Michael",
      "additionalName": "Ned",
      "familyName": "Holte"
    }
  </script>

  </body>
</html>