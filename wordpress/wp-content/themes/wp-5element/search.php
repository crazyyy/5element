<?php get_header(); ?>
  <div class="products_block3 clearfix">
    <h1 class="search-title inner-title"><?php echo sprintf( __( '%s Search Results for ', 'wpeasy' ), $wp_query->found_posts ); echo get_search_query(); ?></h1>
    <ul class="clearfix">

      <?php get_template_part('loop'); ?>

    </ul>

  </div><!-- products_block3 -->

  <?php get_template_part('pagination'); ?>

</section>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
