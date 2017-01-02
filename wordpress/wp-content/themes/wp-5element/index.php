<?php get_header(); ?>
  <div class="products_block3 clearfix">
    <h1 class="ctitle"><?php _e( 'Latest Posts', 'wpeasy' ); ?></h1>
    <ul class="clearfix">

      <?php get_template_part('loop'); ?>

    </ul>

  </div><!-- products_block3 -->

  <?php get_template_part('pagination'); ?>

</section>

<?php get_sidebar(); ?>
<?php get_footer(); ?>
